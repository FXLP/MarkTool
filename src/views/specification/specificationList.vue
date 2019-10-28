<template>
  <div class="app-container">
    <el-button size="mini" type="primary">
      规范列表
    </el-button>
    <el-table :data="list.slice((page-1)*limit,page*limit)" style="width: 98%">
      <el-table-column
        label="生成时间"
        width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.generateTime | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="规范编号"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="规范名"
        width="120"
      >
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="规范描述"
        width="360"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.description }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>Specification description</el-tag>
            </div>
          </el-popover>
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
  name: 'SpecificationList',
  components: { Pagination },
  data() {
    return {
      list: [
        { generateTime: '2019.10.21', id: '1', name: '疾病标注', description: '23' },
        { generateTime: '2019.10.20', id: '2', name: '患者标注', description: '15' },
        { generateTime: '2019.10.19', id: '3', name: '医生标注', description: '4' },
        { generateTime: '2019.10.22', id: '4', name: '药物标注', description: '8' },
        { generateTime: '2019.10.15', id: '5', name: '疾病标注', description: '2' },
        { generateTime: '2019.10.18', id: '6', name: '疾病标注', description: '9' },
        { generateTime: '2019.10.27', id: '7', name: '疾病标注', description: '10' },
        { generateTime: '2019.10.16', id: '8', name: '疾病标注', description: '13' }
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
        url: this.serverUrl + '/SpecificationFormal/getAll',
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
    goToDetail(index, row) {
      const p = '/Specification/SpecificationDetail/' + this.list[index].id
      this.$router.push({ path: p })
    },
    handleDelete(index) {
      this.list.splice(index, 1)
    }
  }
}
</script>
