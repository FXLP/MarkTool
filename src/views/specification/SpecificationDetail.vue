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
                  width="390"
                />
                <el-table-column
                  label="操作"
                  width="380"
                >
                  <template>
                    <el-tooltip class="item" effect="dark" content="查看该实体集" placement="top">
                      <el-button type="info" icon="el-icon-search" circle @click="editEntityGroupDialog=true" />
                    </el-tooltip>
                    <el-button type="danger" icon="el-icon-delete" circle />
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
                  width="160"
                >
                  <template>
                    <el-button type="primary" plain icon="el-icon-edit" circle />
                    <el-button type="danger" plain icon="el-icon-delete" circle />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-dialog
        title="实体集"
        :visible.sync="editEntityGroupDialog"
        width="800px"
        :before-close="handleClose"
      >
        <!-- 每次点击打开实体集对话框需要更新参数editIndex -->
        <el-table
          :data="specification.entityGroups[editIndex].entitys"
          height="600px"
        >
          <el-table-column
            label="实体名称"
            width="200px"
          >
            <template slot-scope="scope">{{ scope.row.entityName }}</template>
          </el-table-column>
          <el-table-column
            label="实体英文名"
            width="200px"
          >
            <template slot-scope="scope">{{ scope.row.entityMatchName }}</template>
          </el-table-column>
          <el-table-column
            label="实体颜色"
            width="200px"
          >
            <template slot-scope="scope">
              <el-color-picker v-model="scope.row.entityColor" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150px"
          >
            <template>
              <el-button type="success" plain icon="el-icon-edit" circle @click="editEntityDialog=true" />
              <el-button type="danger" plain icon="el-icon-delete" circle />
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="编辑实体"
          :visible.sync="editEntityDialog"
          width="40%"
          append-to-body
        >
          <el-form ref="form" :model="form=specification.entityGroups[editIndex].entitys[editEntityIndex]" label-width="150px">
            <!-- 每次点击打开编辑实体对话框需要更新参数editEntityIndex -->
            <el-form-item label="实体名称">
              <el-input v-model="form.entityName" />
            </el-form-item>
            <el-form-item label="实体英文名">
              <el-input v-model="form.entityMatchName" />
            </el-form-item>
            <el-form-item label="实体颜色">
              <el-color-picker v-model="form.entityColor" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editEntityDialog = false">关闭</el-button>
            <el-button type="primary" @click="editEntityDialog = false">保存</el-button>
          </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editEntityGroupDialog = false">取 消</el-button>
          <el-button type="primary" @click="editEntityGroupDialog = false">确定</el-button>
        </span>
      </el-dialog>
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
      editEntityGroupDialog: false,
      editEntityDialog: false,
      editIndex: 0, // 编辑实体集合index
      editEntityIndex: 0, // 编辑实体index
      specification: {
        id: '',
        specificationName: '诈骗案件',
        specificationFile: '诈骗标注规范文件',
        entityGroups: [
          {
            name: '嫌疑人', // index = 0
            entitys: [
              {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
                entityName: '嫌疑人姓名',
                entityMatchName: 'suspectName',
                entityColor: 'rgba(19, 206, 102, 0.8)'
              }, {
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
      }
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
