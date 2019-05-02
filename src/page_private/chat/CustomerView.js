import React from 'react';
import {observer, inject} from 'mobx-react';

export class CustomerView extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="card card-golive">
          <div className="card-header">
            Customer View
          </div>
          <div className="card-body">
          </div>
        </div>
      </div>
    );
  }
}

export default inject('live')(observer(CustomerView));
