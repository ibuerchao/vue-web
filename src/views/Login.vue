<template>
    <div class="box">
        <div class="box-loading">
            <div class="box-loading-titles">
                vue-web后台系统
            </div>
            <div class="box-loading-from">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <div class="box-loading-from-checks">
                        <el-checkbox v-model="ruleForm.checked">七天免密登陆</el-checkbox>

                        <el-link type="danger" class="forget ">忘记密码？</el-link>

                        <el-link type="info">

                        </el-link>
                    </div>
                    <el-form-item class="submits">
                        <el-button class="submits-btns" type="primary" @click="submitForm('ruleForm')">立即登陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: 'buerchao',
          password: 'buerchao',
          checked: false,
          path: '/'
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
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
              password: this.ruleForm.password
            };

            this.$store.dispatch('login', data).then(() => {
              this.$router.push('/')
            });
            // let login = this.$api.login(this.ruleForm.username);
            // this.$store.dispatch('updateMenuFlag',true).then(() => {});

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

    .forget {
        color: #FD3C53;
    }

    .submits {
        width: 100%;

    }

    .submits-btns {
        width: 100%;
    }
</style>