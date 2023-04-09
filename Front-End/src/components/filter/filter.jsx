import React from 'react'
import styles from "./filter.module.scss"
import Filtercard from '../card/filtercard/filtercard'
import { Dropdown } from 'antd-mobile'

const Filter = () => {
  return (
    <div className={styles.filterbox}>
      {/* 位置、菜系、筛选、智能排序 */}
      <div style={{ flexBasis: '50%', paddingRight: '0.3rem' }}>
        <Dropdown style={{backgroundColor:'rgb(250,250,250)'}}>
          <Dropdown.Item key='location' title='位置'>
            <div style={{ padding: 12 }}>
              排序内容
              <br />
              排序内容
              <br />
              排序内容
              <br />
              排序内容
              <br />
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='foodkind' title='菜系'>
            <div style={{ padding: 12 }}>
              商机筛选内容
              <br />
              商机筛选内容
              <br />
              商机筛选内容
              <br />
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='select' title='筛选'>
            <div style={{ padding: 12 }}>
              更多筛选内容
              <br />
              更多筛选内容
              <br />
            </div>
          </Dropdown.Item>
          <Dropdown.Item key='sort' title='智能排序'>
            <div style={{ padding: 12 }}>
              更多筛选内容
              <br />
              更多筛选内容
              <br />
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/* 快筛 */}
      <div className={styles.fastsortbox}>
        <Filtercard text={"2022榜单餐厅"}/>
        <Filtercard text={"老牌餐厅"}/>
        <Filtercard text={"老牌餐厅"}/>
        <Filtercard text={"老牌餐厅"}/>
        <Filtercard text={"老牌餐厅"}/>
        <Filtercard text={"老牌餐厅"}/>
        <Filtercard text={"老牌餐厅"}/>
      </div>
    </div>
  )
}

export default Filter