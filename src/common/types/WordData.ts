export default interface WordData {
  _id?: string;
  id?: string;
  userWord?: {
    difficulty: WordDifficulty;
    optional: {
      progress: number;
      record: RecordType;
    };
  };
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

export type WordDifficulty = 'hard' | 'easy' | 'learned';
export type RecordType = {
  audiochallenge: number[];
  sprint: number[]
}
