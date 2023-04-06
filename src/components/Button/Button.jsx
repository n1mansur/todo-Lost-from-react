import React from 'react'
import styles from './Button.module.scss'

export default function Button({ type, text }) {
  return (
    <button id="btn" type={type} className={styles.form__btn}>
      {text}
    </button>
  )
}
