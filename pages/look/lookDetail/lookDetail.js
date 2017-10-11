//index.js
//获取应用实例
var app = getApp()
var con = require("../../../utils/util.js")
var WxParse = require("../../../wxParse/wxParse.js");
Page({
  data: {
    lookdetail: {}
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: con.getLookid,
      data: { wxappid: con.wyy_user_wxappid, id:options.id },
      method: 'GET',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        that.setData({
          lookdetail: res.data
        })
        console.log(res.data);
        WxParse.wxParse('content', 'html', res.data.content, that, 5)
      }
    });
    
  },
  // 图片自适应宽高
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;    //计算的高度值
    var image = this.data.images;
    //存储图片的宽高值
    image = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  }
})
