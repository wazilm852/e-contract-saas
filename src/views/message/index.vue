<template>
  <div class="message">
    <vheader></vheader>
    <div class="content">
      <div class="left">
        <img src="@/assets/img/login/header.png" alt />
      </div>
      <div class="right">
        <div class="title">基本信息</div>
        <div class="r-content">
          <ul class="r-left">
            <li>登录账号</li>
            <li>登录密码</li>
            <li>用户姓名</li>
          </ul>
          <ul class="r-right">
            <li>
              {{phone}}
              <span class="iconfont icon-edit-fill" @click="modalchangePhone = true"></span>
            </li>
            <li>
              *******
              <span class="iconfont icon-edit-fill" @click="modalchangePassword = true"></span>
            </li>
            <li>
              {{name}}
              <span class='icon' v-if='isVerified'>
                <img src="@/assets/img/login/authentication-c.png" alt="">已实名认证
              </span>
              <span style='cursor: pointer;' class='icon' v-else @click='modalAuthentication = true'>
                <img src="@/assets/img/login/authentication.png" alt="">未实名认证
              </span>
            </li>
          </ul>
        </div>

        <!-- 修改密码modal1 -->
        <Modal class="modalchangePassword" :mask-closable="false" v-model="modalchangePassword">
          <div slot="header" class="top">
            <div class="circular">1</div>
            <span class="text1">填写认证信息</span>
            <span class="text2">>>>>>>>>>>>>>>></span>
            <div class="circular circular2">2</div>
            <span class="text3">填写新密码</span>
          </div>
          <p>请输入{{phone}}接收的验证码</p>
          <div class="modal-content">
            <span class="label">验证码</span>
            <div class="input">
              <Input v-model="codePassword" maxlength="4" placeholder="请输入验证码" />
              <!-- <span class="sendCode">发送验证码</span> -->
              <span class="sendCode" v-show='ifGet_password == true' @click='getCode_password'>获取验证码</span>
              <span class="sendCode sendCode-c" v-show='ifGet_password == false'>{{codCount_password}}秒后重试</span>
            </div>
          </div>
          <div slot="footer" class="okBtn">
            <Button @click="modalchangePassword = false">取消</Button>
            <Button type="primary" @click="okChange">确认</Button>
          </div>
        </Modal>

        <!-- 修改密码modal2 -->
        <Modal class="modalchangePassword2" :mask-closable="false" v-model="modalchangePassword2">
          <div slot="header" class="top">
            <img style="marginRight: 10px" src="../../assets/img/login/right.png" alt="">
            <span class="text1">填写认证信息</span>
            <span class="text2">>>>>>>>>>>>>>>></span>
            <div class="circular">2</div>
            <span class="text3">填写新密码</span>
          </div>
          <div class="modal-content">
            <span class="label">新密码</span>
            <Input v-model="password" type="password" placeholder="请输入新密码" />
          </div>
          <div class="modal-content">
            <span class="label">确认新密码</span>
            <Input v-model="passwordNew" type="password" placeholder="确认新密码" />
          </div>
          <div slot="footer" class="okBtn">
            <Button @click="modalchangePassword2 = false">取消</Button>
            <Button type="primary" @click="okChange2">确认</Button>
          </div>
        </Modal>

        <!-- 修改绑定手机号 -->
        <Modal class="modalchangePhone" :mask-closable="false" v-model="modalchangePhone">
          <div slot="header" class="top">
            <div class="circular">1</div>
            <span class="text1">填写认证信息</span>
            <span class="text2">>>>>>>>>>>>>>>></span>
            <div class="circular circular2">2</div>
            <span class="text3">绑定新手机号</span>
          </div>
          <p>请输入{{phone}}接收的验证码</p>
          <div class="modal-content">
            <span class="label">验证码</span>
            <div class="input">
              <Input v-model="codePhone" maxlength="4" placeholder="请输入验证码" />
              <span class="sendCode" v-show='ifGet_phone == true' @click='getCode_phone'>获取验证码</span>
              <span class="sendCode sendCode-c" v-show='ifGet_phone == false'>{{codCount_phone}}秒后重试</span>
            </div>
          </div>
          <div slot="footer" class="okBtn">
            <Button @click="modalchangePhone = false">取消</Button>
            <Button type="primary" @click="okPhone">确认</Button>
          </div>
        </Modal>

        <!-- 修改手机号modal2 -->
        <Modal class="modalchangePhone2" :mask-closable="false" v-model="modalchangePhone2">
          <div slot="header" class="top">
            <img style="marginRight: 10px" src="@/assets/img/login/right.png" alt="">
            <span class="text1">填写认证信息</span>
            <span class="text2">>>>>>>>>>>>>>>></span>
            <div class="circular">2</div>
            <span class="text3">绑定新手机号</span>
          </div>
          <div class="modal-content">
            <span class="label">手机号</span>
            <Input v-model="newPhone" maxlength="11" placeholder="请输入新手机号" />
          </div>
          <div class="modal-content">
            <span class="label">验证码</span>
            <div class="input">
              <Input v-model="newCode" maxlength="4" placeholder="请输入验证码" />
              <span class="sendCode" v-show='ifGet_phone2 == true' @click='getCode_phone2'>获取验证码</span>
              <span class="sendCode sendCode-c" v-show='ifGet_phone2 == false'>{{codCount_phone2}}秒后重试</span>
            </div>
          </div>
          <div slot="footer" class="okBtn">
            <Button @click="modalchangePhone2 = false">取消</Button>
            <Button type="primary" @click="okPhone2">确认</Button>
          </div>
        </Modal>

        <!-- 实名认证modal -->
        <authentication :flag='this.modalAuthentication' @clFlag="sendSonData"></authentication>
      </div>
    </div>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
