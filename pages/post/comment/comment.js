// pages/post/comment/comment.js
import { DBPost } from '../../../data/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 注意这里的id变量是post.js启动detail页面的时候指定的
    this.postId = options.id;
    this.dbPost = new DBPost();
    var comments = this.dbPost.getCommentData(this.postId);
    // 绑定评论数据
    this.setData({
      comments: comments
    });
    console.log(comments);
  },

  //预览图片
  previewImg: function (event) {
    //获取评论索引
    var commentIdx = event.currentTarget.dataset.commentIdx,
      //获取图片索引
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论图片
      imgs = this.data.comments[commentIdx].content.img;

    wx.previewImage({
      // urls: imgs, // 注意：这里需要填写预览的图片http链接列表，这个api不能显示本地的
      urls: ['http://img.redocn.com/sheying/20150915/lvpihuochechexiang_4962316_small.jpg', ],
      current: imgs[imgIdx], // 当前显示图片的http链接
    })
  },

  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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