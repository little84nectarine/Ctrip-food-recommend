import React, { useState } from 'react'
import styles from "./Restinfo.module.scss"
import { DownFill, DownOutline, PhoneFill, FireFill } from 'antd-mobile-icons'
import { Popup, Button,Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { changecomparelist } from '../../store/comparelist.slice'


const Restinfo = ({ data }) => {
  const [telVisible, setTelVisible] = useState(false)
  const comparelist = useSelector(state => state.compareList.comparelist)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
        Toast.show({
          icon: 'success',
          content: '添加成功',
        })
      }
    } else {
      Toast.show({
        icon: 'fail',
        content: '列表已满',
      })
    }
  }

  return (
    <div className={styles.infobox}>
      {/* 标题 */}
      <div className={styles.title}>{data.name}</div>
      <div style={{ position: 'absolute', right: '1.2rem', top: '1.5rem', color: '#dd2626', fontSize: '1.2rem' }} onClick={()=>addcompare(data.id, data.name, data.imgs[0])}><FireFill /></div>
      {/* 第一行：评分、评论人数、人均消费、菜系 */}
      <div className={styles.firstRow}>
        <div className={styles.tag1}>
          <span className={styles.score}>{data.score}</span> <span style={{ color: '#c82c2c', paddingRight: '0.2rem' }}>分 | </span>
          <span className={styles.reviews}> {data.reviews}条点评</span>
          <DownFill style={{ transform: "rotateZ(-90deg)" }} />
        </div>
        <span style={{ margin: "0 0.4rem" }}>人均￥{data.avgPrice}</span>
        <span style={{ margin: "0 0.2rem" }}>|</span>
        <span>{data.style}</span>
      </div>

      {/* 第二行：营业时间 、电话*/}
      <div className={styles.secondRow}>
        <div>
          <span>营业中</span>
          <span>11:00-13:30</span>
          <span>17:00-21:00</span>
        </div>
        <div className={styles.tail}>
          <DownOutline style={{ transform: "rotateZ(-90deg)" }} />
          <span >|</span>
          <div onClick={() => {
            setTelVisible(true)
          }}>
            <PhoneFill className={styles.icon} />
            <div>电话</div>
            {/* 电话弹出层 */}
            <Popup
              visible={telVisible}
              onMaskClick={() => setTelVisible(false)}
              bodyStyle={{ height: "18vh" }}
            >
              <div style={{ padding: '1rem' }}>
                <Button style={{ marginBottom: "0.5rem" }} block color='primary' size='large'
                  onClick={
                    () => window.location.href = `tel:${data.tel}`
                  }
                >
                  {data.tel}
                </Button>
                <Button style={{ margin: '1rem 0' }} block color='primary' size='large'
                  onClick={() => setTelVisible(false)}
                >
                  取消
                </Button>
              </div>
            </Popup>
          </div>
        </div>
      </div>

      {/* 第三行：具体位置 */}
      <div className={styles.thirdRow}>
        <span>{data.exactPosition}</span>
        <DownOutline onClick={() => navigate('/map')} style={{ transform: "rotateZ(-90deg)" }} />
      </div>
    </div>
  )
}

export default Restinfo