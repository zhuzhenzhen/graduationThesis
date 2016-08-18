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
        <label for="inputPassword3" class="col-sm-2 control-label">验证密码</label>
        <div class="col-sm-10">
          <input type="password" v-model='admin.passwords' class="form-control" id="inputPassword3" placeholder="Password">
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
          <button @click="login" class="btn btn-default">注册</button>
          <a v-link="{name:'login',replace: false}">已有帐号，去登陆---></a>
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
        passwords: ''
      },
      isLoad: false,
      goPath: '',
      modal: ''
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
      this.isLoad = false
    },
    login () {
      if (this.admin.username.trim() === '' || this.admin.password.trim() === '') {
        this.modal = '用户名或密码不能为空!'
        this.isLoad = true
        return
      }
      if (this.admin.password !== this.admin.passwords) {
        this.isLoad = true
        this.modal = '两次输入的密码不相同！！'
        return
      }
      if (this.isLoad) return false
      this.$http.post('/math/register', this.admin)
        .then(function (response) {
          const res = response.data.type
          if (res === 'REPEAT') {
            this.isLoad = true
            this.modal = '用户名已存在!'
            return
          }
          if (res === 'SUCCESS') {
            this.$route.router.go('/list')
          }
        }, function () {
          this.isLoad = true
          this.modal = '注册异常，请联系管理员!'
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
</style>