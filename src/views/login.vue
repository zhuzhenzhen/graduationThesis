<template>
  <div class="content login">
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label">用户名</label>
        <div class="col-sm-10">
          <input v-model='admin.username' class="form-control" id="inputEmail3" placeholder="User">
        </div>
      </div>
      <div class="form-group">
        <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
        <div class="col-sm-10">
          <input type="password" v-model='admin.password' class="form-control" id="inputPassword3" placeholder="Password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <a>忘记密码?</a>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button @click="login" class="btn btn-default">登陆</button>&nbsp;&nbsp;&nbsp;
          <button class="btn btn-default"><a v-link="{name:'register',replace: false}">注册</a></button>
        </div>
      </div>
    </form>
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
  data () {
    return {
      admin: {
        username: '',
        password: '',
      },
      isLoad: false,
      goPath: '',
      modal: '',
      register:false
    }
  },
  ready () {
    $.init()
  },
  route: {
    data (transition) {
      this.goPath = transition.from.path
    }
  },
  methods: {
    close() {
      if (this.register) {
        this.$route.router.go('/register')
      }
      this.isLoad = false
    },
    login () {
      if (this.admin.username.trim() === '' || this.admin.password.trim() === '') {
        this.isLoad = true
        this.modal = '用户名或者密码不能为空！'
        return
      }
      if (this.isLoad) return false
      this.isLoad = true
      this.$http.post('/math/login', this.admin)
        .then(function (response) {
          const res = response.data.type
          const level = response.data.level
          if (res === 'INVALIDE_USER') {
            this.isLoad = true
            this.modal = '用户名或者密码错误!'
            return false
          }
          if (res === 'REGISTER') {
            this.isLoad = true
            this.modal = '该用户不存在，请先注册账号!'
            this.register = true
          }
          if (res === 'LOGIN_SUCCESS') {
            if (level === '1') {
              this.$route.router.go(`/userDetail/${this.admin.username}`)
            } else {
              this.$route.router.go('/list')
            }
          }
        }, function () {
          this.isLoad = true
          this.modal = '登录异常，请联系管理员!'
          this.isLoad = false
        })
    }
  }
}
</script>

<style>
  .row {
    text-align: center;
  }
  .login {
    padding-top: 200px;
    padding-left: 18rem;
    padding-right: 20rem;
  }
  .modal {
    position: absolute;
    top: 40%;
    left: 40%;
    z-index: 100;
    background: #fff;
    border: 6px solid #EF4E4E;
    border-radius: 5px;
    width: 24rem;
    height: 6rem;
    display: block;
    padding: 11px;
  }
  .modal .close{
    text-align: center;
  }
</style>