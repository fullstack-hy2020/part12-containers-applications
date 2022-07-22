import react from 'react'

const Todo = () => {
  const todo = {
    text: 'writing code',
    done: false
  }

  const doneInfo = (
    <><span>This todo is done</span></>
  )
  const notDoneInfo = (
    <><span>    This todo is not done</span></>
  )

  return (
    <>
      <span>
        {todo.text}
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </>
  )
}

export default Todo