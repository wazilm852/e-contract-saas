<template>
  <div class="signDetails">
    <vheader></vheader>
    <div class="title">
      <div class="back" @click="back">
        <img src="../../assets/img/contract/back.png" alt />
      </div>
      <h2>{{contractTitle}}</h2>
      <div></div>
    </div>
    <div class="content">
      <ul class="left">
        <li
          v-for="(item, index) in centerList"
          :key="index"
          :class="[leftIndex == index ? 'click' : '']"
          @click="jump(index)"
        >
          <img :src="item.url" alt="">
          <div class="triangle">
            <p>{{index + 1}}</p>
          </div>
        </li>
      </ul>
      <div class="center">
        <div class="contract" v-for="(item, index) in centerList" :key="index">
          <img class='contractPic' :src="item.url" alt="">
        </div>
      </div>
      <div class="right">
        <h3>文件信息</h3>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />合同名称
        </h4>
        <ul class="signer">
          <li>
            <div>
                {{contractTitle}}
            </div>
          </li>
        </ul>
        <h4>
          <img src="../../assets/img/contract/signer.png" alt />文件状态
        </h4>
        <ul class="signer">
          <li>
            <div class="type" style='color: #2D8CF0'>
                {{status}}
            </div>
          </li>
        </ul>
        <h3>待签署方</h3>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />发起方
        </h4>
        <ul class="signer">
          <li>
            <div class="name">
                姓名：
                <span>{{sponArray.name}}</span>
            </div>
            <div class="phone">
                手机号：
                <span>{{sponArray.phone}}</span>
            </div>
            <div class="date">
                签署时间：
                <span>{{sponArray.time}}</span>
            </div>
          </li>
        </ul>
        <h4>
          <img src="../../assets/img/contract/signer.png" alt />接收方
        </h4>
        <ul class="signer">
          <li v-for='(item, index) in signatory' :key="index">
            <div class="name">
              姓名：
              <span>{{item.name}}</span>
            </div>
            <div class="phone">
              手机号：
              <span>{{item.phone}}</span>
            </div>
            <div class="date">
                签署时间：
                <span>{{item.time}}</span>
            </div>
          </li>
        </ul>

        <!-- 待我签 -->
        <div v-if="status == '待我签'">
          <h3>截止时间</h3>
          <h4>
            <img src="../../assets/img/contract/launch.png" alt />截止时间
          </h4>
          <ul class="signer">
            <li>
              <div class="date">
                  {{end_time}}
              </div>
            </li>
          </ul>
          <div class="btn">
            <Button type="primary" @click="toSigned">立即签署</Button>
            <Button type="primary" @click="refuse">拒签</Button>
          </div>
        </div>
        <!-- 待TA签 -->
        <div v-else-if="status == '待TA签'">
          <h3>截止时间</h3>
          <h4>
            <img src="../../assets/img/contract/launch.png" alt />截止时间
          </h4>
          <ul class="signer">
            <li>
              <div class="date">
                  {{end_time}}
              </div>
            </li>
          </ul>
          <div class="btn" v-if='is_sponsor'>
            <Button type="primary" @click="remind">短信提醒</Button>
            <Button type="primary" @click="withdraw">撤回</Button>
          </div>
          <div class="btn btn2" v-else>
            <Button type="primary" @click="remind">短信提醒</Button>
          </div>
        </div>
        <!-- 已完成 -->
        <div v-else-if="status == '已完成'">
          <h3>完成时间</h3>
          <h4>
            <img src="../../assets/img/contract/launch.png" alt />完成时间
          </h4>
          <ul class="signer">
            <li>
              <div class="date">
                  {{complete_time}}
              </div>
            </li>
          </ul>
          <div class="btn">

          </div>
        </div>
        <!-- 已过期 -->
        <div v-else-if="status == '已过期'">
          <h3>截止时间</h3>
          <h4>
            <img src="../../assets/img/contract/launch.png" alt />截止时间
          </h4>
          <ul class="signer">
            <li>
              <div class="date">
                  {{end_time}}
              </div>
            </li>
          </ul>
          <div class="btn">

          </div>
        </div>
        <!-- 已撤回 -->
        <div v-else-if="status == '已撤回'">
          <h3>撤回时间</h3>
          <h4>
            <img src="../../assets/img/contract/launch.png" alt />撤回时间
          </h4>
          <ul class="signer">
            <li>
              <div class="date">
                  {{withdrawal_time}}
              </div>
            </li>
          </ul>
          <div class="btn">

          </div>
        </div>
        <!-- 已拒签 -->
        <div v-else-if="status == '已拒签'">
          <h3>拒签时间</h3>
          <h4>
            <img src="../../assets/img/contract/launch.png" alt />拒签时间
          </h4>
          <ul class="signer">
            <li>
              <div class="date">
                  {{rejection_time}}
              </div>
            </li>
          </ul>
          <div class="btn">

          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
