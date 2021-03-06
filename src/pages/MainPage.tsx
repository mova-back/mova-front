import * as React from 'react';

import Wrapper from '../components/App/Wrapper/Wrapper';
import Feed from '../components/App/Feed/Feed';
import BottomNav from '../components/App/BottomNav/BottomNav';

const MainPage: React.FC = () => (
  <div>
    <Wrapper>
      <Feed />
    </Wrapper>
    <BottomNav />
  </div>
);

export default MainPage;
