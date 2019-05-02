import BaseStore from './BaseStore'
// import _ from 'lodash'
import { config } from '../config'
// import { resp } from '../utils/resp'
import Tcp from '../connection/tcp'
import Whiteboard from '../service/whiteboard'
import { helper } from '../utils/helper'

const Status = {
  Connected: 'Connected',
  Connecting: 'Connecting',
  Disconnected: 'Disconnected',
}

const RoomMenu = {
  whiteboard: 'whiteboard',
  editor: 'editor',
}

const SessionType = {
  room: 'room',
}

const MethodType = {
  menu: {
    selected: 'selected_menu',
  },
}

export class Session extends BaseStore {
  constructor() {
    super()
    this.observable({
      session: {
        id: '',
        user_id: '',
      },
      room: {
        menu: {
          selected: RoomMenu.whiteboard,
        },
      },
    })

    this.tcp = new Tcp()
    this.tcp.onStatusChanged = this.chTcpStatus.bind(this)
    this.tcp.onReceived = this.tcpReceived.bind(this)
  }

  initComponent({ tcp, component }) {
    let type = this.room.menu.selected.toString()
    console.log('type', type)
    switch (type) {
      case RoomMenu.whiteboard:
        this.controller = new Whiteboard({ tcp })
        this.controller.setComponent(component)
        break
      default:

    }
  }

  setRoomPage(component) {
    this.component = component
    console.log('setRoomPage')
    this.initComponent({ tcp: this.tcp, component: this.component })
  }

  async connect({ session_id, user_id }) {
    try {
      if (this.status === Status.Connected) {
        return true
      }

      this.status = Status.Connecting
      let url = `${config.tcp.connector}/tcp/session/${session_id}/${user_id}`
      this.tcp.connect(url)

      for (let i = 0; i < 20; i += 1) {
        if (this.status === Status.Connected) {
          return true
        }
        await helper.sleep(200)
      }
    } catch (e) {
    }

    this.status = Status.Disconnected
    this.tcp.disconnect()
    return false
  }

  async disconnect() {
    if (this.status === Status.Connected) this.tcp.disconnect()
    return true
  }

  chTcpStatus(evt) {
    switch (evt.status) {
      case 'open':
        this.status = Status.Connected
        break
      case 'close':
        this.status = Status.Disconnected
        break;
      default:
        this.status = evt.status
    }
  }

  tcpReceived(evt) {
    console.log('tcp received:', evt)
    let method = evt.method
    let data = evt.body.data
    if (evt.type === SessionType.room) {
      switch (method) {
        case MethodType.menu.selected:
          this.room.menu.selected = data
          break
        default:
      }
    } else {
      this.controller.received({ type: method, data })
    }
  }

  async connectSession({ session_id, user_id }) {
    this.session = {
      session_id,
      user_id,
    }
    let status = await this.connect({ session_id, user_id })
    this.initComponent({ tcp: this.tcp, component: this.component })
    return status
  }

  async sendToSession({ data }) {
    try {
      if (this.status === Status.Connected) {
        await this.tcp.send(data)
      }
    } catch (e) {
      console.log('send to session error:', e.message)
    }
  }

  async setRoomMenu({ data }) {
    this.room.menu.selected = data
    let content = {
      type: SessionType.room,
      method: MethodType.menu.selected,
      body: {
        data,
      }
    }
    await this.sendToSession({ data: content })
    this.initComponent({ tcp: this.tcp, component: this.component })
  }

  async notify({ type, data }) {
    console.log('notify:', this.controller !== undefined)
    if (this.controller) this.controller.notify({ type, data })
  }
}

export default new Session()
