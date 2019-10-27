<template>
  <div class="home">
    <div class="tweet-list">
      <ListItem v-for="tweet in this.tweets" :key="tweet.id" :msg="tweet.tweet_text" />
    </div>
    <div class="tweet-list">
      <ListItem msg="List" />
      <ListItem msg="List" />
      <ListItem msg="List" />
      <ListItem msg="List" />
      <ListItem msg="List" />
    </div>
    <div class="tweet-list">
      <div class="list-item">List</div>
      <div class="list-item">List</div>
      <div class="list-item">List</div>
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

  mounted() {
    console.log('mounted!')
    setInterval(() => {
      this.getRecentTweets()
      
      this.tweets.forEach((twt: any) => {
        console.log(twt)
      })
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
}
</style>
