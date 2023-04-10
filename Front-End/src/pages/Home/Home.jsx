import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss"
import Header from '../../components/header/header'
import HeaderFixed from '../../components/header_fixed/header_fixed'
import Banner from '../../components/banner/banner'
import Filter from '../../components/filter/filter'
import Restcard from "../../components/card/restcard/restcard"
import useThrottle from '../../hooks/useThrottle'    //引入自定义节流hook
import { restaruantApi } from '../../request/api'

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
      setRestData(res.data)
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
        <Filter setHeadercolor={setHeadercolor}/>
        <div style={{ backgroundColor: 'rgb(250, 250, 250)', padding: '0 0.7rem' }}>
          {
            restData.map((i) => {
              return <Restcard data={i} key={i.id} />
            })
          }
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