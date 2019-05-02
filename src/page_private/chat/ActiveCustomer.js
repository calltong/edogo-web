import React from 'react';
import {observer, inject} from 'mobx-react';

export class ActiveCustomer extends React.Component {
  render() {
    //let main = this.props.live.toJS();
    return (
        <div className="card card-golive">
          <div className="card-header">
            Online Customer
          </div>
          <div className="card-body">
            <div className="online-customer live-online-customer">
            </div>
          </div>
        </div>
    );
  }
}

export default inject('live')(observer(ActiveCustomer));
