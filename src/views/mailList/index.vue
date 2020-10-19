<template>
  <div class="mailList">
    <vheader></vheader>
    <div class="content">
      <div class="title">
        <div class="left">我的签署人</div>
        <div class="right">
          <div class="btn" @click="modalAddContacts = true">添加签署人</div>
          <Input search placeholder=" 请输入账号/姓名" v-model='searchValue' class="searchInput" @on-search="search" />
        </div>
      </div>
      <!-- table -->
      <Table :columns="columns" :data="data" class="table" v-if="data.length">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px; color: #2981D9;" @click="save(row, index)">编辑</Button>
          <Button type="error" size="small" style="color: #2981D9;" @click="remove(row, index)">删除</Button>
        </template>
      </Table>
      <div class="null" v-else>
        暂无任何记录
      </div>
      <Page :total="total" :page-size='pageSize' :current='current' show-elevator class="page" @on-change='changePage' v-if="data.length > 10" />
      <!-- 添加签署人modal -->
      <Modal class="modalAddContacts" :mask-closable="false" v-model="modalAddContacts">
        <p slot="header">添加签署人</p>
        <Form
          ref="formInline"
          :model="formInline"
          :rules="ruleInline"
          label-position="left"
          :label-width="70"
        >
          <FormItem prop="name" label="姓名">
            <Input type="text" v-model="formInline.name" placeholder="请输入姓名" />
          </FormItem>
          <FormItem prop="phone" label="账号">
            <Input type="text" maxlength="11" v-model="formInline.phone" placeholder="请输入账号" />
          </FormItem>
          <FormItem class="okBtn">
            <Button @click="cancel('formInline')">取消</Button>
            <Button type="primary" @click="handleSubmit('formInline')">确认</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>

      <!-- 编辑签署人modal -->
      <Modal class="modalChangeContacts" :mask-closable="false" v-model="modalChangeContacts">
        <p slot="header">编辑签署人</p>
        <Form
          ref="formInlineC"
          :model="formInlineC"
          :rules="ruleInlineC"
          label-position="left"
          :label-width="70"
        >
          <FormItem prop="name" label="姓名">
            <Input type="text" v-model="formInlineC.name" placeholder="请输入姓名" />
          </FormItem>
          <FormItem class="okBtn">
            <Button @click="cancelC('formInlineC')">取消</Button>
            <Button type="primary" @click="handleSubmitC('formInlineC')">确认</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>

      <!-- 删除签署人modal -->
      <Modal class="modalDelContacts" :mask-closable="false" v-model="modalDelContacts">
        <p slot="header">删除签署人</p>您确定要删除此签署人吗？
        <div slot="footer" class="okBtn">
          <Button @click="modalDelContacts = false">取消</Button>
          <Button type="primary" @click="okDel">确认</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
