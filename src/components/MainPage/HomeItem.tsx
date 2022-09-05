import React from 'react';

interface Post {
  id: number;
  title: string;
  paragraph: string;
  img: string;
};

interface Props {
  post: Post;
};

function HomeItem(props: Props) {
  return (
    <section className="flex flex-col max-w-sm font-sans mb-10 rounded-xl overflow-hidden bg-slate-200 shadow-xl shadow-gray-300">
      <div className="flex justify-center space-x-4 text-sm font-medium">
        <img src={props.post.img} alt='' />
      </div>
      <form className="flex-auto p-6 max-w-sm">
        <div className="flex flex-wrap">
          <h3 className="font-medium flex-auto text-lg font-semibold text-slate-900">
            {props.post.title}
          </h3>
        </div>
        <p className="font-medium text-sm text-slate-700">
          {props.post.paragraph}
        </p>

      </form>
    </section>

  );
}

export default HomeItem;
