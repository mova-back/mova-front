import React, { useState } from 'react';
import { Button, ButtonGroup, createStyles, makeStyles } from '@material-ui/core';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';
import Feed from '../components/App/Feed/Feed';
import { hasRefreshToken } from '../services/auth.service';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
    },
    sec: {
      position: 'absolute',
      top: '150px',
      left: '50%',
      transform: 'translate(-50%)',
    },
  }),
);

const MyDictionaryPage: React.FC = () => {
  const [tab, setTab] = useState('favourite');

  const classes = useStyles();
  return (
    <div>
      <Wrapper>
        {hasRefreshToken() ? (
          <div>
            <ButtonGroup
              size="small"
              className={classes.sec}
              disableElevation
              variant="contained"
              color="primary"
            >
              <Button onClick={() => setTab('favourite')}>Словы са стужкi</Button>
              <Button onClick={() => setTab('my')}>Мае словы</Button>
            </ButtonGroup>
            {tab === 'favourite' ? (
              <Feed options={{ variant: 'favoriteWords' }} />
            ) : (
              <Feed options={{ variant: 'createdWords' }} />
            )}
          </div>
        ) : (
          <PleaseSignIn />
        )}
      </Wrapper>
    </div>
  );
};
export default MyDictionaryPage;
