<template>
  <div class="app-container">
    <el-button size="mini" type="primary">任务列表</el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <el-table-column
        label="创建时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.taskTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="需标注文件"
        width="360"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标注者"
        width="120"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.MarkerName }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="标注状态"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskStage }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goToDetail(scope.$index, scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="success"
            @click="downloadResult(scope.$index, scope.row)"
          >下载</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleModifyStatus(scope.row,'草稿')"
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
  name: 'CommanderReview',
  components: { Pagination },
  data() {
    return {
      list: [
        { taskTime: '2019.10.21 13:39', taskid: '111', taskTitle: 'test file1', MarkerName: 'lyp', taskStage: '未标注' },
        { taskTime: '2019.10.20 14:39', taskid: '222', taskTitle: 'test file2', MarkerName: 'lyp', taskStage: '未标注' },
        { taskTime: '2019.10.19 13:39', taskid: '123', taskTitle: 'test file3', MarkerName: 'lyp', taskStage: '未标注' },
        { taskTime: '2019.10.22 19:39', taskid: '145', taskTitle: 'test file4', MarkerName: 'lyp', taskStage: '未标注' },
        { taskTime: '2019.10.15 18:39', taskid: '155', taskTitle: 'test file5', MarkerName: 'lyp', taskStage: '已标注' },
        { taskTime: '2019.10.18 14:39', taskid: '126', taskTitle: 'test file6', MarkerName: 'lyp', taskStage: '已标注' },
        { taskTime: '2019.10.27 16:39', taskid: '189', taskTitle: 'test file7', MarkerName: 'lyp', taskStage: '已标注' },
        { taskTime: '2019.10.16 20:39', taskid: '201', taskTitle: 'test file8', MarkerName: 'lyp', taskStage: '已标注' }
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
        url: this.serverUrl + '/taskFormal/getAllByStage',
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
    // this.$http.post('http://localhost:7788/api/taskFormal/getAllByStage', this.$qs.stringify({stage: '待代表团团长审核'}) )
    // .then(res => {
    //   console.log(res.data)
    //   _this.list = res.data.data
    //   _this.total = res.data.data.length
    // })
    },
    goToDetail(index, row) {
      const p = '/task/propodetail/' + this.list[index].propoId
      this.$router.push({ path: p })
    },
    downloadResult(index, row) { // 下载标注结果

    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.taskStage = status // change task state
      console.log(row.taskStage)
    }
  }
}
</script>
