import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SnackbarContainer from './SnackbarContainer/SnackbarContainer';
import ROUTES from '../../constants/routes';
import { userActions } from '../../store/user/reducer/userReducer';
import { AppStore } from '../../store/rootReducer';
import {
  hasRefreshToken,
  debounceRefreshTokens,
} from '../../services/auth.service';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: AppStore) => state.user);

  React.useEffect(() => {
    async function firstLoad() {
      if (hasRefreshToken() && !currentUser) {
        await debounceRefreshTokens();
        dispatch(userActions.getCurrentUser());
      }
    }

    firstLoad();
  }, [dispatch, currentUser]);

  return (
    <div>
      <SnackbarContainer />
      <Switch>
        {ROUTES.map(({ component, exact, path }) => (
          <Route component={component} exact={exact} path={path} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
