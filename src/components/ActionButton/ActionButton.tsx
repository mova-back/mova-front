import { Button, withStyles } from '@material-ui/core';

const ActionButton = withStyles({
  root: {
    padding: '10px 16px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    '&:disabled': {
      background: 'rgba(0,187,128,0.5)',
    },
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: 'bold',
    color: 'white',
  },
})(Button);

export default ActionButton;
