import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data:{
    scrollBoxHeight:'',
      userMsgValue:'',
      messageList:[],
      boxTop:999999,
      flag:true
    
  },
  onScroll(e){
    this.setData({
      boxTop:e.detail.scrollTop
    })
  },
 async getInfo(){
   if(!this.data.flag){
     return
   }
   this.setData({
     flag:false
   })
   let arr = []
   for(var i=0;i<this.data.messageList.length;i++){
    arr.push(this.data.messageList[i])
  }
   arr.push({ role: "user", content:'```'+this.data.userMsgValue+'```'})
   this.setData({
    messageList:arr,
    userMsgValue:''
   }) 
   this.setData({
    boxTop:this.data.boxTop+99999
  })
// 提示
wx.showLoading({
  title: '思考中...',
})
  // 设置参数
  const params ={
              model: "gpt-3.5-turbo",
              messages: this.data.messageList
          }
  const res =await wx.$http.post('/v1/chat/completions',params)
  console.log(res);
  let newArr = []
  for(var j=0;j<this.data.messageList.length;j++){
    newArr.push(this.data.messageList[j]) 
  }
  newArr.push(res.data.choices[0].message)
  this.setData({
    messageList:newArr
   })
   wx.hideLoading()
  //  操作scroll-view滚动条,令Ai回答贴顶
   this.setData({
    boxTop:this.data.boxTop+this.data.scrollBoxHeight
  })
  // 限制请求未结束禁止下一次请求
  this.setData({
    flag:true
  })
 },
//  清空历史
clearHistory(){
  Dialog.confirm({
    title: '警告',
    message: '您即将开启新的对话！',
    overlay:false,
    customStyle:'border:1px solid rgba(128,128,128,0.4);color: black;'
  })
    .then(() => {
      // on confirm
      this.setData({
        messageList:[]
      })
    })
    .catch(() => {
      // on cancel
      // console.log('取消');
    });
},
onLoad(){
    this.setData({
    scrollBoxHeight:wx.getSystemInfoSync().windowHeight-95
    })
}

})
