import React, { useRef, useState } from 'react'
import styles from "./filter.module.scss"
import Filtercard from '../card/filtercard/filtercard'
import { Dropdown, Selector } from 'antd-mobile'
import { CheckOutline } from 'antd-mobile-icons'
import { rankoptions, priceoptions } from './options'
import { singlefilter, multifilterApi } from '../../request/api'
import { useDispatch,useSelector } from 'react-redux'
import { changeList } from "../../store/currList.slice"

const distancelist = ["不限", "500米内", "1.5公里内", "5公里内", "10公里内"]
const nationalarea = ["不限", "静安区", "徐汇区", "长宁区", "黄浦区", "虹口区", "宝山区", "浦东新区", "普陀区", "杨浦区", "闵行区", "嘉定区"]
const caixi = {
  "不限": [],
  "地方菜": ["全部", "江浙菜", "川菜", "粤菜", "湘菜"],
  "快餐简餐": ["全部", "西式快餐", "中式快餐"],
  "火锅": ["全部", "重庆火锅", "鱼火锅", "老北京火锅"],
  "西餐": ["全部", "披萨", "意大利菜", "法国菜", "俄罗斯菜"],
  "日本料理": ["全部", "寿司", "居酒屋", "日式火锅"],
  "小吃": ["全部", "面食", "麻辣烫", "小龙虾", "米粉/米线"],
  "韩国料理": ["全部", "韩国烤肉", "韩式火锅"]
}
const specialfood = ["不限", "火锅系列", "外国菜", "粉面"]
const sortselect = ["默认", "距离最近", "人均最高", "人均最低"]

