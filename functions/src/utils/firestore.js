const { google } = require('googleapis')
const rp = require('request-promise')
const util = require('util')

/**
 * Firestoreバックアップ処理
 * @param Nothing
 * @return Nothing
 */
async function backupFirestore() {

  // アクセストークン生成
  const accessToken = await getAccessToken()

  const url = `https://firestore.googleapis.com/v1/projects/${process.env.GCLOUD_PROJECT}/databases/(default):exportDocuments`
  const postResult = await rp.post(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true,
    body: {
      outputUriPrefix: `gs://${process.env.GCLOUD_PROJECT}-backups`
    }
  })
  console.log(util.inspect(postResult))
}

async function getAccessToken() {

  // 発行するトークン情報の有効範囲
  const scopes = ['https://www.googleapis.com/auth/datastore', 'https://www.googleapis.com/auth/cloud-platform']
  
  // サービスアカウントで生成したKey情報を読み込み
  const serviceAccount = require(`../../keys/service-account_${process.env.GCLOUD_PROJECT}.json`)

  // JWTを使ってGoogleAPIのアクセストークンを取得させる
  const jwtClient = await new google.auth.JWT(
    serviceAccount.client_email,
    undefined,
    serviceAccount.private_key,
    scopes,
    undefined
  )
  // 生成された認証情報
  const authorize = await jwtClient.authorize()
  const accessToken = authorize.access_token
  if (accessToken) {
    return accessToken
  }else{
    console.error('Provided service account does not have permission to generate access tokens')
    return null
  }
}

module.exports = {
  backupFirestore,
  getAccessToken
}
