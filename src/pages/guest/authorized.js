import React from 'react'
import Authorized from '@/utils/authorized'
import Redirect from 'umi/redirect'
import { getAuthority } from '@/utils/authority'

export default ({ children }) => {
  return <Authorized
    authority={() => !getAuthority()}
    noMatch={<Redirect to='/' />}
  >
    {children}
  </Authorized>
}
