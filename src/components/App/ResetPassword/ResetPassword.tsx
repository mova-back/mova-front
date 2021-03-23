import { Box, CircularProgress, createStyles, makeStyles } from '@material-ui/core';
import { FormikHelpers, FormikProps, FieldProps, Formik, Field, Form } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import resetPasswordFields, { ResetPasswordDataType } from '../../../constants/forms/resetPassword';
import { userActions } from '../../../store/user/reducer/userReducer';
import ActionButton from '../../ActionButton/ActionButton';
import Input from '../../Input/Input';
import ResetPasswordSchema from './ResetPasswordSchema';

const useStyles = makeStyles(() =>
  createStyles({
    wrapperBtn: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      margin: '10px 0 45px',
    },
    btn: {
      width: '100%',
    },
    progressIndicator: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

const ResetPassword: React.FC<{ token: string | null }> = ({ token }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={ResetPasswordSchema.initialState}
      validationSchema={ResetPasswordSchema.validSchema}
      onSubmit={(values: ResetPasswordDataType, meta: FormikHelpers<ResetPasswordDataType>) => {
        dispatch(userActions.confirmResetPassword(values.password, token, meta));
      }}
    >
      {({ dirty, isValid, isSubmitting }: FormikProps<ResetPasswordDataType>) => (
        <Form>
          <Box display="grid" gridGap={16}>
            {resetPasswordFields.map((field) => (
              <Field key={field.id} name={field.name}>
                {({ field: formikField, meta }: FieldProps) => (
                  <Input
                    {...formikField}
                    type={field.type}
                    label={field.label}
                    error={Boolean(meta.error && meta.touched)}
                    helperText={meta.error && meta.touched ? field.helperText : ''}
                  />
                )}
              </Field>
            ))}

            <div className={classes.wrapperBtn}>
              <ActionButton
                variant="contained"
                color="secondary"
                type="submit"
                disabled={!(dirty && isValid) || isSubmitting}
                className={classes.btn}
              >
                Адправіць
              </ActionButton>
              {isSubmitting && <CircularProgress size={24} className={classes.progressIndicator} />}
            </div>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;
