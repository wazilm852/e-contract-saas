<template>
  <div class="contractAdmin">
    <vheader></vheader>
    <div class="content">
      <!-- tabs -->
      <Tabs :value="tabValue" @on-click='changeTabs'>
        <TabPane :label="item.value" :name="item.key + ''" v-for="item in list" :key="item.key">
          <!-- table -->
          <Table :columns="columns" :data="data" class="table" v-if="data.length">
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary" size="small" style="margin-right: 5px;color: #2981D9;" @click="toDetails(row, index)">编辑</Button>
              <Button type="primary" size="small" style="color: #2981D9;" @click="del(row, index)">删除</Button>
            </template>
          </Table>
          <div class="null" v-else>
            <img src="../../assets/img/home/null.png" alt />
            <p>暂无数据</p>
          </div>
          <Page :total="total" :page-size='pageSize' :current='current' @on-change='changePage' show-elevator class="page" v-if="data.length > 10" />
        </TabPane>
      </Tabs>
      <Input search placeholder="请按合同标题搜索" v-model="searchValue" class="searchInput" @on-search="toSearch" />
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
      list: [],  // 合同状态列表
      tabValue: '',   // tab切换
      columns: [    // 表格标题
        {
          title: "合同标题",
          key: "title"
        },
        {
          title: "发起方",
          key: "sponsor_name"
        },
        {
          title: "签署方",
          key: "signatory_name"
        },
        {
          title: "发起时间",
          key: "create_time"
        },
        {
          title: "合同状态",
          key: "status"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [],   // 表格数据
      total: '',  //数据总条数
      pageSize: 10, // 每页几条
      current: 1, // 当前页
      searchValue: '', //搜索内容
      status: '0', // 当前状态
    };
  },
  created() {
    this.showStatus()
    this.showContract()
  },
  methods: {
    // 获取状态列表
    showStatus() {
      this.$api.statusList({}).then(res=> {
        if(res.code == 0) {
          this.list = res.data
          this.tabValue = res.data[0].key
        }
      })
    },
    // 获取合同列表
    showContract() {
      this.$api.contractList({
        title: this.searchValue,
        status: this.status,
        page: this.current,
        limit: this.pageSize
      }).then(res=> {
        if(res.code == 0) {
          this.data = res.data
          this.total = res.count
        }
      })
    },
    // 模糊查询
    toSearch() {
      this.showContract()
    },
    // 切换tabs
    changeTabs(name) {
      this.status = name
      this.searchValue = ''
      this.current = 1
      this.showContract()
    },
    // 分页
    changePage(page) {
      this.current = page
      this.showContract()
    },
    // 跳转详情页
    toDetails(row, index) {
      this.$router.push({name: 'editContract', query: {con_id: row.id}})
    },
    // 删除
    del(row, index) {
      this.$api.deleteContract({
          con_id: row.id,
      }).then(res=>{
          if(res.code == 0) {
              this.$Message.success(res.msg)
              this.showContract()
          }
      })
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
      margin-top: 150px;
      p{
          font-size: 12px;
          color: #d5e8e9;
          margin-top: 20px;
      }
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
      text-indent: .5em;
    }
  }
}
</style>