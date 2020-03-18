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
                            <span class="get-code"><span>获取验证码</span></span>
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
                    this.$router.push({name: 'home'})
                } else {
                    this.$Message.error('密码错误!');
                }
            })
        },
        handleSubmitM(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push({name: 'home'})
                } else {
                    this.$Message.error('验证码不正确!');
                }
            })
        },
        toRegister() {
            this.$router.push({name: 'register'})
        },
        toForget() {
            this.$router.push({name: 'forget'})
        },
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
                    color:#135BB6;
                }
                .ivu-form-item{
                    margin-bottom: 30px;
                    .ivu-form-item-content{
                        .get-code{
                            position: absolute;
                            right:10px;
                            top: 0px;
                            cursor: pointer;
                            color:#135BB6;
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
                            color:#135BB6;
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
                background-color: #135BB6;
                color:#fff;
                border-radius:6px;
                font-size: 20px;
            }
        }
    }
}
</style>