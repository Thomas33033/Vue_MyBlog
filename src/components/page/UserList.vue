<template>
   <div class="table">
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
                <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select> -->
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="Id" label="ID" sortable width="120" />
                <el-table-column prop="UserName" label="用户名" width="120" />
                <el-table-column prop="Email" label="邮箱"  width="180" />
                <el-table-column prop="LastLogin" label="最后登录时间"  width="180" />
                <el-table-column prop="LastIp" label="登录Ip"  width="120" />
                <el-table-column prop="LoginCount" label="登录次数"  width="80" /> 
                <el-table-column prop="Active" label="激活状态"  width="80" /> 
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalNum">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="姓名">
                    <el-input v-model="form.UserName"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.Email"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="form.Active" label="2" >未激活</el-radio>
                    <el-radio v-model="form.Active" label="1" >已激活</el-radio>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>
export default {
  name: 'userList',
  data () {
    return {
      tableData: [],
      select_word: '',
      del_list: [],
      select_cate: "",
      select_word: '',
      is_search: false,
      totalNum: 10,
      cur_page: 1,
      editVisible: false,
      delVisible: false,
      form: {
        UserName: '',
        Active: '1',
        Email: ''
      },
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  computed: {
    data () {
      return this.tableData.filter((d) => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.Email.indexOf(this.select_cate) > -1 &&
            (d.UserName.indexOf(this.select_word) > -1 ||
              d.Email.indexOf(this.select_word) > -1)
          ) {
            return d
          }
        }
      })
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val
      this.fetchData()
    },
    // 获取 easy-mock 的模拟数据
    fetchData () {

      this.$axios({
        method: 'post',
        url: '/admin/user/vueList',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + '112233'
        },
        params: {
        }
      }).then((res) => {
        console.error("userList:", res.data)
        if (res.data.state == -1) {
          localStorage.removeItem('ms_username')
          this.$router.push('/login')
          return
        }
        this.tableData = res.data.list
      })

    },
    search () {
      this.is_search = true
    },
    formatter (row, column) {
      return row.email
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleEdit (index, row) {
      this.idx = index
      const item = this.tableData[index]
      this.form = {
        UserName: item.UserName,
        Email: item.Email,
        Active: item.Active === true ? '1' : '2'
      }
      this.editVisible = true
    },
    handleDelete (index, row) {
      this.idx = index
      this.delVisible = true
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit () {
      //this.$set(this.tableData, this.idx, this.form)
      //this.editVisible = false
      //this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      console.error("this.form:", this.form)
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1)
      this.$message.success('删除成功')
      this.delVisible = false
    }
  }
}
</script>

<style scoped>
.handle-input {
  width: 300px;
  display: inline-block;
}
</style>
