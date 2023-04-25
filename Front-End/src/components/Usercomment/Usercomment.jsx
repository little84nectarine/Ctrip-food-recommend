import React from 'react'
import styles from "./Usercomment.module.scss"
import { DownOutline } from 'antd-mobile-icons'
import CommentCard from '../CommentCard/CommentCard'

const Usercomment = ({ comments, rvNum, score }) => {

  return (
    <div className={styles.usercommentbox}>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.title}>
          <div>
            <span style={{ fontSize: '1.3rem', fontWeight: '600' }}>用户点评</span>
            <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>({rvNum})</span>
          </div>
          <div>
            查看全部<DownOutline style={{ transform: 'rotateZ(-90deg)' }} />
          </div>
        </div>

        {/* 打分 */}
        <div className={styles.score}>
          <span className={styles.emoTag} style={{ backgroundPositionX: `-${22 * Math.floor(score)}px` }}></span>
          <span style={{ fontSize: '1.5rem', color: 'rgb(209, 0, 0)', fontWeight: '600'}}>{score}</span>
          <span style={{ fontSize: '1rem', color: 'rgb(128, 128, 128)' }}>/5分</span>
        </div>
      </div>

    {/* 遍历渲染评论卡片 */}
    {
      comments && comments.length > 0 ?
      comments.map((comment, index)=>{
        return <CommentCard data={comment} key={index} />
      }):
      null
    }
    </div>
  )
}

export default Usercomment