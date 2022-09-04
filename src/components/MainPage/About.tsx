
import { useState } from 'react';

import AboutItem from './AboutItem';

function About() {
  const [cards, setCards] = useState([
    {
      id:1,
      name: 'Anton Pomogaev',
      jobTitle: 'Team leader, Frontend developer',
      activity: 'Did basic project settings, initial layout, redux setup, router setup, login form, part of the TextBook page',
      url: 'https://github.com/antiqqt',
    },
    {
      id:2,
      name: 'Konstantinksh',
      jobTitle: 'Frontend developer',
      activity: 'Made games results saving to the server, helped to think through the logic of the app',
      url: 'https://github.com/Konstantinksh',
    },
    {
      id:3,
      name: 'MikhailPakaliuk',
      jobTitle: 'Frontend developer',
      activity: 'Participated in the development of the Sprint game and made about page',
      url: 'https://github.com/MikhailPakaliuk',
    }
  ]);

  return (
    <section className="pt-5 pb-5">
      {cards.map((card) =>
        <AboutItem post={card} key={card.id}/>
      )}

    </section>
  );
}

export default About;
