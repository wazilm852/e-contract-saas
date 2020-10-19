<template>
    <div class='authentication'>
        <Modal class="modalAuthentication" @on-cancel='cancel' :mask-closable="false" v-model="modalAuthentication">
          <div slot="header" class="top">
            实名认证
          </div>
          <div class="modala-content">
            <p>请用手机扫描下方二维码进行认证</p>
            <img src="@/assets/img/login/erweima.png" alt="">
          </div>
          <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modalAuthentication: false,
        };
    },
    props: {
        flag: {
            type: Boolean
        }
    },
    computed: {},
    watch: {
        flag(value) {
            this.modalAuthentication = value
        }
    },
    methods: {
        cancel() {
            this.$emit('clFlag', false)
        },
    },
    created() {

    },
    mounted() {
        
    },
}
</script>
<style lang='less'>
.modalAuthentication{
    .ivu-modal {
        width: 600px !important;
        height: 400px;
        .ivu-modal-content{
        width: 600px !important;
        height: 400px;
        .ivu-modal-header{
            margin-bottom: 30px;
            border: 0;
            padding-top: 70px;
            padding-bottom: 0;
            .top{
            font-size: 17px;
            color: #343434;
            font-weight: bold;
            display: flex;
            justify-content: center;
            }
        }
        .ivu-modal-body{
            padding: 0 77px;
            .modala-content{
            width: 100%;
            margin-bottom: 20px;
            text-align: center;
            p{
                font-size: 16px;
                color: #787878;
                margin-bottom: 20px;
            }
            }
        }
        .ivu-modal-footer{
            border: 0;
        }
        }
    }
}
</style>