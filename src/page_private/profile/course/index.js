import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { SaveBtn } from '../../../components/button'
import { Loading } from '../../../components/loading'
import SomeError from '../../../components/SomeError'

import DataList from './list'
import DataDetail from './detail'

export class Course extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      error: '',
    }

    this.goToList = this.goToList.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onLoad = this.onLoad.bind(this)
  }

  async componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    this.setState({ loading: true })
    let res = await this.props.course.getList()
    let error = ''
    if (res.err) error = res.err

    this.setState({ loading: false, error })
  }

  async onSave() {
    this.setState({ loading: true })
    await this.props.course.save()
    this.setState({ loading: false })
  }

  goToList() {
    let doc = this.props.course.toJS().owner
    if (doc.mode === 'create' || doc.mode === 'edit') this.props.course.setMode('display')
  }

  render() {
    let { loading, error } = this.state
    let doc = this.props.course.toJS().owner
    let navigator
    let content
    if (error === '') {
      content = <DataDetail />
      if (doc.mode === 'create') {
        navigator = <span> -> Create Course</span>
      } else if (doc.mode === 'edit') {
        navigator = <span> -> Edit Course</span>
      } else {
        content = <DataList />
      }
    } else {
      content = <SomeError onRetry={this.onLoad} />
    }

    return (
      <Container>
        <Loading dialog loading={loading} />
        <Row>
          <Col md="12">
            <label onClick={this.goToList}>Course List</label> {navigator}
          </Col>
        </Row>
        <hr />
        {content}
      </Container>
    )
  }
}

export default inject('course')(observer(Course))
