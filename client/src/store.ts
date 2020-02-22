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
const POPULAR_USER_REQUEST: string = API_PREFIX + '/popular-user'

export default new Vuex.Store({
  state: {
    count: 0,
    tweets: [],
    tweetsWithKeyword: [],
    popularUsers: {},
    tweetDayCount: 0,
    tweetWeekCount: 0,
    weeklyTweet: {},
    tweetWords: [],
  },
  getters: {
    tweets(state) {
      return state.tweets
    },
    tweetsWithKeyword(state) {
      return state.tweetsWithKeyword
    },
    popularUsers(state) {
      return state.popularUsers
    },
    tweetWords(state) {
      return state.tweetWords
    },
    weeklyTweet(state) {
      return state.weeklyTweet
    },
    tweetDayCount(state) {
      return state.tweetDayCount
    },
    tweetWeekCount(state) {
      return state.tweetWeekCount
    },
  },
  mutations: {
    updateTweets(state, payload) {
      Vue.set(state, 'tweets', payload)
    },
    updateTweetsWithKeyword(state, payload) {
      Vue.set(state, 'tweetsWithKeyword', payload)
    },
    updatePopularUser(state, payload) {
      Vue.set(state, 'popularUsers', payload)
    },
    updateWordSet(state, payload) {
      Vue.set(state, 'tweetWords', payload)
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
        .then(resp => {
          commit('updateTweets', resp.data)
        })
        .catch(err => {
          console.error(err)
        })
    },

    async getPopularUser({ commit, state }) {
      await axios
        .get(POPULAR_USER_REQUEST)
        .then(resp => {
          commit('updatePopularUser', resp.data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },

    async getTweetsByKeyword({ commit, state }, keyword) {
      await axios
        .get(RECENT_TWEETS_REQUEST, {
          params: {
            keyword,
          },
        })
        .then(resp => {
          commit('updateTweetsWithKeyword', resp.data)
        })
        .catch(err => {
          console.error(err)
        })
    },

    async getWordSet({ commit, state }) {
      await axios
        .get(TWEET_WORD_REQUEST)
        .then(resp => {
          const words = []
          for (let [key, value] of Object.entries(resp.data.data)) {
            words.push({
              name: key,
              value,
            })
          }

          commit('updateWordSet', words)
        })
        .catch(err => {
          console.error(err)
        })
    },

    async getWeeklyStatic({ commit, state }) {
      await axios
        .get(WEEKLY_TWEET_REQUEST)
        .then(resp => {
          commit('updateWeeklyStatic', resp.data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },

    async getTweetsCount({ commit, state }) {
      await axios
        .get(TWEET_COUNT_REQUEST, {
          params: {
            day: 1,
          },
        })
        .then(resp => {
          commit('updateTweetDayCount', resp.data.data)
        })
        .catch(err => {
          console.error(err)
        })

      await axios
        .get(TWEET_COUNT_REQUEST, {
          params: {
            day: 7,
          },
        })
        .then(resp => {
          commit('updateTweetWeekCount', resp.data.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
})
