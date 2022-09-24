import React from 'react';

interface Post {
  id: number;
  title: string;
  paragraph: string;
  img: string;
}

interface Props {
  post: Post;
}

function HomeItem(props: Props) {
  const {
    post: { img, title, paragraph },
  } = props;

  return (
    <section className="flex flex-col max-w-xs font-sans mb-10 overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-200 shadow-xl shadow-gray-300">
      <div className="max-w-xs font-medium border-b-2 border-slate-300 sm:max-w-lg">
        <img src={img} alt={title} className="w-full h-full" />
      </div>
      <div className="flex flex-col gap-y-2 p-3">
        <h3 className="font-medium text-xl text-slate-700">{title}</h3>
        <p className="font-medium text-sm text-slate-500">{paragraph}</p>
      </div>
    </section>
  );
}

export default HomeItem;
