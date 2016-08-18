<template>
  <div class="userDetail">
    <div class="title">欢迎来到用户中心</div>
    <p></p>
    <span>用户名：<input type="text" value={{name}} v-model="name"></span>
    <button @click="submit">确定修改</button>
    <div v-if="manage">
      后台管理:
      <a v-link="{name: 'centerList', params:{type:'primary'},replace: false}">小学游戏</a>
      <a v-link="{name: 'centerList', params:{type:'mid'},replace: false}">中学游戏</a>
      <a v-link="{name: 'vedioEdit', params:{type:'primary'},replace: false}">小学视频</a>
      <a v-link="{name: 'vedioEdit', params:{type:'mid'},replace: false}">中学视频</a>
      <a v-link="{name: 'users',replace: false}">注册用户中心</a>
    </div>
    <div>
      <p>我的点赞：
        <ul>
          <li v-for="goo in good"><a v-link="{name: 'gameDetail', params: {title:goo.title,comment:goo.comment}, replace: false}">{{goo.title}}</a></li>
        </ul>
      <p>我的收藏：
        <ul>
          <li v-for="coll in collect"><a v-link="{name: 'gameDetail', params: {title:coll.title,comment:coll.comment}, replace: false}">{{coll.title}}</a></li>
        </ul>
      </p>
      <p>我的视频：
        <ul>
          <li v-for="vedio in myVedio">
            <a v-link="{name: 'vedio', params: {title:vedio.title}, replace: false}">{{vedio.title}}</a>
          </li>
        </ul>
      </p>
      <p>我的闯关纪录：第<span class="level">{{level}}</span>关</p>
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
    data() {
      return {
        name: '',
        Yname: '',
        good: [],
        collect: [],
        level: '',
        isLoad: false,
        modal: '',
        level: '',
        manage: false,
        myVedio: []
      }
    },
    ready () {
      $.init()
      this.name = this.$route.params.name
      this.Yname = this.$route.params.name
      var query = { name:this.name }
      this.$http.get('/math/getUser', query, function(response) {
        if (response.type === '1') {
          this.manage = true
        }
        this.good = response.good
        this.collect = response.collect
        this.level = response.level
        this.myVedio = response.myVedio
      })
    },
    methods: {
      close() {
        this.isLoad = false
      },
      submit() {
        this.Yname = this.$route.params.name
        var data = {name:this.name, Yname: this.Yname }
        this.$http.post('/math/changeName', data, function(response) {
          this.isLoad = true
          this.modal = '修改成功！'
          this.$route.router.go('/list')
        })
      }
    }

  }

</script>

<style>
  .userDetail {
    padding-top: 6rem;
    padding-left: 25rem;
    font-size: 2rem;
  }
  .level {
    font-size: 5rem;
    color: red;
  }
  .userDetail .title {
    font-size: 4rem;
    text-align: center;
    margin-left: -25rem;
  }
</style>