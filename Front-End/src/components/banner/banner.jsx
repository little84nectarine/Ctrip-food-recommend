import React, { useEffect, useState } from 'react'
import styles from "./banner.module.scss"
import Bannercard from '../card/bannercard/bannercard'
import { bannerApi } from '../../request/api'

const Banner = () => {
  const [bannerlist,setBannerlist] = useState([])
  useEffect(() => {
    bannerApi().then(res => {
      setBannerlist(res.data)
    })
    // eslint-disable-next-line
  }, [])
  return (
    <div className={styles.bannerbox}>
        <div style={{fontSize:'1.3rem',fontFamily:'Mingchao',fontWeight:'300'}}>当地推荐</div>
        <div className={styles.horizonbox}>
          {
            bannerlist.map((item)=>{
              return <Bannercard imgurl={item.url} text={item.text} key={item.id}/>
            })
          }
        </div>
    </div>
  )
}

export default Banner