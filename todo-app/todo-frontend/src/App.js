import './App.css';
import TodoView from './Todos/TodoView'
require('dotenv').config()

function App() {
  return (
    <div className="App">
      <TodoView />
    </div>
  );
}

export default App;