import { PHONE } from "@/common/regex.js";
export default {
  components: {
    vheader
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!PHONE.test(value)) {
        callback(new Error("手机号格式不正确"));
      } else {
        callback();
      }
    };
    return {
      pageSize: 10, // 每页几条
      current: 1, // 当前页
      total: 0, // 总条数
      searchValue: '', //模糊查询
      modalAddContacts: false,
      modalChangeContacts: false,
      modalDelContacts: false,
      columns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "账号",
          key: "phone"
        },
        {
          title: "认证状态",
          key: "is_verified"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data: [],
      formInline: {
        name: "",
        phone: ""
      },
      ruleInline: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      },
      formInlineC: {
        name: "",
      },
      ruleInlineC: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
      },
      saveId : '', //被编辑人id 
      delId : '', //被删除人id 
    };
  },
  created() {
    this.show()
  },
  methods: {
    // 展示通讯录列表
    show() {
      this.$api.bookList({
        search: this.searchValue,
        page: this.current,
        limit: this.pageSize
      }).then(res=>{
        if(res.code == 0) {
          this.data = res.data
          this.data.forEach((item, index)=> {
              item.is_verified = item.is_verified == 0 ? '未认证' : item.is_verified == 1 ? '已认证' : ''
          })
          this.total = res.count
        }
      })
    },
    // 模糊查询 、
    search() {
      this.current = 1
      this.show()
    },
    // 分页
    changePage(page) {
      this.current = page
      this.show()
    },
    // modal添加联系人
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api.addBook({
            name: this.formInline.name,
            phone: this.formInline.phone
          }).then(res=>{
            if(res.code == 0) {
              this.$Message.success("添加成功!");
              this.modalAddContacts = false;
              this.$refs[name].resetFields();
              this.show()
            }
          })
        }
      });
    },
    // 打开编辑联系人modal
    save(row, index) {
      this.saveId = row.id
      this.modalChangeContacts = true;
    },
    // modal编辑联系人
    handleSubmitC(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$api.saveBook({
            name: this.formInlineC.name,
            id: this.saveId
          }).then(res=>{
            if(res.code == 0) {
              this.$Message.success(res.data)
              this.modalChangeContacts = false;
              this.$refs[name].resetFields();
              this.show()
            }
          })
        }
      });
    },
    // 删除联系人modal
    remove(row, index) {
      this.delId = row.id
      this.modalDelContacts = true;
    },
    // 删除联系人
    okDel() {
      this.$api.deleteBook({
        id: this.delId
      }).then(res=>{
        if(res.code == 0) {
          this.$Message.success(res.data)
          this.modalDelContacts = false;
          this.show()
        }
      })
    },
    // 取消
    cancel(name) {
      this.modalAddContacts = false;
      this.$refs[name].resetFields();
    },
    // 取消
    cancelC(name) {
      this.modalChangeContacts = false;
      this.$refs[name].resetFields();
    },
  }
};
</script>

<style lang="less" scoped>
.mailList {
  width: 100%;
  height: 100%;
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #aaaaaa;
      margin-bottom: 40px;
      .left {
        font-size: 16px;
        color: #0e396f;
        line-height: 20px;
        font-weight: bold;
      }
      .right {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        .btn {
          width: 100px;
          height: 30px;
          text-align: center;
          border: 1px solid #2d8cf0;
          border-radius: 15px;
          line-height: 30px;
          font-size: 12px;
          color: #2d8cf0;
          margin-right: 20px;
          cursor: pointer;
          transition: 0.2s all;
        }
        .btn:hover {
          background-color: #2d8cf0;
          color: #fff;
        }
        .searchInput {
          width: 200px;
          height: 30px;
        }
      }
    }
    .table {
      .ivu-btn-primary,
      .ivu-btn-error {
        background-color: #fff;
        border: 0;
        color: #6f8eff;
      }
    }
    .null{
      width: 100%;
      text-align: center;
      margin-top: 300px;
    }
    .page {
      margin-top: 40px;
      text-align: right;
    }
    .modal {
      .ivu-modal {
        .ivu-modal-header {
          border: 0;
        }
      }
    }
  }
}
</style>
<style lang="less">
.mailList {
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
.modalAddContacts,
.modalChangeContacts,
.modalDelContacts {
  .ivu-modal {
    width: 500px !important;
    height: 400px;
    top: 25%;
    .ivu-modal-content {
      width: 500px !important;
      height: 400px;
      .ivu-modal-header {
        border: 0;
        padding-top: 60px;
        padding-bottom: 0;
        text-align: center;
        margin-bottom: 60px;
        p {
          font-size: 16px;
          color: #333333;
          font-weight: bold;
        }
      }
      .ivu-modal-body {
        border: 0;
        padding: 0 46px;
        .ivu-form-item {
          display: flex;
          margin-bottom: 50px;
        }
        .ivu-form-item-content {
          width: 360px;
          margin: 0 !important;
        }
        .okBtn {
          .ivu-form-item-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 80px;
            .ivu-btn {
              width: 100px;
              height: 40px;
              border-radius: 4px;
            }
          }
        }
      }
      .ivu-modal-footer {
        border: 0;
      }
    }
  }
}
.modalDelContacts {
  .ivu-modal {
    height: 240px;
    .ivu-modal-content {
      height: 240px;
      .ivu-modal-header {
        padding-top: 50px;
        margin-bottom: 40px;
      }
      .ivu-modal-body {
        font-size: 14px;
        color: #333333;
        text-align: center;
        font-weight: 400;
        border: 0;
      }
      .ivu-modal-footer {
        margin-top: 26px;
        border: 0;
      }
    }
  }
}
</style>