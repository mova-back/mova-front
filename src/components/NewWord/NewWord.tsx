import * as React from 'react';
import { Field, FieldProps, Form, Formik, FormikHelpers, FormikProps } from 'formik';

import {
  Box,
  CircularProgress,
  createStyles,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory, useParams } from 'react-router';
import Input from '../Input/Input';
import Switch from '../Switch/Switch';
import ActionButton from '../ActionButton/ActionButton';

import NewWordSchema from './NewWordSchema';
import { transformToCapitalize, transformToUppercase } from '../../utils';

import { NEWWORD_NO_REQUIRED, NEWWORD_REQUIRED } from '../../constants/forms/newword';
import NewWordData from '../../models/forms/newWordData';
import { wordsActions } from '../../store/words/wordsReducer';
import { RootState } from '../../store/rootReducer';

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
      fontWeight: 'normal',
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
  }),
);

interface NewWordProps {
  action: typeof wordsActions.fetchCreateANewWord | typeof wordsActions.changeWord;
}

const NewWord: React.FC<NewWordProps> = ({ action }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const currentlyModifiedWord = useSelector((state: RootState) => state.word.currentlyModifiedWord);
  const determineInitialValues = (): NewWordData => {
    if (id) {
      if (currentlyModifiedWord) {
        return currentlyModifiedWord;
      }
    }
    return NewWordSchema.initialState;
  };
  return (
    <Formik
      initialValues={determineInitialValues()}
      enableReinitialize
      validationSchema={NewWordSchema.validSchema}
      onSubmit={(values: NewWordData, meta: FormikHelpers<NewWordData>) => {
        switch (action) {
          case wordsActions.fetchCreateANewWord:
            dispatch(action(values, meta, history));
            break;
          case wordsActions.changeWord:
            dispatch(action(values, meta, history, id));
            break;
          default:
        }
      }}
    >
      {({ dirty, isValid, isSubmitting, handleBlur, touched }: FormikProps<NewWordData>) => (
        <div className={classes.root}>
          <Form>
            <Box display="grid" gridGap={16} className={classes.label}>
              {NEWWORD_REQUIRED.map((field) => (
                <Field id={field.id} key={field.id} name={field.name}>
                  {({ field: formikField, meta }: FieldProps) => (
                    <Input
                      {...formikField}
                      handleBlur={handleBlur}
                      placeholder={field.placeholder}
                      label={transformToUppercase(field.label)}
                      error={Boolean(meta.error && touched[field.name as keyof NewWordData])}
                      helperText={
                        meta.error && touched[field.name as keyof NewWordData] ? meta.error : ''
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
                    control={<Switch id="swearing" checked={value} onChange={onChange} />}
                  />
                )}
              </Field>

              {NEWWORD_NO_REQUIRED.map((field) => (
                <Field key={field.id} name={field.name}>
                  {({ field: formikField, meta }: FieldProps) => (
                    <Input
                      {...formikField}
                      label={transformToCapitalize(field.label)}
                      error={Boolean(meta.error && touched[field.name as keyof NewWordData])}
                      placeholder={field.placeholder}
                      helperText={
                        meta.error && touched[field.name as keyof NewWordData] ? meta.error : ''
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
                  <CircularProgress size={24} className={classes.progressIndicator} />
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
