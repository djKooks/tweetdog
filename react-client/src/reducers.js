import { combineReducers } from 'redux'
import {
  REQUEST_RECENT_TWEETS, RECEIVE_RECENT_TWEETS
} from './actions'

function tweets(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_RECENT_TWEETS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_RECENT_TWEETS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data
      })
    default:
      return state
  }
}

function fetchRecentTweets(state = { }, action) {
  switch (action.type) {
    case RECEIVE_RECENT_TWEETS:
    case REQUEST_RECENT_TWEETS:
      return Object.assign({}, state, 
        tweets(state, action)
      )
    default:
      return state
  }
}

const rootReducer = combineReducers({
  fetchRecentTweets
})

export default rootReducer
