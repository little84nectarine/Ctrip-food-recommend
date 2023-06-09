import React, { useState } from 'react'
import styles from "./Header_fixed.module.scss"
import { LeftOutline, HeartOutline, DownFill, SearchOutline, HeartFill } from 'antd-mobile-icons'
import { cityoptions } from "./cityoptions"
import { Swiper, Picker } from 'antd-mobile'

import { changemodal } from '../../store/showModal.slice'
import { changestext } from '../../store/currswipertext.slice'
import { useDispatch, useSelector } from 'react-redux'

const textlist = ["和平饭店", "上海老饭店", "大董", "炳胜公馆"]

const verticalItems = textlist.map((text, index) => (
    <Swiper.Item key={index}>
        <div style={{ lineHeight: '2rem', color: '#aaa' }}>
            {text}
        </div>
    </Swiper.Item>
))

const Header_fixed = (props) => {
    const { color } = props
    const dispatch = useDispatch()
    const [heart, setHeart] = useState(false)
    const [pickervisible, setPickervisible] = useState(false)
    const [pickervalue, setPickervalue] = useState(["上海"])

    const changecity = () => {
        setPickervisible(true)
    }

    const toSearchpage = () => {
        dispatch(changemodal(true))
    }

    const getswipertext = (e) => {
        dispatch(changestext(textlist[e]))
    }

    return (
        <div className={styles.fixedheader} style={{ backgroundColor: color === "white" ? "rgb(250,250,250)" : color, color: color === "white" ? "#444" : 'white' }}>
            <div className={styles.fixedheaderleft}>
                <LeftOutline style={{ marginTop: '0.02rem', marginLeft: '0.7rem', fontSize: '10px', transform: ["scale(2.2)"] }} />
                <span style={{ fontSize: '20px', fontWeight: 'bold', marginLeft: '0.6rem' }}>美食</span>
            </div>
            {/* 搜索框 */}
            <div className={styles.searchbox}>
                <div className={styles.search} style={{ background: color === "white" ? 'white' : 'linear-gradient(-20deg, rgba(43,93,118,0.5) 0%, rgba(78,67,118,0.5) 100%)', border: color === "white" ? '1px solid rgb(200,44,44)' : 'none' }}>

                </div>
                <div style={{position:"absolute",left:'1rem'}}>
                    <span style={{ fontSize: '0.9rem', marginRight: '0.3rem' }} onClick={changecity}>{pickervalue}</span>
                    <DownFill style={{ fontSize: '10px', marginBottom: '0.12rem' }} onClick={changecity} />
                    <span style={{ display: 'inline-block', transform: ["scale(0.5,1.8)"], margin: '0 0.1rem 0.2rem 0.3rem' }}>丨</span>
                    <div style={{ display: 'inline-block' }}><SearchOutline style={{ fontSize: '1rem', marginBottom: '-0.1rem', marginRight: '0.2rem' }} /></div>
                </div>
                {/* 轮播 */}
                <div className={styles.searchboxright} onClick={toSearchpage} style={{position:"absolute"}}>
                    <Swiper direction='vertical' style={{ '--height': '2rem' }} autoplay allowTouchMove={false} loop={true} indicator={() => null} onIndexChange={getswipertext}>
                        {verticalItems}
                    </Swiper>
                </div>
            </div>
            {/* 爱心，点击后改实心爱心的样式 */}
            <div className={styles.fixedheaderright}>
                <HeartOutline style={{ marginTop: '-0.2rem', fontSize: '28px', marginLeft: '-0.1rem' }} onClick={() => setHeart(!heart)} />
                <HeartFill className={heart ? styles.heartfill : styles.heartnotfill} onClick={() => setHeart(!heart)} />
            </div>
            <Picker
                columns={cityoptions}
                visible={pickervisible}
                onClose={() => {
                    setPickervisible(false)
                }}
                value={pickervalue}
                onConfirm={v => {
                    setPickervalue(v)
                }}
            />
        </div>
    )
}

export default Header_fixed