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
          <p>请输入12345678910接收的验证码</p>
          <div class="modal-content">
            <span class="label">验证码</span>
            <div class="input">
              <Input v-model="codePassword" maxlength="4" placeholder="请输入验证码" />
              <span class="sendCode">发送验证码</span>
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
          <p>请输入12345678910接收的验证码</p>
          <div class="modal-content">
            <span class="label">验证码</span>
            <div class="input">
              <Input v-model="codePhone" maxlength="4" placeholder="请输入验证码" />
              <span class="sendCode">发送验证码</span>
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
              <span class="sendCode">发送验证码</span>
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
    okChange() {
      if (this.codePassword) {
        this.modalchangePassword = false;
        this.modalchangePassword2 = true;
        this.$Message.success("验证成功");
      } else {
        this.modalchangePassword = true;
        this.$Message.error("验证码不能为空");
      }
    },
    okChange2() {
      if(this.password && this.passwordNew) {
        if(this.password == this.passwordNew) {
          this.$Message.success("修改成功!");
          this.modalchangePassword2 = false
        } else {
          this.$Message.error("两次密码输入不一致!");
        }
      } else {
        this.$Message.error("密码不能为空!");
      }
    },
    okPhone() {
      if (this.codePhone) {
        this.modalchangePhone = false;
        this.modalchangePhone2 = true;
        this.$Message.success("验证成功");
      } else {
        this.modalchangePhone = true;
        this.$Message.error("验证码不能为空");
      }
    },
    okPhone2() {
      if(this.newPhone && this.newCode) {
        this.$Message.success("修改成功!");
        this.modalchangePhone2 = false
      } else {
        this.$Message.error('内容不能为空!')
      }
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