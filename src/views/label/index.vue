<template>
  <div class="app-container">
    <el-button size="mini" type="primary">
      标注任务总览
    </el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <!-- <el-table-column
        label="截止时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.deadline | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="任务ID"
        min-width="65"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务名称"
        min-width="80"
      >
        <template slot-scope="scope">
          <div slot="reference" class="missionName-wrapper">
            <span>{{ scope.row.missionName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="任务状态"
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="已标注条数"
        min-width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.annotate_progress.finish_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总标注条数"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.annotate_progress.total_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务进度"
        min-width="150"
        sortable
      >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.annotate_progress.finish_num/scope.row.annotate_progress.total_num*100" :format="format" />
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
        { id: 197, annotate_progress: { finish_num: '12', total_num: '230' }, missionName: '诈骗', state: 'ANNOTATING', project_type: 'NON_ACTIVE_LEARNING', project: 5, template: 9 },
        { id: 197, annotate_progress: { finish_num: '12', total_num: '230' }, missionName: '诈骗', state: 'ANNOTATING', project_type: 'NON_ACTIVE_LEARNING', project: 5, template: 9 }
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
      this.$store.dispatch('user/getEpoch').then((response) => {
        this.list = response
      })
    },
    mark(index, row) { // need jump to with mission ID
      // console.log(row)
      // console.log(this.$store.getters.userid)
      // var list = this.$store.dispatch('user/getEpoch')
      // console.log(list)
      this.$router.push({
        path: '/label/labeling',
        query: {
          template: row.template,
          state: row.state,
          epochid: row.id
        }
      })
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
