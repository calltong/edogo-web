import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import engineer from '../../../assets/img/engineer.jpg'

export default class Course extends Component {
  render() {
    let item = this.props.item
    let { detail, member } = item
    let { profile } = member

    let css = {
      backgroundImage: `url(${engineer})`,
    }

    let pLink = `../profile/${member._id}`

    return (
      <div className="lay-bc-course">
        <div className="title-img" style={css} />

        <Link to={pLink}>
          <img className="profile-img" alt="" src={profile.image} />
        </Link>

        <div className="content">
          <p className="title">
            <Link className="link" to="">{detail.name}</Link>
          </p>
          <p className="name">
            <Link className="link" to={pLink}>{profile.name}</Link>
          </p>
        </div>
      </div>
    )
  }
}
