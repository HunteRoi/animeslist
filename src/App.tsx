import React from 'react';
import Animes from './containers/Animes';
import AnimeList from './components/AnimeList';
import NewAnime from './containers/NewAnime';

const App: React.FC = () => {
  return (
    <div className='container'>
      <header className='mt-3 mb-4'>
        <h1>Animes</h1>
        <NewAnime />
      </header>

      <main className='main mb-4 text-center'>
        <Animes component={AnimeList} />
      </main>

      <footer className="footer text-center mb-3">
        &copy; HunteRoi 2020.
      </footer>
    </div>
  );
};

export default App;
