import './App.scss'
import 'boxicons'
import Title from './components/Title/Title'
import TodoList from './components/TodoList/TodoList'
import Filter from './components/Filter/Filter'
import Clear from './components/Clear/Clear'
import { createContext, useEffect, useState } from 'react'
import Form from './components/Form/Form'
import getInputValue from './functions/getInputValue'
import mapItems from './functions/mapItems'
import { MainContext } from './store/context'

function App() {
  console.log('app')
  const [todos, setTodos] = useState([])
  const [type, setType] = useState('all')
  useEffect(() => {
    const raw = localStorage.getItem('todos') || []
    setTodos(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const clear = () => {
    setTodos([])
  }

  return (
    <MainContext.Provider value={setTodos}>
      <div className="wrapper">
        <div className="wrapper__container container">
          <header className="header">
            <Title text="To Do list APP" />
          </header>
          <div className="main">
            <div className="main__content">
              <Form
                getInputValue={getInputValue}
                todos={todos}
                setTodos={setTodos}
              />
              <Filter setType={setType} />
              <TodoList>{mapItems(type, todos, setTodos)}</TodoList>
            </div>
            <Clear f={clear} />
          </div>
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default App
