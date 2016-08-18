<template>
  <div class="center primaryList list primary">
    <button @click="getVedioLinks">显示</button>
    <button>
      <a v-link="{name: 'editVedio',params:{type:'新增数据', title:'add'},replace: false}">新增数据</a>
    </button>
    <div class="content">
      <div v-if="isPrimary">
        <div class="query">
          根据视频名搜索: <input name="query" v-model="searchQuery" @change="getVedioLinks({title:searchQuery,type:'primary'})"/>
        </div>  
        <table 
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="border-collapse:collapse;border:4px solid #CCC;margin:5rem 0rem 5rem 0;" 
        >
          <tr>
            <td height="40" width="150">视频名称</td>
            <td height="40" width="300">视频链接</td>
            <td height="40" width="150">视频点击数</td>
            <td height="40" width="150"><a href="">操作</a></td>
          </tr>
          <tr v-for="link in vedioLinks">
            <td height="40" width="150">
              <input type="text" value={{link.title}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.url}} />
            </td>
            <td height="40" width="150">
              <input type="text" value={{link.time}} />
            </td>
            <td height="40" width="150">
              <span @click="edit('del', $event)" id={{link.title}}>删除
              </span>
              &nbsp;&nbsp;
              <a v-link="{name: 'editVedio', params:{title:link.title,type:link.type},replace: false}">编辑</a>
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
      vedioLinks: [],
      modal: '',
      isLoad: false,
      isPrimary: true,
      searchQuery: '',
      Ytitle: ''
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
        this.$http.post('/math/editVedio', data).then(function(response) {
          this.isLoad = false
          this.modal = '删除成功！'
          this.getVedioLinks()
        })
      }
    },
    getVedioLinks (params) {
      this.$http.get('/math/vedioLinks', params).then(function(response) {
        var ret = response.data
        if (this.$route.params.type === 'primary') {
          this.vedioLinks = ret.primaryVedios
        } else {
          this.vedioLinks = ret.midVedios
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
  .query {
    margin-top: 2rem;
  }
</style>
