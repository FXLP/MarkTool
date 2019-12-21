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
              <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="嫌疑人" name="1">
                  {{ statistics }}
                </el-collapse-item>
                <el-collapse-item title="受害人" name="2">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="民警" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="警情信息" name="4">
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="自动标注">
              <div class="user-images">
                <el-carousel :interval="6000" type="card" height="220px">
                  <el-carousel-item v-for="item in carouselImages" :key="item">
                    <img :src="item+carouselPrefix" class="image">
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div style="text-align:center">
                <div style="float: left;">
                  <el-button type="info" @click="Dictionary_annotation=true">字典标注</el-button>
                </div>
                <div style="float: right;">
                  <el-button type="info" @click="Event_annotation=true">事件标注</el-button>
                </div>
                <el-button type="info" @click="Model_annotation=true">模型标注</el-button>
              </div>
              <el-dialog
                title="字典标注"
                :visible.sync="Dictionary_annotation"
                width="500px"
                :before-close="handleClose"
              >
                <el-table
                  ref="multipleTable"
                  :data="entityTableData"
                  tooltip-effect="dark"
                  height="350px"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    label="实体名称"
                    width="200"
                  >
                    <template slot-scope="scope">{{ scope.row.entityContent }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="entityType"
                    label="实体类型"
                    width="200"
                  />
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="Dictionary_annotation = false">取 消</el-button>
                  <el-button type="primary" @click="handleDictionaryAnnotation()">标注所选项</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="模型标注"
                :visible.sync="Model_annotation"
                width="500px"
                :before-close="handleClose"
              >
                <el-table
                  :data="modelTableData"
                  height="400px"
                  style="width: 100%"
                >
                  <el-table-column
                    label="模型ID"
                    prop="modelID"
                  />
                  <el-table-column
                    label="模型名称"
                    prop="modelName"
                  />
                  <el-table-column align="right">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="handleModelAnnotation(scope.$index, scope.row)">标注</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
              <el-dialog
                title="事件标注"
                :visible.sync="Event_annotation"
                width="500px"
                :before-close="handleClose"
              >
                <el-table
                  ref="multipleTable"
                  :data="entityTableData"
                  tooltip-effect="dark"
                  height="350px"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column label="实体名称" width="200">
                    <template slot-scope="scope">{{ scope.row.entityContent }}</template>
                  </el-table-column>
                  <el-table-column label="实体类型" width="200">
                    <template slot-scope="scope">{{ scope.row.entityType }}</template>
                  </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="Event_annotation = false">取 消</el-button>
                  <el-button type="primary" @click="handleEventAnnotation()">标注所选项</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
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
const carouselPrefix = '?imageView2/2/h/440'
  export default {
    components: {
        Kanban,splitPane
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDictionaryAnnotation() {
        this.Dictionary_annotation = false;
      },
      handleModelAnnotation(index, row) {
        console.log(index, row);
        this.$message({ message: '标注成功！', type: 'success' });
      },
      handleEventAnnotation() {
        this.Event_annotation = false;
      }
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
        showdata: '金陵尚府小区门口,报警人家人（杨某某，32岁，智商有点问题，六合人）昨天晚上在上述地址被民警带走，需要联系。（接警台电话：28020）',
        activeName: '4',
        statistics: "姓名: 张三,李四,王五---电话号码: 156496845936,16549846536---支付宝号: 156496845936,16549846536---微信: 56449996465465,45644984932161654,4748489484844,7898791316461---QQ: 1564649987,1654654965,1656498498---银行卡号: 356465494965649489---",
        entityTableData: [
          {
            entityContent: '福建人',
            entityType: '籍贯'
          }, {
            entityContent: '广东人',
            entityType: '籍贯'
          }, {
            entityContent: '河南人',
            entityType: '籍贯'
          }, {
            entityContent: '上海人',
            entityType: '籍贯'
          }, {
            entityContent: '广东人',
            entityType: '籍贯'
          }, {
            entityContent: '河南人',
            entityType: '籍贯'
          }, {
            entityContent: '上海人',
            entityType: '籍贯'
          }, {
            entityContent: '广东人',
            entityType: '籍贯'
          }, {
            entityContent: '河南人',
            entityType: '籍贯'
          }, {
            entityContent: '上海人',
            entityType: '籍贯'
          }
        ],
        multipleSelection: [],
        Dictionary_annotation: false,
        Model_annotation: false,
        Event_annotation: false,
        modelTableData: [
          {
            modelID: '1',
            modelName: 'Bi-RNN + CRF'
          },
          {
            modelID: '2',
            modelName: 'Bi-LSTM + CRF'
          },
          {
            modelID: '3',
            modelName: 'BERT + CRF'
          },
          {
            modelID: '4',
            modelName: 'RNN'
          },
          {
            modelID: '5',
            modelName: 'CRF'
          },
          {
            modelID: '6',
            modelName: 'Bi-LSTM'
          },
          {
            modelID: '7',
            modelName: 'Bi-LSTM + CRF'
          },
          {
            modelID: '8',
            modelName: 'BERT + CRF'
          },
          {
            modelID: '9',
            modelName: 'RNN'
          },
          {
            modelID: '10',
            modelName: 'CRF'
          },
          {
            modelID: '11',
            modelName: 'Bi-LSTM'
          }
        ],
        carouselImages: [
          'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
          'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
          'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
          'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
        ],
        carouselPrefix
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