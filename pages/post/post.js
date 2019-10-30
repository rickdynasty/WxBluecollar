// 通过require引用js模块【通过require得到的是一个object而不是直接得到里面的内容】，需要注意几点
// 1、要带后缀
// 2、不可以是绝对路径
// 3、在JavaScript文件中申明的变量和函数只在该文件中有效，不同的文件可以申明相同的变量和函数，不会相互影响
var dataObj = require("../../data/data.js");
// require只是模块化的一种，还可以使用ES6的Module来编写模块。【开发工具默认使用label将ES6代码转化成ES5代码】

// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*object:{
      date:"29 2019"
    },
    title:"冰棍和雪糕",
    postImg: "/images/post/post-4.jpg",
    avatar:"/images/avatar/avatar-5.png",
    content:"冰棒： 有木棒支撑的，大多是纯冰里含点果汁，吮吸后便会失去甜味和口味，剩下白冰，较为廉价;雪糕：大多是碗装的，里面是黏体，需要汤勺取出，才你食用。",
    readingNum:92,
    collectionNum:{
      array:[108]
    },
    commentNum:7,*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        postList: dataObj.postList
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * Note:在这里settitle,会发现界面有闪烁——刷新，因此不建议这样操作，这里仅仅是demo测试一下
   */
  onReady: function () {
    console.log("post page is onReady")
    /*this.setData({
        title:"一根雪糕的经济原理"
      })*/
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