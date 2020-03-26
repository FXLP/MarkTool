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
  name: 'SpecificationList',
  components: { Pagination },
  data() {
    return {
      list: [
        { create_date: '2019.10.21', id: '1', name: '疾病标注', template_type: '命名实体识别' },
        { create_date: '2019.10.20', id: '2', name: '患者标注', template_type: '关系抽取' },
        { create_date: '2019.10.19', id: '3', name: '医生标注', template_type: '文本分类' },
        { create_date: '2019.10.22', id: '4', name: '药物标注', template_type: '事件标注' }
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
      this.$store.dispatch('project/getallTemplate')
        .then((response) => {
          console.log(response)
          this.list = response
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
    handleDelete(index) {
      this.list.splice(index, 1)
    },
    newSpecification() {
      this.$router.push({ path: '/specification/newSpecification' })
    }
  }
}
</script>
