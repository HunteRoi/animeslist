import React from 'react';

import { Toggle } from './Toggle';
import { Loading } from './Loading';
import { useDarkMode } from '../hooks/useDarkMode';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.css';

type Props = {
  user: firebase.User;
  signIn: () => void;
  signOut: () => void;
};

export const Header: React.FC<Props> = ({ user, signIn, signOut }) => {
  const [theme, toggleTheme, themeMounted] = useDarkMode();

  if (!themeMounted) return <Loading />;

  return (
    <header className='mt-3 mb-4'>
      <Navbar expand='lg'>
        <Navbar.Brand>
          <Link to={user ? '/home' : '/'}>AnimesList</Link>
        </Navbar.Brand>
        <Navbar.Toggle />

        <Navbar.Collapse id='navbar-collapse'>
          <Nav className='mr-auto'>
            {user ? (
              <Nav.Item>
                <Nav.Link>
                  <Button onClick={signOut}>Sign Out</Button>
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link>
                  <Button onClick={signIn}>Sign In</Button>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>

          {user &&
            <Nav.Item>
              <img src={user.photoURL} className='profile-image' alt='avatar' />
              <span className='profile-text'>{user.displayName}</span>
            </Nav.Item>
          }
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
