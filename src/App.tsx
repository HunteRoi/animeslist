import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '@forevolve/bootstrap-dark/dist/css/toggle-bootstrap-dark.css';
import '@forevolve/bootstrap-dark/dist/css/toggle-bootstrap.css';

import { auth, signIn, signOut } from './firebase/auth';
import { Loading, Header, Footer } from './components';
import { PrivateRoute, PublicRoute } from './containers';
import { Homepage, PublicAnimesList, LandingPage } from './pages';
import UserContext from './hooks/UserContext';
import { version } from '../package.json';

const App: React.FC = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: firebase.User) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      if (loading) {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [loading]);

  if (loading) return <Loading />

  return (
    <UserContext.Provider value={{ user }}>
      <Container>
        <BrowserRouter>
          <Header user={user} signIn={signIn} signOut={signOut} />

          <main className='main mb-4 text-center'>
            <Switch>
              <Route path='/users/:userid' component={PublicAnimesList} />
              <PublicRoute
                authenticated={user !== null}
                path='/'
                component={LandingPage}
                exact
              />
              <PrivateRoute
                authenticated={user !== null}
                path='/home'
                component={Homepage}
                exact
              />
            </Switch>
          </main>

          <Footer />
          <span id='version'>v{version}</span>
        </BrowserRouter>
      </Container>
    </UserContext.Provider>
  );
};

export default App;
