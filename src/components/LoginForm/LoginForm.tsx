import * as React from 'react';
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { Box, CircularProgress, createStyles, makeStyles } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import Input from '../Input/Input';
import ActionButton from '../ActionButton/ActionButton';

import LoginFormData from '../../models/forms/loginFormData';
import LoginFormSchema from './LoginFormSchema';
import LOGIN from '../../constants/forms/login';
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

// type Props = {
//   login: (values: LoginFormData, meta: FormikHelpers<LoginFormData>) => void;
// };

const LoginForm: React.FC = () => {
  const classes = useStyles();
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
    >
      {({ dirty, isValid, isSubmitting }: FormikProps<LoginFormData>) => (
        <Form>
          <Box display="grid" gridGap={16}>
            {LOGIN.map((field) => (
              <Field key={field.id} name={field.name}>
                {({ field: formikField, meta }: FieldProps) => (
                  <Input
                    {...formikField}
                    label={field.label}
                    error={Boolean(meta.error && meta.value)}
                    helperText={meta.error && meta.value ? meta.error : ''}
                  />
                )}
              </Field>
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
