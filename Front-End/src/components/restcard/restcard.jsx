import React from 'react'
import styles from "./restcard.module.scss"
import { useNavigate } from 'react-router'

const Restcard = () => {
  const navigate = useNavigate()
  //跳转到对应商店详情页
  const toRestaurant = () => navigate('/food',{ state:'aaaa' })
  return (
    <div className={styles.restcardbox} onClick={toRestaurant}>
      餐厅信息
    </div>
  )
}

export default Restcard