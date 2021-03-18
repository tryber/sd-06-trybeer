import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/HeaderComponent';
import fetchApiJsonBody from '../service/fetchApi';
import BeersAppContext from '../context/BeersAppContext';
import '../style/CostumerProfile.css';

function CostumerProfile() {
  const { user, setUser } = useContext(BeersAppContext);
  const { name, email, token } = user;

  const [valid, setValid] = useState(true);
  const [inputName, setInputName] = useState(name);

  const isValid = () => {
    if (inputName === name) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputName]);

  const onClickSave = async () => {
    console.log('inputName', inputName)
    const rs = await fetchApiJsonBody('/profile', { name: inputName }, 'PUT', token);
    if (rs.err) return alert(rs.err);
    console.log('foi');
    setUser({ ...user, name: rs.name });
  };

  return (
    <div className="costumer_profile">
      <Header text="Meu Perfil" id="top-title" />
      <p>Nome</p>
      <input
        type="text"
        name="p-name"
        id="p-name"
        disable={ valid }
        data-testid="profile-name-input"
        onChange={ ({ target }) => setInputName(target.value) }
        value={ inputName }
      />
      <p>Email</p>
      <input
        type="text"
        name="p-email"
        id="p-email"
        data-testid="profile-email-input"
        readOnly
        value={ email }
      />
      <button
        type="button"
        data-testid="profile-save-btn"
        // className="bttn_costumer_profile"
        disabled={ valid }
        onClick={ onClickSave }
      >
        Salvar
      </button>
    </div>
  );
}

export default CostumerProfile;
