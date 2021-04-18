import React, { useState } from 'react';
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Box, CircularProgress, createStyles, makeStyles } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import Input from '../Input/Input';
import ActionButton from '../ActionButton/ActionButton';

import LoginFormData from '../../models/forms/loginFormData';
import LoginFormSchema from './LoginFormSchema';
import { userActions } from '../../store/user/reducer/userReducer';
import LOGIN from '../../constants/forms/login';

const useStyles = makeStyles(() =>
  createStyles({
    progressWrapper: {
      position: 'relative',
    },
    progressIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    submitButton: {
      width: '100%',
    },
    icon: {
      position: 'absolute',
      paddingTop: '1px',
      top: '0',
      right: '0',
    },
  }),
);

// type Props = {
//   login: (values: LoginFormData, meta: FormikHelpers<LoginFormData>) => void;
// };

const LoginForm: React.FC = () => {
  const classes = useStyles();
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={LoginFormSchema.initialState}
      enableReinitialize
      validationSchema={LoginFormSchema.validSchema}
      onSubmit={(values: LoginFormData, meta: FormikHelpers<LoginFormData>) => {
        meta.setSubmitting(true);
        dispatch(userActions.login(values, meta));
      }}
      // render={(props) => {
      //   return (
      //     <button type="button" onClick={() => props.resetForm()}>
      //       reset form
      //     </button>
      //   );
      // }}
    >
      {({ dirty, isValid, isSubmitting, touched, handleBlur }: FormikProps<LoginFormData>) => (
        <Form>
          <Box display="grid" gridGap={16}>
            {LOGIN.map((field) => (
              <>
                {/* <Button variant="contained" color="primary">
                  Primary
                </Button> */}
                <Field key={field.id} name={field.name}>
                  {({ field: formikField, meta }: FieldProps) => (
                    <Input
                      type={
                        // eslint-disable-next-line no-nested-ternary
                        field.name === 'password'
                          ? showHidePassword
                            ? 'text'
                            : 'password'
                          : field.type
                      }
                      {...formikField}
                      label={field.label}
                      handleBlur={handleBlur}
                      error={Boolean(meta.error && touched[field.name as 'email' | 'password'])}
                      helperText={
                        meta.error && touched[field.name as 'email' | 'password'] ? meta.error : ''
                      }
                      endAdornment={
                        field.name === 'password' && (
                          <div className={classes.icon}>
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => changeShowHidePassword(!showHidePassword)}
                              onMouseDown={(event) => event.preventDefault()}
                            >
                              {showHidePassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </div>
                        )
                      }
                    />
                  )}
                </Field>
              </>
            ))}

            <Field name="rememberMe">
              {({ field: { value, onChange, name } }: FieldProps) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox checked={value} onChange={onChange} name={name} color="primary" />
                    }
                    label="Запомніць?"
                  />
                );
              }}
            </Field>

            <div className={classes.progressWrapper}>
              <ActionButton
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!(dirty && isValid) || isSubmitting}
                className={classes.submitButton}
              >
                Увайсці
              </ActionButton>
              {isSubmitting && <CircularProgress size={24} className={classes.progressIndicator} />}
            </div>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
