import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
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

const allProducts = { data: [
  { 
    id: 1,
    name: "Skol Lata 250ml",
    price: "2.20",
    url_image: "http://localhost:3001/images/Skol Lata 350ml.jpg"
  },
  {
    id: 2,
    name: "Heineken 600ml",
    price: "7.50",
    url_image: "http://localhost:3001/images/Heineken 600ml.jpg"
  },
  {
    id: 3,
    name: "Antarctica Pilsen 300ml",
    price: "2.49",
    url_image: "http://localhost:3001/images/Antarctica Pilsen 300ml.jpg"
  }
]}

describe('1 - Teste tela de Login.', () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        // setItem: jest.fn((args1, args2) => console.log('entrei aqui no localStorage', args1, args2))
      },
      writable: true
    });
  });

  it('Será testado que é redirecionado para a pagina de /products ao clicar no button Entrar e o role ser "client"', async () => {
    const mockOnClick = axios.post.mockImplementation(() => {
      Promise.resolve(response);
      // console.log('my data from mockOnClick', response);
      return Promise.resolve(response);
    });

    // const mockOnAllProducts = axios.get.mockImplementation(() => {
    //   Promise.resolve(allProducts);
    //   console.log('entrei Aqui no mock products')
    //   return Promise.resolve(allProducts);
    // });

    const { getByTestId, history } = renderWithRouter(<App />);
    
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const buttonEntrar = getByTestId('signin-btn');
    
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });
    
    expect(buttonEntrar).toBeEnabled();

    fireEvent.click(buttonEntrar);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    // console.log('meu localsotrage', window.localStorage);
    await expect(window.localStorage.setItem).toHaveBeenCalled()
    // await waitForElement(() => expect(window.localStorage.setItem).toHaveBeenCalled());
    
    const { pathname } = history.location;
    expect(pathname).toBe('/products')
    // await waitForElement(() => expect(pathname).toBe('/products'));
    // console.log('passou pelo teste de redirecionar a página')
  });
});
