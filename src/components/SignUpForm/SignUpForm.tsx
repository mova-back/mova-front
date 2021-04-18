import React, { useState } from 'react';
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from 'formik';

import { Box, CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ActionButton from '../ActionButton/ActionButton';
import Input from '../Input/Input';

import SIGNUP from '../../constants/forms/signup';
import SignUpFormData from '../../models/forms/signUpFormData';
import SignUpFormSchema from './SignUpFormSchema';
import { userActions } from '../../store/user/reducer/userReducer';

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

const SignUpForm: React.FC = () => {
  const classes = useStyles();
  const [showHidePassword, changeShowHidePassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Formik
      initialValues={SignUpFormSchema.initialState}
      enableReinitialize
      validationSchema={SignUpFormSchema.validSchema}
      onSubmit={(values: SignUpFormData, meta: FormikHelpers<SignUpFormData>) => {
        meta.setSubmitting(true);
        dispatch(userActions.registration(values, meta, history));
      }}
    >
      {({ isSubmitting, dirty, isValid, handleBlur, touched }: FormikProps<SignUpFormData>) => (
        <Form>
          <Box display="grid" gridGap={16}>
            {SIGNUP.map((field) => (
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
                    error={Boolean(
                      meta.error && touched[field.name as 'email' | 'password' | 'username'],
                    )}
                    helperText={
                      meta.error && touched[field.name as 'email' | 'password' | 'username']
                        ? meta.error
                        : ''
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
            ))}

            <div className={classes.progressWrapper}>
              <ActionButton
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!(dirty && isValid) || isSubmitting}
                className={classes.submitButton}
              >
                Зарэгістравацца
              </ActionButton>
              {isSubmitting && <CircularProgress size={24} className={classes.progressIndicator} />}
            </div>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
