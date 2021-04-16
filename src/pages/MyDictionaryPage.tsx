import React, { useState } from 'react';
import { Box, Button, ButtonGroup, createStyles, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';
import Feed from '../components/App/Feed/Feed';
import { hasRefreshToken } from '../services/auth.service';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';
import { CustomTheme } from '../styles/types';

const useStyles = makeStyles<CustomTheme>((theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
    },
    sec: {
      margin: '0 auto',
    },
    button: {
      background: theme.palette.header.lg,
    },
    active: {
      background: 'rgb(39, 55, 89)',
    },
  }),
);

const MyDictionaryPage: React.FC = () => {
  const [tab, setTab] = useState('favourite');
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Wrapper>
      {hasRefreshToken() ? (
        <Box>
          <Box display="flex" alignItems="center" justifyContent="center" pt={1}>
            <ButtonGroup
              size="small"
              className={classes.sec}
              disableElevation
              variant="contained"
              color="primary"
            >
              <Button
                className={clsx(classes.button, { [classes.active]: tab === 'favourite' })}
                onClick={() => setTab('favourite')}
              >
                Словы са стужкi
              </Button>
              <Button
                className={clsx(classes.button, { [classes.active]: tab === 'my' })}
                onClick={() => setTab('my')}
              >
                Мае словы
              </Button>
            </ButtonGroup>
          </Box>
          {tab === 'favourite' ? (
            <Feed options={{ variant: 'favoriteWords' }} />
          ) : (
            <Feed options={{ variant: 'createdWords' }} />
          )}
        </Box>
      ) : (
        <PleaseSignIn />
      )}
    </Wrapper>
  );
};
export default MyDictionaryPage;
