interface Post {
  id: number;
  name: string;
  jobTitle: string;
  activity: string;
  url: string;
}

interface Props {
  post: Post;
  img: string;
}

function AboutItem({ post, img }: Props) {
  return (
    <section className="flex flex-col sm:flex-row font-sans mb-10 rounded-xl overflow-hidden bg-slate-200 shadow-xl shadow-gray-300 mx-4">
      <div
        className="h-60 sm:w-48 relative bg-cover sm:bg-center sm:h-auto w-full bg-top"
        style={{ backgroundImage: `url(./assets/img/${img})` }}
      />
      <form className="flex-auto p-2 px-4 max-w-sm">
        <div className="flex flex-col gap-y-1">
          <h2 className="flex-auto text-xl font-semibold text-slate-800">
            {post.name}
          </h2>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {post.jobTitle}
          </div>
          <p className="text-sm text-slate-700">{post.activity}</p>
        </div>
        <div className="flex justify-center space-x-4 mt-3 mb-3 text-sm font-medium">
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-300 hover:text-red-300"
            type="button"
            aria-label="Like"
          >
            <a href={post.url}>
              <svg
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </a>
          </button>
        </div>
      </form>
    </section>
  );
}

export default AboutItem;
