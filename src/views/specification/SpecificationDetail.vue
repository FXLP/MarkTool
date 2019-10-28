<template>
  <div class="app-container">
    <el-tag>标注规范详情</el-tag>
  </div>
</template>

<script>
import { getSpecificationById } from '@/api/specification'
export default {
  name: 'Proposaldetail',
  data() {
    return {
      activeName: '1',
      isFormal: false,
      proposal: {
        id: ''
      }
    }
  },
  created: function() {
    console.log(this.$route.params)
    this.proposal.id = this.$route.params.id
    return getSpecificationById({ id: this.proposal.id })
      .then(res => {
        if (res.code !== 0) {
          this.$message({
            type: 'warning',
            message: '获取详情失败'
          })
        // this.$router.push('/')
        } else {
          this.proposal = res.data
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
    download(url) {
      const { href } = this.$router.resolve({
        path: 'www.baidu.com'
      })
      window.open(href, '_blank')
    }
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
