function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var WYY_HOST_URL = "https://wxapi.weiyunyi.com";
var type = "Baozhi";
module.exports = {
  formatTime: formatTime,
  wyy_host_api_url: WYY_HOST_URL,
  wyy_user_wxappid: "13",
  wyy_share_info: '',
  wyy_config_version: 'v',
  //命名规范 模块名_方法名
  //以下通用方法
  //用户登录slogin
  index_slogin: WYY_HOST_URL + "/Wap.php/Index/slogin",
  //错误日志errorLog 
  index_errorLog: WYY_HOST_URL + "/Wap.php/Index/errorLog",
  //获取分享信息 getShareInfo
  index_getShareInfo: WYY_HOST_URL + "/Wap.php/Index/getShareInfo",
  //获取用户菜单列表 getUserMenuList
  Index_getUserMenuList: WYY_HOST_URL + "/Wap.php/Index/getUserMenuList",
  //获取用户信息 getUserInfo
  Index_getUserInfo: WYY_HOST_URL + "/Wap.php/Index/getUserInfo",
  //编辑用户信息 editUserInfo
  Index_editUserInfo: WYY_HOST_URL + "/Wap.php/Index/editUserInfo",
  //获取用户支付日志 getUserPaylog
  Index_getUserPaylog: WYY_HOST_URL + "/Wap.php/Index/getUserPaylog",
  //创建支付数据 makePayData
  Index_makePayData: WYY_HOST_URL + "/Wap.php/Index/makePayData",

  ////以下新闻行业方法
  // 点击增加访问量
  addPlaynum: WYY_HOST_URL + "/Wap.php/" + type + "/addPlaynum",
  // 音乐列表
  getIndex: WYY_HOST_URL + "/Wap.php/" + type + "/getIndex",
  // 文章列表
  getWenzhang: WYY_HOST_URL + "/Wap.php/" + type + "/getWenzhang",
  // 报纸
  getBao: WYY_HOST_URL + "/Wap.php/" + type + "/getBao",
  // 音乐详情
  getListenid: WYY_HOST_URL + "/Wap.php/" + type + "/getListenid",
  // 文章详情
  getLookid: WYY_HOST_URL + "/Wap.php/" + type + "/getLookid",
  // 报纸详情
  getBox: WYY_HOST_URL + "/Wap.php/" + type + "/getBox",
}




