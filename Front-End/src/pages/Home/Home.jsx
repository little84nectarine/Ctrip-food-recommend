import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss"
//引入组件
import Header from '../../components/Header/Header'
import HeaderFixed from '../../components/Header_fixed/Header_fixed'
import Banner from '../../components/Banner/Banner'
import Filter from '../../components/Filter/Filter'
import Restcard from "../../components/card/Restcard/Restcard"
import Filterdelecard from "../../components/card/Filterdelecard/Filterdelecard"
//引入自定义节流hook
import useThrottle from '../../hooks/useThrottle'
//获取餐厅listapi
import { restaruantApi } from '../../request/api'
import { useDispatch, useSelector } from 'react-redux'
//redux action
import { changeList } from '../../store/currList.slice'
import { changeEnd } from '../../store/islistEnd.slice'
import { increasecount } from '../../store/currPagecount.slice'
import { changelistloading } from '../../store/listloading.slice'

import { InfiniteScroll, List, DotLoading } from 'antd-mobile'
const Home = () => {
  const restlist = useSelector((state) => state.currList.restList)
  const hasMore = useSelector((state) => state.islistEnd.isend)
  const pagecount = useSelector(state => state.currPagecount.pagecount)
  const filterlist = useSelector(state => state.currFilter.filterlist)
  const isloading = useSelector(state => state.listLoading.isloading)
  const dispatch = useDispatch()
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
    restaruantApi(0).then(res => {
      dispatch(changeList([...res.data]))
      dispatch(changelistloading(false))
    })

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.addEventListener("scroll", addheader)
    return () => {
      window.removeEventListener('scroll', addheader);
    }
    // eslint-disable-next-line
  }, [])
  async function loadMore() {
    const res = await restaruantApi(pagecount)
    if (res.status === 201) {
      dispatch(changeEnd(false))
    }
    const append = res.data
    dispatch(changeList([...restlist, ...append]))
    dispatch(changeEnd(append.length > 0))
    dispatch(increasecount())
  }
  const InfiniteScrollContent = ({ hasMore }) => {
    return (
      <>
        {hasMore ? (
          <>
            <span>加载中</span>
            <DotLoading />
          </>
        ) : (
          <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '1rem', color: '#333', marginBottom: '0.3rem' }}>没有更多符合条件的美食了</div>
            {(filterlist[0] === "不限" && filterlist[1] === "不限" && filterlist[2][0].length === 0 && filterlist[2][1].length === 0) ? <></> : <div>请修改条件重新查询</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "center", marginTop: '1rem' }}>
              {<>
                {(filterlist[0] === "不限" && filterlist[1] === "不限" && filterlist[2][0].length === 0 && filterlist[2][1].length === 0) ? <></> : <Filterdelecard text={"全部清空"} />}
                {filterlist[0] === "不限" ? <></> : <Filterdelecard text={filterlist[0]} fclass={0} />}
                {filterlist[1] === "不限" ? <></> : <Filterdelecard text={filterlist[1]} fclass={1} />}
                {filterlist[2][0].map((item, index) => <Filterdelecard text={item} key={index} fclass={2} />)}
                {filterlist[2][1].map((item, index) => <Filterdelecard text={item} key={index} fclass={3} />)}
              </>
              }
            </div>
          </div>
        )}
      </>
    )
  }
  return (
    <>
      <Header />
      <HeaderFixed color={headercolor} />
      <div className={styles.content}>
        <Banner />
        <Filter setHeadercolor={setHeadercolor} />
        <div style={{ backgroundColor: 'rgb(250, 250, 250)', padding: '0 0.7rem' }}>
          {isloading ?
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
              <DotLoading color='primary' />
            </div>
            : <List>
              {restlist.map((item, index) => (
                <Restcard data={item} key={item.id} />
              ))}
            </List>}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            {isloading ? <></> : <InfiniteScrollContent hasMore={hasMore} />}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}
export default Home