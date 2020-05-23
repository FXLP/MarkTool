<template>
  <div class="app-container">
    <el-steps
      :active="active"
      finish-status="success"
    >
      <el-step title="步骤 1" />
      <el-step title="步骤 2" />
      <el-step title="步骤 3" />
    </el-steps>
    <div
      v-if="active == 0"
      style="width"
    >
      <el-form
        ref="specification"
        :model="specification"
        label-width="400px"
        class="demo-dynamic"
      >
        <el-form-item
          label="规范名称"
          prop="specificationName"
          style="width:1200px; margin-top:100px"
        >
          <div style="width:60%;">
            <el-input v-model="specification.specificationName" />
          </div>
        </el-form-item>
        <el-form-item
          label="标注类型"
          prop="labelType"
          style="margin-top:50px"
        >
          <el-radio-group v-model="specification.labelType">
            <el-radio
              label="命名实体识别"
              value="NER"
            />
            <el-radio
              label="关系抽取"
              value="RE"
            />
            <el-radio
              label="文本分类"
              value="CLASSIFICATION"
            />
            <el-radio
              label="事件标注"
              value="EVENT"
            />
          </el-radio-group>
        </el-form-item>
        <!-- <div v-if="specification.labelType=='命名实体识别'">
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
        </div> -->
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmitForm1"
          >
            确定
          </el-button>
          <!-- <el-button @click="resetForm('specification')">
            重置
          </el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div
      v-if="active == 1"
      style="width"
    >
      <el-form
        ref="form2"
        :model="form2"
        label-width="400px"
        class="demo-dynamic"
      >
        <div v-if="specification.labelType != '文本分类'">
          <el-form-item
            label="创建实体/事件集合元组"
            style="width:1200px"
          >
            <el-button
              circle
              size="mini"
              type="primary"
              @click="newEntityGroup()"
            >
              <i class="el-icon-plus" />
            </el-button>
          </el-form-item>
          <el-form-item
            v-for="(entityGroup, index) in form2.entityGroups"
            :key="entityGroup.key"
            :label="'实体集/事件'+(index+1)"
            :prop="'entityGroups.'+index+'.name'"
            :rules="{
              required: true, message: '实体/事件集名不能为空', trigger: 'blur'
            }"
          >
            <el-input
              v-model="entityGroup.name"
              style="width:50%"
            /><el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click.prevent="removeEntityGroup(entityGroup)"
            />
          </el-form-item>
        </div>
        <div v-if="specification.labelType == '关系抽取'">
          <el-form-item
            label="创建关系集合"
            style="width:1000px"
          >
            <el-button
              circle
              size="mini"
              type="primary"
              @click="newRelationship()"
            >
              <i class="el-icon-plus" />
            </el-button>
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
            <el-input
              v-model="relationship.Rname"
              style="width:800px"
            /><el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click.prevent="removeRelationship(relationship)"
            />
          </el-form-item>
        </div>
        <div v-if="specification.labelType == '文本分类'">
          <el-form-item
            label="创建分类标签集合"
            style="width:1000px"
          >
            <el-button
              circle
              size="mini"
              type="primary"
              @click="newClasses()"
            >
              <i class="el-icon-plus" />
            </el-button>
          </el-form-item>
          <el-form-item
            v-for="(classe, index) in form2.classes"
            :key="classe.key"
            :label="'分类标签名'+(index+1)"
            :prop="classe.name"
          >
            <el-input
              v-model="classe.name"
              style="width:800px"
            /><el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click.prevent="removeclass(classe)"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmitForm2"
          >
            确定
          </el-button>
          <!-- <el-button @click="resetForm('form2')">
            重置
          </el-button> -->
          <!-- <el-button
            type="primary"
            plain
            @click="last()"
          >
            上一步 -->
          <!-- </el-button> -->
        </el-form-item>
      </el-form>
      <el-tooltip
        placement="top"
        content="回到顶部"
      >
        <back-to-top
          :custom-style="myBackToTopStyle"
          :visibility-height="300"
          :back-position="50"
          transition-name="fade"
        />
      </el-tooltip>
    </div>
    <div v-if="active == 2">
      <div class="app-container">
        <el-button type="danger">
          规范名：{{ specification.specificationName }}
        </el-button>
        <el-button
          v-if="!(specification.labelType == '关系抽取' && reform3change == 0)"
          type="primary"
          @click="submit(specification,form2)"
        >
          立即创建
        </el-button>
        <!-- <el-button
          type="primary"
          plain
          @click="last()"
        >
          上一步
        </el-button> -->
        <el-button
          v-if="reform3change==0&&specification.labelType == '关系抽取'"
          type="primary"
          plain
          @click="reformchange()"
        >
          下一步
        </el-button>
        <div style="text-align:center">
          <el-row
            :gutter="20"
            style="margin-top:20px;"
          >
            <el-col
              v-if="specification.labelType != '文本分类' && specification.labelType != '关系抽取' || (specification.labelType == '关系抽取' && reform3change == 0)"
              :span="12"
              style="width:100%"
            >
              <el-card>
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>实体集合元组</span>
                </div>
                <div
                  class="component-item"
                  style="height:600px;"
                >
                  <el-table
                    :data="form2.entityGroups"
                    height="570"
                    style="width: 100%; text-align:center"
                  >
                    <el-table-column
                      prop="name"
                      label="实体集合名"
                      min-width="390"
                    />
                    <el-table-column
                      label="操作"
                      min-width="350"
                    >
                      <template slot-scope="scope">
                        <el-button
                          type="info"
                          icon="el-icon-search"
                          circle
                          @click="modifyEntityGroup(scope.$index)"
                        />
                        <!-- <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                        /> -->
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
            <el-col
              v-if="specification.labelType == '关系抽取' && reform3change == 1"
              :span="12"
              style="width:100%"
            >
              <el-card>
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>关系集合</span>
                </div>
                <div
                  class="component-item"
                  style="height:600px;"
                >
                  <!-- <el-select v-model="changeid" placeholder="选择实体组">
                    <el-option
                      v-for="item in regetgroup"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                      :change="getreentity(item.id)"
                    />
                  </el-select> -->
                  <el-table
                    :data="form2.relationships"
                    height="570"
                    style="width: 100%; text-align:center"
                  >
                    <el-table-column
                      prop="Rname"
                      label="关系名"
                      min-width="300"
                    />
                    <el-table-column
                      prop="beginEntity"
                      label="前实体名"
                      min-width="300"
                    >
                      <template slot-scope="scope">
                        <el-select
                          v-model="scope.row.beginEntity"
                          placeholder="请选择"
                        >
                          <el-option-group
                            v-for="group in form2.entityGroups"
                            :key="group.name"
                            :label="group.name"
                          >
                            <el-option
                              v-for="item in group.entitys"
                              :key="item.name"
                              :label="item.name"
                              :value="item.id"
                            />
                          </el-option-group>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="endEntity"
                      label="后实体名"
                      min-width="300"
                    >
                      <template slot-scope="scope">
                        <el-select
                          v-model="scope.row.endEntity"
                          placeholder="请选择"
                        >
                          <el-option-group
                            v-for="group in form2.entityGroups"
                            :key="group.id"
                            :label="group.name"
                          >
                            <el-option
                              v-for="item in group.entitys"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            />
                          </el-option-group>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      min-width="150"
                    >
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          icon="el-icon-circle-plus-outline"
                          circle
                          @click="addre(scope.$index)"
                        />
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="deletere(scope.$index)"
                        />
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-col>
            <el-col
              v-if="specification.labelType == '文本分类'"
              :span="12"
              style="width:100%"
            >
              <el-card>
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>分类标签集合</span>
                </div>
                <div
                  class="component-item"
                  style="height:600px;"
                >
                  <el-table
                    :data="form2.classes"
                    height="570"
                    style="width: 100%; text-align:center"
                  >
                    <el-table-column
                      prop="name"
                      label="分类标签名"
                      min-width="350"
                    />
                    <el-table-column
                      prop="color"
                      label="标签颜色"
                      min-width="230"
                    />
                    <el-table-column
                      label="更改颜色"
                      min-width="160"
                    >
                      <template slot-scope="scope">
                        <el-color-picker v-model="scope.row.color" />
                        <!-- <el-button type="danger" plain icon="el-icon-delete" circle /> -->
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
            :close-on-click-modal="false"
          >

            <!-- 每次点击打开实体集对话框需要更新参数editIndex -->
            <el-table
              :data="form=form2.entityGroups[editIndex].entitys"
              min-height="300px"
            >
              <el-table-column
                label="实体名称"
                width="200px"
              >
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" />
                </template>

              </el-table-column>
              <!-- <el-table-column
                label="实体英文名"
                width="200px"
              >
                <template slot-scope="scope">{{ scope.row.entityMatchName }}</template>
              </el-table-column> -->
              <el-table-column
                label="实体颜色"
                min-width="200px"
              >
                <template slot-scope="scope">
                  <el-color-picker v-model="scope.row.color" />
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                min-width="150px"
              >
                <template slot-scope="scope">
                  <!-- <el-button
                    type="success"
                    plain
                    icon="el-icon-edit"
                    circle
                    @click="modifyEntity(scope.$index)"
                  /> -->
                  <el-button
                    type="danger"
                    plain
                    icon="el-icon-delete"
                    circle
                    @click="deleteEntity(scope.$index)"
                  />
                </template>

              </el-table-column>
            </el-table>
            <el-button
              circle
              size="mini"
              type="primary"
              @click="newEntity()"
            >
              <i class="el-icon-plus" />
            </el-button>
            <!-- <el-dialog
              title="编辑实体"
              :visible.sync="editEntityDialog"
              width="40%"
              append-to-body
              :before-close="handleClose"
            >
              <el-form
                ref="form"
                :model="form=form2.entityGroups[editIndex].entitys[editEntityIndex]"
                label-width="150px"
              >
                <el-form-item label="实体名称">
                  <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="实体颜色">
                  <el-color-picker v-model="form.color" />
                </el-form-item>
              </el-form>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="closeEdit()">关闭</el-button>
                <el-button
                  type="primary"
                  @click="saveEditEntity()"
                >保存</el-button>
              </span>
            </el-dialog> -->
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="editEntityGroupDialog = false">取 消</el-button>
              <el-button
                type="primary"
                @click="editEntityGroupDialog = false"
              >确定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import qs from 'qs'
