<template>
  <div class="certification">
      <vheader></vheader>
      <div class="content">
          <h2>实名认证</h2>
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="name" label="真实姓名">
                    <Input type="text" class="styleInput" v-model="formInline.name" placeholder="请输入真实姓名" />
                </FormItem>
                <FormItem prop="IDnumber" label="身份证号码">
                    <Input type="text" class="styleInput" maxlength="18" v-model="formInline.IDnumber" placeholder="请输入身份证号" />
                </FormItem>
                <FormItem prop="user" label="手机号">
                    <Input type="text" class="styleInput" maxlength="11" v-model="formInline.user" placeholder="请输入手机号" />
                </FormItem>
                <FormItem prop="code" label="验证码">
                    <Input v-model="formInline.code" class="styleInput" maxlength="4" placeholder="请输入验证码" @on-enter="handleSubmit('formInline')" />
                    <span class="get-code"><span>获取验证码</span></span>
                </FormItem>
                <FormItem class="submit">
                    <Button type="primary" @click="handleSubmit('formInline')">提交</Button>
                </FormItem>
            </Form>
      </div>
  </div>
</template>

<script>
import vheader from '@/components/header.vue'
import { PHONE, IDENTITY_CARD_18 } from '@/common/regex.js'
export default {
    components: {
        vheader,
    },
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
        const validateIDnumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('身份证号不能为空'));
            } else if (!IDENTITY_CARD_18.test(value)) {
                callback(new Error('身份证号格式不正确'));
            } else {
                callback();
            }
        };
        return {
            formInline: {
                name: '',
                IDnumber: '',
                user: '',
                code: ''
            },
            ruleInline: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                IDnumber: [
                    { required: true, validator: validateIDnumber, trigger: 'blur' },
                ],
                user: [
                    { required: true, validator: validatePhone, trigger: 'blur' },
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
                    this.$Message.success('认证成功!');
                    this.$router.push({name: 'home'})
                } else {
                    this.$Message.error('密码错误!');
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.certification{
    width: 100%;
    height: 100%;
    .content{
        width: 500px;
        height: 660px;
        border: 1px solid #0E396F;
        border-radius:4px;
        margin: 0 auto;
        margin-top: 140px;
        padding: 84px 75px 65px;
        h2{
            text-align: center;
            font-size: 22px;
            color:#135BB6;
            margin-bottom: 50px;
            font-weight:400;
        }
        .ivu-form-item{
            // margin-bottom: 30px;
            .ivu-form-item-content{
                .get-code{
                    position: absolute;
                    right:10px;
                    top: 35px;
                    cursor: pointer;
                    color:#135BB6;
                    span{
                        padding-left: 10px;
                        border-left:1px solid #AAAAAA;
                    }
                }
            }
        }
    }
}
</style>
<style lang="less">
.certification{
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
            margin-top: 20px;
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