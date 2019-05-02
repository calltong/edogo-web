import TcpConnection from './util/tcp';
import Connection from './util/connection';
import ServiceAdmin from './ServiceAdmin';
import { sleep } from './util/common';
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
    console.log('config:', config);
    this.group = group;
    this.uid = uid !== undefined ? uid : `GO${counter++}`;
    this.status = 'closed';
    this.tcp = new TcpConnection(config.api.notify);
    this.tcp.onStatusChanged = this.tcpStatusChanged.bind(this);
    this.tcp.onReceived = this.tcpReceived.bind(this);
    this.users = new Map();
    this.service = new ServiceAdmin(uid);
  }

  // public function

  async connect() {
    if (this.status !== 'closed') {
      return;
    }

    this.notifyStatus('connecting');
    this.tcp.connect();

    for(let i=0; i < 10; i++) {
      if (this.tcp.isConnected()) {
        this.reqRegister();
        break;
      } else {
        await sleep(1500);
      }
    }
  }

  disconnect() {
    this.reqUnregister();
  }

  send(user_id, data) {
    if (this.status !== 'connected') {
      console.log('connection is closed on user ', user_id);
      this.notifyError('sending', 'connection is closed on user ', user_id);
      return;
    }

    let user = this.users.get(user_id);
    if (user === undefined) {
      console.log('unknow user ', user_id);
      this.notifyError('sending', 'unknow user ' + user_id);
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

  // API function
  reqRegister() {
    if (this.tcp.isConnected()) {
      let data = {
        method: 'request',
        type: 'register',
        data: {
          group_code: this.group,
          id: this.uid,
        },
      };
      this.tcp.send(data);
    }
  }

  async handleResRegister(msg) {
    if (msg.status !== 200) {
      this.notifyStatus('closed', msg.message);
      return;
    }

    let result = await this.service.register();
    if (result.status === 200) {
      this.notifyStatus('connected');
    } else {
      this.notifyStatus('closed', msg.message);
    }
  }

  reqUnregister() {
    if (this.tcp.isConnected()) {
      let data = {
        method: 'request',
        type: 'unregister',
        data: {
          group_code: this.group,
          id: this.uid,
        },
      };
      this.tcp.send(data);
      this.tcp.disconnect();
    }
  }

  handleResUnregister(msg) {
    if (msg.status === 200) {
      this.notifyStatus('closed');
    }
  }

  handleReqNewUser(data) {
    let tag = {
      user_id: data.user_id,
    };
    let channel = new Connection(`u-${data.user_id}`, tag);
    channel.onNetwork = this.responseNewUser.bind(this);
    channel.onReceived = this.notifyReceive.bind(this);
    channel.onStatus = this.userStatusChange.bind(this);
    channel.acceptConnection(data.net_user.network, data.net_user.candidate);

    let user = {
      session_id: data.session_id,
      company: data.company,
      user_id: data.user_id,
      name: '',
      status: 'connecting',
      channel,
    };
    this.users.set(data.user_id, user);
    this.notifyUser('new', data.user_id, '', 'connecting');
  }

  responseNewUser(item, tag) {
    let user = this.users.get(tag.user_id);
    if (user) {
      let data = {
        method: 'response',
        type: 'newuser',
        data: {
          session_id: user.session_id,
          company: user.company,
          user_id: tag.user_id,
          net_admin: {
            network: item.network,
            candidate: item.candidate,
          },
        },
      };
      this.tcp.send(data);
    }
  }

  // other function
  tcpStatusChanged(evt) {
    console.log('tcp status:', evt.status, evt.message);
    if (evt.status === 'close') this.notifyStatus('closed', evt.message);
  }

  tcpReceived(msg) {
    if (msg.method === 'request') {
      /*
      switch (msg.type) {
        case 'newuser':
          this.handleReqNewUser(msg.data)
          break;
        case 'test':
          this.handleReqTest(msg)
          break;
        default:
      }
      */
    } else if (msg.method === 'response') {
      switch (msg.type) {
        case 'register':
          this.handleResRegister(msg)
          break;
        case 'unregister':
          this.handleResUnregister(msg)
          break;
        default:
      }
    }
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
}
