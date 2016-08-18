<template>
  <div class="center primaryList list primary">
    <button @click="getGameLinks">显示</button>
    <button>
      <a v-link="{name: 'editList',params:{type:'新增数据', title:'add'},replace: false}">新增数据</a>
    </button>
    <div class="content">
      <div v-if="isPrimary">
        <div class="query">
        根据游戏名称搜索: <input name="query" v-model="searchQuery" @change="getGameLinks({title:searchQuery,type:'primary'})"/>
        </div>
        <table 
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="border-collapse:collapse;border:4px solid #CCC;margin:5rem 0rem 5rem 0;" 
        >
          <tr>
            <td height="40" width="150">游戏名称</td>
            <td height="40" width="300">游戏链接</td>
            <td height="40" width="150">游戏图片</td>
            <td height="40" width="150">游戏点赞数</td>
            <td height="40" width="150">游戏评论数</td>
            <td height="40" width="150"><a href="">操作</a></td>
          </tr>
          <tr v-for="link in gameLinks">
            <td height="40" width="150">
              <input type="text" value={{link.title}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.url}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.img}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.good}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.collect}} />
            </td>
            <td height="40" width="150">
              <a @click="edit('del', $event)" id={{link.title}}>删除
              </a>
              &nbsp;&nbsp;
              <a v-link="{name: 'editList', params:{title:link.title,type:link.type},replace: false}">编辑</a>
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
      gameLinks: [],
      modal: '',
      isLoad: false,
      isPrimary: true,
      searchQuery: '',
      Ytitle: {}
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
          Ytitle:this.Ytitle,
          docs:'del'
        }
        this.$http.post('/math/editLink', data).then(function(response) {
          this.isLoad = false
          this.modal = '删除成功！'
          this.getGameLinks()
        })
      }
    },
    getGameLinks (params) {
      this.$http.get('/math/gameLinks', params).then(function(response) {
        var ret = response.data
        if (this.$route.params.type === 'primary') {
          this.gameLinks = ret.primaryLinks
        } else {
          this.gameLinks = ret.midLinks
        }
      })
    },
    edit(doc, event) {
      this.modal = '确定删除吗？'
      this.isLoad = true
      this.Ytitle = event.target.id
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
