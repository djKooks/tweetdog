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

  keyForBarChart(org) {
    let barData = []
    Object.entries(org).forEach(el => {
      barData.push(el[0])
    })

    return barData
  }

  render() {
    const { data } = this.props

    if (!data) {
      return <div></div>
    }

    const barKey = this.keyForBarChart(data.data)
    return <div><BarChart barKey={barKey} barData={[data.data]} /></div>
  }
}

PopularUsers.propTypes = {
  data: PropTypes.array,
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
