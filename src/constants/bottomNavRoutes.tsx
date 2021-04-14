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
    icon: <BookmarkBorderIcon color="secondary" />,
    path: Page.Dictionary,
  },
  {
    id: 'home',
    label: 'Стужка',
    icon: <MenuBookIcon color="secondary" />,
    path: Page.Home,
  },
  {
    id: 'addWord',
    label: 'Дадаць слова',
    icon: <AddRoundedIcon color="secondary" />,
    path: Page.AddWord,
  },
];

export default BOTTOM_NAVIGATION;
