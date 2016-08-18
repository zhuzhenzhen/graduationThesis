import Login from './views/login'
import Register from './views/register'
import List from './views/list'
import Game from './views/game'
import Test from './views/test'
import Vedio from './views/vedio'
import CenterList from './views/centerList'
import GameDetail from './views/gameDetail'
import UserDetail from './views/userDetail'
import EditList from './views/editList'
import VedioEdit from './views/vedioEdit'
import EditVedio from './views/editVedio'
import Users from './views/users'
import $ from 'zepto'

export default function (router) {
  router.map({
    '/': {
      component: List
    },
    '/login': {
      name: 'login',
      component: Login
    },
    '/register': {
      name: 'register',
      component: Register
    },
    '/list': {
      name: 'list',
      component: List
    },
    '/game': {
      name: 'game',
      component: Game
    },
    '/test': {
      name: 'test',
      component: Test
    },
    '/vedio/:title': {
      name: 'vedio',
      component: Vedio
    },
    '/centerList/:type': {
      name: 'centerList',
      component: CenterList
    },
    '/gameDetail/:title': {
      name: 'gameDetail',
      component: GameDetail
    },
    '/userDetail/:name': {
      name: 'userDetail',
      component: UserDetail
    },
    '/editList/:type/:title': {
      name: 'editList',
      component: EditList
    },
    '/vedioEdit/:title/:type': {
      name: 'vedioEdit',
      component: VedioEdit
    },
    '/editVedio/:type/:title': {
      name: 'editVedio',
      component: EditVedio
    },
    '/users': {
      name: 'users',
      component: Users
    }
  })

  router.afterEach(function ({to}) {
    console.log(`成功浏览到: ${to.path}`)
    $.refreshScroller()
  })
}
