import React from 'react';
import Todo from '../Todos/Todo'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';

describe('<Todo >', () => {
  test('renders Todo component', () => {
    render(<Todo />);

    expect(screen.getByText('writing code')).toBeInTheDocument();

  });
});