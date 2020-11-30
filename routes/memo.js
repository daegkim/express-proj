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

router.post('/updateMemo', function(req, res, next) {
  if(Array.isArray(req.body)){
    for(let i of req.body){
      memoDB.updateMemo(i)
      .then(function(result) {
      })
    }
    res.send('success')
  }
  else{
    memoDB.updateMemo(req.body)
    .then(function(result) {
      var jsonStr = JSON.stringify(result)
      res.send(jsonStr)
    })
  }
})

router.post('/deleteMemo', function(req, res, next) {
  memoDB.deleteMemo(req.body)
  .then(function(result) {
    var jsonStr = JSON.stringify(result)
    res.send(jsonStr)
  })
})

module.exports = router;
