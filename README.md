### 1.1创建第一个小程序
新建项目选择小程序项目，选择代码存放的硬盘路径，填入刚刚申请到的小程序的 AppID，给你的项目起一个好听的名字，最后，勾选 "创建 QuickStart 项目"（如有）。

![image](http://youdao.mikezz.cn/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20190414225359.png)

### 2小程序代码构成

这个项目里边生成了不同类型的文件:

1. .json 后缀的 JSON 配置文件
2. .wxml 后缀的 WXML 模板文件
3. .wxss 后缀的 WXSS 样式文件
4. .js 后缀的 JS 脚本逻辑文件

### 2.1 JSON配置
app.json 是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。QuickStart 项目里边的 app.json 配置内容如下：

```
{
  "pages": ["pages/index/index", "pages/logs/logs"],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle": "black"
  }
}
```

### 2.1 WXML
从事过网页编程的人知道，网页编程采用的是 HTML + CSS + JS 这样的组合，其中 HTML 是用来描述当前这个页面的结构，CSS 用来描述页面的样子，JS 通常是用来处理这个页面和用户的交互。

同样道理，在小程序中也有同样的角色，其中 WXML 充当的就是类似 HTML 的角色。打开 pages/index/index.wxml，你会看到以下的内容:
```
<view class="container">
  <view class="userinfo">
    <button wx:if="{{!hasUserInfo && canIUse}}">获取头像昵称</button>
    <block wx:else>
      <image src="{{userInfo.avatarUrl}}" background-size="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view>
```

### 2.2 WXSS 样式

WXSS 具有 CSS 大部分的特性，小程序在 WXSS 也做了一些扩充和修改。

1. 新增了尺寸单位。在写 CSS 样式时，开发者需要考虑到手机设备的屏幕会有不同的宽度和设备像素比，采用一些技巧来换算一些像素单位。WXSS 在底层支持新的尺寸单位 rpx ，开发者可以免去换算的烦恼，只要交给小程序底层来换算即可，由于换算采用的浮点数运算，所以运算结果会和预期结果有一点点偏差。

2. 提供了全局的样式和局部样式。和前边 app.json, page.json 的概念相同，你可以写一个 app.wxss 作为全局样式，会作用于当前小程序的所有页面，局部页面样式 page.wxss 仅对当前页面生效。

3. 此外 WXSS 仅支持部分 CSS 选择器

### 2.3 JS 逻辑交互
JS 脚本文件来处理用户的操作。
```
<view>{{ msg }}</view>
<button bindtap="clickMe">点击我</button>
```
点击 button 按钮的时候，我们希望把界面上 msg 显示成 "Hello World"，于是我们在 button 上声明一个属性: bindtap ，在 JS 文件里边声明了 clickMe 方法来响应这次点击操作：
```
Page({
  clickMe() {
    this.setData({msg: 'Hello World'})
  }
})
```
响应用户的操作就是这么简单，更详细的事件可以参考文档[ WXML - 事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html) 。

此外你还可以在 JS 中调用小程序提供的丰富的 API，利用这些 API 可以很方便的调起微信提供的能力，例如获取用户信息、本地存储、微信支付等。在前边的 QuickStart 例子中，在 pages/index/index.js 就调用了 wx.getUserInfo 获取微信用户的头像和昵称，最后通过 setData 把获取到的信息显示到界面上。更多 API 可以参考文档 [小程序的API](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html) 。

### 3.1 Tab
修改app.json，为小程序添加一个tab。
```
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs",
    "pages/login/login"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  },
  "tabBar": {
    "color": "#aaa",
    "selectedColor": "#262626",
    "list": [
      {
        "text": "首页",
        "pagePath": "pages/index/index",
        "iconPath": "images/icon_house_alt.png",
        "selectedIconPath": "images/icon_house.png"
      },
      {
        "text": "登录",
        "pagePath": "pages/login/login",
        "iconPath": "images/icon_documents_alt.png",
        "selectedIconPath": "images/icon_documents.png"
      }
      
    ]
  }
}

```

在程序根目录新建图片资源文件夹，并放入所需图片文件。
重新编译项目，将会自动生成pages/login/文件夹，并生成login.wxml，login.js，login.json，login.wxss文件

### 3.2 登录页
分别编辑文件如下：
login.wxml
```
<!--pages/login/login.wxml-->
<view class="page" xmlns:wx="http://www.w3.org/1999/xhtml">
  <view class="page__bd">

    <view class="weui-toptips weui-toptips_warn" wx:if="{{showTopTips}}">{{tips}}</view>
    <loading hidden="{{hide}}">加载中...</loading>

    <block wx:if="{{!isLogin}}">
      <view class="weui-cells__title">登录</view>
      <view class="weui-cells weui-cells_after-title">
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">账号</view>
          </view>
          <view class="weui-cell__bd">
            <input class="weui-input" placeholder="输入账号" value="{{username}}" bindinput="usernameInput" />
          </view>
        </view>
        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">密码</view>
          </view>
          <view class="weui-cell__bd">
            <input class="weui-input" type="password" placeholder="输入密码" bindinput="passwordInput" />
          </view>
        </view>
      </view>
      <view class="weui-cells__tips">请使用管理员为您分配的账号和密码进行绑定</view>

      <view class="weui-btn-area">
        <button class="weui-btn" type="primary" bindtap="submit">确定</button>
      </view>
    </block>

    <block wx:if="{{isLogin}}">
      <view class="weui-cells__title">账号信息</view>
      <view class="weui-cells weui-cells_after-title">

        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">工厂名称</view>
          </view>
          <view class="weui-cell__bd">
            <input class="weui-input" disabled="true" value="{{factoryName}}" />
          </view>
        </view>



        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">用户账号</view>
          </view>
          <view class="weui-cell__bd">
            <input class="weui-input" disabled="true" value="{{userNum}}" />
          </view>
        </view>

        <view class="weui-cell weui-cell_input">
          <view class="weui-cell__hd">
            <view class="weui-label">用户名称</view>
          </view>
          <view class="weui-cell__bd">
            <input class="weui-input" disabled="true" value="{{userName}}" />
          </view>
        </view>

      </view>
      <!--<view class="weui-cells__tips">请使用管理员为您分配的账号和密码进行登录</view>-->
      <view class="weui-btn-area">
        <button class="weui-btn" type="warn" bindtap="logout">退出登录</button>

        <button class="weui-btn" type="default" bindtap="goBack">返回</button>
      </view>
    </block>
  </view>
</view>
```

login.js
```
// pages/login/login.js
var util = require('../../utils/md5.js')

Page({
  data: {
    showTopTips: false,
    tips: '提示',
    password: '',
    userName: '',
    userNum: '',
    factoryName: '',
    // 显示loading..
    hide: true,
    isLogin: false
  },
  onLoad: function(options) {

    var isLogin = options.login
    //控制台输出
    console.debug("--isLogin--" + isLogin)
    if (isLogin == 1) {
      // var shopName = wx.getStorageSync('storeName') || ''
      // var shopNum = wx.getStorageSync('storeNum') || ''
      var factoryName = wx.getStorageSync('factoryName') || ''
      var userName = wx.getStorageSync('userName') || ''
      var userNum = wx.getStorageSync('userNum') || ''
      this.setData({
        isLogin: true,
        factoryName: factoryName,
        userName: userName,
        userNum: userNum
      })
    } else {
      this.setData({
        isLogin: false
      })
    }

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  usernameInput: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录提交
  submit: function(e) {
    var that = this
    var passwordMd5 = ''
    if (that.data.userName === "" || that.data.userName === null || that.data.password === "" || that.data.password === null) {

      that.setData({
        showTopTips: true,
        tips: '用户名或密码不能为空'
      })

      return false;
    } else {
      that.setData({
        showTopTips: false,
        hide: false,
      })

      wx.login({
        success: function(res) {
          // 密码MD5加密
          passwordMd5 = util.hexMD5(that.data.password);
          var wxcode = res.code
          wx.request({
            url: getApp().globalData.host + 'login',
            header: {
              "Content-Type": "application/json"
            },
            method: "GET",
            data: {
              username: that.data.userName,
              password: passwordMd5,
              wxcode: wxcode
            },
            success: function(res) {
              that.setData({
                hide: true
              })
              if (res.data.status === 1) {
                wx.setStorageSync('userUuid', res.data.data.userUuid),
                  wx.setStorageSync('userName', res.data.data.userName),
                  wx.setStorageSync('userNum', res.data.data.userNum),
                  wx.setStorageSync('factoryUuid', res.data.data.factoryUuid)
                wx.setStorageSync('factoryName', res.data.data.factoryName)


              } else {
                // 失败提示
                that.setData({
                  showTopTips: true,
                  tips: res.data.msg
                })
              }
            }
          })
        }
      })
    }
  },

  logout: function(e) {
    wx.setStorageSync('userUuid', ''),
      wx.setStorageSync('userName', ''),
      wx.setStorageSync('userNum', ''),
      wx.setStorageSync('factoryName', ''),
      wx.setStorageSync('factoryUuid', ''),

      wx.navigateBack({
        delta: getCurrentPages().length - 1, // 回退前 delta(默认为1) 页面
        success: function(res) {
          // success
        },
        fail: function(res) {
          // fail
        },
        complete: function(res) {
          // complete
        }
      })
  },

  goBack() {
    wx.navigateBack({

    })
  }

})
```

修改app.wxss
```

/**app.wxss**/
@import 'style/weui.wxss';

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
} 

page{
    background-color: #F8F8F8;
    font-size: 16px;
    font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
}
.page__hd {
    padding: 40px;
}
.page__bd {
    padding-bottom: 40px;
}
.page__bd_spacing {
    padding-left: 15px;
    padding-right: 15px;
}

.page__ft{
    padding-bottom: 10px;
    text-align: center;
}

.page__title {
    text-align: left;
    font-size: 20px;
    font-weight: 400;
}

.page__desc {
    margin-top: 5px;
    color: #888888;
    text-align: left;
    font-size: 14px;
}

```
