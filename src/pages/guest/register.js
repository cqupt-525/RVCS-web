import React, { PureComponent } from 'react'
import { Input, Button, Icon, notification } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import router from 'umi/router'
import styles from './register.less'

class Register extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
    }
  }

  componentDidUpdate() {
    const { register, dispatch } = this.props
    if (register.status === 'ok') {
      notification.success({
        message: '注册成功'
      })
      setTimeout(() => {
        router.push('/login')
      }, 2000)
      dispatch({ type: 'register/initStatus' })
    }
    if (register.status === 'error') {
      notification.error({
        message: '注册失败',
        description: register.statusText,
      })
      dispatch({ type: 'register/initStatus' })
    }
  }

  handleInfoChange = (key, value) => {
    this.setState({ [key]: value })
  }

  handleSubmit = () => {
    const { username, password, email } = this.state
    this.props.dispatch({
      type: 'register/submit',
      payload: {
        username,
        password,
        email,
      },
    })
  }

  render() {
    const { loading } = this.props
    const { username, password, email } = this.state

    return (
      <div className={styles['container']}>
        <div className={styles['input-area']}>
          <Input
            className={styles['input-between']}
            size='large'
            placeholder='用户名'
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={username}
            onChange={e => this.handleInfoChange('username', e.target.value)}
          />
          <Input.Password
            className={styles['input-between']}
            size='large'
            placeholder='密码'
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={password}
            onChange={e => this.handleInfoChange('password', e.target.value)}
          />
          <Input
            size='large'
            placeholder='邮箱'
            prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={email}
            onChange={e => this.handleInfoChange('email', e.target.value)}
          />
        </div>
        <div className={styles['option-area']}>
          <div className={styles['option']}>
            <Link to='/login'>
              <span>已有账户</span>
            </Link>
          </div>
          <Button type='primary' size='large' loading={loading} onClick={this.handleSubmit}>注册</Button>
        </div>
      </div>
    )
  }
}

export default connect(({ register, loading }) => ({
  register,
  loading: loading.effects['register/submit']
}))(Register)
