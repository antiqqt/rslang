import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  handleAction: () => void;
  text: string;
  icon: IconDefinition;
}

export default function WordBtn({ handleAction, text, icon }: Props) {
  return (
    <button
      onClick={handleAction}
      type="button"
      className="inline-flex items-center justify-center gap-x-2 max-w-max px-3 py-1 text-slate-700 
        text-base font-medium rounded-lg border-2 border-transparent bg-slate-300 hover:border-slate-400"
    >
      <FontAwesomeIcon icon={icon} className="w-5 h-5" />
      {text}
    </button>
  );
}
