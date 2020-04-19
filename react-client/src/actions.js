import axios from 'axios'

const API_PREFIX = 'http://localhost:5000/api'
const RECENT_TWEETS_REQUEST = API_PREFIX + '/recent-tweets'
const TWEET_COUNT_REQUEST = API_PREFIX + '/tweets-count'
const WEEKLY_TWEET_REQUEST = API_PREFIX + '/weekly-static'
const TWEET_WORD_REQUEST = API_PREFIX + '/word-set'
const POPULAR_USER_REQUEST = API_PREFIX + '/popular-user'

export const REQUEST_RECENT_TWEETS = 'REQUEST_RECENT_TWEETS'
export const RECEIVE_RECENT_TWEETS = 'RECEIVE_RECENT_TWEETS'

export const REQUEST_WEEKLY_TWEETS = 'REQUEST_WEEKLY_TWEETS'
export const RECEIVE_WEEKLY_TWEETS = 'RECEIVE_WEEKLY_TWEETS'

export const REQUEST_POPULAR_USERS = 'REQUEST_POPULAR_USERS'
export const RECEIVE_POPULAR_USERS = 'RECEIVE_POPULAR_USERS'


function requestRecentTweets() {
  return {
    type: REQUEST_RECENT_TWEETS
  }
}

function receiveRecentTweets(data) {
  return {
    type: RECEIVE_RECENT_TWEETS,
    data: data
  }
}

function requestWeeklyTweets() {
  return {
    type: REQUEST_WEEKLY_TWEETS
  }
}

function receiveWeeklyTweets(data) {
  return {
    type: RECEIVE_WEEKLY_TWEETS,
    data: data
  }
}

function requestPopularUsers() {
  return {
    type: REQUEST_POPULAR_USERS
  }
}

function receivePopularUsers(data) {
  return {
    type: RECEIVE_POPULAR_USERS,
    data: data
  }
}

function fetchRecentTweets() {
  return dispatch => {
    dispatch(requestRecentTweets())

    return axios
      .get(RECENT_TWEETS_REQUEST)
      .then(resp => {
        dispatch(receiveRecentTweets(resp.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

function fetchWeeklyTweets() {
  return dispatch => {
    dispatch(requestWeeklyTweets())

    return axios
      .get(WEEKLY_TWEET_REQUEST)
      .then(resp => {
        dispatch(receiveWeeklyTweets(resp.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function fetchPopularUsers() {
  return dispatch => {
    dispatch(requestPopularUsers())

    return axios
      .get(POPULAR_USER_REQUEST)
      .then(resp => {
        dispatch(receivePopularUsers(resp.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function fetchRecentTweetsWhenAvailable() {
  // TODO: check state for receive
  return (dispatch, getState) => {
    return dispatch(fetchRecentTweets())
  }
}

export function fetchWeeklyTweetsWhenAvailable() {
  return (dispatch, getState) => {
    return dispatch(fetchWeeklyTweets())
  }
}

export function fetchPopularUsersWhenAvailable() {
  return (dispatch, getState) => {
    return dispatch(fetchPopularUsers())
  }
}


