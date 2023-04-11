import React, { useEffect, useState } from 'react'
import styles from "./swiper.module.scss"
import { Swiper } from 'antd-mobile'
import { restaurantdetailApi } from '../../request/api'

const Myswiper = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    restaurantdetailApi({ id: 1 }).
      then(res => {
        console.log(res.data.imgs);
        setData({ ...res.data })
      })
  }, [])

  return (
    <div className={styles.swiperbox}>
      <Swiper loop>
        {
          data.imgs?.map((img, index) => {
            return index === 0 ?
              <Swiper.Item key={index} >
                <div className={styles.content}>1</div>
                {/* <div datatype='video' dataUrl={img}>22</div> */}
              </Swiper.Item>
              : <Swiper.Item key={index}>
                <div className={styles.content}>
                  <img src={img} width="100%" alt="" />
                </div>
              </Swiper.Item>
          })
        }
      </Swiper>
    </div>
  )
}

export default Myswiper