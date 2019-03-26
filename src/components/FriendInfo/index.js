import React from 'react'
import { Avatar } from 'antd'
import styles from './index.less'

export default (props) => (
  <div className={styles['container']}>
    <Avatar size='large' icon='user' />
    <div className={styles['text']}>
      <span className={styles['text-username']}>{props.username}</span>
      <span>{props.email}</span>
    </div>
  </div>
)
