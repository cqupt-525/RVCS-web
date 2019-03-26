import React from 'react'
import { Icon } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import styles from './basicLayout.less'

const links = [{
  key: 'umi',
  title: 'umi',
  href: 'https://umijs.org/zh/',
  blankTarget: true,
}, {
  key: 'github',
  title: <Icon type='github' />,
  href: 'https://github.com/cqupt-525',
  blankTarget: true,
}, {
  key: 'dva',
  title: 'dva',
  href: 'https://dvajs.com/',
  blankTarget: true,
}]

const copyright = <><Icon type='copyright' /> 第二组毕业实习项目 — 基于React/Umi/Dva/antd的web app</>

export default function (props) {
  return (
    <div className={styles['container']}>
      <div className={styles['content']}>
        {props.children}
      </div>
      <GlobalFooter links={links} copyright={copyright} />
    </div>
  )
}
