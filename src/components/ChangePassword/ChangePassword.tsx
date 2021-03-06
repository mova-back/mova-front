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

import ChangePasswordData from '../../models/forms/changePasswordData';
import ChangePasswordSchema from './ChangePasswordSchema';
import CHANGE_PASSWORD from '../../constants/forms/changePassword';

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

const ChangePassword: React.FC = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={ChangePasswordSchema.initialState}
      validationSchema={ChangePasswordSchema.validSchema}
      onSubmit={(
        values: ChangePasswordData,
        meta: FormikHelpers<ChangePasswordData>
      ) => {
        // console.log(values);
        meta.setSubmitting(false);
      }}
    >
      {({ dirty, isValid, isSubmitting }: FormikProps<ChangePasswordData>) => (
        <Form>
          <Box display="grid" gridGap={16}>
            {CHANGE_PASSWORD.map((field) => (
              <Field key={field.name} name={field.name}>
                {({ field: formikField, meta }: FieldProps) => (
                  <Input
                    {...formikField}
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
                Змяніць пароль
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

export default ChangePassword;
