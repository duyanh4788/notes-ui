import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export const Advertising = () => {
  const [_, setVisibleTextIndex] = useState(0);
  const texts = [
    'Notes for Everything You Need',
    '*Personal notes',
    '*Code snippets',
    '*Scheduling (e.g., send emails based on a time schedule)',
  ];

  const SlideInText = ({ text, delay = 100 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timeout);
    }, [delay]);

    return (
      <Typography variant="body1" className={`slide_text ${visible ? 'visible' : ''}`}>
        {text}
      </Typography>
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box textAlign="center" className="highlighted_box">
      <Typography gutterBottom className="highlighted_text">
        <SlideInText text={texts[0]} delay={500} />
      </Typography>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {texts.slice(1).map((text, index) => (
          <li key={index}>
            <SlideInText text={text} delay={700 + index * 200} />
          </li>
        ))}
      </ul>
    </Box>
  );
};
