import React from 'react';
import {observer, inject} from 'mobx-react';

export class CustomerCamera extends React.Component {
  componentDidMount() {

  }

  render() {
    let main = this.props.live.toJS();
    return (
      <div>
        <div className="card card-golive">
          <div className="card-header">
            Customer Camera
          </div>
          <div className="card-body">

          </div>
        </div>
      </div>
    );
  }
}

export default inject('live')(observer(CustomerCamera));
