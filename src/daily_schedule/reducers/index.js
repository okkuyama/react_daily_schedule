import { combineReducers } from 'redux'
import * as Actions from '../actions'
import moment from 'moment'
import {reducer as notifications} from 'react-notification-system-redux'

// Reducers
// -----------------------------------------------------
const initState = {
  status:"",
  currentDate: moment().format('YYYYMMDD'),
  currentTime: moment(),
  scheduleItems: [],
  isCalendar: false,
  identifier: "",
  isLoading: false,
  isCartNumChanged: false,
}

const dailyScheduleReducer = (state = initState, action) => {
  switch (action.type) {
    // 指定日のスケジュール情報を取得（API通信開始）
    case Actions.DAILY_SCHEDULE_LOAD_REQUEST:
      return Object.assign({}, state, {
        status: "loading",
        currentDate: action.currentDate,
        scheduleItems: state.scheduleItems,
        isCalendar: false,
        identifier: "",
        isLoading: true,
        isCartNumChanged: false,
      })

    // 指定日のスケジュール情報を取得（API通信成功）
    case Actions.DAILY_SCHEDULE_LOAD_SUCCESS:
      // 通信成功
      return Object.assign({}, state, {
        status: "success",
        currentDate: state.currentDate,
        scheduleItems: action.scheduleItems,
        isCalendar: false,
        identifier: "",
        isLoading: false,
        isCartNumChanged: false,
      })

    // 指定日のスケジュール情報を取得（API通信失敗）
    case Actions.DAILY_SCHEDULE_LOAD_FAILURE:
      return Object.assign({}, state, {
        status: "failure",
        currentDate: state.currentDate,
        scheduleItems: [],
        isCalendar: false,
        identifier: "",
        isLoading: false,
        isCartNumChanged: false,
      })

    // スケジュールポップアップ
    case Actions.DAILY_SCHEDULE_ITEM_POPUP:
      return Object.assign({}, state, {
        status: "",
        currentDate: state.currentDate,
        scheduleItems: state.scheduleItems,
        isCalendar: false,
        identifier: action.identifier,
        isLoading: false,
        isCartNumChanged: false,
      })

    // スケジュールポップアップクローズ
    case Actions.DAILY_SCHEDULE_ITEM_POPUP_CLOSE:
      return Object.assign({}, state, {
        status: "",
        currentDate: state.currentDate,
        scheduleItems: state.scheduleItems,
        isCalendar: false,
        identifier: "",
        isLoading: false,
        isCartNumChanged: false,
      })

    // カレンダーポップアップ
    case Actions.DAILY_SCHEDULE_CALENDAR_POPUP:
      return Object.assign({}, state, {
        status: "",
        currentDate: state.currentDate,
        scheduleItems: state.scheduleItems,
        isCalendar: true,
        identifier: "",
        isLoading: false,
        isCartNumChanged: false,
      })

    // カレンダーポップアップクローズ
    case Actions.DAILY_SCHEDULE_CALENDAR_POPUP_CLOSE:
      return Object.assign({}, state, {
        status: "",
        currentDate: state.currentDate,
        scheduleItems: state.scheduleItems,
        isCalendar: false,
        identifier: "",
        isLoading: false,
        isCartNumChanged: false,
      })

    // 時刻更新
    case Actions.DAILY_SCHEDULE_REFRESH_TIMER:
      return Object.assign({}, state, {
        currentTime: moment()
      })

    // デフォルト
    default:
      return state
  }
}

export default combineReducers({
  dailyScheduleReducer,
  notifications
})
