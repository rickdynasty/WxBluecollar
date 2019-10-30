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
    }else{
      console.log("storageData has get from Storage！");
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  //当小程序启动，或从后台进入前台显示，会触发onShadow
  onShow: function (options) {
    console.log("App onShow!")
  },

  //当小程序从前台进入后台，会触发onHide
  onHide:function(){
    console.log("App onHide!")
  },

  //当小程序发生脚本错误，后者API调用失败时，会触发onError并带上错误信息
  onError:function(errMsg){
    console.log("App onError!,error msg is:", errMsg)
  },

  globalData: {
    userInfo: null
  }
})