import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import PrivateApp from './PrivateApp'

import MainLayout from './components/main'
import Home from './page_public/home'
import Profile from './page_public/profile'
import TermsUse from './page_public/support/terms'
import PrivacyPolicy from './page_public/support/privacy'

import ConfirmRegister from './page_public/verify/register'
import ConfirmPassword from './page_public/verify/password'
import ResetPassword from './page_public/reset/password'
import SigninPage from './page_public/signin/page'

import SearchPage from './page_public/search'

export default class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <MainLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/terms" component={TermsUse} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route exact path="/login" component={SigninPage} />

        <Route exact path="/reset/password" component={ResetPassword} />
        <Route exact path="/verify/register/:id/:code" component={ConfirmRegister} />
        <Route exact path="/verify/password/:id/:code" component={ConfirmPassword} />

        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/profile/:id" component={Profile} />

        <Route path="/pv" component={PrivateApp} />
      </MainLayout>
    )
  }
}
