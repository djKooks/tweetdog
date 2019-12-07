<template>
  <div class="home">
    <div class="tweet-list">
      <div class="title">
        Real-time Tweets
      </div>
      <transition-group name="update-list" tag="div">
        <ListItem
          v-for="tweet in this.tweets"
          :key="tweet.id"
          :msg="tweet.tweet_text"
          :date="tweet.created_date"
        />
      </transition-group>
    </div>
    <div class="tweet-list">
      <StaticItem 
        :day-count="this.tweetDayCount"
        :week-count="this.tweetWeekCount"
      />
      <div class="content">
        <div class="title">
          Tweets in last 7 days
        </div>
        <graph-bar
          class="week-chart"
          :height="400"
          :axis-reverse="true"
          :labels="weeklyData.keys"
          :values="weeklyData.values"
        >
          <!-- <note :text="'Bar Chart'"></note> -->
          <!-- <tooltip :names="graphKey" :position="'left'"></tooltip> -->
          <!-- <legends :names="graphKey" :filter="true"></legends> -->
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
            :wordClick="wordClickHandler">
          </wordcloud>
        </div>
      </div>
      <div class="no-content">
        // TODO
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";

import wordcloud from "vue-wordcloud";

import ListItem from "@/components/ListItem.vue"; 
import StaticItem from "@/components/StaticItem.vue";

interface WeeklyData {
  keys: any[];
  values: any[];
}

@Component({
  components: {
    ListItem,
    StaticItem,
    wordcloud
  }
})
export default class Main extends Vue {
  @Action("getRecentTweets") getRecentTweets: any;
  @Action("getWeeklyStatic") getWeeklyStatic: any;
  @Action("getTweetsCount") getTweetsCount: any;
  @Action("getWordSet") getWordSet: any;
  
  @Getter("tweets") tweets: any;
  @Getter("tweetWords") tweetWords: any;
  @Getter("weeklyTweet") weeklyTweet: any;
  @Getter("tweetDayCount") tweetDayCount: any;
  @Getter("tweetWeekCount") tweetWeekCount: any;

  graphKey = ["Tweet"];
  weeklyData: WeeklyData = {
    keys: [],
    values: []
  };

  wordCloud = {
    color: ['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef'],
    words: []
  }

  mounted() {
    setInterval(() => {
      this.getRecentTweets();
    }, 3000);

    setInterval(() => {
      this.getTweetsCount();
      this.getWeeklyStatic();

      this.weeklyData.keys = Object.keys(this.weeklyTweet);
      this.weeklyData.values = Object.values(this.weeklyTweet);
    }, 10000);

    setInterval(() => {
      this.getWordSet();
      this.wordCloud.words = this.tweetWords;
    }, 20000)

    
  }

  wordClickHandler() {
    
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
