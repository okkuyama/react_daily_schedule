import axios from 'axios'
import ConstApi from '../../common/config/constApi' 

export const loadDailySchedule = (currentDate) => {

  // モックデータ
  const mockData = [
    {
      identifier: "001",
      date: 20180604,
      time: "05:00",
      regulerFl: false,
      status: true,
      order: 0,
      num: 12,
      reserveSum: 0,
      item: {
        identifier: "1523E5AF-3CF5-4D79-81CE-047622B9A07E",
        title: "サンプル",
        price: 100,
        filenames: '',
      }
    },
  ]

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

  // API通信：日付指定でできたて情報取得 ※モックアップ時はadapterを有効にしてparamをコメントアウト
  return _axios.get('daily_schedule',
    {
      adapter: mockAdapter,
      // params: {
      //   shopId: g_shopId,
      //   date: currentDate
      // }
    })
    .then(payload => ({ payload }))
    .catch(err => ({ err }))
}
