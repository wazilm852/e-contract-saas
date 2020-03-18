<template>
    <div class="header">
        <div class="content">
            <div class="logo">
                <img src="../assets/img/login/logo.png" alt="">
                电子合同<span>{{title}}</span>
            </div>
            <ul class="out" v-if="flag">
                <router-link tag="li" v-for="(item, index) in list" :key="index" :to="{ name: item.name }" :class="[sign == index ? 'color' : '', 'item']" @click="jump(index)">
                    <img :src="item.urlc" alt="" v-if="sign == index">
                    <img :src="item.url" alt="" v-else>
                    {{item.text}}
                </router-link>
                <li class="item">
                    <Dropdown @on-click="downClick">
                        <a href="javascript:void(0)">
                            <img src="../assets/img/home/head.png" alt="">
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="个人信息">个人信息</DropdownItem>
                            <DropdownItem name="退出">退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
            <router-link class="out" to="login" tag="div" v-else>退出</router-link>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: '',
            flag: true,
            sign: null,
            list: [
                {
                    text: '我的首页',
                    url: require('../assets/img/home/pic1.png'),
                    urlc: require('../assets/img/home/pic1-c.png'),
                    name: 'home'
                },
                {
                    text: '合同管理',
                    url: require('../assets/img/home/pic2.png'),
                    urlc: require('../assets/img/home/pic2-c.png'),
                    name: 'contractAdmin'
                },
                {
                    text: '通讯录',
                    url: require('../assets/img/home/pic3.png'),
                    urlc: require('../assets/img/home/pic3-c.png'),
                    name: 'mailList'
                },
                {
                    text: '签章管理',
                    url: require('../assets/img/home/pic4.png'),
                    urlc: require('../assets/img/home/pic4-c.png'),
                    name: 'signAdmin'
                },
                // {
                //     text: '退出',
                //     url: require('../assets/img/home/head.png'),
                //     urlc: require('../assets/img/home/head.png'),
                //     name: ''
                // },
            ]
        }
    },
    created() {
        if(this.$route.name == 'certification') {
            this.title = '| 个人实名认证'
            this.flag = false
        } else {
            this.title = ''
            this.flag = true
        }

        switch(this.$route.name) {
            case 'certification':
                this.sign = null
                break;
            case 'home':
                this.sign = 0
                break;
            case 'contractAdmin':
                this.sign = 1
                break;
            case 'mailList':
                this.sign = 2
                break;
            case 'signAdmin':
                this.sign = 3
                break;
        }
    },
    methods: {
        jump(index) {
            this.sign = index
        },
        downClick(name) {
            if(name == '退出') {
                this.$router.push({name: 'login'})
            } else {
                this.$router.push({name: 'message'})
            }
        }
    }
}
</script>

<style scoped lang='less'>
.header{
    width: 100%;
    height: 80px;
    background-color: #0E396F;
    .content{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        color:#fff;
        line-height: 80px;
        .logo{
            img{
                vertical-align: middle;
                margin-right: 8px;
            }
            span{
                margin-left: 6px;
            }
        }
        .out{
            display: flex;
            .item{
                height: 100%;
                line-height: 80px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-right: 20px;
                cursor: pointer;
                color:#AAAAAA;
                img{
                    margin-right: 10px;
                }
            }
            .item:hover{
                color:#fff;
            }
            .color{
                color:#fff;
            }
            .ivu-dropdown-rel{
                a{
                    display: flex;
                }
            }
        }
    }
}
</style>