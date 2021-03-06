import React from 'react'
import Link from 'umi/link'
import { Exception } from 'ant-design-pro'

const Exception404 = () => (
  <Exception
    type="403"
    desc='抱歉，你无权访问该页面'
    linkElement={Link}
    backText='返回首页'
  />
)

export default Exception404
