<template>
  <div class="startcontract">
    <vheader></vheader>
    <div class="content">
      <!-- <div class="upload">
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
      </div> -->
      <div class="contractMessage">
        <div class="title">
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
            <span v-if='isVerified'>
              <img src="../../assets/img/contract/certified.png" alt />
              <span>已认证</span>
            </span>
            <span v-else>
              <img src="../../assets/img/contract/uncertified.png" alt />
              <span>未认证</span>
            </span>
          </div>
        </div>
        <div
          class="signatory"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="signer-name">签署人</div>
          <div class="name">
            <Input type="text" v-model="item.name" @on-blur='nameBlue(item.name)' placeholder="请输入姓名" />
            <p v-if='nameFlag && indexFlag == index'>请输入姓名</p>
          </div>
          <div class="phone">
            <Input type="text" v-model="item.phone" @on-blur='phoneBlue(item.phone, index)' placeholder="请输入手机号" />
            <p v-if='phoneFlag && indexFlag == index'>请输入正确格式的手机号</p>
            <span v-if="item.is_verified == 1 || item.is_verified == '已认证'">
              <img src="../../assets/img/contract/certified.png" alt />
              <span>已认证</span>
            </span>
            <span v-else>
              <img src="../../assets/img/contract/uncertified.png" alt />
              <span>未认证</span>
            </span>
          </div>
          <div class="ope">
            <span @click="del(index)">删除</span>
          </div>
        </div>
        <div class="btn">
          <div class="add" @click="addSigner">
            <img src="../../assets/img/contract/add.png" alt />添加签署方
          </div>
          <div class="add" @click="modalMailList = true">
            <img src="../../assets/img/contract/add.png" alt />从通讯录添加
          </div>
        </div>
        <!-- 通讯录 -->
        <Modal class="modalMailList" :mask-closable="false" v-model="modalMailList">
          <p slot="header">从通讯录添加</p>
          <Table ref="selection" :columns="columns" @on-selection-change='selectionChange' :data="data" class="table" v-if="data.length"></Table>
          <div class="null" v-else>暂无任何记录</div>
          <Page :current="current" :page-size='pageSize' :total="total" simple class="page" @on-change='changePage' v-if="data.length > 10" />
          <div slot="footer" class="okBtn">
            <Button @click="modalMailList = false">取消</Button>
            <Button type="primary" @click="okAdd">确认</Button>
          </div>
        </Modal>
        <!-- 实名认证modal -->
        <authentication :flag='this.modalAuthentication' @clFlag="sendSonData"></authentication>
      </div>
      <div class="next">
        <Button class="btn" @click="next">下一步</Button>
      </div>
    </div>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
import authentication from "@/components/authentication.vue";
import { PHONE } from "@/common/regex.js"
export default {
  components: {
    vheader,
    authentication
  },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      isVerified: 0,  //是否实名认证 
      contractName: this.$route.query.title,
      modalMailList: false,
      modalAuthentication: false,
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      initiator: {},
      list: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "账号",
          key: "phone"
        },
        {
          title: '认证状态',
          key: "is_verified"
        }
      ],
      data: [],
      nameFlag: false,
      phoneFlag: false,
      selectionBook: [], //通讯录选中的签署人
      indexFlag: 0
    };
  },
  created() {
    var userInfo = JSON.parse(this.$vc.get('userInfo'))
    this.initiator.name = userInfo.name ? userInfo.name : '游客'
    this.initiator.phone = userInfo.phone
    this.isVerified = userInfo.is_verified
    this.showBook()
  },
  methods: {
    // 通讯录
    showBook() {
      this.$api.bookList({
        search: '',
        page: this.current,
        limit: this.pageSize
      }).then(res=>{
        if(res.code == 0) {
          this.data = res.data
          this.total = res.count
          this.data.forEach(item => {
            item.is_verified = item.is_verified == 0 ? '未认证' : item.is_verified == 1 ? '已认证' : ''
          });
        }
      })
    },
    // 分页
    changePage(page) {
      this.current = page
      this.showBook()
    },
    // 选择联系人
    selectionChange(value) {
      this.selectionBook = value
    },
    // 通讯录ok按钮
    okAdd() {
      this.selectionBook.forEach((item, index) => {
        this.list.push(item)
      })
      this.modalMailList = false
    },
    // 添加签署人
    addSigner() {
      if(this.list == 0) {
        this.list.push({
          name: "",
          phone: "",
          is_verified: 0
        });
      } else if(this.list[this.list.length - 1].name && PHONE.test(this.list[this.list.length - 1].phone)) {
        if (this.list.length < 10) {
          this.list.push({
            name: "",
            phone: "",
            is_verified: 0
          });
        } else {
          this.$Message.error("最多添加10个签署人");
        }
      } else if(!this.list[this.list.length - 1].name && !PHONE.test(this.list[this.list.length - 1].phone)) {
        this.nameFlag = true
        this.phoneFlag = true
      } else if(!this.list[this.list.length - 1].name) {
        this.nameFlag = true
      } else if(!PHONE.test(this.list[this.list.length - 1].phone)) {
        this.phoneFlag = true
      }
      
    },
    // 删除签署人
    del(index) {
      this.list.splice(index, 1);
    },
    // 下一步
    next() {
      if(this.isVerified) {
        this.$router.push({name: 'signContract'})
      } else {
        this.modalAuthentication = true
      }
    },
    // 关闭去认证弹框
    sendSonData() {
      this.modalAuthentication = false
    },
    // 姓名离焦
    nameBlue(name) {
      if(name) {
        this.nameFlag = false
      } else {
        this.nameFlag = true
      }
    },
    // 手机号离焦
    phoneBlue(phone, index) {
      this.indexFlag = index
      if(PHONE.test(phone)) {
        this.phoneFlag = false
        this.$api.searchBook({
          phone: phone
        }).then(res=>{
          if(res.code == 0) {
            this.list[index].is_verified = res.data.is_verified
          }
        })
      } else {
        this.phoneFlag = true
      }
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
      margin-top: 30px;
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
          position: relative;
          p{
            position: absolute;
            top: 28px;
            left: 0;
            color: #ed4014;
            font-size: 12px;
          }
        }
        .phone {
          width: 273px;
          display: flex;
          align-items: center;
          position: relative;
          img {
            margin: 0 8px;
          }
          span {
            font-size: 14px;
            color: #333333;
            display: flex;
            align-items: center;
          }
          p{
            position: absolute;
            top: 28px;
            left: 0;
            color: #ed4014;
            font-size: 12px;
          }
        }
        .ope {
          width: 500px;
          text-align: center;
          display: none;
          span:hover{
            color:#127fd2;
          }
        }
      }
      .signatory:hover .ope{
        display: block;
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