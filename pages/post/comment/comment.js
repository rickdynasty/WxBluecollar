// pages/post/comment/comment.js
import { DBPost } from '../../../data/DBPost.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //控制：键盘输入 | 语音输入，初始为键盘输入
    useKeyboardFlag: true,
    //控制：输入框内容，初始为空
    keyboardInputValue: '',
    //控制：显示图片选择面板，初始为不显示
    sendMoreMsgFlag: false,
    //选择的照片
    chooseFiles: [],
    //删除的图片索引
    deleteIndex: -1,
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
  },

  //预览图片
  previewImg: function (event) {
    //获取评论序号
    var commentIdx = event.currentTarget.dataset.commentIdx,
      //获取图片在图片数组中的序号
      imgIdx = event.currentTarget.dataset.imgIdx,
      //获取评论的全部图片
      imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx], // 当前显示图片的http链接
      urls: imgs // 需要预览的图片http链接列表
    })
  },

  //切换语音和键盘输入
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },

  // 获取用户输入
  bindCommentInput: function (event) {
    var val = event.detail.value;
    this.data.keyboardInputValue = val;
  },

  submitComment: function (event) {
    var imgs = this.data.chooseFiles;

    //如果没有输入内容，就不执行任何操作
    if (!this.data.keyboardInputValue && imgs.length === 0) {
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

    //保存评论到数据库中,同时返回当前postData[评论只是post里面的一个属性]
    this.dbPost.newComment(this.postId, newComment);
    //显示结果
    wx.showToast({
      title: '评论成功',
      duration:1000,
      icon:"success",
    })

    //从数据库中获取最新的评论内容，重新绑定数据刷新界面，同时充值输入状态
    var comments = this.dbPost.getCommentData(this.postId);
    // 绑定评论数据
    this.setData({
      comments: comments,
      keyboardInputValue: '',
      chooseFiles: [],
      sendMoreMsgFlag: false
    });
  },

  //显示 选择照片、拍照等按钮
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },

  //选择本地照片与拍照
  chooseImage: function (event) {
    // 已选择图片数组
    var imgArr = this.data.chooseFiles;
    //只能上传3张照片，包括拍照
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      return;
    }
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    console.log(leftCount)
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)
        });
      }
    })
  },

  //删除已经选择的图片
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex: index
    });
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      });
    }, 500)
  },

  //开始录音
  recordStart: function () {
    var that = this;
    this.setData({
      recodingClass: 'recoding'
    });
    this.startTime = new Date();
    wx.startRecord({
      success: function (res) {
        console.log('success');
        var diff = (that.endTime - that.startTime) / 1000;
        diff = Math.ceil(diff);

        //发送录音
        that.submitVoiceComment({ url: res.tempFilePath, timeLen: diff });
      },
      fail: function (res) {
        console.log('fail');
        console.log(res);
      },
      complete: function (res) {
        console.log('complete');
        console.log(res);
      }
    });
  },

  //结束录音
  recordEnd: function () {
    this.setData({
      recodingClass: ''
    });
    this.endTime = new Date();
    wx.stopRecord();
  },

  //提交录音 
  submitVoiceComment: function (audio) {
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-3.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: '',
        img: [],
        audio: audio
      },
    };

    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);

    //显示操作结果
    this.showCommitSuccessToast();

    //重新渲染并绑定所有评论
    this.bindCommentData();
  },

  playAudio: function (event) {
    var url = event.currentTarget.dataset.url,
      that = this;

    //暂停当前录音
    if (url == this.data.currentAudio) {
      wx.pauseVoice();
      this.data.currentAudio = ''
    }

    //播放录音
    else {
      this.data.currentAudio = url;
      wx.playVoice({
        filePath: url,
        complete: function () {
          //只有当录音播放完后才会执行
          that.data.currentAudio = '';
          console.log('complete')
        },
        success: function () {
          console.log('success')
        },
        fail: function () {
          console.log('fail')
        }
      });
    }
  }
})