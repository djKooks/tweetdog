import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
// import { Chart } from 'react-google-charts'

import ListItem from '../components/ListItem'
// import StaticItem from '../components/StaticItem'

import './MainTable.css'

import { fetchRecentTweetsWhenAvailable } from '../actions'


class MainTable extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchRecentTweetsWhenAvailable())
  }

  render() {
    const { data } = this.props
    console.log(`fetch render: ${JSON.stringify(data)}`)
    return (
      <div class="home">
        <div class="tweet-list">
          <div class="title">
          </div>
          {/* <Transition timeout={500} /> */}
        </div>
        <div class="tweet-list">
          <ListItem date={123} msg={"text"} />
          <div class="no-content">
          </div>
        </div>
        <div class="tweet-list">
          <div class="no-content">
          </div>
        </div>
      </div>
    )
  }
}

MainTable.propTypes = {
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

export default connect(mapStateToProps)(MainTable)
