class DBPost{
  constructor(url){
    this.storageKeyName = 'postList';
  }

  getAllPostData(){
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      console.log("缓存为空~其实就有点奇怪，不是在app.js里面做了初始化么？？？");
      res = require('../data/defaultdata.js'.postList);
      this.initPostList(res);
    }

    return res;
  }

  //本地缓存，保存/更新
  initPostList(data){
    wx.setStorageSync(this.storageKeyName, data)
  }
};

export {DBPost}