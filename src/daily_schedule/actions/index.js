// Action定数
export const DAILY_SCHEDULE_LOAD_REQUEST = 'DAILY_SCHEDULE_LOAD_REQUEST'
export const DAILY_SCHEDULE_LOAD_SUCCESS = 'DAILY_SCHEDULE_LOAD_SUCCESS'
export const DAILY_SCHEDULE_LOAD_FAILURE = 'DAILY_SCHEDULE_LOAD_FAILURE'
export const DAILY_SCHEDULE_CALENDAR_POPUP = 'DAILY_SCHEDULE_CALENDAR_POPUP'
export const DAILY_SCHEDULE_CALENDAR_POPUP_CLOSE = 'DAILY_SCHEDULE_CALENDAR_POPUP_CLOSE'
export const DAILY_SCHEDULE_ITEM_POPUP = 'DAILY_SCHEDULE_ITEM_POPUP'
export const DAILY_SCHEDULE_ITEM_POPUP_CLOSE = 'DAILY_SCHEDULE_ITEM_POPUP_CLOSE'
export const DAILY_SCHEDULE_REFRESH_TIMER = 'DAILY_SCHEDULE_REFRESH_TIMER'

// Action Creators
// ------------------------------------------------------

// 指定日のスケジュール情報を取得リクエスト
export const dailyScheduleRequest = (currentDate) => {
  return {
    type: DAILY_SCHEDULE_LOAD_REQUEST,
    currentDate
  }
}

// 指定日のスケジュール情報を取得（API通信成功）
export const dailyScheduleSuccess = (scheduleItems) => {
  return {
    type: DAILY_SCHEDULE_LOAD_SUCCESS,
    scheduleItems
  }
}

// 指定日のスケジュール情報を取得（API通信失敗）
export const dailyScheduleFailure = (error) => {
  return {
    type: DAILY_SCHEDULE_LOAD_FAILURE,
    error
  }
}

// スケジュール詳細ポップアップ
export const dailyScheduleItemPopup = (identifier) => {
  return {
    type: DAILY_SCHEDULE_ITEM_POPUP,
    identifier
  }
}

// スケジュール詳細ポップアップClose
export const dailyScheduleItemPopupClose = () => {
  return {
    type: DAILY_SCHEDULE_ITEM_POPUP_CLOSE
  }
}

// カレンダーポップアップ
export const dailyScheduleCalendarPopup = () => {
  return {
    type: DAILY_SCHEDULE_CALENDAR_POPUP
  }
}

// カレンダーポップアップClose
export const dailyScheduleCalendarPopupClose = () => {
  return {
    type: DAILY_SCHEDULE_CALENDAR_POPUP_CLOSE
  }
}

// 時刻を進める
export const refreshTimer = () => {
  return {
    type: DAILY_SCHEDULE_REFRESH_TIMER
  }
}
