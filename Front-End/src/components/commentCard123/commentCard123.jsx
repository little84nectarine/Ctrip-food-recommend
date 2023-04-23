import React from 'react'
import styles from './commentCard.module.scss'

export default function CommentCard({ data }) {

    return (
        <div className={styles.content}>
            {/* 基本信息 */}
            <div className={styles.header}>
                {/* 头像 */}
                <div className={styles.photo}>
                    <img height={'100%'} src={data.userPhoto} alt="" />
                </div>
                {/* 个人评分+昵称 */}
                <div className={styles.info}>
                    <div style={{ fontWeight: '600', color: 'rgb(92, 92, 92)' }}>{data.userName}</div>
                    <div className={styles.score}>
                        <span className={styles.emoTag} style={{ backgroundPositionX: `-${22 * Math.floor(data.userScore)}px` }}></span>
                        <span>{data.userScore}分</span>
                    </div>
                </div>
            </div>

            {/* 文字 */}
            <div className={styles.text}>
                <p>{data.comment}</p>
            </div>
            {/* 晒图 */}
            {
                data.userImgs.length > 0 ?
                    <div className={styles.imgsContainer}>
                        {
                            data.userImgs.length >= 3 ?
                                <div className={styles.case1}>
                                    {
                                        data.userImgs.slice(0, 3).map((imgUrl, index) => {
                                            return <div key={index} className={styles.imgBox}>
                                                <img src={imgUrl} height='auto' width='100%' alt="" />
                                            </div>
                                        })
                                    }
                                    <div className={styles.imgCount}>{data.userImgs.length}图</div>
                                </div>
                                :
                                <div className={styles.case2}>
                                    {
                                        data.userImgs.map((imgUrl, index) => {
                                            return <div key={index} className={styles.imgBox}>
                                                <img src={imgUrl} height='auto' width='100%' alt="" />
                                            </div>
                                        })
                                    }
                                </div>
                        }
                    </div>
                    :
                    null
            }


        </div>
    )
}
