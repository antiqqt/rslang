const textbookConstants = {
  HARD_WORDS_GROUP_NUM: 6,
  MIN_PAGE_INDEX: 0,
  MAX_PAGE_INDEX: 29,
  HARD_WORDS_QUERY: JSON.stringify({
    $or: [{ 'userWord.difficulty': 'hard' }],
  }),
  NOT_LERNED_WORDS_QUERY: JSON.stringify({
    $or: [{ 'userWord': undefined }, { 'userWord.difficulty': 'hard' },{ 'userWord.difficulty': 'easy' }],
  }),
};

export default textbookConstants;
