import { delay } from 'redux-saga'
import { put, call, take, fork, select } from 'redux-saga/effects'
import * as Action from '../actions'
import * as API from '../apis/dailySchedule'
import Notifications from 'react-notification-system-redux'
import { networkErrorNotification } from '../../common/util/networkErrorNotification'

const getDailyScheduleReducer = state => state.dailyScheduleReducer

export function* handleRequestDailySchedule() {
  // 初回読み込み実行
  const state = yield select(getDailyScheduleReducer)
  const {payload, err}  = yield call(API.loadDailySchedule, state.currentDate)
  
  if (err) {
    // ネットワークエラー
    yield networkErrorNotification(err)  // 共通エラー処理
    yield put(Action.dailyScheduleFailure(err))
  } else if (payload.data.errorMessage) {
    // サーバー側処理上のエラー
    yield put(Notifications.error({ title: '処理に失敗しました', message: payload.data.errorMessage, position: 'tc', autoDismiss: 0}))
    yield put(Action.dailyScheduleFailure(payload.data.errorMessage))
  } else {
    // 成功
    yield put(Action.dailyScheduleSuccess(payload.data))
  }

  // 二回目以降は日付変更時に呼び出される
  while (true) {
    const action = yield take(Action.DAILY_SCHEDULE_LOAD_REQUEST)
    // カレンダー変更通知
    yield put(Notifications.success({ title: '日付を変更しました', position: 'tc', autoDismiss: 1}))
    const {payload, err}  = yield call(API.loadDailySchedule, action.currentDate)
    
    if (err) {
      // ネットワークエラー
      // yield fork(function* () {
        
      // })
      yield networkErrorNotification(err)  // 共通エラー処理
      yield put(Action.dailyScheduleFailure(err))
    } else if (payload.data.errorMessage) {
      // サーバー側処理上のエラー
      yield put(Notifications.error({ title: '処理に失敗しました', message: payload.data.errorMessage, position: 'tc', autoDismiss: 0}))
      yield put(Action.dailyScheduleFailure(payload.data.errorMessage))
    } else {
      // 成功
      yield put(Action.dailyScheduleSuccess(payload.data))
    }

  }
}

// 現在時刻の更新
export function* handleRefrashTimer() {
  while (true) {
    // 1分待つ
    yield call(delay, 10000)
    console.log('refreshTimer')
    // 時刻更新
    yield put(Action.refreshTimer())
  }
}

export default function* rootSaga() {
  yield fork(handleRequestDailySchedule)
  yield fork(handleRefrashTimer)
}
