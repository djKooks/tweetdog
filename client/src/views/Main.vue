<template>
  <div class="home">
    <div class="tweet-list">
      <div class="title">
        PayPay tweets
      </div>
      <ListItem v-for="tweet in this.tweets" :key="tweet.id" :msg="tweet.tweet_text" :date="tweet.created_date" />
    </div>
    <div class="tweet-list">
      <div class="title">
        PayPay tweets with '新宿'
      </div>
      <ListItem v-for="twk in this.tweetsWithKw" :key="twk.id" :msg="twk.tweet_text" :date="twk.created_date" />
    </div>
    <div class="tweet-list">
      Make something more...
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Action, Getter } from 'vuex-class'

import ListItem from "@/components/ListItem.vue"; // @ is an alias to /src

@Component({
  components: {
    ListItem
  }
})
export default class Main extends Vue {
  @Action('getRecentTweets') getRecentTweets: any
  @Getter('tweets') tweets: any
  @Getter('tweetsWithKw') tweetsWithKw: any

  mounted() {
    setInterval(() => {
      this.getRecentTweets()
    }, 3000)
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
}
</style>
