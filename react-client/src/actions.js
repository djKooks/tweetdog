import axios from 'axios'

const API_PREFIX = 'http://localhost:5000/api'
const RECENT_TWEETS_REQUEST = API_PREFIX + '/recent-tweets'

export const REQUEST_RECENT_TWEETS = 'REQUEST_RECENT_TWEETS'
export const RECEIVE_RECENT_TWEETS = 'RECEIVE_RECENT_TWEETS'


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

export function fetchRecentTweets() {
  return dispatch => {
    dispatch(requestRecentTweets())
    
    return await axios
      .get(RECENT_TWEETS_REQUEST)
      .then(resp => {
        dispatch(receiveRecentTweets(resp.data))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

