import { sleep } from './common';

/*
Status:
- connected
- connecting
- closed
*/
let counter = 1;
export default class Connection {
  constructor(name, tag) {
    this.name = name === undefined ? `ch${counter++}` : name;
    this.tag = tag;
    this.status = 'closed';
  }

  createChannel() {
    if (this.connection) {
      return;
    }
    let local = this;
    let servers = null;
    let pcConstraint = null;
    let dataConstraint = null;
    this.connection = new RTCPeerConnection(servers, pcConstraint);
    this.send_channel = this.connection.createDataChannel(this.name, dataConstraint);
    this.send_channel.onopen = this.stateChange.bind(this);
    this.send_channel.onclose = this.stateChange.bind(this);
    this.send_channel.onerror = this.stateChange.bind(this);
    this.connection.ondatachannel = this.receiveCallback.bind(this);

    this.connection.onicecandidate = function(e) {
      if (e.candidate !== null) {
        local.candidate = e.candidate.toJSON();
        console.log('ice candidate ready');
        //local.notifyNetwork();
      }
    };
  }

  setCandidate(data) {
    this.connection.addIceCandidate(new RTCIceCandidate(data)).then(
      function() {
        console.log('set Candidate Success');
      },
      function(err) {
        console.log('set Candidate Error:', err.toString());
      }
    );
  }

  setNetwork(network) {
    this.local_network = network;
    this.connection.setLocalDescription(new RTCSessionDescription(this.local_network));
  }

  setRemoteNetwork(network) {
    this.remote_network = network;
    this.connection.setRemoteDescription(new RTCSessionDescription(this.remote_network));
  }

  async waitNetwork() {
    for(let i=0; i < 20; i++) {
      if (this.local_network && this.candidate) {
        return {
          local_network: this.local_network,
          candidate: this.candidate,
        };
      } else {
        await sleep(1500);
      }
    }
    return undefined;
  }

  // public function
  async createConnection() {
    if (this.connection) {
      return undefined;
    }

    this.notifyStatus('connecting');
    this.createChannel();
    let local = this;
    this.connection.createOffer(function(data) {
      local.connection.setLocalDescription(data);
      local.local_network = data.toJSON();
      console.log(local.name + ':Offer Description:', local.local_network);
    }, function(err) {
      console.log(local.name + ':Failed offer to create description: ' + err.toString());
    });

    return await this.waitNetwork();
  }

  async acceptConnection(network, candidate) {
    if (this.connection) {
      return undefined;
    }

    this.notifyStatus('connecting');
    this.createChannel();
    this.remote_network = network;
    this.connection.setRemoteDescription(new RTCSessionDescription(this.remote_network));
    let local = this;
    this.connection.createAnswer().then(
      function(myNetwork) {
        local.connection.setLocalDescription(myNetwork);
        local.local_network = myNetwork.toJSON();
        local.setCandidate(candidate);
        console.log(local.name, ':Answer Description:', local.local_network);
      },
      function(err) {
        console.log(local.name, ':Failed answer to create description: ' + err.toString());
      }
    );

    return await this.waitNetwork();
  }

  close() {
    if (this.send_channel) {
      this.send_channel.close();
    }

    if (this.receive_channel) {
      this.receive_channel.close();
    }

    if (this.connection) {
      this.connection.close();
    }

    this.connection = undefined;
    this.send_channel = undefined;
    this.receive_channel = undefined;
    this.local_network = undefined;
    this.remote_network = undefined;
    this.candidate = undefined;

    this.notifyStatus('closed');
  }

  send(message) {
    if (this.status === 'connected') {
      this.send_channel.send(message);
    } else {
      console.log('Can not sent msg: status is ', this.status);
    }
  }

  // other function
  notifyStatus(status) {
    this.status = status;
    if (this.onStatus) {
      this.onStatus(status, this.tag);
    }
  }

  notifyNetwork() {
    if (this.onNetwork) {
      this.onNetwork({
        network: this.local_network,
        remote_network: this.remote_network,
        candidate: this.candidate,
      }, this.tag);
    }
  }

  stateChange() {
    let sendState;
    if (this.send_channel) {
      sendState = this.send_channel.readyState;
    }
    let recState;
    if (this.receive_channel) {
      recState = this.receive_channel.readyState;
    }
    console.log('Send channel state is: ' + sendState);
    console.log('Receive channel state is: ' + recState);
    if (sendState === 'open' && recState === 'open' && this.status !== 'connected') {
      this.notifyStatus('connected');
    } else if (this.status === 'connected') {
      this.notifyStatus('closed');
    }
  }

  receiveMessage(event) {
    if (this.onReceived) {
      this.onReceived(event.data, this.tag);
    }
  }

  receiveCallback(event) {
    this.receive_channel = event.channel;
    this.receive_channel.onmessage = this.receiveMessage.bind(this);
    this.receive_channel.onopen = this.stateChange.bind(this);
    this.receive_channel.onclose = this.stateChange.bind(this);
    this.receive_channel.onerror = this.stateChange.bind(this);
  }
}
