import React, { useEffect } from 'react'
import styles from "./restcard.module.scss"
import { useNavigate } from 'react-router'

const Restcard = ({ data }) => {
  const navigate = useNavigate()
  useEffect(() => {
  })

  //跳转到对应商店详情页
  const toRestaurant = () => navigate('/food', { state: 'aaaa' })
  return (
    <div className={styles.restcardbox} onClick={toRestaurant}>
      <div className={styles.imgBox}>
        <img height={"100%"} src={data.imgs[0]} alt="" />
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{data.name}</div>
        <div>
          <span className={styles.score}>{data.score}分</span>
          <span className={styles.split}> | </span>
          <span className={styles.secondRow}>{data.reviews}条点评</span>
          <span className={styles.split}> | </span>
          <span className={styles.secondRow}>￥{data.avgPrice}/人</span>
        </div>
        <div className={styles.tag}>美食林黑钻</div>
        <div className={styles.lastRow}>
          <div >
            <span style={{display: "inline-block" , marginRight: "0.3rem"}}>{data.style}</span>
            <span className={styles}>{data.generalPosition}</span>
          </div>
          <div className={styles}>距市中心{1.5}km</div>
        </div>
      </div>
    </div>
  )
}

export default Restcard