import * as React from 'react';

import Wrapper from '../components/App/Wrapper/Wrapper';
import NewWord from '../components/NewWord/NewWord';
import BottomNav from '../components/App/BottomNav/BottomNav';
import { hasRefreshToken } from '../services/auth.service';
import { Page } from '../constants/paths';
import { wordsActions } from '../store/words/wordsReducer';
import PleaseSignIn from '../components/PleaseSignIn/PleaseSignIn';

const NewWordPage: React.FC = () => {
  return (
    <>
      <Wrapper actionBarHeader="Дадаць слова">
        {hasRefreshToken() ? (
          <NewWord action={wordsActions.fetchCreateANewWord} />
        ) : (
          <PleaseSignIn />
        )}
      </Wrapper>
      <BottomNav />
    </>
  );
};

export default NewWordPage;
