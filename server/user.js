const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/list', function (req, res) {
  // User.remove({},function(e,d){})
  User.find({}, function (err, doc) {
    if (err) {
      console.log(err)
    }
    return res.json(doc)
  })
})
Router.post('/login', function (req, res) {
  const {user, pwd} = req.body
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (err) {
      console.log(err)
    }
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})
Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function (err, doc) {
    if (err) {
      console.log(err)
    }
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.get('/info', function (req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id: userid}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
  // 用户有没有cookie
})

Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1, msg: '请先登录'})
  }
  const body = req.body
  // id 更新数据 回调
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: '数据库查找出错'})
    }
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)

    return res.json({code: 0, data})
  })
})

function md5Pwd (pwd) {
  const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
