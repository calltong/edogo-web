import React from 'react'
import {observer, inject} from 'mobx-react'
import moment from 'moment'

import user from '../../assets/image/user.jpg'
import admin from '../../assets/image/admin.jpg'

class ChatTitle extends React.Component {
  render() {
    let data = this.props.data;
    return (
      <div className="title">
        {data.data.user_id}
        <span>
          <i className="fa fa-video-camera" />
          <i className="fa fa-phone-square" />
        </span>
      </div>
    );
  }
}

class ChatDisplay extends React.Component {
  render() {
    let list = this.props.list.map((item, index) => {
      let display;
      switch (item.data.type) {
        case 'text':
          display = (<p>{item.data.value}</p>);
          break;
        default:
      }

      if (item.owner === 'user') {
        return (
          <li className="sent" key={index}>
            <div className="live-chat-line">
              <div className="img">
                <img src={user} alt="" />
              </div>
              <div className="item">
                {display}
                <span>{moment(item.created_at).format('h:mm a')}</span>
              </div>
            </div>
          </li>
        );
      } else {
        return (
          <li className="reply" key={index}>
            <div className="live-chat-line">
              <div className="item">
                <span>{moment(item.created_at).format('h:mm a')}</span>
                {display}
              </div>
              <div className="img">
                <img src={admin} alt="" />
              </div>
            </div>
          </li>
        );
      }
    });
    return (
      <div className="display">
        <ul>
          {list}
        </ul>
      </div>
    );
  }
}

export class ChatArea extends React.Component {
  componentDidMount() {

  }

  onInputEnter(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
      event.preventDefault();
    }
  }

  sendMessage() {
    let msg = this.refs.txtVal.value;
    this.props.live.sendMessage(msg);
    this.refs.txtVal.value = '';
  }

  choosePicture() {
    console.log('choosePicture')
  }

  chooseFile() {
    console.log('chooseFile')
  }

  render() {
    let live = this.props.live.toJS();
    let list = live.active.content_list;
    return (
      <div className="chat-area">
        <ChatTitle data={live.active} />
        <ChatDisplay list={list} />
        <div className="input">
          <div className="row">
            <div className="col-md-10 col-small-padding">
              <textarea
                ref='txtVal'
                rows={3}
                className="form-control chat-input"
                onKeyDown={this.onInputEnter.bind(this)} />
            </div>
            <div className="col-md-2 col-small-padding">
              <button
                className="btn btn-default btn-full-size btn-padding"
                onClick={this.sendMessage.bind(this)}>
                Send
              </button>
            </div>
          </div>
          <div className="live-tool">
            <i onClick={this.choosePicture.bind(this)} className="fa fa-comment-o" />
            <i onClick={this.choosePicture.bind(this)} className="fa fa-picture-o" />
            <i onClick={this.chooseFile.bind(this)} className="fa fa-file-text-o" />
          </div>
        </div>
      </div>
    );
  }
}

export default inject('live')(observer(ChatArea));
