import * as React from 'react';

import { makeStyles, createStyles, TextField } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import Wrapper from '../components/App/Wrapper/Wrapper';
import ActionButton from '../components/ActionButton/ActionButton';
import { CustomThemeOptions } from '../styles/types';

const SettingsPage: React.FC = () => {
  const [feedback, setFeedback] = React.useState('');
  const theme: CustomThemeOptions = useTheme();

  const useStyles = makeStyles(() =>
    createStyles({
      header: {
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 45,
      },
      textareaLabel: {
        fontSize: 16,
        padding: '35px 5% 0',
      },
      textareaContainer: {
        width: '95%',
        margin: '25px auto 0',
        textAlign: 'center',
      },
      textarea: {
        backgroundColor: theme.custom.colors.primaryLight,
        borderRadius: 8,
        marginBottom: 100,
        boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.09)',
      },
      button: {
        width: '70%',
      },
    }),
  );

  const classes = useStyles();

  return (
    <Wrapper settingsElementMode actionBarHeader="Зваротная сувязь">
      <div className={classes.header}>
        <strong>Паважаны карыстальнік!</strong> <br />
        Будзем рады пачуць вашы водгукі, <br />
        прапановы ці варыянты палепшання <br />
        нашага слоўніка
      </div>
      <div className={classes.textareaLabel}>Ваша паведамленне адміністратару</div>
      <div className={classes.textareaContainer}>
        <TextField
          placeholder="Увядзіце ваша паведамленне"
          multiline
          rows={10}
          fullWidth
          value={feedback}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFeedback(e.target.value)}
          variant="outlined"
          classes={{ root: classes.textarea }}
        />
        <ActionButton
          disabled={!feedback}
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.button}
        >
          Адправіць
        </ActionButton>
      </div>
    </Wrapper>
  );
};

export default SettingsPage;
