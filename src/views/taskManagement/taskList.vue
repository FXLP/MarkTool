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
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务名"
        min-width="250"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务类型"
        min-width="280"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.project_type }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
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
      </el-table-column> -->
      <!-- <el-table-column
        label="审核者"
        width="150"
      >
        <template>
          <span>{{ }}</span>
        </template>
      </el-table-column> -->
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
        min-width="120"
        label="操作"
      >
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="primary"
            @click="goToDetail(scope.$index, scope.row)"
          >详情</el-button> -->
          <el-button
            size="mini"
            type="success"
            @click="downloadResult(scope.$index, scope.row)"
          >下载</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="是否确定删除"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否确定删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteproject">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      v-show="list.length>0"
      :total="list.length"
      :current-page="page"
      :page-size="limit"
      layout="total, prev, pager, next, jumper"
      :prev-click="prepage"
      :next-click="nextpage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import FileSaver from 'file-saver'
export default {
  name: 'TaskList',
  // components: { Pagination },
  data() {
    return {
      dialogVisible: false,
      deleterow: '',
      deleteindex: '',
      list: [

      ],
      total: 100,
      listLoading: true,
      page: 1,
      limit: 10,
      search: '',
      outputdata: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCurrentChange(page) {
      this.page = page
    },
    prepage() {
      this.page--
    },
    nextpage() {
      this.page++
    },
    deleteproject() {
      this.$store.dispatch('project/delProject', this.deleterow.id)
        .then((response) => {
          this.$message({ message: '删除成功', type: 'success' })
          this.list.splice(this.deleteindex, 1)
          this.dialogVisible = false
        })
        .catch(() => {
          console.log('error')
        })
    },
    handleDelete(index, row) {
      // this.list.splice(index, 1)
      console.log(index, row)
      this.dialogVisible = true
      this.deleterow = row
      this.deleteindex = index
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value1 - value2
      }
    },
    getList() {
      this.$store.dispatch('project/getallProject')
        .then((response) => {
          console.log('1', response)
          // console.log('2',response.sort(this.compare("id")))
          this.list = response.reverse()
        })
        .catch(() => {
          console.log('error')
        })
    },
    goToDetail(index, row) {
      // const p = '/task/taskDetail/' + this.list[index].taskId
      const p = '/taskManagement/taskDetails/'
      this.$router.push({
        path: p,
        query: {
          projectid: row.id
        }
      })
    },
    downloadResult(index, row) { // 下载标注结果
      console.log(row)
      const data = {
        id: 1,
        list: {
          project: row.id
        }
      }
      this.$store.dispatch('project/getannres', data)
        .then((response1) => {
          console.log(response1)
          this.outputdata = response1.result_file
          const data1 = JSON.stringify(this.outputdata, null, 2)
          const blob = new Blob([data1], { type: '' })
          FileSaver.saveAs(blob, row.name + '.json')
        })
    }
    // handleDelete(index) {
    //   this.list.splice(index, 1)
    // }
  }
}
</script>
