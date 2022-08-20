import { useState } from "react";

import Author from "./Author";
import RSLogoSvg from "./RSLogoSvg";

function Footer(): JSX.Element {
  const [authors] = useState([
    {name: 'Костя', githubLink: "https://github.com/Konstantinksh"},
    {name: 'Антон', githubLink: "https://github.com/antiqqt"},
    {name: 'Миша', githubLink: "https://github.com/mikhailpakaliuk"},
  ])
  return (
    <footer className="flex justify-between align-middle mx-10 h-12 text-xl">
      <a className="w-[100px]" href="https://rs.school/">
        <RSLogoSvg />
      </a>
      {authors.map(author => <Author author={author}/>)}
      <span className="my-2">2022</span>
    </footer>
  )
}

export default Footer