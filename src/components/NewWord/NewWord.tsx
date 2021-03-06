import * as React from 'react';
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';

import {
  Box,
  CircularProgress,
  createStyles,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';

import { useDispatch } from 'react-redux';
import Input from '../Input/Input';
import Switch from '../Switch/Switch';
import ActionButton from '../ActionButton/ActionButton';

import NewWordSchema from './NewWordSchema';
import { transformToCapitalize, transformToUppercase } from '../../utils';

import {
  NEWWORD_NO_REQUIRED,
  NEWWORD_REQUIRED,
} from '../../constants/forms/newword';
import NewWordData from '../../models/forms/newWordData';
import { wordsActions } from '../../store/words/wordsReducer';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '20px 30px',
      marginBottom: 44,
    },
    text: {
      margin: '11px 0 32px',
    },
    switch: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#445984',
      fontSize: 16,
      fontWeight: 700,
      margin: '15px 0 40px',
    },
    label: {
      '& label': {
        marginBottom: 11,
        textTransform: 'initial',
      },
    },
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

const NewWord: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={NewWordSchema.initialState}
      enableReinitialize
      validationSchema={NewWordSchema.validSchema}
      onSubmit={(values: NewWordData, meta: FormikHelpers<NewWordData>) => {
        dispatch(wordsActions.fetchCreateANewWord(values, meta));
      }}
    >
      {({ dirty, isValid, isSubmitting }: FormikProps<NewWordData>) => (
        <div className={classes.root}>
          <Form>
            <Box display="grid" gridGap={16} className={classes.label}>
              {NEWWORD_REQUIRED.map((field) => (
                <Field id={field.id} key={field.id} name={field.name}>
                  {({ field: formikField, meta }: FieldProps) => (
                    <Input
                      {...formikField}
                      label={transformToUppercase(field.label)}
                      error={Boolean(meta.error && meta.touched)}
                      helperText={
                        meta.error && meta.touched ? field.helperText : ''
                      }
                    />
                  )}
                </Field>
              ))}

              <Field key="swearing" name="swearing">
                {({ field: { value, onChange } }: FieldProps) => (
                  <FormControlLabel
                    className={classes.switch}
                    label={`${transformToUppercase('Лаянка')}*`}
                    labelPlacement="start"
                    control={
                      <Switch
                        id="swearing"
                        checked={value}
                        onChange={onChange}
                      />
                    }
                  />
                )}
              </Field>

              {NEWWORD_NO_REQUIRED.map((field) => (
                <Field key={field.id} name={field.name}>
                  {({ field: formikField, meta }: FieldProps) => (
                    <Input
                      {...formikField}
                      label={transformToCapitalize(field.label)}
                      error={Boolean(meta.error && meta.value)}
                      helperText={
                        meta.error && meta.value ? field.helperText : ''
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
        </div>
      )}
    </Formik>
  );
};

export default NewWord;
