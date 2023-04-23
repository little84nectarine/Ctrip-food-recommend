import React, { useEffect, useState } from 'react'
import styles from './Restaurant.module.scss'
import Myswiper from '../../components/Swiper/Myswiper'
import Restinfo from '../../components/Restinfo/Restinfo'
import Usercomment from '../../components/Usercomment/Usercomment'
import Waterfall from '../../components/Waterfall/Waterfall'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router'
import useThrottle from '../../hooks/useThrottle'    //引入自定义节流hook
import { restaurantdetailApi } from '../../request/api'
import { Tabs } from 'antd-mobile'
import { changemodal } from '../../store/showModal.slice'
import { changefilterlist } from '../../store/currFilter.slice'
import { multifilterApi, restaruantApi } from '../../request/api'
import { changeList } from '../../store/currList.slice'
import { restart } from '../../store/currPagecount.slice'
import { changelistloading } from '../../store/listloading.slice'
import { changeEnd } from '../../store/islistEnd.slice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';

const tabHeight = 42

const Food = () => {
  const [headerv, setHeaderv] = useState("hidden")
  const navigate = useNavigate()
  const [data, setData] = useState({})
  const [activeKey, setActiveKey] = useState('1')   //tab栏
  const dispatch = useDispatch()
  const location = useLocation();
  const { id } = location.state;

  const tabItems = [
    { key: '1', title: '图片', elment: (<Myswiper data={data.imgs ? [data.video, ...data.imgs] : []} />) },
    { key: '2', title: '概览', elment: (<Restinfo data={data} />) },
    { key: '3', title: '客户评论', elment: (<Usercomment score={data.score} comments={data.comments} rvNum={data.reviews} />) },
    { key: '4', title: '更多', elment: (<Waterfall />) },
  ]

  const addTabs = useThrottle(() => {
    let currentKey = tabItems[0].key
    for (const item of tabItems) {
      const element = document.getElementById(`anchor-${item.key}`)
      if (!element) continue
      const rect = element.getBoundingClientRect()
      if (rect.top <= tabHeight) {
        currentKey = item.key
      } else {
        break
      }
    }
    setActiveKey(currentKey)
  }, 300)
  const tohome = () => {
    dispatch(changemodal(false))
    dispatch(changefilterlist(["不限", "不限", [[], []], "默认"]))
    multifilterApi({ arr: ["不限", "不限", [[], []], "默认"] }).then(e => {
      restaruantApi(0).then(res => {
        if (res.status === 201) {
          dispatch(changeEnd(false))
        } else {
          dispatch(changeEnd(true))
        }
        dispatch(changeList([...res.data]))
        dispatch(restart())
        dispatch(changelistloading(false))
      })
    })
    document.documentElement.scrollTop = 0
    navigate("/")
  }
  const addheader = useThrottle(() => {
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;
    //滚动超过70则显示header，小于70隐藏

    let el = document.getElementById("tabId")

    if (curTop > 70) {
      setHeaderv("visible")
      el.style.visibility = 'visible'
    } else if (curTop <= 70) {
      setHeaderv("hidden")
      el.style.visibility = 'hidden'
    }
  }, 100)

  //清除页面跳转后滚动条位置缓存
  useEffect(() => {
    restaurantdetailApi({ id: id }).
      then(res => {
        console.log(res.data);
        setData({ ...res.data })
      })

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    window.addEventListener("scroll", addheader)
    window.addEventListener('scroll', addTabs)

    return () => {
      window.removeEventListener('scroll', addheader);
      window.removeEventListener('scroll', addTabs)
    }
  }, [])



  return (
    <>
      {/* tab栏 */}
      <div className={styles.tabsContainer} style={{ visibility: "hidden" }} id='tabId'>
        <Tabs
          style={{ '--active-line-color': 'red', "--active-title-color": "red" }
          }
          activeKey={activeKey}
          onChange={key => {
            document.getElementById(`anchor-${key}`)?.scrollIntoView()
            window.scrollTo({
              top: window.scrollY - tabHeight,
            })
          }}
        >
          {/* 生成相应信息组件 */}
          {tabItems.map(item => (
            <Tabs.Tab title={item.title} key={item.key} />
          ))}
        </Tabs>
      </div>

      <div style={{ backgroundColor: 'rgb(240,243,246)' }}>
        {
          tabItems.map(item => (
            <div key={item.key} id={`anchor-${item.key}`}>
              {item.elment}
            </div>
          ))
        }
        <div style={{ position: "fixed", top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2.8rem', width: "100%", backgroundColor: '#fff', visibility: headerv, zIndex: '1' }}>
          <LeftOutline style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '16px', visibility: 'visible' }} onClick={tohome} />
          <span style={{ fontSize: '17px' }}>餐厅详情</span>
        </div>
      </div>
    </>
  )
}

export default Food