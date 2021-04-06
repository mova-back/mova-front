import * as React from 'react';
import { useEffect } from 'react';

import {
  Box,
  Drawer,
  Grid,
  Hidden,
  Icon,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { IProps } from './types';
import ActionBar from './ActionBar/ActionBar';
import { CustomTheme, CustomThemeOptions } from '../../../styles/types';
import BOTTOM_NAVIGATION from '../../../constants/bottomNavRoutes';
import RouterNavLink from '../BottomNav/RouterNavLink/RouterNavLink';
import { Page } from '../../../constants/paths';
import BottomNav from '../BottomNav/BottomNav';

const useStyles = makeStyles((theme: CustomTheme) =>
  createStyles({
    mainContainer: {
      background: `${theme.palette.gradient.main}`,
      display: 'flex',
    },
    main: {
      position: 'relative',
      minHeight: 'calc(100vh - 125px)',
      minWidth: '80%',
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },

    sidebarContainer: {
      position: 'sticky',
      top: 0,
      background: 'white',
    },
    sidebar: {
      width: '80%',
      minHeight: '100vh',
    },
    active: {
      fontWeight: 'bold',
      color: 'red',
    },
    list__item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  }),
);

const Wrapper: React.FC<IProps> = ({ actionBarHeader, children }) => {
  const theme = useTheme<CustomTheme>();
  const classes = useStyles(theme && { theme });
  return (
    <>
      <Grid container>
        <Hidden mdDown>
          <Grid item lg={2} md={false}>
            <Box display="flex" justifyContent="flex-end" className={classes.sidebarContainer}>
              <Box flexDirection="column" display="flex" className={classes.sidebar}>
                <Box
                  alignItems="center"
                  flexDirection="column"
                  display="flex"
                  justifyContent="center"
                >
                  <Link component={NavLink} to={Page.Home}>
                    <img src="./assets/images/logo.png" alt="app-logo" />
                  </Link>
                  <Typography variant="h2">mova</Typography>
                </Box>
                <List>
                  {BOTTOM_NAVIGATION.map(({ id, label, icon, path }) => (
                    <ListItem
                      button
                      className={classes.list__item}
                      key={id}
                      component={RouterNavLink}
                      to={path}
                      activeClassName={classes.active}
                      exact
                    >
                      <Icon>{icon}</Icon>
                      <ListItemText primary={label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </Hidden>
        <Grid item lg={10} md={12} sm={12} xs={12}>
          <ActionBar header={actionBarHeader} />
          <Box className={classes.mainContainer}>
            <Box className={classes.main}>{children}</Box>
          </Box>
        </Grid>
      </Grid>
      <Hidden lgUp>
        <BottomNav />
      </Hidden>
    </>
  );
};

Wrapper.displayName = 'Wrapper';

export default Wrapper;
