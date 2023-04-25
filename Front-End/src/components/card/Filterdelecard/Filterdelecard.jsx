import React from 'react'
import styles from "./Filterdelecard.module.scss"
import { DeleteOutline, CloseOutline } from 'antd-mobile-icons'
import { useDispatch, useSelector } from 'react-redux'
import { changefilterlist } from '../../../store/currFilter.slice'
import { changeList } from '../../../store/currList.slice'
import { restaruantApi } from '../../../request/api'
import { changeEnd } from '../../../store/islistEnd.slice'
import { restart } from '../../../store/currPagecount.slice'
import { multifilterApi } from '../../../request/api'
import { changelistloading } from '../../../store/listloading.slice'

const optionobj = {
    "rank1": '全部美食林',
    "rank2": '美食林黑钻',
    "rank3": '美食林钻石',
    "rank4": '美食林铂金',
    "rank5": '美食林金牌',
    "rank6": '美食林银牌',
    "500-10000": '500以上',
    "0-100": '100以内'
}

const Filterdelecard = (props) => {
    const { text, fclass, setFilterlength } = props
    const filterlist = useSelector(state => state.currFilter.filterlist)
    const dispatch = useDispatch()

    const sendreload = (arr) => {
        multifilterApi({ arr }).then(e => {
            restaruantApi(0).then(res => {
                if (res.status === 201) {
                    dispatch(changeEnd(false))
                } else {
                    dispatch(changeEnd(true))
                }
                dispatch(changeList([...res.data]))
                dispatch(restart())
                dispatch(changelistloading(false))
                if (filterlist[2][0].length !== 0 || filterlist[2][1].length !== 0) {
                    setFilterlength(res.data.length)
                } else {
                    setFilterlength(-1)
                }
            })
        })
        document.documentElement.scrollTop = 149
    }
    const clearfilter = () => {
        dispatch(changelistloading(true))
        if (text === "全部清空") {
            dispatch(changefilterlist(["0-不限", "0-不限", [[], []], "默认"]))
            sendreload(["0-不限", "0-不限", [[], []], "默认"])
        } else if (fclass === 0) {
            dispatch(changefilterlist(["0-不限", ...filterlist.slice(1, 4)]))
            sendreload(["0-不限", ...filterlist.slice(1, 4)])
        } else if (fclass === 1) {
            dispatch(changefilterlist([filterlist[0], "0-不限", ...filterlist.slice(2, 4)]))
            sendreload([filterlist[0], "0-不限", ...filterlist.slice(2, 4)])
        } else if (fclass === 2) {
            let temp = new Set(filterlist[2][0])
            temp = Array.from(temp)
            temp.splice(temp.indexOf(text), 1)
            dispatch(changefilterlist([...filterlist.slice(0, 2), [temp, filterlist[2][1]], filterlist[3]]))
            sendreload([...filterlist.slice(0, 2), [temp, filterlist[2][1]], filterlist[3]])
        } else {
            let temp = new Set(filterlist[2][1])
            temp = Array.from(temp)
            temp.splice(temp.indexOf(text), 1)
            dispatch(changefilterlist([...filterlist.slice(0, 2), [filterlist[2][0], temp], filterlist[3]]))
            sendreload([...filterlist.slice(0, 2), [filterlist[2][0], temp], filterlist[3]])
        }

    }
    return (
        <div className={styles.filterdelebox} onClick={clearfilter}>
            {text === "全部清空" ? <DeleteOutline style={{ marginRight: '0.2rem' }} /> : <></>}
            {optionobj[text] ?? text}
            {text === "全部清空" ? <></> : <CloseOutline style={{ color: '#333', marginLeft: '0.2rem' }} />}
        </div>
    )
}

export default Filterdelecard