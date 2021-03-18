import React, { useState } from 'react';
import Header from '../components/HeaderComponent';
import '../style/CostumerProfile.css';

function CostumerProfile() {
  const [/* valid */, setValid] = useState(false);

  const isValid = async () => {
    // const input = funcValidations.validateEmail(inputValues.email);
    if (password && email) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputValues.password, inputValues.emai]);

  return (
    <div className="costumer_profile">
      <Header text="Meu Perfil" id="top-title" />
      <p>Nome</p>
      <input
        type="text"
        name="p-name"
        id="p-name"
        data-testid="profile-name-input"
      />
      <p>Email</p>
      <input
        type="text"
        name="p-email"
        id="p-email"
        data-testid="profile-email-input"
        readOnly
      />
      <button
        type="button"
        data-testid="profile-save-btn"
        className="bttn_costumer_profile"
      >
        Salvar
      </button>
    </div>
  );
}

export default CostumerProfile;
