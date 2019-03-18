import React from 'react'
import { Input, Checkbox, Icon } from 'antd'
import { connect } from 'dva'

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    }
  }

  emitEmpty = () => {
    this.userNameInput.focus()
    this.setState({ userName: '' })
  }

  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value })
  }

  render() {
    const { userName, password } = this.state
    const suffix = userName ? <Icon type='close-circle' onClick={this.emitEmpty} /> : null;
    return (
      <div>
        <Input
          placeholder='请输入用户名'
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={suffix}
          value={userName}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />
        <Input.Password
          placeholder='请输入密码'
          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
          suffix={suffix}
          value={userName}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />
      </div>
    );
  }
}

export default connect()(Login)
