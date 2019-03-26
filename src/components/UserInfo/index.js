import React from 'react'
import { Avatar } from 'antd'
import styles from './index.less'

export default (props) => (
  <div className={styles['container']}>
    <Avatar size={50} icon='user' />
    <div className={styles['text']}>
      <span className={styles['text-username']}>{props.username}</span>
      <span>{props.email}</span>
    </div>
    <div className={styles['right']}>
      {props.right}
    </div>
  </div>
)
