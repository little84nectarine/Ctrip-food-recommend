import React, { useEffect, useState } from 'react'
import Myswiper from '../../components/swiper/myswiper'
import Restinfo from "../../components/restinfo/restinfo"
import Usercomment from '../../components/usercomment/usercomment'
import Waterfall from '../../components/waterfall/waterfall'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router'
import useThrottle from '../../hooks/useThrottle'    //引入自定义节流hook
import { restaurantdetailApi } from '../../request/api'

import { useSelector } from 'react-redux'

const Food = () => {
  const [headerv, setHeaderv] = useState("hidden")
  const navigate = useNavigate()
  const [data, setData] = useState({})

  // const param = useLocation()


  const addheader = useThrottle(() => {
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;
    //滚动超过70则显示header，小于70隐藏
    if (curTop > 70) {
      setHeaderv("visible")
    } else if (curTop <= 70) {
      setHeaderv("hidden")
    }
  }, 100)

  const id = (useSelector(store => store.currRest)).id
  console.log('====================================');
  console.log(id);
  console.log('====================================');

  //清除页面跳转后滚动条位置缓存
  useEffect(() => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.addEventListener("scroll", addheader)

    restaurantdetailApi({ id: id }).
      then(res => {
        setData({ ...res.data })
      })

    return () => {
      window.removeEventListener('scroll', addheader);
    }
  }, [])

  return (
    <>
    {id===0?404:<div style={{ backgroundColor: 'rgb(240,243,246)' }}>
      <div style={{ zIndex: '-10' }}>
        <Myswiper data={data.imgs? [data.video, ...data.imgs] : []} />

      </div>
      <Restinfo data={data} />
      <Usercomment />
      <Waterfall />
      <div style={{ position: "fixed", top: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2.8rem', width: "100%", backgroundColor: '#fff', visibility: headerv }}>
        <LeftOutline style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '16px', visibility: 'visible' }} onClick={() => navigate('/')} />
        <span style={{ fontSize: '17px' }}>餐厅详情</span>
      </div>
    </div>}
    </>
  )
}

export default Food