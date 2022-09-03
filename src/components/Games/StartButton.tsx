import { useRef } from "react";

interface Props {
  isStarted: boolean;
  setIsGameStarted: (val: boolean) => void
}

function StartButton({
  isStarted,
  setIsGameStarted,
}: Props): JSX.Element {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative">
      <button className="inline-flex items-center justify-center gap-x-3 max-w-max px-3 py-1 text-slate-700 text-base font-medium 
    rounded-lg border-2 border-transparent
    bg-slate-300  hover:border-slate-400"
        type="button"
        onClick={() => setIsGameStarted(!isStarted)}
      >
        Начать
      </button>
    </div>
  )
}

export default StartButton