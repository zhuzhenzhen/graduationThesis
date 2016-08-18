<template>
  <div class="center editList list">
    <p>资源名称: &nbsp;&nbsp;
      <input type="text" v-model="title" />
    </p>
    <p>资源链接: &nbsp;&nbsp;
      <input type="text" v-model="url" />
    </p>
    <p>资源图片: &nbsp;&nbsp;
      <input type="text" v-model="img" />
    </p>
    <p>资源简介: &nbsp;&nbsp;
      <input type="text" v-model="comment" />
    </p>
    <p>资源类型: &nbsp;&nbsp;
      <input type="text" v-model="type" />
    </p>
    <p>资源点赞数: &nbsp;&nbsp;
      <input type="text" value={{good}} readonly="true" />
      <span @click="Dgood">查看详情</span>
      <ul>
        <li v-for="go in goods">{{go.name}}</li>
      </ul>
    </p>
    <p>资源收藏数: &nbsp;&nbsp;
      <input type="text" value={{collect}} readonly="true" />
      <span @click="Dcollect">查看详情</span>
      <ul>
        <li v-for="coll in collects">{{coll.name}}</li>
      </ul>
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
      comment: '',
      type: '',
      good: '0',
      collect: '0',
      collects: [],
      goods: [],
      Ytitle: this.$route.params.title
    }
  },
  ready () {
    $.init()
    if (this.$route.params.type !== '新增数据') {
      this.getGameLinks()
    }
  },
  methods: {
    getGameLinks (params) {
      this.$http.get('/math/gameLinks', params).then(function(response) {
        var ret = this.$route.params.type === 'primary' ? response.data.primaryLinks[0] : response.data.midLinks[0]
        this.title = ret.title
        this.url = ret.url
        this.img = ret.img
        this.comment = ret.comment
        this.type = ret.type,
        this.good = ret.good,
        this.collect = ret.collect
      })
    },
    edit(doc, event) {
      this.close = true
      var data = {
        Ytitle:this.Ytitle,
        docs:doc,
        title: this.title,
        url: this.url,
        img: this.img,
        comment: this.comment,
        type: this.type,
        good: this.good,
        collect: this.collect
      }
      this.$http.post('/math/editLink', data).then(function(response) {
        this.$route.router.go(`/centerList/${this.type}`)
      })
    },
    Dgood() {
      var query = {title:this.Ytitle}
      this.$http.get('/math/good', query).then(function(response) {
        this.goods = response.data
      })
    },
    Dcollect() {
      var query = {title:this.Ytitle}
      this.$http.get('/math/collect', query).then(function(response) {
        this.collects = response.data
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
  div p span {
    cursor: pointer;
  }
</style>
