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
        label="任务名"
        width="300"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="需标注文件"
        width="300"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskFlie }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标注者"
        width="220"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="审核者"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.checkerName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标注状态"
        width="120"
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
  name: 'TaskList',
  components: { Pagination },
  data() {
    return {
      list: [
        { taskTime: '2019.10.21 13:39', taskTitle: '1月诈骗案件', taskid: '11', taskFlie: 'test file1', name: '林宇翩，梁明', checkerName: '马老师', taskStage: '待标注' },
        { taskTime: '2019.10.20 14:39', taskTitle: '2月诈骗案件', taskid: '22', taskFlie: 'test file2', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '待标注' },
        { taskTime: '2019.10.19 13:39', taskTitle: '3月诈骗案件', taskid: '13', taskFlie: 'test file3', name: '林宇翩，梁明', checkerName: '马老师', taskStage: '标注中' },
        { taskTime: '2019.10.22 19:39', taskTitle: '4月诈骗案件', taskid: '15', taskFlie: 'test file4', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '标注中' },
        { taskTime: '2019.10.15 18:39', taskTitle: '5月诈骗案件', taskid: '18', taskFlie: 'test file5', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '已完成' },
        { taskTime: '2019.10.18 14:39', taskTitle: '6月诈骗案件', taskid: '16', taskFlie: 'test file6', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '审核中' },
        { taskTime: '2019.10.27 16:39', taskTitle: '7月诈骗案件', taskid: '9', taskFlie: 'test file7', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '审核中' },
        { taskTime: '2019.10.16 20:39', taskTitle: '8月诈骗案件', taskid: '20', taskFlie: 'test file8', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '已完成' },
        { taskTime: '2019.10.16 20:39', taskTitle: '9月诈骗案件', taskid: '20', taskFlie: 'test file9', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '已完成' },
        { taskTime: '2019.10.16 20:39', taskTitle: '10月诈骗案件', taskid: '21', taskFlie: 'test file10', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '已完成' },
        { taskTime: '2019.10.16 20:39', taskTitle: '11月诈骗案件', taskid: '22', taskFlie: 'test file11', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '已完成' },
        { taskTime: '2019.10.16 20:39', taskTitle: '12月诈骗案件', taskid: '25', taskFlie: 'test file12', name: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '已完成' }
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
        url: this.serverUrl + '/taskFormal/getAllTask',
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
    // this.$http.post('http://localhost:7788/api/taskFormal/getAllTask', this.$qs.stringify({}) )
    // .then(res => {
    //   console.log(res.data)
    //   _this.list = res.data.data
    //   _this.total = res.data.data.length
    // })
    },
    goToDetail(index, row) {
      // const p = '/task/taskDetail/' + this.list[index].taskId
      const p = '/taskManagement/taskDetails/'
      this.$router.push({ path: p })
    },
    downloadResult(index, row) { // 下载标注结果

    },
    handleDelete(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
