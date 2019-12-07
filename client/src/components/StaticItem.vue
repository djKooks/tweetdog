<template>
  <div class="static-item">
    <div class="title">
      Tweet count
    </div>
    <div class="count">
      <span class="count-value">
        {{ this.dayCount }}
      </span>
       tweets per day
    </div>
    <div class="count">
      <span class="count-value">
        {{ this.weekCount }}
      </span>
       tweets per week
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StaticItem extends Vue {
  @Prop() private dayCount!: number;
  @Prop() private weekCount!: number;

  unit: string = ''

  mounted() {

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.static-item {
  border-radius: 4px;
  margin: 10px 5px;
  background-color: #ffffff;

  .title {
    padding: 10px 0;
    background-color: #00acee;
    font-weight: bold;
    color: #ffffff;
  }

  .count {
    padding: 10px;
    text-align: right;
    
    .count-value {
      font-size: 32px;
      color: #00acee;
    }
  }
}
</style>
