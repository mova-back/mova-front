import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import WordCard from './WordCard/WordCard';
import { RootState } from '../../../store/rootReducer';
import Loader from '../../Loader/Loader';
import SearchField from './SearchField/SearchField';
import { feedActions } from '../../../store/feed/reducer/feedReducer';

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      minHeight: 148,
    },
  }),
);

interface IProps {
  className?: string;
}

const Feed: React.FC<IProps> = ({ className }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { feed, fetching } = useSelector((state: RootState) => state.feed);

  React.useEffect(() => {
    dispatch(feedActions.fetchFeed(0));
  }, [dispatch]);
  return (
    <Box display="grid" gridGap={8} p={1} pb={10} className={className}>
      {fetching ? (
        <Loader className={classes.loader} />
      ) : (
        <>
          <SearchField />
          {feed.map((word) => (
            <WordCard
              key={word.id}
              likes={word.likes}
              dislikes={word.dislikes}
              id={word.id}
              word={word.wordname}
              meaning={word.meaning}
              description={word.extended_description}
              tags={word.tags}
              createdAt={word.createdAt}
              userId={word.userId}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default Feed;
