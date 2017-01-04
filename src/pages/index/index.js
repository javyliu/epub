// 获取全局应用程序实例对象
const app = getApp()
const wechat = require('../../utils/wechat')

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '页面说明',
    userInfo: {},
    disabled: false,
    loading: false,
    book_sites: []


  },
  create_epub: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value,"全局数据", app.data)
    wechat.fetchApi('book/create_book', Object.assign({token: app.data.userInfo.token },e.detail.value), 'POST')
    .then(function(res){
      console.log("then 处理")
      if(res.data.code == 'ok'){
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      }else{
        wx.showToast({
          title: res.data.error,
          icon: 'success',
          duration: 2000
        })

      }
    }, function(res){
      console.log("then中的错误处理：", res)
    })
    .catch(error => console.error('报错:' + error))

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    // console.dir(app.data)
    app.getUserInfo()
      .then((info) => {
        return wechat.fetchApi('book/book_websites', {token: app.data.userInfo.token })
      })
      .then((res) => {
        this.setData({ book_sites: res.data})
      })
    //   .then((info) => {
    //     console.log("index 调用后", info)
    //     console.log("index 调用后 app 数据", app.data.userInfo)
    //     //this.setData({ userInfo: info })
    //   })
    //   .catch(console.info)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    console.log(' ---------- onReady ----------')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    console.log(' ---------- onShow ----------')
    //console.log(this.data.book_sites)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    console.log(' ---------- onHide ----------')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {
    console.log(' ---------- onUnload ----------')
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    //console.log(' ---------- onPullDownRefresh ----------')
  },
  onShareAppMessage: function () {
    return {
      title: '创建电子书',
      desc: '网页看书广告太多，把它们做成epub电子书在专门的app中看吧！',
      path: '/pages/index/index'
    }
  }

})
