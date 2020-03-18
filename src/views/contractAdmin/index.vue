<template>
  <div class="contractAdmin">
    <vheader></vheader>
    <div class="content">
      <!-- tabs -->
      <Tabs value="待我签">
        <TabPane :label="item" :name="item" v-for="(item, index) in list" :key="index">
          <!-- table -->
          <Table :columns="columns" :data="data" class="table" v-if="data.length">
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
              <Button type="error" size="small" @click="remove(index)">签署</Button>
            </template>
          </Table>

          <div class="null" v-else>
            <img src="../../assets/img/home/null.png" alt />
          </div>
          <Page :total="100" show-elevator class="page" v-if="data.length" />
        </TabPane>
      </Tabs>
      <Input search placeholder=" 请按合同标题搜索" class="searchInput" @on-search="toSearch" />
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
      list: [
        "待我签",
        "待TA签",
        "已完成",
        "已过期",
        "已撤回",
        "已拒签",
        "草稿",
        "全部文件"
      ],
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
          issueer: "闫泽鹏",
          signer: "魏慧娟",
          date: "2020-03-04  10：00",
          state: "已完成"
        },
        {
          title: "保证合同-抵押担保",
          issueer: "闫泽鹏",
          signer: "魏慧娟",
          date: "2020-03-04  10：00",
          state: "已完成"
        },
        {
          title: "保证合同-抵押担保",
          issueer: "闫泽鹏",
          signer: "魏慧娟",
          date: "2020-03-04  10：00",
          state: "已完成"
        },
        {
          title: "保证合同-抵押担保",
          issueer: "闫泽鹏",
          signer: "魏慧娟",
          date: "2020-03-04  10：00",
          state: "已完成"
        },
        {
          title: "保证合同-抵押担保",
          issueer: "闫泽鹏",
          signer: "魏慧娟",
          date: "2020-03-04  10：00",
          state: "已完成"
        },
        {
          title: "保证合同-抵押担保",
          issueer: "闫泽鹏",
          signer: "魏慧娟",
          date: "2020-03-04  10：00",
          state: "已完成"
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
    // 模糊查询
    toSearch(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.contractAdmin {
  width: 100%;
  height: 100%;
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    position: relative;

    .table {
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
      margin-top: 30px;
    }
    .page {
      margin-top: 40px;
      text-align: right;
    }
    .searchInput {
      width: 200px;
      height: 30px;
      position: absolute;
      right: 0;
      top: 60px;
    }
  }
}
</style>
<style lang="less">
.contractAdmin {
  .ivu-tabs-nav .ivu-tabs-tab {
    padding: 12px 16px;
  }
  .table {
    th {
      background-color: #fff;
      font-weight: bold;
    }
    .ivu-table-cell {
      padding-left: 0;
    }
  }
  .searchInput {
    .ivu-input {
      border-radius: 15px;
    }
  }
}
</style>