import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { CLoading } from '../../../components/loading'
import Course from './Course'

export class BrowseCourse extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: '',
      selected: undefined,
    }

    this.onLoad = this.onLoad.bind(this)
    this.onMenu = this.onMenu.bind(this)
  }

  async componentDidMount() {
    /*
    let res = await this.props.category.getList()

    if (res.err === undefined && res.data.length > 0) {
      let item = res.data[0]
      let id = item._id
      await this.setState({ selected: id })
      this.onLoad()
    }
    */
  }

  async onLoad() {
    /*
    let id = this.state.selected
    if (id) {
      this.setState({ loading: true })
      let res = await this.props.course.getList({ category: id })

      let error = ''
      if (res.err) error = res.err

      this.setState({ loading: false, error })
    }
    */
  }

  async onMenu(evt) {
    let name = evt.target.getAttribute('name')
    if (name) {
      await this.setState({ selected: name })
      this.onLoad()
    }
  }

  render() {
    let { loading, item_loading, selected } = this.state

    let doc = this.props.course.toJS()
    let owner = doc.owner

    let list = [] /*cate.list.map((item, index) => {
      let css = 'item'
      if (selected === item._id) css = 'item-active'

      return (
        <Col className="menu-item" md="2" key={index}>
          <div className={css} onClick={this.onMenu} name={item._id}>
            {item.name}
          </div>
        </Col>
      )
    })*/

    let conlist = []/* owner.list.map((item, index) => {
      return (
        <Col md="3" key={index}>
          <Course item={item} />
        </Col>
      )
    })*/

    return (
      <div className="app-content lay-bc">
        <h3 className="title">Popular <span>Courses</span></h3>
        <CLoading loading={false}>
          <Row className="lay-bc-menu">
            {list}
          </Row>

          <CLoading loading={loading}>
            <Row>
              {conlist}
            </Row>
          </CLoading>
        </CLoading>
      </div>
    )
  }
}

export default inject('course')(observer(BrowseCourse))
