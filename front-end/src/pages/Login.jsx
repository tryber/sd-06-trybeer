import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import login from '../methods/login';
import Button from '../components/Button';
import Input from '../components/Input';
import { loginSchema } from '../validationsSchemas/login';
import './Login.css';

const handleChanges = async (email, password, disableButton) => {
  try {
    await loginSchema.validate({ email, password });
    disableButton(false);
  } catch (err) {
    disableButton(true);
  }
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLogin, setButton] = useState(true);
  const [user, setUser] = useState('');

  handleChanges(email, password, setButton);
  
  if (user.role) {
    return user.role === 'administrator'
      ? <Redirect to="/admin/profile" />
      : <Redirect to="/products" />;
  }
  return (

    <main>

      <form>
        <Input type="email" setValue={ setEmail } value={ email } />
        <Input type="password" setValue={ setPassword } value={ password } />
        <Button
          className="signin-btn"
          onClick={ async () => setUser(await login({ email, password })) }
          disabled={ buttonLogin }

        >
          Entrar
        </Button>
        <Link
          to="/register"
          className="no-account-btn"
        >
          Ainda não tenho conta
        </Link>
      </form>
    </main>
  );
}

export default Login;
