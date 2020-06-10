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
                        <el-input v-model="ruleForm.password" placeholder="请输入密码" :show-password="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item class="submits">
                        <el-button class="submits-btns" type="primary" :loading="loading" @click="submitForm('ruleForm')">立即注册</el-button>
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
  import {signUp} from "@/api/user";

  export default {
    data() {
      return {
        loading:false,
        ruleForm: {
          email: '',
          password: '',
          username:''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email',  message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {min: 3, max: 16, message: '昵称长度在 3 到 16 个字符', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            let data = {
              email: this.ruleForm.email,
              password: encrypt(this.ruleForm.password),
              username:this.ruleForm.username
            };
            signUp(data).then(() => {
              this.loading =false;
              this.ruleForm.email=''
              this.ruleForm.password=''
              this.ruleForm.username=''
              this.$message({
                message: '注册成功',
                type: 'success'
              });
            }).catch(() => {
              this.loading =false;
            });
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