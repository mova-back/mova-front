import * as React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  createStyles,
  makeStyles,
  Hidden,
  Button,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { useSelector } from 'react-redux';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import RouterNavLink from '../../BottomNav/RouterNavLink/RouterNavLink';
import NAV_DRAWER_ROUTES from '../../../../constants/navDrawerRoutes';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import { Page } from '../../../../constants/paths';
import { IProps } from './types';
import { CustomTheme, CustomThemeOptions } from '../../../../styles/types';
import { RootState } from '../../../../store/rootReducer';

const useStyles = makeStyles<CustomTheme>((theme) =>
  createStyles({
    header: {
      fontSize: '20px',
      lineHeight: '24px',
      width: '100%',
      textAlign: 'center',
    },
    appBar: {
      background: `${theme.palette.header.lg}`,
      height: 120,
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        height: 75,
      },
    },
    header__link: {
      marginLeft: 40,
      whiteSpace: 'nowrap',
      fontWeight: 'normal',
      fontSize: '1rem',
      color: 'white',
      textDecoration: 'none',
    },
    header__link_active: {
      color: `${theme.palette.secondary.main}`,
    },
    signInButton: {
      color: 'white',
      whiteSpace: 'nowrap',
    },
    toolbar: {
      padding: 0,
      display: 'flex',
      justifyContent: 'space-between',
      width: '80%',
      [theme.breakpoints.down('md')]: {
        width: '0',
        padding: 5,
        height: 0,
      },
    },
  }),
);

const ActionBar: React.FC<IProps> = ({ header, settingsElementMode }) => {
  const classes = useStyles();

  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const userRole = useSelector((state: RootState) => state.user.currentUser?.role);
  const userName = useSelector((state: RootState) => state.user.currentUser?.username);
  const navRoutes = NAV_DRAWER_ROUTES;
  // adding new tab to navbar in header
  if (
    userRole === 'ROLE_MODERATOR' &&
    navRoutes[navRoutes.length - 1].label !== 'Мадэратарская стужка'
  ) {
    navRoutes.push({
      icon: <AccountBalanceIcon />,
      label: 'Мадэратарская стужка',
      path: Page.ModeratorFeed,
    });
  }
  if (userRole === 'ROLE_ADMIN' && navRoutes[navRoutes.length - 1].label !== 'Спiс пользавацелей') {
    navRoutes.push({
      icon: <AccountBalanceIcon />,
      label: 'Спiс пользавацелей',
      path: Page.Accounts,
    });
  }

  const drawerRoutePaths = React.useMemo(() => navRoutes.map((route) => route.path), [navRoutes]);
  const settingsPaths = [Page.Feedback, Page.Logout, Page.DeleteAcc];

  const toggleDrawer = React.useCallback(() => {
    setDrawerVisible(!drawerVisible);
  }, [drawerVisible]);

  const handleLogout = React.useCallback(() => {
    setDrawerVisible(false);
  }, []);

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <Hidden lgUp>
            <Route path={settingsPaths || drawerRoutePaths}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="back"
                component={RouterNavLink}
                to={settingsElementMode ? Page.Settings : Page.Home}
              >
                <ArrowBackIcon />
              </IconButton>
            </Route>
          </Hidden>
          <Hidden mdDown>
            <Box>
              {navRoutes.map((route) => (
                <NavLink
                  to={route.path}
                  key={route.label}
                  className={classes.header__link}
                  activeClassName={classes.header__link_active}
                >
                  {route.label}
                </NavLink>
              ))}
            </Box>
          </Hidden>
          <Hidden lgUp>
            <h1 className={classes.header}>{header}</h1>
          </Hidden>
          <Hidden mdDown>
            <DrawerHeader onAction={handleLogout} />
          </Hidden>
          <Hidden lgUp>
            {!settingsElementMode ? (
              <Box marginLeft="auto" marginRight="5px">
                <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : null}
          </Hidden>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerVisible} onClose={toggleDrawer}>
        <DrawerHeader onAction={handleLogout} />
        <Divider />
        <List>
          {navRoutes.map((route) => (
            <ListItem
              button
              component={RouterNavLink}
              to={route.path}
              key={route.label}
              onClick={toggleDrawer}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.label} />
              <KeyboardArrowRightIcon fontSize="small" />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default ActionBar;
