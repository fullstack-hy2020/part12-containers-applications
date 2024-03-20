// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TodoView from './Todos/TodoView';
import axios from './util/apiClient';

describe('TodoView', () => {
  it('renders TodoView component without errors', () => {
    render(<TodoView />);
    // Si la renderización se realiza correctamente sin errores, la prueba pasa automáticamente
  });
});

// Mockear axios para simular llamadas a la API
jest.mock('./util/apiClient', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
}));

describe('TodoVie', () => {
  it('renders TodoView component', async () => {
    render(<TodoView />);
    expect(screen.getByText('Todos')).toBeInTheDocument();
  });

  it('creates a new todo', async () => {
    const newTodo = { _id: '1', text: 'New todo', done: false };
    axios.post.mockResolvedValueOnce({ data: newTodo });

    render(<TodoView />);
    
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: newTodo.text } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/todos', { text: newTodo.text }));
  });
});