import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Button,
  createStyles,
  FormControlLabel,
  Link,
  makeStyles,
  Radio,
  RadioGroup,
  Switch,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { RootState } from '../store/rootReducer';
import { Page } from '../constants/paths';
import Wrapper from '../components/App/Wrapper/Wrapper';
import { CustomThemeOptions } from '../styles/types';
import BottomNav from '../components/App/BottomNav/BottomNav';

const SettingsPage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const theme: CustomThemeOptions = useTheme();

  const useStyles = makeStyles(() =>
    createStyles({
      guestUserHeader: {
        textAlign: 'center',
        fontSize: 18,
        color: theme.custom.colors.textOpacity80,
        paddingTop: 45,
        marginBottom: 32,
      },
      guestUserHeaderLink: {
        color: theme.custom.colors.textOpacity80,
      },
      inputContainer: {
        width: '90%',
        margin: '0 auto',
        paddingTop: 30,
      },
      input: {
        borderRadius: '8px 8px 0 0',
        background: theme.custom.colors.primaryLight,
        height: 50,
        paddingLeft: 20,
      },
      inputLabel: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
      },
      swearWordsSwitchContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2% 5%',
        borderTop: `1px solid ${theme.custom.colors.borderOpacity10}`,
        borderBottom: `1px solid ${theme.custom.colors.borderOpacity10}`,
      },
      switchRoot: {
        width: 42,
        height: 26,
        padding: 0,
      },
      switchLabel: {
        fontSize: 16,
      },
      radioContainer: {
        width: '90%',
        margin: '0 auto 35px',
        paddingTop: 10,
      },
      radioContainerLabel: {
        marginBottom: 10,
        fontSize: 16,
      },
      bottomLinkButton: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2% 5%',
        width: '100%',
        textTransform: 'none',
        fontSize: 16,
        borderRadius: 0,
        borderBottom: `1px solid ${theme.custom.colors.borderOpacity10}`,
        '&:hover, &:active': {
          borderRadius: 8,
        },
        '&:active': {
          fontWeight: 'bold',
        },
      },
      bottomLinkIcon: {
        paddingRight: 15,
      },
    }),
  );
  const classes = useStyles();
  return (
    <Wrapper actionBarHeader="Налады">
      {!currentUser ? (
        <div className={classes.guestUserHeader}>
          <strong>Паважаны госць!</strong>
          <br />
          Каб мець пашыранныя правы ды
          <br />
          магчымасці, калі ласка,
          <br />
          <Link
            underline="always"
            className={classes.guestUserHeaderLink}
            component={NavLink}
            to={Page.Signup}
          >
            <strong>зарэгіструйся</strong>
          </Link>
        </div>
      ) : null}
      <div className={classes.swearWordsSwitchContainer}>
        <span className={classes.switchLabel}>Паказваць лаянку ў стужцы</span>
        <Switch
          disableRipple
          classes={{
            root: classes.switchRoot,
          }}
        />
      </div>
      <div className={classes.radioContainer}>
        <div className={classes.radioContainerLabel}>Паказваць словы ў стужцы:</div>
        <RadioGroup defaultValue="popular">
          <FormControlLabel
            value="popular"
            control={<Radio color="default" />}
            label="Самыя папулярныя"
          />
          <FormControlLabel value="new" control={<Radio color="default" />} label="Самыя новыя" />
        </RadioGroup>
      </div>
      {currentUser ? (
        <>
          <Button className={classes.bottomLinkButton} component={NavLink} to={Page.Feedback}>
            <span>
              <img className={classes.bottomLinkIcon} src="./assets/images/mail.png" alt="mail" />
              Зваротная сувязь
            </span>
            <img src="./assets/images/rightArrow.png" alt="right arrow" />
          </Button>
          <Button className={classes.bottomLinkButton} component={NavLink} to={Page.Logout}>
            <span>
              <img
                className={classes.bottomLinkIcon}
                src="./assets/images/logout.png"
                alt="logout"
              />
              Разлагініцца
            </span>
            <img src="./assets/images/rightArrow.png" alt="right arrow" />
          </Button>
          <Button className={classes.bottomLinkButton} component={NavLink} to={Page.DeleteAcc}>
            <span>
              <img className={classes.bottomLinkIcon} src="./assets/images/bin.png" alt="mail" />
              Выдаліць акаунт
            </span>
            <img src="./assets/images/rightArrow.png" alt="right arrow" />
          </Button>
        </>
      ) : null}
      <BottomNav />
    </Wrapper>
  );
};

export default SettingsPage;
