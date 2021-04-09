import * as React from 'react';

import Wrapper from '../components/App/Wrapper/Wrapper';
import ModeratorFeed from '../components/App/Feed/ModeratorFeed';

const ModeratorFeedPage: React.FC = () => (
  <div>
    <Wrapper>
      <ModeratorFeed options={{ variant: 'all' }} />
    </Wrapper>
  </div>
);

export default ModeratorFeedPage;
