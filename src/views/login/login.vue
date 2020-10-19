<template>
    <div class="login">
        <div class="input">
            <div class="left">
                <div class="logo">
                    <img src="../../assets/img/login/logo.png" alt="">
                    <span>电子合同</span>
                </div>
            </div>
            <div class="right">
                <div class="content">
                    <div class="btn">
                        <div :class="[isPassword ? 'color' : '']" @click="clickPassword">密码登录</div>|
                        <div :class="[!isPassword ? 'color' : '']" @click="clickCode">验证码登录</div>
                    </div>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" v-if="isPassword">
                        <FormItem prop="user">
                            <Input type="text" class="styleInput" maxlength="11" prefix="md-person" v-model="formInline.user" placeholder="请输入手机号" />
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" class="styleInput" prefix="md-lock" password v-model="formInline.password" @on-enter="handleSubmit('formInline')" placeholder="请输入密码" />
                        </FormItem>
                        <div class="bottom">
                            <Checkbox v-model="isRemember" class="isRemember">记住密码</Checkbox>
                            <div class="jump"><span @click="toForget">忘记密码？</span>| <span @click="toRegister"> 立即注册</span></div>
                        </div>
                        <FormItem class="submit">
                            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                        </FormItem>
                    </Form>
                    <Form ref="formInlineM" :model="formInlineM" :rules="ruleInlineM" v-else>
                        <FormItem prop="user">
                            <Input type="text" class="styleInput" maxlength="11" prefix="md-person" v-model="formInlineM.user" placeholder="请输入手机号" />
                        </FormItem>
                        <FormItem prop="code">
                            <Input v-model="formInlineM.code" maxlength="4" prefix="md-key" class="styleInput" @on-enter="handleSubmitM('formInlineM')" placeholder="请输入验证码" />
                            <span class="get-code" v-show='ifGet == true' @click='getCode'>获取验证码</span>
                            <span class="get-code-c" v-show='ifGet == false'>{{codCount}}</span>
                        </FormItem>
                        <div class="bottom">
                            <div></div>
                            <div class="jump"><span @click="toForget">忘记密码？</span>| <span @click="toRegister"> 立即注册</span></div>
                        </div>
                        <FormItem class="submit">
                            <Button type="primary" @click="handleSubmitM('formInlineM')">登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { PHONE } from '@/common/regex.js'
export default {
    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号不能为空'));
            } else if (!PHONE.test(value)) {
                callback(new Error('手机号格式不正确'));
            } else {
                callback();
            }
        };
        return {
            text: '短信登录',
            ifGet: true,
            codCount: 60,
            isPassword: true,
            isRemember: false,
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { validator: validatePhone, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            },
            formInlineM: {
                user: '',
                code: ''
            },
            ruleInlineM: {
                user: [
                    { validator: validatePhone, trigger: 'blur' },
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { type: 'string', min: 4, max: 4, message: '验证码为四位数纯数字', trigger: 'blur' }
                ]
            },
        }
    },
    created() {
        var usePwd = JSON.parse(this.$vc.get('password'))
        console.log(usePwd)
        this.isRemember = this.$vc.get('password') ? usePwd.isRemember : false
        if(this.isRemember) {
            this.formInline.user = usePwd.phone
            this.formInline.password = usePwd.password
        }
    },
    methods: {
        clickPassword() {
            this.isPassword = true
        },
        clickCode() {
            this.isPassword = false
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.login({
                        phone: this.formInline.user,
                        password: this.formInline.password,
                        type: 'password',
                    }).then(res=>{
                        this.$store.dispatch('login',res.data)
                        this.$vc.set('password',JSON.stringify({
                            phone: this.formInline.user,
                            password: this.formInline.password,
                            isRemember: this.isRemember,
                        }));
                        if(res.code == 0) {
                            this.$Message.success(res.msg);
                            this.$router.push({name: 'home'})
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            })
        },
        handleSubmitM(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.login({
                        phone: this.formInlineM.user,
                        code: this.formInlineM.code,
                        type: 'smscode',
                    }).then(res=>{
                        console.log(res)
                        if(res.code == 0) {
                            this.$Message.success(res.msg);
                            this.$router.push({name: 'home'})
                        } else {
                            this.$Message.error(res.msg);
                        }
                    })
                }
            })
        },
        toRegister() {
            this.$router.push({name: 'register'})
        },
        toForget() {
            this.$router.push({name: 'forget'})
        },
        getCode() {
            if(!PHONE.test(this.formInlineM.user)) {
                this.$Message.error('请输入正确的手机号!');
            } else {
                this.$api.getCode({
                    phone: this.formInlineM.user
                }).then(res=>{
                    if(res.code == 0) {
                        this.$Message.success(res.msg);
                        this.ifGet = false
                        var t = setInterval(()=> {
                            this.codCount -- 
                            if(this.codCount <= 0) {
                                this.codCount = 60
                                clearInterval(t)
                                this.ifGet = true
                            }
                        }, 1000)
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.login{
    width: 100%;
    height: 100%;
    position: fixed;
    background: url(../../assets/img/login/bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .input{
        min-width: 1400px;
        height: 840px;
        background-image: url('../../assets/img/login/banner.png');
        background-size: 100% 100%;
        margin: 0 auto;
        padding-top: 40px;
        display: flex;
        .left{
            width: 50%;
            padding-left: 40px;
            .logo{
                line-height: 40px;
                display: flex;
                align-items: center;
                img{
                    margin-right: 12px;
                }
                span{
                    font-size: 24px;
                    color: #fff;
                }
            }
        }
        .right{
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            .content{
                width: 350px;
                .btn{
                    padding: 0 50px;
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    font-size: 22px;
                    margin-bottom: 80px;
                    color:#AAAAAA;
                }
                div{
                    cursor: pointer;
                }
                .color{
                    color:#127fd2;
                }
                .ivu-form-item{
                    margin-bottom: 30px;
                    .ivu-form-item-content{
                        .get-code{
                            position: absolute;
                            right:10px;
                            top: 0px;
                            cursor: pointer;
                            color:#127fd2;
                            span{
                                padding-left: 10px;
                                border-left:1px solid #AAAAAA;
                            }
                        }
                        .get-code-c{
                            position: absolute;
                            right:10px;
                            top: 0px;
                            color: #999;
                            span{
                                padding-left: 10px;
                                border-left:1px solid #AAAAAA;
                            }
                        }
                    }
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    .jump{
                        span{
                            cursor: pointer;
                            color:#2981d9;
                        }
                    }
                }
                .isRemember{
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>
<style lang="less">
.login{
    .styleInput{
        .ivu-input{
            border-radius: 0;
            border: 0 none;
            border-bottom:1px solid #AAAAAA;
            outline: none;
            box-shadow: 0 0 0 2px transparent;
        }
    }
    .submit{
        .ivu-form-item-content{
            text-align: center;
            margin-top: 60px;
            .ivu-btn{
                width: 200px;
                height: 44px;
                background-color: #127fd2;
                color:#fff;
                border-radius:6px;
                font-size: 20px;
            }
        }
    }
}
</style>