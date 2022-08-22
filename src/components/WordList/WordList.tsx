import WordData from '../../common/types/WordData';
import Word from './Word';

interface Props {
  words: WordData[];
}

export default function Words({ words }: Props) {
  return (
    <section className="flex flex-col items-center gap-y-6 md:px-4 lg:px-6">
      {words.map((data) => (
        <Word data={data} key={data.id} />
      ))}
    </section>
  );
}
