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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grow,
  IconButton,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextareaAutosize,
  Typography,
  useTheme,
} from '@material-ui/core';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDispatch, useSelector } from 'react-redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { Tag } from '../../../../models/word';
import { FORMAT_DATE } from '../../../../constants/utilConstants';
import { CustomTheme, CustomThemeOptions } from '../../../../styles/types';
import { wordsActions } from '../../../../store/words/wordsReducer';
import { ModeratorWordCardInterface, WordCardInterface } from './types';
import { RootState } from '../../../../store/rootReducer';
import { Page } from '../../../../constants/paths';
import ComplaintCard from './ComplaintCard';

const useStyles = makeStyles<CustomTheme>((theme) =>
  createStyles({
    root: {},
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
      width: 300,
    },
    menu: {
      boxShadow: '4px 12px 25px rgba(71, 55, 255, 0.3)',
      borderRadius: '8px',
    },
    dialog: {
      background: `${theme.palette.gradient.main}`,
    },
    dialogContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textarea: {
      fontFamily: '"Arial"',
      fontSize: 15,
      padding: '10px',
      outline: 'none',
      borderRadius: `8px`,
      border: 'none',
      width: '80%',
      boxShadow: `0 3px 15px 1px ${theme.palette.secondary.light}`,
      transition: 'all 0.3s',
      '&:focus': {
        boxShadow: `0 3px 25px 3px ${theme.palette.secondary.light}`,
      },
    },
  }),
);

interface ModeratorWordCardProps extends ModeratorWordCardInterface {
  currentUserId?: string;
}

const ModeratorWordCard: React.FC<ModeratorWordCardProps> = ({
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
  swearing,
  _id,
  currentUserId,
  complaints,
  likes,
  dislikes,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [reportMessage, setreportMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const dialogHandleClose = () => {
    setDialogIsOpen(false);
  };

  const maxMeaningLength = 120;
  const meaningShort =
    meaning && meaning.length > maxMeaningLength
      ? `${meaning.slice(0, maxMeaningLength)}...`
      : meaning;

  const theme = useTheme<CustomThemeOptions>();
  const classes = useStyles(theme);
  return (
    <>
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
            disabled={!currentUserId}
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
            disabled={!currentUserId}
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
                    <MenuItem
                      className={classes.menuItem}
                      onClick={() => {
                        dispatch(wordsActions.removeWordFromModeratorFeed(_id));
                      }}
                    >
                      <span>Вярнуць у стужку</span>
                      {/* <img
                        className={classes.menuItemIcon}
                        src="./assets/images/share.png"
                        alt="share"
                      /> */}
                      <SettingsBackupRestoreIcon />
                    </MenuItem>

                    <MenuItem
                      className={classes.menuItem}
                      onClick={() => {
                        dispatch(wordsActions.deleteWord(_id));
                      }}
                    >
                      <span>Выдалiць</span>
                      <DeleteForeverIcon />
                    </MenuItem>

                    <MenuItem
                      className={classes.menuItem}
                      onClick={() => {
                        dispatch(wordsActions.removeWordFromModeratorFeed(_id));
                        dispatch(
                          wordsActions.setCurrentlyModifiedWord({
                            wordname,
                            swearing,
                            tags: tags.join(','),
                            usages: '', // TODO change this mocked data
                            meaning,
                            extended_description: description,
                          }),
                        );
                        history.push(`/change-word/${_id}`);
                      }}
                    >
                      {/* TODO add user role verification */}
                      <span>Рэдактаваць</span>
                      <CreateIcon />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <Dialog onClose={dialogHandleClose} open={dialogIsOpen}>
          <Box className={classes.dialog}>
            <DialogTitle>Паведамiце мадэратару аб памылцы цi абразе</DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <TextareaAutosize
                onChange={(e) => setreportMessage(e.target.value)}
                value={reportMessage}
                className={classes.textarea}
                rowsMax={20}
                rowsMin={10}
              />
            </DialogContent>
            <DialogActions>
              <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                <Button
                  variant="contained"
                  autoFocus
                  onClick={() => {
                    dialogHandleClose();
                    dispatch(wordsActions.reportWord(_id, reportMessage));
                    setreportMessage('');
                  }}
                  color="secondary"
                >
                  АДПРАВIЦЬ
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      </Card>
      <Box>
        {complaints.map((item) => (
          <ComplaintCard
            createdAt={item.createdAt}
            userName={item.createdByUserId}
            message={item.message}
            key={item.message}
          />
        ))}
      </Box>
    </>
  );
};

export default React.memo(ModeratorWordCard);
