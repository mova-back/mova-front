import React from 'react';
import BottomNav from '../components/App/BottomNav/BottomNav';
import Wrapper from '../components/App/Wrapper/Wrapper';
import NewWord from '../components/NewWord/NewWord';
import { wordsActions } from '../store/words/wordsReducer';

const ChangeWordPage: React.FC = () => {
  return (
    <>
      <Wrapper actionBarHeader="Змянiць слова">
        <NewWord action={wordsActions.changeWord} />
      </Wrapper>
      <BottomNav />
    </>
  );
};

export default ChangeWordPage;
