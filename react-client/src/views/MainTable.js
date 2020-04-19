import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

import RecentTweets from '../containers/RecentTweets'
import PopularUsers from '../containers/PopularUsers'
import WeeklyTweet from '../containers/WeeklyTweets'

import './MainTable.css'


class MainTable extends React.Component {
  componentDidMount() {
    // const { dispatch } = this.props
    // dispatch(fetchRecentTweetsWhenAvailable())
  }

  render() {
    return (
      <div class="home">
        <div class="tweet-list">
          <div class="title">
          </div>
          {/* <Transition timeout={500} /> */}
          <RecentTweets />
        </div>
        <div class="tweet-list">
          <PopularUsers />
          <WeeklyTweet />
        </div>
        <div class="tweet-list">
          <div class="no-content">
          </div>
        </div>
      </div>
    )
  }
}

export default MainTable
