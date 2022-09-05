import React from 'react';

interface Post {
  id: number;
  name: string;
  jobTitle: string;
  activity: string;
  url: string;
};

interface Props {
  post: Post;
};

function AboutItem(props: Props) {
  return (
    <section className="flex font-sans mb-10 rounded-xl overflow-hidden bg-slate-200 shadow-xl shadow-gray-300">
      <div className="flex-none w-48 relative">
        <img
          src="public/assets/kostya.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy" />
      </div>
      <form className="flex-auto p-6 max-w-sm">
        <div className="flex flex-wrap">
          <h2 className="flex-auto text-lg font-semibold text-slate-900">
            {props.post.name}
          </h2>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {props.post.jobTitle}
          </div>
        </div>
        <p className="text-sm text-slate-700">
          {props.post.activity}
        </p>
        <div className="flex space-x-4 mt-3 mb-3 text-sm font-medium">
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-300 hover:text-red-300"
            type="button"
            aria-label="Like">
            <a href={props.post.url} >
              <svg width="20" height="20" fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            </a>
          </button>
        </div>
      </form>
    </section>

  );
}

export default AboutItem;