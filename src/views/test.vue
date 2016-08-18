<template>
  <div class="test">
    <span class="one" @click="start('one')"></span>
    <span class="two" @click="start('two')"></span>
    <span class="three" @click="start('two')"></span>
    <span class="four" @click="start('two')"></span>
    <span class="five" @click="start('two')"></span>
    <span class="six" @click="start('two')"></span>
    <span class="seven" @click="start('two')"></span>
    <span class="eight" @click="start('two')"></span>
    <span class="nine" @click="start('two')"></span>
    <span class="ten" @click="start('two')"></span>

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
      isLoad: false,
      modal: ''
    }
  },
  methods: {
    close() {
      this.isLoad = false
    },
    start(param) {
      this.$http.get('/math/getUserTest', function(response) {
        if(response === '请先登陆！') {
          this.isLoad = true
          this.modal = '请先登陆！'
          setTimeout(this.log, 1000)
        } else {
          console.log(param, '===')
          if (param === 'one') {
            this.isLoad = true
            this.modal = '你现在可以闯关了～'
          } else {
            this.isLoad = true
            this.modal = 'sorry,您还没闯关到这一关哟～'
          }
        }
      })
    },
    log() {
      this.$route.router.go('login')
    }
  }
}
</script>
<style>
  .test {
    background: url('../assets/bg2.jpg') no-repeat;
    height: 100%;
    background-size: cover;
    background-position: -3px -21rem;
  }
  .one, .two, .four, .three, .five, .six, .seven, .eight, .nine, .ten {
    position: absolute;
    display: block;
    width: 200px;
    height: 200px;
  } 
  .one {
    top:5rem;
    left:8rem;
  }
  .two {
    top: 5rem;
    left: 42rem;
  }
  .three {
    top: 13rem;
    right:11rem;
  }
  .four {
    top: 47rem;
    right: 6rem;
  }
  .five {
    top: 38rem;
    left: 44rem;
  }
  .six {
    top: 35rem;
    left: 8rem;
  }
  .seven {
    top: 63rem;
    left: 4rem;
  }
  .eight {
    top: 70rem;
    left: 46rem;
  }
  .nine {
    top: 89rem;
    left: 27rem;
  }
  .ten {
    top: 109rem;
    left: 7rem;
  }

</style>