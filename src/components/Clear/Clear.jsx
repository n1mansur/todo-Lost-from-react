import React from 'react'
import Styles from './Clear.module.scss'

export default function Clear({ f }) {
  return (
    <div>
      <button onClick={f} className={Styles.clear}>
        Clear all
      </button>
    </div>
  )
}
