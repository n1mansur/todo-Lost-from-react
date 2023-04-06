import React from 'react'
import Styles from './Title.module.scss'

export default function Title(props) {
  return <div className={Styles.title}>{props.text}</div>
}
