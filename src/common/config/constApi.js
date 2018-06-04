// 定数定義用
const ConstApi = {
  apiBaseUrl: (process.env.NODE_ENV === 'production') ? 'http://localhost:3000/' : 'http://localhost:3001/',
  timeOut: 10000,
  sessionTime: {
      default: 86400, // 8時間セッション維持
      autoLogin: 5184000, // 自動ログインON
  },
};
export default ConstApi;
