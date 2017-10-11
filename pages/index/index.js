//index.js
//获取应用实例
var app = getApp()
var con = require("../../utils/util.js")
Page({
  data: {
    audioList:[],
    audioIndex: 0,
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: con.getIndex,
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
  goToPlayView: function(e){
    var id = e.currentTarget.dataset.id;
    var that = this
    wx.request({
      url: con.addPlaynum,
      data: { wxappid: con.wyy_user_wxappid, id:id },
      method: 'GET',
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        that.setData({
          contact: res.data
        })
        console.log(res.data);
      }
    });
    var a = e.currentTarget.id;
    console.log(a);
    this.setData({
      audioIndex: parseInt(e.currentTarget.id, 10),
      listShow: false
    })
    wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10))
    wx.navigateTo({
      url: '../play/play?audioIndex=' + a ,
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  }
})
