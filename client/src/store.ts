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

export default new Vuex.Store({
  state: {
    count: 0,
    tweets: [],
    tweetsWithKw: [],
  },
  getters: {
    tweets(state) {
      return state.tweets
    },
    tweetsWithKw(state) {
      return state.tweetsWithKw
    },
  },
  mutations: {
    updateTweets(state, payload) {
      Vue.set(state, 'tweets', payload)
    },
    updateTweetsWithKw(state, payload) {
      Vue.set(state, 'tweetsWithKw', payload)
    }
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

      await axios
        .get(RECENT_TWEETS_REQUEST, {
          params: {
            keyword: '新宿'
          }
        })
        .then((resp) => {
          commit('updateTweetsWithKw', resp.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
})