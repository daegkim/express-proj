const mongoose = require('mongoose')
const memo = require('./memoSchema')

class MemoDB {
  MemoDB() {
    mongoose.Promise = global.Promise
    mongoose.set('useUnifiedTopology', true) //prevent deprecation warnings
    mongoose.connection.on('error', (err) => { if (err) console.log(err) })
    mongoose.connection.once('open', () => { console.log('mongo connected!!') })
  }

  getMemoList = function(userId) {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/memoApp', { useNewUrlParser: true }, (err) => { if (err) console.log(err) })
      memo.find({
        userId: userId,
        delFlag: false
      })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(exception) {
        console.log(exception)
      })
      .finally(() => {
        mongoose.disconnect()
      })
    })
  }

  createNewMemo = function(newMemo) {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/memoApp', { useNewUrlParser: true }, (err) => { if (err) console.log(err) })
      memo.create({
        userId: newMemo.userId,
        memo: newMemo.memo
      })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(exception) {
        console.log(exception)
      }) 
      .finally(() => {
        mongoose.disconnect()
      })
    })
  }

  updateMemo = function(trgtMemo) {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/memoApp', { useNewUrlParser: true }, (err) => { if (err) console.log(err) })
      memo.updateOne({memoId: trgtMemo.memoId}, {
        memo: trgtMemo.memo,
        isDone: trgtMemo.isDone,
        priority: trgtMemo.priority
      })
      .then(function(res) {
        resolve(res)
      })
      .catch(function(exception) {
        console.log(exception)
      }) 
      .finally(() => {
        mongoose.disconnect()
      })
    })
  }
}

module.exports = new MemoDB()