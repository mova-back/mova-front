import React from 'react';

import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';
import Wrapper from '../components/App/Wrapper/Wrapper';
import BottomNav from '../components/App/BottomNav/BottomNav';
import { Page } from '../constants/paths';

const MyDictionaryPage: React.FC = () => (
  <div>
    <Wrapper>
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button>Словы са стужкi</Button>
        <Button>Мае словы</Button>
        <Button>
          <Link to={Page.ChangePassword}>Change password</Link>
        </Button>
      </ButtonGroup>
    </Wrapper>
    <BottomNav />
  </div>
);

export default MyDictionaryPage;
