import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

interface PopUpProps {
  child: React.ReactElement;
  childWidth: string;
}

const PopUp: React.FC<PopUpProps> = ({ child, childWidth }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        zIndex: 10001,
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(3px)',
        paddingTop: '5%',
      },
      childContainer: {
        outline: 0,
        border: 'none',
        backgroundColor: 'transparent',
        width: childWidth,
        margin: '0 auto',
      },
    }),
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <button
        type="button"
        className={classes.childContainer}
        id="childContainerButton"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {child}
      </button>
    </div>
  );
};

export default PopUp;
