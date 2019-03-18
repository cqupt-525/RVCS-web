import React from 'react'
import { connect } from 'dva'
import styles from './BasicLayout.less'

function BasicLayout(props) {
  return (
    <div>
      <div>BasicLayout</div>
      {props.children}
    </div>
  )
}

export default connect()(BasicLayout)
