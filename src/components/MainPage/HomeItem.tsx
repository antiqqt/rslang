import React from 'react';

interface Post {
  id: number;
  title: string;
  paragraph: string;
};

interface Props {
  post: Post;
};

function HomeItem(props: Props) {
  return (
    <section className="flex font-sans mb-10 rounded-xl overflow-hidden bg-slate-200 shadow-xl shadow-gray-300">
      <form className="flex-auto p-6 max-w-sm">
        <div className="flex justify-center space-x-4 mt-3 mb-3 text-sm font-medium">
          <button
            className="flex-none flex items-center justify-center w-7 h-7 rounded-md text-slate-300 border border-slate-300 hover:text-red-300"
            type="button"
            aria-label="Like">
            <svg width="20" height="20" fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75 1.56 0 2.75-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4-1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap">
          <h2 className="flex-auto text-lg font-semibold text-slate-900">
            {props.post.title}
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          {props.post.paragraph}
        </p>

      </form>
    </section>

  );
}

export default HomeItem;
