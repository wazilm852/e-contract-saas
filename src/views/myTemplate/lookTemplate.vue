<template>
  <div class="signContract">
    <vheader></vheader>
    <div class="title">
      <div class="back" @click="back">
        <img src="@/assets/img/contract/back.png" alt />
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
          <!-- 自定义输入框 -->
          <div 
          class="text" 
          v-for="(z, i) in item.text"
          :key="'text' + i"
          :style="{top: z.leftbottomy + 'px', left: z.leftbottomx + 'px', width: z.width + 'px'}"
          @mousedown="move($event, index, i)"
          >
            <img
              src="@/assets/img/contract/del.png"
              class="del-pic"
              @click="delect(index, i)"
              alt
            />
            <span 
                @mousedown.stop="moveWidth($event, index, i)" 
                class='move-pic'
            ></span>
            文本编辑区域
            <!-- 2020年03月24日 -->
          </div>
          <img class='contractPic' :src="item.url" alt="">
        </div>
      </div>
      <div class="right">
        <h3>模板设置</h3>
        <h5>合同模板使用时，可能需要对局部进行编辑，而模板设置就是设置好哪些区域能够编辑。</h5>
        <h3>设置编辑区域</h3>
        <h5>提示：将文本编辑区域拖拽到合同内(编辑时，文本内容不能超出编辑区域长度)</h5>
        <div style="width: 200px; margin: 0 auto;">
          <Input v-model="value" disabled style="width: 200px; margin: 0 auto;" maxlength="11" icon="md-return-left" @on-click="inputClick" />
        </div>
        <div class="btn">
          <Button type="primary" @click="keep">保存</Button>
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
      contractTitle: '', //合同名称
      leftIndex: 0,
      positionX: 0, //签章X坐标
      positionY: 0, //签章Y坐标
      scrollTop: 0,
      centerList: [], // 合同list
      signNum: 0,
      regionNum: 0,
      textNum: 0, 
      value: "设置文本编辑区域",
      modal: false,
      phone: '13262107141',
      code: '',
      modalchangeSign: false,
      signDefault: 0,
    };
  },
  mounted() {
    let center = document.getElementsByClassName("center")[0];
    center.addEventListener("scroll", this.showIcon);
    // let date = new Date();
    // date = moment(new Date()).format("YYYY年MM月DD日");
    // this.value = date;
  },
  created() {
      this.contractShow();
  },
  methods: {
    // 展示合同
    contractShow() {
        this.$api.lookTemplate({
            id: this.$route.query.id,
            type: this.$route.query.type,
        }).then(res=>{
            if(res.code == 0) {
                this.contractTitle = res.data.title
                this.centerList = res.data.imgs
            }
        })
    },
    // 点击左侧移动至对应合同页数
    jump(index) {
      this.leftIndex = index;
      let center = document.getElementsByClassName("center")[0];
      center.scrollTop = index * 1052;
    },

    // 展示自定义输入区域
    inputClick() {
      let index =
        this.scrollTop - 700 ? parseInt((this.scrollTop - 700) / 1052 + 1) : 0;
      if (this.centerList[index].text.length >= 10) {
        this.$Message.error("每页最多10个自定义区域");
      } else {
        //         leftbottomx: 153,
        //         leftbottomy: 622,
        //         num: 1,
        //         width: 328
        this.centerList[index].text.push({
          leftbottomx: 290,
          leftbottomy: this.textNum,
          num: index + 1,
          width: 200,
          height: 20
        });
        this.textNum += 20;
      }
    },

    // 记录scroolTio
    showIcon() {
      let center = document.getElementsByClassName("center")[0];
      this.scrollTop = center.scrollTop;
      this.leftIndex = parseInt(this.scrollTop / 1052);
    },
    // 拖拽长度
    moveWidth(e, index, i) {
        let odiv = e.currentTarget;
        var ol = odiv.offsetLeft
        var oldX = e.clientX
        document.onmousemove = e => {
            var add = e.clientX - oldX
            var moveLen = ol + add
            this.centerList[index].text[i].width = moveLen;
        };
        document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    },
    // 移动文本框
    move(e, index, i) {
      let odiv = e.currentTarget; //获取目标元素

      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        //绑定元素位置到positionX和positionY上面

        //移动当前元素
        /*top <= 0
          ? (odiv.style.top = 0 + "px")
          : top >= 930
          ? (odiv.style.top = 930 + "px")
          : (odiv.style.top = top + "px");
        left <= 0
          ? (odiv.style.left = 0 + "px")
          : left >= 630
          ? (odiv.style.left = 630 + "px")
          : (odiv.style.left = left + "px");*/

        top <= 0 ? (top = 0) : top >= 1020 ? (top = 1020) : (top = top);
        left <= 0 ? (left = 0) : left >= 550 ? (left = 550) : (left = left);
        
        this.centerList[index].text[i].leftbottomx = left;
        this.centerList[index].text[i].leftbottomy = top;
        // this.$forceUpdate();
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    // 删除签章
    delect(index, i) {
        this.centerList[index].text.splice(i, 1);
      // this.$forceUpdate();
    },
    // 保存
    keep() {
        console.log(this.centerList)
        var arr = JSON.stringify(this.centerList)
        // var arr = JSON.parse(this.centerList)
        this.$api.saveTemp({
            id: this.$route.query.id,
            list: arr
        }).then(res=>{
            // if(res.code == 0) {

            // }
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
.signContract {
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
        .text{
          width: 200px;
          height: 20px;
          border: 1px dashed #127fd2;
          line-height: 20px;
          position: absolute;
          cursor: move;
          text-align: center;
          .del-pic {
            width: 14px;
            position: absolute;
            top: -8px;
            right: -8px;
            cursor: pointer;
            display: none;
          }
          .move-pic{
            width: 2px;
            height: 20px;
            position: absolute;
            bottom: -8px;
            right: -8px;
            cursor: e-resize;
          }
          .move-pic::before{
                content: '';
                background: url('../../assets/img/contract/move.png')no-repeat;
                background-size: 14px;
                width: 14px;
                height: 14px;
                position: absolute;
                bottom: 0;
                right: 0;
                cursor: e-resize;
            }
        }
        
        .text:hover .del-pic {
            display: block;
        }
        h1 {
          text-align: center;
          font-size: 100px;
        }
        .contractPic{
            width: 100%;
            height: 100%;
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
.signContract {
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
            }
            .default{
              box-shadow:0px 0px 21px 0px rgba(14,57,111,0.2);
              border: 0;
            }
            .sign-pic{
              width: 90%;
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