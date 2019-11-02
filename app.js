//app.js 注册微信小程序应用
App({
  //小程序初始化完成时触发onLaunch
  onLaunch: function (options) {
    console.log("App onLaunch! opt is :", options)
    // 展示本地存储能力
    /*var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)*/
    
    // 这里的操作仅仅是做一次default数据的初始化，这样在要使用的地方不用耗时加载
    var storageData = wx.getStorageSync('postList');
    if (!storageData) {
      console.log("storageData is null");
      var dataObj = require("/data/defaultdata.js");
      //wx.clearStorageSync();
      wx.removeStorageSync('postList')
      wx.setStorageSync('postList', dataObj.postList);
    } else {
      console.log("storageData has get from Storage！");
    }

    this.getUserInfo();
  },

  getUserInfo: function () {
    var userInfoStorage = wx.getStorageSync('user');
    if (!userInfoStorage) {
      var that = this;
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.globalData.userInfo = res.userInfo
              wx.setStorageSync('user', res.userInfo)
            },
            fail: function (res) {
              console.log(" " + res);
            }
          })
        }
      })
    } else {
      this.globalData.userInfo = userInfoStorage;
    }
  },

  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://api.douban.com",
    userInfo: null
  }

})