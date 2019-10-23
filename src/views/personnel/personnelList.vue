<template>
  <div class="app-container">
    <el-button size="mini" type="primary">人员列表</el-button>
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
            <span>{{ scope.row.MarkerName }}</span>
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
        label="已完成标注任务数"
        width="180"
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
        { registeredTime: '2019.10.21', personId: '1', telephone: '15678941612', MarkerName: 'lyp', finishednumber: '23' },
        { registeredTime: '2019.10.20', personId: '2', telephone: '18945627893', MarkerName: 'lyp', finishednumber: '15' },
        { registeredTime: '2019.10.19', personId: '3', telephone: '18823567894', MarkerName: 'lyp', finishednumber: '4' },
        { registeredTime: '2019.10.22', personId: '4', telephone: '12345657878', MarkerName: 'lyp', finishednumber: '8' },
        { registeredTime: '2019.10.15', personId: '5', telephone: '12345677889', MarkerName: 'lyp', finishednumber: '2' },
        { registeredTime: '2019.10.18', personId: '6', telephone: '15548962345', MarkerName: 'lyp', finishednumber: '9' },
        { registeredTime: '2019.10.27', personId: '7', telephone: '13545456262', MarkerName: 'lyp', finishednumber: '10' },
        { registeredTime: '2019.10.16', personId: '8', telephone: '18959594545', MarkerName: 'lyp', finishednumber: '13' }
      ],
      total: 100,
      listLoading: true,
      page: 1,
      limit: 10,
      search: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      return this.request({
        url: this.serverUrl + '/personFormal/getAllByStage',
        method: 'post',
        params: { Stage: '' }
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
    // this.$http.post('http://localhost:7788/api/personFormal/getAllByStage', this.$qs.stringify({stage: 's'}) )
    // .then(res => {
    //   console.log(res.data)
    //   _this.list = res.data.data
    //   _this.total = res.data.data.length
    // })
    },
    modify(index, row) {
      const p = '/task/propodetail/' + this.list[index].propoId
      this.$router.push({ path: p })
    },
    handleDelete(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
