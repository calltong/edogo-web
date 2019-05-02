import React from 'react'

export default class Paginator extends React.Component {
  onPrev() {
    let { current } = this.props
    let page = current - 1 < 1 ? 1 : current - 1
    this.props.onUpdate(page)
  }

  onNext() {
    let { current, total } = this.props
    total = Math.ceil(total)
    let page = current + 1 > total ? total : current + 1
    this.props.onUpdate(page)
  }

  onJump(index) {
    this.props.onUpdate(index)
  }

  render() {
    let { current, total } = this.props
    total = Math.ceil(total)
    if (total > 0) {
      let list = []
      for (let index = 1; index <= total; index++) {
        list.push(
          <li
            key={index}
            className={`page-item ${index === current ? 'active' : ''}`}
            onClick={this.onJump.bind(this, index)}
          >
            <a className="page-link">{index}</a>
          </li>
        )
      }
      return (
        <nav>
          <ul className="pagination">
            <li className="page-item" onClick={this.onPrev.bind(this)}>
              <a className="page-link">&lt;</a>
            </li>
            {list}
            <li className="page-item" onClick={this.onNext.bind(this)}>
              <a className="page-link">&gt;</a>
            </li>
          </ul>
        </nav>
      )
    } else {
      return <div />
    }
  }
}
