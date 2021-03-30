import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

let emailInput;
let passwordInput;
let signinBtn;
let noAccountBtn;

beforeEach( () => {
  const { getByTestId } = render(<App />);
  emailInput = getByTestId(/email-input/i);
  passwordInput = getByTestId(/password-input/i);
  signinBtn = getByTestId(/signin-btn/i);
  noAccountBtn = getByTestId(/no-account-btn/i);
});

describe('Check Login component', () => {
  it('Login has all the required fields', () => {
    const neededElements = [emailInput, passwordInput, signinBtn, noAccountBtn];
    render()
    for (const element of neededElements) {
      expect(element).toBeInTheDocument();
    }
  });
  
    const validEmails = [
      'email@example.com',
      'email@example.com.au',
      'email@example.com.pt',
      'firstname.lastname@example.com',
      'email@subdomain.example.com',
      'firstname+lastname@example.com',
      // 'email@123.123.123.123',
      // 'email@[123.123.123.123]',
      '"email"@example.com',
      '1234567890@example.com',
      'email@example-one.com',
      '_______@example.com',
      'email@example.name',
      'email@example.museum',
      'email@example.co.jp',
      'firstname-lastname@example.com',
      'firstname-lastname@example.com.br',
    ]
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      'email.@example.com',
      'email..email@example.com',
      // 'あいうえお@example.com',
      'email@example.com (Joe Smith)',
      'email@example',
      'email@-example.com',
      // 'email@example.web',
      'email@111.222.333.44444',
      'email@example..com',
      'Abc..123@example.com',
      '”(),:;<>[\]@example.com',
      // 'just”not”right@example.com',
      'this\ is"really"not\allowed@example.com',
    ];
    const validPassword = '123456';
    for (const email of invalidEmails) {
      it(`SHALL NOT PASS ${email}`, () => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: validPassword } });
      expect(signinBtn).toHaveAttribute('disabled');
      });
    }
    for (const email of validEmails) {
      it(`format is allowed ${email}`, () => {
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: validPassword } });
      expect(signinBtn).not.toHaveAttribute('disabled');
      });
    }
});
