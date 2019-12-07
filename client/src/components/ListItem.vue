<template>
  <div class="list-item">
    <div class="date">{{ date }}</div>
    <div class="message">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ListItem extends Vue {
  @Prop() private msg!: string;
  @Prop() private date!: string;
}
</script>

<style scoped lang="scss">
.list-item {
  border-radius: 4px;
  margin: 10px 5px;
  background-color: #ffffff;

  .date {
    border-bottom: 1px solid #aaaaaa;
  }

  .message {
    text-align: left;
  }
}
</style>
