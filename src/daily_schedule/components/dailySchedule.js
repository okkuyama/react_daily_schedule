import React, {Component} from 'react'
import moment from 'moment'
import { CalendarPopup } from '../../common/components/calendar'
import { FormatDateHtml } from '../../common/components/formatHtml'
import { ThumbImg } from '../../common/components/thumbImg'
import { first } from 'rxjs/operator/first';

// できたて情報一覧
export class DailyScheduleList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      currentDate,
      currentTime,
      scheduleItems,
      identifier,
      isCalendar,
      onChangeCurrentDate,
      onClickCalendarPopup,
      onClickCalendarPopupClose,
      onClickItemPopup,
      onClickItemPopupClose,
    } = this.props

    return (
  <div>
    <DateForm
      currentDate={currentDate}
      isCalendar={isCalendar}
      onClickCalendarPopup={onClickCalendarPopup}
      />
    <CalendarPopup
      isCalendar={isCalendar}
      currentDate={currentDate}
      onClickCalendarPopupClose={onClickCalendarPopupClose}
      onChangeCurrentDate={onChangeCurrentDate}
      />
    <TimeTable
      currentDate={currentDate}
      currentTime={currentTime}
      scheduleItems={scheduleItems}
      onClickItemPopup={onClickItemPopup}
      />
  </div>
    )
  }
}

// （パーツ：Class）日付変更リンク
class DateForm extends Component {
  constructor(props) {
    super(props)
  }
  // 描画
  render() {
    return(
      <div>
        <div onClick={this.props.onClickCalendarPopup} className="current_date clear_fix">
          <p className="change">日付変更</p>
          <FormatDateHtml date={this.props.currentDate} />
        </div>

        <div onClick={this.props.onClickCalendarPopup} className="current_date_fix">
          <FormatDateHtml date={this.props.currentDate} />
        </div>
      </div> 
    )
  }
}

// （パーツ）タイムテーブル
class TimeTable extends Component {

  render() {
    const {
      currentDate,
      currentTime,
      scheduleItems,
      onClickItemPopup    
    } = this.props

    // 時間単位でできたて情報をまとめる
    let listsInHour = []
    let re = new RegExp("(.*)(?=:)")
    for( let hour = 0; hour < 24; hour++){
      let lists = []
      for(let i in scheduleItems) {
        let listHour = Number(scheduleItems[i].time.match(re)[0])
        if( hour == listHour){
          lists.push(scheduleItems[i])
        }
      }
      listsInHour[hour] = {
        hour: hour,
        scheduleItems: lists
      }
    }
    // 描画
    return(
        <ul className="time_table" id="time_table">
          {listsInHour.map(lists => {
            return <HourList
              currentDate={currentDate}
              currentTime={currentTime}
              key={lists.hour}
              hour={lists.hour}
              scheduleItemsAtHour={lists.scheduleItems}
              onClickItemPopup={onClickItemPopup}
              />
          })}
        </ul>
    )
  }
}

// （パーツ）時間
class HourList extends Component {
  constructor(props){
    super(props)

    // state 初期化
    this.state = {
      timeLineFl: false
    }
  }

  componentWillMount() {
    this.checkDispTimeLine()
  }
  componentWillReceiveProps() {
    this.checkDispTimeLine()
  }

  componentDidMount() {
    this.updateTimeLine()
  }

  componentDidUpdate() {
    this.updateTimeLine()
  }

  // 時間軸表示判別
  checkDispTimeLine() {
    // 時間軸表示有無を判別
    if(this.props.currentDate == moment().format('YYYYMMDD') && this.props.hour == moment().format('H') && this.props.scheduleItemsAtHour.length == 0){
      this.setState({
        timeLineFl: true
      })
    } else {
      this.setState({
        timeLineFl: false
      })
    }
  }

  // 時間軸更新
  updateTimeLine() {
    // 現在時刻より時間軸表示位置を決める。当日以外は表示させない
    // 本日以外は表示させない（以下処理なし）
    if(this.state.timeLineFl){
      // 現在時間の0分からの経過時間（分）を求める
      let beginningOfDay = moment().minute(0).seconds(0)
      let elapsedTime = moment().diff(beginningOfDay, 'minutes')
      // 一時間の総分（60分）との割合を求める
      let persentOfDay = elapsedTime / 60
      // time_table のブロック要素の高さと経過時間の割合から表示位置を計算（小数点切り捨て、四捨五入）
      let timeTableHeight = document.getElementById("hour_" + this.props.hour).clientHeight
      let currentTimeOffset = Math.round(timeTableHeight * persentOfDay)
      // 時間軸のTop値を更新
      document.getElementById("current_time").style.top = currentTimeOffset + 'px'
    }
  }

