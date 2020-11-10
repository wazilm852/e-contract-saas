/* 接口统一管理 */
import { Get, POST } from './http'
// 接口 baseUrl 管理
let baseUrl = '';
let exclUrl = '';
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://www.dianzihetong.xin';
  exclUrl = 'https://www.dianzihetong.xin';
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
  // 验证短信
  checkSms (params) {
    return POST(`${baseUrl}/base/checkSms`, params)
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
  // 删除合同
  deleteContract (params) {
    return POST(`${baseUrl}/api/contract/delete`, params)
  },

  // 基本信息
  info (params) {
    return POST(`${baseUrl}/api/user/info`, params)
  },
  // 修改手机号
  updatePhone (params) {
    return POST(`${baseUrl}/api/user/updatePhone`, params)
  },
  // 修改密码
  editPassword (params) {
    return POST(`${baseUrl}/api/user/editPassword`, params)
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

  // 模板使用-模板转合同（1）
  toContract (params) {
    return POST(`${baseUrl}/api/template/toContract`, params)
  },

  // 合同签署-1（展示合同标题，合同图片）
  signFirst (params) {
    return POST(`${baseUrl}/api/contract/signFirst`, params)
  },
  // 合同签署-1-1（保存合同签署人信息）
  signFirstSave (params) {
    return POST(`${baseUrl}/api/contract/signFirstSave`, params)
  },
  // 合同签署-2（展示编辑框和合同图片）
  signSecond (params) {
    return POST(`${baseUrl}/api/contract/signSecond`, params)
  },
  // 合同签署-3（合并编辑框的文字）
  textEditsSave (params) {
    return POST(`${baseUrl}/api/contract/textEditsSave`, params)
  },
  // 合同签署-4（等待发起人签署）
  setsignature (params) {
    return POST(`${baseUrl}/api/contract/setsignature`, params)
  },
  //合同签署-5（发起人签署）
  sponSignSave (params) {
    return POST(`${baseUrl}/api/contract/sponSignSave`, params)
  },
  // 合同签署-6（短信提醒签署方）
  sendSmsTosignature (params) {
    return POST(`${baseUrl}/api/contract/sendSmsTosignature`, params)
  },
  // 保存草稿
  save (params) {
    return POST(`${baseUrl}/api/contract/save`, params)
  },
  // 合同详情
  view (params) {
    return POST(`${baseUrl}/api/contract/view`, params)
  },
  // 拒签
  refuse (params) {
    return POST(`${baseUrl}/api/contract/refuse`, params)
  },
  // 撤回
  withdraw (params) {
    return POST(`${baseUrl}/api/contract/withdraw`, params)
  },
  // 待我签详情
  meSign (params) {
    return POST(`${baseUrl}/api/contract/meSign`, params)
  },
  // 首页展示的合同统计
  top (params) {
    return POST(`${baseUrl}/api/contract/top`, params)
  },
  // 合同签署-8（签署方签署）
  meSignSave (params) {
    return POST(`${baseUrl}/api/contract/meSignSave`, params)
  },
  // 二维码跳转H5
  h5QrPng (params) {
    return POST(`${baseUrl}/api/cert/h5QrPng`, params)
  },
  // CRM跳转到电子合同【自动登录】
  crmCheck (params) {
    return POST(`${baseUrl}/base/crmCheck`, params)
  },
  // 在审件列表【从CRM过来】
  clientList (params) {
    return POST(`${baseUrl}/api/check/list`, params)
  },
  // 查询认证结果
  checkCertAliPay (params) {
    return POST(`${baseUrl}/api/cert/checkCertAliPay`, params)
  },
}