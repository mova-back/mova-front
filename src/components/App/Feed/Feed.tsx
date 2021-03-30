import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  createStyles,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';

import { useState } from 'react';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import InfiniteScroll from 'react-infinite-scroll-component';
import WordCard from './WordCard/WordCard';
import { RootState } from '../../../store/rootReducer';
import Loader from '../../Loader/Loader';
import SearchField from './SearchField/SearchField';
import { wordsActions } from '../../../store/words/wordsReducer';
import { hasRefreshToken } from '../../../services/auth.service';
import { FeedUrlOptionsType } from '../../../constants/paths';

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      minHeight: 148,
    },
    select: {
      maxWidth: 120,
    },
    scroll: {
      zIndex: 10,
    },
  }),
);

interface IProps {
  className?: string;
  options: { variant: 'all' | 'createdWords' | 'favoriteWords' };
}

const SelectSortBy: React.FC<{
  value: 'likes' | 'createdAt';
  callback: (a: 'likes' | 'createdAt') => void;
}> = ({ value, callback }) => {
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    callback(e.target.value as 'likes' | 'createdAt');
  };
  const styles = useStyles();
  return (
    <FormControl className={styles.select}>
      <InputLabel id="demo-simple-select-helper-label">Sort by:</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="likes">Likes</MenuItem>
        <MenuItem value="createdAt">Date</MenuItem>
      </Select>
    </FormControl>
  );
};

const OrderButton: React.FC<{
  value: 'asc' | 'desc';
  callback: (a: 'asc' | 'desc') => void;
}> = ({ value, callback }) => {
  return (
    <IconButton
      color="primary"
      onClick={() => {
        if (value === 'asc') {
          callback('desc');
        } else {
          callback('asc');
        }
      }}
    >
      {value === 'desc' ? (
        <VerticalAlignBottomIcon fontSize="large" />
      ) : (
        <VerticalAlignTopIcon fontSize="large" />
      )}
    </IconButton>
  );
};

const Feed: React.FC<IProps> = ({ className, options }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { feed, fetching } = useSelector((state: RootState) => state.word);
  const [orderBy, setOrderBy] = useState<'likes' | 'createdAt'>('likes');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [currentPage, setCurrentPage] = useState(0);

  React.useEffect(() => {
    if (hasRefreshToken()) {
      if (currentUser)
        dispatch(
          wordsActions.fetchFeed({
            ...options,
            orderByField: orderBy,
            orderByDirection: direction,
            page: currentPage,
          }),
        );
    } else {
      dispatch(
        wordsActions.fetchFeed({
          ...options,
          orderByField: orderBy,
          orderByDirection: direction,
          page: currentPage,
        }),
      );
    }
  }, [dispatch, options, currentUser, orderBy, direction, currentPage]);
  const totalCount = useSelector((state: RootState) => state.word.totalCount);
  const hasMore = +totalCount > (currentPage + 1) * 20;
  debugger;

  return (
    <InfiniteScroll
      className={classes.scroll}
      hasMore={hasMore}
      loader="Loading..."
      dataLength={+totalCount}
      next={() => {
        setCurrentPage((page) => page + 1);
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      }}
    >
      <Box display="grid" gridGap={8} p={1} pb={10} className={className}>
        {fetching ? (
          <Loader className={classes.loader} />
        ) : (
          <>
            <SearchField />
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <SelectSortBy value={orderBy} callback={setOrderBy} />
              <OrderButton value={direction} callback={setDirection} />
            </Box>

            {feed.map((word) => (
              <WordCard
                key={word._id}
                swearing={word.swearing}
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
    </InfiniteScroll>
  );
};

export default Feed;
