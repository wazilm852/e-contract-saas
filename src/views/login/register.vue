<template>
    <div class="register">
        <div class="input">
            <div class="left">
                <div class="logo">
                    <img src="../../assets/img/login/logo.png" alt="">
                    <span>电子合同</span>
                </div>
            </div>
            <div class="right">
                <div class="content">
                    <h2>注册</h2>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
                        <FormItem prop="user">
                            <Input type="text" class="styleInput" prefix="md-person" maxlength="11" v-model="formInline.user" placeholder="请输入手机号" />
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" class="styleInput" prefix="md-lock" password v-model="formInline.password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem prop="code">
                            <Input v-model="formInline.code" class="styleInput" maxlength="4" prefix="md-key" placeholder="请输入验证码" @on-enter="handleSubmit('formInline')" />
                            <span class="get-code" v-show='ifGet == true' @click='getCode'>获取验证码</span>
                            <span class="get-code-c" v-show='ifGet == false'>{{codCount}}秒后重试</span>
                        </FormItem>
                        <div class='protocol'>
                            <Checkbox v-model="flag" class="flag">已经阅读 </Checkbox>并同意<span @click='protocol'>《使用协议》</span>及<span @click='terms'>《隐私条款》</span>
                        </div>
                        <FormItem class="submit">
                            <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
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
    data () {
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
            flag: false,
            ifGet: true,
            codCount: 60,
            formInline: {
                user: '',
                password: '',
                code: ''
            },
            ruleInline: {
                user: [
                    { validator: validatePhone, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { type: 'string', min: 4, max: 4, message: '验证码为四位数纯数字', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.flag) {
                        this.$api.regist({
                            phone: this.formInline.user,
                            password: this.formInline.password,
                            code: this.formInline.code
                        }).then(res=>{
                            if(res.code == 0) {
                                this.$Message.success(res.msg);
                                this.$router.push({name: 'login'})
                                // this.$router.push({name: 'certification'})
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.warning('请先同意服务条款')
                    }
                }
            })
        },
        getCode() {
            if(!PHONE.test(this.formInline.user)) {
                this.$Message.error('请输入正确的手机号!');
            } else {
                this.$api.getCode({
                    phone: this.formInline.user
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
        },
        // 使用协议 
        protocol() {
            this.$router.push({name: 'protocol'})
        },
        // 隐私条款
        terms() {
            this.$router.push({name: 'terms'})
        }
    },
    
}
</script>
<style lang="less" scoped>
.register{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/login/bg.png');
    background-repeat: no-repeat;
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
                h2{
                    text-align: center;
                    font-size: 22px;
                    color:#135BB6;
                    margin-bottom: 80px;
                    font-weight:400;
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
                .flag{
                    margin-bottom: 10px;
                    span{
                        color:#135BB6;
                    }
                }
                .protocol{
                    font-size: 14px;
                    .flag{
                        margin: 0;
                    }
                    span{
                        color:#135BB6;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}
</style>
<style lang="less">
.register{
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