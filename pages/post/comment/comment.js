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
    var comts = this.dbPost.getCommentData(this.postId);
    // 绑定评论数据
    this.setData({
      comments: comts
    });
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

  //获取用户输入
  bindCommentInput:function(event){
    //保存输入内容
    this.data.keyboardInputValue = event.detail.value;
  },

  submitComment:function(event){
    //如果没有输入内容，就不执行任何操作
    if (!this.data.keyboardInputValue) {
      wx.showToast({
        title: '请输入评论内容',
        duration:800,
        icon:'none'
      })
      return;
    }

    //构建一条评论：注意这里出评论内容其他都是硬编码方式
    var newComment = {
      username: "成领",
      avatar: "/images/avatar/avatar-6.png",
      create_time: new Date().getTime() / 1000,   //评论时间
      //评论内容
      content:{
        txt: this.data.keyboardInputValue,
      }
    };
    console.log("create_time is " + newComment.create_time);

    //保存评论到数据库中,同时返回当前postData[评论只是post里面的一个属性]
    this.dbPost.newComment(this.postId, newComment);
    //显示结果
    wx.showToast({
      title: '评论成功',
      duration:1000,
      icon:"success",
    })

    //从数据库中获取最新的评论内容，重新绑定数据刷新界面，同时充值输入状态
    var commts = this.dbPost.getCommentData(this.postId);
    this.setData({
      comments: commts,
      keyboardInputValue: '',
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