import React from 'react'
import { connect } from 'dva'
import Link from 'umi/link'
import styles from './UserLayout.less'

function UserLayout(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>第二组</span>
            </Link>
          </div>
          <div className={styles.desc}>傅唯航 陈豪 原野 薛蓝宇 王双</div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default connect()(UserLayout)
