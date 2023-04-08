import React from 'react'
import styles from "./swiper.module.scss"
import {
  LeftOutlined
} from "@ant-design/icons"
import { useNavigate } from 'react-router'

const Swiper = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.swiperbox}>
      <LeftOutlined style={{position:'absolute',left:'0.7rem',top:'0.8rem',fontSize:'18px'}} onClick={() => navigate('/')}/>
    </div>
  )
}

export default Swiper