class DBPost{
  constructor() {
    this.storageKeyName = 'postList';
  }

  //获取指定id号的文章数据
  getPostItemById(id) {
    this.cacheId = id;
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
      this.execSetStorageSync(res);
    }
    return res;
  }

  //本地缓存，保存/更新
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }
  
  //收藏文章
  collect(id){
    return this.updatePostData(id,'collect');
  }

  //点赞或取消点赞
  up(id){
    return this.updatePostData(id, 'up');
  }

  //更新本地的点赞、评论信息、收藏、阅读量
  updatePostData(id, category){
    var itemData = this.getPostItemById(id), postData = itemData.data, allPostData = this.getAllPostData();

    switch (category){
      case 'collect':
        //处理收藏
        if(!postData.collectionStatus){
          //如果当前是未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        } else {
          //如果当前是收藏
          postData.collectionNum--; 
          postData.collectionStatus = false;
        }
        break;
      case 'up':
        if(!postData.upStatus){
          postData.upNum++;
          postData.upStatus = true;
        } else {
          postData.upNum--;
          postData.upStatus = false;
        }
        break;
      default:
        break;
    }

    //更新缓存数据
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);

    return postData;
  }
};

export { DBPost }