<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1" />
      <el-step title="步骤 2" />
      <el-step title="步骤 3" />
    </el-steps>
    <div v-if="active == 0" style="width">
      <el-form ref="specification" :model="specification" label-width="400px" class="demo-dynamic">
        <el-form-item
          label="规范名称"
          prop="specificationName"
          style="width:1200px; margin-top:100px"
          :rules="[
            { required: true, message: '请输入标注规范名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ]"
        >
          <div style="width:60%;">
            <el-input v-model="specification.specificationName" />
          </div>
        </el-form-item>
        <el-form-item label="标注类型" prop="labelType" style="margin-top:50px">
          <el-radio-group v-model="specification.labelType">
            <el-radio label="命名实体识别" value="NER" />
            <el-radio label="关系抽取" value="RE" />
            <el-radio label="文本分类" value="CLASSIFY" />
            <el-radio label="事件标注" value="EVENT" />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="上传标注规范文件"
          style="margin-top:50px"
        >
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmitForm1">确定</el-button>
          <el-button @click="resetForm('specification')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="active == 1" style="width">
      <el-form ref="form2" :model="form2" label-width="400px" class="demo-dynamic">
        <div v-if="specification.labelType != '文本分类' ">
          <el-form-item label="创建实体集合元组" style="width:1200px">
            <el-button circle size="mini" type="primary" @click="newEntityGroup()"><i class="el-icon-plus" /></el-button>
          </el-form-item>
          <el-form-item
            v-for="(entityGroup, index) in form2.entityGroups"
            :key="entityGroup.key"
            :label="'实体集'+(index+1)"
            :prop="'entityGroups.'+index+'.name'"
            :rules="{
              required: true, message: '实体集名不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="entityGroup.name" style="width:800px" /><el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeEntityGroup(entityGroup)" />
          </el-form-item>
        </div>
        <div v-if="specification.labelType == '关系抽取'">
          <el-form-item label="创建关系集合" style="width:1000px">
            <el-button circle size="mini" type="primary" @click="newRelationship()"><i class="el-icon-plus" /></el-button>
          </el-form-item>
          <el-form-item
            v-for="(relationship, index) in form2.relationships"
            :key="relationship.key"
            :label="'关系名'+(index+1)"
            :prop="'relationships.'+index+'.Rname'"
            :rules="{
              required: true, message: '关系名不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="relationship.Rname" style="width:800px" /><el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeRelationship(relationship)" />
          </el-form-item>
        </div>
        <div v-if="specification.labelType == '文本分类'">
          <el-form-item label="创建分类标签集合" style="width:1000px">
            <el-button circle size="mini" type="primary" @click="newClasses()"><i class="el-icon-plus" /></el-button>
          </el-form-item>
          <el-form-item
            v-for="(classe, index) in form2.classes"
            :key="classe.key"
            :label="'分类标签名'+(index+1)"
            :prop="'classes.'+index+'.className'"
            :rules="{
              required: true, message: '分类标签名不能为空', trigger: 'blur'
            }"
          >
            <el-input v-model="classe.className" style="width:800px" /><el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeclass(classe)" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmitForm2">确定</el-button>
          <el-button @click="resetForm('form2')">重置</el-button>
          <el-button type="primary" plain @click="last()">上一步</el-button>
        </el-form-item>
      </el-form>
      <el-tooltip placement="top" content="回到顶部">
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
      </el-tooltip>
    </div>
    <div v-if="active == 2">
      <div class="app-container">
        <el-button type="danger">规范名：{{ specification.specificationName }}</el-button>
        <el-button type="primary" @click="submit(specification,form2)">立即创建</el-button>
        <el-button type="primary" plain @click="last()">上一步</el-button>
        <div style="text-align:center">
          <el-row :gutter="20" style="margin-top:20px;">
            <el-col v-if="specification.labelType != '文本分类' " :span="12">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>实体集合元组</span>
                </div>
                <div class="component-item" style="height:600px;">
                  <el-table
                    :data="form2.entityGroups"
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
                      width="350"
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
            <el-col v-if="specification.labelType == '关系抽取'" :span="12">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>关系集合</span>
                </div>
                <div class="component-item" style="height:600px;">
                  <el-table
                    :data="form2.relationships"
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
            <el-col v-if="specification.labelType == '文本分类'" :span="12">
              <el-card>
                <div slot="header" class="clearfix">
                  <span>分类标签集合</span>
                </div>
                <div class="component-item" style="height:600px;">
                  <el-table
                    :data="form2.classes"
                    height="570"
                    style="width: 100%; text-align:center"
                  >
                    <el-table-column
                      prop="className"
                      label="分类标签名"
                      width="350"
                    />
                    <el-table-column
                      prop="classColor"
                      label="标签颜色"
                      width="230"
                    />
                    <el-color-picker v-model="prop" />
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
              :data="form2.entityGroups[editIndex].entitys"
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
              <el-form ref="form" :model="form=form2.entityGroups[editIndex].entitys[editEntityIndex]" label-width="150px">
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
    </div>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
