import React, { useState } from 'react'
import Styles from './Filter.module.scss'

export default function Filter({ getFilterValue }) {
  return (
    <div className={Styles.Filter}>
      <span className={Styles.span}>Filter by status:</span>
      <select onChange={getFilterValue} name="status">
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="proccess">Proccess</option>
      </select>
    </div>
  )
}
