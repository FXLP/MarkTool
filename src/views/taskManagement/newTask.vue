<template>
  <div class="app-container">
    <el-card style="width:97%; height:760px; margin:25px">
      <el-steps
        :active="active"
        finish-status="success"
      >
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" />
        <el-step title="步骤 4" />
      </el-steps>
      <div
        v-if="active == 0"
        style="width"
      >
        <!-- 步骤1 -->
        <el-form
          ref="form1"
          :model="form1"
          label-width="100px"
          style="margin:100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="任务名称"
            prop="taskTitle"
          >
            <div style="width:40%">
              <el-input v-model="form1.taskTitle" />
            </div>
          </el-form-item>
          <el-form-item
            label="任务类型"
            prop="taskType"
          >
            <el-radio-group v-model="form1.taskType">
              <el-radio label="NON_ACTIVE_LEARNING" />
              <!-- <el-radio label="NON_ACTIVE_LEARNING" />
              <el-radio label="NON_ACTIVE_LEARNING" /> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="标注规范"
            prop="labelSpecification"
          >
            <el-select
              v-model="templateid"
              placeholder="请选择"
            >
              <el-option
                v-for="item in templatelist"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="标注模型"
            prop="labelModel"
          >
            <el-radio-group v-model="form1.labelModel">
              <!-- <el-radio label="Bi-LSTM_CRF" />
              <el-radio label="Bert_CRF" />
              <el-radio label="Bi-RNN_CRF" /> -->
              <el-radio label="无" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmitForm1"
            >
              确定
            </el-button>
            <el-button @click="resetForm('form1')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-if="active == 1"
        style="width"
      >
        <!-- 步骤2 -->
        <el-form
          ref="form2"
          :model="form2"
          label-width="100px"
          style="margin:100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="标注类型"
            prop="labelType"
          >
            {{ form1.specification.labelType }}
          </el-form-item>
          <el-form-item
            label="每轮标注数量"
            prop="labelTotalNumber"
          >
            <div style="width:40%">
              <el-input v-model="form2.labelTotalNumber" />
            </div>
          </el-form-item>
          <el-form-item label="待标注文件">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="showfile"
              multiple
              :auto-upload="false"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmitForm2"
            >
              确定
            </el-button>
            <el-button @click="resetForm('form2')">
              重置
            </el-button>
            <el-button
              type="primary"
              plain
              @click="last()"
            >
              上一步
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-if="active == 2"
        style="width"
      >
        <!-- 步骤3 -->
        <el-form
          ref="form3"
          :model="form3"
          label-width="100px"
          style="margin:100px"
          class="demo-ruleForm"
        >
          <el-form-item label="上传字典文件">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="showfile2"
              multiple
              :auto-upload="false"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmitForm3"
            >
              确定
            </el-button>
            <el-button @click="resetForm('form3')">
              重置
            </el-button>
            <el-button
              type="primary"
              plain
              @click="last()"
            >
              上一步
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-if="active == 3"
        style="width"
      >
        <!-- 步骤4 -->
        <el-form
          ref="form4"
          :model="form4"
          label-width="100px"
          style="margin:100px"
          class="demo-ruleForm"
        >
          <el-button
            circle
            size="mini"
            type="primary"
            @click="newannatator()"
          >
            <i class="el-icon-plus" />
          </el-button>
          <el-form-item
            v-for="(annatator,index) in annformtem"
            :key="index"
            label="标注者"
            prop="annotator1"
          >
            <div style="width:40%">
              <el-select v-model="annatator.id">
                <el-option
                  v-for="(item,index1) in annotatorlabel"
                  :key="item.name"
                  :label="item.name"
                  :value="index1"
                />
              </el-select>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click.prevent="removeannotator(index)"
              />
            </div>
          </el-form-item>
          <el-button
            circle
            size="mini"
            type="primary"
            @click="newreviewer()"
          >
            <i class="el-icon-plus" />
          </el-button>
          <!-- <el-form-item
            v-for="(reviewer,index) in revformtem"
            :key="index"
            label="审核者"
            prop="inspector"
          >
            <div style="width:40%">
              <el-select v-model="reviewer.id">
                <el-option
                  v-for="(item,index1) in reviewerlabel"
                  :key="item.name"
                  :label="item.name"
                  :value="index1"
                />
              </el-select>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click.prevent="removereviewer(index)"
              />
            </div>
          </el-form-item> -->
          <el-form-item label="答案文件（可选）">
            <el-upload
              class="upload-demo"
              drag
              action=""
              :on-change="showfile3"
              multiple
              :auto-upload="false"
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmitForm4"
            >
              确定
            </el-button>
            <el-button @click="resetForm('form4')">
              重置
            </el-button>
            <el-button
              type="primary"
              plain
              @click="last()"
            >
              上一步
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      templatelist: [{
      }],
      templateid: '',
      projectid: '',
      form1: {
        taskTitle: '',
        taskType: '地雷任务',
        specification: {
          specificationName: '',
          labelType: '关系抽取'
        },
        labelModel: ''
      },
      form2: {
        labelTotalNumber: 100,
        file: ''
      },
      form3: {
        file: ''
      },
      form4: {
        annotator1: '林宇翩',
        annotator2: '蔡婷婷',
        inspector: '马老师',
        // dilei_answer: ''
        file: ''
      },
      annotatorlabel: [
        {
          name: 'admin',
          id: 2
        }
      ],
      reviewerlabel: [
        {
          name: 'admin',
          id: 2
        }
      ],
      annformtem: [
        {
          name: '',
          id: ''
        }
      ],
      revformtem: [
        {
          name: '',
          id: ''
        }
      ]
    }
  },
  created() {
    this.getTemplate()
  },
  methods: {
    getTemplate() {
      this.$store.dispatch('project/getallTemplate')
        .then((response) => {
          console.log(response)
          this.templatelist = response
        })
        .catch(() => {
          console.log('error')
        })
    },
    showfile(file, fileList) {
      console.log(file, fileList)
      this.form2.file = fileList
    },
    showfile2(file, fileList) {
      this.form3.file = fileList
    },
    showfile3(file, fileList) {
      this.form4.file = fileList
    },
    newannatator() {
      this.annformtem.push({
        'name': '',
        id: '',
        key: Date.now()
      })
    },
    newreviewer() {
      this.revformtem.push({
        'name': '',
        id: '',
        key: Date.now()
      })
    },
    removeannotator(index) {
      this.annformtem.splice(index, 1)
    },
    removereviewer(index) {
      this.revformtem.splice(index, 1)
    },
    next() {
      this.active++
      // if (this.active++ > 3) this.active = 0;
    },
    last() {
      this.active--
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSubmitForm1() {
      const data = {
        name: this.form1.taskTitle,
        project_type: this.form1.taskType,
        template: 'http://172.20.46.190:10000/api/templates/' + this.templateid + '/'
      }
      this.$store.dispatch('project/newProject', data)
        .then((response) => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '新建成功'
          })
          this.projectid = response.id
          // this.form1.specification.labelType = this.templatelist[this.templateid - 1].template_type
          this.active++
        })
        .catch(() => {
          console.log('error')
        })
    },
    onSubmitForm2() {
      const formData = new window.FormData()
      for (let i = 0; i < this.form2.file.length; i++) {
        formData.append('file', this.form2.file[i].raw)
      }
      formData.append('ann_num_per_epoch', this.form2.labelTotalNumber)
      console.log(111, formData.get('file'))
      const data = {
        formdata: formData,
        id: this.projectid
      }
      console.log(data)
      this.$store.dispatch('project/uploadlabelfile', data)
        .then((response) => {
          console.log(response)
          this.$message({
            type: 'success',
            message: '上传成功'
          })
          this.active++
        })
    },
    onSubmitForm3() {
      if (this.form3.file.length > 0) {
        const formData = new window.FormData()
        for (let i = 0; i < this.form3.file.length; i++) {
          formData.append('file', this.form3.file[i].raw)
        }
        // console.log(111, formData.get('file'))
        const data = {
          formdata: formData,
          id: this.projectid
        }
        console.log(data)
        this.$store.dispatch('project/uploaddicfile', data)
          .then((response) => {
            console.log(response)
            this.$message({
              type: 'success',
              message: '上传成功'
            })
            this.active++
          })
          .catch(() => {
            console.log('error')
          })
      } else {
        this.active++
      }
    },
    onSubmitForm4() {
      const formData = new window.FormData()
      if (this.form4.file.length > 0) {
        for (let i = 0; i < this.form4.file.length; i++) {
          formData.append('file', this.form4.file[i].raw)
        }
        console.log(111, formData.get('file'))
      }
      var annatator = ''
      for (let i = 0; i < this.annformtem.length; i++) {
        var j = this.annformtem[i].id
        annatator += this.annotatorlabel[j].id
        if (i < this.annformtem.length - 1) {
          annatator += ','
        }
      }
      var reviewer = ''
      for (let i = 0; i < this.revformtem.length; i++) {
        var h = this.revformtem[i].id
        reviewer += this.reviewerlabel[h].id
        if (i < this.revformtem.length - 1) {
          reviewer += ','
        }
      }
      // formData.append('annotators', annatator)
      // formData.append('reviewers', reviewer)
      formData.append('annotators', '2,3')
      formData.append('reviewers', '2')
      const data = {
        formdata: formData,
        id: this.projectid
      }
      console.log(data)
      this.$store.dispatch('project/fenpeiepoch', data)
        .then((response) => {
          console.log(response)
          const data1 = {
            id: this.projectid,
            input: {
              in_use: 1
            }
          }
          this.$store.dispatch('project/project_use', data1)
            .then((response1) => {
              this.$message({
                type: 'success',
                message: '创建任务成功'
              })
              this.$message({ message: '成功新建标注任务！', type: 'success' })
              this.$confirm('恭喜你成功新建了一个标注任务！', '提示', {
                confirmButtonText: '查看任务列表',
                cancelButtonText: '继续创建任务'
              }).then(() => {
                this.$router.push({ path: '/taskManagement/taskList' })
              }).catch(() => {
                this.active = 0
              })
              this.active++
            })
        })
        .catch(() => {
          console.log('error')
        })
    }
  }
}
</script>
