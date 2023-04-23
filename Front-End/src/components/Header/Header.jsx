import React from 'react'
import styles from "./Header.module.scss"

const Header = () => {
  return (
    <div className={styles.headerbox}>
      <div className={styles.fixedheader}></div>
      <div className={styles.headerbottom}>
        <span>热搜：寻味会</span>
        <span>伯爵</span>
        <span>尚嘉</span>
        <span>mikihouse</span>
        <span>佛罗伦萨小镇</span>
      </div>
    </div>
  )
}

export default Header