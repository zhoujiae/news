//index.js
//获取应用实例
var app = getApp()
var con = require("../../utils/util.js")
Page({
  data: {
    audioList: [],
    audioIndex: 0,
    pauseStatus: true,
    timer: '',
    currentPosition: 0,
    duration: 0,
  },
  onLoad: function (options) {
    // console.log('onLoad')
    // console.log(11, this.data.audioList.length)
    //  获取本地存储存储audioIndex
    // var audioIndexStorage = wx.getStorageSync('audioIndex')
    // console.log(22, audioIndexStorage);
    var audioIndexStorage = options.audioIndex;
    let that = this
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
    setTimeout(() => {
      that.play();
      that.bindTapPlay()
    }, 1000)
    if (audioIndexStorage) {
      this.setData({ audioIndex: audioIndexStorage });
    }
  },
  onReady: function (e) {
    console.log('onReady')
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('audio')
  },
  bindSliderchange: function (e) {
    // clearInterval(this.data.timer)
    let value = e.detail.value
    console.log(value)
    let that = this
    console.log(e.detail.value)
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        let {status, duration} = res
        console.log(status, duration)
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          })
          console.log(duration)
        }
      }
    })
  },
  bindTapPrev: function () {
    console.log('bindTapPrev')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    // 如果当前是第一首,点击上一曲切换到最后一首
    if (audioIndexPrev <= 0) {
      console.log('if', audioIndexPrev)
      audioIndexNow = length - 1
      console.log(audioIndexNow)
    } else {
      console.log("else", audioIndexPrev)
      audioIndexNow = audioIndexPrev - 1
      console.log(audioIndexNow)
    }
    console.log(audioIndexNow)
    // 重置滑块数据
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev 
    console.log(audioIndexNow, audioIndexPrev, length)
    // 如果当前是最后一首,点击下一曲切换到第一首
    if (audioIndexPrev == length - 1) {
      console.log('if', audioIndexPrev)
      audioIndexNow = 0
      console.log(audioIndexNow)
    } else {
      console.log('else', audioIndexPrev)
      audioIndexNow = (audioIndexPrev - 0) + 1
      console.log(audioIndexNow)
    }
    console.log(audioIndexNow)
    // 重置滑块数据
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  // 播放暂停切换
  bindTapPlay: function () {
    console.log('bindTapPlay')
    console.log(this.data.pauseStatus)
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({ pauseStatus: false })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({ pauseStatus: true })
    }
  },
  bindTapChoose: function (e) {
    console.log('bindTapChoose')
    console.log(e)
    this.setData({
      audioIndex: parseInt(e.currentTarget.id, 10),
      listShow: false
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('audioIndex', parseInt(e.currentTarget.id, 10))
  },
  // 播放赋值
  play() {
    console.log(9999, this.data.audioIndex)
    let {audioList, audioIndex} = this.data
    wx.playBackgroundAudio({
      dataUrl: audioList[this.data.audioIndex].musicurl,
      title: audioList[this.data.audioIndex].title,
      coverImgUrl: audioList[this.data.audioIndex].fengmian
    })
    let that = this
    let timer = setInterval(function () {
      that.setDuration(that)
    }, 1000)
    this.setData({ timer: timer })
  },
  // 滑块赋值事件
  setDuration(that) {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        // console.log(res)
        let {status, duration, currentPosition} = res
        if (status === 1 || status === 0) {
          that.setData({
            currentPosition: that.stotime(currentPosition),
            duration: that.stotime(duration),
            sliderValue: Math.floor(currentPosition * 100 / duration),
          })
          // 播放结束自动下一曲
          // if (that.stotime(currentPosition) == that.stotime(duration)) {
          //   that.bindTapNext();
          // }
        }
      }
    })
  },
  stotime: function (s) {
    let t = '';
    if (s > -1) {
      // let hour = Math.floor(s / 3600);
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      // if (hour < 10) {
      //   t = '0' + hour + ":";
      // } else {
      //   t = hour + ":";
      // }

      if (min < 10) { t += "0"; }
      t += min + ":";
      if (sec < 10) { t += "0"; }
      t += sec;
    }
    return t;
  },
  onShareAppMessage: function () {
    let that = this
    return {
      title: 'light轻音乐：' + that.data.audioList[that.data.audioIndex].name,
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '分享失败',
          icon: 'cancel',
          duration: 2000
        })
      }
    }
  }
})
