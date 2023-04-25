import React, { useEffect, useState } from 'react'
import styles from "./RecoDish.module.scss"
import Bannercard from '../card/Bannercard/Bannercard'
import { recoDishApi } from '../../request/api'
import { HeartFill } from 'antd-mobile-icons'
import { changecollectobj } from '../../store/collectlist.slice'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'antd-mobile'


const RecoDish = ({ restId, restname }) => {
  console.log(restId);
  const [bannerlist, setBannerlist] = useState([])
  const collectlist = useSelector((state)=>state.collectList.collectobj)
  const dispatch = useDispatch()

  useEffect(() => {
    recoDishApi({ id: restId }).then(res => {
      setBannerlist(res.data.dishes)
    })
    // eslint-disable-next-line
  }, [])
  return (
    <div className={styles.bannerbox}>
      <div style={{ fontSize: '1.3rem', fontWeight: '600' }}>推荐菜</div>
      <div className={styles.horizonbox}>
        {
          restId &&
          bannerlist.map((item) => {
            return <div  key={item.dishId} className={styles.dish}>
              <div className={styles.tag} onClick={
                ()=>{
                  Toast.show({
                    icon: 'success',
                    content: '收藏成功',
                  })
                  let temp=-1;
                  collectlist.forEach((e, index)=>{
                    if(e.restName === restname){
                      temp = index
                    }
                  })
                  if(temp===-1){
                    dispatch(changecollectobj(
                      [...collectlist,{
                        dishes:[item],
                        restName:restname
                      }]
                    ))
                  }else{
                    dispatch(changecollectobj(
                      [...collectlist.slice(0,temp),{
                        dishes:[...collectlist[temp].dishes,item],
                        restName:restname
                      },...collectlist.slice(temp+1)]
                    ))
                  }
                  
                }
              }>
                <HeartFill />
              </div>
              <Bannercard imgurl={item.dishImg} text={item.dishName}  />
            </div>
          })
        }
      </div>
    </div>
  )
}

export default RecoDish