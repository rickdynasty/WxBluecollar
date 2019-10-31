// 通过require引用js模块【通过require得到的是一个object而不是直接得到里面的内容】，需要注意几点
// 1、要带后缀
// 2、不可以是绝对路径
// 3、在JavaScript文件中申明的变量和函数只在该文件中有效，不同的文件可以申明相同的变量和函数，不会相互影响
//var dataObj = require("../../data/data.js");
// require只是模块化的一种，还可以使用ES6的Module来编写模块。【开发工具默认使用label将ES6代码转化成ES5代码】

import { DBPost } from '../../data/DBPost';

// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbPost = new DBPost();
      this.setData({
        postList: dbPost.getAllPostData()
      })
  },

  onTapToDetail(event){
    var postId = event.currentTarget.dataset.postId;
    console.log("onTapToDetail postId is "+postId);

    wx.navigateTo({
      url: 'detail/detail?id='+postId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("post page is onReady")
    wx.setNavigationBarTitle({
      title: '文章列表',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("post page is onShow")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("post page is onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("post page is onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("post page is onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("post page is onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("post page is onShareAppMessage")
  }
})