import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LineChart from '../components/LineChart'

import { fetchRecentTweetsWhenAvailable } from '../actions'


class TweetCounts extends React.Component {

  componentWillMount() {
  }

  render() {
    return <div><LineChart /></div>
  }
}

/*
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

export default connect(mapStateToProps)(PopularUsers)
*/
export default TweetCounts

