import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Switch, Route } from 'react-router-dom'

import General from './page_private/profile/general'
import Teacher from './page_private/profile/teacher'
import Course from './page_private/profile/course'
import CourseDetail from './page_private/profile/course/detail'
import Booking from './page_private/profile/booking'
import Payment from './page_private/profile/payment'
import Password from './page_private/profile/password'
import Invitation from './page_private/profile/invitation'


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
          <Route exact path="/pv/profile/general" component={General} />
          <Route exact path="/pv/profile/teacher" component={Teacher} />
          <Route exact path="/pv/profile/course" component={Course} />
          <Route exact path="/pv/profile/course/create" component={CourseDetail} />
          <Route exact path="/pv/profile/course/:id/edit" component={CourseDetail} />
          <Route exact path="/pv/profile/booking" component={Booking} />
          <Route exact path="/pv/profile/payment" component={Payment} />
          <Route exact path="/pv/profile/invitation" component={Invitation} />
          <Route exact path="/pv/profile/password" component={Password} />

          <Route exact path="/pv/room/:id" component={Room} />
          <Route exact path="/pv/messenger" component={Messenger} />
        </Switch>
      )
    }
  }
}

export default inject('member')(observer(PrivateApp));
