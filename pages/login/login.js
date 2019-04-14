// pages/login/login.js
var util = require('../../utils/md5.js')

Page({
  data: {
    showTopTips: false,
    tips: '提示',
    password: '',
    userName: '',
    userNum: '',
    factoryName: '',
    // 显示loading..
    hide: true,
    isLogin: false
  },
  onLoad: function(options) {

    var isLogin = options.login
    //控制台输出
    console.debug("--isLogin--" + isLogin)
    if (isLogin == 1) {
      // var shopName = wx.getStorageSync('storeName') || ''
      // var shopNum = wx.getStorageSync('storeNum') || ''
      var factoryName = wx.getStorageSync('factoryName') || ''
      var userName = wx.getStorageSync('userName') || ''
      var userNum = wx.getStorageSync('userNum') || ''
      this.setData({
        isLogin: true,
        factoryName: factoryName,
        userName: userName,
        userNum: userNum
      })
    } else {
      this.setData({
        isLogin: false
      })
    }

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  usernameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录提交
  submit: function(e) {
    var that = this
    var passwordMd5 = ''
    if (that.data.userName === "" || that.data.userName === null || that.data.password === "" || that.data.password === null) {

      that.setData({
        showTopTips: true,
        tips: '用户名或密码不能为空'
      })

      return false;
    } else {
      that.setData({
        showTopTips: false,
        hide: false,
      })

      wx.login({
        success: function(res) {
          // 密码MD5加密
          passwordMd5 = util.hexMD5(that.data.password);
          var wxcode = res.code
          wx.request({
            url: getApp().globalData.host + 'login',
            header: {
              "Content-Type": "application/json"
            },
            method: "GET",
            data: {
              username: that.data.userName,
              password: passwordMd5,
              wxcode: wxcode
            },
            success: function(res) {
              that.setData({
                hide: true
              })
              if (res.data.status === 1) {
                wx.setStorageSync('userUuid', res.data.data.userUuid),
                  wx.setStorageSync('userName', res.data.data.userName),
                  wx.setStorageSync('userNum', res.data.data.userNum),
                  wx.setStorageSync('factoryUuid', res.data.data.factoryUuid)
                wx.setStorageSync('factoryName', res.data.data.factoryName)


              } else {
                // 失败提示
                that.setData({
                  showTopTips: true,
                  tips: res.data.msg
                })
              }
            }
          })
        }
      })
    }
  },

  logout: function(e) {
    wx.setStorageSync('userUuid', ''),
      wx.setStorageSync('userName', ''),
      wx.setStorageSync('userNum', ''),
      wx.setStorageSync('factoryName', ''),
      wx.setStorageSync('factoryUuid', ''),

      wx.navigateBack({
        delta: getCurrentPages().length - 1, // 回退前 delta(默认为1) 页面
        success: function(res) {
          // success
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
  },

  goBack() {
    wx.navigateBack({

    })
  }

})