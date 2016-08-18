<template>
  <div class="content">
    <v-broad></v-broad>
    <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;让我们一起快乐的学习数学吧~</h3>
    <v-resoucelist></v-resoucelist>
  </div>
</template>

<script>
  import VBroad from '../components/broad'
  import VResoucelist from '../components/resoucelist'
  module.exports = {
    components: {
      VBroad,
      VResoucelist
    }
  }
</script>
