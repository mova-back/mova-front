import * as React from 'react';
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from 'formik';

import { Box, CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import Input from '../Input/Input';
import ActionButton from '../ActionButton/ActionButton';

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
  }),
);

const SignUpForm: React.FC = () => {
  const classes = useStyles();
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
