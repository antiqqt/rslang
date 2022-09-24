import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Howl } from 'howler';

interface Props {
  src: string;
  size: string;
}

function AudioButton({
  src,
  size
}: Props): JSX.Element {

  const audio = new Howl({
    src: [src]
  });

  return (
    <button type="button" className="flex items-center justify-center text-slate-700" onClick={() => { audio.play() }}>
      <FontAwesomeIcon icon={faVolumeHigh} className={size} />
    </button>
  )
}

export default AudioButton