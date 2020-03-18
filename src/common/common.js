export const Tools = {
  cookie: {
    addCookie: function (c_name, value, expire, domain) {
      var textDomain = domain ? ';domain=' + domain : ''
      if (expire === 'null') {
        document.cookie = c_name + '=' + escape(value) + '' + '; path=/' + textDomain
      } else if (expire == null) {
        var exdate = new Date()
        exdate.setHours(exdate.getHours() + 8)
        document.cookie = c_name + '=' + escape(value) + ';expires=' + exdate.toGMTString() + '; path=/' + textDomain
      } else {
        var exdate = new Date(parseInt(expire) * 1000)
        document.cookie = c_name + '=' + escape(value) + ';expires=' + exdate.toGMTString() + '; path=/' + textDomain
      }
    },
    getCookie: function (c_name) {
      if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + '=')
        if (c_start != -1) {
          c_start = c_start + c_name.length + 1
          var c_end = document.cookie.indexOf(';', c_start)
          if (c_end == -1) c_end = document.cookie.length
          return unescape(document.cookie.substring(c_start, c_end))
        }
      }
      return ''
    },
    removeCookie: function (name, domain) {
      Tools.cookie.addCookie(name, null, 0, domain)
    }
  }
};
export const url_api = (function (window, document, commonApi) {
  return commonApi(window, document)
})(window, window.document, function commonApi (g, d) {
  let TOKEN, USERINFO
  TOKEN = d.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
  USERINFO = g.localStorage.getItem('userInfo') ? g.localStorage.getItem('userInfo') : ''
  const configObj = {
    TOKEN: TOKEN,
    USERINFO: USERINFO,
    commonurl: process.env.NODE_ENV === 'production' ? 'http://iot.cloudwz.com' : '/api',
    commonjs: {
      checkError: function (error) {
        if (error) {
          if (error.toString().indexOf('403') > -1) {
            this.$router.push({ path: '/login' })
          }
        }
      }
    }
  }

  return configObj
});
// 格式化时间
class TimeFormatter {
  // 获取实时时间
  getCurrentTime () {
    // 获取年月日
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let day = time.getDay();
    // 获取时分秒
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    // 判断星期几
    let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    let wkDay = weekday[day];
    // 检查是否小于 10
    month = TimeFormatter.check(month);
    day = TimeFormatter.check(day);
    hour = TimeFormatter.check(hour);
    minute = TimeFormatter.check(minute);
    second = TimeFormatter.check(second);
    return `${year}-${month}-${date} ${wkDay} ${hour}:${minute}:${second}`
  }
  format_time (date, timeBol = null) {
    let time = new Date(date);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const formatNumber = n => {
      n = n.toString();
      return n[1] ? n : '0' + n
    };

    let str = [hour, minute, second].map(formatNumber).join(':');

    if (timeBol && (str !== '00:00:00')) {
      return [year, month, day].map(formatNumber).join('-') + ' ' + str
    }

    return [year, month, day].map(formatNumber).join('-')
  }
  // 检查时间是否小于 10 ，小于 10 则在前面补 0
  static check (data) {
    let num;
    data < 10 ? num = `0${data}` : num = data;
    return num
  }
}
export const format_time = (date, timeBol = null) => {
  var time = new Date(date);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
  };

  let str = [hour, minute, second].map(formatNumber).join(':');

  if (timeBol && (str !== '00:00:00')) {
    return [year, month, day].map(formatNumber).join('-') + ' ' + str
  }

  return [year, month, day].map(formatNumber).join('-')
};

// 深拷贝方法
const deepClone = (obj) => {
  let _obj = JSON.stringify(obj);
  return JSON.parse(_obj)
};

let timeFormat = new TimeFormatter();
export default {
  timeFormat,
  deepClone
}
