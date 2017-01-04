const Promise = require('./bluebird')
const ApiPath = 'https://api.pipgame.com/api/v1/'

function login () {
  return new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject })
  })
}

function getUserInfo () {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({ success: resolve, fail: reject })
  })
}

function fetchApi (path,data,method = 'GET') {
  return new Promise((resolve, reject) => {
    console.log('fetch path:',path)
    wx.request({
      url: ApiPath + path,
      header: { 'content-type': 'application/json' },
      method: method,
      data: data,
      success: resolve,
      fail: reject
    })
  })

}

module.exports = { login, getUserInfo, fetchApi }



