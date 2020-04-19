import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BarChart from '../components/BarChart'

import { fetchPopularUsers } from '../actions'


class PopularUsers extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchPopularUsers())
  }

  render() {
    const { data } = this.props
    console.log(data)
    return <div><BarChart /></div>
  }
}

PopularUsers.propTypes = {
  data: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { popularUsersState } = state
  const {
    isFetching,
    data
  } = popularUsersState || {
    isFetching: true,
    data: []
  }

  return {
    data,
    isFetching
  }
}

export default connect(mapStateToProps)(PopularUsers)
