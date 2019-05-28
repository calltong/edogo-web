import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { helper } from '../../../utils/helper'

class Status extends Component {
  render() {
    let data = this.props.data

    let cssStatus = {
      fontSize: '18px',
      color: '#31ED62',
      marginLeft: '5px',
    }

    let cssMenu = {
      fontSize: '18px',
      position: 'absolute',
      right: '-5px',
      top: '5px',
    }
    return (
      <Row className="status">
        <Col md="1">
          <i className="fas fa-circle" style={cssStatus} />
        </Col>
        <Col md="9">
          {data.name}
        </Col>
        <Col md="1">
          <i className="fas fa-bars" style={cssMenu} />
        </Col>
      </Row>
    )
  }
}

export default class Person extends Component {
  constructor(props) {
    super(props)
    this.state = {
      constraints: {
        audio: false,
        video: true,
      },
      status: {
        audio: false,
        video: false,
      },
    }

    this.toggleCamera = this.toggleCamera.bind(this)
  }

  async componentDidMount() {
    /*
    try {
      let { constraints } = this.state
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const videoTracks = stream.getVideoTracks();
      console.log(`Using video device: ${videoTracks[0].label}`)

      const camera = this.refs.camera
      camera.srcObject = stream
    } catch (e) {
      console.log('fail open camera', e.message);
    }
    */
  }

  async getMedia({ video = false, audio = false }) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video, audio })
      const videoList = stream.getVideoTracks()
      const audioList = stream.getAudioTracks()

      const videoTrack = videoList[0]
      const audioTrack = audioList[0]
      // console.log(`Using video device: ${videoTrack.label}`)
      // console.log(`Using audio device: ${audioTrack.label}`)

      return { data: { stream, video: videoTrack, audio: audioTrack } }
    } catch (e) {
      console.log('fail open camera', e.message)
      return { err: e.message }
    }
  }

  async toggleCamera() {
    console.log('toggle camera')
    let { status } = this.state
    let isOn = status.video
    status.video = !status.video
    if (isOn) {
      this.video.stop()
      let camera = this.refs.camera
      camera.srcObject = undefined
    } else {
      let res = await this.getMedia(status)
      if (helper.notNull(res.err)) {
        return
      }

      let data = res.data
      this.video = data.video
      this.audio = data.audio
      this.stream = data.stream

      let camera = this.refs.camera
      camera.srcObject = this.stream
      console.log('get media', res)
    }

    this.setState({ status })
  }

  render() {
    let { status } = this.state
    // let data = this.props.data
    let css = {
      padding: '0px 2px',
    }
    return (
      <Section>
        <Status {...this.props} />
        <Row >
          <Col md="12">
            <video ref="camera" autoPlay playsInline style={{width: '100%'}} />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <i
              style={css}
              className={ status.video ? 'fas fa-video' : 'fas fa-video-slash'}
              onClick={this.toggleCamera} />
            <i style={css} className={ status.audio ? 'fas fa-microphone' : 'fas fa-microphone-slash'} />
            <i style={css} className={ status.audio ? 'fas fa-volume-up' : 'fas fa-volume-off'} />
          </Col>
        </Row>
      </Section>
    )
  }
}

const Section = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  background-color: white;
  padding: 0px 0px;
  margin-bottom: 10px;

  .status {
    padding: 10px 0px;
  }
`

const UserImg = styled.img`
  width: 100%;
  border-radius: 0px;
`

/*
export default class Person extends Component {
  render() {
    let data = this.props.data
    let css = {
      marginTop: '5px',
    }
    return (
      <div className="room-menu-person">
        <Status {...this.props} />
        <Row >
          <Col md="12">
            <UserImg src={data.img} />
          </Col>
        </Row>
        <Row style={css}>
          <Col md="12">--</Col>
        </Row>
      </div>
    )
  }
}
*/
