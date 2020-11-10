<template>
    <div class='authing'>
        授权登录中..
    </div>
</template>
<script>
export default {
    data() {
        return {
            clientList: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        // crm系统调用
        crmShow() {
            this.$api.crmCheck({
                salt: this.$route.query.salt
            }).then(res=>{
                if(res.code == 0) {
                    this.$store.dispatch('login',res.data)
                    if(JSON.stringify(this.clientList).indexOf(this.$route.query.checking_id) == -1) {
                        this.clientList.push(this.$route.query.checking_id)
                        var arr = JSON.stringify(this.clientList)
                        this.$vc.set('clientID', arr)
                    }
                    this.$router.push({name: 'home'})
                }
            })
        },
    },
    created() {
        this.clientList = this.$vc.get('clientID') ? this.$vc.get('clientID') : []
        if(this.$route.query.checking_id) {
            this.crmShow()
        }
    },
    mounted() {
        
    },
}
</script>
<style scoped lang='less'>
.authing{
    width: 100%;
    height: 100%;
}
</style>