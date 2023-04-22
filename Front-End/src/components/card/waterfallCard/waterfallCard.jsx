import React from 'react'
import styles from './waterfallCard.module.scss'


export default function WaterfallCard({ data }) {
    const { img, title } = data

    return (
        <div className={styles.content}>
            <div className={styles.box}>
                <div className={styles.wrapper}>
                    <img src={img} width='100%' alt="" />

                </div>
                <div className={styles.title}>
                    <div>{title}</div>
                    <p><span style={{ fontSize: '0.9rem' }}>￥</span>{(Math.random() * 300).toFixed(0)}</p>
                </div>
            </div>
        </div>

    )
}
