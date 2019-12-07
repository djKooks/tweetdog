import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

interface State {
  message: string
  counter: number
}

const API_PREFIX: string = 'http://localhost:5000/api'
const RECENT_TWEETS_REQUEST: string = API_PREFIX + '/recent-tweets'
const TWEET_COUNT_REQUEST: string = API_PREFIX + '/tweets-count'
const WEEKLY_TWEET_REQUEST: string = API_PREFIX + '/weekly-static'
const TWEET_WORD_REQUEST: string = API_PREFIX + '/word-set'

export default new Vuex.Store({
  state: {
    count: 0,
    tweets: [],
    tweetDayCount: 0,
    tweetWeekCount: 0,
    weeklyTweet: {},
    tweetWords: {}
  },
  getters: {
    tweets(state) {
      return state.tweets
    },
    weeklyTweet(state) {
      return state.weeklyTweet
    },
    tweetDayCount(state) {
      return state.tweetDayCount
    },
    tweetWeekCount(state) {
      return state.tweetWeekCount
    }
  },
  mutations: {
    updateTweets(state, payload) {
      Vue.set(state, 'tweets', payload)
    },
    updateWeeklyStatic(state, payload) {
      Vue.set(state, 'weeklyTweet', payload)
    },
    updateTweetDayCount(state, payload) {
      Vue.set(state, 'tweetDayCount', payload)
    },
    updateTweetWeekCount(state, payload) {
      Vue.set(state, 'tweetWeekCount', payload)
    },
    
  },
  actions: {
    async getRecentTweets({ commit, state }) {
      await axios
        .get(RECENT_TWEETS_REQUEST)
        .then((resp) => {
          commit('updateTweets', resp.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    async getWeeklyStatic({ commit, state }) {
      await axios
        .get(WEEKLY_TWEET_REQUEST)
        .then((resp) => {
          console.log(`weekly-tweet: ${JSON.stringify(resp.data)}`)
          commit('updateWeeklyStatic', resp.data)
        })
        .catch((err) => {
          console.error(err)
        })
    },

    async getTweetsCount({commit, state}) {
      await axios
        .get(TWEET_COUNT_REQUEST, {
          params: {
            day: 1
          }
        })
        .then((resp) => {
          console.log(`tweet day: ${JSON.stringify(resp.data)}`)
          commit('updateTweetDayCount', resp.data.data)
        })
        .catch((err) => {
          console.error(err)
        })
    
    await axios
        .get(TWEET_COUNT_REQUEST, {
          params: {
            day: 7
          }
        })
        .then((resp) => {
          console.log(`tweet week: ${JSON.stringify(resp.data)}`)
          commit('updateTweetWeekCount', resp.data.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
})