interface Props {
  page: number;
  handleSetPage: (val: number) => void;
}

enum PageIndex {
  MIN = 0,
  MAX = 29,
}

export default function TextbookPagination({ page, handleSetPage }: Props) {
  const hasPrev = page > PageIndex.MIN;
  const hasNext = page < PageIndex.MAX;

  return (
    <div className="flex justify-center xs:mt-0">
      <button
        className="inline-flex items-center justify-center px-3 text-sm font-medium 
        text-white bg-blue-400 border-2 border-blue-400 hover:bg-white hover:text-blue-400
        disabled:text-transparent disabled:hover:bg-blue-400 border-r-0 rounded-l-md"
        disabled={!hasPrev}
        onClick={() => handleSetPage(page - 1)}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div
        className="flex justify-center py-[0.35rem] px-3 text-sm font-bold
        text-white bg-blue-400 border-2 border-blue-400"
      >
        Страница {page + 1}
      </div>
      <button
        className="inline-flex items-center justify-center px-3 text-sm font-medium 
        text-white bg-blue-400 border-2 border-blue-400 hover:bg-white hover:text-blue-400
        disabled:text-transparent disabled:hover:bg-blue-100 border-l-0 rounded-r-md"
        disabled={!hasNext}
        onClick={() => handleSetPage(page + 1)}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
