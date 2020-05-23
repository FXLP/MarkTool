<template>
  <div class="app-container">
    <div style="text-align:center">
      <el-button
        size="big"
        type="danger"
        la
      >
        规范名：{{ specification.specificationName }}
      </el-button>
      <el-row
        :gutter="20"
        style="margin-top:20px;"
      >
        <el-col
          v-if="specification.template_type == 'NER' || specification.template_type == 'EVENT' || specification.template_type == 'RE'"
          :span="12"
          style="width:100%"
        >
          <el-card>
            <div
              slot="header"
              class="clearfix"
            >
              <span>{{ detailtitle }}</span>
            </div>
            <div
              class="component-item"
              style="min-height:300px;"
            >
              <el-table
                :data="specification.entityGroups"
                min-height="300"
                style="width: 100%; text-align:center"
              >
                <el-table-column
                  prop="name"
                  label="实体集合名"
                  min-width="390"
                />
                <el-table-column
                  label="操作"
                  min-width="380"
                >
                  <template slot-scope="scope">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="查看该实体集"
                      placement="top"
                    >
                      <el-button
                        type="info"
                        icon="el-icon-search"
                        circle
                        @click="opendialog(scope.$index)"
                      />
                    </el-tooltip>
                    <!-- <el-button type="danger" icon="el-icon-delete" circle /> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col
          v-if="specification.template_type == 'RE'"
          style="width:100%"
          :span="12"
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
              style="min-height:300px"
            >
              <el-table
                :data="specification.relationships"
                min-height="300"
                style="width: 100%; text-align:center"
              >
                <el-table-column
                  prop="Rname"
                  label="关系名"
                  min-width="200"
                />
                <el-table-column
                  prop="beginEntity"
                  label="前实体名"
                  min-width="200"
                />
                <el-table-column
                  prop="endEntity"
                  label="后实体名"
                  min-width="200"
                />
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col
          v-if="specification.template_type == 'CLASSIFICATION'"
          style="width:100%"
          :span="12"
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
                :data="specification.classes"
                min-height="300"
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
                >
                  <template slot-scope="scope">
                    <el-color-picker
                      v-model="scope.row.color"
                      disabled="true"
                    />
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
      >
        <!-- 每次点击打开实体集对话框需要更新参数editIndex -->
        <el-table
          v-if="specification.entityGroups"
          :data="specification.entityGroups[editIndex].entitys"
          height="600px"
        >
          <el-table-column
            label="实体名称"
            min-width="200px"
          >
            <template slot-scope="scope">
              {{ scope.row.entityName }}
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
              <el-color-picker v-model="scope.row.entityColor" disabled />
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="操作"
            min-width="150px"
          >
            <template> -->
          <!-- <el-button type="success" plain icon="el-icon-edit" circle @click="editEntityDialog=true" /> -->
          <!-- <el-button type="danger" plain icon="el-icon-delete" circle /> -->
          <!-- </template>
          </el-table-column> -->
        </el-table>
        <el-dialog
          title="查看实体"
          :visible.sync="editEntityDialog"
          width="40"
          append-to-body
        >
          <el-form
            v-if="specification.entityGroups&&specification.entityGroups[editIndex].entitys"
            ref="form"
            :model="form=specification.entityGroups[editIndex].entitys[editEntityIndex]"
            label-width="150px"
          >
            <!-- 每次点击打开编辑实体对话框需要更新参数editEntityIndex -->
            <el-form-item label="实体名称">
              <el-input v-model="form.entityName" />
            </el-form-item>
            <!-- <el-form-item label="实体英文名">
              <el-input v-model="form.entityMatchName" />
            </el-form-item> -->
            <el-form-item label="实体颜色">
              <el-color-picker v-model="form.entityColor" />
            </el-form-item>
          </el-form>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="editEntityDialog = false">关闭</el-button>
            <!-- <el-button type="primary" @click="editEntityDialog = false">保存</el-button> -->
          </span>
        </el-dialog>
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
</template>

