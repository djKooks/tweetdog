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
    this.timer = setInterval(() =>
      dispatch(fetchRecentTweetsWhenAvailable()), 4000
    );
  }

  componentWillUnmount() {
    this.timer = null
  }

  render() {
    const { data } = this.props
    if (!data) {
      return <div></div>
    }
    console.log(data)

    return (
      <div>
        {
          data.map(tweet => {
            return <ListItem key={tweet.id} date={tweet.created_date} msg={tweet.tweet_text} />
          })
        }
      </div>
    )
  }
}

RecentTweets.propTypes = {
  data: PropTypes.array,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { recentTweetsState } = state
  const {
    isFetching,
    data
  } = recentTweetsState || {
    isFetching: true,
    data: []
  }

  return {
    data,
    isFetching
  }
}

export default connect(mapStateToProps)(RecentTweets)
