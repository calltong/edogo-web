import React, {Component} from 'react';
import Number from './Number';
import Button from './Button';

export default class Spinner extends Component {
  render() {
    return (
      <div className="input-group">
        <span className="input-group-btn">
          <Button className="btn btn-default" onClick={this.props.onSpinDown}>
            <i className="fa fa-minus" />
          </Button>
        </span>
        <Number className="text-right" value={this.props.value} onChange={this.props.onChange} />
        <span className="input-group-btn">
          <Button className="btn btn-default" onClick={this.props.onSpinUp}>
            <i className="fa fa-plus" />
          </Button>
        </span>
      </div>
    );
  }
}
