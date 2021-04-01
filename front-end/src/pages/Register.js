import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';
import UserContext from '../context/UserContext';
import API from '../services/API';
import { signupDataValidator } from '../services/dataValidator';
import { setUserData } from '../services/localStorage';
import '../styles/pages/Register.css';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const { setUser } = useContext(UserContext);
  const [badReq, setBadReq] = useState(false);

  const handleRegister = async () => {
    const user = await API.addUser(name, email, password, check);
    setUserData(user);
    setUser(user);
    if (user) {
      if (check) {
        history.push('/admin/orders');
      } else { history.push('/products'); }
      return;
    }
    setBadReq(true);
  };

  return (
    <div className="registerPageContainer">
      <div className="registerContainer">
        <h2>Registro</h2>
        <Input id="signup-name" name="Nome" field={ name } setField={ setName } />
        <Input id="signup-email" name="Email" field={ email } setField={ setEmail } />
        <Input
          id="signup-password"
          name="Senha"
          field={ password }
          setField={ setPassword }
          type="password"
        />
        <Checkbox
          id="signup-seller"
          name="Quero vender"
          field={ check }
          setField={ setCheck }
        />
        <SubmitButton
          name="Cadastrar"
          onClick={ handleRegister }
          disabled={ signupDataValidator(name, email, password) }
          id="signup-btn"
        />
        { badReq && <p>E-mail already in database.</p> }
      </div>
    </div>
  );
}

export default Register;
