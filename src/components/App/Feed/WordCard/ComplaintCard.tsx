import {
  Box,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Typography,
  useTheme,
} from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { FORMAT_DATE } from '../../../../constants/utilConstants';
import { CustomTheme, CustomThemeOptions } from '../../../../styles/types';

interface ComplaintCardProps {
  message: string;
  userName: string;
  createdAt: string;
}

const useStyles = makeStyles<CustomTheme>((theme) =>
  createStyles({
    card: {
      background: '#e5f8f2',
      display: 'flex',
      flexDirection: 'column',
    },
    card__main: {
      height: '80%',
    },
    card__footer: {
      display: 'flex',
      padding: '0px 15px 15px 15px',
      height: '20%',
      justifyContent: 'space-between',
    },
  }),
);

const ComplaintCard: React.FC<ComplaintCardProps> = ({ createdAt, message, userName }) => {
  const theme = useTheme<CustomThemeOptions>();
  const classes = useStyles(theme);
  return (
    <Card className={classes.card}>
      <CardContent className={classes.card__main}>
        <Typography>{message}</Typography>
      </CardContent>
      <Box className={classes.card__footer}>
        <Typography>
          {createdAt && (
            <time dateTime={createdAt.slice(0, -1)}>
              {format(new Date(createdAt), FORMAT_DATE)}
            </time>
          )}
        </Typography>
        <Typography>{userName}</Typography>
      </Box>
    </Card>
  );
};

export default ComplaintCard;
