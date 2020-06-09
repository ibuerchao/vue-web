<template>
    <div class="box">
        <div class="box-loading">
            <div class="box-loading-titles">
                vue-web后台系统
            </div>
            <div class="box-loading-from">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="email">
                        <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" placeholder="输入新密码" :show-password="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="ruleForm.code" placeholder="输入验证码">
                            <el-button slot="append" style="color: #4386f5" @click="code('ruleForm.code')">获取验证码</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item class="submits">
                        <el-button class="submits-btns" type="primary" @click="submitForm('ruleForm')">重置密码</el-button>
                    </el-form-item>
                    <div class="box-loading-from-checks">
                        <el-link type="primary" href="/login">已有账号，去登录</el-link>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import {encrypt} from '@/utils/rsa'

  export default {
    data() {
      return {
        ruleForm: {
          email: '',
          password: '',
          code: '',
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '输入新密码', trigger: 'blur'},
            {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '输入验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '长度为6个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              rememberMe: this.ruleForm.checked
            };
            data.password =encrypt(this.ruleForm.password);
            this.$store.dispatch('login', data).then(() => {
              this.$router.push('/')
            }).catch(() => {
              console.log('error')
            });
          }
        });
      },
      code(code){
        this.$refs.ruleForm.validateField('email', (error) => {
          if(!error){
            console.log(code)
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
    .box {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .box-loading {
        width: 400px;
        border-radius: 5px;
        color: #41A9F9;
        box-shadow: 0 0 5px #EDEBEB;
        border-radius: 5px;
        padding: 30px 20px;
        box-sizing: border-box;
    }

    .box-loading-titles {
        width: 100%;
        height: 80px;
        font-size: 26px;
        font-weight: 600;
        text-align: center;
        line-height: 80px;
    }

    .box-loading-from {
        width: 100%;
        background: #ffffff;
    }

    .box-loading-from-checks {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    .submits {
        width: 100%;

    }

    .submits-btns {
        width: 100%;
    }
</style>