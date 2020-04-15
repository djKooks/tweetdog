import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BarChart from '../components/BarChart'

import { fetchRecentTweetsWhenAvailable } from '../actions'


class PopularUsers extends React.Component {

  componentWillMount() {
  }

  render() {
    return <div><BarChart /></div>
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
export default PopularUsers

