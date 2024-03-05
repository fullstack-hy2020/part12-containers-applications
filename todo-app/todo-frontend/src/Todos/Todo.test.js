import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Todo from './Todo.js'

test('renders', () => {
  const todo = {
    text: 'Learn about containers',
    done: false,
  }
  const createTodo = async (todo) => {}

  const deleteTodo = async (todo) => {}
  render(<Todo todo={todo} createTodo={createTodo} deleteTodo={deleteTodo} />)
  const element = screen.getByText('Learn about containers')
  expect(element).toBeDefined()
})
