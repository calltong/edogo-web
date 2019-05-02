import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Loading } from '../../../components/loading'
import Completed from '../../../components/Completed'
import NotFound from '../../../components/NotFound'
import Content from './content'

export class CodePassword extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let id = this.props.match.params.id
    let code = this.props.match.params.code
    await this.props.setting.checkMemberCode({ id, code })

    this.setState({ loading: false })
  }

  render() {
    let md = { size: 6, offset: 3 }
    let data = this.props.setting.toJS().check.member
    console.log('member:', data)
    let page = (<p>Please waiting</p>)
    switch (data.mode) {
      case 'check':
        if (data.status === 'completed') page = (<Content {...this.props.match.params} />)
        else if (data.status === 'error') page = (<NotFound title="Not Found your account" />)
        break;
      case 'save':
        if (data.status === 'completed') page = (<Completed title="Save Password" />)
        else page = (<Content />)
        break;
      default:

    }

    return (
      <div>
        <Loading dialog loading={this.state.loading} />
        <Row>
          <Col md={md} sm="12" xs="12">
            {page}
          </Col>
        </Row>
      </div>
    )
  }
}

export default inject('setting')(observer(CodePassword))
