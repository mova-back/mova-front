import * as React from 'react';

import { Box, Link, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Wrapper from '../components/App/Wrapper/Wrapper';
import NewWord from '../components/NewWord/NewWord';
import BottomNav from '../components/App/BottomNav/BottomNav';
import { hasRefreshToken } from '../services/auth.service';
import { Page } from '../constants/paths';

const PleaseSignIn = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Typography variant="h4" align="center">
      Паважаны госць! <br /> Каб мець пашыранныя правы ды магчымасці, калі
      ласка, <br />
      <Link underline="always" component={NavLink} to={Page.Signup}>
        зарэгіструйся
      </Link>
    </Typography>
  </Box>
);
const NewWordPage: React.FC = () => {
  return (
    <>
      <Wrapper actionBarHeader="Дадаць слова">
        {hasRefreshToken() ? <NewWord /> : <PleaseSignIn />}
      </Wrapper>
      <BottomNav />
    </>
  );
};

export default NewWordPage;
