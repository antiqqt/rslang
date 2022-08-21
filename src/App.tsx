import Textbook from './components/Textbook/Textbook';

const App = (): JSX.Element => (
  <div className="min-h-screen bg-slate-700">
    <header className="flex justify-center pt-8 text-emerald-500 font-bold text-4xl">
      <p>RS Lang</p>
    </header>
    <Textbook />
  </div>
);

export default App;
