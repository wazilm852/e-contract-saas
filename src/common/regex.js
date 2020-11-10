// 手机 后端校验具体是否正确
// export const PHONE = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[189])\d{8}$/
export const PHONE = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/

// 密码强度
// export const PASSWORD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/
export const PASSWORD = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}/

// E-Mail 地址 最下面是可以输入大写英文
// export const EMAIL = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
export const EMAIL = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/

// 15位身份证号码
export const IDENTITY_CARD_15 = /^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$/

// 18位身份证号码
export const IDENTITY_CARD_18 = /^(([0-9]{0,18})|([0-9]{17}([Xx])))$/
// 纯数字
export const PHONUM = /^(0|[1-9]\d{0,11})$/
// 短信验证码
export const MSGCODE = /^([0-9]\d{3})$/
// 金额为整数或两位小数
// export const TWODECIMAL = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
// export const TWODECIMAL = /^[0-9]+(.[0-9]{0,2})?$/
export const TWODECIMAL = /^[0-9]+(\.[0-9]{0,2})?$/