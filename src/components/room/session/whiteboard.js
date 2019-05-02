import SessionBase from './base'

export const SessionType = 'room_whiteboard'
export const MethodType = {
  menu: {
    clear: 'clear',
    undo: 'undo',
    redo: 'redo',
    setting: 'setting',
  },
  line: {
    start: 'start_line',
    drawing: 'drawing_line',
    end: 'end_line',
  },
  image: {
    selected: 'selected_image',
  },
}

export default class Whiteboard extends SessionBase {
  constructor({ tcp, component }) {
    super({ tcp })
    this.session = SessionType
    this.method = MethodType
  }

  setComponent(val) {
    this.component = val
  }

  async notify({ type, data = { name: '' } }) {
    let content = {
      type: SessionType,
      method: type,
      body: {
        data,
      }
    }
    await super.sendToSession({ data: content })
  }

  async received({ type, data = { name: '' } }) {
    let component = this.component
    switch (type) {
      case MethodType.image.selected:
        component.processImage({type, data}, false)
        break
      case MethodType.menu.clear:
      case MethodType.menu.undo:
      case MethodType.menu.redo:
      case MethodType.menu.setting:
        component.processMenu({type, data}, false)
        break
      case MethodType.line.start:
      case MethodType.line.drawing:
      case MethodType.line.end:
        component.processLine({type, data}, false)
        break
      default:

    }
  }
}
