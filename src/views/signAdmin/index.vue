<template>
  <div class="signAdmin">
    <vheader></vheader>
    <div class="content">
      <div class="title">我的签章</div>
      <ul class="signs">
        <li v-for='(item, index) in list' :key='index'>
          <Icon type="ios-close" class='icon' @click='del(item.id)' />
          <img class="pic" :src='item.oss' alt />
          <div class="default" v-if="item.is_default">
            <img src="../../assets/img/sign/start-c.png" alt />
            <span style='color: #2981d9;'>默认签章</span>
          </div>
          <div class="default" v-else>
            <img @click='setDefault(item.id)' src="../../assets/img/sign/start.png" alt />
            <span>默认签章</span>
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
import vfooter from "@/components/footer.vue";
export default {
  components: {
    vheader,
    vfooter
  },
  data() {
    return {
      modalSign: false,
      canvasMoveUse: false,
      defortColor: "#000000",
      list: []
    };
  },
  created() {
    this.signList()
  },
  mounted() {
    this.show();
  },
  methods: {
    // 展示签章列表
    signList() {
      this.$api.signList({
        
      }).then(res=>{
        if(res.code == 0) {
          console.log(res)
          this.list = res.data
        }
      })
    },
    // 设置默认签章
    setDefault(id) {
      this.$api.setDefault({
        id: id
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.signList()
        }
      })
    },
    // 删除签章
    del(id) {
      this.$api.deleteSign({
        id: id
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.signList()
        }
      })
    },
    show() {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = 5; //设置线的宽度
      this.ctx.strokeStyle = this.defortColor;
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.target.offsetLeft;
      const canvasY =
        e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
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
    okAdd() {
      var base64Img = this.canvas.toDataURL('image/jpg');
      this.$api.addSign({
        img: base64Img
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.msg)
          this.modalSign = false
          this.signList()
        } else {
          this.$Message.error(res.msg)
        }
      })
    },
    close() {
      this.modalSign = false;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    changeColor(value) {
      this.defortColor = value;
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.show();
    }
  }
};
</script>

<style lang="less" scoped>
.signAdmin {
  width: 100%;
  // height: 100vh;
  // display: grid;
  // grid-template-rows: 1fr auto;
  .footer {
    grid-row-start: 3;
    grid-row-end: 3;
  }
  .content {
    width: 1200px;
    // height: 79.8vh;
    margin: 0 auto;
    padding-top: 30px;
    .title {
      font-size: 16px;
      color: #0e396f;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .signs {
      width: 1200px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 280px;
        height: 280px;
        border-radius: 4px;
        box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
        margin-right: 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
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
          // color: #2981d9;
          color: #AAAAAA;
          img {
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .add {
          width: 56px;
          height: 90px;
          font-size: 14px;
          color: #2981d9;
          text-align: center;
          img {
            margin-bottom: 20px;
          }
        }
        .icon{
          position: absolute;
          top: 4px;
          right: 4px;
          font-size: 30px;
          cursor: pointer;
          display: none;
        }
      }
      li:hover .icon{
        display: block;
      }
      .add-box {
        cursor: pointer;
      }
    }
    .modalSign {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      .box {
        width: 950px;
        height: 670px;
        // margin: 0 auto;
        // margin-top: 200px;
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
            color: #333333;
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