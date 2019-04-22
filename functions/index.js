const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
// リージョン：Defaultはus-central1
const regionAsia = 'asia-northeast1' // 東京

const firestore = require('./src/utils/firestore')

// =======================================
// Fucntions 定期実行処理
// =======================================
// Schedule(Setting documents：http://urx2.nu/N0Wr)
const schedule = ['every 24 hours', 
  'every 1 hours', 
  'every saturday 00:00', 
  '* * * * *'
]

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'cronBackupFirestore') {
  exports.cronBackupFirestore = functions.region(regionAsia).pubsub.schedule(schedule[0]).onRun(context => {
    firestore.backupFirestore()
    return true
  })
}
