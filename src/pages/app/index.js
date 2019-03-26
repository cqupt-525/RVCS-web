import React from 'react'
import { List, Icon, Menu, Dropdown, Modal, Input } from 'antd'
import { connect } from 'dva'
import UserInfo from '@/components/UserInfo'
import FriendInfo from '@/components/FriendInfo'
import Chat from './chat'
import GroupChat from './groupChat'
import styles from './index.less'

/* eslint-disable */
class App extends React.PureComponent {

  state = {
    chatRoom: '',
    addFriendVisible: false,
    friendUsername: '',
  }

  componentDidMount = () => {
    this.props.dispatch({ type: 'user/getUserInfo' })
    this.props.dispatch({ type: 'friends/getFriendsList' })
  }

  addFriend = () => {
    this.setState({ addFriendVisible: true })
  }

  handleCancel = () => {
    this.setState({ addFriendVisible: false })
  }

  handleOk = () => {
    this.setState({ addFriendVisible: false })
    this.props.dispatch({
      type: 'friends/addFriend',
      payload: {
        username: this.props.user.username,
        friendName: this.state.friendUsername,
      },
    })
  }

  startGroupChat = () => {

  }

  logout = () => {
    this.props.dispatch({ type: 'login/logout' })
  }

  startChat = (friend) => {
    this.setState({ chatRoom: friend.username })
  }

  changeFriendUsername = (e) => {
    this.setState({ friendUsername: e.target.value })
  }

  renderRight = () => {
    const menu = (
      <Menu>
        <Menu.Item key='0'>
          <a onClick={this.addFriend}>添加好友</a>
        </Menu.Item>
        {/* <Menu.Item key='1'>
          <a onClick={this.startGroupChat}>创建群聊</a>
        </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item key='2'>
          <a onClick={this.logout}>退出</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Icon type='plus' style={{ fontSize: 25, color: 'white' }} />
      </Dropdown>
    )
  }

  render() {
    const { user, friends } = this.props
    const { chatRoom, addFriendVisible, friendUsername } = this.state
    return (
      <div className={styles['container']}>
        <div className={styles['left']}>
          <UserInfo {...user} right={this.renderRight()} />
          <List
            split={false}
            header={<div className={styles['header']}>好友列表</div>}
            dataSource={friends.friends}
            renderItem={item => (
              <div key={item.id} className={styles['friends-item']}>
                <FriendInfo {...item} />
                <a onClick={() => this.startChat(item)}>聊天</a>
              </div>
            )}
          />
        </div>
        <div className={styles['right']}>
          {
            chatRoom ? chatRoom === 'group' ?
              <GroupChat /> : <Chat cur={chatRoom} />
              : <div className={styles['center']}><span>暂无聊天</span></div>
          }
        </div>
        <Modal
          title='请输入好友用户名'
          visible={addFriendVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input onChange={this.changeFriendUsername} value={friendUsername} />
        </Modal>
      </div>
    )
  }
}

export default connect(({ user, friends, chat, groupChat }) => ({
  user,
  friends,
  chat,
  groupChat,
}))(App)
