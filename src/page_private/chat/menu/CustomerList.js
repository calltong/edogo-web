import React from 'react';
import {observer, inject} from 'mobx-react';

class CustomerList extends React.Component {
  onSelect(id) {
    //this.props.live.setActiveUser(id);
  }

  display(item) {
    if (item.length > 12) {
      return item.slice(0, 12) + '...';
    } else {
      return item;
    }
  }

  render() {
    let chat = this.props.chat.toJS();
    let id = chat.active.user_id;

    let customers = chat.users.map((item, index) => {
      console.log('item:', item);
      let data = item.data;
      let active = data.user_id === id ? 'active' : '';
      let online;
      let displayRigth;
      switch (data.status) {
        case 'connected':
          online = 'online';
          break;
        case 'connecting':
          online = 'offline';
          displayRigth = (<div className="vis-cus-loader" />);
          break;
        default:
          online = 'offline';
      }

      if (displayRigth === undefined && data.unread > 0) {
        displayRigth = (<div className="vis-cus-unread">{data.unread}</div>);
      }

      return (
        <div
          onClick={this.onSelect.bind(this, data.user_id)}
          className={`visitor-item ${active}`} key={index}>
          <div className="title">
            <div className={online}><i className="fa fa-circle" /></div>
            <div className="name">{this.display(data.user_id)}</div>
            {displayRigth}
          </div>
        </div>
      );
    });

    return (
      <div className="vis-customer-list">
        {customers}
      </div>
    );
  }
}

export default inject('chat')(observer(CustomerList));
