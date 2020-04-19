import { combineReducers } from 'redux'
import {
  REQUEST_RECENT_TWEETS,
  RECEIVE_RECENT_TWEETS,
  RECEIVE_WEEKLY_TWEETS,
  REQUEST_WEEKLY_TWEETS,
  REQUEST_POPULAR_USERS,
  RECEIVE_POPULAR_USERS
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

function tweetsCount(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_WEEKLY_TWEETS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_WEEKLY_TWEETS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data
      })
    default:
      return state
  }
}

function popularUsers(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_POPULAR_USERS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POPULAR_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data
      })
    default:
      return state
  }
}

function recentTweetsState(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RECENT_TWEETS:
    case REQUEST_RECENT_TWEETS:
      return Object.assign({}, state, tweets(state, action))

    default:
      return state
  }
}

function weeklyTweetsState(state = {}, action) {
  switch (action.type) {
    case REQUEST_WEEKLY_TWEETS:
    case RECEIVE_WEEKLY_TWEETS:
      return Object.assign({}, state, tweetsCount(state, action))

    default:
      return state
  }
}

function popularUsersState(state = {}, action) {
  switch (action.type) {
    case REQUEST_POPULAR_USERS:
    case RECEIVE_POPULAR_USERS:
      return Object.assign({}, state, popularUsers(state, action))

    default:
      return state
  }
}


const rootReducer = combineReducers({
  recentTweetsState,
  weeklyTweetsState,
  popularUsersState
})

export default rootReducer
