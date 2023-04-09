import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss"
import Header from '../../components/header/header'
import Banner from '../../components/banner/banner'
import Filter from '../../components/filter/filter'
import Restcard from '../../components/restcard/restcard'
import { restaruantApi } from '../../request/api'


const Home = () => {
  let [restData, setRestData] = useState([])
  
  useEffect(() => {
    restaruantApi().then(res => {
      setRestData(res.data.data)
    })

  }, [])

  return (
    <>
      <Header />
      <div className={styles.content}>
        <Banner />
        <Filter />
        <div style={{ backgroundColor: 'rgb(244, 244, 244)', height: '200rem', padding: '0 0.7rem' }}>
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