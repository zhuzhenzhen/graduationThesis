<template>
  <div class="page page-current">
  <header>
    <img src="/static/assets/math.png" alt="logo">
    <span class="title">
      <a v-link="{name:'list', replace:false}">基础数学课程学习网站</a>
    </span>
    <span v-if='login' class="user">
    <a v-link="{name: 'login', replace: false}">登陆</a>
    </span>
    <span v-else class="user">
      <a v-link="{name:'userDetail',params: { name:userName },replace:false}">{{userName}}／</a>
      <span @click="logout">退出</span>
    </span>
  </header>
  <router-view transition="fade" transition-mode="out-in" keep-alive></router-view>
  </div>
</template>

<script>
  import $ from 'zepto'
  export default {
    ready () {
      $.init()
      this.$http.get('/math/getName', function(response) {
        if (response.name !== '') {
          this.login = false
          this.userName = decodeURIComponent(response.name)
        }
      })
    },
    data () {
      return {
        login: true,
        userName: '',
      }
    },
    methods: {
      logout(){
        this.login = true
        this.$http.get('/math/logout', function(response) {
          this.$route.router.go('/list')
        })        
      }
    }
  }
</script>
<style>
  #app {
    position: relative;
    height: 1500px;
  }
  header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #ccc;
    color: ＃fff;
    font-size: 1rem;
    padding: 0 1rem;
  }
  header a {
    list-style: none;
    color: #000;
  }
  header span {
    cursor: pointer;
  }
  header .title {
  font-size: 1.5rem;
  font-weight: 600;
  }
  header .user {
    float: right;
  }
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #ccc;
    color: ＃fff;
    font-size: 1rem;
  }
  .content {
    height: auto;
  }
</style>