import React from 'react';
import { Button } from 'react-bootstrap';
import './LandingPage.css';

import { signIn } from '../../firebase';

export const LandingPage: React.FC = () => {
  return (<>
    <section className='landing-page'>
      <img src='https://geekbecois.com/wp-content/uploads/2020/02/my-hero-academia.png' width='50%' alt='Branding page logo'/>
      <h1>Stop editing several times</h1>
      <p>
        AnimesList lets you focus on watching your animes instead of editing entries everytime you saw a new episode.
        <br />
        Write your own comments, grant your own score, list your favorite animes and share them with your friends!
      </p>
      <Button size='lg' variant='primary' onClick={signIn}>GET STARTED</Button>
    </section>
  </>);
};
