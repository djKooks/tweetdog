<template>
  <div class="home">
    <div class="tweet-list">
      <div class="title">
        Real-time Tweets
      </div>
      <transition-group name="update-list" tag="div">
        <list-item
          v-for="tweet in this.tweets"
          :key="tweet.id"
          :msg="tweet.tweet_text"
          :date="tweet.created_date"
        />
      </transition-group>
    </div>
    <div class="tweet-list">
      <static-item
        :day-count="this.tweetDayCount"
        :week-count="this.tweetWeekCount"
      />
      <div class="content">
        <div class="title">
          Tweets in last 7 days
        </div>
        <graph-bar
          class="week-chart"
          :height="300"
          :axis-reverse="true"
          :labels="weeklyData.keys"
          :values="weeklyData.values"
        >
          <tooltip :names="graphKey"></tooltip>
        </graph-bar>
      </div>
      <div class="content">
        <div class="title">
          Most tweeted users (~24H)
        </div>
        <graph-bar
          class="week-chart"
          :height="300"
          :padding-left="100"
          :axis-reverse="true"
          :labels="userData.keys"
          :values="userData.values"
        >
        </graph-bar>
      </div>
      <div class="no-content">
        // TODO
      </div>
    </div>
    <div class="tweet-list">
      <div class="content">
        <div class="title">
          Words on tweets / last 3 hour
        </div>
        <div>
          <wordcloud
            :data="wordCloud.words"
            nameKey="name"
            valueKey="value"
            :color="wordCloud.color"
            :wordClick="wordClickHandler"
          >
          </wordcloud>
        </div>
      </div>
      <div class="content">
        <div class="title">Tweet with keyword: {{ this.filterWord }}</div>
        <div>
          <transition-group name="update-list" tag="div">
            <list-item
              v-for="tweet in this.tweetsWithKeyword"
              :key="tweet.id"
              :msg="tweet.tweet_text"
              :date="tweet.created_date"
            />
          </transition-group>
        </div>
      </div>
      <div class="no-content">
        // TODO
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import wordcloud from 'vue-wordcloud'

import ListItem from '@/components/ListItem.vue'
import StaticItem from '@/components/StaticItem.vue'

interface ChartData {
  keys: any[]
  values: any[]
}

@Component({
  components: {
    ListItem,
    StaticItem,
    wordcloud,
  },
})
export default class Main extends Vue {
  @Action('getRecentTweets') getRecentTweets: any
  @Action('getTweetsByKeyword') getTweetsByKeyword: any
  @Action('getPopularUser') getPopularUser: any
  @Action('getWeeklyStatic') getWeeklyStatic: any
  @Action('getTweetsCount') getTweetsCount: any
  @Action('getWordSet') getWordSet: any

  @Getter('tweets') tweets: any
  @Getter('tweetsWithKeyword') tweetsWithKeyword: any
  @Getter('popularUsers') popularUsers: any
  @Getter('tweetWords') tweetWords: any
  @Getter('weeklyTweet') weeklyTweet: any
  @Getter('tweetDayCount') tweetDayCount: any
  @Getter('tweetWeekCount') tweetWeekCount: any

  graphKey = ['Tweet']
  weeklyData: ChartData = {
    keys: [],
    values: [],
  }

  userData: ChartData = {
    keys: [],
    values: [],
  }

  wordCloud = {
    color: ['#4c8bf5', '#2e7b71', '#e3adb2', 'green'],
    words: [],
  }

  filterWord = ''

  mounted() {
    setInterval(() => {
      this.getRecentTweets()
    }, 5000)

    setInterval(() => {
      this.getTweetsCount()
      this.getWeeklyStatic()
      this.weeklyData.keys = Object.keys(this.weeklyTweet)
      this.weeklyData.values = Object.values(this.weeklyTweet)
    }, 14000)

    setInterval(() => {
      this.getPopularUser()
      this.userData.keys = Object.keys(this.popularUsers)
      this.userData.values = Object.values(this.popularUsers)
    }, 9000)

    setInterval(() => {
      this.getWordSet()
      this.wordCloud.words = this.tweetWords
    }, 12000)
  }

  wordClickHandler(name: string, value: any, vm: any) {
    this.getTweetsByKeyword(name)
    this.filterWord = name
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  .tweet-list {
    margin: 0 10px;
    width: 30%;
    background-color: #eeeeee;
  }

  .title {
    padding: 10px 0;
    background-color: #00acee;
    font-weight: bold;
    color: #ffffff;
  }

  .update-list-move {
    transition: transform 1s;
  }

  .chart {
    margin: 10px;
  }

  .content {
    border-radius: 4px;
    margin: 10px 5px;
    background-color: #ffffff;
  }

  .no-content {
    margin: 20px;
    font-weight: 700;
  }
}
</style>
