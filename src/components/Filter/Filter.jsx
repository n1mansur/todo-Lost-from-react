import React from 'react'
import Styles from './Filter.module.scss'

export default function Filter({ setType }) {
  return (
    <div className={Styles.Filter}>
      <span className={Styles.span}>Filter by status:</span>
      <select onChange={(e) => setType(e.target.value)} name="status">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="proccess">Proccess</option>
      </select>
    </div>
  )
}
