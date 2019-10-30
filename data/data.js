var postList = [{
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
},
{
  object: {
    date: "October 29 2019"
  },
  title: "从童年呼啸而过的火车",
  postImg: "/images/post/post-5.jpg",
  avatar: "/images/avatar/avatar-1.png",
  content: "呼啸而过的火车我家以前住在城乡结合部那里常有火车经过。站在阳台上可以望见蜿蜒曲折的铁轨一直伸向远方尤其是在阳光明媚的午后躺在铁轨下的石子闪烁...",
  readingNum: 82,
  collectionNum: {
    array: [106]
  },
  commentNum: 7,
},
{
  object: {
    date: "October 29 2019"
  },
  title: "记忆里的春节",
  postImg: "/images/post/post-1.jpg",
  avatar: "/images/avatar/avatar-2.png",
  content: "记忆中，除夕夜一家人围坐在一起高兴地吃团圆饭，晚上可以心情地进行各种各样的活动，还能把一串鞭炮一个一个拆下来，跑到外边一个一个地点燃，发出噼里啪啦的声音。村子里的鞭炮整夜不停，此起彼伏。深夜，鞭炮声突然急骤起来，左邻右舍都像听到号令一样点燃爆竹，年，一下子就来了！于是，孩子们便互相牵着手冲进夜色中，挨家挨户的敲门拜年，转遍整个村庄，目的却只有一个：趁着混乱和喜气要到多多的红包。小孩子们都有收获，每人口袋中都装满了糖果，口袋装满了就再跑回家藏起来，然后继续拜年。",
  readingNum: 90,
  collectionNum: {
    array: [128]
  },
  commentNum: 7,
}]

//通过module.exports来向外暴露接口：将postList作为一个object的属性赋值给module.exports
module.exports={
  postList:postList,
}