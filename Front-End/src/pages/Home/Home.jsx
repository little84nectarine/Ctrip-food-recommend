import React from 'react'
import styles from "./Home.module.scss"
import Header from '../../components/header/header'
import Banner from '../../components/banner/banner'
import Filter from '../../components/filter/filter'
import Restcard from '../../components/restcard/restcard'

const Home = () => {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Banner />
        <Filter />
        <div style={{ backgroundColor: '#fff', height: '200rem', padding: '0 0.7rem' }}>
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
          <Restcard />
        </div>
      </div>
    </>
  )
}

export default Home