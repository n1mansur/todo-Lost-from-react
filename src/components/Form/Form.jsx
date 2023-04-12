import React from 'react'
import Button from '../Button/Button'
import styles from './Form.module.scss'

export default function Form({ getInputValue }) {
  return (
    <form className={styles.form} onSubmit={getInputValue}>
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
