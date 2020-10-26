<template>
  <div class="home">
    <vheader></vheader>
    <div class="content">
      <div class="toAuthentication" v-if='!isVerified'>
        为保障电子签名的法律效力，请立即进行<span @click='modalAuthentication = true'>实名认证</span>。
      </div>
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
          <div class="box box1">
            <div class="btn">
              <Upload
                  :action="uploadFileUrl"
                  :before-upload="onBefore"
                  :on-success='onSuccess'
                  :headers="token"
                  class="upload"
              >
                  <Button type="primary">本地上传</Button>
              </Upload>

              <Button type="primary" to="myTemplate">我的模板</Button>
            </div>
            <!-- <p>点击选择或拖拽文件至此</p> -->
            <p style="color: #aaaaaa">
              仅支持doc、docx、pdf、格式上传,文件大小需&lt;10MB
            </p>
          </div>
        </div>
        <div class="signAdmin">
          <h2>签章管理</h2>
          <div class="box">
            <img src="../../assets/img/home/add.png" alt="" />
            <p>您暂无签章，请点击此处添加</p>
          </div>
        </div>
      </div>
      <div class="contract">
        <div class="title">
          <h2>最近合同</h2>
          <span @click="more">更多</span>
        </div>
        <!-- tab -->
        <Table
          :columns="columns"
          :data="data"
          class="table"
          v-if="this.data.length"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px; color: #2981d9"
              @click="toDetails(row, index)"
              >编辑</Button
            >
            <Button
              type="primary"
              size="small"
              style="color: #2981d9"
              @click="del(row, index)"
              >删除</Button
            >
          </template>
        </Table>
        <div class="null" v-else>
          <img src="../../assets/img/home/null.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 实名认证modal -->
    <authentication :flag='this.modalAuthentication' @clFlag="sendSonData"></authentication>
  </div>
</template>

<script>
import vheader from "@/components/header.vue";
import authentication from "@/components/authentication.vue";
export default {
  components: {
    vheader,
    authentication
  },
  data() {
    return {
      modalAuthentication: false,
      columns: [
        {
          title: "合同标题",
          key: "title",
        },
        {
          title: "发起方",
          key: "sponsor_name",
        },
        {
          title: "签署方",
          key: "signatory_name",
        },
        {
          title: "发起时间",
          key: "create_time",
        },
        {
          title: "合同状态",
          key: "status",
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      data: [],
      file: "",
      uploadFileUrl: "api/api/contract/upload",
      token: {
          token: JSON.parse(this.$vc.get('userInfo')).token
      },
      isVerified: ''
    };
  },
  created() {
    var userInfo = JSON.parse(this.$vc.get('userInfo'))
    this.isVerified = userInfo.is_verified
    this.showTable();
  },
  methods: {
    // 合同表格
    showTable() {
      this.$api
        .contractList({
          page: 1,
          limit: 5,
        })
        .then((res) => {
          if (res.code == 0) {
            this.data = res.data;
          }
        });
    },
    // 跳转详情页
    toDetails(row, index) {
      this.$router.push({ name: "editContract", query: { con_id: row.id } });
    },
    // 删除
    del(row, index) {
      this.$api
        .deleteContract({
          con_id: row.id,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$Message.success(res.msg);
            this.showTable()
          }
        });
    },
    // 跳转合同管理
    more() {
      this.$router.push({ name: "contractAdmin" });
    },
    // 上传合同
    onBefore(file) {
        let exceededNum = file.name.lastIndexOf(".");
        let exceededStr = file.name
            .substring(exceededNum + 1, file.name.length)
            .trim();
        if (
            exceededStr != "doc" &&
            exceededStr != "docx" &&
            exceededStr != "pdf"
        ) {
            this.$Message.error("文件格式错误");
            return false;
        }
        if (file.size > 102400 * 100) {
            this.$Message.error("文件大小不能超过10M");
            return false;
        }
        this.file = file;
        return true;
    },
    // 上传成功
    onSuccess(res, file, fileList) {
        if(res.code == 0) {
            this.$Message.success(res.msg)
            this.$router.push({name: 'editContract', query:{con_id: res.data}})
        }
    },
    // 关闭去认证弹框
    sendSonData() {
      this.modalAuthentication = false
    }
  },
};
</script>

<style scoped lang='less'>
.home {
  width: 100%;
  height: 100%;
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    .toAuthentication{
      width: 100%;
      height: 40px;
      background-color: #FFF4D4;
      line-height: 40px;
      font-size: 16px;
      color: #333333;
      text-align: center;
      span{
        color: #F14949;
        cursor: pointer;
      }
    }
    .state {
      margin-top: 20px;
      width: 100%;
      height: 160px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      li {
        width: 24%;
        height: 100%;
        padding: 55px;
        transition: all 0.2s;
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
        cursor: pointer;
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
          font-size: 14px;
          color: #333;
          img {
            margin-top: 107px;
            margin-bottom: 20px;
          }
        }
        .box1 {
          // border: 1px dashed #0e396f;
          .btn {
            margin-bottom: 20px;
            margin-top: 110px;
            display: flex;
            justify-content: center;
            .ivu-btn {
              width: 100px;
              height: 36px;
            }
            .upload {
              width: 100px;
              height: 36px;
              margin-right: 60px;
            }
          }
          p {
            margin-bottom: 14px;
          }
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
          color: #2981d9;
          cursor: pointer;
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
      .null {
        width: 100%;
        text-align: center;
        margin-top: 30px;
      }
    }
  }
}
</style>
<style lang="less">
.home {
  .table {
    th {
      background-color: #fff;
      border: 0;
      font-weight: bold;
    }
    td {
      border: 0;
    }
    .ivu-table-cell {
      padding-left: 0;
    }
  }
  a.ivu-btn {
    line-height: 36px;
  }
}
</style>