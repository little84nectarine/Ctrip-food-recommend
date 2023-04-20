import React from 'react'
import styles from "./Searchcard.module.scss"
import { SmileFill } from 'antd-mobile-icons'

const Searchcard = (props) => {
    const { data } = props
    return (
        <>
            <div className={styles.searchcardbox}>
                <div className={styles.firstline}>
                    <SmileFill style={{ color: '#dd2626', fontSize: "1.1rem", marginRight: "0.4rem" }} />
                    <span>{data.name}</span>
                </div>
                <div className={styles.secondline}>
                    {data.reviews}条点评
                </div>
                <div className={styles.thirdline}>
                    {data.score}分 丨 {data.style} 丨 {data.generalPosition}
                </div>
            </div>
        </>
    )
}

export default Searchcard