import React from 'react'
import styles from "./Hotcard.module.scss"

const Hotcard = (props) => {
    const { num, text ,hot} = props
    return (
        <div className={styles.hotcardbox}>
            <div className={styles.tag} style={{backgroundColor:num>3?"#ffb617":"#dd2626"}}>TOP{num}</div>
            <div className={styles.text}>{text}</div>
            <div className={styles.score}>{hot}</div>
        </div>
    )
}

export default Hotcard