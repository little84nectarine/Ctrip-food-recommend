import React from 'react'
import styles from "./Searchcard.module.scss"
import { useNavigate } from 'react-router'
import { SmileFill } from 'antd-mobile-icons'
import { useDispatch } from 'react-redux'
import { changeCurr } from '../../../store/currRest.slice'
import { changemodal } from '../../../store/showModal.slice'
import { changefilterlist } from '../../../store/currFilter.slice'
import { multifilterApi,restaruantApi } from '../../../request/api'
import { changeList } from '../../../store/currList.slice'
import { restart } from '../../../store/currPagecount.slice'
import { changelistloading } from '../../../store/listloading.slice'

const Searchcard = (props) => {
    const { data ,searchkey} = props
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tofoodpage = ()=>{
        dispatch(changemodal(false))
        dispatch(changefilterlist(["不限", "不限", [[], []], "默认"]))
        multifilterApi({ arr:["不限", "不限", [[], []], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
                dispatch(changeList([...res.data]))
                dispatch(restart())
                dispatch(changelistloading(false))
            })
        })
        document.documentElement.scrollTop = 0
        navigate('/food')
        dispatch(changeCurr(data.id))
    }
    return (
        <>
            <div className={styles.searchcardbox} onClick={tofoodpage}>
                <div className={styles.firstline}>
                    <SmileFill style={{ color: '#dd2626', fontSize: "1.1rem", marginRight: "0.4rem" }} />
                    <span>{data.name.split(searchkey)[0]}</span>
                    <span style={{color: '#dd2626'}}>{searchkey}</span>
                    <span>{data.name.split(searchkey)[1]}</span>
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