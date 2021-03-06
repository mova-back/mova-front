import * as React from 'react';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
} from 'react-router-dom';

const RouterNavLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'innerRef'>
>((itemProps, ref) => (
  // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
  // See https://github.com/ReactTraining/react-router/issues/6056
  <RouterLink {...itemProps} innerRef={ref} activeClassName="Mui-selected" />
));

export default RouterNavLink;
