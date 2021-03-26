import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { FormControl } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import fetches from '../../services/fetches';
import useInput from '../../hooks/useInput';
import { isTheNewNameDifferent, nameValidation } from '../../utils/validations';

export default function User() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const tokenDecoded = jwtDecode(tokenFromLocalStorage);
  const oldName = tokenDecoded.name;
  const classes = useStyles();
  const [name, setName] = useInput(tokenDecoded.name);

  const [newInfo, setNewInfo] = useState('');

  const handleUpdateInfo = async (email) => {
    await fetches.updateUserName(email, name);
    setNewInfo('Atualização concluída com sucesso');
  };

  return (
    <Container className={ classes.container }>
      <FormControl className={ classes.root } noValidate autoComplete="off">
        <div>
          <TextField
            id="name"
            size="medium"
            variant="filled"
            label="Nome"
            defaultValue={ name }
            data-testid="profile-name-input"
            onChange={ setName }
          />
        </div>
        <div>
          <TextField
            id="email"
            size="medium"
            variant="filled"
            label="Email"
            defaultValue={ tokenDecoded.email }
            data-testid="profile-email-input"
            InputProps={ {
              readOnly: true,
            } }
          />
        </div>
      </FormControl>
      <div>
        <Button
          variant="contained"
          color="primary"
          data-testid="profile-save-btn"
          disabled={ !(nameValidation(name) && isTheNewNameDifferent(oldName, name)) }
          onClick={ () => handleUpdateInfo(tokenDecoded.email) }
        >
          Salvar
        </Button>
        <Typography>{newInfo}</Typography>
      </div>
    </Container>
  );
}
