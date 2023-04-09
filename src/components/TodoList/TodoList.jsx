import React from 'react'
import Styles from './TodoList.module.scss'

document.addEventListener('keydown', (e) => {
  if (e.code == 'KeyL') {
    console.log(document.querySelector(`.${Styles.list}`))
  }
})
export default function TodoList({ children }) {
  return (
    <ul className={Styles.list}>
      {children}
    </ul>
  )
}
