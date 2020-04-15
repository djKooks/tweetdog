import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'

import ListItem from '../components/ListItem'

import './RecentTweets.css'

import { fetchRecentTweetsWhenAvailable } from '../actions'


class RecentTweets extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchRecentTweetsWhenAvailable())
  }

  render() {
    const { data } = this.props
    if (!data) {
      return <div></div>
    }

    return (
      <div>
        {
          data.map(tweet => {
            return <ListItem date={tweet.created_date} msg={tweet.tweet_text} />
          })
        }
      </div>
    )
  }
}

RecentTweets.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { fetchRecentTweets } = state
  const {
    isFetching,
    data
  } = fetchRecentTweets || {
    isFetching: true,
    data: []
  }

  return {
    data,
    isFetching
  }
}

export default connect(mapStateToProps)(RecentTweets)
