var express = require('express');
var accountDB = require('../database/accountDB');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memo App' });
});

router.post('/signup', function(req, res, next) {
  if(req.body.userPwd !== req.body.userChkPwd){
    res.send('error')
    return
  }

  accountDB.createAccount({
    userId: req.body.userId,
    userPwd: req.body.userPwd
  })
  .then(function(result) {
    var jsonStr = JSON.stringify(result)
    res.send(jsonStr)
  })
})

router.post('/signin', function(req, res, next) {
  accountDB.findOneAccount({
    userId: req.body.userId,
    userPwd: req.body.userPwd
  })
  .then(function(result) {
    var jsonStr = JSON.stringify(result)
    res.send(jsonStr)
  })
})

router.post('/checkid', function(req, res, next) {
  accountDB.findOneAccountForCheck({
    userId: req.body.userId,
  })
  .then(function(result) {
    var jsonStr = JSON.stringify(result)
    res.send(jsonStr)
  })
})

module.exports = router;
