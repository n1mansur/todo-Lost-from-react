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
import { useDispatch, useSelector } from 'react-redux'
import { setActionCreater } from './redux/Rducer'

function App() {
  const [todos, setTodos] = useState([])
  const [type, setType] = useState('all')
  const todosFromRedux = useSelector((state) => state)
  const dispatch = useDispatch()
  console.log(todosFromRedux)

  const url = 'https://644131f3792fe886a8a0f728.mockapi.io/todos'
  async function fetchTodos() {
    const res = await fetch(url)
    const data = await res.json()
    console.log('data', data)
    return data
  }
  useEffect(() => {
    fetchTodos().then((res) => dispatch(setActionCreater(res)))
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todosFromRedux))
  }, [todosFromRedux])
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
              <TodoList>{mapItems(type, todosFromRedux, setTodos)}</TodoList>
            </div>
            <Clear f={clear} />
          </div>
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default App
