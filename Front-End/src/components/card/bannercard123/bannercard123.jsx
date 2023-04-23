import React from 'react'
import styles from "./bannercard.module.scss"

const Bannercard = (props) => {
    const { imgurl, text } = props
    return (
        <div className={styles.bannercardbox}>
            <div className={styles.imgbox}>
                <img src={imgurl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className={styles.bannertextbox}>
                    {text}
                </div>
            </div>
        </div>
    )
}

export default Bannercard