import React from 'react';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { Page } from './paths';

interface INav {
  id: string;
  label: string;
  icon: JSX.Element;
  path: string;
}

const BOTTOM_NAVIGATION: INav[] = [
  {
    id: 'dictionary',
    label: 'Мой слоўнік',
    icon: <BookmarkBorderIcon />,
    path: Page.Dictionary,
  },
  {
    id: 'home',
    label: 'Стужка',
    icon: <MenuBookIcon />,
    path: Page.Home,
  },
  {
    id: 'addWord',
    label: 'Дадаць слова',
    icon: <AddRoundedIcon />,
    path: Page.AddWord,
  },
];

export default BOTTOM_NAVIGATION;
