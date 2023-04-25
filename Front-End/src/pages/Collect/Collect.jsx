import React, { useEffect } from 'react'
import styles from "./Collect.module.scss"
import { LeftOutline ,StarFill} from 'antd-mobile-icons'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changemodal } from '../../store/showModal.slice'
import { changefilterlist } from '../../store/currFilter.slice'
import { multifilterApi, restaruantApi } from '../../request/api'
import { changeList } from '../../store/currList.slice'
import { restart } from '../../store/currPagecount.slice'
import { changelistloading } from '../../store/listloading.slice'
import { changeEnd } from '../../store/islistEnd.slice'
import { Collapse, Image } from 'antd-mobile'

const Collect = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const restcollect = useSelector((state) => state.collectList.collectobj)
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
    return (
        <div className={styles.collectbox}>
            <div style={{ position: "fixed", top: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2.8rem', width: "100%", backgroundColor: '#fff' }}>
                <LeftOutline style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '16px', visibility: 'visible' }} onClick={tohome} />
                <span style={{ fontSize: '17px' }}>我的收藏</span>
            </div>
            <div className={styles.listbox}>
                <Collapse defaultActiveKey={['1']}>
                    {restcollect.map((item,index) => {
                        return <Collapse.Panel key={index} title={item.restName} >
                            {item.dishes.map(i=>{
                                return <div style={{display:'flex',margin:'0.4rem 0'}}>
                                    <Image src={i.dishImg} width={30} height={30} style={{borderRadius: 4}}/>
                                    <span style={{fontSize:'1rem',marginLeft:'0.8rem'}}>{i.dishName}</span>
                                    <StarFill style={{position:'absolute',right:"0.5rem",fontSize:'1.5rem',color:'#f3c743'}}/>
                                </div>
                            })}
                        </Collapse.Panel>
                    })}
                </Collapse>
            </div>
        </div>
    )
}

export default Collect