import dateFormatter from '../functions/dateFormatter'

export default function getInputValue(e, todos, setTodos) {
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
    document.getElementById('listValue').classList.add('emptyInp')
    setTimeout(() => {
      document.getElementById('listValue').classList.remove('emptyInp')
    }, 1000)
  }
}
