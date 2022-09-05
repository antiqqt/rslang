import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import apiPaths from "../api/api-paths";
import environment from "../environment/environment";
import { StatisticData, StatisticResponse } from "../types/StatisticsData";
import WordData from "../types/WordData";
import useAuth from './useAuth';
import useSafeRequest from './useSafeRequest';

function raiseWord(wordData: WordData, gameName: 'audiochallenge' | 'sprint') {
  const copyWord = { ...wordData };
  if (!copyWord.userWord) {
    copyWord.userWord = {
      difficulty: 'easy',
      optional: {
        progress: 1,
        record: {
          audiochallenge: [0, 0],
          sprint: [0, 0],
        },
      },
    };
  } else if (
    (copyWord.userWord.difficulty === 'easy' &&
      copyWord.userWord.optional.progress === 2) ||
    (copyWord.userWord.difficulty === 'hard' &&
      copyWord.userWord.optional.progress === 4)
  ) {
    copyWord.userWord.difficulty = 'learned';
    copyWord.userWord.optional.progress = 0;
  } else if (
    copyWord.userWord.difficulty === 'easy' ||
    copyWord.userWord.difficulty === 'hard'
  ) {
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
          sprint: [0, 0],
        },
      },
    };
  } else if (
    copyWord.userWord.difficulty === 'easy' &&
    copyWord.userWord.optional.progress === 1
  ) {
    copyWord.userWord.difficulty = 'hard';
    copyWord.userWord.optional.progress = 0;
  } else if (
    (copyWord.userWord.difficulty === 'easy' ||
      copyWord.userWord.difficulty === 'hard') &&
    copyWord.userWord.optional.progress !== 0
  ) {
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
  });
  return result;
}

function getStatisticData(
  wrongAnswers: WordData[],
  correctAnswers: WordData[],
  upgradedWords: WordData[],
  answerSeries: boolean[],
  gameName: 'audiochallenge' | 'sprint'
): StatisticData {
  const newLearnedWordsCount =
    upgradedWords.filter((word) => word.userWord?.difficulty === 'learned')
      .length -
    correctAnswers.filter((word) => word.userWord?.difficulty === 'learned')
      .length -
    wrongAnswers.filter((word) => word.userWord?.difficulty === 'learned')
      .length;
  const newHardWordsCount =
    upgradedWords.filter((word) => word.userWord?.difficulty === 'hard')
      .length -
    correctAnswers.filter((word) => word.userWord?.difficulty === 'hard')
      .length -
    wrongAnswers.filter((word) => word.userWord?.difficulty === 'hard').length;
  const newEasyWordsCount =
    upgradedWords.filter((word) => word.userWord?.difficulty === 'easy')
      .length -
    correctAnswers.filter((word) => word.userWord?.difficulty === 'easy')
      .length -
    wrongAnswers.filter((word) => word.userWord?.difficulty === 'easy').length;
  const newWordsCount =
    correctAnswers.filter((word) => !word.userWord).length +
    wrongAnswers.filter((word) => !word.userWord).length;
  return {
    [gameName]: {
      bestSeries: getBestSeries(answerSeries),
      correctAnswers: correctAnswers.length,
      wrongAnswers: wrongAnswers.length,
      newLearnedWordsCount,
      newHardWordsCount,
      newEasyWordsCount,
      newWordsCount,
    },
  };
}

export default function useLearnedWords(
  wrongAnswers: WordData[],
  correctAnswers: WordData[],
  answerSeries: boolean[],
  gameName: 'audiochallenge' | 'sprint'
) {
  const { auth, setAuth } = useAuth();
  const safeRequest = useSafeRequest();
  const { Users, Statistics, Words } = apiPaths;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth || !setAuth) return;

    const freshWords = ((wrongAnswers.filter((word) => !word.userWord))
      .concat(correctAnswers.filter((word) => !word.userWord)))
      .map((word) => word._id);
    const upgradedWords = wrongAnswers
      .map((word) => downWord(word, gameName))
      .concat(correctAnswers.map((word) => raiseWord(word, gameName)));

    const gameStatisticData = getStatisticData(
      wrongAnswers,
      correctAnswers,
      upgradedWords,
      answerSeries,
      gameName
    );

    // put statistics
    function sendStatistics(
      statisticsResp: StatisticResponse,
      statisticData: StatisticData
    ) {
      const copyResp = { ...statisticsResp };
      const currDate = new Date().toLocaleDateString('en-ca');

      if (!statisticsResp.optional[currDate]) {
        copyResp.optional[currDate] = statisticData;
      } else {
        copyResp.optional[currDate][gameName].bestSeries =
          copyResp.optional[currDate][gameName].bestSeries >
            statisticData[gameName].bestSeries
            ? copyResp.optional[currDate][gameName].bestSeries
            : statisticData[gameName].bestSeries;

        copyResp.optional[currDate][gameName].correctAnswers +=
          statisticData[gameName].correctAnswers;
        copyResp.optional[currDate][gameName].wrongAnswers +=
          statisticData[gameName].wrongAnswers;
        copyResp.optional[currDate][gameName].newEasyWordsCount +=
          statisticData[gameName].newEasyWordsCount;
        copyResp.optional[currDate][gameName].newHardWordsCount +=
          statisticData[gameName].newHardWordsCount;
        copyResp.optional[currDate][gameName].newLearnedWordsCount +=
          statisticData[gameName].newLearnedWordsCount;
        copyResp.optional[currDate][gameName].newWordsCount +=
          statisticData[gameName].newWordsCount;
      }

      if (!auth || !setAuth) return;
      safeRequest.put(
        `${environment.baseUrl}${Users}/${auth.userId}${Statistics}`, {
        learnedWords: '0',
        optional: copyResp.optional
      }
        , {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .catch((err) => console.error(err));
    }

    safeRequest.get(
      `${environment.baseUrl}${Users}/${auth.userId}${Statistics}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => sendStatistics(res.data, gameStatisticData)
      ).catch((err) => console.error(err));

    // update words
    upgradedWords.forEach((word) => {
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
        ).catch((err) => console.error(err))
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
        ).catch((err) => console.error(err))
      }
    })

  }, [Statistics, Users, Words, answerSeries, auth, correctAnswers, gameName, navigate, safeRequest, setAuth, wrongAnswers])

}
