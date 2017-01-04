/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat')
const Promise = require('./utils/bluebird')

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'generate epub book',
    version: '0.1.3',
    userInfo: null
  },

  // 不是只能定义`data`，别的也可以
  other: 'other variables',

  /**
   * 获取用户信息
   * @return {Promise} 包含获取用户信息的`Promise`
   */
  getUserInfo () {
    return new Promise((resolve, reject) => {
      if (this.data.userInfo) return resolve(this.data.userInfo)
      let code = ''
      wechat.login()
        .then((res) => {
          // 这里的返回的code 及 状态
          console.log(res)
          code = res.code
          return wechat.getUserInfo()
        })
        .then((u_info) => {
          //console.log(u_info)
          // api 登录
          return wechat.fetchApi('user/wlogin',{
            code: code,
            iv: u_info.iv,
            encrypted_data: u_info.encryptedData
          })
        })
        .then((res) => {
          //console.log("api 返回：",res)
          this.data.userInfo = res.data
          resolve(res.data)
          return res.data
        })
        .then((data) => {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
            wx.navigateTo({
              url: '/pages/fill_mail/fill_mail'
            })
          }
          return data
        })
        .catch(error => console.error('failed to get user info, error: ' + error))
    })
  },

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch () {
    console.log(' ========== Application is launched ========== ')
  },
  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow () {
    console.log(' ========== Application is showed ========== ')
  },
  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide () {
    console.log(' ========== Application is hid ========== ')
  }
})
