var express = require('express')
var router = express.Router()
var user = require('../../database/db.js').user
var game = require('../../database/db.js').game
var comment = require('../../database/db.js').comment
var collect = require('../../database/db.js').collect
var good = require('../../database/db.js').good
var vedio = require('../../database/db.js').vedio
var myvedio = require('../../database/db.js').myvedio

/* GET users listing. */
router.post('/login', function (req, res) {
  var data = { name: req.body.username, password: req.body.password }
  var query = { name: req.body.username }
  user.count(query, function (err, doc) {
    if (doc >= 1) {
      user.find(data, function (err, docs) {
        if (docs.length >= 1) {
          res.cookie('name', req.body.username)
          var ret = {level: docs[0].type ,type: 'LOGIN_SUCCESS'}
        } else {
          ret = {type: 'INVALIDE_USER'}
        }
      res.json(ret)
      })
    } 
    if (doc < 1) {
      var result = {type: 'REGISTER'}
      res.json(result)
    }
  })
})

router.get('/logout', function(req,res) {
  res.clearCookie('name')
  res.json({})
})

router.get('/getName', function(req, res) {
  var data = req.headers.cookie
  var Qname = data.indexOf('name=')
  if (Qname < 0) {
    var ret = {name: ''}
  } else {
    ret = {name: data.substring((Qname+5))}
  }
  res.json(ret)
})

router.post('/register', function (req, res) {
  var data = { name: req.body.username, password: req.body.password }
  user.count(data, function (err, doc) {
    if (doc >= 1) {
      var result = { name: req.body.username, type: 'REPEAT' }
    } else {
      var goo = new user({name: req.body.username,password: req.body.password,type: '0',level:''})
      goo.save()
      res.cookie('name', req.body.username)
      var result = {type: 'SUCCESS'}
    }
    res.json(result)
  })
})

router.get('/gameLinks', function (req, res) {
  var query = req.query ? req.query : {}
  game.find(query, function (err, docs) {
    var primaryLinks = docs.filter(function(doc) {
      return doc.type === 'primary'
    })
    var midLinks = docs.filter(function(doc) {
      return doc.type === 'mid'
    })
    var result = {primaryLinks,midLinks}
    res.json(result)
  })
})

router.get('/vedioLinks', function (req, res) {
  var cook = req.headers.cookie
  var Qname = cook.indexOf('name=')
  if (Qname === -1) {
    var result = "请先登陆！"
    res.json(result)
    return
  } 
  var query = req.query ? req.query : {}
  vedio.find(query, function (err, docs) {
    var primaryVedios = docs.filter(function(doc) {
      return doc.type === 'primary'
    })
    var midVedios = docs.filter(function(doc) {
      return doc.type === 'mid'
    })
    var result = {primaryVedios,midVedios}
    res.json(result)
  })
})

router.post('/good', function (req, res) {
  var query =  {title:req.body.title}
  var cook = req.headers.cookie
  var Qname = cook.indexOf('name=')
  var name = Qname === -1 ? '路人' : cook.substring((Qname+5))
  good.count({title:req.body.title,name:name},function(err, doc) {
    if (doc < 1) {
      var goo = new good({title:req.body.title,name:name})
      goo.save()
      game.update(query, {good:(Number(req.body.num)+1)}, function (err, doc) {
        var result = "点赞成功！"
        res.json(result)
      })
      return
    }
    good.remove({title:req.body.title,name:name}, function(err, doc) {
      game.update(query,{good:(Number(req.body.num)-1), name:""},function(err, doc) {
        result = "取消点赞成功！"
        res.json(result)
      })
    })
  })
})

router.get('/gameDetail',function (req, res) {
  game.find(req.query,{ comment: 1, _id:0 },function(err, doc) {
    res.json(doc)
  })
})
router.post('/collect', function(req, res) {
  var query =  {title:req.body.title}
  var cook = req.headers.cookie
  var Qname = cook.indexOf('name=')
  if (Qname === -1) {
    var result = "请先登陆！"
    res.json(result)
    return
  } 
  var name = cook.substring((Qname+5))
  collect.count({title:req.body.title,name:name},function(err, doc) {
    if (doc < 1) {
      var goo = new collect({title:req.body.title,name:name})
      goo.save()
      game.update(query, {collect:(Number(req.body.num)+1)}, function (err, doc) {
        var result = "收藏成功！"
        res.json(result)
      })
      return
    }
    collect.remove({title:req.body.title,name:name}, function(err, doc) {
      game.update(query,{collect:(Number(req.body.num)-1), name:""},function(err, doc) {
        result = "取消收藏成功！"
        res.json(result)
      })
    })
  })
})

