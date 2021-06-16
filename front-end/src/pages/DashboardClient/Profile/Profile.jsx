import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Input from '../../../components/Input/Input';
import { updateUser } from '../../../services/Users';
import { updateName, verifyUser } from '../../../store/LocalStorage/actions';
import profileIcon from './profileIcon.png';
import emailIcon from './emailIcon.png';
import nomeIcon from './nomeIcon.png';
import './Profile.css';

const handleSaveButton = async ({
  userName,
  email,
  setUserNameInStorage,
  setIsUpdated,
}) => {
  const storage = JSON.parse(localStorage.getItem('user'));
  const { token } = storage;
  await updateUser(userName, email, token);
  updateName(userName);
  setUserNameInStorage(userName);
  setIsUpdated(true);
};

export default function Profile() {
  const [userName, setUserName] = useState(); // -> lenadro parisi carvalho
  const [userEmail, setUserEmail] = useState();
  const [userNameInStorage, setUserNameInStorage] = useState(); // -> lenadro parisi
  const [isUpdated, setIsUpdated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const { name, email } = verifyUser(history);
    setUserName(name);
    setUserEmail(email);
    setUserNameInStorage(name);
  }, [history]);

  const setField = (field, value) => {
    if (field === ' ') return setUserName(value);
  };

  const buttonClickPayload = { userName, userEmail, setUserNameInStorage, setIsUpdated };
  return (
    <div className="page-with-menu">
      <Header title="Meu perfil" user="client" />
      <img className="logo-perfil" src={profileIcon} alt='logo perfil' />
      <form>
      <div className='div-input'>
      <img className="logo-name" src={nomeIcon} alt='logo nome' />
      <div className='input-profile'>
        <Input
          title=" "
          value={ userName }
          testId="profile-name-input"
          onChange={ setField }
        />
        </div>
        </div>
        <div className='div-input'>
        <img className="logo-name" src={emailIcon} alt='logo nome' />
      <div className='input-email'>
        <Input
          title=""
          value={ userEmail }
          testId="profile-email-input"
          isReadOnly
        />
        </div>
        </div>
        <div className="div-button">
        <button
          data-testid="profile-save-btn"
          type="button"
          disabled={ userName === userNameInStorage }
          onClick={ () => handleSaveButton(buttonClickPayload) }
        >
          Salvar
        </button>
        </div>
        <div className='att-name'>
        {isUpdated && 'Atualização concluída com sucesso'}
        </div>
      </form>
    </div>
  );
}
