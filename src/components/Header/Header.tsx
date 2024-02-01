import React from 'react';
import { Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { BsBoxArrowInLeft, BsBoxArrowRight  } from 'react-icons/bs';

import { Toggle } from '../Toggle';
import { Loading } from '../Loading';
import { UserAvatar } from '../UserAvatar';
import { useDarkMode } from '../../hooks/useDarkMode';


type Props = {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
};

export const Header: React.FC<Props> = ({ user, signIn, signOut }) => {
  const [theme, toggleTheme, themeMounted] = useDarkMode();
  
  const changelogsUrl = 'https://github.com/HunteRoi/animeslist/commits/master/';
  
  if (!themeMounted) return <Loading />;

  return (
    <Container fluid as='header' className='mt-3 mb-4'>
      <Navbar expand='lg' data-bs-theme={theme}>
          <Navbar.Brand>
            <Link to={user ? '/home' : '/'}>AnimesList</Link>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls='navbar-collapse' />

          <Navbar.Collapse id='navbar-collapse'>
            <Nav style={{ alignItems: 'center', justifyContent: 'center' }} className='me-auto'>
              <Nav.Item>
                <Nav.Link href={changelogsUrl} target='_blank'>Changelogs</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Nav style={{ alignItems: 'center', justifyContent: 'center' }} className='ms-auto'>
              {user ? (
                <>
                  <NavDropdown id='user-dropdown' title={<UserAvatar user={user} />} menuVariant={theme} tabIndex={9}>
                    <NavDropdown.ItemText>
                      <Toggle theme={theme} toggleTheme={toggleTheme} />
                    </NavDropdown.ItemText>

                    <NavDropdown.Divider />
                    
                    <NavDropdown.Item href={`/users/${user.uid}`}>
                      Public List
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item onClick={signOut} className='text-danger'>
                      <BsBoxArrowRight  />
                      {' '}Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                ) : (
                <>
                  <Nav.Item>
                    <Nav.Link>
                      <Button onClick={signIn}>
                        <BsBoxArrowInLeft />
                        {' '}Sign in
                      </Button>
                    </Nav.Link>
                  </Nav.Item>
                  <Toggle theme={theme} toggleTheme={toggleTheme} />
                </>
                )
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
