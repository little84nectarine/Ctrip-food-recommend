import React, { useEffect, useRef, useState } from 'react';
import styles from './waterfall.module.scss';
import WaterfallCard from '../card/waterfallCard/waterfallCard';
import { waterfallApi } from '../../request/api'
import useThrottle from '../../hooks/useThrottle';
import { SpinLoading } from 'antd-mobile'

const Waterfall = () => {
  const [leftdata, setLeftdata] = useState([])
  const [rightdata, setRightdata] = useState([])
  const [heightDate2, setHeightDate2] = useState([0, 0])
  const [ifUpdate, setIfUpdate] = useState(0)     //下拉更新触发器
  const [isloading, setIsloading] = useState(false)
  const [isdown, setIsdown] = useState(false)
  const wfRef = useRef(null)

  const lazyLoader = useThrottle(() => {
    if (!isdown) {
      let elHeight = wfRef.current.offsetHeight
      const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      let before = wfRef.current.offsetTop + elHeight - document.documentElement.scrollTop < viewPortHeight + 2

      if (before === true) {
        setIsloading(true)
        waterfallApi({ curr: ifUpdate + 20, len: 20 }).then(res => {
          if (res.data.state === 404) {
            setIsdown(true)
            setIsloading(false)
            return
          }
          let list = res.data.data
          let heightDate = heightDate2
          let rightData = []//渲染右侧盒子的数组
          let leftData = []//渲染左侧盒子的数组
          list.forEach(item => {
            let height = 170 / item.ratio;//对url地址进行一个截取，拿到高度
            let minNum = Math.min.apply(null, heightDate)// 从heighetData筛选最小项
            let minIndex = heightDate.indexOf(minNum);// 获取 最小项的小标 准备开始进行累加
            heightDate[minIndex] = heightDate[minIndex] + height;//从 heightData 中找到最小的项后进行累加， 
            if (minIndex === 0) {//[0]加到left [1]加到 right
              leftData.push(item)
            } else {
              rightData.push(item)
            }
          })
          setHeightDate2([...heightDate])
          setIsloading(false)
          setLeftdata([...leftdata, ...leftData])
          setRightdata([...rightdata, ...rightData])
          setIfUpdate(ifUpdate + 20)
        })
      }
    }
  }, 500)

  useEffect(() => {
    waterfallApi({ curr: 0, len: 20 }).then(res => {
      let list = res.data.data
      let heightDate = heightDate2;
      let rightData = []//渲染右侧盒子的数组
      let leftData = []//渲染左侧盒子的数组
      list.forEach(item => {
        let height = 170 / item.ratio;//对url地址进行一个截取，拿到高度
        let minNum = Math.min.apply(null, heightDate)// 从heighetData筛选最小项
        let minIndex = heightDate.indexOf(minNum);// 获取 最小项的小标 准备开始进行累加
        heightDate[minIndex] = heightDate[minIndex] + height;//从 heightData 中找到最小的项后进行累加， 
        if (minIndex === 0) {//[0]加到left [1]加到 right
          leftData.push(item)
        } else {
          rightData.push(item)
        }
      })
      setHeightDate2([...heightDate])
      setLeftdata([...leftdata, ...leftData])
      setRightdata([...rightdata, ...rightData])
    })
  }, [])
  useEffect(() => {
    window.addEventListener("scroll", lazyLoader)
    return () => {
      window.removeEventListener('scroll', lazyLoader);
    }
  }, [heightDate2])
  return (
    <div className={styles.waterfalllayout} ref={wfRef}>
      <div className={styles.title}>更多推荐</div>
      <div className={styles.cardbox}>
        {/* 左列 */}
        <div className={styles.waterline}>
          {
            leftdata?.map((item, index) => {
              return <WaterfallCard data={item} key={index}></WaterfallCard>
            })
          }
        </div>
        {/* 右列 */}
        <div className={styles.waterline}>
          {
            rightdata?.map((item, index) => {
              return <WaterfallCard data={item} key={index}></WaterfallCard>
            })
          }
        </div>
      </div>
      {isloading ?
        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', height: '3rem', backgroundColor: 'white' }}>
          <SpinLoading color='primary' />
        </div>
        : <></>}
    </div>
  );
};

export default Waterfall;