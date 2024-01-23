import React, { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { BsBoxArrowInLeft, BsBoxArrowInRight } from 'react-icons/bs';

import { Toggle } from '../Toggle';
import { Loading } from '../Loading';
import { UserAvatar } from '../UserAvatar';
import { useDarkMode } from '../../hooks/useDarkMode';

import './Header.css';

type Props = {
  user: User | null;
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
        
        <Navbar.Toggle aria-controls='navbar-collapse' />

        <Navbar.Collapse id='navbar-collapse'>
          <Nav style={{ alignItems: 'center', justifyContent: 'center' }} className='me-auto'>
            {user ? (
              <Nav.Item>
                <Nav.Link>
                  <Button onClick={signOut}>
                    <BsBoxArrowInRight />
                    {' '}Sign out
                  </Button>
                </Nav.Link>
              </Nav.Item>
            ) : (
              <Nav.Item>
                <Nav.Link>
                  <Button onClick={signIn}>
                    <BsBoxArrowInLeft />
                    {' '}Sign in
                  </Button>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          
          <Nav style={{ alignItems: 'center', justifyContent: 'center' }} className='ms-auto'>
            {user &&
              <Nav.Link href={`/users/${user.uid}`}>
                <UserAvatar user={user} />
              </Nav.Link>
            }
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
