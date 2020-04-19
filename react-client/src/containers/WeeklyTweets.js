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

  dataToLineData(org) {
    let lineData = {
      id: "tweets",
      color: "hsl(72, 70%, 50%)",
      data: []
    }

    Object.entries(org).forEach(el => {
      lineData.data.push({
        x: el[0],
        y: el[1]
      })
    })

    return lineData
  }

  render() {
    const { data } = this.props
    if (!data) {
      return <div></div>
    }

    const lineData = this.dataToLineData(data.data)

    return <div><LineChart chartData={[lineData]} /></div>
  }
}

TweetCounts.propTypes = {
  data: PropTypes.array,
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

