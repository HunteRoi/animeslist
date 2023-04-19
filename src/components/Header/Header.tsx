import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Toggle } from '../Toggle';
import { Loading } from '../Loading';
import { UserAvatar } from '../UserAvatar';
import { useDarkMode } from '../../hooks/useDarkMode';

import './Header.css';

type Props = {
  user: firebase.User;
  signIn: () => void;
  signOut: () => void;
};

export const Header: React.FC<Props> = ({ user, signIn, signOut }) => {
  const [theme, toggleTheme, themeMounted] = useDarkMode();
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    setIsLight(theme === 'light');
  }, [theme]);
  
  if (!themeMounted) return <Loading />;

  return (
    <header className='mt-3 mb-4'>
      <Navbar expand='lg' variant={isLight ? 'light' : 'dark'}>
        <Navbar.Brand>
          <Link to={user ? '/home' : '/'}>AnimesList</Link>
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse id='navbar-collapse'>
          <Nav className='mr-auto'>
            {user ? (
              <Nav.Item>
                <Nav.Link>
                  <Button onClick={signOut}>SIGN OUT</Button>
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link>
                  <Button onClick={signIn}>SIGN IN</Button>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>

          {user &&
            <Nav.Link href={`/users/${user.uid}`}>
              <UserAvatar user={user} />
            </Nav.Link>
          }
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
