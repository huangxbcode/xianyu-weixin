var app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // userInfo:null,
    //判断用户是否授权 来决定是否显示登陆按钮
    isUser: false,
    userInfoForSql:null
  },
 

  bindGetUserInfo: function (e) {
    var that = this 
    console.log(e.detail.userInfo)
    var userInfo = e.detail.userInfo
    if(app.data.openid!=null){
      wx.request({
        //检测此openid是否注册
        url: app.data.apiUrl + '/user/openid/' + app.data.openid,
        method: 'GET',
        success: function (res) {
          //假如此账号未注册
          if (res.data.data == null) {
            wx.request({
              url: app.data.apiUrl + '/user/',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                username: userInfo.nickName,
                password: '',
                qq: '',
                email: '',
                goodsNum: 0,
                power: 0,
                status: 0,
                userImg: userInfo.avatarUrl,
                phone: '',
                openid: app.data.openid
              },
              success: function (res) {
                console.log("post后返回的数据" + res.data.msg + res.data.data.username)
              }
            })
          }else{
            //账号已注册 将信息传入userInfoSql
            that.setData({
              userInfoForSql:res.data.data,
              isUser: true,
            })
            // app.data.userInfo = res.data.data
            console.log(that.data.userInfoForSql)
          }
        }
      })
    }
  },
})