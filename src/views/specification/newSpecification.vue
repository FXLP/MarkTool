<template>
  <div class="app-container">
    <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="200px" class="demo-dynamic">
      <el-form-item
        label="规范名称"
        prop="specificationName"
        style="width:800px"
        :rules="[
          { required: true, message: '请输入标注规范名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ]"
      >
        <el-input v-model="dynamicValidateForm.specificationName" />
      </el-form-item>
      <el-form-item
        label="上传标注规范文件"
        prop="specificationFile"
        style="width:800px"
        :rules="{
          required: true, message: '规范文件不能为空，请上传', trigger: 'blur'
        }"
      >
        <el-input v-model="dynamicValidateForm.specificationFile" />
      </el-form-item>
      <el-form-item label="创建实体组" style="width:800px">
        <el-button circle size="mini" type="primary" @click="newGroup()"><i class="el-icon-plus" /></el-button>
      </el-form-item>
      <el-form-item
        v-for="(group, index) in dynamicValidateForm.groups"
        :key="group.key"
        :label="'实体组'+(index+1)"
        :prop="'groups.'+index+'.name'"
        :rules="{
          required: true, message: '实体组名不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="group.name" style="width:600px" /><el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeGroup(group)" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">立即创建</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        specificationName: '',
        specificationFile: '',
        groups: [
          {
            name: ''
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({ message: '成功新建标注规范！', type: 'success' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeGroup(item) {
      var index = this.dynamicValidateForm.groups.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.groups.splice(index, 1)
      }
    },
    newGroup() {
      this.dynamicValidateForm.groups.push({
        name: '',
        key: Date.now()
      })
    }
  }
}
</script>
