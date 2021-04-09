import * as React from 'react';

import Wrapper from '../components/App/Wrapper/Wrapper';
import Feed from '../components/App/Feed/Feed';

const MainPage: React.FC = () => (
  <div>
    <Wrapper>
      <Feed options={{ variant: 'all' }} />
    </Wrapper>
  </div>
);

export default MainPage;
