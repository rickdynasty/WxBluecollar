// pages/start/welcome.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
    * 微信提供了3中页面跳转姿势
    * wx.redirectTo  //跳转到新页面，并关闭当前页面
    * wx.navigationTo  //跳转到新页面，保留当前页面【注意：小程序最多允许5层页面】
    * wx.switchTab //只能跳转带TabBar的页面，并关闭其他所有非TabBar的页面
    * 
    * 每种跳转都带有3个回调，如下：
    */
  onStartPost: function (event) {
    wx.switchTab({
      url: '../post/post',

      success: function () {
        console.log("Start Post page Success！")
      },

      fail: function () {
        console.log("Start Post page Failed！")
      },

      complete: function () {
        console.log("Start Post page Completed！")
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("welcome page is onLoad！")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("welcome page is onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("welcome page is onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("welcome page is onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("welcome page is onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("welcome page is onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("welcome page is onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("welcome page is onShareAppMessage")
  },

})