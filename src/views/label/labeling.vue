<template>
  <el-container style="height: 850px">
    <el-aside width="400px" style="background-color: white ">
      <Kanban :key="1" :list="tableData" class="kanban todo" header-text="标注数据列表" />
    </el-aside>
    <el-container>
      <div class="components-container" width="1000px">
        <el-card class="box-card" style="height:400px">
          <el-tabs type="border-card">
            <el-tab-pane label="实体统计">
              实体统计
            </el-tab-pane>
            <el-tab-pane label="字典标注">字典标注</el-tab-pane>
            <el-tab-pane label="模型标注">模型标注</el-tab-pane>
            <el-tab-pane label="事件标注">事件标注</el-tab-pane>
            <el-tab-pane label="关系标注">关系标注</el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="box-card" style="height:300px">
          <div class="text item">
            {{ showdata }}
          </div>
        </el-card>
        <div style="text-align:center">
          <div style="float: left;">
            <el-button type="primary" icon="el-icon-arrow-left">上一条</el-button>
          </div>
          <div style="float: right;">
            <el-button type="primary">下一条<i class="el-icon-arrow-right el-icon--right" /></el-button>
          </div>
          <el-button type="primary" style="text-align:center" icon="el-icon-check">提交</el-button>
        </div>

      </div>
    </el-container>
  </el-container>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */ 
import Kanban from '@/components/Kanban'
import splitPane from 'vue-splitpane'
  export default {
    components: {
        Kanban,splitPane
    },
    methods: {
    },
    data() {
      return {
        tableData: [
            {
                name: '堂子街5号,报警人称家里老头走失了...', id: 1
            },
            {
                name: '象房村50号空军干休所,报警人亲戚...', id: 2
            },
            {
                name: '新街口德基广场旁边工商银行内,我...', id: 3
            },
            {
                name: '市中医院呼吸科,12点有位病患叫李...', id: 4
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 5
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 6
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 7
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 8
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 9
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 10
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 11
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 12
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 13
            },
            {
                name: '金陵尚府小区门口,报警人家人（杨...', id: 14
            }
        ],
        showdata: '金陵尚府小区门口,报警人家人（杨某某，32岁，智商有点问题，六合人）昨天晚上在上述地址被民警带走，需要联系。（接警台电话：28020）'
      }
    }
  }
</script>

<style lang="scss">
  .el-table .warning-row {
    background: #f9944a;
  }

  .el-table .success-row {
    background: #2ac06d;
  }

  .kanban {
    &.todo {
    .board-column-header {
      background: #4A9FF9;
    }
  }
    &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
    &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }

  .left-container {
    background-color: #F38181;
    height: 100%;
  }

  .right-container {
    background-color: #FCE38A;
    height: 200px;
  }

  .top-container {
    background-color: #FCE38A;
    width: 100%;
    height: 100%;
  }

  .bottom-container {
    width: 100%;
    background-color: #95E1D3;
    height: 100%;
  }

  .components-container {
    position: relative;
    height: 50vh;
  }

  .text {
    font-size: 14px;
  }

  .box-card {
    width: 480px;
    margin-top: 50px;
  }
}
</style>