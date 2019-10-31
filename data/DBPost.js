class DBPost{
  constructor() {
    this.storageKeyName = 'postList';
  }

  //获取指定id号的文章数据
  getPostItemById(id) {
    var postsData = this.getAllPostData();
    var len = postsData.length;
    for (var i = 0; i < len; i++) {
      if (postsData[i].postId == id) {
        return {
          index: i,
          data: postsData[i]
        }
      }
    }
  }

  /*得到全部文章信息*/
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/defaultdata.js').postList;
      this.initPostList(res);
    }
    return res;
  }

  //本地缓存，保存/更新
  initPostList(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }
};

export { DBPost }