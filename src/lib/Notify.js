import TcpConnection from './util/tcp';
import { sleep } from './util/common';

export default class Notify {
  constructor(uid, url) {
    //this.group = group;
    this.uid = uid !== undefined ? uid : `GO-unknow`;
    this.status = 'closed';
    this.tcp = new TcpConnection(url);
    this.tcp.onStatusChanged = this.tcpStatusChanged.bind(this);
    this.tcp.onReceived = this.tcpReceived.bind(this);

  }

  async waitResponse(status) {
    for(let i=0; i < 20; i++) {
      if (this.status === status) {
        return true;
      } else {
        await sleep(1000);
      }
    }

    return false;
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
        return await this.waitResponse('connected');
      } else {
        await sleep(1500);
      }
    }

    return false;
  }

  async disconnect() {
    if (this.tcp.isConnected()) {
      this.reqUnregister();
      return await this.waitResponse('closed');
    }

    return true;
  }

  // API function
  reqRegister() {
    if (this.tcp.isConnected()) {
      let data = {
        method: 'request',
        type: 'register',
        data: {
          //group_code: this.group,
          id: this.uid,
        },
      };
      this.tcp.send(data);
    }
  }

  async resRegister(msg) {
    if (msg.status === 200) {
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
          //group_code: this.group,
          id: this.uid,
        },
      };
      this.tcp.send(data);
      this.tcp.disconnect();
    }
  }

  resUnregister(msg) {
    if (msg.status === 200) {
      this.notifyStatus('closed');
    }
  }

  tcpReceived(msg) {
    if (msg.method === 'request') {
      this.notifyEvent(msg)
    } else if (msg.method === 'response') {
      switch (msg.type) {
        case 'register':
          this.resRegister(msg)
          break;
        case 'unregister':
          this.resUnregister(msg)
          break;
        default:
      }
    }
  }

  tcpStatusChanged(evt) {
    console.log('tcp status:', evt.status, evt.message);
    if (evt.status === 'close') this.notifyStatus('closed', evt.message);
  }

  notifyStatus(status, msg) {
    this.status = status;
    if (this.onConnected) {
      this.onConnected({status, message: msg});
    }
  }

  notifyEvent(message) {
    if (this.onNotify) {
      this.onNotify(message);
    }
  }
}
