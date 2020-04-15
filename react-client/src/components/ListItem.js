import React from 'react'

import './ListItem.css'

const ListItem = (props) => {
  return (
    <div class="list-item">
      <div class="date">
        { props.date }
      </div>
      <div class="msg">
        { props.msg }
      </div>
    </div>
  )
}

export default ListItem
