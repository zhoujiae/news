//index.js
//获取应用实例
var app = getApp()
var con = require("../../utils/util.js")
Page({
  data: {
    audioList: [],
    audioIndex: 0,
    firstData: '',
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: con.getWenzhang,
      data: { wxappid: con.wyy_user_wxappid },
      method: 'GET',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        that.setData({
          audioList: res.data
        })
        console.log(res.data);
      }
    });
  },
  // 跳转文章详情
  go_lookDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 200)
    setTimeout(function () {
      wx.navigateTo({
        url: 'lookDetail/lookDetail?id=' + id,
      })
    }, 300)
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
})
