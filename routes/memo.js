var express = require('express');
var memoDB = require('../database/memoDB');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Memo App' });
});

router.post('/getMemoList', function(req, res, next) {
  memoDB.getMemoList(req.body.userId)
  .then(function(result) {
    var jsonStr = JSON.stringify(result)
    res.send(jsonStr)
  })
})

router.post('/createMemo', function(req, res, next) {
  memoDB.createNewMemo({
    userId: req.body.userId,
    memo: req.body.memo
  })
  .then(function(result) {
    var jsonStr = JSON.stringify(result)
    res.send(jsonStr)
  })
})

module.exports = router;
