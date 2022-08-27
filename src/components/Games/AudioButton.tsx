import { useState } from "react";

import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import environment from "../../common/environments/environment"

interface Props {
  src: string;
  size: string;
}

function AudioButton({
  src,
  size
}: Props): JSX.Element {

  const audio = new Audio(src);

  return (
    <div>
      <button type="button" className="flex items-center justify-center" onClick={() => audio.play()}>
        <FontAwesomeIcon icon={faCoffee} className={size} />
      </button>
    </div>
  )
}

export default AudioButton