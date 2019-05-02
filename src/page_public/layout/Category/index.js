import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { CLoading } from '../../../components/loading'
import { Link } from '../../../components/link'

export class Category extends Component {
  constructor() {
    super()
    this.onLoad = this.onLoad.bind(this)
  }

  async componentDidMount() {
    // this.onLoad()
  }

  async onLoad() {
    // await this.props.category.getList()
  }

  render() {
    let doc = this.props.category.toJS()
    let status = doc.status

    let list = doc.list.map((item, index) => {
      return (
        <Col className="lay-cate-menu" md="2" key={index}>
          <Link className="menu-item" to="../">
            <i className="fas fa-american-sign-language-interpreting" />
            <br />
            {item.name}
          </Link>
        </Col>
      )
    })

    return (
      <div className="app-content lay-cate">
        <h3 className="title">Courses<span> by Category</span></h3>
        <CLoading loading={status.loading} error={status.err}>
          <Row>
            <Col className="lay-cate-menu" md="1" />
            {list}
          </Row>
        </CLoading>
      </div>
    )
  }
}

export default inject('category')(observer(Category))
