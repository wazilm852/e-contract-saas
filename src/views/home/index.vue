<template>
  <div class="home">
    <vheader></vheader>
    <div class="content">
      <ul class="state">
        <li>
          <p>待我签</p>
          <div>09</div>
        </li>
        <li>
          <p>待TA签</p>
          <div>09</div>
        </li>
        <li>
          <p>已完成</p>
          <div>09</div>
        </li>
        <li>
          <p>草稿箱</p>
          <div>09</div>
        </li>
      </ul>
      <div class="center">
        <div class="upload">
          <h2>合同上传</h2>
          <div class="box" @click="toStartcontract">+</div>
        </div>
        <div class="signAdmin">
          <h2>签章管理</h2>
          <div class="box">
            <img src="../../assets/img/sign/sign.png" alt="">
          </div>
        </div>
      </div>
      <div class="contract">
        <div class="title">
          <h2>最近合同</h2>
          <span>更多</span>
        </div>
        <!-- tab -->
        <Table :columns="columns" :data="data" class="table" v-if="this.data.length">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
            <Button type="error" size="small" @click="remove(index)">签署</Button>
          </template>
        </Table>
        <div class="null" v-else>
          <img src="../../assets/img/home/null.png" alt="">
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
      columns: [
        {
          title: "合同标题",
          key: "title"
        },
        {
          title: "发起方",
          key: "issueer"
        },
        {
          title: "签署方",
          key: "signer"
        },
        {
          title: "发起时间",
          key: "date"
        },
        {
          title: "合同状态",
          key: "state"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [
        {
          title: "保证合同-抵押担保",
          issueer: '闫泽鹏',
          signer: "魏慧娟",
          date:'2020-03-04  10：00',
          state: '已完成'
        },
        {
          title: "保证合同-抵押担保",
          issueer: '闫泽鹏',
          signer: "魏慧娟",
          date:'2020-03-04  10：00',
          state: '已完成'
        },
        {
          title: "保证合同-抵押担保",
          issueer: '闫泽鹏',
          signer: "魏慧娟",
          date:'2020-03-04  10：00',
          state: '已完成'
        },
        {
          title: "保证合同-抵押担保",
          issueer: '闫泽鹏',
          signer: "魏慧娟",
          date:'2020-03-04  10：00',
          state: '已完成'
        },
        {
          title: "保证合同-抵押担保",
          issueer: '闫泽鹏',
          signer: "魏慧娟",
          date:'2020-03-04  10：00',
          state: '已完成'
        },
        {
          title: "保证合同-抵押担保",
          issueer: '闫泽鹏',
          signer: "魏慧娟",
          date:'2020-03-04  10：00',
          state: '已完成'
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data[index].name}<br>Age：${this.data[index].age}<br>Address：${this.data[index].address}`
      });
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    toStartcontract() {
      this.$router.push({name: 'startcontract'})
    }
  }
};
</script>

<style scoped lang='less'>
.home {
  width: 100%;
  height: 100%;
  .content {
    width: 1200px;
    margin: 0 auto;
    .state {
      margin-top: 60px;
      width: 100%;
      height: 160px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      li {
        width: 24%;
        height: 100%;
        padding: 55px;
        p {
          font-size: 14px;
          color: #003998;
        }
        div {
          font-size: 24px;
          color: #333333;
          font-weight: bold;
        }
      }
      li:hover {
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
      }
      li:nth-child(1) {
        background: url("../../assets/img/home/bg1.png") no-repeat 100% 100%;
        border-left: 1px solid #abcbff;
      }
      li:nth-child(2) {
        background: url("../../assets/img/home/bg2.png") no-repeat 100% 100%;
        border-left: 1px solid #ffe5ac;
      }
      li:nth-child(3) {
        background: url("../../assets/img/home/bg3.png") no-repeat 100% 100%;
        border-left: 1px solid #dbffce;
      }
      li:nth-child(4) {
        background: url("../../assets/img/home/bg4.png") no-repeat 100% 100%;
        border-left: 1px solid #efd7ff;
      }
    }
    .center {
      width: 100%;
      height: 340px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      .upload,
      .signAdmin {
        width: 49%;
        height: 100%;
        h2 {
          font-size: 18px;
          color: #333333;
          margin-bottom: 13px;
          font-weight: bold;
        }
        .box {
          width: 100%;
          height: 300px;
          border: 1px solid #0e396f;
          text-align: center;
          line-height: 300px;
          font-size: 200px;
          cursor: pointer;
        }
      }
    }
    .contract {
      width: 100%;
      height: 300px;
      margin-bottom: 100px;
      box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
      padding: 20px;
      overflow: hidden;
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        h2 {
          font-size: 18px;
          color: #333333;
          font-weight: bold;
        }
        span {
          font-size: 16px;
          color: #5a7dff;
          cursor: pointer;
        }
      }
      .table{
          .ivu-btn-primary,.ivu-btn-error{
              background-color: #fff;
              border:0;
              color:#6F8EFF;
          }
      }
      .null{
        width: 100%;
        text-align: center;
        margin-top: 30px;
      }
    }
  }
}
</style>
<style lang="less">
.home{
    .table{
        th{
            background-color: #fff;
            border:0;
            font-weight: bold;
        }
        td{
            border:0;
        }
        .ivu-table-cell{
            padding-left: 0;
        }
    }
}
</style>