<template>
  <div class="app-container">
    <el-button size="mini" type="primary">
      标注任务总览
    </el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <el-table-column
        label="截止时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.deadline | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务ID"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务名称"
        width="120"
      >
        <template slot-scope="scope">
          <div slot="reference" class="missionName-wrapper">
            <span>{{ scope.row.missionName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="已标注条数"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.finishednumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总标注条数"
        width="180"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.totalnumber }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务进度"
        width="600"
        sortable
      >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.finishednumber/scope.row.totalnumber*100" :format="format" />
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="mark(scope.$index, scope.row)"
          >标注</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleCommit(scope.$index)"
          >提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  missionName: 'LabelMissionList',
  components: { Pagination },
  data() {
    return {
      list: [
        { deadline: '2019.10.21', Id: '1', finishednumber: '12', missionName: '诈骗', totalnumber: '230' },
        { deadline: '2019.10.20', Id: '2', finishednumber: '18', missionName: '诈骗', totalnumber: '40' },
        { deadline: '2019.10.19', Id: '3', finishednumber: '18', missionName: '盗窃', totalnumber: '40' },
        { deadline: '2019.10.22', Id: '4', finishednumber: '12', missionName: '盗窃', totalnumber: '80' },
        { deadline: '2019.10.15', Id: '5', finishednumber: '20', missionName: '诈骗', totalnumber: '20' },
        { deadline: '2019.10.18', Id: '6', finishednumber: '15', missionName: '诈骗', totalnumber: '90' },
        { deadline: '2019.10.27', Id: '7', finishednumber: '13', missionName: '盗窃', totalnumber: '100' },
        { deadline: '2019.10.16', Id: '8', finishednumber: '15', missionName: '盗窃', totalnumber: '130' },
        { deadline: '2019.10.21', Id: '9', finishednumber: '12', missionName: '诈骗', totalnumber: '230' },
        { deadline: '2019.10.20', Id: '10', finishednumber: '18', missionName: '诈骗', totalnumber: '40' }
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
    },
    mark(index, row) { // need jump to with mission ID
      this.$router.push({ path: '/label/labeling' })
    },
    handleCommit(index) {
      this.list.splice(index, 1)
    },
    addPerson() {
      this.addDialog = false
    },
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    }
  }
}
</script>
