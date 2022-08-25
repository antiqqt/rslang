import RSLogoSvg from './RSLogoSvg';

const authorsData = [
  { name: 'Костя', githubLink: 'https://github.com/Konstantinksh', id: 0 },
  { name: 'Антон', githubLink: 'https://github.com/antiqqt', id: 1 },
  { name: 'Миша', githubLink: 'https://github.com/mikhailpakaliuk', id: 2 },
];

function Footer(): JSX.Element {
  return (
    <footer className="flex flex-col items-center justify-between p-2 h-16 text-lg  w-full self-end sm:flex-row md:text-xl">
      <a
        className="w-24"
        href="https://rs.school/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RSLogoSvg />
      </a>
      {authorsData.map(({ id, name, githubLink }) => (
        <a
          key={id}
          className="my-2"
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      ))}
      <span className="my-2 font-semibold">2022</span>
    </footer>
  );
}

export default Footer;
