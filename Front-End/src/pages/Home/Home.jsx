import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss"
import Header from '../../components/header/header'
import HeaderFixed from '../../components/header_fixed/header_fixed'
import Banner from '../../components/banner/banner'
import Filter from '../../components/filter/filter'
import Restcard from "../../components/card/restcard/restcard"
import useThrottle from '../../hooks/useThrottle'    //引入自定义节流hook
import { restaruantApi } from '../../request/api'

<<<<<<< HEAD
import { PullToRefresh } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
// eslint-disable-next-line
import { PullStatus } from 'antd-mobile/es/components/pull-to-refresh'

function getNextData() {
  const ret = []
  return ret
}
const statusRecord = {
  canRelease: '下拉刷新',
  refreshing: '玩命加载中...',
  complete: '加载完毕',
}
=======
>>>>>>> fd4636db381295a275dd26b10d4e567a22faf03d

const Home = () => {
  let [restData, setRestData] = useState([])
  const [headercolor, setHeadercolor] = useState("transparent")

  const addheader = useThrottle(() => {
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;
    //滚动超过70则显示header，小于70隐藏
    if (curTop > 10) {
      setHeadercolor("white")
    } else if (curTop <= 10) {
      setHeadercolor("transparent")
    }
  }, 100)

  useEffect(() => {
    restaruantApi().then(res => {
      setRestData(res.data.data)
    })
    
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.addEventListener("scroll", addheader)
    return () => {
      window.removeEventListener('scroll', addheader);
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Header />
      <HeaderFixed color={headercolor} />
      <div className={styles.content}>
        <Banner />
        <Filter />
        <div style={{ backgroundColor: 'rgb(250, 250, 250)', padding: '0 0.7rem' }}>
<<<<<<< HEAD
=======
          {
            restData.map((i) => {
              return <Restcard data={i} key={i.id} />
            })
          }
>>>>>>> fd4636db381295a275dd26b10d4e567a22faf03d
          {
            restData.map((i) => {
              return <Restcard data={i} key={i.id} />
            })
          }
        </div>
      </div>

    </>
  )
}

export default Home