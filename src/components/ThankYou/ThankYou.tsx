import * as React from 'react';

import { Box, Typography, createStyles, makeStyles } from '@material-ui/core';

import Tick from './Tick';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    title: {
      fontSize: '30px',
    },
  })
);

interface IProps {
  title?: string;
}

const ThankYou: React.FC<IProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Tick />
      <Typography className={classes.title} align="center">
        {title}
      </Typography>
    </Box>
  );
};

export default ThankYou;
