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
    this.postId = options.id;
    this.dbPost = new DBPost();
    this.postData = this.dbPost.getPostItemById(this.postId).data;

    this.setData({
      post: this.postData
    })
  },

  onCollectionTap: function (event) {
    //dbPost对象已经在onLoad函数里被保存到了this变量中，无须再次实例化
    var newData = this.dbPost.collect(this.postId);

    //重新绑定数据。注意，不要将整个newData全部作为setData的参数，应当有选择的更新部分数据
    this.setData({
      'post.collectionStatus':newData.collectionStatus,
      'post.collectionNum':newData.collectionNum
    })

    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  onUpTap: function (event) {
    //dbPost对象已经在onLoad函数里被保存到了this变量中，无须再次实例化
    var newData = this.dbPost.up(this.postId);

    //重新绑定数据。注意，不要将整个newData全部作为setData的参数，应当有选择的更新部分数据
    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum
    })

    wx.showToast({
      title: newData.upStatus ? "点赞成功" : "取消点赞",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("post Detail onReady!");
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
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