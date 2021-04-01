import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import MenuAndTopBar from '../components/MenuAndTopBar';
import SubmitButton from '../components/SubmitButton';
import API from '../services/API';
import { setUserData, getUserData, getUserToken } from '../services/localStorage';
import '../styles/pages/Profile.css';
import imgSRC from '../services/profilePic';

function Profile({ location: { pathname } }) {
  const user = getUserData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [avatarURL, setAvatarURL] = useState('');
  const history = useHistory();

  const isAdmin = pathname.includes('admin');

  const loadUserInfo = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarURL(imgSRC(user.email));
    }
  };

  const checkToken = async () => {
    const token = getUserToken();
    const response = await API.validateUserToken(token);
    if (!response) history.push('/login');
  };

  useEffect(() => {
    checkToken();
    loadUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isNameChanged = (actualName) => user.name !== actualName;

  const handleUpdateName = async () => {
    const userUpdated = { ...user, name };
    setUserData(userUpdated);
    setIsUpdated(true);
    const MESSAGE_TIME = 1500;

    await API.updateUserName(name, email);
    setTimeout(() => setIsUpdated(false), MESSAGE_TIME);
  };

  return (
    <div className={ isAdmin ? 'adminSideBarAdjust' : '' }>
      <MenuAndTopBar pathname={ pathname } title="Meu perfil" />
      { isAdmin ? (
        <div className="adminProfileContainer">
          <h2>Perfil</h2>
          <img src={ avatarURL } alt="user profile pic" />
          <br />
          <h3 data-testid="profile-name">{ `Nome: ${name}` }</h3>
          <h3 data-testid="profile-email">{ `Email: ${email}` }</h3>
        </div>
      ) : (
        <div className="userProfileContainer">
          <img src={ imgSRC() } alt="user profile pic" />
          <Input
            id="profile-name-input"
            name="Nome"
            field={ name }
            setField={ setName }
          />
          <Input
            id="profile-email-input"
            name="Email"
            field={ email }
            readOnly
          />
          <SubmitButton
            name="Salvar"
            onClick={ handleUpdateName }
            disabled={ !isNameChanged(name) }
            id="profile-save-btn"
          />
          {isUpdated && (
            <div className="modalContainer">
              <p>Atualização concluída com sucesso</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Profile.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default Profile;
