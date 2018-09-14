export default {
  getDateTime (dateStr = '') {
    if (typeof dateStr === 'number') {
      return new Date(dateStr)
    }

    let dateArr = dateStr.split(' ')
    let year = 0
    let month = 0
    let date = 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    dateArr.filter((item) => {
      return item !== ''
    })

    if (dateArr[0]) {
      let ymd = dateArr[0].split('-')
      if (ymd.length !== 3) {
        ymd = dateArr[0].split('/')
      }
      year = ymd[0] || 0
      month = ymd[1] || 0
      date = ymd[2] || 0
      month = month > 0 ? month - 1 : month
    }

    if (dateArr[1]) {
      let hms = dateArr[1].split(':')
      hours = hms[0]
      minutes = hms[1]
      seconds = hms[2]
    }

    return new Date(year, month, date, hours, minutes, seconds)
  },
  setCookie (name, value, days = 300) {
    let exp  = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString()
  },
  getCookie (name) {
    let cookie
    try {
      cookie = document.cookie.match(new RegExp('(^' + name + '| ' + name + ')=([^;]*)'))
      if (cookie !== undefined && cookie !== null) {
        return decodeURIComponent(RegExp.$2)
      }
    } catch (e) {
      cookie = document.cookie.match(new RegExp('(^' + name + '| ' + name + ')=([^;]*)'))
      if (cookie !== undefined && cookie !== null) {
        return RegExp.$2
      }
    }

    return ''
  },
  getUrlParam (url, name) {
    const regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
    const urlInfo = regex.exec(url)
    const param = urlInfo[9]
    if (param && param !== '') {
      const paramInfo = param.split('&')
      for (let i = 0; i < paramInfo.length; i++) {
        const obj = paramInfo[i]
        const objInfo = obj.split('=')
        if (objInfo[0] === name) {
          return decodeURIComponent(objInfo[1])
        }
      }
    }
    return false
  },
  checkToBottom (distance = 800) {
    // 滚动条在Y轴上的滚动距离
    let _getScrollTop = function () {
      let bodyScrollTop = document.body ? document.body.scrollTop : 0
      let docScrollTop = document.documentElement ? document.documentElement.scrollTop : 0
      return Math.max(bodyScrollTop, docScrollTop)
    }
    // 文档的总高度
    let _getScrollHeight = function () {
      let bodyScrollHeight = document.body ? document.body.scrollHeight : 0
      let docScrollHeight = document.documentElement ? document.documentElement.scrollHeight : 0
      return Math.max(bodyScrollHeight, docScrollHeight)
    }
    // 浏览器视口的高度
    let _getWindowHeight = function () {
      return document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight
    }

    return _getScrollTop() + _getWindowHeight() + distance >= _getScrollHeight()
  },
  // 函数节流
  throttle (fn, delay) {
    let now, lastExec, timer, context, args
    let execute = function () {
      fn.apply(context, args)
      lastExec = now
    }
    return function () {
      context = this
      args = arguments
      now = Date.now()
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (lastExec) {
        let diff = delay - (now - lastExec)
        if (diff < 0) {
          execute()
        } else {
          timer = setTimeout(() => {
            execute()
          }, diff)
        }
      } else {
        execute()
      }
    }
  },
  // debounce(func, wait, immediate) {
  //   let timeout
  //   return () => {
  //     let context = this
  //     let args = arguments
  //     clearTimeout(timeout)
  //     timeout = setTimeout(function () {
  //       timeout = null
  //       if (!immediate) {
  //         func.apply(context, args)
  //       }
  //     }, wait)
  //     if (immediate && !timeout) func.apply(context, args)
  //   }
  // },

  // Underscore
  debounce: function (func, wait, immediate) {
    let timeout, args, context, timestamp, result

    let later = function () {
      // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
      let last = Date.now() - timestamp
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) {
            context = args = null
          }
        }
      }
    }

    return function() {
      context = this
      args = arguments
      timestamp = Date.now()
      // 第一次调用该方法时，且immediate为true，则调用func函数
      let callNow = immediate && !timeout
      // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
      if (!timeout) {
        timeout = setTimeout(later, wait)
      }
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }

      return result
    }
  }
}
