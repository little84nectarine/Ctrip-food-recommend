import React, { useEffect, useState } from 'react'
import styles from "./RecoDish.module.scss"
import Bannercard from '../card/Bannercard/Bannercard'
import { recoDishApi } from '../../request/api'

const RecoDish = ({restId}) => {
  const [bannerlist,setBannerlist] = useState([])
  useEffect(() => {
    recoDishApi({id: restId}).then(res => {
      setBannerlist(res.data.dishes)
    })
    // eslint-disable-next-line
  }, [])
  return (
    <div className={styles.bannerbox}>
        <div style={{ fontSize: '1.3rem', fontWeight: '600' }}>推荐菜</div>
        <div className={styles.horizonbox}>
          {
            bannerlist.map((item)=>{
              return <Bannercard imgurl={item.dishImg} text={item.dishName} key={item.dishId}/>
            })
          }
        </div>
    </div>
  )
}

export default RecoDish