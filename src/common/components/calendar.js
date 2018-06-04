import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import ConstApi from '../../common/config/constApi'
import Spinner from '../../common/components/spinner'

/*
  共通パーツ
  カレンダーピッカーをポップアップ＆クローズさせるコンポーネント
  
  propsパラメータ
    isCalendar  ポップアップON/OFF
    currentDate 指定日（カレンダー表示の開始月を制御）
    onClickCalendarPopupClose ポップアップカレンダーを閉じる
    onChangeCurrentDate  カレンダーの日選択で返されるデリゲート関数
*/
class CalendarPopup extends Component {
  // コンストラクタ
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  // 日付変更
  handleChange(date) {
    this.props.onChangeCurrentDate(date)
  }  

  // ポップアップ抑制（ポップアップクリックで閉じないようにする）
  handleOnChild(e) {
    e.stopPropagation()
  }

  // 描画
  render() {
    // ポップアップ指定がある場合に表示
    if(this.props.isCalendar){
      return(
  <div className="popup_overlay" onClick={this.props.onClickCalendarPopupClose}>
    <article className="popup calendar" onClick={this.handleOnChild}>
      <header className="clear_fix">
        <div className="close_btn">
          <button type="button" onClick={this.props.onClickCalendarPopupClose}><img src="/assets/img/icon_gray_close.svg" width="20px" alt="閉じる" /></button>
        </div>
        <h2 className="title">日付変更</h2>
      </header>
      <Calendar
        currentDate={this.props.currentDate}
        onClickDay={this.handleChange}
        />
    </article>
  </div>
      )
    } else {
      return(<div></div>)
    }
  }

}
export {CalendarPopup}

/*
  共通パーツ
  カレンダーピッカーコンポーネント（お店の定休日も表示）
*/
class Calendar extends Component {
  // コンストラクタ
  constructor(props) {
    super(props)
    let currentDate = {}
    if(this.props.currentDate){
      currentDate = moment(this.props.currentDate)
    } else {
      currentDate = moment()
    }
    this.state = {
      current: currentDate,
      initDate: currentDate,
      holidayLists: [],
      isLoading: false,
    }
    this.handleChangeNext = this.handleChangeNext.bind(this)
    this.handleChangePrev = this.handleChangePrev.bind(this)
    this.handleGetHoliday()
  }

  // 次の月へ移動
  handleChangeNext(){
    let month = moment(this.state.current).add(1, 'months')
    this.setState({
      current: month
    })
    this.handleGetHoliday()
  }

  // 前の月へ移動
  handleChangePrev(){
    let month = moment(this.state.current).add(-1, 'months')
    this.setState({
      current: month
    })
    this.handleGetHoliday()
  }

  // 定休日をAPI経由で取得
  handleGetHoliday(){
    // モックデータ
    const mockData = {
      Holiday: [
        {
          identifier: "000",
          year: 2018,
          month: 6,
          day: 6,
          openingType: 1,
        },
        {
          identifier: "000",
          year: 2018,
          month: 6,
          day: 13,
          openingType: 1,
        },
        {
          identifier: "000",
          year: 2018,
          month: 6,
          day: 14,
          openingType: 1,
        },
        {
          identifier: "000",
          year: 2018,
          month: 6,
          day: 20,
          openingType: 1,
        }
    ]
    }
    // モックアダプター
    const mockAdapter = (config) => {
      return new Promise((resolve, reject) => {
        resolve({data: mockData, status: 200 })
      })
    }

    // axiosインスタンス作成
    let _axios = axios.create({
      baseURL: ConstApi.apiBaseUrl,
      timeout: ConstApi.timeOut,
    })

    // 取得する年月算出
    const yearMonth = this.state.current.format('YYYYMM')

    // ローディング開始
    this.setState({
      isLoading: true
    })

    // API通信 ※モックアップ時はadapterを有効にしてparamをコメントアウト
    _axios.get('calendar',
    {
      adapter: mockAdapter,
      // params: {
      //   shopId: g_shopId,
      //   yearMonth: yearMonth,
      // }
    })
    .then(payload => {
      this.setState({
        holidayLists: payload.data.Holiday,
        isLoading: false
      })
     })
    .catch(err => {
      this.setState({
        isLoading: false
      })
      return err
    })

  }

