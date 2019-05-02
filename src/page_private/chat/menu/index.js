import React from 'react'
import {observer, inject} from 'mobx-react'
import { Row, Col } from 'reactstrap'

import { ConnectButton, StopButton } from '../../../components/forms/button'
import CustomerList from './CustomerList'

export class Menu extends React.Component {
  componentDidMount() {
  }

  connect() {
    let admin = this.props.admin.toJS().data;
    //this.props.live.connectServer(admin);
  }

  disconnect() {
    //this.props.live.disconnectServer();
  }

  connectUser() {
    //this.props.live.connectUser();
  }

  render() {
    let admin = this.props.admin.toJS();
    let btn;
    if (admin.connected) {
      btn = (
        <StopButton className="btn-fullsize" onClick={this.disconnect.bind(this)} />
      );
    } else {
      btn = (
        <ConnectButton className="btn-fullsize" onClick={this.connect.bind(this)} />
      );
    }

    return (
      <div className="chat-menu">
        <Row>
          <Col md="12">
            <img src={admin.profile.image} alt="" />
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {btn}
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <CustomerList />
          </Col>
        </Row>
      </div>
    );
  }
}

export default inject('admin')(observer(Menu));
