import * as React from 'react';
import clsx from 'clsx';

import { format } from 'date-fns';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  ClickAwayListener,
  createStyles,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Tag } from '../../../../models/word';
import { FORMAT_DATE } from '../../../../constants/utilConstants';
import { CustomThemeOptions } from '../../../../styles/types';
import { wordsActions } from '../../../../store/words/wordsReducer';
import { WordCardInterface } from './types';
import { RootState } from '../../../../store/rootReducer';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 5,
    },
    bookmark: {
      margin: theme.spacing(-1, -1, 0, 0),
      position: 'absolute',
      top: 0,
      right: 0,
    },
    body1: {
      maxHeight: '70px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    thumb: {
      color: `${theme.palette.text.primary}`,
    },
    thumbUp: {
      color: `${theme.palette.secondary.main}`,
    },
    thumbDown: {
      color: `${theme.palette.error.main}`,
    },
    menuItem: {
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    menuItemIcon: {
      padding: '5px 0',
      paddingLeft: '20px',
    },
    popper: {
      marginTop: '8px',
      zIndex: 10002,
    },
    menu: {
      boxShadow: '4px 12px 25px rgba(71, 55, 255, 0.3)',
      borderRadius: '8px',
    },
  }),
);

interface WordCardProps extends WordCardInterface {
  currentUserId: number | undefined;
}

const WordCard: React.FC<WordCardProps> = ({
  wordname,
  meaning,
  description,
  tags,
  createdAt,
  isLiked,
  isDisliked,
  createdByUserId,
  isFavourited,
  className,
  _id,
  currentUserId,
  likes,
  dislikes,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  const maxMeaningLength = 120;
  const meaningShort =
    meaning && meaning.length > maxMeaningLength
      ? `${meaning.slice(0, maxMeaningLength)}...`
      : meaning;

  const theme: CustomThemeOptions = useTheme();
  const classes = useStyles(theme);
  return (
    <Card className={clsx(classes.root, className)} component="article">
      <CardContent>
        <Box display="flex" position="relative" pr={5}>
          <Typography variant="h6" align="left">
            {wordname}
          </Typography>
          <Box className={classes.bookmark}>
            <IconButton
              id="bookmarkButton"
              color="inherit"
              aria-label="bookmark"
              onClick={() => {
                if (!isFavourited) {
                  dispatch(wordsActions.addFavourite(_id));
                } else {
                  dispatch(wordsActions.removeFavourite(_id));
                }
              }}
            >
              {isFavourited ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="body1"
          align="left"
          gutterBottom
          id="expanded"
          className={!expanded ? classes.body1 : undefined}
          onClick={() => setExpanded(!expanded)}
        >
          — {!expanded ? meaningShort : meaning}
        </Typography>

        <Typography variant="body2" align="left" gutterBottom>
          {description}
        </Typography>
        {tags.length > 0 && (
          <Typography variant="caption" component="p" align="left">
            {tags.map((tag) => `#${tag}`).join(', ')}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Button
          startIcon={
            isLiked ? (
              <ThumbUpIcon className={classes.thumb} />
            ) : (
              <ThumbUpOutlinedIcon className={classes.thumb} />
            )
          }
          className={classes.thumbUp}
          onClick={() => {
            dispatch(wordsActions.rateAWord(_id, 'like', isLiked, isDisliked));
          }}
        >
          {likes}
        </Button>

        <Button
          startIcon={
            isDisliked ? (
              <ThumbDownIcon className={classes.thumb} />
            ) : (
              <ThumbDownOutlinedIcon className={classes.thumb} />
            )
          }
          className={classes.thumbDown}
          onClick={() => dispatch(wordsActions.rateAWord(_id, 'dislike', isLiked, isDisliked))}
        >
          {dislikes}
        </Button>
        <Box marginLeft="auto" display="flex" flexDirection="column">
          <Typography variant="caption" align="right">
            {createdAt && (
              <time dateTime={createdAt.slice(0, -1)}>
                {format(new Date(createdAt), FORMAT_DATE)}
              </time>
            )}
          </Typography>
          {/* <Typography variant="caption" align="right"> */}
          {/*   {userId} */}
          {/* </Typography> */}
        </Box>
      </CardActions>
      <Box display="flex" justifyContent="center">
        <IconButton
          aria-label="actions"
          size="small"
          id="anchor"
          ref={anchorRef}
          onClick={() => {
            setShowDropdown((prevOpen) => !prevOpen);
          }}
        >
          {showDropdown ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Popper
        open={showDropdown}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.popper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                <MenuList
                  autoFocusItem={showDropdown}
                  id="menu-list-grow"
                  className={classes.menu}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === 'Escape') {
                      setShowDropdown(false);
                    }
                  }}
                >
                  <MenuItem className={classes.menuItem}>
                    <span>Капіраваць</span>
                    <img
                      className={classes.menuItemIcon}
                      src="./assets/images/copy.png"
                      alt="copy"
                    />
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <span>Падзяліцца з сябрамі</span>
                    <img
                      className={classes.menuItemIcon}
                      src="./assets/images/share.png"
                      alt="share"
                    />
                  </MenuItem>
                  <MenuItem className={classes.menuItem}>
                    <span>Паведаміць мадератару</span>
                    <img
                      className={classes.menuItemIcon}
                      src="./assets/images/alert.png"
                      alt="alert"
                    />
                  </MenuItem>
                  <MenuItem
                    disabled={String(currentUserId) !== createdByUserId}
                    className={classes.menuItem}
                    onClick={() => {
                      dispatch(wordsActions.deleteWord(_id));
                    }}
                  >
                    {/* TODO add user role verification */}
                    <span>Выдалiць</span>
                    <DeleteForeverIcon />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Card>
  );
};

export default React.memo(WordCard);
