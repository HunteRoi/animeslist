import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User } from 'firebase/auth';
import { BsBoxArrowInLeft, BsBoxArrowRight  } from 'react-icons/bs';
import { TbWorldShare } from 'react-icons/tb';
import { FaHome } from 'react-icons/fa';

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
              <Nav.Item aria-label='Changelog button'>
                <Nav.Link href={changelogsUrl} target='_blank'>Changelogs</Nav.Link>
              </Nav.Item>
            </Nav>
            
            <Nav style={{ alignItems: 'center', justifyContent: 'center' }} className='ms-auto'>
              {user ? (
                <>
                  <NavDropdown 
                    title={<UserAvatar user={user} />}
                    menuVariant={theme}
                    style={{ zIndex: 1021}}
                    id='user-dropdown'
                    menuRole='menu'
                    drop='down-centered'
                  >
                    <NavDropdown.Header>
                      <span>{user.displayName}</span>
                      <br/>
                      <span>{user.email}</span>
                    </NavDropdown.Header>
                    
                    <NavDropdown.ItemText>
                      <Toggle theme={theme} toggleTheme={toggleTheme} />
                    </NavDropdown.ItemText>

                    <NavDropdown.Divider />
                    
                    <NavDropdown.Item href='/home' aria-label="User's private list button">
                      <FaHome />
                      {' '}My List
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item href={`/users/${user.uid}`} aria-label="User's public list button">
                      <TbWorldShare />
                      {' '}My Public List
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item onClick={signOut} className='text-danger' aria-label='Disconnect button'>
                      <BsBoxArrowRight  />
                      {' '}Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                ) : (
                <>
                  <NavDropdown
                    title={<UserAvatar />}
                    menuVariant={theme}
                    style={{ zIndex: 1021}}
                    id='user-dropdown'
                    menuRole='menu'
                    drop='down-centered'
                  >    
                    <NavDropdown.Header>
                      <span>You are not logged in yet.</span>
                    </NavDropdown.Header>
                  
                      <NavDropdown.ItemText>
                        <Toggle theme={theme} toggleTheme={toggleTheme} />
                      </NavDropdown.ItemText>

                      <NavDropdown.Divider />
                      
                      <NavDropdown.Item onClick={signIn} className='text-primary' aria-label='Connect button'>
                        <BsBoxArrowInLeft />
                        {' '}Sign in
                      </NavDropdown.Item>
                  </NavDropdown>
                </>
                )
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
