import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function AdminProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const auxFunc = async () => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    if (!storageUser) {
      history.push('/login');
    }
  };

  useEffect(() => {
    auxFunc();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  return (
    <div>
      <h2>Perfil</h2>
      <p data-testid="profile-name">{`Nome: ${name}`}</p>
      <p data-testid="profile-email">{`Email: ${email}`}</p>
    </div>
  );
}

export default AdminProfile;
