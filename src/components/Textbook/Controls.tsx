import Games from './Games';
import Pagination from './Pagination';
import Section from './Section';

interface Props {
  page: number;
  handleSetPage: (val: number) => void;

  section: number;
  handleSetSection: (val: number) => void;
}

export default function TextbookControls({
  page,
  handleSetPage,
  section,
  handleSetSection,
}: Props) {
  return (
    <div
      className="flex flex-col items-center
     gap-4 md:flex-row md:justify-center"
    >
      <Section handleSetSection={handleSetSection} section={section} />
      <Games />
      <Pagination handleSetPage={handleSetPage} page={page} />
    </div>
  );
}
