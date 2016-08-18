<template>
  <div v-if="close" class="modal">
    {{modal}}
    <div>
      <button @click="close">关闭</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['modal'],
  data() {
    return {
      close: false
    }
  },
  methods: {
    close() {
      this.close = true
    }
  }
}
</script>

<style>
  .modal {
    position: absolute;
    top: 20%;
    left: 40%;
    z-index: 100;
    background: #FFF;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 24rem;
    height: 4rem;
    display: block;
  }
</style>