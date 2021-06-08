import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

const response = {data: [
  { 
    name: 'testuser', 
    email: 'user@test.com',
    role: 'client',
  },
  {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    + '.eyJuYW1lIjoidGVzdHVzZXIiLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjE3NjI4Nzg3LCJleHAiOjE2MTgyMzM1ODd9'
    + '.dQbYd0nU9e0aq7YJ_rHUq-ChkSm5uBcFP2ir8WLGxVg',
  }

]}

describe('1 - Teste tela de Login.', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true
    });
  });

  it('Será testado que é redirecionado para a pagina de /products ao clicar no button Entrar e o role ser "client"', () => {
    const mockOnClick = axios.post.mockImplementation(() => {
      return Promise.resolve(response);
    });

      const { getByTestId, history } = renderWithRouter(<App />);      

      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const buttonEntrar = getByTestId('signin-btn');

      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'test123' } });

      expect(buttonEntrar).toBeEnabled();

      fireEvent.click(buttonEntrar);

      expect(mockOnClick).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        const { pathname } = history.location;

        expect(pathname).toBe('/products');
      }, 1000);
    });
});
