import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'reactstrap'
import styled from 'styled-components'

import { CLoading } from '../../../components/loading'
import { Link } from '../../../components/link'

import Content from './Content'

export class PopularCourse extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      status: '',
      message: '',
    }
  }

  async componentDidMount() {
    this.onLoad()
  }

  onLoad = async () => {
    try {
      this.setState({ loading: true })
      await this.props.course.getPopularCourse()
    } catch(e) {

    }
    this.setState({ loading: false })
  }

  render() {
    let { loading } = this.state
    let doc = this.props.course.toJS()

    let list = doc.popular_course.map((item, index) => {
      console.log('course:', item)
      return (
        <Col md="3" key={index}>
          <Content item={item} />
        </Col>
      )
    })

    return (
      <Page>
        <Title>Popular <span>Courses</span></Title>
        <CLoading loading={loading}>
          <Row>
            {list}
          </Row>
        </CLoading>
      </Page>
    )
  }
}

const Page = styled.div`
  background-color: #F3FAFA;
`

const Title = styled.h4`
  padding: 20px 10px;
  font-weight: bold;
  span {
    font-weight: 300;
  }
`

const ContentMenu = styled.div`

`

const ContentMenuItem = styled.div`
  width: 100%;
  padding: 20px 0px;
`

export default inject('course')(observer(PopularCourse))
