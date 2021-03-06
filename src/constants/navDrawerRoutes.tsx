import React from 'react';

import BeenhereIcon from '@material-ui/icons/Beenhere';
import SettingsIcon from '@material-ui/icons/Settings';
import GavelIcon from '@material-ui/icons/Gavel';
import { Page } from './paths';

interface IRoute {
  icon: JSX.Element;
  label: string;
  path: string;
}

const NAV_DRAWER_ROUTES: IRoute[] = [
  {
    icon: <BeenhereIcon />,
    label: 'Мае дасягненні',
    path: Page.Achievements,
  },
  {
    icon: <SettingsIcon />,
    label: 'Налады',
    path: Page.Settings,
  },
  {
    icon: <GavelIcon />,
    label: 'Правілы карыстання',
    path: Page.Rules,
  },
];

export default NAV_DRAWER_ROUTES;
