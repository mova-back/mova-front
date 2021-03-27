import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, createStyles, makeStyles } from '@material-ui/core';

import WordCard from './WordCard/WordCard';
import { RootState } from '../../../store/rootReducer';
import Loader from '../../Loader/Loader';
import SearchField from './SearchField/SearchField';
import { wordsActions } from '../../../store/words/wordsReducer';
import { hasRefreshToken } from '../../../services/auth.service';

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      minHeight: 148,
    },
  }),
);

interface IProps {
  className?: string;
  option?: string;
}

const Feed: React.FC<IProps> = ({ className, option }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { feed, fetching } = useSelector((state: RootState) => state.word);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  React.useEffect(() => {
    if (hasRefreshToken()) {
      if (currentUser) dispatch(wordsActions.fetchFeed(0, 20, option));
    } else {
      dispatch(wordsActions.fetchFeed(0, 20, option));
    }
  }, [dispatch, option, currentUser]);
  return (
    <Box display="grid" gridGap={8} p={1} pb={10} className={className}>
      {fetching ? (
        <Loader className={classes.loader} />
      ) : (
        <>
          <SearchField />
          {feed.map((word) => (
            <WordCard
              key={word._id}
              isFavourited={word.isFavourited}
              likes={word.likes}
              dislikes={word.dislikes}
              _id={word._id}
              wordname={word.wordname}
              meaning={word.meaning}
              isLiked={word.isLiked}
              isDisliked={word.isDisliked}
              description={word.description}
              tags={word.tags}
              createdAt={word.createdAt}
              createdByUserId={word.createdByUserId}
              currentUserId={currentUser?._id}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default Feed;
