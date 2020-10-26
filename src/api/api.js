/* 接口统一管理 */
import { Get, POST } from './http'
// 接口 baseUrl 管理
let baseUrl = '';
let exclUrl = '';
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://contract/';
  exclUrl = 'http://contract/';
} else if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api';
  exclUrl = '/api'
}
export default {
  exclUrl,
  baseUrl,
  /* 登录部分开始 */
  // 登录接口
  login (params) {
    return POST(`${baseUrl}/base/login`, params)
  },
  // 注册
  regist (params) {
    return POST(`${baseUrl}/base/regist`, params)
  },
  // 忘记密码
  forget (params) {
    return POST(`${baseUrl}/base/forgetPassword`, params)
  },
  // 发送短信
  getCode (params) {
    return POST(`${baseUrl}/base/getSmsCode`, params)
  },

  // 系统模板
  systemTemp (params) {
    return POST(`${baseUrl}/api/template/system`, params)
  },
  // 我的模板
  myTemp (params) {
    return POST(`${baseUrl}/api/template/user`, params)
  },
  // 模板分类
  classTemp (params) {
    return Get(`${baseUrl}/api/template/cate`, params)
  },
  // 查看模板
  lookTemplate (params) {
    return POST(`${baseUrl}/api/template/edit`, params)
  },
  // 下载合同
  download (params) {
    return POST(`${baseUrl}/api/template/down`, params)
  },
  // 删除用户模板
  deleteTemp (params) {
    return POST(`${baseUrl}/api/template/delete`, params)
  },
  // 上传模板
  uploadTemp (params) {
    return POST(`${baseUrl}/api/template/upload`, params)
  },
  // 保存模板
  saveTemp (params) {
    return POST(`${baseUrl}/api/template/save`, params)
  },

  // 合同状态列表
  statusList (params) {
    return Get(`${baseUrl}/api/contract/statusList`, params)
  },
  // 合同列表
  contractList (params) {
    return POST(`${baseUrl}/api/contract/list`, params)
  },
  // 编辑合同
  editContract (params) {
    return POST(`${baseUrl}/api/contract/edit`, params)
  },
  // 保存合同
  save (params) {
    return POST(`${baseUrl}/api/contract/save`, params)
  },
  // 删除合同
  deleteContract (params) {
    return POST(`${baseUrl}/api/contract/delete`, params)
  },

  // 基本信息
  info (params) {
    return POST(`${baseUrl}/api/user/info`, params)
  },

  // 通讯录列表
  bookList (params) {
    return POST(`${baseUrl}/api/book/list`, params)
  },
  // 添加签署人
  addBook (params) {
    return POST(`${baseUrl}/api/book/add`, params)
  },
  // 编辑签署人
  saveBook (params) {
    return POST(`${baseUrl}/api/book/save`, params)
  },
  // 删除签署人
  deleteBook (params) {
    return POST(`${baseUrl}/api/book/delete`, params)
  },
  // 搜索手机号是否实名
  searchBook (params) {
    return POST(`${baseUrl}/api/book/search`, params)
  },

  // 签章列表
  signList (params) {
    return POST(`${baseUrl}/api/signature/list`, params)
  },
  // 添加签章
  addSign (params) {
    return POST(`${baseUrl}/api/signature/add`, params)
  },
  // 设置默认签章
  setDefault (params) {
    return POST(`${baseUrl}/api/signature/default`, params)
  },
  // 删除签章
  deleteSign (params) {
    return POST(`${baseUrl}/api/signature/delete`, params)
  },
}