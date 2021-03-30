import * as React from 'react';
import { Route } from 'react-router-dom';

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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import RouterNavLink from '../../BottomNav/RouterNavLink/RouterNavLink';
import NAV_DRAWER_ROUTES from '../../../../constants/navDrawerRoutes';
import DrawerHeader from './DrawerHeader/DrawerHeader';
import { Page } from '../../../../constants/paths';
import { IProps } from './types';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      fontSize: '20px',
      lineHeight: '24px',
      width: '100%',
      textAlign: 'center',
    },
  }),
);

const ActionBar: React.FC<IProps> = ({ header, settingsElementMode }) => {
  const classes = useStyles();

  const [drawerVisible, setDrawerVisible] = React.useState(false);

  const drawerRoutePaths = React.useMemo(() => NAV_DRAWER_ROUTES.map((route) => route.path), []);
  const settingsPaths = [Page.Feedback, Page.Logout, Page.DeleteAcc];

  const toggleDrawer = React.useCallback(() => {
    setDrawerVisible(!drawerVisible);
  }, [drawerVisible]);

  const handleLogout = React.useCallback(() => {
    setDrawerVisible(false);
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
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
          <h1 className={classes.header}>{header}</h1>
          {!settingsElementMode ? (
            <Box marginLeft="auto">
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerVisible} onClose={toggleDrawer}>
        <DrawerHeader onAction={handleLogout} />
        <Divider />
        <List>
          {NAV_DRAWER_ROUTES.map((route) => (
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
