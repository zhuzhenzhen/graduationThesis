<template>
  <div class="game">
    <div class="btn-group">
      <button class="btn" id="primary" @click="primary">我是小学生</button>
      <button class="btn" id="mid" @click="mid">我是中学生</button>
      <span class="tip">（点击图片开始游戏～）</span>
    </div>
    <div class="gameDetail">
      <div v-if="isPrimary">
        <ul>
          <li v-for="link in primaryGameLinks">
            <a href={{link.url}}>
            <img src={{link.img}} alt="小学游戏">
            </a>
            <div class="detail">
              <div>游戏名称:{{link.title}}</div>
              <div @click="good({title:link.title, num:link.good,name:link.name})" title="为它点赞！">
                <span style="font-size: 3.2rem">👍</span>
                <span>{{link.good}}赞</span>
              </div>
              <div @click="collect({title:link.title, num:link.collect})" title="收藏！">
                <span style="font-size: 3.2rem">💗</span>
                <span>{{link.collect}}收藏</span>
              </div>
              <div>
                <span style="font-size: 3.2rem">🎮</span>
                <a v-link="{name: 'gameDetail', params: {title:link.title}, replace: false}">游戏详情</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="isMid">
        <ul>
          <li v-for="link in midGameLinks">
            <a href={{link.url}}>
            <img src={{link.img}} alt="中学游戏">
            </a>
            <div class="detail">
              <div>游戏名称:{{link.title}}</div>
              <div @click="good({title:link.title, num:link.good,name:link.name})" title="为它点赞！">
                <span style="font-size: 3.2rem">👍</span>
                <span>{{link.good}}赞</span>
              </div>
              <div @click="collect({title:link.title, num:link.collect})" title="收藏！">
                <span style="font-size: 3.2rem">💗</span>
                <span>{{link.collect}}收藏</span>
              </div>
              <div>
                <span style="font-size: 3.2rem">🎮</span>
                <a v-link="{name: 'gameDetail', params: {title:link.title}, replace: false}">游戏详情</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="isLoad" class="modal">
      {{modal}}
      <div class="close">
        <button @click="close">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'zepto'
  export default {
    ready () {
      $.init()
      var query = {}
      this.$http.get('/math/gameLinks', query).then(function(response) {
        var ret = response.data
        this.primaryGameLinks = ret.primaryLinks
        this.midGameLinks = ret.midLinks
      })
    },
    data () {
      return {
        isPrimary: true,
        isMid: false,
        isHigh: false,
        primaryGameLinks: [],
        midGameLinks: [],
        Dgood: [],
        alert: false,
        Dcollect: [],
        isLoad: false,
      }
    },
    methods: {
      close() {
        this.isLoad = false
      },
      primary () {
        this.isMid = false
        this.isHigh = false
        this.isPrimary = true
      },
      mid () {
        this.isPrimary = false
        this.isHigh = false
        this.isMid = true
      },
      good(params) {
        this.$http.post('/math/good', params).then(function(response) {
          this.isLoad = true
          this.modal = response.data
          this.getGameLinks()
        })
      },
      collect(params) {
        this.$http.post('/math/collect', params).then(function(response) {
          this.isLoad = true
          this.modal = response.data
          this.getGameLinks()
        })
      },
      getGameLinks() {
        var query = {}
        this.$http.get('/math/gameLinks', query).then(function(response) {
          var ret = response.data
          this.primaryGameLinks = ret.primaryLinks
          this.midGameLinks = ret.midLinks
        })
      }
    }
  }
</script>

<style>
  .btn-group {
    margin-top: 6rem;
    margin-left: 2rem;
  }
  .btn-group #primary {
    background: #4CCE34;
  }
  .btn-group #mid {
    background: #46C51C;
  }
  .btn-group #high {
    background: #3EBB27;
  }
  .btn-group #me {
    background: #3EBB27;
  }
  .btn-group #users {
    background: #2DAD16;
  }
  .game ul li {
    list-style: none;
    width: 23%;
    float: left;
    height: 150px;
    margin-right: 100px;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  a {
    cursor: pointer;
  }
  .game ul li a img {
    width: 150px;
    height: 150px;
  }
  .game .comment {
    float: right;
    width: 70%;
    margin-left: 3rem;
    height: 100%;
    word-break:break-all;
    overflow-y:scroll;
  }
  .game .detail {
    float: right;
  }
  .game .detail div {
    cursor: pointer;
  }
  .game .alert {
    position: absolute;
    top: 0rem;
    left: 36rem;
    z-index: 10;
  }
  .tip {
    line-height: 1.7;
    font-size: 2rem;
  }
</style>