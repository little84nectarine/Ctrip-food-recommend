import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from "./Filter.module.scss"
import Filtercard from '../card/Filtercard/Filtercard'
import { Dropdown, Selector } from 'antd-mobile'
import { CheckOutline } from 'antd-mobile-icons'
import { rankoptions, priceoptions } from './options'
import { multifilterApi } from '../../request/api'
import { useDispatch, useSelector } from 'react-redux'
import { restaruantApi } from '../../request/api'
import { changeList } from "../../store/currList.slice"
import { changeEnd } from '../../store/islistEnd.slice'
import { restart } from '../../store/currPagecount.slice'
import { changefilterlist } from '../../store/currFilter.slice'
import { changelistloading } from '../../store/listloading.slice'
import { distancelist, nationalarea, caixi, specialfood, sortselect } from "./static"
const Filter = (props) => {
  const { setHeadercolor, filterlength } = props
  let abcdefg = []
  const dispatch = useDispatch()
  const restlist = useSelector((state) => state.currList.restList)
  const filterlist = useSelector(state => state.currFilter.filterlist)
  //下拉菜单ref
  const dropdownref = useRef()
  //筛选相关变量
  const [slength, setSlength] = useState(0)
  const [rank, setRank] = useState([])
  const [price, setPrice] = useState([])
  //点击filter区域自动scroll至其sticky位置
  const scrolltofilter = useCallback(() => {
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (curTop < 149 && restlist.length >= 4) {
      document.documentElement.scrollTop = 149
      setHeadercolor("white")
    }
  })
  //后端判断是否触底
  const ifend = useCallback((code) => {
    if (code === 201) {
      dispatch(changeEnd(false))
    } else {
      dispatch(changeEnd(true))
    }
    dispatch(changelistloading(false))
  })
  //多项筛选回调
  const confirmselector = (key, item) => {
    if (key === "rank" || key === "price") {
      if (key === "rank") {
        if (item[item.length - 1] === "rank1") {
          item.length = 0;
          item.push("rank1")
        } else if (item[item.length - 1] !== "rank1" && item.includes("rank1")) {
          item.splice(0, 1)
        }
        setRank(item)
        dispatch(changefilterlist([...filterlist.slice(0, 2), [item, filterlist[2][1]], filterlist[3]]))
        multifilterApi({ arr: [...filterlist.slice(0, 2), [item, filterlist[2][1]], filterlist[3]] }).then(res => {
          restaruantApi(0).then(res => {
            ifend(res.status)
            dispatch(changeList([...res.data]))
          })
          setSlength(res.data.length)
        })
      } else {
        setPrice(item)
        dispatch(changefilterlist([...filterlist.slice(0, 2), [filterlist[2][0], item], filterlist[3]]))
        multifilterApi({ arr: [...filterlist.slice(0, 2), [filterlist[2][0], item], filterlist[3]] }).then(res => {
          setSlength(res.data.length)
          dispatch(changeList([...res.data]))
        })
      }
    } else {
      dispatch(changelistloading(true))
      let temparr = [];
      if (key === "location") {
        dispatch(changefilterlist([item, ...filterlist.slice(1, 4)]))
        temparr = [item, ...filterlist.slice(1, 4)]
      } else if (key === "style") {
        if (!item.endsWith("全部")) {
          dispatch(changefilterlist([filterlist[0], item, ...filterlist.slice(2, 4)]))
          temparr = [filterlist[0], item, ...filterlist.slice(2, 4)]
        }
      } else if (key === "sort") {
        dispatch(changefilterlist([...filterlist.slice(0, 3), item]))
        temparr = [...filterlist.slice(0, 3), item]
      }
      multifilterApi({ arr: temparr }).then(() => {
        restaruantApi(0).then(res => {
          ifend(res.status)
          dispatch(changeList([...res.data]))
        })
      })
      dropdownref.current.close()
    }
    dispatch(restart())
  }
  //多项筛选重置
  const resetsort = () => {
    setRank([])
    setPrice([])
    dispatch(changefilterlist([...filterlist.slice(0, 2), [[], []], filterlist[3]]))
    multifilterApi({ arr: [...filterlist.slice(0, 2), [[], []], filterlist[3]] }).then(res => {
      restaruantApi(0).then(res => {
        ifend(res.status)
        dispatch(changeList([...res.data]))
      })
      setSlength(res.data.length)
    })
  }
  //多项筛选确认
  const confirmsort = () => {
    dropdownref.current.close()
  }
  useEffect(() => {
    setRank(filterlist[2][0])

    setPrice(filterlist[2][1])
    if (filterlength !== -1) {
      setSlength(filterlength)
    }
  }, [filterlist])
  return (
    <div className={styles.filterbox}>
      {/* 位置、菜系、筛选、智能排序 */}
      <div style={{ flexBasis: '50%', paddingRight: '0.3rem' }} onClick={scrolltofilter}>
        <Dropdown style={{ backgroundColor: 'rgb(250,250,250)' }} ref={dropdownref}>
          <Dropdown.Item key='location' title={filterlist[0].endsWith("不限") ? "位置" : filterlist[0].split("-")[1]} highlight={!filterlist[0].endsWith("不限")}>
            <div className={styles.dropdownbox}>
              {/* 左一列选择距离还是行政区 */}
              <div className={styles.locationandstyleleft}>
                <div className={filterlist[0].startsWith("0") ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { dispatch(changefilterlist(["0-不限", ...filterlist.slice(1, 4)])) }}><span>距离</span></div>
                <div className={filterlist[0].startsWith("1") ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { dispatch(changefilterlist(["1-不限", ...filterlist.slice(1, 4)])) }}><span>行政区</span></div>
              </div>
              {/* 右侧选择具体选项 */}
              <div className={styles.locationandstyleright}>
                {filterlist[0].startsWith("0") ?
                  distancelist.map((item, index) => {
                    return <div key={index}>
                      <div className={filterlist[0] === item ? styles.boxrightselect : styles.boxright} onClick={() => { confirmselector("location", item) }}><span>{item.split("-")[1]}</span>{filterlist[0] === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                      {(index !== distancelist.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                    </div>
                  }) :
                  nationalarea.map((item, index) => {
                    return <div key={index}>
                      <div className={filterlist[0] === item ? styles.boxrightselect : styles.boxright} onClick={() => { confirmselector("location", item) }}><span>{item.split("-")[1]}</span>{filterlist[0] === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                      {(index !== nationalarea.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                    </div>
                  })
                }
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='foodkind' title={filterlist[1].endsWith("不限") ? "菜系" : filterlist[1].split("-").slice(-1)} highlight={!filterlist[1].endsWith("不限")}>
            <div className={styles.dropdownbox}>
              {/* 左一列选择菜系还是特色菜 */}
              <div className={styles.locationandstyleleft}>
                <div className={filterlist[1].startsWith("8") ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { dispatch(changefilterlist([filterlist[0], "8-不限", ...filterlist.slice(2, 4)])) }}><span>特色菜</span></div>
                <div className={!filterlist[1].startsWith("8") ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { dispatch(changefilterlist([filterlist[0], "0-不限", ...filterlist.slice(2, 4)])) }}><span>菜系</span></div>
              </div>
              <div className={styles.locationandstyleright}>
                <div className={styles.styleright}>
                  <div className={styles.styleright1} style={filterlist[1].startsWith("8") ? { backgroundColor: '#fff', flexBasis: '100%' } : { color: "rgb(153, 153, 153)" }}>
                    {/* 菜系的话，中间多渲染一列 */}
                    {
                      !filterlist[1].startsWith("8") ?
                        Object.keys(caixi).map((item, index) => {
                          return <div key={index}>
                            <div className={filterlist[1].startsWith(item) ? filterlist[1].endsWith("不限") ? styles.boxrightselect : styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => {
                              if (item.includes("不限")) {
                                confirmselector("style", item)
                              } else {
                                dispatch(changefilterlist([filterlist[0], item, ...filterlist.slice(2, 4)]))
                              }
                            }}><span>{item.split("-")[1]}</span></div>
                            <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div>
                          </div>
                        })
                        :
                        specialfood.map((item, index) => {
                          return <div key={index}>
                            <div className={filterlist[1] === item ? styles.boxrightselect : styles.boxright} onClick={() => { confirmselector("style", item) }}><span>{item.split("-")[1]}</span></div>
                            {(index !== specialfood.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                          </div>
                        })
                    }
                  </div>
                  {/* 菜系右侧选项 */}
                  <div className={styles.styleright2}>
                    {
                      !filterlist[1].startsWith("8") ?
                        filterlist[1] !== "0-不限" ?
                          caixi[filterlist[1].split("-").slice(0, 2).join("-")].map((item, index) => {
                            return <div key={index}>
                              <div className={(filterlist[1].split("-").length === 2 && item.endsWith("全部")) || filterlist[1] === item ? styles.boxrightselect : styles.boxright} onClick={() => { confirmselector("style", item) }}><span>{item.split("-")[2] || "全部"}</span>{(filterlist[1].split("-").length === 2 && item.endsWith("全部")) || filterlist[1] === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                              {(index !== caixi[Object.keys(caixi)[filterlist[1][0]]].length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                            </div>
                          })
                          :
                          <></>
                        :
                        <></>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='select' title='筛选' highlight={(filterlist[2][0].length === 0 && filterlist[2][1].length === 0) ? false : true}>
            <div className={styles.dropdownbox}>
              <div className={styles.sortbox}>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.7rem', marginLeft: '0.1rem' }}>等级</div>
                <div>
                  <Selector
                    options={rankoptions}
                    defaultValue={[]}
                    multiple={true}
                    onChange={(arr) => confirmselector("rank", arr)}
                    value={rank}
                    style={{
                      '--border': '1px solid #e2e2e2',
                      '--checked-border': '1px solid #E93939',
                      '--checked-color': 'rgba(255, 249, 247,0.1)',
                      '--checked-text-color': '#E93939',
                      '--color': 'transparent',
                      '--border-radius': '0.2rem',
                      '--padding': '0.5rem 0.5rem'
                    }}
                    showCheckMark={false}
                  />
                </div>
                <div style={{ fontSize: '0.9rem', marginBottom: '0.7rem', marginLeft: '0.1rem', marginTop: '1rem' }}>价格</div>
                <div>
                  <Selector
                    options={priceoptions}
                    defaultValue={[]}
                    multiple={true}
                    onChange={(arr) => confirmselector("price", arr)}
                    value={price}
                    style={{
                      '--border': '1px solid #e2e2e2',
                      '--checked-border': '1px solid #E93939',
                      '--checked-color': 'rgba(255, 249, 247,0.1)',
                      '--checked-text-color': '#E93939',
                      '--color': 'transparent',
                      '--border-radius': '0.2rem',
                      '--padding': '0.5rem 0.5rem'
                    }}
                    showCheckMark={false}
                  />
                </div>
                {(rank.length === 0 && price.length === 0) ? <></> : <div style={{ position: 'absolute', bottom: '3rem', height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: '-1rem', backgroundColor: '#f8f8f8', color: '#999', fontSize: '0.9rem' }}>{slength}家餐厅</div>}
                <div style={{ position: 'absolute', bottom: '0', display: 'flex', height: '3rem', fontSize: '1rem', justifyContent: "space-between", alignItems: 'center', width: '100%', marginLeft: '-1rem' }}>
                  <div style={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'center', borderTop: '1px solid #e1e1e1', boxSizing: 'border-box' }} onClick={resetsort}>重置</div>
                  <div style={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', backgroundColor: '#c82c2c', color: 'white', height: '100%', alignItems: 'center' }} onClick={confirmsort}>确定</div>
                </div>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='sort' title={filterlist[3] === "默认" ? "智能排序" : filterlist[3]} highlight={filterlist[3] !== "默认"}>
            <div className={styles.dropdownbox} style={{ padding: '0', height: '22rem', flexDirection: 'column' }}>
              {
                sortselect.map((item, index) => {
                  return <div key={index}>
                    <div className={filterlist[3] === item ? styles.boxrightselect : styles.boxright} onClick={() => { confirmselector("sort", item) }}><span>{item}</span>{filterlist[3] === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                    {(index !== sortselect.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                  </div>
                })
              }
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/* 快筛 */}
      <div className={styles.fastsortbox}>
        <Filtercard text={"2022榜单餐厅"} />
        <Filtercard text={"川菜"} />
        <Filtercard text={"西餐"} />
        <Filtercard text={"人均100-300"} />
        <Filtercard text={"火锅系列"} />
      </div>
    </div>
  )
}
export default Filter