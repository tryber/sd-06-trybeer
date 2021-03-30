import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    <div className={ classes.container }>
      <FormControl>
        <div className={ classes.nameContainer }>
          <TextField
            className={ classes.nameField }
            id="name"
            variant="filled"
            label="Nome"
            defaultValue={ name }
            data-testid="profile-name-input"
            onChange={ setName }
          />
        </div>
        <div className={ classes.nameContainer }>
          <TextField
            id="email"
            variant="filled"
            label="Email"
            defaultValue={ tokenDecoded.email }
            data-testid="profile-email-input"
            InputProps={ {
              readOnly: true,
            } }
          />
        </div>
        <div className={ classes.buttonContainer }>
          <Button
            className={ classes.buttonField }
            type="button"
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
      </FormControl>
    </div>
  );
}
