import React from 'react'
import { Modal, ModalBody } from 'reactstrap'

export default class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {
      display: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  componentWillMount() {
    this.setState({ display: this.props.display || false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ display: nextProps.display })
  }

  show() {
    this.setState({ display: true });
  }

  close() {
    this.setState({ display: false });
  }

  toggle() {
    this.setState({ display: !this.state.display })
  }

  render() {
    return (
      <Modal isOpen={this.state.display} toggle={this.toggle} className={this.props.className}>
        <ModalBody>
          {this.props.children}
        </ModalBody>
      </Modal>
    );
  }
}
