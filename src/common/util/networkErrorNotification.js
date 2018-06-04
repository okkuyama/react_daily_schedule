import { put } from 'redux-saga/effects'
import Notifications from 'react-notification-system-redux'

// 共通通信系エラー処理
export function* networkErrorNotification(err) {
  console.dir(err)
  if (err.code === 'ECONNABORTED') {
    // 通信タイムアウト
    yield put(Notifications.error({title: '通信タイムアウト', message: `サーバー接続タイムアウトが発生しました。しばらくたってから再読込を行ってください。`, position: 'tc', autoDismiss: 0}))      
  } else if (err.response) {
    if (err.response.status === 408) {
      // 通信タイムアウト
      yield put(Notifications.error({title: '通信タイムアウト', message: `サーバー接続タイムアウトが発生しました。しばらくたってから再読込を行ってください。`, position: 'tc', autoDismiss: 0}))      
    } else {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if(err.response.statusText){
        yield put(Notifications.error({title: '通信エラー', message: `${err.response.status}: ${err.response.statusText}`, position: 'tc', autoDismiss: 0}))
      }
    }
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    yield put(Notifications.error({title: '通信エラー', message: "サーバーへの接続に失敗しました。しばらくした後に再度処理を行ってください。", position: 'tc', autoDismiss: 0}))
  } else {
    // Something happened in setting up the request that triggered an Error
    yield put(Notifications.error({title: '通信エラー', message: err.message, position: 'tc', autoDismiss: 0}))
  }
}