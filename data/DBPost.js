var util = require('../util/util.js')

class DBPost{
  constructor() {
    this.storageKeyName = 'postList';
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

  getCommentData(id){
    var itemData = this.getPostItemById(id).data;

    //将评论按时间降序排列
    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length, comment;

    for(var i=0; i< len;i++){
      //将comment中的时间戳转换成可阅读的格式
      comment=itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time,true);
    }

    return itemData.comments;
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

  compareWithTime(val1, val2){
    var flag = parseFloat(val1.create_time)-parseFloat(val2.create_time);
    if( flag < 0){
      return 1;
    } else if (0 < flag){
      return -1;
    } else {
      return 0;
    }
  }
};

export { DBPost }