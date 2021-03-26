import React from 'react';
import jwtDecode from 'jwt-decode';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import useStyles from './styles';

export default function Admin() {
  const classes = useStyles();
  const tokenFromLocalStorage = localStorage.getItem('token');

  const handleName = () => {
    if (tokenFromLocalStorage) {
      const tokenDecoded = jwtDecode(tokenFromLocalStorage);
      return tokenDecoded.name;
    }
  };

  const handleEmail = () => {
    if (tokenFromLocalStorage) {
      const tokenDecoded = jwtDecode(tokenFromLocalStorage);
      return tokenDecoded.email;
    }
  };
  return (
    <Container className={ classes.container }>
      {/* <div className={ classes.root }> */}
      <Grid className={ classes.infoContainer } container spacing={ 3 }>
        <Grid item>
          <Paper className={ classes.paper }>
            <Typography
              data-testid="profile-name"
            >
              {`Nome: ${handleName()}`}
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={ classes.paper }>
            <Typography
              data-testid="profile-email"
            >
              {`Email: ${handleEmail()}`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* </div> */}
    </Container>
  );
}
