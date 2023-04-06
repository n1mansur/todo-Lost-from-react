import React from 'react'
import Styles from './TodoItem.module.scss'

export default function TodoItem({ value, num, todos, setTodos }) {
  const deleteFn = (e) => {
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    let a = e.target.closest(`.${Styles.item}`)
    a.classList.add('deleteEffect')
    setTimeout(() => {
      setTodos(todos.filter((el) => el.id != currentId))
    }, 500)
  }
  return (
    <li className={Styles.item} draggable="true" id={value.id}>
      <span className={Styles.nth}>{num + 1}</span>
      <div className={Styles.item__section}>
        <div className={Styles.date}>
          <span className="days">{value.date}</span>
        </div>
        <div className={Styles.item__form}>
          <label className={Styles.label}>
            <input type="checkbox" className={Styles.checkbox} />
          </label>
          <input
            disabled
            className={(Styles.todo, Styles.item__input)}
            value={value.value}
          />
        </div>
      </div>
      <div className={Styles.item__btns}>
        <button className={Styles.item__btn}>
          <box-icon color={'#fff'} type="solid" name="pencil"></box-icon>
        </button>
        <button style={{ display: 'none' }} className={Styles.item__btn}>
          <box-icon color={'#fff'} name="save"></box-icon>
        </button>
        <button style={{ display: 'none' }} className={Styles.item__btn}>
          <box-icon color={'#fff'} name="x"></box-icon>
        </button>
        <button onClick={deleteFn} className={Styles.item__btn}>
          <box-icon color={'#fff'} name="trash"></box-icon>
        </button>
      </div>
    </li>
  )
}