export default {
  components: { BackToTop },
  data() {
    return {
      active: 0,
      editEntityGroupDialog: false,
      editEntityDialog: false,
      editIndex: 0, // 编辑实体集合index
      editEntityIndex: 0, // 编辑实体index
      specification: {
        specificationName: '诈骗案件',
        labelType: '文本分类', // 命名实体识别 关系抽取 文本分类 事件标注
        specificationFile: ''
      },
      form2: {
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
        ],
        classes: [
          { className: '积极', classColor: '#9415E8' },
          { className: '消极', classColor: '#9415E8' },
          { className: '正常', classColor: '#9415E8' },
          { className: '异常', classColor: '#9415E8' }
        ]
      },
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  methods: {
    submit(specification, form2) {
      this.active++
      this.$message({ message: '成功新建标注规范！', type: 'success' })
      this.$confirm('恭喜你成功新建了一个标注规范！', '提示', {
        confirmButtonText: '查看规范列表',
        cancelButtonText: '继续创建规范'
      }).then(() => {
        this.$router.push({ path: '/specification/specificationList' })
      }).catch(() => {
        this.active = 0
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$message({ message: '成功新建标注规范！', type: 'success' })
      //     this.$confirm('恭喜你成功新建了一个标注规范！', '提示', {
      //       confirmButtonText: '详情',
      //       cancelButtonText: '关闭'
      //     }).then(() => {
      //       this.$router.push({ path: '/specification/specificationList' })
      //     }).catch(() => {
      //       this.$message({
      //         type: 'warning',
      //         message: '取消前往详情'
      //       })
      //     })
      //   } else {
      //     this.$message({ message: '新建标注规范失败', type: 'error' })
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    resetForm(formName) { // 需要重写方法清除规范数据
      this.$refs[formName].resetFields()
    },
    removeEntityGroup(item) {
      var index = this.form2.entityGroups.indexOf(item)
      if (index !== -1) {
        this.form2.entityGroups.splice(index, 1)
      }
    },
    newEntityGroup() {
      this.form2.entityGroups.push({
        name: '',
        key: Date.now()
      })
    },
    removeRelationship(item) {
      var index = this.form2.relationships.indexOf(item)
      if (index !== -1) {
        this.form2.relationships.splice(index, 1)
      }
    },
    removeclass(item) {
      var index = this.form2.classes.indexOf(item)
      if (index !== -1) {
        this.form2.classes.splice(index, 1)
      }
    },
    newRelationship() {
      this.form2.relationships.push({
        Rname: '',
        key: Date.now()
      })
    },
    newClasses() {
      this.form2.classes.push({
        className: '',
        key: Date.now()
      })
    },
    onSubmitForm1() {
      this.active++
    },
    onSubmitForm2() {
      this.active++
    },
    last() {
      this.active--
    }
  }
}
</script>
