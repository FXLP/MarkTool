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
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.personId }}</span>
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
        width="360"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.telephone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="完成总数"
        width="180"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.finishednumber }}</span>
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
      title="人员信息"
      :visible.sync="addDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label="left" label-width="100px" :model="personInformation">
        <el-form-item label="姓名">
          <el-input v-model="personInformation.name" />
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="personInformation.personId" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="personInformation.telephone" />
        </el-form-item>
        <el-form-item label="完成总数">
          <el-input v-model="personInformation.finishednumber" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addPerson()">确 定</el-button>
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
        { registeredTime: '2019.10.21', personId: '1', telephone: '15678941612', name: 'lyp', finishednumber: '23' },
        { registeredTime: '2019.10.20', personId: '2', telephone: '18945627893', name: 'lyp', finishednumber: '15' },
        { registeredTime: '2019.10.19', personId: '3', telephone: '18823567894', name: 'lyp', finishednumber: '4' },
        { registeredTime: '2019.10.22', personId: '4', telephone: '12345657878', name: 'lyp', finishednumber: '8' },
        { registeredTime: '2019.10.15', personId: '5', telephone: '12345677889', name: 'lyp', finishednumber: '2' },
        { registeredTime: '2019.10.18', personId: '6', telephone: '15548962345', name: 'lyp', finishednumber: '9' },
        { registeredTime: '2019.10.27', personId: '7', telephone: '13545456262', name: 'lyp', finishednumber: '10' },
        { registeredTime: '2019.10.16', personId: '8', telephone: '18959594545', name: 'lyp', finishednumber: '13' }
      ],
      total: 100,
      listLoading: true,
      page: 1,
      limit: 10,
      search: '',
      addDialog: false,
      personInformation: {
        name: '',
        personId: '',
        telephone: '',
        finishednumber: 0
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
      const p = '/person/personDetail/' + this.list[index].personId
      this.$router.push({ path: p })
    },
    handleDelete(index) {
      this.list.splice(index, 1)
    },
    addPerson() {
      this.addDialog = false
    }
  }
}
</script>
