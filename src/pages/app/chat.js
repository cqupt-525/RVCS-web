import React from 'react'
import { Input, Button } from 'antd'
import { connect } from 'dva'
import styles from './chat.less'

class Chat extends React.PureComponent {
  state = {
    input: '',
    isVideo: false,
  }

  componentDidMount = () => {
    this.initWebRtc()
  }

  initWebRtc = () => {
    // 获取浏览器媒体设备流
    const constraints = {
      video: true,
      audio: true,
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        this.stream = stream
      })
      .catch(e => {
        console.log(e)
      })

    //   const server = null
    //   let local = new RTCPeerConnection(server)
    //   let remote = new RTCPeerConnection(server)
    //   local.addStream()
    //   remote.onaddstream = (e) => {
    //     this.video.srcObject = e.stream
    //   }

    //   const offerOptions = {
    //     offerToReceiveAudio: 1,
    //     offerToReceiveVideo: 1,
    //   }
    //   local.createOffer(offerOptions).then(desc => {
    //     local.setLocalDescription(desc)
    //     remote.setRemoteDescription(desc)
    //   })

    //   remote.createAnswer().then(desc => {
    //     local.setRemoteDescription(desc)
    //     remote.setLocalDescription(desc)
    //   })
  }

  componentDidUpdate = () => {
    if (this.refs.video && !this.refs.video.srcObject) {
      this.refs.video.srcObject = this.stream
      this.before = this.props.cur
    }
    if (this.before !== this.props.cur) {
      this.setState({ isVideo: false })
    }
  }

  changeVideo = () => {
    this.setState({ isVideo: !this.state.isVideo })
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value })
  }

  sendMessage = () => {
    this.setState({ input: '' })
    this.props.dispatch({
      type: 'chat/sendMessage',
      payload: {
        source: this.props.user.username,
        target: this.props.cur,
        message: this.state.input,
      },
    })
  }

  render() {
    const { cur, chat } = this.props
    const { isVideo } = this.state
    const messages = chat[cur] || []

    return (
      <div className={styles['container']} >
        <div className={styles['header']}>{cur}</div>
        {
          isVideo
            ? <div className={styles['video']}>
              <video autoPlay ref='video' />
            </div>
            : <div className={styles['content']}>
              {
                messages.length ? messages.map(item => (
                  <div key={item.username} className={styles['item']}>
                    <span>{item.username}: </span>
                    <span>{item.content}</span>
                  </div>
                )) : null
              }
            </div>
        }
        <div>
          <Input value={this.state.input} onChange={this.handleChange} />
          <div>
            <Button onClick={this.sendMessage}>发送</Button>
            <Button onClick={this.changeVideo}>{isVideo ? '文本' : '视频'}</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ user, chat, video }) => ({
  user,
  chat,
}))(Chat)
