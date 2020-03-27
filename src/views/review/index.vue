<template>
  <div class="app-container">
    <el-button
      size="mini"
      type="primary"
    >
      审核任务总览
    </el-button>
    <el-table
      :data="list.slice((page-1)*limit,page*limit)"
      style="width: 98%"
    >
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
          <div
            slot="reference"
            class="missionName-wrapper"
          >
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
        label="已审核条数"
        min-width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.review_progress.finish_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总审核条数"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.review_progress.total_num }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="任务进度"
        min-width="150"
        sortable
      >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.review_progress.finish_num/scope.row.review_progress.total_num*100" :format="format" />
        </template>
      </el-table-column> -->
      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="mark(scope.$index, scope.row)"
          >
            审核
          </el-button>
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
  components: { Pagination },
  data() {
    return {
      list: [
        { id: 197, review_progress: { finish_num: '12', total_num: '230' }, missionName: '诈骗', state: 'ANNOTATING', project_type: 'NON_ACTIVE_LEARNING', project: 5, template: 9 },
        { id: 197, review_progress: { finish_num: '12', total_num: '230' }, missionName: '诈骗', state: 'ANNOTATING', project_type: 'NON_ACTIVE_LEARNING', project: 5, template: 9 }
      ],
      total: 100,
      listLoading: true,
      page: 1,
      limit: 100,
      search: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('reviewer/getreepoch', 2).then((response) => {
        // console.log(response)
        const list = response
        for (let i = 0; i < list.length; i++) {
          list[i].id = list[i].id[0]
          this.$store.dispatch('project/getProject', list[i].project).then((response1) => {
            const projectdet = response1
            list[i].template = response1.template
            list[i].missionName = projectdet.name
            this.$store.dispatch('project/getTemplatedet', response1.template).then((response2) => {
              list[i].template_type = response2.template_type
            })
            if (i === list.length - 1) {
              this.list = list
            }
          })
        }
      })
    },
    mark(index, row) { // need jump to with mission ID
      // console.log(row)
      // console.log(this.$store.getters.userid)
      // var list = this.$store.dispatch('user/getEpoch')
      // console.log(list)
      this.$router.push({
        path: '/review/reviewing',
        query: {
          template: row.template,
          state: row.state,
          epochid: row.id,
          template_type: row.template_type
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
<style scoped>
</style>
