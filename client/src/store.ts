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
  },
  getters: {
    tweets(state) {
      return state.tweets
    },
  },
  mutations: {
    updateTweets(state, payload) {
      Vue.set(state, 'tweets', payload)
    }
  },
  actions: {
    async getRecentTweets({ commit, state }) {
      axios
        .get(RECENT_TWEETS_REQUEST)
        .then((resp) => {
          commit('updateTweets', resp.data)
        })
        .catch((err) => {
          console.error(err)
        })
      
    }
  }
})