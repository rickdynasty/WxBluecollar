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
    var iceCreamData={
        object: {
          date: "October 29 2019"
        },
        title: "小时候的冰棍和雪糕",
        postImg: "/images/post/post-4.jpg",
        avatar: "/images/avatar/avatar-5.png",
        content: "冰棍和雪糕绝对不是同一个东西,冰棒： 有木棒支撑的，大多是纯冰里含点果汁，吮吸后便会失去甜味和口味，剩下白冰，较为廉价;雪糕：大多是碗装的，里面是黏体，需要汤勺取出，才你食用。",
        readingNum: 92,
        collectionNum: {
          array: [108]
        },
        commentNum: 7,
      }

      this.setData({
        postData:iceCreamData
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * Note:在这里settitle,会发现界面有闪烁——刷新，因此不建议这样操作，这里仅仅是demo测试一下
   */
  onReady: function () {
    /*this.setData({
        title:"一根雪糕的经济原理"
      })*/
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