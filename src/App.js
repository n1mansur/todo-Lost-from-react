import './App.scss'
import 'boxicons'
import Button from './components/Button/Button'
import Title from './components/Title/Title'
import TodoItem from './components/TodoItem/TodoItem'
import TodoList from './components/TodoList/TodoList'
import Filter from './components/Filter/Filter'
import Clear from './components/Clear/Clear'
import { useEffect, useState } from 'react'
import dateFormatter from './functions/dateFormatter'

function App() {
  const getInputValue = (e) => {
    e.preventDefault()
    let value = e.target.elements['todo'].value
    if (value) {
      const newTodo = {
        value: value,
        id: new Date().getTime(),
        date: dateFormatter(new Date()),
        isDone: false,
      }
      setTodos([newTodo, ...todos])
      e.target.elements['todo'].value = ''
    } else {
      document.querySelector('.form__inp').classList.add('emptyInp')
      setTimeout(() => {
        document.querySelector('.form__inp').classList.remove('emptyInp')
      }, 1000)
    }
  }
  const [todos, setTodos] = useState([
    { value: 'Coding', id: 2, date: '20:00 23.03.2023', isDone: true },
    { value: 'Watch TV', id: 1, date: '20:00 23.03.2023', isDone: false },
  ])
  useEffect(() => {
    const raw = localStorage.getItem('todos') || []
    setTodos(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const [filtered, setFiltered] = useState(todos)
  const filteredByStatus = (value) => {
    switch (value) {
      case 'completed':
        setFiltered(todos.filter((todo) => todo.isDone))
        break
      case 'proccess':
        setFiltered(todos.filter((todo) => !todo.isDone))
        break
      default:
        setFiltered(todos)
        break
    }
  }
  const mapItems = filtered.map((v, i) => {
    return (
      <TodoItem
        key={v.id}
        element={v}
        num={i}
        todos={todos}
        setTodos={setTodos}
      />
    )
  })
  const clear = () => {
    setTodos([])
  }
  document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyT') {
      console.log(todos)
    }
  })
  const getFilterValue = (e) => {
    filteredByStatus(e.target.value)
  }
  useEffect(() => {
    setFiltered(todos)
  }, [todos])
  return (
    <div className="wrapper">
      <div className="wrapper__container container">
        <header className="header">
          <Title text="To Do list APP" />
        </header>
        <div className="main">
          <div className="main__content">
            <form className="form" onSubmit={getInputValue}>
              <input
                placeholder="Text input"
                className="form__inp"
                type="text"
                name="todo"
                id="listValue"
              />
              <Button text="Add" type="submit" />
            </form>
            <Filter getFilterValue={getFilterValue} />
            <TodoList>{mapItems}</TodoList>
          </div>
          <Clear f={clear} />
        </div>
      </div>
    </div>
  )
}

export default App
