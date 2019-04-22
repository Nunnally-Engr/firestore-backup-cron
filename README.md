# firestore-backup-cron
Periodically run Cloud Firestore's backup REST API on Cloud Functions.

## 【定期実行処理】CloudFirestoreバックアップ処理： cronBackupFirestore
### ① Firebaseの料金プランをBlazeへ
### ② GCP側でバケット作成
- バケット名は、"[プロジェクトID]-backups"で作成する。
### ③ GCP側でサービスアカウント作成
- `Cloud Datastore Import Export Admin` と `Storage Object Admin` の権限をつけて作成する。
- 作成したJSONファイルは、`functins > keys` directoryに `service-account_[プロジェクトID].json` として保存する。
```
├── README.md
├── firebase.json
└── functions
    ├── index.js
    ├── keys
    │   └── service-account_[プロジェクトID].json
    ├── package-lock.json
    └── package.json
```

## 参考
- [Cloud Functions で Cloud Firestore のバックアップREST APIを定期実行](https://medium.com/google-cloud-jp/firesto-77272bac8762)
- [How to Schedule (Cron) Jobs with Cloud Functions for Firebase](https://firebase.googleblog.com/2017/03/how-to-schedule-cron-jobs-with-cloud.html)
