
export default class SessionBase {
  constructor({ tcp }) {
    this.tcp = tcp
  }

  async sendToSession({ data }) {
    try {
      if (this.tcp.isConnected()) {
        await this.tcp.send(data)
      }
    } catch (e) {
      console.log('send to session error:', e.message)
    }
  }
}