const Filter = (props) => {
  const { setHeadercolor } = props
  const dispatch = useDispatch()
  const restlist = useSelector((state) => state.currList.restList)
  //下拉菜单ref
  const dropdownref = useRef()
  //位置筛选相关变量
  const [location, setLocation] = useState("距离")
  const [distance, setDistance] = useState("不限")
  const [area, setArea] = useState("不限")
  //菜系筛选相关变量
  const [foodstyle1, setFoodstyle1] = useState("菜系")
  const [foodstyle2, setFoodstyle2] = useState("不限")
  const [foodstyle3, setFoodstyle3] = useState("全部")
  const [specialstyle, setSpecialstyle] = useState("不限")
  //筛选相关变量
  const [slength,setSlength] = useState(0)
  const [rank, setRank] = useState([])
  const [price, setPrice] = useState([])
  const [templist,setTemplist] = useState(restlist)
  //智能排序相关变量
  const [sortselection, setSortselection] = useState("默认")
  //点击filter区域自动scroll至其sticky位置
  const scrolltofilter = () => {
    let curTop = document.body.scrollTop || document.documentElement.scrollTop;
    if (curTop < 149 && restlist.length>=4) {
      document.documentElement.scrollTop = 149
      setHeadercolor("white")
    }
  }
  //单向筛选回调，向后端请求筛选后列表，并关闭筛选下拉框
  const tofilter = (urlkey, item) => {
    let str = ""
    if (item === "全部") {
      str = foodstyle2
    } else {
      str = item
    }
    singlefilter(`${urlkey}?filter=${str}`).then(res => {
      dispatch(changeList([...res.data]))
    })
    dropdownref.current.close()
  }
  //多项筛选回调
  const confirmselector = (item, arr) => {
    if (item === "rank") {
      if(arr[arr.length-1] === "rank1"){
        arr.length = 0;
        arr.push("rank1")
      }else if(arr[arr.length-1] !== "rank1" && arr.includes("rank1")){
        arr.splice(0,1)
      }
      setRank(arr)
      multifilterApi({ rank: arr }).then(res => {
        setSlength(res.data.length)
        setTemplist(res.data)
      })
    } else {
      setPrice(arr)
      multifilterApi({ price: arr }).then(res => {
        setSlength(res.data.length)
        setTemplist(res.data)
      })
    }
  }
  //多项筛选重置
  const resetsort = () => {
    setRank([])
    setPrice([])
    multifilterApi({ price: [],rank:[] }).then(res => {
      setSlength(res.data.length)
      setTemplist(res.data)
    })
  }
  //多项筛选确认
  const confirmsort = () => {
    dispatch(changeList([...templist]))
    dropdownref.current.close()
  }
  return (
    <div className={styles.filterbox}>
      {/* 位置、菜系、筛选、智能排序 */}
      <div style={{ flexBasis: '50%', paddingRight: '0.3rem' }} onClick={scrolltofilter}>
        <Dropdown style={{ backgroundColor: 'rgb(250,250,250)' }} ref={dropdownref}>
          <Dropdown.Item key='location' title={distance === "不限" ? (area === "不限" ? "位置" : area) : distance} highlight={distance !== "不限" || area !== "不限"}>
            <div className={styles.dropdownbox}>
              {/* 左一列选择距离还是行政区 */}
              <div className={styles.locationandstyleleft}>
                <div className={location === "距离" ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { setLocation("距离") }}><span>距离</span></div>
                <div className={location === "行政区" ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { setLocation("行政区") }}><span>行政区</span></div>
              </div>
              {/* 右侧选择具体选项 */}
              <div className={styles.locationandstyleright}>
                {location === "距离" ?
                  distancelist.map((item, index) => {
                    return <div key={index}>
                      <div className={distance === item ? styles.boxrightselect : styles.boxright} onClick={() => { setDistance(item); setArea("不限"); tofilter("locationfilter", item) }}><span>{item}</span>{distance === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                      {(index !== distancelist.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                    </div>
                  }) :
                  nationalarea.map((item, index) => {
                    return <div key={index}>
                      <div className={area === item ? styles.boxrightselect : styles.boxright} onClick={() => { setArea(item); setDistance("不限"); tofilter("locationfilter", item) }}><span>{item}</span>{area === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                      {(index !== nationalarea.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                    </div>
                  })
                }
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='foodkind' title={specialstyle === "不限" ? (foodstyle2 === "不限" ? "菜系" : foodstyle3 === "全部" ? foodstyle2 : foodstyle3) : specialstyle} highlight={specialstyle !== "不限" || foodstyle2 !== "不限"}>
            <div className={styles.dropdownbox}>
              {/* 左一列选择菜系还是特色菜 */}
              <div className={styles.locationandstyleleft}>
                <div className={foodstyle1 === "特色菜" ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { setFoodstyle1("特色菜") }}><span>特色菜</span></div>
                <div className={foodstyle1 === "菜系" ? styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { setFoodstyle1("菜系") }}><span>菜系</span></div>
              </div>
              <div className={styles.locationandstyleright}>
                <div className={styles.styleright}>
                  <div className={styles.styleright1} style={foodstyle1 === "特色菜" ? { backgroundColor: '#fff', flexBasis: '100%' } : { color: "rgb(153, 153, 153)" }}>
                    {/* 菜系的话，中间多渲染一列 */}
                    {
                      foodstyle1 === "菜系" ?
                        Object.keys(caixi).map((item, index) => {
                          return <div key={index}>
                            <div className={foodstyle2 === item ? foodstyle2 === "不限" ? styles.boxrightselect : styles.locationandstyleleftdivselect : styles.locationandstyleleftdiv} onClick={() => { setFoodstyle2(item); if (item === "不限") { tofilter("stylefilter", item) } }}><span>{item}</span></div>
                            <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div>
                          </div>
                        })
                        :
                        specialfood.map((item, index) => {
                          return <div key={index}>
                            <div className={specialstyle === item ? styles.boxrightselect : styles.boxright} onClick={() => { setSpecialstyle(item); setFoodstyle2("不限"); setFoodstyle3("全部"); tofilter("stylefilter", item) }}><span>{item}</span></div>
                            {(index !== specialfood.length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
                          </div>
                        })
                    }
                  </div>
                  {/* 菜系右侧选项 */}
                  <div className={styles.styleright2}>
                    {
                      foodstyle1 === "菜系" ?
                        caixi[foodstyle2].length !== 0 ?
                          caixi[foodstyle2].map((item, index) => {
                            return <div key={index}>
                              <div className={foodstyle3 === item ? styles.boxrightselect : styles.boxright} onClick={() => { setFoodstyle3(item); setSpecialstyle("不限"); tofilter("stylefilter", item) }}><span>{item}</span>{foodstyle3 === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
                              {(index !== caixi[foodstyle2].length - 1) ? <div style={{ height: '0.05rem', marginLeft: '1.4rem', marginTop: '0.12rem', backgroundColor: '#e8e8e8' }}></div> : <></>}
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
          <Dropdown.Item key='select' title='筛选'>
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
          <Dropdown.Item key='sort' title={sortselection === "默认" ? '智能排序' : sortselection} highlight={sortselection !== "默认"}>
            <div className={styles.dropdownbox} style={{ padding: '0', height: '22rem', flexDirection: 'column' }}>
              {
                sortselect.map((item, index) => {
                  return <div key={index}>
                    <div className={sortselection === item ? styles.boxrightselect : styles.boxright} onClick={() => { setSortselection(item); tofilter("sortfilter", item) }}><span>{item}</span>{sortselection === item ? <CheckOutline style={{ margin: '1rem 1.2rem 0 0' }} /> : <></>}</div>
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
        <Filtercard text={"老牌餐厅"} />
        <Filtercard text={"老牌餐厅"} />
        <Filtercard text={"老牌餐厅"} />
        <Filtercard text={"老牌餐厅"} />
        <Filtercard text={"老牌餐厅"} />
        <Filtercard text={"老牌餐厅"} />
      </div>
    </div>
  )
}

export default Filter