  // 描画
  render() {
    const {
      currentDate,
      currentTime,
      hour,
      scheduleItemsAtHour,
      onClickItemPopup
    } = this.props

    // 分毎にできたて情報をまとめる
    let re = new RegExp("(?<=:)(.*)")
    let listsInMinute = []
    let preMinute = ""
    let lists = []
    let firstFl = true
    for(let i in scheduleItemsAtHour) {
      let minute = scheduleItemsAtHour[i].time.match(re)[0]
      let nextMinute = "60"
      // 最初で00分以外の場合はダミーで00分をプッシュする
      if(firstFl && minute != "00"){
        listsInMinute.push({
          minute: "00",
          nextMinute: minute,
          scheduleItems: []
        })
        firstFl = false
      }
      if(!( preMinute == "" || preMinute == minute )){
        // 次の配列の分情報を取得
        if(scheduleItemsAtHour[(i + 1)]) {
          nextMinute = scheduleItemsAtHour[(i + 1)].time.match(re)[0]
        }
        // 分が変わったら前のリストを束ねてプッシュ
        listsInMinute.push({
          minute: preMinute,
          nextMinute: nextMinute,
          scheduleItems: lists
        })
        lists = []
      }
      lists.push(scheduleItemsAtHour[i])
      preMinute = minute
      // 最後は強制的に追加する
      if(i == (scheduleItemsAtHour.length - 1)){
        listsInMinute.push({
          minute: minute,
          nextMinute: nextMinute,
          scheduleItems: lists
        })
      }
    }
    if(!listsInMinute[0]){
      // この時間に予約枠情報が無い場合は空欄を表示
      return(
          <li className="hour" id={"hour_" + hour}>
            {(this.state.timeLineFl) ? <div className="current_time" id="current_time"></div> : null }
            <p className="time">{hour}:00</p>
            <div className="section">&nbsp;</div>
          </li>
      )    
    }
    // 予約枠一覧を表示
    return(
          <li className="hour" id={"hour_" + hour}>
            <p className="time">{hour}:00</p>
            {listsInMinute.map(lists => {
              return <MinuteList
                key={hour+":"+lists.minute}
                currentDate={currentDate}
                currentTime={currentTime}
                hour={hour}
                minute={lists.minute}
                nextMinute={lists.nextMinute}
                scheduleItemsAtMinute={lists.scheduleItems}
                onClickItemPopup={onClickItemPopup}
                />
            })}
          </li>
    )
  }
}

// （パーツ）分
class MinuteList extends Component {
  constructor(props){
    super(props)

    // state 初期化
    this.state = {
      timeLineFl: false
    }
  }

  componentWillMount() {
    this.checkDispTimeLine()
  }
  componentWillReceiveProps() {
    this.checkDispTimeLine()
  }

  componentDidMount() {
    this.updateTimeLine()
  }

  componentDidUpdate() {
    this.updateTimeLine()
  }

  // 時間軸表示判別
  checkDispTimeLine() {
    // 時間軸表示有無を判別
    let minute = this.props.minute
    let nextMinute = this.props.nextMinute
    let currentMinute = parseInt(moment().format('m'))
    if(this.props.currentDate == moment().format('YYYYMMDD') && this.props.hour == moment().format('H') && parseInt(this.props.minute) <= parseInt(moment().format('m')) && parseInt(this.props.nextMinute) > parseInt(moment().format('m'))){
      this.setState({
        timeLineFl: true
      })
    } else {
      this.setState({
        timeLineFl: false
      })
    }
  }
  // 時間軸更新
  updateTimeLine() {
    console.log(document.getElementById("minute_" + this.props.hour + "_" + this.props.minute).clientHeight)
    // 現在時刻より時間軸表示位置を決める。当日以外は表示させない
    // 本日以外は表示させない（以下処理なし）
    if(this.state.timeLineFl){
      // 現在時間の分からの経過時間（分）を求める
      let beginningOfDay = moment().minute(parseInt(this.props.minute)).seconds(0)
      let elapsedTime = moment().diff(beginningOfDay, 'minutes')
      // 分の間隔との割合を求める
      let persentOfDay = elapsedTime / (parseInt(this.props.nextMinute) - parseInt(this.props.minute))
      // time_table のブロック要素の高さと経過時間の割合から表示位置を計算（小数点切り捨て、四捨五入）
      let timeTableHeight = document.getElementById("minute_" + this.props.hour + "_" + this.props.minute).clientHeight
      let currentTimeOffset = Math.round(timeTableHeight * persentOfDay)
      // 時間軸のTop値を更新
      document.getElementById("current_time").style.top = currentTimeOffset + 'px'
    }
  }

  render() {
    const {
      hour,
      minute,
      scheduleItemsAtMinute,
      onClickItemPopup
    } = this.props

    return(
            <div className="section" id={"minute_" + hour + "_" + minute}>
              {(this.state.timeLineFl) ? <div className="current_time" id="current_time"></div> : null }
              {(minute == "00" && scheduleItemsAtMinute.length == 0) ? <div className="section">&nbsp;</div>: null}
              {(minute != "00") ? <p className="minute">:{minute}</p> : null }
              {scheduleItemsAtMinute.map(scheduleItem => {
                return <ScheduleItem
                  key={scheduleItem.identifier}
                  {...scheduleItem}
                  onClickItemPopup={onClickItemPopup}
                  />
              })}
            </div>
    )
  }
}

// （パーツ：Class）個別できたて情報
class ScheduleItem extends Component {
  constructor(props) {
    super(props)
  }
  // 描画
  render() {
    return(
              <div className="item close">
                <a onClick={()=>this.props.onClickItemPopup(this.props.identifier)}>
                  <div className="thumb">
                    <ThumbImg filenames={this.props.item.filenames} size="small" alt={this.props.item.title} />
                  </div>
                  <h3 className="title">{this.props.item.title}</h3>
                  <p className="stock">残り<span>{this.props.num - this.props.reserveSum}</span>個</p>
                  <p className="status text_icon">受付終了</p>
                </a>
              </div>
    )
  }
}


// 予約情報取得失敗
export const ItemNotScheduleLoadError = ({
  onClickReload
}) => (
        <aside className="reserve">
          <p className="align_c"><b>できたて情報を取得できませんでした。</b><br />
            <span>しばらく経ってから再読込を行ってください。</span></p>
          <div className="btn_area">
            <button type="button" name="reload" className="btn reload" onClick={()=>onClickReload()}>再読込</button>
          </div>
        </aside>)