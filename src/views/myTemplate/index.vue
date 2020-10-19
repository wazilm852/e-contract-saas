<template>
    <div class="myTemplate">
        <vheader></vheader>
        <div class="content">
            <Tabs value="name1">
                <TabPane :label="tabValue" name="name1">
                    <div class="top">
                        <div class="left">
                            模板分类: 
                            <Select v-model="templateModel" @on-change='changeClass' class='templateSelect'>
                                <Option value="全部">全部</Option>
                                <Option v-for="item in templateSelect" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div class="right">
                            <Input search @on-search='search1' v-model="templateValue" placeholder="请输入合同模板名称" class='templateInput' />
                        </div>
                    </div>
                    <ul class="templateList">
                        <li v-for="(item, index) in templateList" :key='index'>
                            <div class="name">
                                {{item.title}}
                            </div>
                            <div class="operation">
                                <div class="use" @click='toDetails(item.id, "sys")'>
                                    <img src="@/assets/img/myTemplate/use.png" alt="">
                                    <span>使用</span>
                                </div>
                                <div class="use" @click='toLook(item.id, "sys")'>
                                    <img src="@/assets/img/myTemplate/look.png" alt="">
                                    <span>查看</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="null" v-if='!templateList.length'>
                        <img src="../../assets/img/home/null.png" alt="">
                        <p>暂无数据</p>
                    </div>
                    <Page :total="total1" :page-size='pageSize' :current='current1' show-elevator class="page" @on-change='changePage1' v-if="templateList.length > 12" />
                </TabPane>
                <TabPane label="我的模板" name="name2">
                    <div class="top">
                        <div class="left">
                            <Upload
                                :action="uploadFileUrl"
                                :before-upload="onBefore"
                                :on-success='onSuccess'
                                :headers="token"
                                class="upload"
                            >
                                <Button type="primary" icon="md-add-circle">新增模板</Button>
                            </Upload>
                        </div>
                        <div class="right">
                            <Input search @on-search='search2' v-model="templateValue2" placeholder="请输入合同模板名称" class='templateInput' />
                        </div>
                    </div>
                    <ul class="templateList">
                        <li v-for="(item, index) in templateList2" :key='index'>
                            <div class="name">
                                {{item.title}}
                            </div>
                            <div class="operation">
                                <div class="use use2" @click='toDetails(item.id, "user")'>
                                    <img src="@/assets/img/myTemplate/use.png" alt="">
                                    <span>使用</span>
                                </div>
                                <div class="use use2" @click='toLook(item.id, "user")'>
                                    <img src="@/assets/img/myTemplate/look.png" alt="">
                                    <span>查看</span>
                                </div>
                                <div class="use use2" @click='del(item.id)'>
                                    <img src="@/assets/img/myTemplate/del.png" alt="">
                                    <span>删除</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="null" v-if='!templateList2.length'>
                        <img src="../../assets/img/home/null.png" alt="">
                        <p>暂无数据</p>
                    </div>
                    <Page :total="total2" :page-size='pageSize' :current='current2' show-elevator class="page" @on-change='changePage2' v-if="templateList2.length > 12" />
                </TabPane>
            </Tabs>
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
            pageSize: 12, // 每页几条
            current1: 1, // 当前页
            current2: 1, // 当前页
            total1: 0,  // 总条数
            total2: 0,  // 总条数 
            templateSelect: [], // 模板分类list
            templateModel: '',  // 模板分类选择
            templateValue: '',  // 系统模板搜索
            templateList: [],   // 系统模板list
            templateValue2: '', // 我的模板搜索
            templateList2: [],  // 我的模板list
            uploadFileUrl: "api/api/template/upload",
            token: {
                token: JSON.parse(this.$vc.get('userInfo')).token
            },
            tabValue: '系统模板'
        }
    },
    created() {
        this.systemTemp()
        this.myTemp()
        this.classTemp()
    },
    methods: {
        // 展示系统模板
        systemTemp() {
            this.$api.systemTemp({
                page: this.current1,
                limit: this.pageSize,
                title: this.templateValue,
                cate_id: this.templateModel == '全部' ? '' : this.templateModel
            }).then(res=>{
                if(res.code == 0) {
                    this.templateList = res.data
                    this.total1 = res.count
                }
            })
        },
        // 展示我的模板
        myTemp() {
            this.$api.myTemp({
                page: this.current2,
                limit: this.pageSize,
                title: this.templateValue2,
            }).then(res=>{
                if(res.code == 0) {
                    this.templateList2 = res.data
                    this.total2 = res.count
                }
            })
        },
        // 系统模板分页
        changePage1(page) {
            this.current1 = page
            this.systemTemp()
        },
        // 我的模板分页
        changePage2(page) {
            this.current2 = page
            this.systemTemp()
        },
        // 模板分类
        classTemp() {
            this.$api.classTemp({}).then(res=>{
                if(res.code == 0) {
                    this.templateSelect = res.data
                }
            })
        },
        // 选择模板类型
        changeClass(value) {
            this.templateValue = ''
            this.current1 = 1
            this.systemTemp()
        },
        // 系统模板搜索
        search1(value) {
            this.current1 = 1
            this.systemTemp()
        },
        // 我的模板搜索
        search2(value) {
            this.current2 = 1
            this.myTemp()
        },
        // 查看跳转
        toLook(id, type) {
            this.$router.push({name: 'lookTemplate', query: {id: id, type: type}})
        },
        // 使用跳转
        toDetails(id, type) {
            this.$router.push({name: 'editContract', query: {tem_id: id, type: type}})
        },
        // 删除用户模板
        del(id) {
            this.$api.deleteTemp({
                id: id 
            }).then(res=>{
                if(res.code == 0) {
                    this.$Message.success(res.msg)
                    this.myTemp()
                }
            })
        },
        // 上传模板
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
                this.$router.go(0)
            }
        },
    }
}
</script>
<style scoped lang="less">
.myTemplate{
    width: 100%;
    height: 100%;
    .content{
        width: 1200px;
        margin: 0 auto;
        margin-top: 60px;
        .top{
            border-bottom: 1px solid #AAAAAA;
            padding-bottom: 12px;
            display: flex;
            justify-content: space-between;
            .left{
                .templateSelect{
                    width: 120px;
                    height: 30px;
                    margin-left: 10px;
                }
            }
            .right{
                .templateInput{
                    width: 200px;
                    height: 30px;
                    margin-right: 10px;
                    
                }
            }
        }
        .templateList{
            display: flex;
            flex-wrap: wrap;
            padding: 0 16px;
            padding-top: 30px;
            li{
                width: 270px;
                height: 180px;
                box-shadow: 0px 0px 21px 0px rgba(14, 57, 111, 0.2);
                border-radius: 4px;
                margin-bottom: 20px;
                overflow: hidden;
                margin-right: 22px;
                .name{
                    text-align: center;
                    height: 140px;
                    width: 100%;
                    line-height: 140px;
                    font-size: 16px;
                    color: #333333;
                }
                .operation{
                    width: 100%;
                    height: 40px;
                    background-color: #E2EEFF;
                    display: flex;
                    .use{
                        width: 50%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        font-size: 14px;
                        color: #2D8CF0;
                        padding:0 34px;
                        cursor: pointer;
                    }
                    .use2{
                        padding: 0 12px;
                    }
                }
            }
        }
        .page {
            margin-top: 40px;
            text-align: right;
        }
        .null{
            text-align: center;
            margin-top: 150px;
            p{
                font-size: 12px;
                color: #d5e8e9;
                margin-top: 20px;
            }
        }
    }
}
</style>
<style lang="less">
.myTemplate{
    .templateInput{
        .ivu-input{
            border-radius: 15px;
            text-indent: .5em;
        }
    }
}
</style>