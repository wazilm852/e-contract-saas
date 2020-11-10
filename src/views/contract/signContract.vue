<template>
  <div class="signContent">
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
          <!-- 待他人签的签署区域 -->
          <div
            class="contract-sign sign-region"
            v-for="(y, i) in item.signInfos_signatory"
            :key="'region' + i"
            :style="{top: y.lefttopy + 'px', left: y.lefttopx + 'px'}"
          >
            <img v-if='signFlag' class='default-pic' :src="signObj.oss" alt="">
            <p v-else>{{y.name}}签署区域</p>
          </div>

          <img class='contractPic' :src="item.url" alt="">
        </div>
      </div>
      <div class="right">
        <h3>合同签署</h3>
        <h5>提示：点击右下方签署按钮，即可用该签章签署</h5>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />个人印章
        </h4>
        <div class="sign">
          <img :src="signObj.oss" class="default-pic" alt />
          <p>
            <img src="../../assets/img/contract/default.png" alt />默认签章
          </p>
        </div>
        <div class="change" @click="modalchangeSign = true">
          <img src="../../assets/img/contract/change.png" alt />
          更换签章
        </div>
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
        
        <div class="btn">
          <Button type="primary" @click="submit">立即签署</Button>
        </div>
        
        <!-- 验证是否本人操作 -->
        <Modal class="modal" :mask-closable="false" v-model="codeModal">
          <div slot="header" class="top">
            短信验证码
          </div>
          <div class="modal-content">
            <span class="label">手机号</span>
            <div class="input">
              <Input v-model="phone" disabled maxlength="11" />
            </div>
          </div>
          <div class="modal-content">
            <span class="label">验证码</span>
            <div class="input">
              <Input v-model="code" maxlength="4" placeholder="请输入验证码" />
              <span v-if='isSend' class="sendCode" @click='sendCode'>发送验证码</span>
              <span v-else class="sendCode sendCode-c">{{codeNum}}后重试</span>
            </div>
          </div>
          <div slot="footer" class="okBtn">
            <Button @click="codeModal = false">取消</Button>
            <Button type="primary" @click="ok">确认</Button>
          </div>
        </Modal>

        <!-- 更换签章 -->
        <Modal class="modalchangeSign" :mask-closable="false" v-model="modalchangeSign">
          <div slot="header" class="top">
            更换签章
          </div>
          <ul class="modal-content">
            <li :class="[item.is_default ? 'default' : '']" v-for="(item, index) in signAdminList" :key="index" @click="checkDefault(item.id)">
              <img :src="item.oss" alt="" class="sign-pic">
              <div class="bottom" v-if="item.is_default">
                <img src="../../assets/img/contract/default.png" alt />默认签章
              </div>
            </li>
          </ul>
          <div slot="footer" class="okBtn">

          </div>
        </Modal>
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
      lefttopx: 0, //签章X坐标
      lefttopy: 0, //签章Y坐标
      scrollTop: 0,
      centerList: [], //合同列表
      signatory: [], //签署人列表
      sponArray: {}, // 发起人信息
      signNum: 0,
      regionNum: 0,
      textNum: 0, 
      value: "",
      codeModal: false, // 短信验证modal
      phone: '',
      code: '', // 验证码 
      modalchangeSign: false,
      signAdminList: [], // 签章list
      signObj: {}, //默认签章
      codeNum: 60, //验证码读秒
      isSend: true, // 验证码切换
      signFlag: false // 点击签署改变状态
    };
  },
  mounted() {
    this.phone = JSON.parse(this.$vc.get('userInfo')).phone
    let center = document.getElementsByClassName("center")[0];
    center.addEventListener("scroll", this.showIcon);
    let date = new Date();
    date = moment(new Date()).format("YYYY年MM月DD日");
    this.value = date;
  },
  created() {
    this.showContract()
    this.showSigntrue()
  },
  methods: {
    // 展示合同
    showContract() {
      this.$api.meSign({
        con_id: this.$route.query.id
      }).then(res=>{
        if(res.code == 0) {
          this.contractTitle = res.data.title
          this.centerList = res.data.imgs
          this.sponArray = res.data.sponArray
          this.signatory = res.data.signArray
        }
      })
    },
    // 签章
    showSigntrue() {
      this.$api.signList({

      }).then(res=>{
        if(res.code == 0) {
          this.signAdminList = res.data
          this.signAdminList.forEach((item, index)=>{
            if(item.is_default) {
              this.signObj = item
            }
          })
        }
      })
    },
    // 点击左侧移动至对应合同页数
    jump(index) {
      this.leftIndex = index;
      let center = document.getElementsByClassName("center")[0];
      center.scrollTop = index * 1052;
    },

    // 展示签署人签署区域
    regionShow(item, i) {
      let index =
        this.scrollTop - 700 ? parseInt((this.scrollTop - 700) / 1052 + 1) : 0;
      if (this.centerList[index].signInfos_signatory.length >= 10) {
        this.$Message.error("每页最多10个签章");
      } else {
        this.centerList[index].signInfos_signatory.push({
          lefttopx: 630,
          lefttopy: this.regionNum,
          num: index + 1,
          name: item.name,
          id: item.id,
          signer: i
        });
        this.regionNum += 20;

        this.signatory[i].count ++
      }
    },

    // 记录scroolTio
    showIcon() {
      let center = document.getElementsByClassName("center")[0];
      this.scrollTop = center.scrollTop;
      this.leftIndex = parseInt(this.scrollTop / 1052);
    },

    // 删除签章
    delect(index, i, flag) {
      if (flag == 0) {
        this.centerList[index].signInfos_sponsor.splice(i, 1);
      } else {
        var signer = this.centerList[index].signInfos_signatory[i].signer  // 获取签署人的下标
        this.centerList[index].signInfos_signatory.splice(i, 1);
        this.signatory[signer].count --
      }
      // this.$forceUpdate();
    },
    //更换签章
    checkDefault(id) {
      this.$api.setDefault({
        id: id
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.showSigntrue()
        }
      })
    },
    // 发送验证码
    sendCode() {
      this.$api.getCode({
        phone: this.phone
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.isSend = false
          var t = setInterval(()=>{
            this.codeNum --
            if(this.codeNum <= 0) {
              this.codeNum = 60
              clearInterval(t)
              this.isSend = true
            } 
          }, 1000)
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    // 验证验证码
    ok() {
      if (this.code) {
        this.$api.checkSms({
          phone: this.phone,
          code: this.code
        }).then(res=>{
          this.modal = false;
          
        // loading
        this.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', 'Loading')
                ])
            }
        });
          var obj = JSON.stringify(this.signObj)
          this.$api.meSignSave({
            con_id: this.$route.query.id,
            use_sign: obj
          }).then(res=>{
            if(res.code == 0) {
              this.$Spin.hide();
              this.$Message.success(res.msg)
              this.$router.push({name: 'signDetails', query:{id:this.$route.query.id}})
            } else {
              this.$Spin.hide();
              this.$Message.error(res.msg)
            }
          })
        })
        
      } else {
        this.modal = true;
        this.$Message.error("验证码不能为空");
      }
    },
    // 提交
    submit() {
        this.signFlag = true
      this.codeModal = true
    },
    // 返回上一页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.signContent {
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
          width: 100%;
          margin:0 auto ;
          height: 38px;
          color: #a3a3a3;
        }
        .ivu-btn-primary {
          color: #ffffff;
          background-color: #127FD2;
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
.signContent {
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