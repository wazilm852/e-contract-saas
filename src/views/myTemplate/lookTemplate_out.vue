<template>
    <div class="lookTemplate">
        <vheader></vheader>
        <div class="title">
            <p>合同标题: <span>{{title}}</span></p>
            <div>
                <a :href="url" @click='download'>
                    <Button type="primary" class='download'>下载</Button>
                </a>
                <Button type="primary" @click='toDetails'>使用</Button>
            </div>
        </div>
        <div class="content" v-html='html'>

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
            html: '',
            title: '',
            url: ''
        }
    },
    created() {
        var token = JSON.parse(this.$vc.get('userInfo')).token
        this.show()
        this.url = `/api/api/template/down?id=${this.$route.query.id}&type=${this.$route.query.type}`
    },
    methods: {
        show() {
            this.$api.lookTemplate({
                type: this.$route.query.type,
                id: this.$route.query.id
            }).then(res=>{
                if(res.code == 0) {
                    this.title = res.data.title
                    this.html = res.data.content
                }
            })
        },
        // 下载
        download() {
            this.$api.download({
                type: this.$route.query.type,
                id: this.$route.query.id
            }).then(res=>{
                console.log(res)
            })
        },
        // 使用跳转 
        toDetails() {
            this.$router.push({name: 'editContract', query: {tem_id: this.$route.query.id, type: this.$route.query.type}})
        }
    }
}
</script>
<style scoped lang="less">
.lookTemplate{
    width: 100%;
    background-color: #f5f5f5;
    padding-bottom: 40px;
    .title{
        width: 1200px;
        margin: 0 auto;
        padding: 10px 0;
        padding-left: 40px;
        background-color: #fff;
        margin-bottom: 1px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
            font-size: 14px;
            color: #333;
            span{
                font-size: 16px;
                color: #333;
                font-weight: 700;
            }
        }
        .ivu-btn{
            margin-right: 40px;
        }
        .download{
            a{
                color: #fff;
            }
        }
    }
    .content{
        width: 1200px;
        height: auto;
        margin: 0 auto;
        background-color: #fff;
        padding: 50px 100px;
    }
}
</style>