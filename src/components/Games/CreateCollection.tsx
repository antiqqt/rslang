import { useEffect, useState } from 'react';

import apiPaths from "../../common/api/api-paths";
import getWords from "../../common/api/words";
import textbookConstants from "../../common/constants/tb-constants";
import environment from "../../common/environment/environment";
import useAuth from "../../common/hooks/useAuth";
import useAxiosSecure from "../../common/hooks/useAxiosSecure";
import { AggregatedWords } from "../../common/types/AggregatedWordData";
import WordData from "../../common/types/WordData";
import  { getRandom0toMax, shuffle } from "../../common/utilities/Utilities";

export function useTrueWords(group: number, pageFromTextBook: number, wordsFromTextBook: WordData[], locationLaunch: 'menu' | 'book', count: number) {
  const { auth, setAuth } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { MAX_PAGE_INDEX } = textbookConstants;

  const [trueWords, setTrueWords] = useState<WordData[]>([]);

  useEffect(() => {
    if (locationLaunch === 'menu') {
      const page = getRandom0toMax(MAX_PAGE_INDEX)
      if (!auth || !setAuth) {
        getWords(group, page)
          .then((data) => setTrueWords(data))
          .catch((error) => console.error(error));
      } else {
        const url = `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?group=${group}&page=${page}&wordsPerPage=20`

        axiosSecure
          .get<AggregatedWords>(url)
          .then((res) => setTrueWords(res.data[0].paginatedResults))
          .catch((err) => console.error(err));
      }
    } else if (locationLaunch === 'book') {
      const page = pageFromTextBook;
      if (!auth || !setAuth) {
        setTrueWords(wordsFromTextBook)
      } else {
        const dryWordsArray = wordsFromTextBook.filter((word) => word.userWord?.difficulty !== 'learned')
        setTrueWords(dryWordsArray)
        if (dryWordsArray.length < count) {
          const url = `${environment.baseUrl}${apiPaths.Users}/${auth.userId}${apiPaths.AggregatedWords}?filter=${textbookConstants.NOT_LERNED_WORDS_QUERY}&wordsPerPage=600`;
  
          axiosSecure
            .get<AggregatedWords>(url)
            .then((res) => setTrueWords(prev => prev.concat(
              res.data[0].paginatedResults
              .filter((word) => (word.page < page && word.group === group))
              .reverse()
              ).slice(0, count)))
            .catch((err) => console.error(err));
        }
      }
    }
  }, [auth, axiosSecure, group, setAuth, MAX_PAGE_INDEX, locationLaunch, pageFromTextBook, wordsFromTextBook, count])
  return trueWords;
}

export function getFalseWords(trueWords: WordData[], count: number) {
  const falseWords: string[][] = trueWords.map((_word, index) => {
    const copyArray = trueWords.slice();
    copyArray.splice(index, 1);
    return shuffle(copyArray.map(word => word.word)).slice(0, count)
  })
  return falseWords;
}