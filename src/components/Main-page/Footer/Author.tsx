import { AuthorType } from "../../../types/types"

function Author(props: {author: AuthorType}): JSX.Element {
  const {name, githubLink} = props.author;
  return (
    <a className="my-2" href={githubLink} target="_blank"
    rel="noopener noreferrer">{name}</a>
  )
}

export default Author