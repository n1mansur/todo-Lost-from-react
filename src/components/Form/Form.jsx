import React from 'react'
import Button from '../Button/Button'
import styles from './Form.module.scss'
import { useDispatch } from 'react-redux'

export default function Form({ getInputValue, todos, setTodos }) {
  const dispatch = useDispatch()
  return (
    <form
      className={styles.form}
      onSubmit={(e) => getInputValue(e, todos, setTodos, dispatch)}
    >
      <input
        placeholder="Text input"
        className={styles.form__inp}
        type="text"
        name="todo"
        id="listValue"
      />
      <Button text="Add" type="submit" />
    </form>
  )
}
