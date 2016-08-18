<template>
  <div class="center editList list">
    <p>资源名称: &nbsp;&nbsp;
      <input type="text" v-model="title" />
    </p>
    <p>资源链接: &nbsp;&nbsp;
      <input type="text" v-model="url" />
    </p>
    <p>资源点击次数: &nbsp;&nbsp;
      <input type="text" v-model="time" readonly="true" />
    </p>
    <p>资源类型: &nbsp;&nbsp;
      <input type="text" v-model="type" />
    </p>
    <a @click="edit('add', $event)" id={{title}}>保存
    </a>
    <!-- 弹出框 -->
    <v-modal :data="modal" v-if="close"></v-modal>
  </div>
</template>

<script>
  import $ from 'zepto'
  import Vmodal from '../components/modal'
  export default {
    data () {
    return {
      modal: '',
      close: true,
      isPrimary: true,
      searchQuery: '',
      title: '',
      img: '',
      url: '',
      type: '',
      time: '0'
    }
  },
  ready () {
    $.init()
    if (this.$route.params.type !== '新增数据') {
      this.getVedioLinks()
    }
  },
  methods: {
    getVedioLinks (params) {
      this.$http.get('/math/vedioLinks', params).then(function(response) {
        var ret = this.$route.params.type === 'primary' ? response.data.primaryVedios[0] : response.data.midVedios[0]
        this.title = ret.title
        this.url = ret.url
        this.type = ret.type,
        this.time = ret.time
      })
    },
    edit(doc, event) {
      this.close = true
      var data = {
        Ytitle:this.$route.params.title,
        docs:doc,
        title: this.title,
        url: this.url,
        time: this.time,
        type: this.type,
      }
      this.$http.post('/math/editVedio', data).then(function(response) {
        this.$route.router.go(`/vedioEdit/:title/${this.type}`)
      })
    }
  }
  }
</script>

<style>
  .editList {
    padding-top: 7rem;
    padding-left: 17rem;
  }
  .editList input {
    width: 50rem;
  }
</style>
