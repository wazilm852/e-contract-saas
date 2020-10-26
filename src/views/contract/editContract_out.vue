<template>
    <div id="wangeditor">
        <vheader></vheader>
        <div class="edit">
            <div class="btn">
                <Button type="primary" @click='save'>保存</Button>
                <Button type="primary" @click='launch'>发起</Button>
                <Button v-if='this.$route.query.con_id' type="primary" @click='del'>删除</Button>
                <Button v-else type="primary" disabled>删除</Button>
            </div>
            <div class="title">
                <Input v-model='title' type="text"/>
            </div>
            <div ref="editorElem" class='edit-item'></div>
        </div>
    </div>
</template>
<script>
import E from "wangeditor";
import vheader from "@/components/header.vue";
export default {
    components: {
        vheader
    },
    data() {
        return {
            title: '', // 标题
            editor: null,  // 编辑框
            newContent: '', // 编辑后的html
        }
    },
    // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
    // props: ['catchData'], // 接收父组件的方法
    mounted() {
        this.show()
    },
    methods: {
        // 展示富文本编辑框
        show() {
            var html = ''
            var _this = this
            this.$api.editContract({
                con_id: this.$route.query.con_id,
                tem_id: this.$route.query.tem_id, 
                type: this.$route.query.type
            }).then(res=>{
                if(res.code == 0) {
                    html = res.data.content
                    this.title = res.data.title
                    this.editor = new E(this.$refs.editorElem);
                    // 编辑器的事件，每次改变会获取其html内容
                    this.editor.config.onchange = function (newHtml) {
                        _this.newContent = newHtml
                    }
                    this.editor.create(); // 创建富文本实例
                    this.editor.txt.append(html)
                }
            })
        },
        // 保存
        save() {
            this.$api.save({
                title: this.title,
                con_id: this.$route.query.con_id,
                content: this.newContent
            }).then(res=>{
                if(res.code == 0) {
                    this.$Message.success(res.msg)
                    this.$router.go(0)
                } else if(res.code == 301) {
                    console.log(res)
                    this.$Message.success(res.msg)
                    this.$router.push({name: 'editContract', query:{con_id: res.data}})
                }
            })
        },
        // 删除
        del() {
            this.$api.deleteContract({
                con_id: this.$route.query.con_id,
            }).then(res=>{
                if(res.code == 0) {
                    this.$Message.success(res.msg)
                    this.$router.push({name: 'contractAdmin'})
                }
            })
        },
        // 跳转至发起
        launch() {
            this.$router.push({name: 'startcontract', query: {title: this.title}})
        }
    }
}
</script>
<style scoped lang="less">
#wangeditor{
    width: 100%;
    height: 100%;
    .edit{
        width: 1200px;
        margin: 0 auto;
        padding-top: 40px;
        height: calc(~"100vh - 80px");
        .btn{
            display: flex;
            justify-content: flex-end;
            .ivu-btn{
                margin-right: 20px;
            }
            .ivu-btn:nth-child(3){
                margin-right: 0;
            }
        }
        .edit-item{
            width: 100%;
            height: calc(~"100% - 92px");
            text-align:left;
        }
        .title{
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #333;
            margin-top: 20px;
        }
    }
}
</style>
<style lang="less">
#wangeditor{
    .edit{
        .edit-item{
            .w-e-text-container{
                height: calc(~"100% - 80px") !important;
                overflow: auto;
            }
        }
        .title{
            .ivu-input{
                height: 40px;
                border-radius: 0;
                border-bottom: 0;
                text-indent: .5em;
                font-size: 16px;
            }
        }
    }
}
</style>