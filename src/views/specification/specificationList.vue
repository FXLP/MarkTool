<template>
  <div class="app-container">
    <el-button
      size="mini"
      type="primary"
      @click="newSpecification()"
    >
      <i class="el-icon-plus" />
      新建规范
    </el-button>
    <el-table
      :data="list.slice((page-1)*limit,page*limit)"
      style="width: 98%"
    >
      <el-table-column
        label="生成时间"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.create_date | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="规范编号"
        min-width="120"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="规范名"
        min-width="120"
      >
        <template slot-scope="scope">
          <div
            slot="reference"
            class="name-wrapper"
          >
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="标注类型"
        min-width="200"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.template_type }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
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
      </el-table-column> -->

      <el-table-column
        align="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="goToDetail(scope.$index, scope.row)"
          >
            详情
          </el-button>
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
        <el-button type="primary" @click="deletetemplate">确 定</el-button>
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

export default {
  name: 'SpecificationList',
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
      search: ''
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
    deletetemplate() {
      this.$store.dispatch('project/delTemplate', this.deleterow.id)
        .then((response) => {
          this.$message({ message: '删除成功', type: 'success' })
          this.list.splice(this.deleteindex, 1)
          this.dialogVisible = false
        })
        .catch(() => {
          console.log('error')
        })
    },
    getList() {
      this.$store.dispatch('project/getallTemplate')
        .then((response) => {
          console.log(response)
          this.list = response.reverse()
        })
        .catch(() => {
          console.log('error')
        })
    },
    goToDetail(index, row) {
      // const p = '/specification/specificationDetail/' + this.list[index].id
      console.log(index, row)
      this.$store.commit('project/SET_DETAIL', row)
      const p = '/specification/specificationDetail/'
      this.$router.push({ path: p })
    },
    handleDelete(index, row) {
      // this.list.splice(index, 1)
      console.log(index, row)
      this.dialogVisible = true
      this.deleterow = row
      this.deleteindex = index
    },
    newSpecification() {
      this.$router.push({ path: '/specification/newSpecification' })
    }
  }
}
</script>
