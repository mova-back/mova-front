import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: 92,
    },
    inputContainer: {
      position: 'relative',
      width: '100%',

      '&::after': {
        content: "''",
        display: 'block',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 3,
        background: '#C4C4C4',
        borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
        transition: theme.transitions.create('background', {
          duration: theme.transitions.duration.shortest,
        }),
      },
    },
    label: {
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '20px',
      textTransform: 'uppercase',
      color: 'rgba(68, 89, 132, 0.3)',
      transition: theme.transitions.create('color', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    input: {
      border: 'none',
      outline: 'none',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2, 5),
      width: '100%',

      fontSize: 16,
      lineHeight: '20px',
      boxShadow: '0px 10px 15px #F0F0F0',
      transition: theme.transitions.create('box-shadow', {
        duration: theme.transitions.duration.shortest,
      }),

      '&::placeholder': {
        fontStyle: 'italic',
        color: 'rgba(56, 79, 125, 0.65)',
      },
    },
    helperText: {
      fontSize: 10,
      lineHeight: '12px',
      paddingLeft: theme.spacing(3),
      margin: '4px 0',
      zIndex: 1,
    },
    error: {
      '& $inputContainer::after': {
        background:
          'linear-gradient(179.24deg, #FB6767 -5.37%, #D20000 196.64%)',
      },
      '& $input': {
        boxShadow: '0px 10px 15px #F8F3F3',
      },
      '& $helperText': {
        color: '#A31A1A',
      },
    },
    focus: {
      '& $label': {
        color: '#445984',
      },
      '& $inputContainer::after': {
        background: '#00BB80',
      },
      '& $input': {
        boxShadow: '0px 10px 15px #DDEBDC',
      },
    },
  })
);

interface IProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: React.ChangeEventHandler;
  error?: boolean;
  name: string;
  helperText?: string;
}

const Input: React.FC<IProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  error,
  helperText,
  name,
}) => {
  const classes = useStyles();
  const [focused, setFocused] = React.useState(false);

  const handleOnFocus = React.useCallback(() => {
    setFocused(true);
  }, []);

  const handleOnBlur = React.useCallback(() => {
    setFocused(false);
  }, []);

  return (
    <div
      className={clsx(classes.root, {
        [classes.error]: error,
        [classes.focus]: focused,
      })}
    >
      {label && (
        <label htmlFor={id} className={classes.label}>
          {label}
        </label>
      )}
      <div className={classes.inputContainer}>
        <input
          id={id}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className={classes.input}
        />
      </div>
      {helperText && <p className={classes.helperText}>{helperText}</p>}
    </div>
  );
};

export default Input;
