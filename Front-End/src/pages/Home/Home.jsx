import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss"
//引入组件
import Header from '../../components/header/header'
import HeaderFixed from '../../components/header_fixed/header_fixed'
import Banner from '../../components/banner/banner'
import Filter from '../../components/filter/filter'
import Restcard from "../../components/card/restcard/restcard"
import Filterdelecard from "../../components/card/filterdelecard/filterdelecard"
import Search from '../../components/Search/Search'
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
import { changecomparelist } from '../../store/comparelist.slice'
import { InfiniteScroll, List, DotLoading, SwipeAction, Image, Toast, Popup, Button } from 'antd-mobile'
import { UpOutline, CloseCircleFill } from 'antd-mobile-icons'
import { useNavigate } from 'react-router'
const Home = () => {
  const restlist = useSelector((state) => state.currList.restList)
  const hasMore = useSelector((state) => state.islistEnd.isend)
  const pagecount = useSelector(state => state.currPagecount.pagecount)
  const filterlist = useSelector(state => state.currFilter.filterlist)
  const isloading = useSelector(state => state.listLoading.isloading)
  const modalshow = useSelector(state => state.showModal.modalshow)
  const comparelist = useSelector(state => state.compareList.comparelist)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [headercolor, setHeadercolor] = useState("transparent")
  const [totop, setTotop] = useState(false)
  const [filterlength, setFilterlength] = useState(-1)
  const [visible2, setVisible2] = useState(false)
  const addheader = useThrottle((e) => {
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;
    //滚动超过70则显示header，小于70隐藏
    if (curTop > 10) {
      if (curTop > 1000) {
        setTotop(true)
      } else if (curTop <= 1000) (
        setTotop(false)
      )
      setHeadercolor("white")
    } else if (curTop <= 10) {
      setHeadercolor("transparent")
      setTotop(false)
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
  const rightActions = [
    {
      key: 'compare',
      text: '加入对比',
      color: 'primary',
    }
  ]
  const addcompare = (id, name, img) => {
    if (comparelist.length <= 1 && comparelist.length >= 0) {
      if (comparelist.length === 1 && id === comparelist[0].id) {
        Toast.show({
          icon: 'fail',
          content: '请勿重复添加',
        })
      } else {
        let temp = { id, name, img }
        dispatch(changecomparelist([...comparelist, temp]))
      }
    } else {
      Toast.show({
        icon: 'fail',
        content: '列表已满',
      })
    }
  }
  const closecomparelist = (index) => {
    if (index === 0) {
      dispatch(changecomparelist([...comparelist.slice(1, 2)]))
    } else {
      dispatch(changecomparelist([...comparelist.slice(0, 1)]))
    }
  }
  const tocompare = () => {
    if (comparelist.length !== 2) {
      Toast.show({
        icon: 'fail',
        content: '请添加餐厅',
      })
    } else {
      dispatch(changecomparelist([]));
      navigate('/compare', {
        replace: false,
        state: { id1: comparelist[0].id, id2: comparelist[1].id }
      })
    }
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
                {(filterlist[0] === "不限" && filterlist[1] === "不限" && filterlist[2][0].length === 0 && filterlist[2][1].length === 0) ? <></> : <Filterdelecard text={"全部清空"} setFilterlength={setFilterlength} />}
                {filterlist[0] === "不限" ? <></> : <Filterdelecard text={filterlist[0]} fclass={0} setFilterlength={setFilterlength} />}
                {filterlist[1] === "不限" ? <></> : <Filterdelecard text={filterlist[1]} fclass={1} setFilterlength={setFilterlength} />}
                {filterlist[2][0].map((item, index) => <Filterdelecard text={item} key={index} fclass={2} setFilterlength={setFilterlength} />)}
                {filterlist[2][1].map((item, index) => <Filterdelecard text={item} key={index} fclass={3} setFilterlength={setFilterlength} />)}
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
      {modalshow ? <Search /> : <></>}
      {totop ? <div className={styles.totop} onClick={() => {
        document.documentElement.scrollTop = 149;
      }}>
        <UpOutline style={{ fontSize: '1rem' }} />
        <div style={{ fontSize: '0.1rem', transform: ["scale(0.8)"], marginTop: '-0.2rem' }}>回顶部</div>
      </div> : <></>}
      {
        comparelist.length === 0 ? <></> :
          <div className={styles.compare} onClick={() => {
            setVisible2(true)
          }}>
            <div style={{ backgroundColor: "#e1e1e1", width: '100%', flexBasis: "45%" }}>
              {comparelist[0] ? <Image src={comparelist[0].img} width={32} height={32} fit='cover' style={{ borderRadius: 4 }} /> : <></>}
            </div>
            <div style={{ flex: '1' }}></div>
            <div style={{ backgroundColor: "#e1e1e1", width: '100%', flexBasis: "45%" }}>
              {comparelist[1] ? <Image src={comparelist[1].img} width={32} height={32} fit='cover' style={{ borderRadius: 4 }} /> : <></>}
            </div>
          </div>
      }
      <Header />
      <HeaderFixed color={headercolor} />
      <div className={styles.content}>
        <Banner />
        <Filter setHeadercolor={setHeadercolor} filterlength={filterlength} />
        <div style={{ backgroundColor: 'rgb(250, 250, 250)', padding: '0 0.7rem' }}>
          {isloading ?
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
              <DotLoading color='primary' />
            </div>
            : <List>
              {restlist.map((item, index) => (
                <SwipeAction
                  key={index}
                  rightActions={rightActions}
                  onAction={() => addcompare(item.id, item.name, item.imgs[0])}
                >
                  <Restcard data={item} key={item.id} />
                </SwipeAction>
              ))}
            </List>}
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            {isloading ? <></> : <InfiniteScrollContent hasMore={hasMore} />}
          </InfiniteScroll>
        </div>
        <Popup
          visible={visible2}
          onMaskClick={() => {
            setVisible2(false)
          }}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '40vh',
          }}
        >
          <div className={styles.popcontent}>
            <div className={styles.poptop}>
              <div className={styles.popleft}>
                <div>{comparelist[0]?.name}</div>
                <div style={{ position: "relative" }}>
                  <Image
                    src={comparelist[0]?.img} width={100} height={100} fit='cover' style={{ borderRadius: 4 }}
                  />
                  <div className={styles.close} style={{ backgroundColor: '#fff', width: '0.8rem', height: '0.8rem', borderRadius: '50%' }}></div>
                  <div className={styles.close}><CloseCircleFill style={{ color: "#dd2626", fontSize: "1rem" }} onClick={() => closecomparelist(0)} /></div>
                </div>
              </div>
              <div className={styles.popright}>
                <div>{comparelist[1]?.name}</div>
                <div style={{ position: "relative" }}>
                  <Image
                    src={comparelist[1]?.img} width={100} height={100} fit='cover' style={{ borderRadius: 4 }}
                  />
                  <div className={styles.close} style={{ backgroundColor: '#fff', width: '0.8rem', height: '0.8rem', borderRadius: '50%' }}></div>
                  <div className={styles.close}><CloseCircleFill style={{ color: "#dd2626", fontSize: "1rem" }} onClick={() => closecomparelist(1)} /></div>
                </div>
              </div>
            </div>
            <div style={{ flexBasis: '20%', padding: "0.6rem 2rem" }}>
              <Button block color='primary' size='large' onClick={tocompare}>
                确认
              </Button>
            </div>
          </div>
        </Popup>
      </div>
    </>
  )
}
export default Home