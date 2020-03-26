<template>
  <div class="app-container">
    <el-button
      size="mini"
      type="primary"
    >
      任务列表
    </el-button>
    <el-table
      :data="list.slice((page-1)*limit,page*limit)"
      style="width: 98%"
    >
      <!-- <el-table-column
        label="创建时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.taskTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="序号"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务名"
        width="250"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务类型"
        width="280"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.project_type }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="标注者"
        width="150"
      >
        <template>
          <div
            slot="reference"
            class="name-wrapper"
          >
            <span>{{ }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="审核者"
        width="150"
      >
        <template>
          <span>{{ }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="标注状态"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.taskStage }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        align="right"
        width="120"
        label="操作"
      >
        <template>
          <!-- <el-button
            size="mini"
            type="primary"
            @click="goToDetail(scope.$index, scope.row)"
          >详情</el-button>
          <el-button
            size="mini"
            type="success"
            @click="downloadResult(scope.$index, scope.row)"
          >下载</el-button> -->
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      @pagination="getList"
    />
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
        { taskTime: '2019.10.21 13:39', project_type: '', name: '1月诈骗案件', id: '11', taskFlie: 'test file1', labelname: '林宇翩，梁明', checkerName: '马老师', taskStage: '待标注' },
        { taskTime: '2019.10.20 14:39', project_type: '', name: '2月诈骗案件', id: '22', taskFlie: 'test file2', labelname: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '待标注' },
        { taskTime: '2019.10.19 13:39', project_type: '', name: '3月诈骗案件', id: '13', taskFlie: 'test file3', labelname: '林宇翩，梁明', checkerName: '马老师', taskStage: '标注中' },
        { taskTime: '2019.10.22 19:39', project_type: '', name: '4月诈骗案件', id: '15', taskFlie: 'test file4', labelname: '林宇翩，蔡婷婷', checkerName: '马老师', taskStage: '标注中' }
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
      this.$store.dispatch('project/getallProject')
        .then((response) => {
          console.log(response)
          this.list = response
        })
        .catch(() => {
          console.log('error')
        })
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
