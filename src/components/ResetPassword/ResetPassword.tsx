import * as React from 'react';
// import { Form, Field } from 'react-final-form';

import { Box, createStyles, makeStyles } from '@material-ui/core';

import Input from '../Input/Input';
import ActionButton from '../ActionButton/ActionButton';

const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      background: '#00BB80',
      '&:hover': {
        background: '#00BB80',
      },
    },
  }),
);

const ResetPassword: React.FC = () => {
  const classes = useStyles();

  // rewrite to formik
  return (
    <div>
      ResetPassword
      {/* <Form
        onSubmit={(props) => {
          // eslint-disable-next-line no-console
          console.log(props);
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gridGap={16}>
              <Field
                name="old_password"
                render={({ input }) => (
                  <Input {...input} label="Стары пароль" />
                )}
              />
              <Field
                name="new_password"
                render={({ input }) => <Input {...input} label="Новы пароль" />}
              />
              <ActionButton type="submit" className={classes.btn}>
                Змяніць пароль
              </ActionButton>
            </Box>
          </form>
        )}
      /> */}
    </div>
  );
};

export default ResetPassword;
