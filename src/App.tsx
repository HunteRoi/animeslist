import React, { useEffect } from 'react';
import Animes from './containers/Animes';
import AnimeList from './components/AnimeList';
import NewAnime from './containers/NewAnime';
import { Container } from 'react-bootstrap';

import '@forevolve/bootstrap-dark/dist/css/toggle-bootstrap-dark.css';
import '@forevolve/bootstrap-dark/dist/css/toggle-bootstrap.css';
import { useDarkMode } from './hooks/useDarkMode';
import Toggle from './components/Toggle';

const App: React.FC = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();

  if (!componentMounted) return <div />;

  return (
    <Container>
      <header className='mt-3 mb-4'>
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <h1 className='mt-3'>New Anime</h1>
        <NewAnime />
      </header>

      <main className='main mb-4 text-center'>
        <Animes component={AnimeList} />
      </main>

      <footer className='footer text-center mb-3'>&copy; HunteRoi 2020.</footer>
    </Container>
  );
};;

export default App;
