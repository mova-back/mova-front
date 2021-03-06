import React from 'react';

import { Button, ButtonGroup } from '@material-ui/core';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';

const MyDictionaryPage: React.FC = () => (
  <div>
    <Wrapper>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button>Словы са стужкi</Button>
        <Button>Мае словы</Button>
      </ButtonGroup>
    </Wrapper>
    <BottomNav />
  </div>
);

export default MyDictionaryPage;
