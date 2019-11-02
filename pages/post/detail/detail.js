// pages/post/detail/detail.js
import { DBPost } from '../../../data/DBPost.js';
var app = getApp();

Page({
  data: {
    isPlayingMusic: false
  },

  onLoad: function (options) {
    // 注意这里的id变量是post.js启动detail页面的时候指定的
    this.postId = options.id;
    this.dbPost = new DBPost();
    this.postData = this.dbPost.getPostItemById(this.postId).data;
    this.setData({
      post: this.postData
    })

    this.addReadingTimes();
    this.setMusicMonitor();
    this.initMusicStatus();
    this.setAniation();
  },

  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.postData.title
    })
  },

  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })

    this.animationUp = animationUp
  },

  initMusicStatus() {
    console.log("initMusicStatus");
    if (app.globalData.g_isPlayingMusic &&
      app.globalData.g_currentMusicPostId === this.postId) {

      // 如果全局播放的音乐是当前文章的的音乐，才将图标状态设置为正在播放
      this.setData({
        isPlayingMusic: true
      })
    }
    else {
      this.setData({
        isPlayingMusic: false
      })
    }
  },

  onCollectionTap: function (event) {
    //dbPost对象已经在onLoad函数里被保存到了this变量中，无须再次实例化
    var newData = this.dbPost.collect(this.postId);

    //重新绑定数据。注意，不要将整个newData全部作为setData的参数，应当有选择的更新部分数据
    this.setData({
      'post.collectionStatus': newData.collectionStatus,
      'post.collectionNum': newData.collectionNum
    })

    // 交互反馈
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
    });

    wx.showToast({
      title: newData.upStatus ? "点赞成功" : "取消点赞",
      duration: 1000,
      icon: "success",
      mask: true
    })    

    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })

    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
  },

  onCommentTap: function (event) {
    wx.navigateTo({
      url: '../comment/comment?id=' + this.postId
    })
  },

  //阅读量+1
  addReadingTimes: function () {
    this.dbPost.addReadingTimes(this.postId);
  },

  onMusicTap: function (event) {
    const backgroundAudioManager = wx.getBackgroundAudioManager();

    if (this.data.isPlayingMusic) {
      console.log("onMusicTap to pause");
      backgroundAudioManager.pause();
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    } else {
      console.log("onMusicTap to paly:" + this.postData.music.url);
      backgroundAudioManager.title = this.postData.music.title
      backgroundAudioManager.epname = this.postData.music.title
      backgroundAudioManager.singer = this.postData.music.singer
      backgroundAudioManager.coverImgUrl = this.postData.music.url
      backgroundAudioManager.play();


      // wx.playBackgroundAudio({
      //   dataUrl: this.postData.music.url,
      //   title: this.postData.music.title,
      //   coverImgUrl: this.postData.music.coverImg,
      //   success:function(res){
      //     console.log("playBackgroundAudio success res is "+res);
      //   },

      //   fail: function (res) {
      //     console.log("playBackgroundAudio fail res is " + res);
      //   },

      //   complete: function (res) {
      //     console.log("playBackgroundAudio complete res is " + res);
      //   },
      // })

      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.postId;
    }
  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioStop(function () {
      console.log("setMusicMonitor::onBackgroundAudioStop");
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    });

    wx.onBackgroundAudioPlay(function (event) {
      console.log("setMusicMonitor::onBackgroundAudioPlay");
      // 只处理当前页面的音乐播放。
      if (app.globalData.g_currentMusicPostId === that.postId) {
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true;
    });

    wx.onBackgroundAudioPause(function () {
      console.log("setMusicMonitor::onBackgroundAudioPause");
      // 只处理当前页面的音乐暂停。
      if (app.globalData.g_currentMusicPostId == that.postId) {
        that.setData({
          isPlayingMusic: false
        })
      }
      app.globalData.g_isPlayingMusic = false;
    });
  },

  onShareAppMessage: function () {
    return {
      title: this.postData.title,
      desc: this.postData.content,
      path: "/pages/post/post-detail/post-detail"
    }
  },
})