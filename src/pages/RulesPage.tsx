import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { createStyles, makeStyles, Link } from '@material-ui/core';

import { Page } from '../constants/paths';
import Wrapper from '../components/App/Wrapper/Wrapper';

const useStyles = makeStyles(() =>
  createStyles({
    logoContainer: {
      textAlign: 'center',
      padding: '15px 0 25px',
    },
    introduction: {
      textAlign: 'center',
      fontSize: '16px',
    },
    rulesList: {
      fontSize: '16px',
      paddingRight: '3%',
    },
    item: {
      margin: '25px 0',
    },
  }),
);

const RulesPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Wrapper actionBarHeader="Правілы карыстання">
      <div className={classes.logoContainer}>
        <Link component={NavLink} to={Page.Home}>
          <img src="./assets/images/logo.png" alt="app-logo" />
        </Link>
      </div>
      <div className={classes.introduction}>
        Id venenatis dolor leo nisl. Tempus curabitur egestas quis est. Amet, turpis ut at eu eu
        accumsan. Ac ornare vestibulum malesuada sem fusce nunc, blandit nisi.
      </div>
      <ol className={classes.rulesList}>
        <li className={classes.item}>
          <strong>Tellus tincidunt et tellus</strong>, fringilla enim pulvinar amet. Eu rutrum
          egestas feugiat at. Ac ultrices amet pellentesque amet, nam amet sapien lorem cursus. Ac
          sit justo amet sit sem maecenas.
        </li>
        <li className={classes.item}>
          <strong>Sem posuere congue bibendum eu</strong>. Vel sit vivamus vulputate porta eu ac.
          Potenti leo cras faucibus neque, sit pulvinar aenean vitae pellentesque.
        </li>
        <li className={classes.item}>
          <strong>Cursus sit maecenas egestas neque</strong>, auctor odio ac tempor erat. Purus nunc
          eu scelerisque feugiat lorem mattis. Arcu, mattis ac cras cursus adipiscing tincidunt.
          Lorem et eget quis malesuad.
        </li>
      </ol>
    </Wrapper>
  );
};

export default RulesPage;
