<template>
  <el-container style="height: 850px">
    <el-aside width="400px" style="background-color: white ">
      <div class="aside-container">
        <div class="aside-title">标注数据列表</div>
        <el-card v-for="data in tableData" :key="data.id" class="box-card asidelist" @click.native="aside_click(data.key)">
          {{ data.content }}
        </el-card>
      </div>
    </el-aside>
    <el-container class="right-container">
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
          <div class="labelcontent1" v-html="showdata_pre+showdata+showdata_back" />
          <div class="block">
            <el-cascader
              v-model="selectvalue"
              expand-trigger="hover"
              :options="options"
              @change="selectchange"
            />
          </div>
        </el-card>
        <div style="text-align:center">
          <div style="float: left;">
            <el-button type="primary" icon="el-icon-arrow-left" @click="last_doc">上一条</el-button>
          </div>
          <div style="float: right;">
            <el-button type="primary" @click="next_doc">下一条<i class="el-icon-arrow-right el-icon--right" /></el-button>
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
import $ from 'jquery'
const carouselPrefix = '?imageView2/2/h/440'
  export default {
    components: {
        Kanban,splitPane
    },
    created(){
      
    },
    mounted() { //标注实现
      this.template = this.$route.query.template
      this.state = this.$route.query.state
      this.epochid = this.$route.query.epochid
      this.getDoc()
      this.getTemplate()
      
      let that=this;
      var mouseX=0;
      var mouseY=0;
      this.$nextTick(function () { //检测鼠标事件
        $('body').mousemove(function(e) { //鼠标位置
            e = e || window.event;
            mouseX = e.pageX || e.clientX + document.body.scroolLeft;
            mouseY = e.pageY || e.clientY + document.body.scrollTop;
        });
        $("div.labelcontent1").on('mouseup','.labelcontent',function () {
          console.log(mouseX,mouseY);
          
          $("div.block").css({
            position:"absolute",
            top:mouseY-120,
            left:mouseX-560,
          })
                    
         if(window.getSelection().toString()!=""){
           that.selecttext = window.getSelection().toString();
          setTimeout(() => {
            $("div.el-input").trigger("click")
          }, 200);
           
         }
        //   var content = window.getSelection().toString();
        //   console.log(content);
        //   //console.log(that.showdata);
        //   var str = that.showdata.split(content);
        //   var str_new = "";
        //   for (let index = 0; index < str.length-1; index++) {
        //     str_new += str[index]+'<div class="labelstyle">'+content+'<div class="deletelabel">x</div></div>';
        //   }
        //   str_new += str[str.length-1]
        //   that.showdata = str_new;
        //   console.log(that.showdata);
        //   }
        })
        $("div.labelcontent1").on('mouseup','.deletelabel',function () {
          console.log($(this).parent()[0].outerHTML);
          var deletestr = $(this).parent()[0].outerHTML;
          var content = $(this).parent()[0].innerText;
          content = content.split('\nx');
          var str =  that.showdata.split(deletestr);
          console.log(str);
          var new_str = ""
          for (let i = 0; i < str.length-1; i++) { // 将删除的词的样式去除后连接起来
            new_str+=str[i]+content[0]
          }
          new_str +=str[str.length-1];
        //  console.log(deletestr,str,new_str)
          that.showdata = new_str;
        })
      })
    },
    methods: {
      test(){
        log(1);
      },
      getDoc(){
        this.$store.commit('user/SET_EPOCHID', this.epochid)
        // this.$store.dispatch('user/getDoc').then((response) =>{
        //   console.log(response);
        //   const list = response
        //   for (let i = 0; i < list.length; i++) {
        //     list[i].key = i
        //   }
        //   this.tableData = list
        // })
      },
      getTemplate(){
        this.$store.commit('project/SET_TEMPLATEID', 4)
        this.$store.dispatch('project/getTemplate').then((response) =>{
          console.log(response);
          const list = response
          for (let i = 0; i < list.length; i++) {
            list[i].label = list[i].name
            list[i].value = list[i].color
          }
          this.options = list
        })
      },
      next_doc(){
        let length = this.tableData.length - 1
        if(this.docid+1<=length)
        {
          this.docid++ 
        }
        this.showdata = this.tableData[this.docid].content
      },
      last_doc(){
        if(this.docid-1>=0)
        {
          this.docid-- 
        }
        this.showdata = this.tableData[this.docid].content
      },
      aside_click(id){
        console.log(id)
        this.docid = id
        this.showdata = this.tableData[id].content
      },
      selectchange(){
        console.log(123);
        console.log(this.selectvalue)
        var content = this.selecttext
        console.log(content);
        //console.log(that.showdata);
        var str = this.showdata.split(content);
        var str_new = "";
        for (let index = 0; index < str.length-1; index++) {
          str_new += str[index]+'<div class="labelstyle" style="background:' +this.selectvalue+'">'+content+'<div class="deletelabel">x</div></div>';
        }
        str_new += str[str.length-1]
        this.showdata = str_new;
        console.log(this.showdata);
      },
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
      },
      handleClose(){
        console.log(11);
      }
    },
    data() {
      return {
        docid:0,
        epochid:0, 
        state:'',
        template:0,
        selecttext:"",
        labelshow:1,
        selectvalue:"",
        options:[
           { 
              "id": 7,
              "label": "111",
              "value": "#ffffff",
              "create_date": "2019-12-26T03:08:44.338102Z", 
              "template": 12 },
            { "id": 8,
              "label": "3333", 
              "value": "#fefefe", 
              "create_date": "2019-12-26T03:08:44.341134Z", 
              "template": 12
            }
          ], 
        tableData: [
            {
                content: '金陵尚府小区门口,报警人家人（杨某某，32岁，智商有点问题，六合人）昨天晚上在上述地址被民警带走，需要联系。（接警台电话：28020）', id: 3, key:0
            },
            {
                content: '像是有人拿着刀，找准了我们最弱最不设防的部分温柔地刺进去，然后拉出来，血 肉模糊，然后再刺进去，一直到最后痛苦变得麻木，现在变得模糊，未来变得没有人可以知道结局。', id: 5, key:1
            },
            {
                content: 'Even now there is still hope left.', id: 6, key:2
            },
        ],
        showdata_pre:'<div class="labelcontent">',
        showdata_back:'</div>',
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
html{
  z-index: 0.5
}
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
    min-height: 90%;
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
.labelcontent{
    line-height: 175%;
    font-size:20px;
    z-index: 1;
}
.labelstyle{
  background: #F38181;
  border-radius: 4px;
  display: inline-flex;
  box-shadow: 1px 1px 5px #888888;
  margin-left:3px;
  margin-right:3px;
}
.deletelabel{
  margin-left: 2px;
  margin-right:2px;
  cursor: pointer;
}
.el-input{
  visibility: hidden;
  display: none;
}
.aside-container{
  min-height: 90%;
  min-width: 300px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  margin-top:20px;
}
.aside-title{
  background: #4A9FF9;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  border-radius: 3px 3px 0 0;
}
.asidelist{
  margin-bottom:3px;
  margin-top:3px;
  cursor: pointer;
}
.asidelist .el-card__body{
  white-space: nowrap; 
  overflow: hidden;
  text-overflow:ellipsis;
  width: 100%;
}
.right-container{
  width: 80%;
}
</style>