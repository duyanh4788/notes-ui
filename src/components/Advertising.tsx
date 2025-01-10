import { useState, useEffect } from 'react';
import { Box, Switch, Tooltip, Typography } from '@mui/material';
import { SECOND } from 'commom/contants';
import { TitleProject, TitleTech } from 'commom/contants';
import Grid from '@mui/material/Grid2';
import { LocalStorageKey, LocalStorageService } from 'services/localStorage';

export const Advertising = () => {
  const offAdd: any = LocalStorageService.getItem(LocalStorageKey.offAdd);
  const [_, setVisibleTextIndex] = useState(0);
  const [isAdd, setIsAdd] = useState<boolean>(offAdd ? true : false);

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
      setVisibleTextIndex(prevIndex => (prevIndex + 1) % TitleProject.length);
    }, SECOND.HOLD);
    return () => clearInterval(interval);
  }, [TitleProject.length]);

  const renderAd = (texts: string[]) => {
    return (
      isAdd && (
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
      )
    );
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Tooltip title={`On/Off`}>
        <Switch
          size="small"
          color="primary"
          checked={isAdd}
          onChange={e => {
            setIsAdd(e.target.checked);
            if (offAdd) {
              LocalStorageService.removeLocalStorageByKey(LocalStorageKey.offAdd);
            } else {
              LocalStorageService.setItem({ key: LocalStorageKey.offAdd, value: 'off' });
            }
          }}
        />
      </Tooltip>
      <Grid container spacing={2}>
        <Grid size={6}>{renderAd(TitleProject)}</Grid>
        <Grid size={6}>{renderAd(TitleTech)}</Grid>
      </Grid>
    </Box>
  );
};
