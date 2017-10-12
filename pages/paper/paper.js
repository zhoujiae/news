var app = getApp()
var con = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Dbaozhi: [],
    date: '2017-10-10',
    // 滑块数据
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    // 控制显示隐藏
    showHide: false,
    // 存储版面
    array: [],
    index: 0
  },
  // 点击显示盒子
  showBox: function () {
    var that = this;
    that.setData({
      showHide: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: con.getBao,
      data: { wxappid: con.wyy_user_wxappid },
      method: "GET",
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        console.log("当前日期报纸数据", res.data.errMsg);
        var length = res.data.errMsg.length
        var namearr = []
        console.log("数组长度", length)
        for (var i = 0; i < length; i++) {
          namearr.push(res.data.errMsg[i].banmian_name)
        }
        console.log(namearr)
        that.setData({
          Dbaozhi: res.data.errMsg,
          array: namearr
        })
      }
    })
  },
  // 页面展示改变盒子状态
  onShow: function () {
    var that = this;
    that.setData({
      showHide: false
    })
  },
  // formSubmit: function (e) {
  //   console.log(e.detail.value.newsDate)
  // },
  // 日期发生改变
  bindDateChange: function (e) {
    console.log('picker日期发送选择改变，当前日期为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    var that = this
    wx.request({
      url: con.getBao,
      data: {
        wxappid: con.wyy_user_wxappid,
        addtime: e.detail.value
      },
      method: "GET",
      header: {
        "Content-Type": 'application/json'
      },
      success: function (res) {
        var length = res.data.errMsg.length
        var namearr = []
        console.log("数组长度", length)
        for (var i = 0; i < length; i++) {
          namearr.push(res.data.errMsg[i].banmian_name)
        }
        console.log(namearr)
        that.setData({
          Dbaozhi: res.data.errMsg,
          array: namearr
        })
        console.log("往期报纸数据", res);
      }
    })
  },
  // 版面改变
  bindPickerChange: function (e) {
    console.log('picker版面选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 跳转详情
  go_paperDetail: function (e) {
    // 改变盒子样式
    var that = this;
    that.setData({
      showHide: true
    })
    var id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 200)
    setTimeout(function () {
      wx.navigateTo({
        url: 'paperDetail/paperDetail?id=' + id,
      })
    }, 300)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})