import React, { useEffect, useState } from 'react'
import styles from "./Compare.module.scss"
import { LeftOutline, MoreOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { changemodal } from '../../store/showModal.slice'
import { changefilterlist } from '../../store/currFilter.slice'
import { changeEnd } from '../../store/islistEnd.slice'
import { changeList } from '../../store/currList.slice'
import { restart } from '../../store/currPagecount.slice'
import { changelistloading } from '../../store/listloading.slice'
import { multifilterApi } from '../../request/api'
import { restaruantApi } from '../../request/api'
import { restaurantdetailApi } from '../../request/api'
import { useLocation } from 'react-router-dom';
import Myswiper from '../../components/Swiper/Myswiper'
import Restinfo from '../../components/Restinfo/Restinfo'
import Usercomment from '../../components/Usercomment/Usercomment'
import RecoDish from '../../components/RecoDish/RecoDish'

const Compare = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const { id1, id2 } = location.state;
    const [data1, setData1] = useState({})
    const [data2, setData2] = useState({})
    const tohome = () => {
        dispatch(changemodal(false))
        dispatch(changefilterlist(["不限", "不限", [[], []], "默认"]))
        multifilterApi({ arr: ["不限", "不限", [[], []], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
                if (res.status === 201) {
                    dispatch(changeEnd(false))
                } else {
                    dispatch(changeEnd(true))
                }
                dispatch(changeList([...res.data]))
                dispatch(restart())
                dispatch(changelistloading(false))
            })
        })
        document.documentElement.scrollTop = 0
        navigate("/")
    }
    useEffect(() => {
        restaurantdetailApi({ id: id1 }).then(res => {
            setData1({ ...res.data })
        })
        restaurantdetailApi({ id: id2 }).then(res => {
            setData2({ ...res.data })
        })
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {/* 退出栏 */}
            <div className={styles.header}>
                <LeftOutline style={{ position: 'absolute', top: '2vh', left: '4vw', fontSize: '16px', visibility: 'visible' }} onClick={tohome} />
                <span style={{ fontSize: '17px' }}>餐厅对比</span>
            </div>
            <div className={styles.mainbox}>
                {/* 上面餐厅 */}{
                    JSON.stringify(data1)=="{}" ?<></> :<div className={styles.topbox}>
                        <Myswiper data={data1.imgs ? [data1.video, ...data1.imgs] : []} />
                        <Restinfo data={data1} />
                        <RecoDish restId={data1.id} restname={data1.name} />
                        <Usercomment score={data1.score} comments={data1.comments} rvNum={data1.reviews} />
                    </div>
                }

                {/* 分割层 */}
                <div className={styles.line}>
                    <MoreOutline style={{ color: 'rgb(22,119,255)', transform: ['scale(2)'] }} />
                </div>
                {/* 下面餐厅 */}
                {
                    JSON.stringify(data2)=="{}"?<></>:
                    <div className={styles.bottombox}>
                        <Myswiper data={data2.imgs ? [data2.video, ...data2.imgs] : []} />
                        <Restinfo data={data2} />
                        <RecoDish restId={data2.id} restname={data2.name} />
                        <Usercomment score={data2.score} comments={data2.comments} rvNum={data2.reviews} />
                    </div>
                }

            </div>
        </>
    )
}

export default Compare