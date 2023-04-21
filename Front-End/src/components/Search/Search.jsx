import React, { useEffect, useState } from 'react'
import styles from "./Search.module.scss"
import { useDispatch } from 'react-redux'
import { changemodal } from '../../store/showModal.slice'
import { SearchBar, Skeleton, ErrorBlock } from 'antd-mobile'
import Filtercard from '../card/filtercard/filtercard'
import Hotcard from '../card/Hotcard/Hotcard'
import Searchcard from '../card/Searchcard/Searchcard'
import { hotApi } from '../../request/api'
import { searchApi } from '../../request/api'
import useDebounce from "../../hooks/useDebounce"
const fastsearch = ["2022美食林榜单餐厅", "限时抢购", "预约订座", "生煎", "上海小笼包", "葱油拌面", "青团", "外滩"]
const Search = () => {
  const dispatch = useDispatch()
  const [hotlist, setHotlist] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [searchlist, setSearchlist] = useState([])
  const [searchkey,setSearchkey] = useState("")
  const searchrest = useDebounce(e => {
    searchApi(e).then(res => {
      console.log(res);
      setSearchlist(res.data)
    })
  }, 800)
  const searchrestd = (e) => {
    setSearchkey(e)
    searchrest(e)
  }

  useEffect(() => {
    setSearchlist("no")
    hotApi().then(res => {
      setHotlist(res.data)
      setIsloading(false)
    })
  }, [])

  return (
    <div className={styles.searchbox}>
      {
        searchlist === "no" ? <></> :
          <div className={styles.listpage}>
            <div style={{ height: '3.4rem', width: '100%', backgroundColor: '#fff', position: "fixed" }}></div>
            {searchlist.length === 0 ? <ErrorBlock status='empty' style={{ marginTop: '4.4rem' }} /> : <div className={styles.listbox}>
              {searchlist.map((item, index) => {
                return <div key={item.id}>
                  <Searchcard data={item} searchkey={searchkey}/>
                  {index === searchlist.length - 1 ? <></> : <div style={{ height: '0.05rem', margin: '0.5rem -0.8rem 0.8rem 0', backgroundColor: '#e8e8e8' }}></div>}
                </div>
              })}
            </div>}
          </div>
      }
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: '1000' }}>
        <div className={styles.barbox}>
          <SearchBar
            className={styles.searchbar}
            placeholder='请输入内容'
            style={{
              '--height': "2.4rem",
              '--border-radius': '1.5rem'
            }}
            clearable={true}
            onChange={searchrestd}
            onClear={() => { ; setSearchlist("no") }}
          />
        </div>
        <span style={{ fontSize: '1rem', flexBasis: '3rem' }} onClick={() => { dispatch(changemodal(false)) }}>取消</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0.3rem 1rem', width: '90%', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        <div style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem', marginLeft: '0.2rem' }}>大家都在搜</div>
        <div>
          {fastsearch.map((item, index) => {
            return <div key={index} style={{ display: 'inline-block', margin: '0.3rem 0.06rem', fontSize: '0.86rem', color: '#666' }}>
              <Filtercard text={item} size={"0.4rem 0.8rem"} borderR={"1rem"} />
            </div>
          })}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '0.3rem 1rem', width: '100%', marginTop: '1rem' }}>
        <div style={{ color: '#999', fontSize: '0.9rem', margin: '0 0 1rem 0.2rem' }}>上海热门榜单</div>
        {isloading ?
          <div style={{ marginLeft: '-0.5rem', width: '94%' }}>
            <Skeleton.Title animated />
            <Skeleton.Paragraph lineCount={5} animated />
          </div>
          : <div>
            {
              hotlist.map((item) => {
                return <div key={item.id}>
                  <Hotcard num={item.rank} text={item.text} hot={item.point} />
                </div>
              })
            }
          </div>}
      </div>
    </div>
  )
}

export default Search