  // 描画
  render() {
    // 指定月の週数を取得
    let isDay = moment(this.state.current)
    let isWeek = isDay.startOf('months').days()
    let totalDays = isDay.endOf('months').date()
    let weekNum = Math.ceil((isWeek + totalDays) / 7)
    // 1日からスタート
    isDay = isDay.startOf('months')
    // カレンダー配列を作成
    let weekList = []
    for(let weeks = 1; weeks <= weekNum; weeks++) {
      let weekDays = []
      for(let week = 0; week < 7; week++){
        let year = isDay.day(week).year()
        let month = isDay.day(week).month()
        let day = isDay.day(week).date()
        let other = (this.state.current.month() != month)? 'other' : ''
        let holiday =  ''
        for(let i in this.state.holidayLists) {
          // 休日の場合はclass名を指定
          if(this.state.holidayLists[i].year == year && this.state.holidayLists[i].month == (month+1) && this.state.holidayLists[i].day == day) {
            holiday = 'holiday'
          }
        }
        // 初期日付の場合はclass名を指定
        let initDate = ''
        if(isDay.day(week).format('YYYYMMDD') == this.state.initDate.format('YYYYMMDD')){
          initDate = 'init_date'
        }

        // 日〜土まで週番号毎の日にちを埋めていく
        weekDays.push({
          key: isDay.day(week).format('YYYYMMDD'),
          day: day,
          className: isDay.day(week).format('ddd').toLowerCase()+' '+other+' '+holiday+' '+initDate,
          holiday: (holiday != '')? true : false
        })
      }
      weekList.push(weekDays)
      isDay.add('days', 7)
    }


    return(
        <div className="holiday" id="holiday">
        <Spinner isLoading={this.state.isLoading} />
          <div className="nav">
            <p className="prev"><a onClick={this.handleChangePrev}>＜</a></p>
            <p className="month">{this.state.current.format('YYYY年MM月')}</p>
            <p className="next"><a onClick={this.handleChangeNext}>＞</a></p>
          </div>
          <table>
            <thead>
              <tr>
                <td className="sun">日</td>
                <td className="mon">月</td>
                <td className="tue">火</td>
                <td className="wed">水</td>
                <td className="thu">木</td>
                <td className="fri">金</td>
                <td className="sat">土</td>
              </tr>
            </thead>
            <tbody>
              {weekList.map((weekDays, index) => {
                return (
                  <Week
                    key={index}
                    weekDays={weekDays}
                    onClickDay={this.props.onClickDay}
                  />
                )
              })}
            </tbody>
          </table>
          <div className="clear_fix mt20">
            <p className="sample">
              <span className="holiday">&nbsp;</span> 色のマスは休日です。
            </p>
          </div>
        </div>
    )
  }
}
export {Calendar}

// （パーツ）週
const Week = ({
  weekDays,
  onClickDay
}) => (
  <tr>
  {weekDays.map(day => {
    return (
      <Day
        key={day.key}
        dayData={day}
        onClickDay={onClickDay}
      />
    )
  })}
  </tr>
)

// （パーツ）日
class Day extends Component {
  constructor(props) {
    super(props)
    this.handleClickDay = this.handleClickDay.bind(this)
  }
  // クリックイベント
  handleClickDay() {
    console.log('onClickDay')
    this.props.onClickDay(this.props.dayData.key)
  }
  // 描画
  render() {
    if(this.props.dayData.holiday){
      return(
        <td className={this.props.dayData.className}>{this.props.dayData.day}</td>
      )  
    } else {
      if(this.handleClickDay){
        return(
          <td className={this.props.dayData.className}><a onClick={this.handleClickDay}>{this.props.dayData.day}</a></td>
        )  
      } else {
        return(
          <td className={this.props.dayData.className}>{this.props.dayData.day}</td>
        )  
      }
    }
  }
}
