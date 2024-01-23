import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { User } from 'firebase/auth';

import { auth, signIn, signOut } from './firebase';
import { Loading, Header, Footer } from './components';
import { Homepage, PublicAnimesList, LandingPage } from './pages';
import { UserContext } from './hooks/UserContext';
import packageInfo from '../package.json';

const { version } = packageInfo;

export const App: React.FC = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
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

  if (loading) return <Loading />;

  return (
    <UserContext.Provider value={{ user }}>
      <Container>
        <BrowserRouter>
          <Header user={user} signIn={signIn} signOut={signOut} />

          <main className='main mb-4 text-center'>
            <Routes>
              <Route path='/users/:userid' element={<PublicRoute authenticated={false} component={PublicAnimesList} />} />
              <Route path='/home' element={<PrivateRoute authenticated={user !== null} component={Homepage} />} />
              <Route path='/*' element={<PublicRoute authenticated={user !== null} component={LandingPage} />} />
            </Routes>
          </main>

          <Footer />
          <span id='version'>v{version}</span>
        </BrowserRouter>
      </Container>
    </UserContext.Provider>
  );
};

type AuthRouteProps = {
  authenticated : boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any;
};

const PrivateRoute: React.FC<AuthRouteProps> = ({ authenticated, component: Component }) => authenticated ? <Component /> : <Navigate to='/' />;
const PublicRoute: React.FC<AuthRouteProps> = ({ authenticated, component: Component }) => !authenticated ? <Component /> : <Navigate to='/home' />;
