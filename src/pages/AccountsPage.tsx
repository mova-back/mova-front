import * as React from 'react';

import Wrapper from '../components/App/Wrapper/Wrapper';
import AccountsList from '../components/AccountsList/AccountsList';

const AccountsPage: React.FC = () => (
  <div>
    <Wrapper>
      <AccountsList />
    </Wrapper>
  </div>
);

export default AccountsPage;
