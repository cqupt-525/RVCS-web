import React, { PureComponent } from 'react'
import { Input, Checkbox, Button, Icon } from 'antd'
import { connect } from 'dva'
import Link from 'umi/link'
import styles from './login.less'

class Login extends PureComponent {
  constructor(props) {
    super(props)
    this._autoLogin = false
    this.state = {
      username: '',
      password: '',
    }
  }

  emitEmpty = () => {
    this.usernameInput.focus()
    this.setState({ username: '' })
  }

  handleAccountChange = (key, value) => {
    this.setState({ [key]: value })
  }

  handleAutoLogin = (e) => {
    this._autoLogin = e.target.checked
  }

  handleLogin = () => {
    const { username, password } = this.state
    this.props.dispatch({
      type: 'login/login',
      payload: {
        autoLogin: this._autoLogin,
        username,
        password,
      },
    })
  }

  render() {
    const { login } = this.props
    const { username, password } = this.state

    const suffix = username ? <Icon type='close-circle' onClick={this.emitEmpty} /> : null

    return (
      <div className={styles['container']}>
        <div className={styles['input-area']}>
          <Input
            className={styles['input-between']}
            size='large'
            placeholder='用户名'
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={username}
            onChange={e => this.handleAccountChange('username', e.target.value)}
            ref={node => this.usernameInput = node}
          />
          <Input.Password
            size='large'
            placeholder='密码'
            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={password}
            onChange={e => this.handleAccountChange('password', e.target.value)}
          />
        </div>
        <div className={styles['option-area']}>
          <div className={styles['option']}>
            <Checkbox onChange={this.handleAutoLogin}>自动登录</Checkbox>
            <Link to='/register'>
              <span>注册账户</span>
            </Link>
          </div>
          <Button type='primary' size='large' loading={login} onClick={this.handleLogin}>登陆</Button>
        </div>
      </div>
    )
  }
}

export default connect(({ loading }) => ({
  login: loading.effects['login/login']
}))(Login)
