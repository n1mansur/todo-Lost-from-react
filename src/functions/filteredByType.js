export default function filteredByType(type, todos) {
  return todos.filter((v) => {
    if (type == 'all') return true
    if (type == 'completed') return v.isDone
    if (type == 'proccess') return !v.isDone
  })
}
