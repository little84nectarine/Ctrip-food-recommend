import React from 'react'
import styles from './waterfallCard.module.scss'
import { Image } from 'antd-mobile'


export default function WaterfallCard({ data }) {
    const { img, title ,score, avgPrice} = data

    return (
        <div className={styles.content}>
            <div className={styles.box}>
                <div className={styles.wrapper}>
                    <Image src={img} fit='cover' />
                </div>
                <div className={styles.title}>
                    <div>{title}</div>
                    <div style={{boxSizing:'border-box',padding:'0.1rem 0.2rem'}}>
                        <span style={{fontSize:"1.2rem",color:'#dd2626'}}>{score}</span>
                        <span style={{fontSize:"0.7rem",color:'#dd2626'}}>分</span>
                        <span style={{fontSize:"0.7rem",color:'#aaa',marginLeft:'0.5rem'}}>￥{avgPrice}/人</span>
                    </div>
                </div>
            </div>
        </div>

    )
}
