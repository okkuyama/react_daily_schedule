import React, {Component} from 'react'
import { connect } from 'react-redux'
import Notifications from 'react-notification-system-redux'
/*
  共通パーツ
  通知コンポーネント
*/
class Notification extends Component {

  // 描画
  render() {
    const {notifications} = this.props;

    //Optional styling
    const style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '5px 5px 2px 1px'
        },

        success: { // Applied only to the success notification item
          color: 'red'
        }
      }
    };

    return (
      <Notifications
        notifications={notifications}
        style={style}
      />
    )
  }
}
export default connect(
  state => ({ notifications: state.notifications })
)(Notification)