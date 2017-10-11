// pages/paper/paperDetail/paperDetail.js
var app = getApp()
var con = require('../../../utils/util.js')
var WxParse = require("../../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: con.getBox,
      data: {
        wxappid: con.wyy_user_wxappid,
        id: options.id
      },
      method: "GET",
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        that.setData({
          paperDetail: res.data.errMsg
        })
        console.log(res.data.errMsg)
        WxParse.wxParse('content', 'html', res.data.errMsg.content, that, 5)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})