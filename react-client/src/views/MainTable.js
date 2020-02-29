import React from 'react'
import { Transition } from 'react-transition-group'
// import { Chart } from 'react-google-charts'

import ListItem from '../components/ListItem'
// import StaticItem from '../components/StaticItem'

import './MainTable.css'


export default class MainTable extends React.Component {

  render() {
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
