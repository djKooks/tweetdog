import React from 'react'

import './ListItem.css'

export default class ListItem extends React.Component {

  render() {
    return (
      <div class="list-item">
        <div class="date">
          { this.props.date }
        </div>
        <div class="msg">
          { this.props.msg }
        </div>
      </div>
    )
  }
}