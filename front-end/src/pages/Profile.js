import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { TopMenu } from '../components';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import './PagesCSS/Profile.css';

function Profile(props) {
  const { user, eraseLocalStorage } = useContext(TrybeerContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const TIME_TO_REDIRECT = 3000;

  const setConfig = () => {
    setEmail(user.email);
    setName(user.name);
  };

  const onChangeName = ({ target: { value } }) => {
    if (name === value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = user;
    await fetchFunctions.put('register', token, { name: e.target.form[0].value, email });
    const { history } = props;
    setIsUpdated(true);
    eraseLocalStorage();
    setTimeout(() => history.push('/login'), TIME_TO_REDIRECT);
  };

  useEffect(() => {
    setConfig();
  }, [isUpdated, setConfig]);

  return (
    <div>
      <TopMenu
        titleMenu="Meu perfil"
      />
      <form method="put" className="my-container-profile">
        <div className="panel-profile">
          <label htmlFor="name" className="col-lg-20">
            Nome
            <div className="">
              <input
                data-testid="profile-name-input"
                type="text"
                name="name"
                placeholder="Nome"
                id="name"
                onChange={ onChangeName }
                className="form-control mt-0 y-3 p-4"
              />
            </div>
          </label>
          <div className="">
            <label htmlFor="email">
              Email
              <div className="">
                <input
                  value={ email }
                  readOnly="readonly"
                  data-testid="profile-email-input"
                  type="text"
                  name="email"
                  placeholder="Email"
                  id="email"
                  className="form-control mt-0 y-3 p-4"
                />
              </div>
            </label>
          </div>
          <div className="form-row">
            <div className="col-lg-20">
              <button
                data-testid="profile-save-btn"
                type="submit"
                disabled={ disabled }
                onClick={ handleSubmit }
                className="btn1 saveButton"
              >
                Salvar
              </button>
            </div>
          </div>
          {
            isUpdated && (<div> Atualização concluída com sucesso </div>)
          }
        </div>
      </form>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Profile;
