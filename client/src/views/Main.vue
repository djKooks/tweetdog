<template>
  <div class="home">
    <div class="tweet-list">
      <ListItem msg="List" />
      <ListItem msg="List" />
      <ListItem msg="List" />
      <ListItem msg="List" />
      <ListItem msg="List" />
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
import { Component, Vue } from "vue-property-decorator";
import ListItem from "@/components/ListItem.vue"; // @ is an alias to /src

@Component({
  components: {
    ListItem
  }
})
export default class Main extends Vue {}
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