import moment from "moment";
export default {
  components: {
    vheader
  },
  data() {
    return {
      contractTitle: '', //合同title
      leftIndex: 0,
      scrollTop: 0,
      centerList: [], //合同列表
      signatory: [], //签署人列表
      code: '', // 验证码 
      modalchangeSign: false,
      signAdminList: [], // 签章list
      signObj: {}, //默认签章
      codeNum: 60, //验证码读秒
      isSend: true, // 验证码切换
      status: '', // 合同状态
      sponArray: {}, //发起人信息合集
      complete_time: '', //完成时间
      end_time: '', // 截止时间
      withdrawal_time: '', //撤回时间
      rejection_time: '', //拒绝时间
      is_sponsor: '', // 是否为发起人 0: 不是 1： 是
    };
  },
  mounted() {
    let center = document.getElementsByClassName("center")[0];
    center.addEventListener("scroll", this.showIcon);
  },
  created() {
    this.showContract()
  },
  methods: {
    // 展示合同
    showContract() {
      this.$api.view({
        con_id: this.$route.query.id
      }).then(res=>{
        if(res.code == 0) {
          this.contractTitle = res.data.title
          this.centerList = res.data.imgs
          this.signatory = res.data.signArray
          this.status = res.data.status
          this.sponArray = res.data.sponArray
          this.end_time = res.data.end_time
          this.complete_time = res.data.complete_time
          this.withdrawal_time = res.data.withdrawal_time
          this.rejection_time = res.data.rejection_time
          this.is_sponsor = res.data.is_sponsor
        }
      })
    },
    // 点击左侧移动至对应合同页数
    jump(index) {
      this.leftIndex = index;
      let center = document.getElementsByClassName("center")[0];
      center.scrollTop = index * 1052;
    },

    // 记录scroolTio
    showIcon() {
      let center = document.getElementsByClassName("center")[0];
      this.scrollTop = center.scrollTop;
      this.leftIndex = parseInt(this.scrollTop / 1052);
    },
    // 提交
    submit() {

    },
    // 去签署
    toSigned() {
      this.$router.push({name: 'signContract', query: {id: this.$route.query.id}})
    },
    // 拒签
    refuse() {
      this.$api.refuse({
        con_id: this.$route.query.id
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.showContract()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 短信提醒
    remind(row, index) {
      this.$api.sendSmsTosignature({
        con_id: this.$route.query.id
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 撤回
    withdraw() {
      this.$api.withdraw({
        con_id: this.$route.query.id
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.showContract()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 返回上一页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.signDetails {
  width: 100%;
  height: 100%;
  background-color: #eaeaea;
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  .title {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    background-color: #fff;
    box-shadow: 0px 3px 16px 0px rgba(14, 57, 111, 0.17);
    // z-index: 999;
    h2 {
      font-size: 16px;
      color: #333333;
    }
    .back{
      cursor: pointer;
    }
  }
  .content {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: calc(~ "100vh - 140px");
    // height: calc(100vh - 140px);
    .left {
      width: 320px;
      min-width: 320px;
      background-color: #fff;
      // height: calc(100vh - 140px);
      padding: 50px 40px;
      overflow: auto;
      overflow-x: hidden;
      li {
        width: 240px;
        min-height: 340px;
        border: 1px solid #bfbfbf;
        margin-bottom: 30px;
        position: relative;
        img{
            width: 100%;
            // height: 100%;
        }
        .triangle {
          width: 0;
          height: 0;
          border-width: 46px;
          border-style: solid;
          border-color: #bfbfbf transparent transparent transparent;
          position: absolute;
          right: -46px;
          bottom: -46px;
          transform: rotate(-45deg);
          p {
            font-size: 14px;
            color: #ffffff;
            transform: rotate(45deg);
            position: absolute;
            top: -36px;
            left: 0px;
          }
        }
      }
      .click {
        border: 1px solid #2c8cee;
        .triangle {
          border-color: #2c8cee transparent transparent transparent;
        }
      }
    }
    /*滚动条整体样式*/
    .left::-webkit-scrollbar {
      width: 10px;
      height: 1px;
    }
    /*滚动条滑块*/
    .left::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #b7b5b5;
    }
    /*滚动条轨道*/
    .left::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
      border-radius: 10px;
      background: #ddd;
    }
    .center {
      min-width: 770px;
      background-color: #eaeaea;
      // height: calc(100vh - 140px);
      overflow: auto;
      padding-top: 10px;
      .contract {
        width: 760px;
        height: 1052px;
        background-color: #fff;
        position: relative;
        margin-bottom: 10px;
        .contractPic{
          width: 100%;
          height: 100%;
        }
        .contract-sign {
          width: 120px;
          height: 120px;
          position: absolute;
          top: 0;
          left: 0;
          border: 1px dashed #127fd2;
          .default-pic {
            position: absolute;
            top: 38px;
            left: 0;
            width: 120px;
            // z-index: -999;
          }
          .del-pic {
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
          }
        }
        .sign-region {
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            font-size: 14px;
            color: #127fd2;
          }
        }
        .text{
          width: 200px;
          height: 30px;
          border: 1px dashed #127fd2;
          line-height: 30px;
          position: absolute;
          cursor: move;
          .del-pic {
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
          }
        }
        h1 {
          text-align: center;
          font-size: 100px;
        }
      }
    }

    /*滚动条整体样式*/
    .center::-webkit-scrollbar {
      width: 10px;
      height: 1px;
    }
    /*滚动条滑块*/
    .center::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #b7b5b5;
    }
    /*滚动条轨道*/
    .center::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
      border-radius: 10px;
      background: #ddd;
    }

    .right {
      width: 280px;
      min-width: 280px;
      background-color: #fff;
      // height: calc(100vh - 140px);
      padding: 50px 20px;
      overflow: auto;
      h3 {
        font-size: 17px;
        color: #333333;
        border-left: 3px solid #127fd2;
        padding-left: 6px;
        margin-bottom: 18px;
        font-weight: bold;
      }
      h4 {
        font-size: 16px;
        color: #333333;
        padding-left: 9px;
        margin-bottom: 16px;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      h5 {
        font-size: 12px;
        color: #aaa;
        margin-bottom: 20px;
      }
      .sign,
      .toBesign {
        width: 200px;
        height: 180px;
        box-shadow: 0px 3px 16px 0px rgba(14, 57, 111, 0.24);
        position: relative;
        margin: 20px auto;
        cursor: pointer;
        text-align: center;
        p {
          width: 100%;
          height: 30px;
          background-color: #e2eeff;
          text-align: center;
          line-height: 30px;
          color: #127fd2;
          font-size: 14px;
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 57px;
          img {
            margin-right: 10px;
          }
        }
        .default-pic {
          width: 150px;
          pointer-events: none;
          display: inline-block;
          margin-top: 50px;
          z-index: -1;
        }
      }
      .toBesign{
        height: 50px;
        margin-bottom: 40px;
      }
      .change {
        width: 200px;
        height: 30px;
        border-radius: 4px;
        background-color: #127fd2;
        line-height: 30px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 57px;
        margin: 0 auto;
        margin-bottom: 32px;
        cursor: pointer;
      }
      .signer {
        padding-left: 9px;
        font-size: 14px;
        color: #777777;
        margin-bottom: 20px;
        li {
          margin-bottom: 10px;
          .name {
            padding-left: 28px;
            margin-bottom: 14px;
          }
          .phone{
            padding-left: 14px;
            margin-bottom: 14px;
          }
        }
      }
      .toBesign {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 50px;
        font-size: 14px;
        color: #127fd2;
        border: 1px dashed #bfbfbf;
      }
      .btn{
        margin-top: 86px;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        .ivu-btn{
          width: 100px;
          height: 38px;
          color: #a3a3a3;
        }
        .ivu-btn-primary {
          color: #ffffff;
          background-color: #127FD2;
        }
      }
      .btn2{
        .ivu-btn{
          width: 100%;
        }
      }
    }
    /*滚动条整体样式*/
    .right::-webkit-scrollbar {
      width: 10px;
      height: 1px;
    }
    /*滚动条滑块*/
    .right::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #b7b5b5;
    }
    /*滚动条轨道*/
    .right::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
      border-radius: 10px;
      background: #ddd;
    }
  }
}
</style>
<style lang="less">
.signDetails {
  .ivu-input-wrapper {
    .ivu-input-icon {
      cursor: pointer;
    }
  }
}
.modal{
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
            font-size: 22px;
            color:#333333;
          }
        }
        .ivu-modal-body {
          border: 0;
          padding: 0 104px;
          .modal-content {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
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
            padding: 0 180px;
            .ivu-btn {
              width: 90px;
              height: 40px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }

  .modalchangeSign{
    .ivu-modal {
      top: 25%;
      width: 840px !important;
      height: 540px;
      .ivu-modal-content {
        width: 840px !important;
        height: 540px;
        .ivu-modal-header {
          border: 0;
          padding-top: 70px;
          padding-bottom: 0;
          margin-bottom: 50px;
          .top {
            display: flex;
            justify-content: center;
            font-size: 22px;
            color:#333333;
          }
        }
        .ivu-modal-body {
          border: 0;
          padding: 0;
          padding: 0 40px;
          
          .modal-content{
            display: flex;
            flex-wrap: wrap;
            height: 276px;
            overflow: auto;
            padding-left: 20px;
            padding-top: 20px;
            li{
              border:1px solid #BFBFBF;
              width: 220px;
              height: 220px;
              border-radius:4px;
              margin-bottom: 20px;
              margin-right: 20px;
              text-align: center;
              position: relative;
              cursor: pointer;
              display: flex;
              align-items: center;
              .bottom{
                position: absolute;
                bottom:0;
                left:0;
                background-color: #E2EEFF;
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                padding-left: 20px;
                color:#4680FF;
                font-size: 14px;
                border-radius: 0px 0px 4px 4px;
                img{
                  margin-right: 10px;
                }
              }
              .sign-pic{
                width: 100%;
              }
            }
            .default{
              box-shadow:0px 0px 21px 0px rgba(14,57,111,0.2);
              border: 0;
            }
          }
          /*滚动条整体样式*/
          .modal-content::-webkit-scrollbar {
            width: 10px;
            height: 1px;
          }
          /*滚动条滑块*/
          .modal-content::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #b7b5b5;
          }
          /*滚动条轨道*/
          .modal-content::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
            border-radius: 10px;
            background: #ddd;
          }
        }
        
        .ivu-modal-footer {
          border: 0;
          padding: 0;
          .okBtn {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            padding: 0 280px;
            .ivu-btn {
              width: 90px;
              height: 40px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
</style>