import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { Loading } from '../../../components/loading'
import NotFound from '../../../components/NotFound'

import Register from '../../register'

export class CodeSignup extends Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    await this.props.member.logout()

    let { id, code } = this.props.match.params

    let res = await this.props.register.checkRegister({ id, code })
    console.log('check register:', res)
    /*
    if (helper.isNull(res.err)) {
      this.setState({ counter: 5 })
      setTimeout(this.countDown, 1000)
    }
    */
    this.setState({ loading: false })
  }
  /*
  countDown() {
    try {
      let { counter } = this.state
      if (counter === 0) {
        let code = this.props.match.params.code
        this.props.history.push(`${REGISTER_LINK}/${code}`)
      } else {
        this.setState({ counter: counter - 1 })
        setTimeout(this.countDown, 1000)
      }
    } catch (e) {

    }
  }
  */

  render() {
    let md = { size: 6, offset: 3 }
    let data = this.props.register.toJS().checking
    let page
    switch (data.status) {
      case 'completed':
        md = { size: 12 }
        page = <Register />
        break
      case 'error':
        page = <NotFound title="Signup" detail={data.message} />
        break
      default:
        page = <div />
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

export default inject('member', 'register')(observer(CodeSignup))
