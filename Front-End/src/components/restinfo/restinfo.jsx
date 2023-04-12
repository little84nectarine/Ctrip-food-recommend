import React from 'react'
import styles from "./restinfo.module.scss"
import { DownFill, DownOutline, PhoneFill } from 'antd-mobile-icons'

const timeMapper = function(arr){
  
}

const Restinfo = ({ data }) => {
  // console.log(data.duration);

  return (
    <div className={styles.infobox}>
      {/* 标题 */}
      <div className={styles.title}>{data.name}</div>

      {/* 第一行：评分、评论人数、人均消费、菜系 */}
      <div className={styles.firstRow}>
        <div className={styles.tag1}>
          <span className={styles.score}>{data.score}</span> <span style={{ color: '#c82c2c', paddingRight: '0.2rem' }}>分 | </span>
          <span className={styles.reviews}> {data.reviews}条点评</span>
          <DownFill style={{ transform: "rotateZ(-90deg)" }} />
        </div>
        <span style={{ margin: "0 0.4rem" }}>人均￥{data.avgPrice}</span>
        <span style={{ margin: "0 0.2rem" }}>|</span>
        <span>{data.style}</span>
      </div>

      {/* 第二行：营业时间 、电话*/}
      <div className={styles.secondRow}>
        <div>
          <span>营业中</span>
          <span>11:00-13:30</span>
          <span>17:00-21:00</span>
        </div>
        <div className={styles.tail}>
          <DownOutline style={{ transform: "rotateZ(-90deg)" }} />
          <span >|</span>
          <div>
            <PhoneFill className={styles.icon} />
            <div>电话</div>
          </div>
        </div>
      </div>

      {/* 第三行：具体位置 */}
      <div className={styles.thirdRow}>
        <span>{data.exactPosition}</span>
        <DownOutline style={{ transform: "rotateZ(-90deg)" }} />
      </div>
    </div>
  )
}

export default Restinfo