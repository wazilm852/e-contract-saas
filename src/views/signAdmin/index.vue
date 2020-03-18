<template>
  <div class="signAdmin">
    <vheader></vheader>
    <div class="content">
      <div class="title">我的签章</div>
      <ul class="signs">
        <li>
          <img class="pic" src="../../assets/img/sign/sign.png" alt />
          <div class="default">
            <img src="../../assets/img/sign/start.png" alt />
            默认签章
          </div>
        </li>
        <li class="add-box" @click="modalSign = true">
          <div class="add">
            <img src="../../assets/img/sign/add.png" alt />
            添加签章
          </div>
        </li>
      </ul>
      <!-- 手绘签章 -->
      <div class="modalSign" v-show="modalSign">
        <div class="box">
          <div class="title">
            <div class="close">
              <Icon type="md-close" style="cursor: pointer" @click="close" />
            </div>
            <h2>手绘签名</h2>
          </div>
          <div class="modalSign-content">
            <div class="message">提示：请在以下区域绘制签名！</div>
            <div class="sign-region">
              <canvas
              id="canvas"
              width="890"
              height="350"
              @mousedown="canvasDown($event)"
              @mousemove="canvasMove($event)"
              @mouseup="canvasUp($event)"
              @mouseleave="canvasLeave($event)"
              ref="canvas"
            >抱歉，您的浏览器不支持canvas元素</canvas>
            </div>
            <Row>
                <Col span="12">
                    <ColorPicker @on-change="changeColor" v-model="defortColor" recommend />
                </Col>
            </Row>
          </div>
          <div class="footer">
            <Button @click="clear">清空</Button>
            <Button type="primary" @click="okAdd">提交</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
export default {
  components: {
    vheader
  },
  data() {
    return {
      modalSign: false,
      canvasMoveUse: false,
      defortColor: '#000000'
    };
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = 5; //设置线的宽度
      this.ctx.strokeStyle = this.defortColor;
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.target.offsetLeft;
      const canvasY = e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        const t = e.target;
        let canvasX;
        let canvasY;
        canvasX = e.clientX - t.offsetLeft;
        canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false;
    },
    canvasLeave(e) {
      this.canvasMoveUse = false;
    },
    // 清空
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    okAdd() {},
    close() {
      this.modalSign = false
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    changeColor(value) {
      this.defortColor = value
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.show()
    }
  }
};
</script>

<style lang="less" scoped>
.signAdmin {
  width: 100%;
  height: 100%;
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    .title {
      font-size: 16px;
      color: #0e396f;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .signs {
      width: 1200px;
      display: flex;
      // justify-content: space-between;
      li {
        width: 280px;
        height: 280px;
        border-radius: 4px;
        box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
        margin-right: 26px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .pic {
          width: 160px;
        }
        .default {
          width: 100%;
          height: 40px;
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #e2eeff;
          padding-left: 20px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #4680ff;
          img {
            margin-right: 10px;
          }
        }
        .add {
          width: 56px;
          height: 90px;
          font-size: 14px;
          color: #4680ff;
          text-align: center;
          img {
            margin-bottom: 20px;
          }
        }
      }
      .add-box {
        cursor: pointer;
      }
    }
    .modalSign {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 999;
      .box {
        width: 950px;
        height: 670px;
        margin: 0 auto;
        margin-top: 200px;
        background-color: #fff;
        padding: 30px;
        border-radius: 6px;
        .title {
          margin-bottom: 10px;
          .close {
            text-align: right;
            font-size: 24px;
            line-height: 0;
          }
          h2 {
            font-size: 24px;
            text-align: center;
            color: #0E396F;
            font-weight: bold;
          }
        }
        .modalSign-content {
          .message {
            color: #ccc;
            font-size: 18px;
            margin-bottom: 20px;
          }
          .sign-region {
            width: 890px;
            height: 350px;
            border: 1px solid #ccc;
            margin-bottom: 30px;
          }
        }
        .footer {
          margin-top: 30px;
          display: flex;
          justify-content: space-around;
          padding: 0 205px;
          .ivu-btn {
            width: 100px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>