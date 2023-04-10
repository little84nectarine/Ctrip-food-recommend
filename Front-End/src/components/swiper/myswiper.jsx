import React, { useEffect, useState } from 'react'
import styles from "./swiper.module.scss"
import { Swiper } from 'antd-mobile'
import { restaurantdetailApi } from '../../request/api'


const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']


const Myswiper = () => {
  const [data, setData] = useState({})

  useEffect(()=>{
    restaurantdetailApi({id:1}).then(res=>{
      console.log(res);
    })
  })

  return (
    <div className={styles.swiperbox}>
      <Swiper loop>{
        colors.map((color, index) => (
          <Swiper.Item key={index}>
            <div
              className={styles.content}
              style={{ background: color }}
            >
              {index + 1}
            </div>
          </Swiper.Item>
        ))
      }</Swiper>
    </div>
  )
}

export default Myswiper