router.post('/editLink', function(req, res) {
  var data = {
    title: req.body.title,
    url: req.body.url,
    time: req.body.time,
    img: req.body.img,
    type: req.body.type
  }
  var Ytitle = req.body.Ytitle
  if (req.body.docs === 'del') {
    game.remove({title:Ytitle}, function (err, doc) {
      var ret = '删除成功！'
      res.json(ret)
    })
  } else if (Ytitle !== 'add') {
    game.update({title:Ytitle}, data,{upsert:true}, function (err, doc) {})
    if (Ytitle === req.body.title ) {
      var result = '保存成功！'
    } else {
      good.update({title:Ytitle}, data,{upsert:true}, function (err, doc) {})
      collect.update({title:Ytitle}, data,{upsert:true}, function (err, doc) {})
      comment.update({title:Ytitle}, data,{upsert:true}, function (err, doc) {})
      var result = '保存成功！'
    }
    res.json(result)
  } else {
    var newGame = new game(data)
    newGame.save()
    var result = '保存成功！'
    res.json(result)
  }
})

router.post('/editVedio', function(req, res) {
  var data = {
    title: req.body.title,
    url: req.body.url,
    time: req.body.time,
    type: req.body.type
  }
  if (req.body.docs === 'del') {
    vedio.remove({title:req.body.Ytitle}, function (err, doc) {
      var ret = '删除成功！'
      res.json(ret)
    })
  } else if (req.body.Ytitle !== 'add') {
    vedio.update({title:req.body.Ytitle}, data,{upsert:true}, function (err, doc) {
      var result = '保存成功！'
      res.json(result)
    })
  } else {
    var newVedio = new vedio(data)
    newVedio.save()
    var result = '保存成功！'
    res.json(result)
  }
})

router.get('/myVedio', function(req, res) {
  myvedio.find(req.query, function (err, docs) {
    res.json(docs)
  })
})

router.post('/addVedio', function(req, res) {
  var cook = req.headers.cookie
  var Qname = cook.indexOf('name=')
  if (Qname === -1) {
    var result = "请先登陆！"
    res.json(result)
    return
  } 
  var name = cook.substring((Qname+5))
  vedio.update(req.body, {time: (Number(req.body.time)+1)}, function (err, docs) {
    var data = {title: req.body.title, type:req.body.type,name:name}
    myvedio.count(data, function(err, doc) {
      if (doc < 1) {
        var ved = new myvedio(data)
        ved.save()
      }
    })
    res.json({})
  })
})

router.get('/comments', function(req, res){
  comment.find(req.query, function (err, docs) {
    res.json(docs)
  })
})

router.post('/addComment', function(req, res) {
  var query =  {title:req.body.title}
  var cook = req.headers.cookie
  var Qname = cook.indexOf('name=')
  if (Qname === -1) {
    var result = '请先登陆！'
    res.json(result)
    return
  } 
  var name = cook.substring((Qname+5))
  var data = {user: name,title:req.body.title,comment:req.body.comment,ltime:req.body.ltime}
  comment.count({},function(err,doc){
    var goo = new comment(data)
    goo.save()
    comment.find({title:req.body.title}, function (err, docs) {
      res.json(docs)
    })
  })
})

router.get('/getUser', function(req, res) {
  good.find(req.query,{ title: 1, _id:0 },function(err, docs1) {
    collect.find(req.query,{ title: 1, _id:0 },function(err,docs2){
      user.find(req.query, { type: 1,level: 1, _id:0 },function(err, docs3) {
        myvedio.find(req.query,{ title: 1, _id:0 },function(err,docs4){
          var result = {'good': docs1,'collect': docs2,'level': docs3[0].level,'type':docs3[0].type,'myVedio':docs4}
          res.json(result)
        })
      })
    })
  })
})

router.post('/changeName', function(req, res) {
  user.update({name: req.body.Yname}, {name: req.body.name}, {multi:true},function(err, doc) {
    comment.update({user: req.body.Yname}, {user: req.body.name},{multi:true},function(err, doc) {
      good.update({name: req.body.Yname}, {name: req.body.name},{multi:true},function(err, doc) {
        collect.update({name: req.body.Yname}, {name: req.body.name},{multi:true},function(err, doc) {
          var result = {type: 'SUCCESS'}
          res.cookie('name', req.body.name)
          res.json(result)
        })
      })
    })
  })
})

router.get('/good', function(req, res) {
  good.find(req.query, {name:1,_id:0}, function(err, docs) {
    res.json(docs)
  })
})

router.get('/collect', function(req, res) {
  collect.find(req.query, {name:1,_id:0}, function(err, docs) {
    res.json(docs)
  })
})

router.get('/usersLinks', function(req, res) {
  user.find(req.query, function(err, docs) {
    res.json(docs)
  })
})

router.post('/editusers', function(req, res) {
  user.remove(req.body, function(err, doc) {
    res.json({})
  })
})

router.get('/getUserTest', function(req, res) {
  var query =  {title:req.body.title}
  var cook = req.headers.cookie
  var Qname = cook.indexOf('name=')
  if (Qname === -1) {
    var result = '请先登陆！'
    res.json(result)
    return
  } 
  var name = cook.substring((Qname+5))
  var data = {user: name}
  user.find(data,{level:1,_id:0},function(err,doc){
    res.json(doc)
  })
})

module.exports = router