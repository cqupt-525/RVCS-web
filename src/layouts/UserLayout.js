import React from 'react'
import styles from './userLayout.less'

export default function (props) {
  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <div className={styles['header']}>
          <span className={styles['title']}>第二组</span>
        </div>
        <div className={styles['desc']}>傅唯航 陈豪 原野 薛蓝宇 王双</div>
      </div>
      {props.children}
    </div>
  )
}
