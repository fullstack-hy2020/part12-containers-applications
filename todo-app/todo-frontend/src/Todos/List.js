import React from 'react'
import Todo from './Todo.js'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo) => {
        return (
          <div key={todo._id}>
            <hr />
            <div>
              <Todo
                todo={todo}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default TodoList
