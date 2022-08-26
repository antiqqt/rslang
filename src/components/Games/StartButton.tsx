function StartButton(): JSX.Element {
  return (    
    <button className="inline-flex items-center justify-center gap-x-3 max-w-max px-3 py-1 text-white text-base font-medium 
        rounded-lg border-2 border-transparent
        bg-blue-400 hover:bg-white hover:text-blue-400 hover:border-blue-400
        focus:outline-none"
    type="button"
    >
      Начать
    </button>
  )
}

export default StartButton