import authentication from "@/components/authentication.vue";
import { PHONE } from '@/common/regex.js'
export default {
  components: {
    vheader,
    authentication
  },
  data() {
    return {
      modalchangePassword: false,
      modalchangePassword2: false,
      modalchangePhone: false,
      modalchangePhone2: false,
      modalAuthentication: false,
      codePassword: "",
      codePhone: '',
      password: '',
      passwordNew: '',
      newPhone: '',
      newCode: '',
      isVerified: false,
      phone: '',
      name: '',
      ifGet_password: true,
      codCount_password: 60,
      ifGet_phone: true,
      codCount_phone: 60,
      ifGet_phone2: true,
      codCount_phone2: 60,
    };
  },
  created() {
    this.show()
    var userInfo = JSON.parse(this.$vc.get('userInfo'))
    this.isVerified = userInfo.is_verified
  },
  methods: {
    // 展示个人信息
    show() {
        this.$api.info({

        }).then(res=>{
          if(res.code == 0) {
            this.phone = res.data.phone
            this.name = res.data.name ? res.data.name : '游客'
          }
        })
    },
    // 修改密码第一部
    okChange() {
      if (this.codePassword) {
        this.$api.checkSms({
          phone: this.phone,
          code: this.codePassword
        }).then(res=>{
          if(res.code == 0) {
            this.$Message.success("验证成功");
            this.modalchangePassword = false;
            this.modalchangePassword2 = true;
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.modalchangePassword = true;
        this.$Message.error("验证码不能为空");
      }
    },
    // 修改密码第二s部
    
    okChange2() {
      var obj = JSON.parse(this.$vc.get('password'))
      if(this.password && this.passwordNew) {
        if(this.password == this.passwordNew) {
          this.$api.editPassword({
            password: this.password,
            new_password: this.passwordNew
          }).then(res=>{
            if(res.code == 0) {
              this.$Message.success(res.msg);
              obj.password = this.password
              this.$vc.set('password',JSON.stringify(obj));
              this.modalchangePassword2 = false
            } else {
              this.$Message.error(res.msg);
            }
          })
        } else {
          this.$Message.error("两次密码输入不一致!");
        }
      } else {
        this.$Message.error("密码不能为空!");
      }
    },
    // 修改手机号第一部
    okPhone() {
      if (this.codePhone) {
        this.$api.checkSms({
          phone: this.phone,
          code: this.codePhone
        }).then(res=>{
          if(res.code == 0) {
            this.$Message.success("验证成功");
            this.modalchangePhone = false;
            this.modalchangePhone2 = true;
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.modalchangePhone = true;
        this.$Message.error("验证码不能为空");
      }
    },
    // 修改手机号第二部
    okPhone2() {
      console.log(PHONE.test(this.newPhone))
      if(PHONE.test(this.newPhone) && this.newCode) {
        this.$api.updatePhone({
          phone: this.newPhone,
          code: this.newCode
        }).then(res=>{
          if(res.code == 0) {
            this.$Message.success(res.msg)

            var obj = JSON.parse(this.$vc.get('password'))
            obj.phone = this.phone
            this.$vc.set('password',JSON.stringify(obj));

            var obj2 = JSON.parse(this.$vc.get('userInfo'))
            obj2.phone = this.phone
            this.$vc.set('password',JSON.stringify(obj2));

            this.show()
            this.modalchangePhone2 = false
          } else {
            this.$Message.error(res.msg)
          }
        })
      } else {
        this.$Message.error('内容格式不正确!')
      }
    },

    // 获取密码验证码
    getCode_password() {
      this.$api.getCode({
          phone: this.phone
      }).then(res=>{
          if(res.code == 0) {
              this.$Message.success(res.msg);
              this.ifGet_password = false
              var t = setInterval(()=> {
                  this.codCount_password -- 
                  if(this.codCount_password <= 0) {
                      this.codCount_password = 60
                      clearInterval(t)
                      this.ifGet_password = true
                  }
              }, 1000)
          } else {
              this.$Message.error(res.msg);
          }
      })
    },
    // 获取手机号验证码
    getCode_phone() {
      this.$api.getCode({
          phone: this.phone
      }).then(res=>{
          if(res.code == 0) {
              this.$Message.success(res.msg);
              this.ifGet_phone = false
              var t = setInterval(()=> {
                  this.codCount_phone -- 
                  if(this.codCount_phone <= 0) {
                      this.codCount_phone = 60
                      clearInterval(t)
                      this.ifGet_phone = true
                  }
              }, 1000)
          } else {
              this.$Message.error(res.msg);
          }
      })
    },
    // 获取手机号验证码2
    getCode_phone2() {
      this.$api.getCode({
          phone: this.newPhone
      }).then(res=>{
          if(res.code == 0) {
              this.$Message.success(res.msg);
              this.ifGet_phone2 = false
              var t = setInterval(()=> {
                  this.codCount_phone2 -- 
                  if(this.codCount_phone2 <= 0) {
                      this.codCount_phone2 = 60
                      clearInterval(t)
                      this.ifGet_phone2 = true
                  }
              }, 1000)
          } else {
              this.$Message.error(res.msg);
          }
      })
    },
    // 关闭去认证弹框
    sendSonData() {
      this.modalAuthentication = false
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  width: 100%;
  height: 100%;
  .content {
    width: 600px;
    height: 300px;
    margin: 0 auto;
    margin-top: 110px;
    border: 1px solid #bfbfbf;
    padding: 40px 54px;
    display: flex;
    .left {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .right {
      width: 50%;
      height: 100%;
      padding-top: 10px;
      .title {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 30px;
      }
      .r-content {
        width: 100%;
        display: flex;
        .r-left {
          width: 45%;
          li {
            height: 24px;
            font-size: 14px;
            color: #777777;
            margin-bottom: 18px;
          }
        }
        .r-right {
          width: 55%;
          li {
            height: 24px;
            font-size: 14px;
            color: #333333;
            margin-bottom: 18px;
            .icon-edit-fill {
              margin-left: 12px;
              color: #bfbcbf;
              cursor: pointer;
            }
            .icon{
              font-size: 12px;
              color: #777777;
              margin-left: 10px;
              img{
                vertical-align: middle;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.modalchangePassword,.modalchangePassword2, .modalchangePhone, .modalchangePhone2 {
  .ivu-modal {
    top: 25%;
    width: 600px !important;
    height: 350px;
    .ivu-modal-content {
      width: 600px !important;
      height: 350px;
      .ivu-modal-header {
        border: 0;
        padding-top: 70px;
        padding-bottom: 0;
        margin-bottom: 60px;
        .top {
          display: flex;
          justify-content: center;
          .circular {
            width: 25px;
            height: 25px;
            background-color: #2d8cf0;
            border-radius: 50%;
            text-align: center;
            line-height: 25px;
            color: #fff;
            margin-right: 10px;
          }
          span {
            font-size: 16px;
            margin-right: 12px;
            line-height: 25px;
          }
          .text1 {
            color: #333333;
          }
          .text2 {
            color: #aaaaaa;
          }
          .text3 {
            color: #aaaaaa;
          }
          .circular2 {
            background-color: #aaaaaa;
          }
        }
      }
      .ivu-modal-body {
        border: 0;
        padding: 0 104px;
        p {
          font-size: 14px;
          color: #333333;
          margin-bottom: 30px;
          text-align: center;
          font-weight: 400;
        }
        .modal-content {
          display: flex;
          justify-content: center;
          align-items: center;
          .label {
            font-size: 14px;
            color: #333333;
            margin-right: 10px;
            font-weight: bold;
          }
          .input {
            width: 340px;
            height: 30px;
            position: relative;
            .sendCode {
              position: absolute;
              top: 7px;
              right: 20px;
              font-size: 14px;
              color: #2981d9;
              cursor: pointer;
            }
            .sendCode-c{
              color: #999;
            }
          }
        }
      }
      .ivu-modal-footer {
        border: 0;
        padding: 0;
        .okBtn {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          padding: 0 205px;
          .ivu-btn {
            width: 80px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
.modalchangePassword2, .modalchangePhone2{
  .ivu-modal {
    width: 600px !important;
    height: 350px;
    .ivu-modal-content{
      .ivu-modal-body{
        padding: 0 77px;
        .modal-content{
          width: 100%;
          margin-bottom: 20px;
          .label{
            width: 70px;
            text-align: right;
          }
          .ivu-input-wrapper{
            width: 340px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>