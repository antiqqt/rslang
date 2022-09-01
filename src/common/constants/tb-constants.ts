const textbookConstants = {
  HARD_WORDS_GROUP_NUM: 6,
  MIN_PAGE_INDEX: 0,
  MAX_PAGE_INDEX: 29,
  HARD_WORDS_QUERY: JSON.stringify({
    $or: [{ 'userWord.difficulty': 'hard' }],
  }),
};

export default textbookConstants;
