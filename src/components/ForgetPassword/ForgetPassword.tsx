import * as React from 'react';
import {
  Formik,
  Field,
  FormikHelpers,
  FormikProps,
  FieldProps,
  Form,
} from 'formik';

import {
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';

import Input from '../Input/Input';
import ActionButton from '../ActionButton/ActionButton';

import ForgetPasswordSchema from './ForgetPasswordSchema';
import ForgetPasswordData from '../../models/forms/forgetPasswordData';

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
  })
);

const FORGET_PASSWORD = [
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    helperText: 'Абавязковае поле',
  },
];

const ForgetPassword: React.FC = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={ForgetPasswordSchema.initialState}
      validationSchema={ForgetPasswordSchema.validSchema}
      onSubmit={(
        values: ForgetPasswordData,
        meta: FormikHelpers<ForgetPasswordData>
      ) => {
        // console.log(values);
        meta.setSubmitting(false);
      }}
    >
      {({ dirty, isValid, isSubmitting }: FormikProps<ForgetPasswordData>) => (
        <Form>
          <Box display="grid" gridGap={16}>
            {FORGET_PASSWORD.map((field) => (
              <Field key="email" name="email">
                {({ field: formikField, meta }: FieldProps) => (
                  <Input
                    {...formikField}
                    label={field.label}
                    error={Boolean(meta.error && meta.touched)}
                    helperText={
                      meta.error && meta.touched ? field.helperText : ''
                    }
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
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  className={classes.progressIndicator}
                />
              )}
            </div>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ForgetPassword;
