import { useState } from 'react';

import Content from './Content';
import Controls from './Controls';

const STARTING_SECTION = 1;

export default function Textbook() {
  const [section, setSection] = useState(STARTING_SECTION);
  const [page, setPage] = useState(0);

  return (
    <main className="flex flex-col gap-y-6 h-full px-3 py-8 font-medium text-2xl text-white">
      <h2 className="mx-auto">Учебник</h2>
      <Controls
        handleSetPage={setPage}
        handleSetSection={setSection}
        page={page}
        section={section}
      />
      <Content />
    </main>
  );
}
