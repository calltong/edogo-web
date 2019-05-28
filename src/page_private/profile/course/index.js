import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Container, Row, Col } from 'reactstrap'

import { SaveBtn } from '../../../components/button'
import { Loading } from '../../../components/loading'
import SomeError from '../../../components/SomeError'

import ProfileView from '../ProfileView'
import CourseList from './list'

export class Course extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
    }

    this.onLoad = this.onLoad.bind(this)
  }

  async componentDidMount() {
    this.onLoad()
  }

  async onLoad() {
    try {
      this.setState({ loading: true, status: '' })
      await this.props.course.getList()
      this.setState({ loading: false })
    } catch(e) {
      this.setState({ loading: false, status: 'fail_load', message: e.message })
    }
  }

  render() {
    let { loading, status, message } = this.state
    let content
    if (status === 'fail_load') {
      content = <SomeError message={message} onRetry={this.onLoad} />
    } else {
      content = <CourseList />
    }

    return (
      <ProfileView title="My Course">
        <Container>
          <Loading dialog loading={loading} />
          <Row>
            <Col md="12">
              <label>Course List</label>
            </Col>
          </Row>
          <hr />
          {content}
        </Container>
      </ProfileView>
    )
  }
}

export default inject('course')(observer(Course))
