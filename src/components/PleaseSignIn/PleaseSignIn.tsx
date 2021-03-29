import { Box, Link, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Page } from '../../constants/paths';

const PleaseSignIn: React.FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    marginTop="50px"
  >
    <Typography variant="h4" align="center">
      Паважаны госць! <br /> Каб мець пашыранныя правы ды магчымасці, калі ласка, <br />
      <Link underline="always" component={NavLink} to={Page.Signup}>
        зарэгіструйся
      </Link>
    </Typography>
  </Box>
);

export default PleaseSignIn;
