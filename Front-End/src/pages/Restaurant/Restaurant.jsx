import React from 'react'
import Swiper from '../../components/swiper/swiper'
import Restinfo from "../../components/restinfo/restinfo"
import Usercomment from '../../components/usercomment/usercomment'
import styles from "./Restaurant.module.scss"

const Food = () => {
  return (
    <div style={{ backgroundColor: 'rgb(240,243,246)' }}>
      <Swiper />
      <Restinfo />
      <Usercomment />
    </div>
  )
}

export default Food