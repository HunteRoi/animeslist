import React from 'react';
import { Button } from 'react-bootstrap';
import './BrandingPage.css';

import { signIn } from '../firebase/auth';

export const BrandingPage: React.FC = () => {
  return (
    <section className='landing-page'>
      <img src='https://geekbecois.com/wp-content/uploads/2020/02/my-hero-academia.png' width='50%'/>
      <h1>Add once, edit several times</h1>
      <div>
        <p>AnimesList lets you focus on watching your animes instead of editing everytime you saw an episode.</p>
        <p>Write your own comments, grant your own score, list your favorite animes and share them with your friends!</p>
      </div>
      <Button size='lg' variant='primary' onClick={signIn}>Get Started</Button>
    </section>
  );
};
