<template>
  <div class="startcontract">
    <vheader></vheader>
    <div class="content">
      <div class="upload">
        <div class="title">
          <img src="../../assets/img/contract/1.png" alt />
          上传合同
        </div>
        <div class="box">
          <div class="left"></div>
          <div class="center">
            <div class="text">
              <div class="text-l">合同名称</div>
              <div class="text-r">上传成功</div>
            </div>
            <Progress :percent="100" />
          </div>
          <div class="right">
            <Button class="btn">重新上传</Button>
          </div>
        </div>
      </div>
      <div class="contractMessage">
        <div class="title">
          <img src="../../assets/img/contract/2.png" alt />
          填写合同信息
        </div>
        <div class="box">
          <div class="box-content">
            <span class="label">合同名称</span>
            <Input v-model="contractName" type="text" />
          </div>
          <div class="box-content">
            <span class="label">签署截止日期</span>
            <Row>
              <Col span="12">
                <DatePicker type="date" :options="options3" placeholder="默认截止时间是七天"></DatePicker>
              </Col>
            </Row>
            <span class="text">所有签署方须在截止日期前完成签署</span>
          </div>
        </div>
      </div>
      <div class="signer">
        <div class="title">
          <img src="../../assets/img/contract/3.png" alt />
          填写签署方信息
        </div>
        <div class="table">
          <div class="signer-name">签署方名称</div>
          <div class="name">姓名</div>
          <div class="phone">手机号</div>
          <div class="ope">操作</div>
        </div>
        <div class="initiator">
          <div class="signer-name">发起人</div>
          <div class="name">
            <Input type="text" disabled v-model="initiator.name" />
          </div>
          <div class="phone">
            <Input type="text" disabled v-model="initiator.phone" />
            <img src="../../assets/img/contract/certified.png" alt />
            <span>已实名</span>
          </div>
        </div>
        <div
          class="signatory"
          v-for="(item, index) in list"
          :key="index"
          @mouseenter="item.flag = true"
          @mouseleave="item.flag = false"
        >
          <div class="signer-name">签署人</div>
          <div class="name">
            <Input type="text" v-model="item.name" placeholder="请输入姓名" />
          </div>
          <div class="phone">
            <Input type="text" v-model="item.phone" placeholder="请输入手机号" />
            <img src="../../assets/img/contract/uncertified.png" alt />
            <span>未实名</span>
          </div>
          <div class="ope" @click="del(index)" v-if="item.flag">删除</div>
        </div>
        <div class="btn">
          <div class="add" @click="add">
            <img src="../../assets/img/contract/add.png" alt />添加签署方
          </div>
          <div class="add" @click="modalMailList = true">
            <img src="../../assets/img/contract/add.png" alt />从通讯录添加
          </div>
        </div>
        <!-- 通讯录 -->
        <Modal class="modalMailList" :mask-closable="false" v-model="modalMailList">
          <p slot="header">从通讯录添加</p>
          <Table ref="selection" :columns="columns" :data="data" class="table" v-if="data.length"></Table>
          <div class="null" v-else>暂无任何记录</div>
          <Page :current="2" :total="50" simple class="page" v-if="data.length" />
          <div slot="footer" class="okBtn">
            <Button @click="modalMailList = false">取消</Button>
            <Button type="primary" @click="okAdd">确认</Button>
          </div>
        </Modal>
      </div>
      <div class="next">
        <Button class="btn" @click="next">下一步</Button>
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
      contractName: "保证合同-抵押担保",
      modalMailList: false,
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      initiator: {
        name: "闫泽鹏",
        phone: "13262107141"
      },
      list: [
        {
          name: "",
          phone: "",
          flag: false //删除按钮
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "账号",
          key: "user"
        },
        {
          title: "姓名",
          key: "name"
        }
      ],
      data: [
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        },
        {
          user: "13262107141",
          name: "奥巴马"
        }
      ]
    };
  },
  methods: {
    add() {
      if (this.list.length < 10) {
        this.list.push({
          name: "",
          phone: "",
          flag: false
        });
      } else {
        this.$Message.error("最多添加10个签署人");
      }
    },
    del(index) {
      this.list.splice(index, 1);
    },
    next() {
      console.log(this.list);
    },
    okAdd() {},
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    }
  }
};
</script>

