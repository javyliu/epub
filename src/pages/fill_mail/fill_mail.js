// 获取全局应用程序实例对象
const app = getApp()
const wechat = require('../../utils/wechat')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '邮箱',
    userInfo: {}
  },
  form_submit: function (e) {
    wechat.fetchApi('account/fill_email', Object.assign({token: app.data.userInfo.token },e.detail.value), 'POST')
    .then(function(res){
      if(res.data.code == 'ok'){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.setData({ userInfo: app.data.userInfo })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    // TODO: onPullDownRefresh
  }
})
