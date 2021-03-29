import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, createStyles, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';
import { wordsActions } from '../store/words/wordsReducer';
import Feed from '../components/App/Feed/Feed';

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
      top: '100px',
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
      </Wrapper>
      <BottomNav />
    </div>
  );
};
export default MyDictionaryPage;
