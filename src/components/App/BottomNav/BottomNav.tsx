import * as React from 'react';

import { Box, BottomNavigation, BottomNavigationAction } from '@material-ui/core';

import RouterNavLink from './RouterNavLink/RouterNavLink';
import BOTTOM_NAVIGATION from '../../../constants/bottomNavRoutes';

const BottomNav: React.FC = () => (
  <Box position="fixed" bottom={0} left={0} right={0}>
    <BottomNavigation showLabels>
      {BOTTOM_NAVIGATION.map(({ id, label, icon, path }) => (
        <BottomNavigationAction
          key={id}
          label={label}
          icon={icon}
          component={RouterNavLink}
          to={path}
          exact
        />
      ))}
    </BottomNavigation>
  </Box>
);

export default BottomNav;
