import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DailyScheduleList, ItemNotScheduleLoadError } from '../components/dailySchedule'
import Spinner from '../../common/components/spinner'
import * as Action from '../actions'

// コンポーネント
const DailySchedule = ({
  currentDate,
  currentTime,
  scheduleItems,
  identifier,
  isCalendar,
  isLoading,
  onChangeCurrentDate,
  onClickCalendarPopup,
  onClickCalendarPopupClose,
  onClickItemPopup,
  onClickItemPopupClose,
}) => {
  return(
    <div>
      <Spinner isLoading={isLoading} />
      <DailyScheduleList
        currentDate={currentDate}
        currentTime={currentTime}
        scheduleItems={scheduleItems}
        identifier={identifier}
        isCalendar={isCalendar}
        onChangeCurrentDate={onChangeCurrentDate}
        onClickCalendarPopup={onClickCalendarPopup}
        onClickCalendarPopupClose={onClickCalendarPopupClose}
        onClickItemPopup={onClickItemPopup}
        onClickItemPopupClose={onClickItemPopupClose}
      />
    </div>
  )
}

// Redux state-Propsマッピング
const mapStateToProps = (state) => {
  return {
    currentDate: state.dailyScheduleReducer.currentDate,
    currentTime: state.dailyScheduleReducer.currentTime,
    scheduleItems: state.dailyScheduleReducer.scheduleItems,
    identifier: state.dailyScheduleReducer.identifier,
    isCalendar: state.dailyScheduleReducer.isCalendar,
    isLoading: state.dailyScheduleReducer.isLoading,
  }
}
// Redux Dispatch-Propsマッピング
const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    onChangeCurrentDate: (date) => dispatch(Action.dailyScheduleRequest(date)),
    onClickCalendarPopup: () => dispatch(Action.dailyScheduleCalendarPopup()),
    onClickCalendarPopupClose: () => dispatch(Action.dailyScheduleCalendarPopupClose()),
    onClickItemPopup: (identifier) => dispatch(Action.dailyScheduleItemPopup(identifier)),
    onClickItemPopupClose: () => dispatch(Action.dailyScheduleItemPopupClose()),
  }
}
// Reduxと接続
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailySchedule)
