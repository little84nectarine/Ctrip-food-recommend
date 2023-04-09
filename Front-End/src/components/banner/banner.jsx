import React from 'react'
import styles from "./banner.module.scss"
import Bannercard from '../card/bannercard/bannercard'

const Banner = () => {
  return (
    <div className={styles.bannerbox}>
        <div style={{fontSize:'1.3rem',fontFamily:'Mingchao',fontWeight:'300'}}>当地推荐</div>
        <div className={styles.horizonbox}>
          <Bannercard imgurl={"https://youimg1.c-ctrip.com/target/0106x120008ghpc63B032_D_300_240_Q90.jpg?proc=autoorient"} text={"十大正宗本帮菜"}/>
          <Bannercard imgurl={"https://youimg1.c-ctrip.com/target/0106x120008ghpc63B032_D_300_240_Q90.jpg?proc=autoorient"} text={"十大正宗本帮菜"}/>
          <Bannercard imgurl={"https://youimg1.c-ctrip.com/target/0106x120008ghpc63B032_D_300_240_Q90.jpg?proc=autoorient"} text={"十大正宗本帮菜"}/>
          <Bannercard imgurl={"https://youimg1.c-ctrip.com/target/0106x120008ghpc63B032_D_300_240_Q90.jpg?proc=autoorient"} text={"十大正宗本帮菜"}/>
          <Bannercard imgurl={"https://youimg1.c-ctrip.com/target/0106x120008ghpc63B032_D_300_240_Q90.jpg?proc=autoorient"} text={"十大正宗本帮菜"}/>
        </div>
    </div>
  )
}

export default Banner