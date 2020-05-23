<template>
  <div class="app-container">
    <el-button
      size="mini"
      type="primary"
    >
      标注任务总览
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
        label="已标注条数"
        min-width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.annotate_progress.waiting_num }}</span>
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
        <template slot-scope="scope" min-width="200">
          <el-progress
            :percentage="percent(scope.row.annotate_progress.waiting_num,scope.row.annotate_progress.total_num)"
          />
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
          >
            标注
          </el-button>
          <!-- <el-button
            size="mini"
            type="success"
            @click="handleCommit(scope.$index)"
          >
            提交
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
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

export default {
  missionName: 'LabelMissionList',
  // components: { Pagination },
  data() {
    return {
      isdetail: false,
      userid: '',
      list: [
      ],
      // total: 100,
      page: 1,
      limit: 10
    }
  },
  created() {
    this.userid = this.$store.getters.userid
    console.log(this.userid)
    this.isdetail = false
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
    getList() {
      this.$store.dispatch('user/getEpoch', this.userid).then((response) => {
        this.list = response.reverse()
        for (let i = 0; i < this.list.length; i++) {
          // this.total = this.list.length
          this.$store.dispatch('project/getProject', this.list[i].project).then((response1) => {
            this.list[i].template = response1.template
            this.list[i].missionName = response1.name
            this.$store.dispatch('project/getTemplatedet', response1.template).then((response2) => {
              this.list[i].template_type = response2.template_type
              if (i === this.list.length - 1) {
                this.isdetail = true
              }
            })
          })
          console.log(this.list)
        }
      })
    },
    percent(a, b) {
      if (b === 0) {
        return 0
      } else {
        return parseInt((a / b * 100).toFixed(0))
      }
    },
    mark(index, row) { // need jump to with mission ID
      // console.log(row)
      // console.log(this.$store.getters.userid)
      // var list = this.$store.dispatch('user/getEpoch')
      // console.log(list)
      if (this.isdetail) {
        this.$router.push({
          path: '/label/labeling',
          query: {
            template: row.template,
            state: row.state,
            epochid: row.id,
            template_type: row.template_type,
            projectid: row.project
          }
        })
      } else {
        this.$message({ message: '请等待数据加载完毕' })
      }
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
