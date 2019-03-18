import React from 'react'
import { connect } from 'dva'
import { userLayoutConfig } from '@/config'
import UserLayout from './UserLayout'
import BasicLayout from './BasicLayout'

function Layout(props) {

  const { pathname } = props.location

  if (userLayoutConfig && userLayoutConfig.includes(pathname)) {
    return <UserLayout {...props} />;
  }

  return <BasicLayout {...props} />
}

export default connect()(Layout)
