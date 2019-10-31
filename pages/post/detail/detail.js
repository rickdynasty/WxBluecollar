// pages/post/detail/detail.js
import { DBPost } from '../../../data/DBPost.js';

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
    // 注意这里的id变量是post.js启动detail页面的时候指定的
    var postId = options.id;
    this.dbPost = new DBPost();
    this.postData = this.dbPost.getPostItemById(postId).data;
    this.setData({
      post: this.postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("post Detail onReady!");
    wx.setNavigationBarTitle({
      title: this.postData.title,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("post Detail onShow!")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("post Detail onHide!")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("post Detail onUnload!")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})