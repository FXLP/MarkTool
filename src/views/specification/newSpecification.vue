<template>
  <el-backtop target=".page-component__scroll .el-scrollbar__wrap">
    <div class="app-container">
      <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" label-width="400px" class="demo-dynamic">
        <el-form-item
          label="规范名称"
          prop="specificationName"
          style="width:1200px"
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
          style="width:1200px"
          :rules="{
            required: true, message: '规范文件不能为空，请上传', trigger: 'blur'
          }"
        >
          <el-input v-model="dynamicValidateForm.specificationFile" />
        </el-form-item>
        <el-form-item label="创建实体集合元组" style="width:1200px">
          <el-button circle size="mini" type="primary" @click="newEntityGroup()"><i class="el-icon-plus" /></el-button>
        </el-form-item>
        <el-form-item
          v-for="(entityGroup, index) in dynamicValidateForm.entityGroups"
          :key="entityGroup.key"
          :label="'实体集'+(index+1)"
          :prop="'entityGroups.'+index+'.name'"
          :rules="{
            required: true, message: '实体集名不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="entityGroup.name" style="width:800px" /><el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeEntityGroup(entityGroup)" />
        </el-form-item>
        <el-form-item label="创建关系集合" style="width:1000px">
          <el-button circle size="mini" type="primary" @click="newRelationship()"><i class="el-icon-plus" /></el-button>
        </el-form-item>
        <el-form-item
          v-for="(relationship, index) in dynamicValidateForm.relationships"
          :key="relationship.key"
          :label="'关系名'+(index+1)"
          :prop="'relationships.'+index+'.Rname'"
          :rules="{
            required: true, message: '关系名不能为空', trigger: 'blur'
          }"
        >
          <el-input v-model="relationship.Rname" style="width:800px" /><el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeRelationship(relationship)" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">立即创建</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-backtop>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        specificationName: '',
        specificationFile: '',
        entityGroups: [
          {
            name: ''
          }
        ],
        relationships: [
          {
            Rname: ''
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
          this.$confirm('恭喜你成功新建了一个标注规范！', '提示', {
            confirmButtonText: '详情',
            cancelButtonText: '关闭'
          }).then(() => {
            this.$router.push({ path: '/specification/specificationList' })
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '取消前往详情'
            })
          })
        } else {
          this.$message({ message: '新建标注规范失败', type: 'error' })
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeEntityGroup(item) {
      var index = this.dynamicValidateForm.entityGroups.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.entityGroups.splice(index, 1)
      }
    },
    newEntityGroup() {
      this.dynamicValidateForm.entityGroups.push({
        name: '',
        key: Date.now()
      })
    },
    removeRelationship(item) {
      var index = this.dynamicValidateForm.relationships.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.relationships.splice(index, 1)
      }
    },
    newRelationship() {
      this.dynamicValidateForm.relationships.push({
        Rname: '',
        key: Date.now()
      })
    }
  }
}
</script>
