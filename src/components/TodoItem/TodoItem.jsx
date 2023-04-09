import React, { useEffect, useRef, useState } from 'react'
import Styles from './TodoItem.module.scss'

export default function TodoItem({ element, num, todos, setTodos }) {
  let dropIndex, dragIndex
  const inputRef = useRef()
  const focusInp = () => {
    inputRef.current.focus()
    //console.log(inputRef.current)
    inputRef.current.classList.add('active--inp')
  }
  const deleteFn = (e) => {
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    let item = e.target.closest(`.${Styles.item}`)
    //item.classList.remove('createEffect')
    //item.classList.add('deleteEffect')
    item.style.cssText = 'animation: deleteEffect 0.5s forwards;'
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
    inputRef.current.classList.remove('active--inp')
  }
  document.addEventListener('keydown', (e) => {
    //console.log(e.code)
    if (e.code == 'Escape') {
      setValue(element.value)
      setIsDisabled(true)
      inputRef.current.classList.remove('active--inp')
    }
    if (e.code == 'Enter') {
      setTodos((old) =>
        old.map((v) => (v.id === element.id ? { ...v, value } : v))
      )
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
  const blurFn = (e) => {
    //  setTimeout(() => {
    //    console.log('blur')
    //    setValue(element.value)
    //    setIsDisabled(true)
    //  }, 100)
  }
  const checkFn = (e) => {
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    const index = todos.findIndex((v) => v.id == currentId)
    todos[index].isDone = !todos[index].isDone
    setTodos(todos.map((el) => el))
  }
  const dragStart = (e) => {
    setTimeout(() => e.target.classList.add('dragging'), 0)
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    dragIndex = todos.findIndex((v) => v.id == currentId)
    //console.log('dragStart')
  }
  const drop = (e) => {
    e.preventDefault()
    const currentId = e.target.closest(`.${Styles.item}`)?.id
    dropIndex = todos.findIndex((v) => v.id == currentId)
    console.log('drop')
  }
  const dragEnd = (e) => {
    //console.log(dragIndex)
    console.log(dropIndex)
    //let a = todos.splice(dragIndex, 1)
    //todos.splice(dropIndex, 0, a[0])
    //e.preventDefault()
    //e.target.classList.remove('dragging')
    //console.log('end')
  }
  return (
    <li
      className={Styles.item}
      draggable="true"
      id={element.id}
      onDragStart={(e) => dragStart(e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => drop(e)}
      onDragEnd={(e) => dragEnd(e)}
    >
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
