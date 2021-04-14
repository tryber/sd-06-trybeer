import { screen } from '@testing-library/dom';
import React from 'react';
import renderWithRouter from '../src/tests/RenderWithRouter';
import App from './App';

describe('App component', () => {
 test('it renders', () => {
  renderWithRouter(<App />);

  expect(screen.getByText('Email')).toBeInTheDocument();
 });
})
