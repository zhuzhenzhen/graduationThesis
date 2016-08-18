<template>
  <div class="center primaryList list primary">
    <button @click="getUsersLinks">显示</button>
    <div class="content">
      <div>
        <div class="query">
        根据用户名搜索: <input name="query" v-model="searchQuery" @change="getUsersLinks({name:searchQuery})"/>
        </div>
        <table 
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="border-collapse:collapse;border:4px solid #CCC;margin:5rem 0rem 5rem 0;" 
        >
          <tr>
            <td height="40" width="150">用户名</td>
            <td height="40" width="300">用户类型</td>
            <td height="40" width="150"><a href="">操作</a></td>
          </tr>
          <tr v-for="link in usersLinks">
            <td height="40" width="150">
              <input type="text" value={{link.name}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.type}} />
            </td>
            <td height="40" width="150">
              <a @click="edit('del', $event)" id={{link.name}}>删除
              </a>
              &nbsp;&nbsp;
              <a v-link="{name: 'userDetail', params:{name:link.name},replace: false}">详情</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 弹出框 -->
    <div v-if="isLoad" class="modal">
      {{modal}}
      <div class="close">
        <button @click="close('cancel')">取消</button>
        <button @click="close('sure')">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'zepto'
  import Vmodal from '../components/modal'
  export default {
    data () {
    return {
      usersLinks: [],
      modal: '',
      isLoad: false,
      searchQuery: '',
      name: {}
    }
  },
  ready () {
    $.init()
  },
  methods: {
    close(params) {
      if (params === 'cancel') {
        this.isLoad = false
      } else {
        this.isLoad = false
        var data = {
          name:this.name,
        }
        this.$http.post('/math/editusers', data).then(function(response) {
          this.isLoad = false
          this.modal = '删除成功！'
          this.getUsersLinks()
        })
      }
    },
    getUsersLinks (params) {
      var query = params ? params : {}
      this.$http.get('/math/usersLinks', query).then(function(response) {
        this.usersLinks = response.data
      })
    },
    edit(doc, event) {
      this.modal = '确定删除吗？'
      this.isLoad = true
      this.name = event.target.id
    }
  }
  }
</script>

<style>
  .small-game, .mid-game, .high-vedio {
    position: absolute;
    top: 7rem;
    left: 1rem;
  }
  .mid-game {
    top: 17rem;
  }
  .high-vedio {
    top: 27rem;
  }
  .center td {
    text-align: center;
    border: 4px solid #CCC;
  }
  .center td input{
    border: none;
    width: 90%;
  }
  .primaryList {
    width: 100%;
    height: 100%;
    padding-top: 7rem;
  }
  .list {
    margin-left: 5rem;
    border: none;
  }
</style>
