import { MD5 } from 'crypto-js';

const imgSRC = (email) => {
  const hash = MD5(email);
  const gravatarURL = 'https://www.gravatar.com/avatar/';
  return `${gravatarURL}${hash}?s=250`;
};

export default imgSRC;
