import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import engineer from '../../../assets/img/engineer.jpg'

export default class Content extends Component {
  render() {
    let { item } = this.props
    let { detail, member } = item

    let css = {
      backgroundImage: `url(${engineer})`,
    }

    let pLink = `../profile/${item._id}`

    return (
      <Section className="lay-bc-course">
        <TitleImage style={css} />

        <Link to={pLink}>
          <Image alt="" src={detail.image} />
        </Link>

        <UserItem>
          <UserTitle>
            <Link className="link" to="">{detail.name}</Link>
          </UserTitle>
          <UserName>
            <Link className="link" to={pLink}>{detail.name}</Link>
          </UserName>
        </UserItem>
      </Section>
    )
  }
}

const Section = styled.div`
  border: 1px solid #E4E5E4;
  border-radius: 5px;
  text-align: center;
  min-height: 310px;
`

const TitleImage = styled.div`
  height: 140px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Image = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 49%;
  margin: -38px auto 0px;
  text-align: center;
`

const UserItem = styled.div`
  padding: 10px;
`

const UserTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`

const UserName = styled.div`
  font-size: 12px;
  text-align: left;
`
