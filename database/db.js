var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/math')  // 连接mongoDB数据库
var db = mongoose.connection
var Schema = mongoose.Schema 

var userSchema = new Schema({
    name: String,
    password: String,
    type: String,
    level:String
})

// 注册用户
exports.user = db.model('users', userSchema)

var gameSchema = new Schema({
    url: String,
    img: String,
    good: String,
    collect: String,
    title: String,
    type: String,
    comment: String,
    name: String
})

// gameLinks
exports.game = db.model('games', gameSchema)

var vedioSchema = new Schema({
    url: String,
    title: String,
    type: String,
    time: String,
})

// vedioLinks
exports.vedio = db.model('vedios', vedioSchema)

var vediosSchema = new Schema({
    title: String,
    name: String,
    second: String,
})

// myVedio
exports.myvedio = db.model('myvedios', vediosSchema)

var commentsSchema = new Schema({
    title: String,
    comment: String,
    user: String,
    type: String,
    ltime: String
})

// comments
exports.comment = db.model('comments', commentsSchema)

var collectsSchema = new Schema({
    title: String,
    name: String,
})

// collect
exports.collect = db.model('collects', collectsSchema)

var goodsSchema = new Schema({
    title: String,
    name: String,
})

// good
exports.good = db.model('goods', goodsSchema)
