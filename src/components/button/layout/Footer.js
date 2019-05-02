import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

export default class Footer extends Component {
  render() {
    let padding = { padding: 'auto' }
    return (
      <div style={{marginTop: '10px'}}>
        <Container style={padding}>
          <Row style={padding}>
            <Col
              md={{size: 2, offset: 10}}
              sm={{size: 4, offset: 8}}
              xs={{size: 5, offset: 7}}
              style={padding}>
              {this.props.children}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
