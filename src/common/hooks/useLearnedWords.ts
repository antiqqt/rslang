import { useNavigate } from "react-router-dom";

import apiPaths from "../api/api-paths";
import environment from "../environment/environment";
import { StatisticData, StatisticResponse } from "../types/StatisticsData";
import WordData from "../types/WordData";
import useAuth from './useAuth';
import useSafeRequest from "./useSafeRequest";

function raiseWord(wordData: WordData, gameName: 'audiochallenge' | 'sprint') {
  const copyWord = { ...wordData };
  if (!copyWord.userWord) {
    copyWord.userWord = {
      difficulty: 'easy',
      optional: {
        progress: 1,
        record: {
          audiochallenge: [0, 0],
          sprint: [0, 0]
        }
      },
    }
  } else if ((copyWord.userWord.difficulty === 'easy' && copyWord.userWord.optional.progress === 2) ||
    (copyWord.userWord.difficulty === 'hard' && copyWord.userWord.optional.progress === 4)) {
    copyWord.userWord.difficulty = 'learned';
    copyWord.userWord.optional.progress = 0;
  } else if (copyWord.userWord.difficulty === 'easy' || copyWord.userWord.difficulty === 'hard') {
    copyWord.userWord.optional.progress += 1;
  }
  copyWord.userWord.optional.record[gameName][0] += 1;
  return copyWord;
}

function downWord(wordData: WordData, gameName: 'audiochallenge' | 'sprint') {
  const copyWord = { ...wordData };
  if (!copyWord.userWord) {
    copyWord.userWord = {
      difficulty: 'hard',
      optional: {
        progress: 0,
        record: {
          audiochallenge: [0, 0],
          sprint: [0, 0]
        }
      },
    }
  } else if ((copyWord.userWord.difficulty === 'easy' && copyWord.userWord.optional.progress === 1)) {
    copyWord.userWord.difficulty = 'hard';
    copyWord.userWord.optional.progress = 0;
  } else if ((copyWord.userWord.difficulty === 'easy' || copyWord.userWord.difficulty === 'hard') &&
    copyWord.userWord.optional.progress !== 0) {
    copyWord.userWord.optional.progress -= 1;
  } else if (copyWord.userWord.difficulty === 'learned') {
    copyWord.userWord.difficulty = 'hard';
    copyWord.userWord.optional.progress = 4;
  }
  copyWord.userWord.optional.record[gameName][1] += 1;
  return copyWord;
}

function getBestSeries(array: boolean[]) {
  let result = 0;
  let current = 0;
  array.forEach((el, i) => {
    if (el) current += 1;
    if (array.length - 1 === i || !array[i + 1]) {
      if (current > result) result = current;
      current = 0;
    }
  })
  return result;
}

function getStatisticData(
  wrongAnswers: WordData[],
  correctAnswers: WordData[],
  upgradedWords: WordData[],
  answerSeries: boolean[],
  gameName: 'audiochallenge' | 'sprint'): StatisticData {
  const newLearnedWordsCount =
    upgradedWords.filter((word) => word.userWord?.difficulty === 'learned').length -
    correctAnswers.filter((word) => word.userWord?.difficulty === 'learned').length -
    wrongAnswers.filter((word) => word.userWord?.difficulty === 'learned').length
  const newHardWordsCount =
    upgradedWords.filter((word) => word.userWord?.difficulty === 'hard').length -
    correctAnswers.filter((word) => word.userWord?.difficulty === 'hard').length -
    wrongAnswers.filter((word) => word.userWord?.difficulty === 'hard').length
  const newEasyWordsCount =
    upgradedWords.filter((word) => word.userWord?.difficulty === 'easy').length -
    correctAnswers.filter((word) => word.userWord?.difficulty === 'easy').length -
    wrongAnswers.filter((word) => word.userWord?.difficulty === 'easy').length
  const newWordsCount =
    correctAnswers.filter((word) => !word.userWord).length +
    wrongAnswers.filter((word) => !word.userWord).length
  return {
    [new Date().toLocaleDateString('en-ca')]: JSON.stringify(new Date),
    gameName,
    bestSeries: getBestSeries(answerSeries),
    correctAnswers: correctAnswers.length,
    wrongAnswers: wrongAnswers.length,
    newLearnedWordsCount,
    newHardWordsCount,
    newEasyWordsCount,
    newWordsCount,
  }
}

export default function useLearnedWords(
  wrongAnswers: WordData[],
  correctAnswers: WordData[],
  answerSeries: boolean[],
  gameName: 'audiochallenge' | 'sprint') {

  const { auth, setAuth } = useAuth();
  const safeRequest = useSafeRequest();
  const { Users, Statistics, Words } = apiPaths;
  const navigate = useNavigate();

  const freshWords = ((wrongAnswers.filter((word) => !word.userWord))
    .concat(correctAnswers.filter((word) => !word.userWord)))
    .map((word) => word._id);
  const upgradedWords = wrongAnswers.map((word) => downWord(word, gameName))
    .concat(correctAnswers.map((word) => raiseWord(word, gameName)));

  const gameStatisticData = getStatisticData(wrongAnswers, correctAnswers, upgradedWords, answerSeries, gameName);

  if (!auth || !setAuth) return;
  console.log('here', wrongAnswers, correctAnswers, upgradedWords, freshWords)
  // put statistics
  let statistics = {
    id: auth.userId,
    learnedWords: '0',
    optional: {
      log: '',
    },
  };

  function sendStatistics(statisticsToPut: StatisticResponse, statisticData: StatisticData) {

    if (!auth || !setAuth) return;
    if (statisticsToPut.optional)
      safeRequest.put(
        `${environment.baseUrl}${Users}/${auth.userId}${Statistics}`,
        {
          "learnedWords": statisticsToPut.learnedWords,
          "optional": { log: `${statisticsToPut.optional.log}, ${JSON.stringify(statisticData)}` }
        }, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .catch(() => {
          setAuth(null);
          navigate(apiPaths.Signin, { replace: true });
        });
  }

  safeRequest.get(
    `${environment.baseUrl}${Users}/${auth.userId}${Statistics}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    .then((res) => {
      if (res.data.optional) {
        statistics = res.data;
      }
      sendStatistics(statistics, gameStatisticData)
    }).catch(() => {
      setAuth(null);
      navigate(apiPaths.Signin, { replace: true });
    });

  // update words
  // upgradedWords.forEach((word) => {
    const word = upgradedWords[0]

    if (freshWords.includes(word._id)) {
      safeRequest.post(
        `${environment.baseUrl}${Users}/${auth.userId}${Words}/${word._id}`,
        {
          difficulty: word.userWord?.difficulty,
          optional: word.userWord?.optional,
        }, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      ).then((resp) => console.log('sucPOST', resp))
        .catch((err1) => console.log(err1))
    } else {
      safeRequest.put(
        `${environment.baseUrl}${Users}/${auth.userId}${Words}/${word._id}`,
        {
          difficulty: word.userWord?.difficulty,
          optional: word.userWord?.optional,
        }, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      ).then((resp) => console.log('sucPUT', resp))
        .catch((err) => {
          console.log(err)
        })
    }
  // })

}