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
        taskType: '',
        labelType: '',
        labelSpecification: '',
        labelModel: ''
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
    }
  }
}
</script>
