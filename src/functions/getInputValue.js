import dateFormatter from '../functions/dateFormatter'
import { addActionCreater } from '../redux/Rducer'

export default function getInputValue(e, todos, setTodos, dispatch) {
  e.preventDefault()
  let value = e.target.elements['todo'].value
  if (value) {
    const newTodo = {
      value: value,
      id: new Date().getTime(),
      date: dateFormatter(new Date()),
      isDone: false,
    }
    dispatch(addActionCreater(newTodo))
    setTodos([newTodo, ...todos])
    e.target.elements['todo'].value = ''
  } else {
    document.getElementById('listValue').classList.add('emptyInp')
    setTimeout(() => {
      document.getElementById('listValue').classList.remove('emptyInp')
    }, 1000)
  }
}
