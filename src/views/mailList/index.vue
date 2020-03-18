<template>
  <div class="mailList">
    <vheader></vheader>
    <div class="content">
      <div class="title">
        <div class="left">我的签署人</div>
        <div class="right">
          <div class="btn" @click="modalAddContacts = true">添加签署人</div>
          <Input search placeholder=" 请输入账号/姓名" class="searchInput" @on-search="search" />
        </div>
      </div>
      <!-- table -->
      <Table :columns="columns" :data="data" class="table" v-if="data.length">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>
      <div class="null" v-else>
        暂无任何记录
      </div>
      <Page :total="100" show-elevator class="page" v-if="data.length" />
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
          <FormItem prop="phone" label="账号">
            <Input type="text" maxlength="11" v-model="formInlineC.phone" placeholder="请输入账号" />
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
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      data: [
        {
          name: "闫泽鹏",
          phone: "13262107141"
        }
      ],
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
        phone: ""
      },
      ruleInlineC: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    show(index) {
      this.modalChangeContacts = true;
    },
    remove(index) {
      this.modalDelContacts = true;
    },
    // 模糊查询 、
    search() {
      console.log("查询联系人");
    },
    // modal添加联系人
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("添加成功!");
          this.modalAddContacts = false;
          this.$refs[name].resetFields();
        } else {
          this.$Message.error("添加失败!");
          this.$refs[name].resetFields();
        }
      });
    },
    cancel(name) {
      this.modalAddContacts = false;
      this.$refs[name].resetFields();
    },
    // modal编辑联系人
    handleSubmitC(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("修改成功!");
          this.modalChangeContacts = false;
          this.$refs[name].resetFields();
        } else {
          this.$Message.error("修改失败!");
          this.$refs[name].resetFields();
        }
      });
    },
    cancelC(name) {
      this.modalChangeContacts = false;
      this.$refs[name].resetFields();
    },
    // 删除联系人
    okDel() {
      // this.data.splice(index, 1);
      this.modalDelContacts = false;
    }
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
          border: 1px solid #6f8eff;
          border-radius: 15px;
          line-height: 30px;
          font-size: 12px;
          color: #6f8eff;
          margin-right: 20px;
          cursor: pointer;
          transition: 0.2s all;
        }
        .btn:hover {
          background-color: #6f8eff;
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
      }
      .ivu-modal-footer {
        margin-top: 26px;
        .okBtn{
          display: flex;
          justify-content: space-between;
          padding: 0 100px;
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