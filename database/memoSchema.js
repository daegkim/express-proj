const mongoose = require('mongoose')
const mongoose_auto_inc = require('mongoose-auto-increment')

mongoose_auto_inc.initialize(mongoose.connection)

const memoSchema = new mongoose.Schema({
    memoId: Number,
    userId: String,
    memo: String,
    priority: Number,
    isDone: {type: Boolean, default: false},
    delFlag: {type: Boolean, default: false}
})

memoSchema.plugin(mongoose_auto_inc.plugin,{
  model: 'memo',
  field: 'memoId',
  startAt: 1,
  increment: 1
})

memoSchema.plugin(mongoose_auto_inc.plugin,{
  model: 'memo',
  field: 'priority',
  startAt: 1,
  increment: 1
})

module.exports = mongoose.model('memo', memoSchema, 'memo')