import React from 'react'
import styles from "./swiper.module.scss"
import { useNavigate } from 'react-router'

const Swiper = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.swiperbox}>
    </div>
  )
}

export default Swiper