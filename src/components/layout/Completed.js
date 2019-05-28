import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Page, Title } from '../layout'

const text = { textAlign: 'center' }
export default class Completed extends Component {
  render() {
    let { title = '', gotoText = '', gotoLink } = this.props
    let content
    if (gotoLink) {
      content = (
        <p style={text}>
          {gotoText} <Link to={gotoLink}>Click Here</Link>
        </p>
      )
    }

    return (
      <Page>
        <Title>{title}</Title>
        <br />
        <p style={text}><i className="fas fa-check-circle layout-form-icon text-success" /></p>
        <br />
        {content}
      </Page>
    )
  }
}
