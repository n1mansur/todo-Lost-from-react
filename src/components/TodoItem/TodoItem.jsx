import React, { useState } from 'react'
import { useRef } from 'react'
import Styles from './TodoItem.module.scss'

export default function TodoItem({ element, num, todos, setTodos }) {
  const inp = useRef()
  const focusInput = () => {
    inp.current.focus()
  }
  const deleteFn = (e) => {
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    let item = e.target.closest(`.${Styles.item}`)
    item.classList.add('deleteEffect')
    setTimeout(() => {
      setTodos(todos.filter((el) => el.id != currentId))
    }, 500)
  }
  const [isDisablet, setIsDisabled] = useState(true)
  const [value, setValue] = useState(element.value)
  const saveBtn = () => {
    setTodos((old) =>
      old.map((v) => (v.id === element.id ? { ...v, value } : v))
    )
    setIsDisabled(true)
  }
  const onCancel = () => {
    setValue(element.value)
    setIsDisabled(true)
  }
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const editBtn = (e) => {
    setIsDisabled(false)
    focusInput()
    inp.current.focus()
  }
  const blurFn = (e) => {
    //  setTimeout(() => {
    //    console.log('blur')
    //    setValue(element.value)
    //    setIsDisabled(true)
    //  }, 100)
  }
  const checkFn = (e) => {
    //let currentItem = e.target.closest(`.${Styles.item}`)?.id
    //setTodos((old) => old.map((todo) => !todo.isDone))
    //console.log(todos);
    ////console.log(todos[0].isDone)
  }
  return (
    <li className={Styles.item} draggable="true" id={element.id}>
      <span className={Styles.nth}>{num + 1}</span>
      <div className={Styles.item__section}>
        <div className={Styles.date}>
          <span className="days">{element.date}</span>
        </div>
        <div className={Styles.item__form}>
          {element.isDone ? (
            <label className={Styles.label}>
              <box-icon color="#fff" name="check"></box-icon>
              <input
                type="checkbox"
                checked={element.isDone}
                className={Styles.checkbox}
                onChange={(e) => checkFn(e)}
              />
            </label>
          ) : (
            <label className={Styles.label}>
              <input
                type="checkbox"
                checked={element.isDone}
                className={Styles.checkbox}
                onChange={(e) => checkFn(e)}
              />
            </label>
          )}
          <input
            ref={inp}
            onBlur={blurFn}
            disabled={isDisablet}
            className={(Styles.todo, Styles.item__input)}
            value={value}
            onChange={(e) => {
              onChange(e)
            }}
            id={`inp${element.id}`}
          />
        </div>
      </div>
      <div className={Styles.item__btns}>
        {isDisablet ? (
          <button className={Styles.item__btn} onClick={(e) => editBtn(e)}>
            <box-icon color={'#fff'} type="solid" name="pencil"></box-icon>
          </button>
        ) : (
          <></>
        )}
        {!isDisablet ? (
          <>
            <button className={Styles.item__btn} onClick={saveBtn}>
              <box-icon color={'#fff'} name="save"></box-icon>
            </button>
            <button className={Styles.item__btn} onClick={onCancel}>
              <box-icon color={'#fff'} name="x"></box-icon>
            </button>
          </>
        ) : (
          <></>
        )}
        <button onClick={deleteFn} className={Styles.item__btn}>
          <box-icon color={'#fff'} name="trash"></box-icon>
        </button>
      </div>
    </li>
  )
}