<script>
import { getSpecificationById } from '@/api/specification'
export default {
  components: {
  },
  data() {
    return {
      detailtitle: '',
      editEntityGroupDialog: false,
      editEntityDialog: false,
      editIndex: 0, // 编辑实体集合index
      editEntityIndex: 0, // 编辑实体index
      specification: {
        id: '',
        specificationName: '',
        specificationFile: '',
        template_type: '',
        entityGroups: [
          {
            name: '', // index = 0
            entitys: [
              {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }, {
                entityName: '',
                entityMatchName: '',
                entityColor: ''
              }
            ]
          }
        ],
        relationships: [
          {
            Rname: '',
            beginEntity: '',
            endEntity: ''
          }
        ],
        classes: [
          { name: '', color: '' },
          { name: '', color: '' }
        ]
      }
    }
  },
  created: function() {
    console.log(this.$store.state.project.detaillist)
    const list = this.$store.state.project.detaillist
    console.log(1, list)
    this.specification.id = list.id
    this.specification.specificationName = list.name
    this.specification.template_type = list.template_type
    const type = list.template_type
    if (type === 'NER') {
      this.detailtitle = '实体'
      this.getentitygroup()
    } else if (type === 'EVENT') {
      this.detailtitle = '事件'
      this.getevententitygroup()
    } else if (type === 'CLASSIFICATION') {
      this.detailtitle = '分类'
      this.getclass()
    } else {
      this.detailtitle = '关系'
      this.getre()
    }
  },
  mounted() {
  },
  methods: {
    getentitygroup() {
      console.log(this.specification.id)
      this.$store.dispatch('project/getTemplate', this.specification.id)
        .then((response) => {
          console.log(response)
          const entityGroup = response
          for (let index = 0; index < entityGroup.length; index++) {
            this.$store.dispatch('project/getentitys', entityGroup[index].id)
              .then((response) => {
                entityGroup[index].entitys = response
                for (let i = 0; i < entityGroup[index].entitys.length; i++) {
                  entityGroup[index].entitys[i].entityName = entityGroup[index].entitys[i].name
                  entityGroup[index].entitys[i].entityColor = entityGroup[index].entitys[i].color
                }
                console.log(entityGroup)
                this.specification.entityGroups = entityGroup
              })
              .catch(() => {
                console.log('error')
              })
          }// for结束
        })
        .catch(() => {
          console.log('error')
        })
    },
    getevententitygroup() {
      console.log(this.specification.id)
      this.$store.dispatch('project/getEventgroup', this.specification.id)
        .then((response) => {
          console.log(response)
          const entityGroup = response
          for (let index = 0; index < entityGroup.length; index++) {
            this.$store.dispatch('project/getEventEntitys', entityGroup[index].id)
              .then((response) => {
                entityGroup[index].entitys = response
                for (let i = 0; i < entityGroup[index].entitys.length; i++) {
                  entityGroup[index].entitys[i].entityName = entityGroup[index].entitys[i].name
                  entityGroup[index].entitys[i].entityColor = entityGroup[index].entitys[i].color
                }
                console.log(entityGroup)
                this.specification.entityGroups = entityGroup
              })
              .catch(() => {
                console.log('error')
              })
          }// for结束
        })
        .catch(() => {
          console.log('error')
        })
    },
    getclass() {
      this.$store.dispatch('project/getClass', this.specification.id)
        .then((response) => {
          console.log(response)
          this.specification.classes = response
        })
        .catch(() => {
          console.log('error')
        })
    },
    getre() {
      this.$store.dispatch('project/getTemplate', this.specification.id)
        .then((response) => {
          console.log(response)
          const entityGroup = response
          for (let index = 0; index < entityGroup.length; index++) {
            this.$store.dispatch('project/getentitys', entityGroup[index].id)
              .then((response) => {
                entityGroup[index].entitys = response
                for (let i = 0; i < entityGroup[index].entitys.length; i++) {
                  entityGroup[index].entitys[i].entityName = entityGroup[index].entitys[i].name
                  entityGroup[index].entitys[i].entityColor = entityGroup[index].entitys[i].color
                }
                console.log(entityGroup)
                this.specification.entityGroups = entityGroup
              })
              .catch(() => {
                console.log('error')
              })
          }// for结束
        })
        .catch(() => {
          console.log('error')
        })
      this.$store.dispatch('project/getRe', this.specification.id)
        .then((response) => {
          const list = response
          for (let i = 0; i < list.length; i++) {
            this.$store.dispatch('project/getReEntitys', list[i].id)
              .then((output) => {
                for (let m = 0; m < output.length; m++) {
                  for (let j = 0; j < this.specification.entityGroups.length; j++) {
                    for (let k = 0; k < this.specification.entityGroups[j].entitys.length; k++) {
                      if (output[m].start_entity === this.specification.entityGroups[j].entitys[k].id) {
                        output[m].beginEntity = this.specification.entityGroups[j].entitys[k].name
                      }
                      if (output[m].end_entity === this.specification.entityGroups[j].entitys[k].id) {
                        output[m].endEntity = this.specification.entityGroups[j].entitys[k].name
                      }
                      output[m].Rname = list[i].name
                    }
                  }
                  this.specification.relationships.push(output[m])
                }
              })
              .catch(() => {
                console.log('error')
              })
          }
          this.specification.relationships.splice(0, 1)
        })
        .catch(() => {
          console.log('error')
        })
    },
    opendialog(index) {
      this.editEntityGroupDialog = true
      console.log('dia', index)
      this.editIndex = index
    }
    // getentity() {
    //   for (let index = 0; index < this.entityGroups.length; index++) {
    //     console.log('z', this.specification[index].id)
    //     this.$store.dispatch('project/getentitys', this.specification[index].id)
    //       .then((response) => {
    //         console.log(response)
    //         this.entityGroups[index].entitys.entityName = response.name
    //         this.entityGroups[index].entitys.entityColor = response.color
    //       })
    //       .catch(() => {
    //         console.log('error')
    //       })
    //   }// for结束
    // }
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
