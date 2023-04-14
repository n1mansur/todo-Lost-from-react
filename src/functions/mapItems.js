import TodoItem from '../components/TodoItem/TodoItem'
import filteredByType from './filteredByType'

export default function mapItems(type, todos, setTodos) {
  return filteredByType(type, todos).map((v, i) => {
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
}
