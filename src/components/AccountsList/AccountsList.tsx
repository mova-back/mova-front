import {
  Box,
  Card,
  CardActions,
  CardHeader,
  createStyles,
  IconButton,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Account } from '../../services/accountsServise';
import { accountsActions } from '../../store/accountsReducer';
import { RootState } from '../../store/rootReducer';
import { CustomTheme } from '../../styles/types';
import SearchField from '../App/Feed/SearchField/SearchField';
import Loader from '../Loader/Loader';

const useStyles = makeStyles<CustomTheme>((theme) =>
  createStyles({
    card: {
      height: 200,
      flexBasis: 350,
      padding: 15,
      margin: 5,
    },
    card_moderator: {
      height: 200,
      flexBasis: 350,
      padding: 15,
      margin: 5,
      background: `${theme.palette.secondary.light}`,
    },
    container: {
      [theme.breakpoints.down('md')]: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    grid: {
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '12fr',
      },
    },
  }),
);

const AccountCard: React.FC<Account> = ({ username, _id, email, role, created_at, updated_at }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Card className={role === 'ROLE_MODERATOR' ? classes.card_moderator : classes.card}>
      <CardHeader title={username} subheader={_id} />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const AccountsList: React.FC = () => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.user.currentUser?.role);
  useEffect(() => {
    if (userRole === 'ROLE_ADMIN') {
      dispatch(accountsActions.getAccounts());
    }
  }, [dispatch, userRole]);
  const fetching = useSelector((state: RootState) => state.accounts.fetching);
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div>
      {fetching ? (
        <Loader />
      ) : (
        <>
          <SearchField />
          <Box
            className={classes.grid}
            paddingTop="15px"
            display="grid"
            gridTemplateColumns="6fr 6fr"
          >
            {accounts.map((item) => (
              <AccountCard {...item} />
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default AccountsList;
