<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips:请输入您的账号admin和密码admin888。</p>
        <p v-if="isToggle">
          <el-alert title=ruleForm.username type="error"></el-alert>
        </p>
        
      </el-form>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data: function () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123123',
      },
      errmsg: "",
      isToggle: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {

        if (!valid) {
          console.log('error submit!!');
          return false;
        }
        //请求服务器登陆
        console.error(this.ruleForm.username, this.ruleForm.password)
        this.$axios({
          method: 'post',
          url: '/admin/vueLogin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + '112233'
          },
          params: {
            account: this.ruleForm.username,
            password: this.ruleForm.password,
            dosubmit: "yes",
            remember: "yes"
          }
        }).then((res) => {
          console.error(res.data)
          if (res.data.state == 1) {
            console.error("--登陆成功--")
            localStorage.setItem('ms_username', this.ruleForm.username);
            this.$router.push('/');
            this.isToggle = false
          }
          else {
            this.errmsg = res.data.message
            this.isToggle = true
          }

        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: rgb(2, 2, 2);
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: rgb(0, 0, 0);
}
</style>
