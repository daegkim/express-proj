const mongoose = require('mongoose')
//const mongoose_auto_inc = require('mongoose-auto-increment')

//mongoose_auto_inc.initialize(mongoose.connection)

const memoSchema = new mongoose.Schema({
    memoId: Number,
    userId: String,
    memo: String,
    priority: Number,
    isDone: {type: Boolean, default: false},
    delFlag: {type: Boolean, default: false}
})

/*
memoSchema.plugin(mongoose_auto_inc.plugin,{
  model: 'memo',
  field: 'memoId',
  startAt: 1,
  increment: 1
})
*/

const counterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
})

var counter = mongoose.model('counter', counterSchema, 'counter')

memoSchema.pre('save', function(next) {
  var self = this
  counter.findOneAndUpdate({_id: 'memoCounter'}, {$inc: {seq: 1}}, function(err, res) {
    if(err){
      return next(err)
    }

    self.memoId = res.seq
    self.priority = res.seq
    next()
  })
})

module.exports = mongoose.model('memo', memoSchema, 'memo')