<template>
  <div class="gameDetail">
    <div class="img">
      <a href={{url}}>
        <img src={{img}} alt="开始游戏🎮">
      </a>
    </div>  
    <div class="comment">
      <div class="commentw">
        <div class="intro">游戏简介</div>
        <div>{{comment}}</div>
      </div>
      <div class="comments">
        <div @click="getComment" class="com">游戏评论</div>
        <div class="commentDetail" v-for="comment in comments">
          <div>
            <span>用户：{{comment.user}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>发布时间：{{comment.ltime}}</span>
          </div>
          <div>
            {{comment.comment}}
          </div>
        </div>
        <div class="fbComment">
          <input v-model="fbComment" />
          <button @click="submit">发表评论</button>
        </div>
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
    var query = this.$route.params
    this.$http.get('/math/gameDetail', query)
    .then(function(response) {
      this.comment = response.data[0].comment
    })
    this.$http.get('/math/comments', query)
    .then(function(response) {
      this.comments = response.data
    })
  },
  data () {
    return {
      comment: '',
      img: {},
      url: {},
      comments: {},
      fbComment: '',
      isLoad: false,
      modal: ''
    }
  },
  methods: {
    close() {
      this.isLoad = false
    },
    submit() {
      if (this.fbComment === '') {
        this.isLoad = true
        this.modal = '评论内容不能为空！'
        return false
      }
      var data = {comment: this.fbComment,ltime: new Date().toLocaleString(),title:this.$route.params.title}
      this.$http.post('/math/addComment', data)
        .then(function(response) {
          if (response.data === '请先登陆！') {
            this.isLoad = true
            this.modal = '请先登陆！'
            return
          }
          this.comments = response.data
          this.isLoad = true
          this.modal = '评论成功!'
        })
    }
  }
}
</script>
<style>
  .gameDetail {
    background: url('../assets/bg1.jpg') no-repeat;
    height: 100%;
    background-size: cover;
  }
  .comment {
    padding-top: 8rem;
    margin-left: 2rem;
  }
  .commentw {
    width: 100%;
    height: 100px;
  }
  .comments {
    width: 100%;
    height: 20px;
  }
  .commentDetail {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #ccc;
  }
  .intro, .com {
    font-size: 3rem;
    font-weight: 500;
  }
</style>