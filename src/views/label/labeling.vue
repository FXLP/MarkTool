<template>
  <el-container style="height: 850px">
    <el-aside width="400px" style="background-color: white ">
      <Kanban :key="1" :list="tableData" class="kanban todo" header-text="标注数据列表" />
    </el-aside>
    <el-container>
      <div class="components-container" width="1600px">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"> 我的行程</span>
            测试文本：一致性 Consistency 与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
          </el-tab-pane>
          <el-tab-pane label="消息中心">消息中心</el-tab-pane>
          <el-tab-pane label="角色管理">一致性 Consistency 与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
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
        ]
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

}
</style>