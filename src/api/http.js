import axios from 'axios'
import VueRouter from 'vue-router'
import router from '../router/index'
import { Message } from 'view-design'
import vc from 'vue-cookie'
// import * as $globalFun from '../assets/js/common'
import qs from 'qs'

/**
 * 提示函数
 * 显示三秒后关闭
 */
const tip = (msg) => {
  Message.info({
    content: msg,
    duration: 10
  });
};
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
/* 跳转登录页，携带当前页面路由，以期在登录页面完成登录后返回当前页面，适用于未登录也能进行查看的页面 */
const toLogin = () => {
  router.replace({path: '/'})
};
/**
 * 请求失败后的错误统一处理
 * @param { Number } status 请求失败的状态码
*/
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      // sessionStorage.removeItem('token');
      vc.set('userInfo', '')
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
};
// 创建并配置 axios 实例
// 不做 baseUrl 的设置，可能会出现不同 baseUrl 的情况，详情见 api.js
const Axios = axios.create({
  timeout: 10000, // 请求超时时间
  responseType: 'json',
  withCredentials: false, // 是否允许携带cookie
  headers: {
    // 'Access-Control-Allow-Origin': '*'
  }
});
// 设置 post 请求头
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 请求拦截器
Axios.interceptors.request.use((config) => {
  if (vc.get('userInfo')) {
    config.headers.token = JSON.parse(vc.get('userInfo')).token;
  }
  return config;
}, (error) => {
  this.$Message.warning({
    content: error,
    duration: 3
  });
  return Promise.reject(error);
});

Axios.interceptors.response.use((res) => {
  if(res.data.code == 403) {
    vc.set('userInfo', '')
    // setTimeout(() => {
    //   toLogin();
    // }, 1000);
    toLogin();
  }

  if (res.status === 200) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(res);
  }
},
  /*
  服务器状态码不是 2 开头的情况
  这里需要和后台统一好错误状态码
  */
error => {
  // errorHandle(error.response.success);
  return Promise.reject(error);
});

// 返回状态判断

// 公共Get方法
export function Get (url, params) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, { indices: false })
      }
    }).then(response => {
      if (response.data !== null) {
        resolve(response.data);
      }
    }, err => {
      reject(err)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 公共post方法
export function POST (url, params) {
  let data = qs.stringify(params);
  return new Promise((resolve, reject) => {
    Axios.post(url, data).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    }).catch((err) => {
      reject(err);
    })
  })
}
