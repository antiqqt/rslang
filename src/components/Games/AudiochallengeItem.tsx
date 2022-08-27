function Auth(): JSX.Element {
  return (
    <div className="flex flex-wrap">
      <div className="grow">
        П
      </div>
      <div className="flex flex-col ">
        <ul className="list-none text-base sm:text-2xl px-2">
          <li className="p-2">Word1</li>
          <li className="p-2">Word2</li>
          <li className="p-2">Word3</li>
          <li className="p-2">Word4</li>
          <li className="p-2">Word5</li>
        </ul>
        <button className="inline-flex items-center justify-center gap-x-3 max-w-max px-3 py-1 text-white text-base font-medium 
        rounded-lg border-2 border-transparent
        bg-blue-400 hover:bg-white hover:text-blue-400 hover:border-blue-400
        focus:outline-none"
          type="button"
        >
          Не знаю
        </button>
      </div>
    </div>
  )
}

export default Auth