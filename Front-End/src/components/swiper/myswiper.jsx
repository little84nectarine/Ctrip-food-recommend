import React, { useEffect, useState, useRef } from 'react'
import styles from "./swiper.module.scss"
import { Swiper, Popup } from 'antd-mobile'
import { DownFill, PlayOutline } from 'antd-mobile-icons'


const Myswiper = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  useEffect(() => {
  }, [])

  return (
    <div className={styles.swiperbox}>
      <Swiper loop>
        {
          data.map((img, index) => {
            return index === 0 ?
              <Swiper.Item key={index} >
                <div className={styles.content}>
                  <div className={styles.playBtn} onClick={() => {
                    setIsPlaying(true)
                    videoRef?.current?.play()
                  }} >
                    <PlayOutline />
                  </div>
                  <img style={{ zIndex: '1' }} src={data[1]} width="100%" alt="" />
                  <Popup
                    visible={isPlaying}
                    onMaskClick={() => {
                      setIsPlaying(false)
                      videoRef?.current.pause()
                    }}
                    bodyStyle={{ height: "90vh" }}
                  >
                    <div style={{height: '100%', overflow:'hidden'}}>
                      <video ref={videoRef} src={img} controls style={{
                        position:'absolute', width: '100%', height: "100%", objectFit: 'cover',bottom: '0'
                       }} />
                    </div>
                  </Popup>
                </div>
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
        <span>相册{data.length} </span><span className={styles.icon}> <DownFill /></span>
        <span style={{ paddingRight: '0.3rem', paddingLeft: '0.3rem', color: "rgb(162, 162, 162)" }}> | </span>
        <span>达人晒图 </span><span className={styles.icon}><DownFill /></span>
      </div>
    </div>
  )
}

export default Myswiper