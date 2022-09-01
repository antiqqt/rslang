import WordData from "./WordData";

export default interface QuestionData {
  question: string;
  answer: string;
  image: string;
  audio: string;
  variants: string[];
  wordData: WordData
}