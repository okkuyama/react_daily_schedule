// @flow

import React, {Component} from 'react'
import type { TypeStatus } from '../../common/type/compontent'

/*
  共通パーツ
  予約状況ステータス
*/
const ReservationStatus = ({status}:TypeStatus) => {
    // ステータス毎に出し分け
    switch(status) {
        case 1:
        return(<span className="status not_reserve">未確保</span>)

        case 2:
        return(<span className="status part_reserve">一部確保</span>)

        case 3:
        return(<span className="status reserved">確保済</span>)

        case 4:
        return(<span className="status received">受取済</span>)

        case 5:
        return(<span className="status cancel">キャンセル</span>)

        default:
        return null
    }
}
ReservationStatus.defaultProps = {
    status: null,
}
export {ReservationStatus}

/*
  共通パーツ
  予約枠ステータス
*/
const HoyahoyaStatus = ({status}:TypeStatus) => {
    // ステータス毎に出し分け
    switch(status) {
        case 1:
        return(<span className="status not_reserve">予約受付中</span>)

        case 2:
        return(<span className="status part_reserve">受付終了</span>)

        default:
        return null
    }
}
HoyahoyaStatus.defaultProps = {
    status: null,
}
export {HoyahoyaStatus}
