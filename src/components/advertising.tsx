import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { SECOND } from 'commom/contants';

interface Props {
  texts: string[];
}

export const Advertising = (props: Props) => {
  const { texts } = props;
  const [_, setVisibleTextIndex] = useState(0);

  const SlideInText = ({ text, delay }) => {
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
    }, SECOND.HOLD);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box textAlign="center" className="highlighted_box">
      <div className="highlighted_text">
        <SlideInText text={texts[0]} delay={SECOND.SIX} />
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {texts.slice(1).map((text, index) => (
          <li key={index}>
            <SlideInText text={text} delay={SECOND.SEVEN + index * SECOND.THREE} />
          </li>
        ))}
      </ul>
    </Box>
  );
};
