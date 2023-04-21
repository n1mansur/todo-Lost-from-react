const ADD_TODO = 'ADD_TODO'
const DELETE = 'DELETE_TODO'
const CHECKED = 'CHECKED_TODO'
const SAVED = 'SAVED_TODO'
const SETDATA = 'SETDATA'
const raw = localStorage.getItem('todos') || []
const initialState = JSON.parse(raw)

export default function TodoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [{ ...action.payload }, ...state]
    case DELETE:
      return state.filter((el) => el.id != action.id)
    case CHECKED:
      return state.map((el) =>
        el.id == action.id ? { ...el, isDone: !el.isDone } : el
      )
    case SAVED:
      return state.map((v) =>
        v.id === action.id ? { ...v, value: action.value } : v
      )
    case SETDATA:
      return action.data
    default:
      return state
  }
}
export const addActionCreater = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  }
}

export const deleteActionCreater = (id) => {
  return {
    type: DELETE,
    id,
  }
}
export const setActionCreater = (data) => {
  return { type: SETDATA, data }
}
export const checkedActionCreater = (id) => {
  return {
    type: CHECKED,
    id,
  }
}

export const savedActionCreater = (value, id) => {
  return {
    type: SAVED,
    value,
    id,
  }
}
