<template>
  <div class="signDetails">
    <vheader></vheader>
    <div class="title">
      <div class="back" @click="back">
        <img src="../../assets/img/contract/back.png" alt />
      </div>
      <h2>合同名称</h2>
      <div></div>
    </div>
    <div class="content">
      <ul class="left">
        <li
          v-for="(item, index) in leftList"
          :key="index"
          :class="[leftIndex == index ? 'click' : '']"
          @click="jump(index)"
        >
          <div class="triangle">
            <p>{{index + 1}}</p>
          </div>
        </li>
      </ul>
      <div class="center">
        <div class="contract" v-for="(item, index) in centerList" :key="index">
          <!-- 自己默认签章 -->
          <div
            class="contract-sign"
            v-for="(x, i) in item.signList"
            :key="i"
            :style="{top: x.positionY + 'px',left: x.positionX + 'px'}"
          >
            <div class="mark"></div>
            <img src="../../assets/img/sign/sign.png" class="default-pic" alt />
          </div>

          <!-- 待他人签的签署区域 -->
          <div
            class="contract-sign sign-region"
            v-for="(y, i) in item.regionList"
            :key="'region' + i"
            :style="{top: y.positionY + 'px', left: y.positionX + 'px'}"
          >
            <div class="mark"></div>
            <p>闫泽鹏签署区域</p>
          </div>

          <!-- 自定义输入框 -->
          <div
            class="text"
            v-for="(z, i) in item.text"
            :key="'text' + i"
            :style="{top: z.positionY + 'px', left: z.positionX + 'px'}"
          >{{z.value}}</div>
          <h1>{{item.page}}</h1>
        </div>
      </div>

      <div class="right">
        <h3>文件信息</h3>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />文件主题
        </h4>
        <p>保证合同-抵押担保</p>
        <h4>
          <img src="../../assets/img/contract/signer.png" alt />文件状态
        </h4>
        <p style="color:#2D8CF0;">待他签</p>
        <h3>待签署方</h3>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />发起方
        </h4>
        <ul class="signer">
          <li>
            <div class="name">
              姓名：
              <span>闫泽鹏</span>
            </div>
            <div class="phone">
              手机号：
              <span>13262107141</span>
            </div>
            <div class="date">
              签署时间：
              <span>2020-03-20 01:01:01</span>
            </div>
          </li>
        </ul>
        <h4>
          <img src="../../assets/img/contract/signer.png" alt />接收方
        </h4>
        <ul class="signer">
          <li>
            <div class="name">
              姓名：
              <span>闫泽鹏</span>
            </div>
            <div class="phone">
              手机号：
              <span>13262107141</span>
            </div>
          </li>
        </ul>
        <h3>截止时间</h3>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />截止时间
        </h4>
        <p>2020-03-20 03：59：59</p>
        <div class="btn">
          <Button>撤回</Button>
          <Button type="primary" @click="modal = true">短信提醒</Button>
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
      leftIndex: 0,
      leftList: [
        {
          number: 1
        },
        {
          number: 2
        },
        {
          number: 3
        },
        {
          number: 4
        }
      ],
      scrollTop: 0,
      centerList: [
        {
          page: 1,
          signList: [],
          regionList: [],
          text: []
        },
        {
          page: 2,
          signList: [],
          regionList: [],
          text: []
        },
        {
          page: 3,
          signList: [],
          regionList: [],
          text: []
        },
        {
          page: 4,
          signList: [],
          regionList: [],
          text: []
        }
      ],
      signNum: 0,
      regionNum: 0,
      textNum: 0,
      value: "",
      modal: false,
      phone: "13262107141",
      code: "",
      modalchangeSign: false,
      signAdminList: [
        {
          url: require("../../assets/img/sign/sign.png")
        },
        {
          url: require("../../assets/img/sign/sign.png")
        },
        {
          url: require("../../assets/img/sign/sign.png")
        },
        {
          url: require("../../assets/img/sign/sign.png")
        },
        {
          url: require("../../assets/img/sign/sign.png")
        }
      ],
      signDefault: 0
    };
  },
  mounted() {
    let date = new Date();
    date = moment(new Date()).format("YYYY年MM月DD日");
    this.value = date;
  },
  methods: {
    // 点击左侧移动至对应合同页数
    jump(index) {
      this.leftIndex = index;
      let center = document.getElementsByClassName("center")[0];
      center.scrollTop = index * 1052;
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
    z-index: 999;
    h2 {
      font-size: 16px;
      color: #333333;
    }
    .back {
      cursor: pointer;
    }
  }
  .content {
    margin-top: 60px;
    width: 100%;
    height: calc(~ "100vh - 140px");
    display: flex;
    justify-content: space-between;
    .left {
      width: 320px;
      min-width: 320px;
      background-color: #fff;
      padding: 50px 40px;
      overflow: auto;
      overflow-x: hidden;
      li {
        width: 240px;
        height: 340px;
        border: 1px solid #bfbfbf;
        margin-bottom: 30px;
        position: relative;
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
        border: 1px solid #127fd2;
        .triangle {
          border-color: #127fd2 transparent transparent transparent;
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
      overflow: auto;
      padding-top: 10px;
      .contract {
        width: 760px;
        height: 1052px;
        background-color: #fff;
        position: relative;
        margin-bottom: 10px;
        .contract-sign {
          width: 120px;
          height: 120px;
          position: absolute;
          top: 0;
          left: 0;
          border: 1px dashed #127fd2;
          cursor: move;
          .default-pic {
            width: 120px;
            z-index: -999;
          }
          .del-pic {
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
          }
          .mark {
            position: absolute;
            top: 0;
            left: 0;
            width: 120px;
            height: 120px;
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
        .text {
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
        margin: 0 auto;
        box-shadow: 0px 3px 16px 0px rgba(14, 57, 111, 0.24);
        position: relative;
        margin-bottom: 20px;
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
          z-index: -1;
        }
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
          .phone {
            margin-bottom: 14px;
            padding-left: 14px;
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
      .btn {
        margin-top: 86px;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        .ivu-btn {
          width: 100px;
          height: 38px;
          color: #a3a3a3;
        }
        .ivu-btn-primary {
          color: #ffffff;
          background-color: #127fd2;
        }
      }
      p {
        font-size: 14px;
        color: #777777;
        padding-left: 22px;
        margin-bottom: 16px;
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