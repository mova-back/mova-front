import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SnackbarContainer from './SnackbarContainer/SnackbarContainer';
import ROUTES from '../../constants/routes';
import { userActions } from '../../store/user/reducer/userReducer';
import { hasRefreshToken, debounceRefreshTokens } from '../../services/auth.service';
import { RootState } from '../../store/rootReducer';

const App: React.FC = () => {
  return (
    <div>
      <SnackbarContainer />
      <Switch>
        {ROUTES.map(({ component, exact, path }) => (
          <Route
            component={component}
            key={Array.isArray(path) ? path[0] : path}
            exact={exact}
            path={path}
          />
        ))}
      </Switch>
    </div>
  );
};

export default App;
