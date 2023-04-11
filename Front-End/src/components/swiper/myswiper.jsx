import React, { useEffect, useState } from 'react'
import styles from "./swiper.module.scss"
import { Swiper } from 'antd-mobile'
import { DownFill } from 'antd-mobile-icons'


const Myswiper = ({data}) => {

  useEffect(() => {
  }, [])

  return (
    <div className={styles.swiperbox}>
      <Swiper loop>
        {
          data.map((img, index) => {
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

      <div className={styles.tag}>
        <span>相册{data.length} </span><span className={styles.icon}> <DownFill/></span>
        <span style={{paddingRight: '0.3rem', paddingLeft: '0.3rem', color: "rgb(162, 162, 162)"}}> | </span>
        <span>达人晒图 </span><span className={styles.icon}><DownFill/></span>
      </div>
    </div>
  )
}

export default Myswiper