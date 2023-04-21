import React, { useEffect, useRef, useState } from 'react'
import Styles from './TodoItem.module.scss'
import { useDispatch } from 'react-redux'
import {
  checkedActionCreater,
  deleteActionCreater,
  savedActionCreater,
} from '../../redux/Rducer'

export default function TodoItem({ element, num, todos, setTodos }) {
  const dispatch = useDispatch()

  const styleIsDone = element.isDone ? 'line-through' : ''
  const isDisplayEdit = element.isDone ? 'none' : ''
  const inputRef = useRef()
  const [isDisablet, setIsDisabled] = useState(true)
  const [value, setValue] = useState(element.value)
  const focusInp = () => {
    inputRef.current.focus()
    inputRef.current.classList.add('active--inp')
  }
  const deleteFn = (e) => {
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    let item = e.target.closest(`.${Styles.item}`)
    item.style.cssText = 'animation: deleteEffect 0.5s forwards;'
    setTimeout(() => {
      dispatch(
        //deleteActionCreater(setTodos(todos.filter((el) => el.id != currentId)))
        deleteActionCreater(currentId)
      )
    }, 500)
  }
  const saveBtn = () => {
    //setTodos((old) =>
    //  old.map((v) => (v.id === element.id ? { ...v, value } : v))
    //)
    dispatch(savedActionCreater(value, element.id))
    setIsDisabled(true)
    inputRef.current.classList.remove('active--inp')
  }
  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
      setValue(element.value)
      setIsDisabled(true)
      inputRef.current.classList.remove('active--inp')
    }
    if (e.code == 'Enter') {
      //setTodos((old) =>
      //  old.map((v) => (v.id === element.id ? { ...v, value } : v))
      //)
      dispatch(savedActionCreater(value, element.id))
      setIsDisabled(true)
      inputRef.current.classList.remove('active--inp')
    }
  })
  const onCancel = () => {
    setValue(element.value)
    setIsDisabled(true)
    inputRef.current.classList.remove('active--inp')
  }
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const editBtn = (e) => {
    setIsDisabled(false)
    focusInp()
  }
  const checkFn = (e) => {
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    //const index = todos.findIndex((v) => v.id == currentId)
    //todos[index].isDone = !todos[index].isDone
    //setTodos(todos.map((el) => el))
    dispatch(checkedActionCreater(currentId))
  }
  return (
    <li className={Styles.item} id={element.id}>
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
            ref={inputRef}
            //onBlur={blurFn}
            disabled={isDisablet}
            className={(Styles.todo, Styles.item__input)}
            value={value}
            onChange={(e) => {
              onChange(e)
            }}
            id={`inp${element.id}`}
            style={{ textDecoration: styleIsDone }}
          />
        </div>
      </div>
      <div className={Styles.item__btns}>
        {isDisablet ? (
          <button
            style={{ display: isDisplayEdit }}
            className={Styles.item__btn}
            onClick={(e) => editBtn(e)}
          >
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
