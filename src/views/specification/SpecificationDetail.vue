<template>
  <div class="app-container">
    <div style="text-align:center">
      <el-button size="big" type="danger" la>规范名：{{ specification.specificationName }}</el-button>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>实体集合元组</span>
            </div>
            <div class="component-item" style="height:600px;">
              <el-table
                :data="specification.entityGroups"
                height="570"
                style="width: 100%; text-align:center"
              >
                <el-table-column
                  prop="name"
                  label="实体集合名"
                  width="430"
                />
                <el-table-column
                  label="操作"
                  width="420"
                >
                  <template>
                    <el-tooltip class="item" effect="dark" content="查看该实体集" placement="top">
                      <el-button type="info" icon="el-icon-search" circle />
                    </el-tooltip>
                    <el-button icon="el-icon-delete" circle />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>关系集合</span>
            </div>
            <div class="component-item" style="height:600px;">
              <el-table
                :data="specification.relationships"
                height="570"
                style="width: 100%; text-align:center"
              >
                <el-table-column
                  prop="Rname"
                  label="关系名"
                  width="200"
                />
                <el-table-column
                  prop="beginEntity"
                  label="前实体名"
                  width="200"
                />
                <el-table-column
                  prop="endEntity"
                  label="后实体名"
                  width="200"
                />
                <el-table-column
                  label="操作"
                  width="180"
                >
                  <template>
                    <el-button type="primary" icon="el-icon-edit" circle />
                    <el-button icon="el-icon-delete" circle />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getSpecificationById } from '@/api/specification'
export default {
  name: 'SpecificationDetail',
  components: {
  },
  data() {
    return {
      specification: {
        id: '',
        specificationName: '诈骗案件',
        specificationFile: '诈骗标注规范文件',
        entityGroups: [
          {
            name: '嫌疑人',
            entitys: [
              {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }
            ]
          },
          {
            name: '受害人',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '民警',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '案件相关',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '嫌疑人',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '受害人',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '民警',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '案件相关',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '嫌疑人',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '受害人',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '民警',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          },
          {
            name: '案件相关',
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          }

        ],
        relationships: [
          {
            Rname: '嫌疑人-诈骗手段',
            beginEntity: '嫌疑人姓名',
            endEntity: '诈骗手段'
          },
          {
            Rname: '嫌疑人-案发时间',
            beginEntity: '嫌疑人姓名',
            endEntity: '案发时间'
          },
          {
            Rname: '受害人-报案时间',
            beginEntity: '受害人姓名',
            endEntity: '报案时间'
          },
          {
            Rname: '受害人-支付方式',
            beginEntity: '受害人姓名',
            endEntity: '支付方式'
          },
          {
            Rname: '民警-处警结论',
            beginEntity: '民警姓名',
            endEntity: '出警结论'
          },
          {
            Rname: '嫌疑人-诈骗手段',
            beginEntity: '嫌疑人姓名',
            endEntity: '诈骗手段'
          },
          {
            Rname: '嫌疑人-案发时间',
            beginEntity: '嫌疑人姓名',
            endEntity: '案发时间'
          },
          {
            Rname: '受害人-报案时间',
            beginEntity: '受害人姓名',
            endEntity: '报案时间'
          },
          {
            Rname: '受害人-支付方式',
            beginEntity: '受害人姓名',
            endEntity: '支付方式'
          },
          {
            Rname: '民警-处警结论',
            beginEntity: '民警姓名',
            endEntity: '出警结论'
          }
        ]
      },
      articleList: [
        { title: '基础篇' },
        { title: '登录权限篇' },
        { title: '实战篇' },
        { title: 'vue-admin-template 篇' },
        { title: 'v4.0 篇' },
        { title: '优雅的使用 icon' },
        { title: '登录权限篇' },
        { title: '实战篇' },
        { title: 'vue-admin-template 篇' },
        { title: 'v4.0 篇' },
        { title: '优雅的使用 icon' },
        { title: '登录权限篇' },
        { title: '实战篇' },
        { title: 'vue-admin-template 篇' },
        { title: 'v4.0 篇' },
        { title: '优雅的使用 icon' },
        { title: '登录权限篇' },
        { title: '实战篇' },
        { title: 'vue-admin-template 篇' },
        { title: 'v4.0 篇' },
        { title: '优雅的使用 icon' }
      ]
    }
  },
  created: function() {
    console.log(this.$route.params)
    this.specification.id = this.$route.params.id
    return getSpecificationById({ id: this.specification.id })
      .then(res => {
        if (res.code !== 0) {
          this.$message({
            type: 'warning',
            message: '获取详情失败'
          })
        // this.$router.push('/')
        } else {
          this.specification = res.data
          this.$message({
            type: 'success',
            message: '获取详情成功'
          })
        }
      })
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
  .inlineh{
    display:inline;
  }
  .propobox{
    margin-left:3%;
    width:90%;
  }
  .detailBox{
    margin-top:2%;
  }
  .image-item{
    float:right;
    width:50%;
  }
  .text{
    margin-bottom:4%;
    float:left;
    width:50%;
  }
  .inlineh{
    display: inline;
  }
</style>
