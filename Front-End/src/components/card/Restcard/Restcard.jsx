import React from 'react'
import styles from "./Restcard.module.scss"
import { useNavigate } from 'react-router'
 
import { StarFill} from 'antd-mobile-icons'
import { useDispatch } from 'react-redux'
import { changeCurr } from '../../../store/currRest.slice'

const ranklist = [,,"黑钻","钻石","铂金","金牌","银牌"]

const Restcard = ({ data }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //跳转到对应商店详情页
  const toRestaurant = () => {
    navigate('/food', {
      replace: false,
      state: { id: data.id }
    })
    dispatch(changeCurr(data.id))
  }
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
        {data.rank?<div className={styles.tag}>
          <StarFill style={{marginRight:'0.1rem'}}/>
          {`美食林${ranklist[data.rank]}`}
        </div>:<></>}
        <div className={styles.lastRow}>
          <div style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace:'nowrap'}}>
            <span style={{ display: "inline-block", marginRight: "0.3rem" }}>{data.style}</span>
            <span>{data.generalPosition}</span>
          </div>
          <div style={{flexBasis:'5.2rem',flexShrink:'0'}}>距市中心{data.distance>=1000?(data.distance/1000).toFixed(1)+"k":data.distance}m</div>
        </div>
        {data.rank?<></>:<div style={{height:'0.8rem'}}></div>}
      </div>
    </div>
  )
}

export default Restcard