<template>
    <div>
        <div class="crumbs">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>用户管理</el-breadcrumb-item>
                  <el-breadcrumb-item>添加用户</el-breadcrumb-item>
              </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.userName"></el-input>
                    </el-form-item>
                   <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍">
                        <el-input type="textarea" rows="5" v-model="form.des"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>

</template>


<script>
export default {
  name: 'AddUser',
  data () {
    return {
      form:{
        userName:'',
        email:'',
        des:''

      }
    }
  },
   methods: {
    onSubmit () {
      console.error(this.form)
      this.$message.success('提交成功！')
    }
  }
}
</script>

<style scoped>
</style>



