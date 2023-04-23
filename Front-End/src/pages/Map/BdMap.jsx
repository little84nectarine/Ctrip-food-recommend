import React, { useEffect, useState } from 'react'
import styles from './Map.module.scss'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl'
import { LeftOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { locationApi } from '../../request/api'

export default function BdMap() {
  const navigate = useNavigate()
  const id = (useSelector(store => store.currRest)).id
  const [info, setInfo] = useState({
    name: '加载中...',
    location: '加载中...',
    point: { lng: 121, lat: 31 }
  })
  
  useEffect(() => {
    let el = document.getElementsByClassName('anchorBL')
    if(el.length > 0){
      for(let i of el){
        i.style.visibility = "hidden"
      }
    }

    locationApi({id: id}).then(res=>{
      let data = res.data
      console.log(data);
      setInfo({...data})
    })
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.back}>
        <LeftOutline className={styles.tag} onClick={() => navigate('/food')} />
      </div>
      {/* 地图 */}
      <div className={styles.mainbox}>
        <div className={styles.mapContainer}>
          <Map style={{ height: '80vh' }} center={info.point} zoom="11"
            enableScrollWheelZoom={true}>
            <Marker position={info.point} />
            <NavigationControl />
            <InfoWindow position={info.point} text={info.location} title={info.name} />
          </Map>
        </div>
        <div className={styles.footer}>
          <div className={styles.name}>{info.name}</div>
          <div className={styles.location}>{info.location}</div>
          <div className={styles.btn} onClick={() => navigate('/food')} >查看攻略</div>
        </div>
      </div>

    </div>
  )
}
