import Notify from './Notify';
import ServiceAdmin from './ServiceAdmin';
import Connection from './util/connection';
//import { sleep } from './util/common';
import config from './config';
/*
Status:
- connected
- connecting
- closed

User:
- new
- remove
- Update
*/
let counter = 1;

export default class GoLiveAdmin {
  constructor(group, uid) {
    this.group = group;
    this.uid = uid !== undefined ? uid : `GO${counter++}`;

    this.users = new Map();
    this.service = new ServiceAdmin(group, uid, config.api.service);
    this.notify = new Notify(uid, config.api.notify);
    this.notify.onConnected = this.onNotifyConnected.bind(this);
    this.notify.onNotify = this.onNotifyEvent.bind(this);
  }

  // public function
  async connect() {
    if (this.notify.status === 'connected') {
      return true;
    } else if (this.notify.status === 'connecting') {
      return false;
    }

    let result = await this.notify.connect();
    if (!result) {
      return false;
    }

    return await this.service.register();
  }

  disconnect() {

  }

  send(user_id, data) {
    let user = this.users.get(user_id);
    if (user === undefined) {
      console.log('unknow user ', user_id);
      this.notifyError('sending', 'unknow user ' + user_id);
      return;
    }

    if (user.status !== 'connected') {
      console.log('connection is closed on user ', user_id);
      this.notifyError('sending', 'connection is closed on user ', user_id);
      return;
    }

    let item = {
      owner: 'admin',
      created_at: Date.now(),
      data,
    };

    this.notifySent(user_id, item);
    let message = JSON.stringify(item);

    user.channel.send(message);
    console.log('Sent msg: ' + item);
  }

  userStatusChange(status, tag) {
    let data = this.users.get(tag.user_id);
    if (data) {
      data.status = status;
      this.notifyUser('update', data.user_id, '', status);
    }
  }

  // Event Update function
  notifySent(user_id, data) {
    console.log(user_id, ' sent msg: ' + data);
    if (this.onSent) {
      this.onSent(user_id, data);
    }
  }

  notifyReceive(val, tag) {
    let data = JSON.parse(val);
    console.log('Receive msg: ' + data);
    if (this.onReceived) {
      this.onReceived(tag.user_id, data);
    }
  }

  notifyStatus(status, msg) {
    this.status = status;
    if (this.onConnected) {
      this.onConnected({status, message: msg});
    }
  }

  notifyError(type, value) {
    if (this.onError) {
      let item = {
        type: type,
        value: value,
      }
      this.onError(item);
    }
  }

  notifyUser(type, user_id, name, status) {
    if (this.onUser) {
      let data = {
        user_id,
        name,
        status,
      };
      this.onUser({type, data});
    }
  }

  // Event
  onNotifyConnected(status) {
    console.log('status:', status);
  }

  onNotifyEvent(msg) {
    console.log('event:', msg);
    switch (msg.type) {
      case 'add user':
        this.handleNewUser(msg);
        break;
      default:
    }
  }

  // support event function
  async handleNewUser(msg) {
    console.log('msg:', msg);
    let data = msg.data;
    let net = data.user.net;
    let tag = {
      user_id: data.user.id,
    };
    let channel = new Connection(`u-${data.user.id}`, tag);
    channel.onReceived = this.notifyReceive.bind(this);
    channel.onStatus = this.userStatusChange.bind(this);
    let answer = await channel.acceptConnection(net.network, net.candidate);
    let user = {
      session_id: data._id,
      group_code: data.group_code,
      user_id: data.user.id,
      name: data.user.name,
      status: 'connecting',
      channel,
    };
    this.users.set(data.user.id, user);
    let session = {
      _id: data._id,
      admin: {
        net: {
          network: answer.local_network,
          candidate: answer.candidate,
        }
      },
    };
    await this.service.answerUser(data.user.id, session);
  }
}
