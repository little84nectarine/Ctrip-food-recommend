import React from 'react'
import styles from "./filtercard.module.scss"

const Filtercard = (props) => {
  const {text} = props
  return (
    <div className={styles.filtercardbox}>
        {text}
    </div>
  )
}

export default Filtercard