export default {
  components: { BackToTop },
  data() {
    return {
      reform3change: 0,
      changeid: '',
      tempcolor: '',
      active: 0,
      editEntityGroupDialog: false,
      editEntityDialog: false,
      editIndex: 0, // 编辑实体集合index
      editEntityIndex: 0, // 编辑实体index
      specification: {
        specificationName: '',
        labelType: '', // 命名实体识别 关系抽取 文本分类 事件标注
        specificationFile: ''
      },
      form2: {
        entityGroups: [
          {
            name: 'name1', // index = 0
            entitys: [
              {
                id: 0,
                name: 'entity1',
                color: '#00FF95'
              }, {
                id: 1,
                name: 'entity2',
                color: '#00D4FF'
              }
            ]
          },
          {
            name: 'name2',
            entitys: [
              {
                id: 2,
                name: 'entity3',
                color: '#CD5454'
              }, {
                id: 3,
                name: 'entity4',
                color: '#FBBC00'
              }
            ]
          }
        ],
        relationships: [
          {
            Rname: '关系名',
            beginEntity: '',
            endEntity: ''
          },
          {
            Rname: '关系名',
            beginEntity: '',
            endEntity: ''
          }
        ],
        classes: [
          { name: '分类名', color: '#9415E8' },
          { name: '分类名', color: '#9415E8' }
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
      },
      newtemoutput: {
        'id': 13,
        'name': 'CLASSFISDF',
        'template_type': 'CLASSIFICATION',
        'create_date': '2019-12-26T02:58:46.729977Z',
        'url': 'http://172.20.46.190:10000/api/templates/13/'
      },
      newgroupoutput: {
        id: 13,
        name: 'victim',
        create_date: '2019-12-26T03:03:09.715976Z',
        template: 9
      },
      regetgroup: [],
      regetentity: []
    }
  },
  methods: {
    submit(specification, form2) {
      var isempty = 1
      var ischongfu = 0
      if (this.specification.labelType === '命名实体识别') {
        for (let i = 0; i < this.form2.entityGroups.length; i++) {
          for (let j = 0; j < this.form2.entityGroups[i].entitys.length - 1; j++) {
            for (let k = j + 1; k < this.form2.entityGroups[i].entitys.length; k++) {
              if (this.form2.entityGroups[i].entitys[j].name === this.form2.entityGroups[i].entitys[k].name) {
                ischongfu = 1
              }
            }
          }
        }
        for (let k = 0; k < this.form2.entityGroups.length; k++) {
          for (let l = 0; l < this.form2.entityGroups[k].entitys.length; l++) {
            console.log('color', this.form2.entityGroups[k].entitys[l].color)

            if (this.form2.entityGroups[k].entitys[l].color === null) {
              isempty = 0
              break
            }
            if (this.form2.entityGroups[k].entitys[l].name === '') {
              isempty = 0
              break
            }
          }
          // console.log('adadad',isempty);
        }
        if (!isempty) {
          this.$message({
            type: 'error',
            message: '信息未填写完整'
          })
        } else if (ischongfu) {
          this.$message({
            type: 'error',
            message: '实体集内存在同名实体'
          })
        } else {
          for (let i = 0; i < this.form2.entityGroups.length; i++) {
            const data = {
              list: this.form2.entityGroups[i].entitys,
              id: this.newgroupoutput[i].id
            }
            this.$store.dispatch('project/newEntitys', data)
              .then((response) => {
                console.log('newshiti', response)
                if (i === this.form2.entityGroups.length - 1) {
                  this.finish()
                }
              })
              .catch(() => {
                console.log('error')
              })
          }
        }
        // this.finish()
      } else if (this.specification.labelType === '关系抽取') {
        // this.finish()
        for (let l = 0; l < this.form2.relationships.length; l++) {
          if (this.form2.relationships[l].beginEntity === '') {
            isempty = 0
            break
          }
          if (this.form2.relationships[l].endEntity === '') {
            isempty = 0
            break
          }
        }
        if (!isempty) {
          this.$message({
            type: 'error',
            message: '前后实体未填写完整'
          })
        } else {
          console.log('关系抽取1', this.form2.relationships)
          let p = 1 // 判断是否创建过这个关系
          for (let i = 0; i < this.form2.relationships.length; i++) {
            for (let k = i - 1; k >= 0; k--) {
              p = 1
              if (this.form2.relationships[i].Rname === this.form2.relationships[k].Rname) {
                p = 0
                console.log('重复i', i)
                break
              }
            }
            const data = {
              list: {
                name: this.form2.relationships[i].Rname
              },
              id: this.newtemoutput.id
            }
            if (p === 1) {
              console.log('i进入了', i)
              this.$store.dispatch('project/newRe', data)
                .then((response) => {
                  for (let j = 0; j < this.form2.relationships.length; j++) {
                    if (this.form2.relationships[j].Rname === response.name) {
                      const data1 = {
                        id: response.id,
                        list: {
                          start_entity: this.form2.relationships[j].beginEntity,
                          end_entity: this.form2.relationships[j].endEntity
                        }
                      }
                      this.$store.dispatch('project/newReEntitys', data1)
                        .then((response) => {
                          console.log('newshiti', response)
                          if (i === this.form2.entityGroups.length - 1) {
                            this.finish()
                          }
                        })
                        .catch(() => {
                          console.log('error')
                        })
                    }
                  }
                  if (i === this.form2.relationships.length - 1) {
                    this.finish()
                  }
                })
                .catch(() => {
                  console.log('error')
                })
            }
          }
        }
      } else if (this.specification.labelType === '文本分类') {
        const data = {
          list: this.form2.classes,
          id: this.newtemoutput.id
        }
        this.$store.dispatch('project/newClass', data)
          .then((response) => {
            // console.log(1, response)
            this.finish()
          })
          .catch(() => {
            console.log('error')
          })
      } else {
        for (let i = 0; i < this.form2.entityGroups.length; i++) {
          for (let j = 0; j < this.form2.entityGroups[i].entitys.length - 1; j++) {
            for (let k = j + 1; k < this.form2.entityGroups[i].entitys.length; k++) {
              if (this.form2.entityGroups[i].entitys[j].name === this.form2.entityGroups[i].entitys[k].name) {
                ischongfu = 1
              }
            }
          }
        }
        for (let k = 0; k < this.form2.entityGroups.length; k++) {
          for (let l = 0; l < this.form2.entityGroups[k].entitys.length; l++) {
            console.log('color', this.form2.entityGroups[k].entitys[l].color)

            if (this.form2.entityGroups[k].entitys[l].color === null) {
              isempty = 0
              break
            }
            if (this.form2.entityGroups[k].entitys[l].name === '') {
              isempty = 0
              break
            }
          }
          // console.log('adadad',isempty);
        }
        if (!isempty) {
          this.$message({
            type: 'error',
            message: '信息未填写完整'
          })
        } else if (ischongfu) {
          this.$message({
            type: 'error',
            message: '事件集内存在同名实体'
          })
        } else {
          for (let i = 0; i < this.form2.entityGroups.length; i++) {
            const data = {
              list: this.form2.entityGroups[i].entitys,
              id: this.newgroupoutput[i].id
            }
            this.$store.dispatch('project/newEventEntitys', data)
              .then((response) => {
                console.log('newshiti', response)
                if (i === this.form2.entityGroups.length - 1) {
                  this.finish()
                }
              })
              .catch(() => {
                console.log('error')
              })
          }
        }
        // this.finish()
      }
      // this.active++
      // this.$message({ message: '成功新建标注规范！', type: 'success' })
      // this.$confirm('恭喜你成功新建了一个标注规范！', '提示', {
      //   confirmButtonText: '查看规范列表',
      //   cancelButtonText: '继续创建规范'
      // }).then(() => {
      //   this.$router.push({ path: '/specification/specificationList' })
      // }).catch(() => {
      //   this.active = 0
      // })
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
    finish() {
      const data = {
        id: this.newtemoutput.id,
        input: {
          in_use: 1
        }
      }
      this.$store.dispatch('project/template_use', data)
        .then((response) => {
          // console.log(1, response)
          this.active++
          this.reform3change = 0
          this.$message({ message: '成功新建标注规范！', type: 'success' })
          this.$confirm('恭喜你成功新建了一个标注规范！', '提示', {
            confirmButtonText: '查看规范列表',
            cancelButtonText: '继续创建规范'
          }).then(() => {
            this.$router.push({ path: '/specification/specificationList' })
          }).catch(() => {
            this.active = 0
          })
        })
        .catch(() => {
          console.log('error')
        })
    },
    colorchange(row, color) {
      console.log(row, color)
    },
    resetForm(formName) { // 需要重写方法清除规范数据
      this.$refs[formName].resetFields()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.editEntityIndex = 0
          done()
        })
        .catch(_ => {})
    },
    removeEntityGroup(item) {
      var index = this.form2.entityGroups.indexOf(item)
      if (index !== -1) {
        this.form2.entityGroups.splice(index, 1)
      }
    },
    newEntityGroup() {
      this.form2.entityGroups.push({
        'name': '',
        entitys: [
          {
            id: 0,
            name: '',
            color: this.color16()
          }, {
            id: 1,
            name: '',
            color: this.color16()
          }
        ],
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
        beginEntity: '',
        endEntity: '',
        Rname: '',
        key: Date.now()
      })
    },
    newClasses() {
      this.form2.classes.push({
        name: 'name',
        color: '#ffffff',
        key: Date.now()
      })
    },
    addre(index) {
      console.log(index)
      this.form2.relationships.splice(index + 1, 0, {
        Rname: this.form2.relationships[index].Rname,
        beginEntity: '',
        endEntity: '',
        key: Date.now()
      })
    },
    reformchange() {
      var ischongfu = 0
      var isempty = 1
      for (let i = 0; i < this.form2.entityGroups.length; i++) {
        for (let j = 0; j < this.form2.entityGroups[i].entitys.length - 1; j++) {
          for (let k = j + 1; k < this.form2.entityGroups[i].entitys.length; k++) {
            if (this.form2.entityGroups[i].entitys[j].name === this.form2.entityGroups[i].entitys[k].name) {
              ischongfu = 1
            }
          }
        }
      }
      for (let k = 0; k < this.form2.entityGroups.length; k++) {
        for (let l = 0; l < this.form2.entityGroups[k].entitys.length; l++) {
          console.log('color', this.form2.entityGroups[k].entitys[l].color)

          if (this.form2.entityGroups[k].entitys[l].color === null) {
            isempty = 0
            break
          }
          if (this.form2.entityGroups[k].entitys[l].name === '') {
            isempty = 0
            break
          }
        }
        console.log('adadad', isempty)
      }
      if (!isempty) {
        this.$message({
          type: 'error',
          message: '信息未填写完整'
        })
      } else if (ischongfu) {
        this.$message({
          type: 'error',
          message: '实体集内存在重复实体'
        })
      } else {
        for (let i = 0; i < this.form2.entityGroups.length; i++) {
          const data = {
            list: this.form2.entityGroups[i].entitys,
            id: this.newgroupoutput[i].id
          }
          this.$store.dispatch('project/newEntitys', data)
            .then((response) => {
              console.log('newreshiti', response)
              for (let j = 0; j < response.length; j++) {
                for (let k = 0; k < this.form2.entityGroups[i].entitys.length; k++) {
                  if (response[j].name === this.form2.entityGroups[i].entitys[k].name) {
                    this.form2.entityGroups[i].entitys[k].id = response[j].id
                  }
                }
              }
              if (i === this.form2.entityGroups.length - 1) {
                this.reform3change = 1
              }
            })
            .catch(() => {
              console.log('error')
            })
        }
      }
    },
    deletere(index) {
      var rname = this.form2.relationships[index].name
      let num = 0
      for (let i = 0; i < this.form2.relationships.length; i++) {
        if (rname === this.form2.relationships[i].rname) {
          num++
        }
      }
      if (num === 1) {
        this.$message('不能删除')
      } else {
        this.form2.relationships.splice(index, 1)
      }
    },
    // getreentity(value) {
    //   console.log('getre',value);
    //   this.$store.dispatch('project/getTemplate', value)
    //     .then((response) => {
    //       // console.log(response)
    //       const entityGroup = response
    //       for (let index = 0; index < entityGroup.length; index++) {
    //         this.$store.dispatch('project/getentitys', entityGroup[index].id)
    //           .then((response) => {
    //             entityGroup[index].entitys = response
    //             for (let i = 0; i < entityGroup[index].entitys.length; i++) {
    //               entityGroup[index].entitys[i].entityName = entityGroup[index].entitys[i].name
    //               entityGroup[index].entitys[i].entityColor = entityGroup[index].entitys[i].color
    //             }
    //             // console.log(entityGroup)
    //             this.regetentity = entityGroup
    //           })
    //           .catch(() => {
    //             console.log('error')
    //           })
    //       }// for结束
    //     })
    //     .catch(() => {
    //       console.log('error')
    //     })
    // },
    onSubmitForm1() { // 新建模板
      if (this.specification.specificationName === '' || this.specification.labelType === '') {
        this.$message({
          type: 'error',
          message: '信息未填写完整'
        })
      } else {
        const newtemplatedata = {
          name: this.specification.specificationName,
          template_type: ''
        }
        if (this.specification.labelType === '命名实体识别') {
          newtemplatedata.template_type = 'NER'
        } else if (this.specification.labelType === '关系抽取') {
          newtemplatedata.template_type = 'RE'
        } else if (this.specification.labelType === '文本分类') {
          newtemplatedata.template_type = 'CLASSIFICATION'
        } else {
          newtemplatedata.template_type = 'EVENT'
        }
        console.log(newtemplatedata)
        this.$store.dispatch('project/newTemplate', newtemplatedata)
          .then((response) => {
            console.log(2, response)
            this.newtemoutput = response
            this.active++
          })
          .catch((error) => {
            console.log('error', error)
          })
      }
    },
    onSubmitForm2() {
      var isempty = 1
      var ischongfu = 0
      if (this.specification.labelType === '命名实体识别') {
        const list = []
        for (let k = 0; k < this.form2.entityGroups.length; k++) {
          if (this.form2.entityGroups[k].name === '') {
            isempty = 0
            break
          }
        }
        for (let i = 0; i < this.form2.entityGroups.length - 1; i++) {
          for (let j = i + 1; j < this.form2.entityGroups.length; j++) {
            if (this.form2.entityGroups[i].name === this.form2.entityGroups[j].name) {
              ischongfu = 1
            }
          }
        }
        if (!isempty) {
          this.$message({
            type: 'error',
            message: '请将信息填写完整'
          })
        } else if (ischongfu) {
          this.$message({
            type: 'error',
            message: '存在同名实体集'
          })
        } else {
          for (let i = 0; i < this.form2.entityGroups.length; i++) {
            const group = {}
            group.name = this.form2.entityGroups[i].name
            list[i] = group
          }
          const data = {
            list: list,
            id: this.newtemoutput.id
          }
          this.$store.dispatch('project/newEntitygroup', data)
            .then((response) => {
              console.log(this.newtemoutput.id)
              console.log(response)
              this.newgroupoutput = response
              this.active++
            })
            .catch(() => {
              console.log('error')
            })
        }
      } else if (this.specification.labelType === '关系抽取') {
        const list = []
        for (let k = 0; k < this.form2.entityGroups.length; k++) {
          if (this.form2.entityGroups[k].name === '') {
            isempty = 0
            break
          }
        }
        for (let i = 0; i < this.form2.entityGroups.length - 1; i++) {
          for (let j = i + 1; j < this.form2.entityGroups.length; j++) {
            if (this.form2.entityGroups[i].name === this.form2.entityGroups[j].name) {
              ischongfu = 1
            }
          }
        }
        for (let k = 0; k < this.form2.relationships.length; k++) {
          if (this.form2.relationships[k].Rname === '') {
            isempty = 0
            break
          }
        }
        for (let i = 0; i < this.form2.relationships.length - 1; i++) {
          for (let j = i + 1; j < this.form2.relationships.length; j++) {
            if (this.form2.relationships[i].Rname === this.form2.relationships[j].Rname) {
              ischongfu = 1
            }
          }
        }
        if (!isempty) {
          this.$message({
            type: 'error',
            message: '请将信息填写完整'
          })
        } else if (ischongfu) {
          this.$message({
            type: 'error',
            message: '存在同名实体/关系集'
          })
        } else {
          for (let i = 0; i < this.form2.entityGroups.length; i++) {
            const group = {}
            group.name = this.form2.entityGroups[i].name
            list[i] = group
          }
          const data = {
            list: list,
            id: this.newtemoutput.id
          }
          this.$store.dispatch('project/newEntitygroup', data)
            .then((response) => {
              console.log(this.newtemoutput.id)
              console.log(response)
              this.newgroupoutput = response
              this.active++
            })
            .catch(() => {
              console.log('error')
            })
        }
      } else if (this.specification.labelType === '文本分类') {
        this.active++
      } else {
        for (let i = 0; i < this.form2.entityGroups.length - 1; i++) {
          for (let j = i + 1; j < this.form2.entityGroups.length; j++) {
            if (this.form2.entityGroups[i].name === this.form2.entityGroups[j].name) {
              ischongfu = 1
            }
          }
        }
        for (let k = 0; k < this.form2.entityGroups.length; k++) {
          if (this.form2.entityGroups[k].name === '') {
            isempty = 0
            break
          }
        }
        if (!isempty) {
          this.$message({
            type: 'error',
            message: '请将信息填写完整'
          })
        } else if (ischongfu) {
          this.$message({
            type: 'error',
            message: '存在同名事件集'
          })
        } else {
          const list = []
          for (let i = 0; i < this.form2.entityGroups.length; i++) {
            const group = {}
            group.name = this.form2.entityGroups[i].name
            list[i] = group
          }
          const data = {
            list: list,
            id: this.newtemoutput.id
          }
          this.$store.dispatch('project/newEventgroup', data)
            .then((response) => {
              console.log(this.newtemoutput.id)
              console.log(response)
              this.newgroupoutput = response
              this.active++
            })
            .catch(() => {
              console.log('error')
            })
        }
      }
      // this.active++
    },
    last() {
      this.active--
      this.regetgroup = []
      this.regetentity = []
    },
    modifyEntity(index) {
      this.editEntityIndex = index
      this.editEntityDialog = true
    },
    deleteEntity(index) {
      this.form2.entityGroups[this.editIndex].entitys.splice(index, 1)
    },
    color16() { // 十六进制颜色随机
      var r = Math.floor(Math.random() * 240) + 16
      var g = Math.floor(Math.random() * 240) + 16
      var b = Math.floor(Math.random() * 240) + 16
      var color = '#' + r.toString(16) + g.toString(16) + b.toString(16)
      console.log(r, g, b, color)

      for (let i = 0; i < this.form2.entityGroups.length; i++) {
        for (let j = 0; j < this.form2.entityGroups[i].entitys.length; j++) {
          if (this.form2.entityGroups[i].entitys[j].color === color) {
            this.color16()
          }
        }
      }
      return color
    },
    newEntity() {
      this.form2.entityGroups[this.editIndex].entitys.push({
        'name': '',
        'color': this.color16(),
        key: Date.now()
      })
    },
    modifyEntityGroup($index) {
      this.editIndex = $index
      console.log(this.editIndex)
      this.editEntityGroupDialog = true
      console.log(this.editEntityGroupDialog)
    },
    saveEditEntity() {
      this.editEntityIndex = 0
      console.log('reset editEntityIndex = 0')
      this.editEntityDialog = false
    },
    closeEdit() {
      this.editEntityIndex = 0
      console.log('reset editEntityIndex = 0')
      this.editEntityDialog = false
    }
  }
}
</script>
