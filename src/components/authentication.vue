<template>
    <div class='authentication'>
        <Modal class="modalAuthentication" @on-cancel='cancel' :mask-closable="false" v-model="modalAuthentication">
          <div slot="header" class="top">
            实名认证
          </div>
          <div class="modala-content">
            <p>请用手机支付宝扫描下方二维码进行认证</p>
            <!-- <img src="@/assets/img/login/erweima.png" alt=""> -->
            <img :src="url" alt="">
            <p class='text'>如已完成认证请点击<span @click='refresh'>刷新</span></p>
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
            url: ''
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
        show() {
            this.$api.h5QrPng({

            }).then(res=>{
                if(res.code == 0) {
                    this.url = res.data
                }
            })
        },
        cancel() {
            this.$emit('clFlag', false)
        },
        // 查询认证结果
        refresh() {
            this.$api.checkCertAliPay({

            }).then(res=>{
                this.$Message.success(res.msg);
                this.$api.info({

                }).then(res=>{
                    if(res.code == 0) {
                        this.$store.dispatch('login',res.data)
                        this.$router.go(0)
                    }
                })
            })
            
        }
    },
    created() {
        this.show()
    },
    mounted() {
        
    },
}
</script>
<style lang='less'>
.modalAuthentication{
    .ivu-modal {
        width: 600px !important;
        height: 450px;
        .ivu-modal-content{
        width: 600px !important;
        height: 450px;
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
                img{
                    width: 200px;
                }
                .text{
                    margin-top: 20px;
                    span{
                        color: #2D8CF0;
                        cursor: pointer;
                    }
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