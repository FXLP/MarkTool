<template>
  <div class="app-container">
    <el-button size="mini" type="primary" @click="addDialog=true">
      <i class="el-icon-plus" />
      新增人员
    </el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <el-table-column
        label="注册时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.registeredTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="工号"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.personId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        width="120"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.userName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        width="120"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="联系电话"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="电子邮箱"
        width="240"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="身份"
        width="200"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.identity }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="modify(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增人员的信息"
      :visible.sync="addDialog"
      width="40%"
      :before-close="handleClose"
    >
      <el-form label="left" label-width="100px" :model="personInformation">
        <el-form-item label="工号">
          <el-input v-model="personInformation.personId" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="personInformation.userName" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="personInformation.name" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="personInformation.telephone" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="personInformation.email" />
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="personInformation.identity" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPerson()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑人员信息"
      :visible.sync="editDialog"
      width="40%"
      :before-close="handleClose"
    >
      <el-form label="left" label-width="100px" :model="personInformation">
        <el-form-item label="工号">
          <el-input v-model="personInformation.personId" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="personInformation.userName" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="personInformation.name" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="personInformation.telephone" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="personInformation.email" />
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="personInformation.identity" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editPerson()">确 定</el-button>
      </span>
    </el-dialog>
    <pagination v-show="total>0" :total="total" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'PersonnelList',
  components: { Pagination },
  data() {
    return {
      list: [
        { registeredTime: '2019.10.21', personId: '1', telephone: '15678941612', userName: 'lyp', name: '林宇翩', email: '541654646@126.com', identity: '标注者,审核者' },
        { registeredTime: '2019.10.20', personId: '2', telephone: '18945627893', userName: 'ctt', name: '蔡婷婷', email: '541678646@126.com', identity: '标注者' },
        { registeredTime: '2019.10.19', personId: '3', telephone: '18823567894', userName: 'zxx', name: '周晓晓', email: '541612646@126.com', identity: '标注者' },
        { registeredTime: '2019.10.22', personId: '4', telephone: '12345657878', userName: 'lmm', name: '梁明明', email: '541679646@126.com', identity: '标注者,审核者' },
        { registeredTime: '2019.10.15', personId: '5', telephone: '12345677889', userName: 'lyp', name: '林宇翩', email: '541654646@126.com', identity: '标注者,审核者' },
        { registeredTime: '2019.10.18', personId: '6', telephone: '15548962345', userName: 'lyp', name: '林宇翩', email: '541654646@126.com', identity: '标注者,审核者' },
        { registeredTime: '2019.10.27', personId: '7', telephone: '13545456262', userName: 'lyp', name: '林宇翩', email: '541654646@126.com', identity: '标注者,审核者' },
        { registeredTime: '2019.10.16', personId: '8', telephone: '18959594545', userName: 'lyp', name: '林宇翩', email: '541654646@126.com', identity: '标注者,审核者' }
      ],
      total: 100,
      listLoading: true,
      page: 1,
      limit: 10,
      search: '',
      addDialog: false,
      editDialog: false,
      editIndex: 0,
      personInformation: {
        userName: '',
        name: '',
        personId: '',
        telephone: '',
        email: '',
        identity: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return this.request({
        url: this.serverUrl + '/personFormal/getAll',
        method: 'post',
        params: { }
      }).then(res => {
        console.log(res)
        if (res.code !== 0) {
          this.$message({
            type: 'warning',
            message: '更新列表失败'
          })
        } else {
          this.list = res.data
          this.total = res.data.length
          this.$message({
            type: 'success',
            message: '更新列表成功'
          })
        }
      })
    //   var _this = this
    // this.$http.post('http://localhost:7788/api/personFormal/getAll', this.$qs.stringify({stage: 's'}) )
    // .then(res => {
    //   console.log(res.data)
    //   _this.list = res.data.data
    //   _this.total = res.data.data.length
    // })
    },
    modify(index, row) {
      this.editIndex = index
      this.editDialog = true
      console.log('修改人员' + index + '的信息')
    },
    handleDelete(index) {
      this.list.splice(index, 1)
    },
    addPerson() {
      this.list.push({
        registeredTime: Date.now(),
        name: this.personInformation.name,
        personId: this.personInformation.personId,
        userName: this.personInformation.userName,
        telephone: this.personInformation.telephone,
        email: this.personInformation.email,
        identity: this.personInformation.identity
        // key: Date.now()
      })
      console.log(this.list)
      this.$message({ message: '成功新增人员！', type: 'success' })
      this.addDialog = false
    },
    editPerson() {
      this.list[this.editIndex].name = this.personInformation.name
      this.list[this.editIndex].personId = this.personInformation.personId
      this.list[this.editIndex].userName = this.personInformation.userName
      this.list[this.editIndex].telephone = this.personInformation.telephone
      this.list[this.editIndex].email = this.personInformation.email
      this.list[this.editIndex].identity = this.personInformation.identity
      console.log(this.list)
      this.$message({ message: '编辑成功！', type: 'success' })
      this.editDialog = false
    }
  }
}
</script>
