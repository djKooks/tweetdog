<template>
  <div class="list-item">
    {{ msg }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ListItem extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-item {
  border-radius: 4px;
  margin: 5px;
  background-color: #ffffff;
}
</style>
