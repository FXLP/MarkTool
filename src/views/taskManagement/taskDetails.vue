<template>
  <div class="mixin-components-container" style="padding:15px">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="mini" class="pan-btn pink-btn">
            基本信息
          </el-button>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            任务名称
          </el-col>
          <el-col :span="4" class="text-center">
            任务类型
          </el-col>
          <el-col :span="4" class="text-center">
            任务状态
          </el-col>
          <el-col :span="4" class="text-center">
            标注类型
          </el-col>
          <el-col :span="4" class="text-center">
            标注模型
          </el-col>
          <el-col :span="4" class="text-center">
            标注规范
          </el-col>
        </div>
        <div style="margin-bottom:70px;">
          <el-col :span="4" class="text-center">
            {{ this.task.taskTitle }}
          </el-col>
          <el-col :span="4" class="text-center">
            {{ this.task.taskType }}
          </el-col>
          <el-col :span="4" class="text-center">
            {{ this.task.taskStage }}
          </el-col>
          <el-col :span="4" class="text-center">
            {{ this.task.labelType }}
          </el-col>
          <el-col :span="4" class="text-center">
            {{ this.task.labelModel }}
          </el-col>
          <el-col :span="4" class="text-center">
            {{ this.task.labelSpecification }}
          </el-col>
        </div>
      </el-card>
    </el-row>
    <el-row style="margin-top:10px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="mini" class="pan-btn green-btn">
            任务进度
          </el-button>
        </div>
        <div style="margin-bottom:50px;height:400px">
          <el-col :span="8" class="text-center">
            <span>标注者1</span>
            <el-table :data="list.slice((page-1)*limit,page*limit)" style="width:100%;height:500px">
              <el-table-column
                label="轮次"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.epoch }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="进度"
                width="360"
                align="center"
              >
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.progressRate" :format="format" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8" class="text-center">
            <span>标注者2</span>
            <el-table :data="list.slice((page-1)*limit,page*limit)" style="width:100%;height:500px">
              <el-table-column
                label="轮次"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.epoch }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="进度"
                width="360"
                align="center"
              >
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.progressRate" :color="ColorOne" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8" class="text-center">
            <span>审核者</span>
            <el-table :data="list.slice((page-1)*limit,page*limit)" style="width:100%;height:500px">
              <el-table-column
                label="轮次"
                width="120"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.epoch }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="进度"
                width="360"
                align="center"
              >
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.progressRate" :color="customColor" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ColorOne: '#E9ED21',
      customColor: '#12D215',
      task: {
        taskTitle: '1月诈骗案件', // 任务基本信息
        taskType: '普通任务',
        taskStage: '审核中',
        labelType: '命名实体识别',
        labelModel: 'Bi-RNN_CRF',
        labelSpecification: '诈骗'
      },
      list: [
        { epoch: '1', progressRate: '100' },
        { epoch: '2', progressRate: '80' },
        { epoch: '3', progressRate: '70' },
        { epoch: '4', progressRate: '50' },
        { epoch: '5', progressRate: '70' },
        { epoch: '6', progressRate: '80' },
        { epoch: '7', progressRate: '40' },
        { epoch: '8', progressRate: '50' },
        { epoch: '9', progressRate: '66' },
        { epoch: '10', progressRate: '15' }
      ],
      total: 100,
      listLoading: true,
      page: 1,
      limit: 10
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>
