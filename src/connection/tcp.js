
/*
this.connection.readyState
CONNECTING	 0	The connection is not yet open.
OPEN	       1	The connection is open and ready to communicate.
CLOSING	     2	The connection is in the process of closing.
CLOSED	     3	The connection is closed or couldn't be opened.
*/
export default class TcpConnection {
  isConnected() {
    return this.connection.readyState === 1
  }

  connect(url) {
    if (this.connection === undefined) {
      this.connection = new WebSocket(url, 'tcp')
      this.connection.onopen = this.notifyOpen.bind(this)
      this.connection.onclose = this.notifyClose.bind(this)
      this.connection.onerror = this.notifyError.bind(this)
      this.connection.onmessage = this.notifyReceive.bind(this)
    }
  }

  disconnect() {
    if (this.connection) {
      this.connection.close()
    }
    this.connection = undefined
  }

  notifyOpen() {
    this.notifyStatus('open')
  }

  notifyClose() {
    this.notifyStatus('close')
  }

  notifyError(error) {
    this.notifyStatus('error', error)
  }

  notifyStatus(status, message) {
    if (this.onStatusChanged) this.onStatusChanged({status, message})
  }

  notifyReceive(e) {
    if (this.onReceived) {
      let data = {}
      try {
        data = JSON.parse(e.data)
      } catch (e) {
        data = {}
      }
      this.onReceived(data)
    }
  }

  send(data) {
    if (this.connection.readyState !== 1) {
      this.notifyStatusChange('error', 'The Connection is closed')
    } else {
      let message = JSON.stringify(data)
      this.connection.send(message)
    }
  }
}
