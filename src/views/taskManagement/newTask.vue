<template>
  <div class="app-container">
    <el-card style="width:97%; height:760px; margin:25px">
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1" />
        <el-step title="步骤 2" />
        <el-step title="步骤 3" />
        <el-step title="步骤 4" />
      </el-steps>
      <div v-if="active == 0" style="width">
        <!-- 步骤1 -->
        <el-form ref="form1" :model="form1" label-width="100px" style="margin:100px" class="demo-ruleForm">
          <el-form-item label="任务名称" prop="taskTitle">
            <div style="width:40%">
              <el-input v-model="form1.taskTitle" />
            </div>
          </el-form-item>
          <el-form-item label="任务类型" prop="taskType">
            <el-radio-group v-model="form1.taskType">
              <el-radio label="普通任务" />
              <el-radio label="主动学习" />
              <el-radio label="地雷任务" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标注类型" prop="labelType">
            <el-radio-group v-model="form1.labelType">
              <el-radio label="命名实体识别" />
              <el-radio label="关系抽取" />
              <el-radio label="文本分类" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标注规范" prop="labelSpecification">
            <el-radio-group v-model="form1.labelSpecification">
              <el-radio label="诈骗" />
              <el-radio label="盗窃" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标注模型" prop="labelModel">
            <el-radio-group v-model="form1.labelModel">
              <el-radio label="Bi-LSTM_CRF" />
              <el-radio label="Bert_CRF" />
              <el-radio label="Bi-RNN_CRF" />
              <el-radio label="无" />
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitForm1">确定</el-button>
            <el-button @click="resetForm('form1')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 1" style="width">
        <!-- 步骤2 -->
        <el-form ref="form2" :model="form2" label-width="100px" style="margin:100px" class="demo-ruleForm">
          <el-form-item label="每轮标注数量" prop="labelTotalNumber">
            <div style="width:40%">
              <el-input v-model="form2.labelTotalNumber" />
            </div>
          </el-form-item>
          <el-form-item label="待标注文件">
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
            <el-button type="primary" @click="onSubmitForm2">确定</el-button>
            <el-button @click="resetForm('form2')">重置</el-button>
            <el-button type="primary" plain @click="last()">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 2" style="width">
        <!-- 步骤3 -->
        <el-form ref="form3" :model="form3" label-width="100px" style="margin:100px" class="demo-ruleForm">
          <el-form-item label="上传字典文件">
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
            <el-button type="primary" @click="onSubmitForm3">确定</el-button>
            <el-button @click="resetForm('form3')">重置</el-button>
            <el-button type="primary" plain @click="last()">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active == 3" style="width">
        <!-- 步骤4 -->
        <el-form ref="form4" :model="form4" label-width="100px" style="margin:100px" class="demo-ruleForm">
          <el-form-item label="标注者A" prop="annotator1">
            <div style="width:40%">
              <el-select v-model="form4.annotator1">
                <el-option label="林宇翩" value="林宇翩" />
                <el-option label="蔡婷婷" value="蔡婷婷" />
                <el-option label="梁明" value="梁明" />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="标注者B" prop="annotator2">
            <div style="width:40%">
              <el-select v-model="form4.annotator2">
                <el-option label="林宇翩" value="林宇翩" />
                <el-option label="蔡婷婷" value="蔡婷婷" />
                <el-option label="梁明" value="梁明" />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="审核者" prop="inspector">
            <div style="width:40%">
              <el-select v-model="form4.inspector">
                <el-option label="马老师" value="马老师" />
                <el-option label="阮老师" value="阮老师" />
                <el-option label="叶老师" value="叶老师" />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item v-if="form1.taskType == '地雷任务'" label="地雷任务答案">
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
            <el-button type="primary" @click="onSubmitForm4">确定</el-button>
            <el-button @click="resetForm('form4')">重置</el-button>
            <el-button type="primary" plain @click="last()">上一步</el-button>
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
      form1: {
        taskTitle: '',
        taskType: '地雷任务',
        labelType: '',
        labelSpecification: '',
        labelModel: ''
      },
      form2: {
        labelTotalNumber: 100
      },
      form3: {},
      form4: {
        annotator1: '林宇翩',
        annotator2: '蔡婷婷',
        inspector: '马老师'
        // dilei_answer: ''
      }
    }
  },
  methods: {
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
      this.active++
    },
    onSubmitForm2() {
      this.active++
    },
    onSubmitForm3() {
      this.active++
    },
    onSubmitForm4() {
      this.active++
      this.$message({ message: '成功新建标注任务！', type: 'success' })
      this.$confirm('恭喜你成功新建了一个标注任务！', '提示', {
        confirmButtonText: '查看任务列表',
        cancelButtonText: '继续创建任务'
      }).then(() => {
        this.$router.push({ path: '/taskManagement/taskList' })
      }).catch(() => {
        this.active = 0
      })
    }
  }
}
</script>
