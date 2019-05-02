import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
// import _ from 'lodash'
import moment from 'moment'

import { timer } from '../../../../utils/timer'
import Menu from './menu'
import { MethodType } from '../../../../service/whiteboard'

const EVENTS = {
  image: 'image',
  line: 'line',
  clear: 'clear',
}

export class Whiteboard extends Component {
  constructor(props) {
    super(props)
    this.started = false
    this.isDown = false

    this.state = {
      events: {
        index: -1,
        list: [],
      },
      setting: {
        tools: 'pen',
        color: 'black',
        size: 1,
      },
    }

    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize, false);
  }

  async init() {
    this.work = this.refs.work

    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext('2d')
    await this.onResize()
    await this.clear()
    this.props.session.setRoomPage(this)
    window.addEventListener("resize", this.onResize, false);
  }

  async clear() {
    let w = this.canvas.width
    let h = this.canvas.height
    let ctx = this.ctx
    await ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'white'
    ctx.lineWidth = 1
    await ctx.fillRect(0, 0, w, h)
  }

  async setSetting({ data }) {
    let ctx = this.ctx

    if (data) {
      ctx.strokeStyle = data.color
      ctx.lineWidth = data.size
    }
  }

  async writeImage({ data }) {
    let me = this
    let image = new Image()
    image.src = data
    image.onload = function() {
      // access image size here
      me.ctx.drawImage(image, 0, 0)
    }
  }

  async writeLine({ data, font }) {
    let ctx = this.ctx
    this.setSetting({ data: font })
    if (data.start) {
      await ctx.beginPath()
      let point = data.start
      await ctx.moveTo(point.x, point.y)
    }

    if (data.list && data.list.length > 0) {
      for (let point of data.list) {
        await ctx.lineTo(point.x, point.y)
  			await ctx.stroke()
      }
    }

    if (data.end)	await ctx.closePath()
  }

  async repaint({index = 0, count = 0, list = []}) {
    this.clear()
    for (let i = index; i <= count; i++) {
      let item = list[i]
      switch (item.type) {
        case EVENTS.image:
          await this.writeImage({data: item.data})
          break
        case EVENTS.line:
          await this.writeLine({data: item.data, font: item.setting })
          break
        default:
          this.clear()
      }
    }
  }

  addEvent({ type, data, setting }) {
    let { events } = this.state
    let index = events.index + 1
    let len = events.list.length

    if (index !== len) {
      events.list.splice(index, len - index)
    }
    events.list.push({type, data, setting})
    events.index = index

    this.setState({ events })
  }

  async processMenu({ type, data }) {
    let { events } = this.state
    switch (type) {
      case MethodType.menu.clear:
        this.clear()
        this.addEvent({type: EVENTS.clear})
        break
      case MethodType.menu.undo:
        let count = events.index - 1
        events.index = count
        await this.setState({ events })
        this.repaint({ index: 0, count, list: events.list })
        break
      case MethodType.menu.redo:
        if (events.index + 1 !== events.list.length ) {
          let count = events.index + 1
          events.index = count
          await this.setState({ events })
          this.repaint({ index: 0, count, list: events.list })
        }
        break
      case MethodType.menu.setting:
        //this.setting = data
        this.setState({setting: data})
        break
      default:
    }
    console.log(type, 'menu')
  }

  processImage({ type, data }) {
    this.writeImage({ data })
    this.addEvent({ type: EVENTS.image, data })
  }

  processLine({ type, data }) {
    switch (type) {
      case MethodType.line.start:
      let setting = this.state.setting
      let start = data
        this.line = {
          start,
          list: [],
          end: {},
          setting: {
            color: setting.color,
            size: setting.size,
          },
        }
        this.writeLine({data: { start }, font: this.line.setting})
        this.isDown = true
        break
      case MethodType.line.drawing:
        for (let point of data.list) this.line.list.push(point)
        this.writeLine({ data })
        break
      case MethodType.line.end:
        if (this.isDown === true) {
          this.writeLine({ data: { end: {} }})
          this.addEvent({type: EVENTS.line, data: this.line, setting: this.line.setting})
        }
        this.isDown = false
        break
      default:
    }
  }

  onResize() {
    let height = window.innerHeight - 200
    this.canvas.width = this.work.offsetWidth
	  this.canvas.height = height
    /*
    console.log('onResize')
    console.log('win width:', window.innerWidth, ' height:', window.innerHeight)
    console.log('work width:', this.work.offsetWidth, ' height:', this.work.offsetHeight)
    console.log('width:', this.canvas.width, ' height:', this.canvas.height)
    console.log('end')
    */
  }

  onSetting(data) {
    let type = MethodType.menu.setting
    this.processMenu({ type, data })
    this.props.session.notify({ type, data })

    // this.ctx.strokeStyle = this.setting.font.color
    // ctx.drawImage(img, 0, 0)
    // ctx.font = "40px Courier"
    // ctx.fillText(this.props.text, 210, 75)
  }

  onStartLine(e) {
		let canvasX = e.pageX - this.canvas.offsetLeft
		let canvasY = e.pageY - this.canvas.offsetTop
    let data = {x: canvasX, y: canvasY}

    let type = MethodType.line.start
    this.processLine({ type, data })
    this.props.session.notify({ type, data })
  }

  onDrawingLine(e) {
    if (this.isDown !== false) {
			let canvasX = e.pageX - this.canvas.offsetLeft
			let canvasY = e.pageY - this.canvas.offsetTop
      let point = {x: canvasX, y: canvasY}
      let data = { list: [point] }

      let type = MethodType.line.drawing
      this.processLine({ type, data })
      this.props.session.notify({ type, data })
		}
  }

  onEndLine(e) {
    let type = MethodType.line.end
    this.processLine({ type, data: {} })
    this.props.session.notify({ type, data: {} })
	}

  onMouseEnter(e) {
    if (this.outTime === undefined) return
    if (this.outTime.add(1, 'seconds') < moment()) {
      this.onEndLine()
    }
	}

  onMouseOut(e) {
    this.outTime = timer.get()
	}

  onSelectImage({ data }) {
    this.processImage({ data })

    let type = MethodType.image.selected
    this.props.session.notify({ type, data })
  }

  async onUndo() {
    let type = MethodType.menu.undo
    this.processMenu({ type })
    this.props.session.notify({ type })
  }

  async onRedo() {
    let type = MethodType.menu.redo
    this.processMenu({ type })
    this.props.session.notify({ type })
  }

  onReset() {
    let type = MethodType.menu.clear
    this.processMenu({ type })
    this.props.session.notify({ type })
  }

  async onSave() {
    const file = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

    let filename = `edogo-${timer.get().format('DDMMYY-hhmmss')}.png`
    let link = document.createElement('a')
    link.download = filename
    link.href = file
    link.click()
  }

  render() {
    let { events, setting } = this.state
    let len = events.list.length
    let index = events.index
    return (
      <div ref="work">
        <Menu
          setting={setting}
          onChange={this.onSetting.bind(this)}
          onSave={this.onSave.bind(this)}
          onImage={this.onSelectImage.bind(this)}
          onUndo={index < 0 ? undefined : this.onUndo.bind(this)}
          onRedo={index + 1 === len ? undefined : this.onRedo.bind(this)}
          onReset={index < 0 ? undefined : this.onReset.bind(this)} />
        <canvas
          ref="canvas"
          className="whiteboard"
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
          onMouseDown={this.onStartLine.bind(this)}
          onMouseMove={this.onDrawingLine.bind(this)}
          onMouseUp={this.onEndLine.bind(this)} />
      </div>
    )
  }
}

export default inject('session')(observer(Whiteboard))
