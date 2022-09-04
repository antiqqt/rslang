import React from 'react';

interface Post {
  name: string;
  jobTitle: string;
  activity: string;
};

interface Props {
  post: Post;
};

const AboutItem = (props:Props) => {
  return (
    <section className="flex font-sans">
      <div className="flex-none w-48 relative">
        <img
          src="/classic-utility-jacket.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy" />
      </div>
      <form className="flex-auto p-6">
        <div className="flex flex-wrap">
          <h2 className="flex-auto text-lg font-semibold text-slate-900">
            {props.post.name}
          </h2>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {props.post.jobTitle}
          </div>
        </div>
        <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div className="space-x-2 flex text-sm">

          </div>
        </div>
        <div className="flex space-x-4 mb-6 text-sm font-medium">
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
            type="button"
            aria-label="Like">
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-slate-700">
          {props.post.activity}
        </p>
      </form>
    </section>

  );
};

export default AboutItem;