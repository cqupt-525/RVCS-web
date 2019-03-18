import React from 'react'
import { connect } from 'dva'
import Redirect from 'umi/redirect'

function Index(props) {

  let isLogin = false

  return isLogin ? <Redirect to='/organization' /> : <Redirect to='/user/login' />
}

export default connect()(Index)
