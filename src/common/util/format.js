import moment from 'moment'

export function dateFormatHtml(date) {
    let weekArray =[
        {en:'sun', jp:'日'},
        {en:'mon', jp:'月'},
        {en:'tue', jp:'火'},
        {en:'wed', jp:'水'},
        {en:'thu', jp:'木'},
        {en:'fri', jp:'金'},
        {en:'sat', jp:'土'},
      ]
      let weekNo = moment(this.props.currentDate).day()
      let currentDate = moment(this.props.currentDate).format('YYYY年M月D日')
      let weekClass = "week " + weekArray[weekNo].en
      let weekJp = weekArray[weekNo].jp
      
}