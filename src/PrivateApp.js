import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Switch, Route } from 'react-router-dom'

import Profile from './page_private/profile'
import Messenger from './page_private/messenger'
import Room from './page_private/room'
import AuthRequired from './page_public/signin/AuthRequired'

export class PrivateApp extends Component {
  render() {
    if (this.props.member.isLogin() === false) {
      return (<Route exact component={AuthRequired} />)
    } else {
      return (
        <Switch>
          <Route exact path="/pv/member/:menu" component={Profile} />
          <Route exact path="/pv/room/:id" component={Room} />
          <Route exact path="/pv/messenger" component={Messenger} />
        </Switch>
      )
    }
  }
}

export default inject('member')(observer(PrivateApp));
