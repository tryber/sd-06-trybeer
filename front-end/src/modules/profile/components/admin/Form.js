import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../../../context/Context';
import EmailInput from './EmailInput';
import NameInput from './NameInput';

function Form() {
  const [form, setForm] = useState({ email: '', name: '' });
  const { userData } = useContext(GlobalContext);

  useEffect(() => {
    const storage = userData;
    if (storage) setForm({ email: storage.email, name: storage.name });
  }, []);

  return (
    <form className="flex flex-col mt-10  space-y-4">
      { NameInput(form.name) }
      { EmailInput(form.email) }
    </form>
  );
}

export default Form;
