<template>
  <div class="signContract">
    <vheader></vheader>
    <div class="title">
      <div class="back">
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

          <div 
          class="contract-sign" 
          v-for="(x, i) in item" 
          :key="i" 
          @mousedown="move($event, index, i)">
            <div class="mark"></div>
            <img src="../../assets/img/contract/del.png" class="del-pic" @click="delect(index, i)" alt />
            <img src="../../assets/img/sign/sign.png"  class="default-pic" alt />
          </div>

          <ul>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
            <li>
              {{positionX}}
              {{positionY}}
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <h3>合同签署</h3>
        <h5>提示：点击签章，可将签章拖拽到合同内任意位置</h5>
        <h4>
          <img src="../../assets/img/contract/launch.png" alt />个人印章
        </h4>
        <div class="sign" @click="signShow">
          <img src="../../assets/img/sign/sign.png" class="default-pic" alt />
          <p>
            <img src="../../assets/img/contract/default.png" alt />默认签章
          </p>
        </div>
        <div class="change">
          <img src="../../assets/img/contract/change.png" alt />
          更换签章
        </div>
        <h3>待签署方</h3>
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
        <h4>
          <img src="../../assets/img/contract/signer.png" alt />待签位置
        </h4>
        <div class="toBesign">
          <img src="../../assets/img/contract/signing.png" alt />待签署区域
        </div>
        <h4>设置编辑区域</h4>
      </div>
    </div>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
import draggable from "vuedraggable";
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
      positionX: 0, //签章X坐标
      positionY: 0, //签章Y坐标
      scrollTop: 0,
      centerList: [
        [
          
        ],
        [
          
        ],
        [
          
        ],
        [
          
        ],
      ]
    };
  },
  mounted() {
      let center = document.getElementsByClassName('center')[0]
      center.addEventListener("scroll", this.showIcon);
  },
  methods: {
    jump(index) {
      this.leftIndex = index;
      let center = document.getElementsByClassName('center')[0]
      center.scrollTop = index*1052
    },

    signShow() {
      let index = this.scrollTop - 700 ? parseInt((this.scrollTop-700)/1052 + 1) : 0

      // this.centerList[index].push({
      //   positionX: 0, 
      //   positionY: 0, 
      // })

      this.$set(this.centerList[index], this.centerList[index].length, {
        positionX: 0, 
        positionY: 0,
      })
    },

    showIcon() {
      let center = document.getElementsByClassName('center')[0]
      this.scrollTop = center.scrollTop
      this.leftIndex = parseInt(this.scrollTop/1052)
    },

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
        top <= 0
          ? (odiv.style.top = 0 + "px")
          : top >= 930
          ? (odiv.style.top = 930 + "px")
          : (odiv.style.top = top + "px");
        left <= 0
          ? (odiv.style.left = 0 + "px")
          : left >= 630
          ? (odiv.style.left = 630 + "px")
          : (odiv.style.left = left + "px");

        this.centerList[index][i].positionX = top;
        this.centerList[index][i].positionY = left;
        // this.positionX = top;
        // this.positionY = left;
      };0
       document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    delect(index, i) {
      // JSON.parse(JSON.stringify(this.centerList[index]))

      console.log(this.centerList[index])
      this.$delete(this.centerList[index], i)
      console.log(this.centerList[index])

      
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
    z-index: 999;
    h2 {
      font-size: 16px;
      color: #333333;
    }
  }
  .content {
    margin-top: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      width: 320px;
      background-color: #fff;
      height: calc(100vh - 140px);
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
      background-color: #eaeaea;
      height: calc(100vh - 140px);
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
          cursor: pointer;
          .default-pic {
            width: 120px;
            z-index: -999;
          }
          .del-pic {
            position: absolute;
            top: -10px;
            right: -10px;
          }
          .mark{
            position: absolute;
            top:0;
            left:0;
            width: 120px;
            height: 120px;
          }
        }
        ul {
          li {
            width: 100%;
            height: 50px;
            margin-bottom: 50px;
            text-align: center;
          }
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
      background-color: #fff;
      height: calc(100vh - 140px);
      padding: 50px 40px;
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
      h5{
        font-size: 12px;
        color: #888;
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