import React, { useEffect, useState, useRef } from 'react'
import styles from "./waterfall.module.scss"
import WaterfallCard from '../card/waterfallCard/waterfallCard'
import useThrottle from '../../hooks/useThrottle'
import { waterfallApi } from '../../request/api'



const preLoadHeight = 280   // 缓冲器提前量
// 视口高度
const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

//////////////////////////////////////////////////////////////////////////

const Waterfall = () => {
  const [dataList, setDataList] = useState([])  //瀑布流数据列表
  let [ifUpdate, setIfUpdate] = useState(0)     //下拉更新触发器
  const wfRef = useRef(null)

  // const [ifReach, setIfReach] = useState(false)
  let ifReach = false
  // let loading = false

  //滑到底触发更新列表
  useEffect(() => {
    console.log('====================================');
    console.log(111111111111111111111111111);
    console.log('====================================');
    waterfallApi({ curr: dataList.length, len: 10 }).then(res => {
      let state = res.data.state
      if (state !== 404) {
        let list = res.data.data
        let newlist = [...dataList, ...list]
        setDataList(newlist)
      } else {
        console.log('没有新的内容了');
      }
    })
  }, [ifUpdate])


  useEffect(() => {
    // 初次请求10条数据
    waterfallApi({ curr: 0, len: 20 }).then(res => {
      let list = res.data.data

      setDataList(list)
      window.addEventListener("scroll", lazyLoader)
    })

    return () => {
      window.removeEventListener('scroll', lazyLoader);
    }
  }, [])


  // 监听滚动时间
  const lazyLoader = useThrottle(() => {
    let elHeight = wfRef.current.offsetHeight
    let before = ifReach
    ifReach = (wfRef.current.offsetTop + elHeight - document.documentElement.scrollTop < preLoadHeight + viewPortHeight)

    console.log('====================================');
    console.log(ifReach);
    if (before !== ifReach && ifReach === true) {
      console.log('更新');
      setIfUpdate(ifUpdate++)
    }
    console.log('====================================');

  }, 100)

  return (
    <div className={styles.content} ref={wfRef} >
      <div style={{margin: '0.2rem', fontSize: '1.5rem', color: 'rgb(128, 128, 128)', fontWeight: '700'}}>
        更多推荐
      </div>
      <div className={styles.waterfallbox}  id='waterfall'>
        {
          dataList.map((item, idx) => {
            return (
              <WaterfallCard data={item} key={idx}></WaterfallCard>
            )
          })

        }
      </div>
    </div>
  )
}

export default Waterfall