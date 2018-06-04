import React, {Component} from 'react'
import moment from 'moment'

/*
  共通パーツ
  日付をフォーマットして出力
*/
const FormatDateHtml = ({date, className}) => {
    // パラメータチェック
    if(!className) {
        className = "day"
    }
    if(!date) {
        return(
            <p className={className}>----年--月--日</p>
        )
    }

    let weekArray =[
        {en:'sun', jp:'日'},
        {en:'mon', jp:'月'},
        {en:'tue', jp:'火'},
        {en:'wed', jp:'水'},
        {en:'thu', jp:'木'},
        {en:'fri', jp:'金'},
        {en:'sat', jp:'土'},
      ]
    let weekNo = moment(date, 'YYYYMMDDHHmmssSSS').day()
    let formatDate = moment(date, 'YYYYMMDDHHmmssSSS').format('YYYY年M月D日')
    let weekClass = "week " + weekArray[weekNo].en
    let formatWeek = weekArray[weekNo].jp

    return(
        <p className={className}>{formatDate}(<span className={weekClass}>{formatWeek}</span>)</p>
    )
}

export {FormatDateHtml}