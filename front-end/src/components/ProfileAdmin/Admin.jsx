import React from 'react';
import jwtDecode from 'jwt-decode';
import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
    <div className={ classes.container }>
      <FormControl>
        <div className={ classes.paper }>
          <TextField
            id="name"
            variant="filled"
            label="Name"
            defaultValue={ `${handleName()}` }
            data-testid="profile-name"
            InputProps={ {
              readOnly: true,
            } }
          />
        </div>
        <div className={ classes.paper }>
          <TextField
            id="email"
            variant="filled"
            label="Email"
            defaultValue={ `${handleEmail()}` }
            data-testid="profile-email"
            InputProps={ {
              readOnly: true,
            } }
          />
        </div>
      </FormControl>
    </div>
  );
}
