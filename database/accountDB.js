const mongoose = require('mongoose')
const account = require('./accountSchema')

/*
This it for mongoose connection test & practice for CRUD
*/
class AccountDB {
  accountDB() {
    mongoose.Promise = global.Promise
    mongoose.set('useUnifiedTopology', true) //prevent deprecation warnings
    mongoose.connection.on('error', (err) => { if (err) console.log(err) })
    mongoose.connection.once('open', () => { console.log('mongo connected!!') })
  }

  createAccount = function (newAccount) {
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/memoApp', { useNewUrlParser: true }, (err) => { if (err) console.log(err) })

      account.findOne({ userId: newAccount.userId }, (err, res) => {
        if (err) {
          console.log(err)
          mongoose.disconnect()
          throw err
        }
        if(res !== null) {
          resolve('exi$tID')
          return
        }

        account.create(newAccount, (err) => {
          if (err) {
            console.log(err)
            throw err
          }
          resolve(null)
        })
      })
    })
  }

  findOneAccount = function(trgtAccount){
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/memoApp', { useNewUrlParser: true }, (err) => { if (err) console.log(err) })

      account.findOne({ userId: trgtAccount.userId }, (err, resId) => {
        if (err) {
          console.log(err)
          mongoose.disconnect()
          throw err
        }

        if(resId === null) {
          resolve({userId: null, error: 'userId'})
          return
        }

        account.findOne({ userId: trgtAccount.userId, userPwd: trgtAccount.userPwd }, (err, resIdPwd) => {
          if (err) {
            console.log(err)
            mongoose.disconnect()
            throw err
          }

          if(resIdPwd === null) {
            resolve({userId: null, error: 'userPwd'})
            return
          }
  
          resolve(resIdPwd)
          mongoose.disconnect()
        })
      })
    })
  }

  findOneAccountForCheck = function(trgtAccount){
    return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost:27017/memoApp', { useNewUrlParser: true }, (err) => { if (err) console.log(err) })

      account.findOne({ userId: trgtAccount.userId}, (err, res) => {
        if (err) {
          console.log(err)
          mongoose.disconnect()
          throw err
        }

        resolve(res)
        mongoose.disconnect()
      })
    })
  }
}

module.exports = new AccountDB()