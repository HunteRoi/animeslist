import React, { useMemo } from 'react';

export const Footer: React.FC = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  
  return (
    <footer className='footer text-center mb-3'>&copy; HunteRoi 2020-{year}.</footer>
  );
}
