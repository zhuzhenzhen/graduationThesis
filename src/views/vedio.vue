<template>
  <div class="vedio list">
    <div class="btn-group">
      <button class="btn" id="primary" @click="primary">我是小学生</button>
      <button class="btn" id="mid" @click="mid">我是中学生</button>
    </div>
    <div class="study">已学习时间:{{hour}}时{{miu}}分{{second}}秒</div>
    <div class="query">
    根据名称搜索: <input name="query" v-model="searchQuery" @change="getVedioLinks({title:searchQuery)" />
    </div>
    <div class="vedioDetail">
      <div v-if="isPrimary">
        <ul>
          <li v-for="link in primaryVedioLinks">
            <a href={{link.url}}>
              课程名称:&nbsp;{{link.title}}
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>点击次数:&nbsp;&nbsp;{{link.time}}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span @click="lestion('primary',$event)" id={{link.title}} class={{link.time}}>
            <a href={{link.url}} target="_blank">开始听课</a>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="isMid">
        <ul>
          <li v-for="link in midVedioLinks">
            <a href={{link.url}}>
              课程名称:&nbsp;{{link.title}}
            </a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>点击次数:&nbsp;&nbsp;{{link.time}}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span @click="lestion('mid',$event)" id={{link.title}} class={link.title}>
            <a href={{link.url}} target="_blank">开始听课</a>
            </span>
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
    },
    data () {
      return {
        isPrimary: true,
        isMid: false,
        isHigh: false,
        primaryVedioLinks: [],
        midVedioLinks: [],
        Dgood: [],
        alert: false,
        Dcollect: [],
        isLoad: false,
        time: '',
        searchQuery: '',
        second: 0,
        miu: 0,
        hour: 0
      }
    },
    methods: {
      close() {
        this.isLoad = false
      },
      primary () {
        this.isMid = false
        this.isPrimary = true
        this.getVedioLinks()
      },
      mid () {
        this.isPrimary = false
        this.isMid = true
        this.getVedioLinks()
      },
      getVedioLinks(params) {
        var type = this.isPrimary ? 'primary' : 'mid'
        var query = this.$route.params.title === ':title' ?
         {type: type} :  {type:type,title:this.$route.params.title}
        this.$http.get('/math/vedioLinks', query).then(function(response) {
          if (response.data === '请先登陆！') {
            this.isLoad = true
            this.modal = '请先登陆！'
            return
          }
          var ret = response.data
          this.primaryVedioLinks = ret.primaryVedios
          this.midVedioLinks = ret.midVedios
        })
      },
      lestion(doc, event) {
        this.start()
        var query = {title: event.target.id,time: event.target.className,type: doc}
        this.$http.post('/math/addVedio', query,function(response){
          this.getVedioLinks()
        })
      },
      start() {
        this.second = this.second + 1
        if (this.second === 60) {
          this.second = 0
          this.miu = this.miu + 1
        }
        if (this.hour === 60) {
          this.miu = 0
          this.hour = this.hour + 1
        }
        var t = setTimeout(this.start, 1000)
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
  .vedio ul li {
    list-style: none;
    margin-top: 2rem;
  }
  a {
    cursor: pointer;
  }
  .vedio .detail div {
    cursor: pointer;
  }
  .vedio .alert {
    position: absolute;
    top: 0rem;
    left: 36rem;
    z-index: 10;
  }
  .tip {
    line-height: 1.7;
    font-size: 2rem;
  }
  .vedioDetail {
    margin-top: 2rem;
  }
 .vedioDetail ul li span{
    cursor: pointer;
  }
  .study {
    padding: 2rem;
  }
</style>