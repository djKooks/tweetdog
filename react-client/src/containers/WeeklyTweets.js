import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LineChart from '../components/LineChart'

import { fetchWeeklyTweetsWhenAvailable } from '../actions'


class TweetCounts extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchWeeklyTweetsWhenAvailable())
  }

  render() {
    const { data } = this.props
    console.log(data)
    return <div><LineChart /></div>
  }
}

TweetCounts.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { weeklyTweetsState } = state
  const {
    isFetching,
    data
  } = weeklyTweetsState || {
    isFetching: true,
    data: []
  }

  return {
    data,
    isFetching
  }
}

export default connect(mapStateToProps)(TweetCounts)

