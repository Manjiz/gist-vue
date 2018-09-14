import uaTypes from '@/config/uaTypes'

const ua = navigator.userAgent
const type = (() => {
  if (/jdapp/i.test(ua)) {
    return uaTypes.APP
  } else if (/MicroMessenger/i.test(ua)) {
    return uaTypes.WECHAT
  } else if (/QQ/) {
    // 区分手机QQ和QQ浏览器
    if (/MQQBrowser/i.test(ua)) {
      return uaTypes.MOBILE
    } else {
      return uaTypes.QQ
    }
  } else {
    return uaTypes.MOBILE
  }
})()

export default type