<style lang="less" scoped>
.startcontract {
  width: 100%;
  height: 100%;
  .content {
    width: 1200px;
    margin: 0 auto;
    .upload {
      width: 100%;
      height: 300px;
      margin-top: 60px;
      box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
      padding: 30px;
      margin-bottom: 30px;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        img {
          margin-right: 7px;
        }
      }
      .box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 26px;
        .left {
          width: 180px;
          height: 200px;
          border: 1px solid #e0e0e0;
        }
        .center {
          width: 600px;
          .text {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding-right: 34px;
          }
        }
        .right {
          width: 100px;
          .btn {
            width: 100px;
            height: 30px;
            background-color: #127fd2;
            border-radius: 4px;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
    .contractMessage {
      width: 100%;
      height: 180px;
      box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
      padding: 30px;
      margin-bottom: 30px;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        img {
          margin-right: 7px;
        }
      }
      .box-content {
        width: 100%;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        .label {
          width: 100px;
          text-align: right;
          margin-right: 20px;
        }
        .ivu-input-wrapper {
          width: 500px;
          height: 30px;
        }
        .ivu-row {
          width: 500px;
          height: 30px;
          .ivu-date-picker {
            width: 500px;
          }
        }
        .text {
          font-size: 12px;
          color: #a3a3a3;
          margin-left: 10px;
        }
      }
    }
    .signer {
      width: 100%;
      box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
      padding: 30px;
      margin-bottom: 30px;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        img {
          margin-right: 7px;
        }
      }
      .table,
      .initiator,
      .signatory {
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: flex;
        padding-left: 26px;
        border-top: 1px solid #eaeaea;
        border-bottom: 1px solid #eaeaea;
        font-size: 16px;
        color: #333333;
        .signer-name {
          width: 122px;
        }
        .name {
          width: 218px;
        }
        .phone {
          width: 273px;
          display: flex;
          align-items: center;
          img {
            margin: 0 8px;
          }
          span {
            font-size: 14px;
            color: #333333;
          }
        }
        .ope {
          width: 500px;
          text-align: center;
        }
      }
      .initiator,
      .signatory {
        height: 60px;
        border: 0;
        background-color: #f6f8fd;
        margin-top: 10px;
        align-items: center;
        .ivu-input-wrapper {
          width: 160px;
          height: 30px;
        }
        .ope {
          cursor: pointer;
        }
      }
      .initiator:hover {
        background-color: #e9f0ff;
      }
      .signatory:hover {
        background-color: #e9f0ff;
      }
      .btn {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .add {
          width: 500px;
          height: 40px;
          border-radius: 4px;
          border: 1px dashed #e0e0e0;
          font-size: 14px;
          color: #127fd2;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            margin-right: 5px;
          }
        }
        .add:hover {
          background-color: #f6f8fd;
        }
      }
    }
    .next {
      width: 100%;
      height: 30px;
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 200px;
      .btn {
        width: 100px;
        height: 30px;
        background-color: #127fd2;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        line-height: 30px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="less">
.modalMailList {
  .ivu-modal {
    width: 600px !important;
    height: 700px;
    top: 10%;
    .ivu-modal-content {
      width: 600px !important;
      height: 700px;
      .ivu-modal-header {
        border: 0;
        padding-top: 60px;
        padding-bottom: 0;
        text-align: center;
        margin-bottom: 40px;
        p {
          font-size: 18px;
          color: #0e396f;
          font-weight: bold;
        }
      }
      .ivu-modal-body {
        border: 0;
        padding: 0 52px;
        height: 483px;
        .table {
          border: 0;
          td {
            height: 40px;
          }
          th {
            background-color: #fff;
            font-weight: bold;
          }
          .ivu-table-cell {
            padding-left: 0;
          }
          .ivu-btn-primary,
          .ivu-btn-error {
            background-color: #fff;
            border: 0;
            color: #6f8eff;
          }
        }
        .null {
          width: 100%;
          text-align: center;
          padding-top: 200px;
        }
        .page {
          margin-top: 20px;
          text-align: right;
        }
      }
      .ivu-modal-footer {
        border: 0;
        padding: 0;
        .okBtn {
          margin-top: 20px;
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: flex-end;
          padding-right: 52px;
          .ivu-btn {
            width: 100px;
            height: 40px;
            border-radius: 4px;
            margin-left: 30px;
          }
        }
      }
    }
  }
}
</style>