import React from 'react'
import styles from "./restcard.module.scss"
import { useNavigate } from 'react-router'

const Restcard = () => {
  const navigate = useNavigate()
  //跳转到对应商店详情页
  const toRestaurant = () => navigate('/food',{replace:true})
  return (
    <div className={styles.restcardbox} onClick={toRestaurant}>
      
    </div>
  )
}

export default Restcard