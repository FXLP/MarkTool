<template>
  <el-container style="height: 850px">
    <el-aside
      width="400px"
      style="background-color: white "
    >
      <div class="aside-container">
        <div class="aside-title">
          标注数据列表
        </div>
        <el-card
          v-for="data in tableData"
          :key="data.id"
          class="box-card asidelist"
          @click.native="aside_click(data.key)"
        >
          {{ data.content }}
        </el-card>
      </div>
    </el-aside>
    <el-container class="right-container">
      <div
        class="components-container"
        width="1000px"
        style="width:100%"
      >
        <el-card
          class="box-card"
          style="min-height:300px"
        >
          <el-tabs
            type="border-card"
            style="min-height:250px"
          >
            <el-tab-pane
              v-if="template_type=='NER'||template_type=='RE'||template_type=='EVENT'"
              label="实体统计"
            >
              <el-collapse
                v-for="(item) in options"
                :key="item.id"
                v-model="activeName"
                accordion
              >
                <el-collapse-item
                  :title="item.label"
                  :name="item.label"
                >
                  <div
                    v-for="entity in item.children"
                    :key="entity.id"
                    style="display:flex"
                  >
                    <div
                      class="labelstyle"
                      :style="{background:entity.color,'font-size':'18px',display:'inline-block',margin:'5px'}"
                    >
                      {{ entity.name }}
                    </div>
                    <!-- <el-color-picker v-model="entity.color" disabled /> -->
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='NULL'"
              label="自动标注"
            >
              <div class="user-images">
                <el-carousel
                  :interval="6000"
                  type="card"
                  height="220px"
                >
                  <el-carousel-item
                    v-for="item in carouselImages"
                    :key="item"
                  >
                    <img
                      :src="item+carouselPrefix"
                      class="image"
                    >
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div style="text-align:center">
                <div style="float: left;">
                  <el-button
                    type="info"
                    @click="Dictionary_annotation=true"
                  >
                    字典标注
                  </el-button>
                </div>
                <div style="float: right;">
                  <el-button
                    type="info"
                    @click="Event_annotation=true"
                  >
                    事件标注
                  </el-button>
                </div>
                <el-button
                  type="info"
                  @click="Model_annotation=true"
                >
                  模型标注
                </el-button>
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
                    <template slot-scope="scope">
                      {{ scope.row.entityContent }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="entityType"
                    label="实体类型"
                    width="200"
                  />
                </el-table>
                <span
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button @click="Dictionary_annotation = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="handleDictionaryAnnotation()"
                  >标注所选项</el-button>
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
                      <el-button
                        size="mini"
                        @click="handleModelAnnotation(scope.$index, scope.row)"
                      >
                        标注
                      </el-button>
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
                  <el-table-column
                    type="selection"
                    width="55"
                  />
                  <el-table-column
                    label="实体名称"
                    width="200"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.entityContent }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="实体类型"
                    width="200"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.entityType }}
                    </template>
                  </el-table-column>
                </el-table>
                <span
                  slot="footer"
                  class="dialog-footer"
                >
                  <el-button @click="Event_annotation = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="handleEventAnnotation()"
                  >标注所选项</el-button>
                </span>
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='RE'"
              label="关系标注"
            >
              <el-collapse
                v-for="(item) in reoptions"
                :key="item.id"
                v-model="activeName1"
                accordion
              >
                <el-collapse-item
                  :title="item.name"
                  :name="item.name"
                >
                  <el-select
                    v-model="revalue1"
                    style="width:25%"
                    placeholder="请选择关系对"
                    @change="reselectchange"
                  >
                    <el-option
                      v-for="re in item.children"
                      :key="re.id"
                      :label="re.start_name+'-'+re.end_name"
                      :value="{startid:re.start_entity,endid:re.end_entity,reid:re.id}"
                    />
                  </el-select>
                  <el-select
                    v-model="selectstartentity"
                    style="width:25%"
                    placeholder="请选择前实体"
                  >
                    <el-option
                      v-for="entity1 in startentitys"
                      :key="entity1.label"
                      :label="entity1.label"
                      :value="entity1.value"
                    />
                  </el-select>
                  <el-select
                    v-model="selectendentity"
                    style="width:25%"
                    placeholder="请选择后实体"
                  >
                    <el-option
                      v-for="entity2 in endentitys"
                      :key="entity2.label"
                      :label="entity2.label"
                      :value="entity2.value"
                    />
                  </el-select>
                  <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    circle
                    @click="addre()"
                  />
                  <div>已标注关系：</div>
                  <div
                    v-for="(relist,index1) in labeledre"
                    :key="index1"
                  >
                    <div
                      v-for="(re,index2) in item.children"
                      :key="index2"
                    >
                      <div v-if="relist.relation_entity_template==re.id">
                        {{ item.name }}:{{ relist.start_name }} - {{ relist.end_name }}
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          circle
                          @click="deletere(relist.id)"
                        />
                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='CLASSIFICATION'"
              label="文本分类"
            >
              <div style="font-size:18px">
                分类标签：
              </div>
              <div
                v-for="(cls) in options"
                :key="cls.id"
                style="display:inline-block"
              >
                <div
                  class="labelstyle"
                  :style="{background:cls.color,'font-size':'20px',display:'inline-block',margin:'10px'}"
                >
                  {{ cls.name }}
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card
          class="box-card"
          style="min-height:300px"
        >
          <div v-if="template_type=='CLASSIFICATION'">
            分类标签：<el-select
              v-if="labeledclass==''"
              v-model="labeledclass"
              placeholder="选择分类标签"
              @change="classchange"
            >
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name"
                :value="{name:item.name,color:item.color,id:item.id}"
              />
            </el-select>
            <div v-if="labeledclass!=''">
              <div
                class="labelstyle"
                :style="{background:labeledclass.color,'font-size':'20px'}"
              >
                {{ labeledclass.name }}<div
                  class="deleteclass"
                  @click="deleteclass"
                >
                  x
                </div>
              </div>
            </div>
          </div>
          <div v-if="template_type=='EVENT'">
            <el-select
              v-if="labeledevent==''"
              v-model="labeledevent"
              placeholder="选择事件组"
              @change="eventchange"
            >
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name"
                :value="{name:item.name,id:item.id}"
              />
            </el-select>
            <div v-if="labeledevent!=''">
              事件组：<div
                class="labelstyle"
                :style="{background:'#ffffff','font-size':'20px'}"
              >
                {{ labeledevent.name }}<div
                  class="deleteclass"
                  @click="deleteevent"
                >
                  x
                </div>
              </div>
            </div>
          </div>
          <div
            class="labelcontent1"
            v-html="showdata_pre+showdata+showdata_back"
          />
          <div
            v-if="template_type=='NER'||template_type=='RE'"
            class="block"
          >
            <el-cascader
              v-model="selectvalue"
              expand-trigger="hover"
              :options="options"
              @change="selectchange"
            />
          </div>
          <div
            v-if="template_type=='EVENT'"
            class="block"
          >
            <el-cascader
              v-model="selectvalue"
              expand-trigger="hover"
              :options="eventoptions"
              @change="eventselectchange"
            />
          </div>
        </el-card>
        <div style="text-align:center">
          <div style="float: left;">
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              @click="last_doc"
            >
              上一条
            </el-button>
          </div>
          <div style="float: right;">
            <el-button
              type="primary"
              @click="next_doc"
            >
              下一条<i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </div>
          <el-button
            type="primary"
            style="text-align:center"
            icon="el-icon-check"
            @click="submit"
          >
            提交
          </el-button>
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
      this.template_type = this.$route.query.template_type
      console.log('template', this.template_type);
      
      this.getDoc()
      if (this.template_type == 'CLASSIFICATION') {
        this.getclass()
      } else if(this.template_type == 'NER') {
        this.getEntitys()
      } else if(this.template_type == 'EVENT') {
        this.geteventEntitys()
      } else {
        this.getEntitys()
         setTimeout(() => {
            this.getRe()
          }, 200);
      }
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
           console.log(window.getSelection().anchorOffset,window.getSelection().focusOffset,window.getSelection());
           that.selectstart = window.getSelection().anchorOffset
           that.selectend = window.getSelection().focusOffset
           that.selectpara = window.getSelection().anchorNode.wholeText
          setTimeout(() => {
            if(that.template_type === 'RE'||that.template_type === 'NER'||(that.template_type==='EVENT' && that.labeledevent!='')){
              $("div.block .el-input").trigger("click")
            }
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
          console.log('content',content[0]);
          that.deleteentity(content[0])
          console.log('afterdeleteinput',that.entityinput);
          
        })
      })
    },
    methods: {
      test(){
        log(1);
      },
      getDoc(){
        this.$store.commit('user/SET_EPOCHID', this.epochid)
        this.$store.dispatch('user/getDoc').then((response) =>{
          console.log(response);
          const list = response
          for (let i = 0; i < list.length; i++) {
            list[i].key = i
          }
          this.projectid = list[0].project
          console.log(this.projectid)
          this.$store.commit('project/SET_PROJECTID', this.projectid)
          this.tableData = list
          this.showdata = this.tableData[0].content
        })
      },
      getEntitys(){
        this.$store.dispatch('project/getTemplate',this.template).then((response) =>{
          console.log('entitygroup', response);
          const list = response
          for (let i = 0; i < list.length; i++) {
            list[i].label = list[i].name
            list[i].value = list[i].id
          }
          for (let i = 0; i < list.length; i++) {
            this.$store.dispatch('project/getentitys',list[i].id)
              .then((response) => {
                console.log('list', response)
                list[i].children = response
                for (let j = 0; j < list[i].children.length; j++) {
                  list[i].children[j].value =  {
                    color:list[i].children[j].color,
                    id:list[i].children[j].id
                  }
                  list[i].children[j].label =  list[i].children[j].name
                }
                if (i === list.length-1){
                  this.options = list
                  // this.updatedoc()
                  if (this.template_type === 'NER'){
                    this.updatedoc()
                  }
                  console.log('last', list);
                }
              })
              .catch(() => {
                console.log('error')
              })
          }
        })
        // this.$store.dispatch('project/getentitys').then((response) =>{
        //   console.log(11,response);
        //   // for (let i = 0; i < list.length; i++) {
        //   //   list[i].label = list[i].name
        //   //   list[i].value = list[i].color
        //   // }
        //   // this.options = list
        // })
      },
      geteventEntitys(){
        this.$store.dispatch('project/getEventgroup',this.template).then((response) =>{
          console.log('entitygroup', response);
          const list = response
          for (let i = 0; i < list.length; i++) {
            list[i].label = list[i].name
            list[i].value = list[i].id
          }
          for (let i = 0; i < list.length; i++) {
            this.$store.dispatch('project/getEventEntitys',list[i].id)
              .then((response) => {
                console.log('list', response)
                list[i].children = response
                for (let j = 0; j < list[i].children.length; j++) {
                  list[i].children[j].value =  {
                    color:list[i].children[j].color,
                    id:list[i].children[j].id
                  }
                  list[i].children[j].label =  list[i].children[j].name
                }
                if (i === list.length-1){
                  this.options = list
                  this.updatedoc()
                  console.log('last', list);
                }
              })
              .catch(() => {
                console.log('error')
              })
          }
        })
      },
      getclass() {
        this.$store.dispatch('project/getClass',this.template).then((response) =>{
          console.log('class',response)
          this.options = response
          this.updatedoc()
        })
      },
      getRe(){
        this.$store.dispatch('project/getRe',this.template).then((response) =>{
          console.log('re',response)
          const list = response
          for (let i = 0; i < list.length; i++) {
            this.$store.dispatch('project/getReEntitys',list[i].id).then((response1) =>{
              list[i].children = response1
              for (let j = 0; j < list[i].children.length; j++) {
                for (let k = 0; k < this.options.length; k++) {
                  console.log(this.options[k]);
                  
                  for (let l =  0; l < this.options[k].children.length; l++) {
                    if(list[i].children[j].start_entity===this.options[k].children[l].id){
                      list[i].children[j].start_name = this.options[k].children[l].name
                    }
                    if(list[i].children[j].end_entity===this.options[k].children[l].id){
                      list[i].children[j].end_name = this.options[k].children[l].name
                    }
                  }
                }
              }
              if (i===list.length-1){
                this.reoptions = list
                this.updatedoc()
                console.log('relist', list);
              }
            })
            
          }
          // this.updatedoc()
        })
      },
      deleteclass() {
        const data = {
          docid:this.tableData[this.docid].id,
          classid: this.labeledclass.classid
        }
        this.$store.dispatch('user/deleteclass',data).then((response) =>{
          console.log('deleteclass',response)
          this.labeledclass = ''
        })
      },
      classchange() {
         console.log('classchange');
          const data = {
            id:this.tableData[this.docid].id,
            list:{
              doc:this.tableData[this.docid].id,
              user:2,
              role:2,
              classification_template:this.labeledevent.id
            }
          }
          this.$store.dispatch('user/labelclass',data).then((response) =>{
            console.log('labelclass',response)
            this.labeledclass.classid = response.id
          })
      },
      deleteevent() {
        const data = {
          id:this.tableData[this.docid].id,
          eventid:this.labeledevent.eventid
        }
        this.$store.dispatch('user/deleteevent',data).then((response) =>{
          console.log('deleteevent',response)
          this.labeledevent = ''
        })
      },
      eventchange() {
        console.log('eventchange');
        const data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            user:2,
            role:2,
            event_group_template:this.labeledevent.id
          }
        }
        this.$store.dispatch('user/labelevent',data).then((response) =>{
          console.log('labelevent',response)
          this.labeledevent.eventid = response.id
          for (let i = 0; i < this.options.length; i++) {
            if (response.event_group_template === this.options[i].id){
              this.eventoptions.push(this.options[i])
            }
          }
        })
      },
      deleteentity(content) {
        for (let i = 0; i < this.entityinput.length; i++) { //删去input内相应的项
            if (content === this.entityinput[i].content) {
              const data = {
                docid:this.tableData[this.docid].id,
                entityid:this.entityinput[i].id
              }
              this.$store.dispatch('user/deleteentity', data)
                .then((response) => {
                  this.entityinput.splice(i,1)
                })
            }
          }
          // for (let i = 0; i < this.entityinput1.length; i++) { //删去input内相应的项
          //   if (content === this.entityinput1[i].content) {
          //     const data = {
          //       docid:this.tableData[this.docid].id,
          //       entityid:this.entityinput1[i].id
          //     }
          //     this.$store.dispatch('user/deleteentity', data)
          //       .then((response) => {
          //         this.entityinput1.splice(i,1)
          //       })
          //   }
          // }
      },
      next_doc(){
        let length = this.tableData.length - 1
        if(this.docid+1<=length)
        {  
          this.docid++ 
          this.updatedoc()
          this.showdata = this.tableData[this.docid].content
        }
        // this.showdata = this.tableData[this.docid].content
      },
      last_doc(){
        if(this.docid-1>=0)
        {
          this.docid-- 
          this.updatedoc()
          this.showdata = this.tableData[this.docid].content
        }
        // this.showdata = this.tableData[this.docid].content
      },
      aside_click(id){
        console.log(id)
        this.docid = id
        this.showdata = this.tableData[id].content
        this.updatedoc()
      },
      updatedoc(){
        if (this.template_type == 'NER') {
          this.entityinput =[]
          // this.entityinput1 =[]
          //  const data1 = {
          //   docid:this.tableData[this.docid].id,
          //   userid:3
          // }
          // this.$store.dispatch('user/getuserlabel', data1)
          //   .then((response) => {
          //     const list = response
          //     this.entityinput1 = list
          //   })
          const data = {
            docid:this.tableData[this.docid].id,
            userid:2
          }
          this.$store.dispatch('user/getuserlabel', data)
            .then((response) => {
              console.log('updatedoc',response)
              const list = response
              this.entityinput = list
              var addcontent = []
              var addlist = []
              for (let i = 0; i < list.length; i++) {
                var content = list[i].content 
                //console.log(that.showdata);
                let index = 1
                for (let j = 0; j < i; j++) {
                if(content==list[j].content)
                  index=0
                }
                var color =''
                //console.log(this.options);
                if(index==1){
                  addlist.push(list[i])
                  for (let k = 0; k < this.options.length; k++) {
                    for (let l = 0; l < this.options[k].children.length; l++) {
                      if(this.options[k].children[l].id===list[i].entity_template){
                        color = this.options[k].children[l].color
                      }
                    }
                  }
                  // var str = this.showdata.split(content);
                  // var str_new = "";
                  // for (let index = 0; index < str.length-1; index++) {
                  //   str_new += str[index]+'<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>';
                  // }
                  addcontent.push('<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>') 
                  // str_new += str[str.length-1]
                  // this.showdata = str_new;   
                }         
              }
              var str_new = "";
              for (let i = 0; i < addcontent.length; i++) {
                var start = 0
                if (i>0) {
                  start = list[i].start_offset
                }
                if (i<addcontent.length-1){
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1,addlist[i+1].start_offset-1)
                } else {
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1)
                  this.showdata = str_new
                }
              }
            })
        } else if(this.template_type == 'CLASSIFICATION'){
          const data = {
            docid:this.tableData[this.docid].id,
            userid:2
          }
          this.$store.dispatch('user/getuserlabel', data)
            .then((response) => {
              console.log('getlabelclass', response,this.options)
              if (response.length < 1) {
                this.labeledclass = ''
              } else {
                this.labeledclass = {}
                this.labeledclass.id = response[0].classification_template
                this.labeledclass.classid = response[0].id
                for (let i = 0; i < this.options.length; i++) {
                  if (this.labeledclass.id === this.options[i].id) {
                    this.labeledclass.color = this.options[i].color
                    this.labeledclass.name = this.options[i].name
                  }
                }
                console.log(this.labeledclass)
                
              }
            })
        } else if(this.template_type == 'EVENT'){
          this.eventoptions = []
          const data = {
            docid:this.tableData[this.docid].id,
            userid:2
          }
          this.$store.dispatch('user/getuserlabel', data)
            .then((response) => {
              console.log('getlabelclass', response,this.options)
              if (response.length < 1) {
                this.labeledevent = ''
              } else {
                for (let i = 0; i < response.length; i++) {
                  if (this.tableData[this.docid].id === response[i].doc) {
                    this.labeledevent = {}
                    this.labeledevent.id = response[i].event_group_template
                    this.labeledevent.eventid = response[i].id
                    for (let i = 0; i < this.options.length; i++) {
                      if (this.labeledevent.id === this.options[i].id) {
                        this.labeledevent.name = this.options[i].name
                      }
                    }
                  }
                }
                for (let i = 0; i < this.options.length; i++) {
                  if (response[0].event_group_template === this.options[i].id){
                    this.eventoptions.push(this.options[i])
                  }
                }
                this.entityinput = response[0].entities
                var addcontent = []
                var addlist = []
                for (let i = 0; i < response[0].entities.length; i++) {
                  var content = response[0].entities[i].content 
                  //console.log(that.showdata);
                  let index = 1
                  for (let j = 0; j < i; j++) {
                  if(content==response[0].entities[j].content)
                    index=0
                  }
                  var color =''
                  if(index==1){
                    addlist.push(response[0].entities[i])
                    for (let k = 0; k < this.options.length; k++) {
                      for (let l = 0; l < this.options[k].children.length; l++) {
                        if(this.options[k].children[l].id===response[0].entities[i].entity_template){
                          color = this.options[k].children[l].color
                        }
                      }
                    }
                    // var str = this.showdata.split(content);
                    // var str_new = "";
                    // for (let index = 0; index < str.length-1; index++) {
                    //   str_new += str[index]+'<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>';
                    // }
                    addcontent.push('<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>') 

                    // str_new += str[str.length-1]
                    // this.showdata = str_new;   
                  }         
                }
                var str_new = "";
                for (let i = 0; i < addcontent.length; i++) {
                  var start = 0
                  if (i>0) {
                    start = list[i].start_offset
                  }   
                  if (i<addcontent.length-1){
                    str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1,addlist[i+1].start_offset-1)
                  } else {
                    str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1)
                    this.showdata = str_new
                  }
                }                
              }
            })
        } else if(this.template_type == 'RE'){
          this.entityinput =[]
          this.labeledre = []
          const data = {
            docid:this.tableData[this.docid].id,
            userid:2
          }
          this.$store.dispatch('user/getuserlabel', data)
            .then((response) => {
              console.log('updatedoc',response)
              const list = response.entities
              this.entityinput = list
              var addcontent = []
              var addlist = []
              for (let i = 0; i < list.length; i++) {
                var content = list[i].content 
                console.log('enterlist',list[i]);
                let index = 1
                for (let j = 0; j < i; j++) {
                if(content==list[j].content)
                  index=0
                }
                var color =''
                if(index==1){
                  addlist.push(list[i])
                  for (let k = 0; k < this.options.length; k++) {
                    for (let l = 0; l < this.options[k].children.length; l++) {
                      if(this.options[k].children[l].id===list[i].entity_template){
                        color = this.options[k].children[l].color
                      }
                    }
                  }
                  // var str = this.showdata.split(content);
                  // var str_new = "";
                  // for (let index = 0; index < str.length-1; index++) {
                  //   str_new += str[index]+'<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>';
                  // }
                  addcontent.push('<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>') 
                  // str_new += str[str.length-1]
                  // this.showdata = str_new;   
                }         
              }
              var str_new = "";
              for (let i = 0; i < addcontent.length; i++) {
                var start = 0
                if (i>0) {
                  start = list[i].start_offset
                }
                if (i<addcontent.length-1){
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1,addlist[i+1].start_offset-1)
                } else {
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1)
                  this.showdata = str_new
                }
              }
              
              const relist = response.relations
              for (let k = 0; k < relist.length; k++) {
                for (let i = 0; i < this.entityinput.length; i++) {
                  if (relist[k].start_entity === this.entityinput[i].id) {
                    relist[k].start_name = this.entityinput[i].content
                  }
                  if (relist[k].end_entity === this.entityinput[i].id) {
                    relist[k].end_name = this.entityinput[i].content
                  }
                }
              }
              this.labeledre = relist
              console.log('labeledre',this.labeledre,this.entityinput);
            })
        }
      },
      selectchange(update){
        console.log(123);
        console.log('option', this.options)
        console.log('select', this.selectvalue)
        var content = this.selecttext
        console.log('content', content);
        //console.log(that.showdata);
        // for (let i = this.selectstart; i < this.selectend; i++) {
        console.log('showdata',this.showdata.split(this.selectpara));
        var para = this.tableData[this.docid].content.split(this.selectpara)
        var addpara = this.selectpara.slice(0,this.selectstart)+'<div class="labelstyle" style="background:' +this.selectvalue[1].color+'">'+content+'<div class="deletelabel">x</div></div>'+this.selectpara.slice(this.selectend)
        console.log('add',addpara);

        // }
        var str = this.showdata.split(this.selectpara);
        var str_new = "";
        // for (let index = 0; index < str.length-1; index++) {
        //   str_new += str[index]+'<div class="labelstyle" style="background:' +this.selectvalue[1].color+'">'+content+'<div class="deletelabel">x</div></div>';
        // }
        str_new = str[0] + addpara + str[1]
        this.showdata = str_new;
        console.log('show',this.showdata);
        console.log('doc',this.tableData[this.docid]);
        var docdata = this.tableData[this.docid].content
        // console.log('position',docdata.indexOf(content));
        // console.log('position1',content.length);
        console.log('sl',para[0].length+this.selectstart);
        
        const start_offset = para[0].length+this.selectstart
        const end_offset = start_offset + content.length - 1
        
        const data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            start_offset:start_offset,
            end_offset:end_offset,
            content:content,
            entity_template:this.selectvalue[1].id,
            user:2,
            role:2
          }
        }
        this.$store.dispatch('user/labelentity', data)
          .then((response) => {
            console.log(response);
            data.list.id = response.id
            this.entityinput.push(data.list)
          })
        console.log('input',this.entityinput);

        //  const data1 = {
        //   id:this.tableData[this.docid].id,
        //   list:{
        //     doc:this.tableData[this.docid].id,
        //     start_offset:start_offset,
        //     end_offset:end_offset,
        //     content:content,
        //     entity_template:this.selectvalue[1].id,
        //     user:3,
        //     role:2
        //   }
        // }
        // this.$store.dispatch('user/labelentity', data1)
        //   .then((response) => {
        //     console.log(response);
        //     data1.list.id = response.id
        //     this.entityinput1.push(data1.list)
        //   })
        // console.log('input',this.entityinput);
      },
      eventselectchange(){
        console.log('select', this.selectvalue)
        var content = this.selecttext
        console.log('content', content);
        // console.log(that.showdata);
        var str = this.showdata.split(content);
        var str_new = "";
        for (let index = 0; index < str.length-1; index++) {
          str_new += str[index]+'<div class="labelstyle" style="background:' +this.selectvalue[1].color+'">'+content+'<div class="deletelabel">x</div></div>';
        }
        str_new += str[str.length-1]
        this.showdata = str_new;
        console.log('show',this.showdata);
        console.log('doc',this.tableData[this.docid]);
        var docdata = this.tableData[this.docid].content
        // console.log('position',docdata.indexOf(content));
        // console.log('position1',content.length);
        const start_offset = docdata.indexOf(content)
        const end_offset = start_offset + content.length - 1
        console.log('offset',start_offset,end_offset);
        const data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            start_offset:start_offset,
            end_offset:end_offset,
            content:content,
            entity_template:this.selectvalue[1].id,
            event_group_annotation:this.labeledevent.eventid,
            user:2,
            role:2
          }
        }
        this.$store.dispatch('user/labelentity', data)
          .then((response) => {
            console.log(response);
            data.list.id = response.id
            this.entityinput.push(data.list)
          })
        console.log('input',this.entityinput);
      },
      reselectchange(){
        var startentitys = []
        var endentitys = []
        for (let i = 0; i < this.entityinput.length; i++) {
          console.log('mmm',this.revalue1,this.entityinput);
          if (this.revalue1.startid === this.entityinput[i].entity_template){
            var data = {
              label:this.entityinput[i].content,
              value:{
                startid:this.entityinput[i].id,
                relation:this.revalue1.reid,
              }
            }
            startentitys.push(data)
          }
          if (this.revalue1.endid === this.entityinput[i].entity_template){
            var data = {
              label:this.entityinput[i].content,
              value:{
                endid:this.entityinput[i].id,
                relation:this.revalue1.reid,
              }
            }
            endentitys.push(data)
          }
        }
        this.startentitys = startentitys
        this.endentitys = endentitys
        console.log('reselectchange',this.endentitys,this.startentitys);
      },
      addre(){
        console.log(this.selectstartentity,this.selectendentity);
        let data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            user:2,
            role:2,
            relation_entity_template:this.selectstartentity.relation,
            start_entity:this.selectstartentity.startid,
            end_entity:this.selectendentity.endid
          }
        }
        this.$store.dispatch('user/labelrelation', data)
            .then((response) => {
              console.log('113',response);
              var list = response
              list.id = response.id
              // for (let i = 0; i < this.options.length; i++) {
              //   for (let j = 0; j < this.options[i].children.length; j++) {
              //     if (list.start_entity === this.options[i].children[j].id) {
              //       list.start_name = this.options[i].children.name
              //     }
              //     if (list.end_entity === this.options[i].children[j].id) {
              //       list.end_name = this.options[i].children.name
              //     }
              //   }
              // }
              for (let i = 0; i < this.entityinput.length; i++) {
                if (list.start_entity === this.entityinput[i].id) {
                  list.start_name = this.entityinput[i].content
                }
                if (list.end_entity === this.entityinput[i].id) {
                 list.end_name = this.entityinput[i].content
                }
              }
              this.labeledre.push(list)
              console.log('112',this.labeledre);
        })
      },
      deletere(id){
        // console.log(id,this.labeledre);
        
        const data = {
          docid:this.tableData[this.docid].id,
          reid:id
        }
        this.$store.dispatch('user/deletere', data)
          .then((response) => {
            for (let i = 0; i < this.labeledre.length; i++) {
              if(this.labeledre[i].id===id){
                this.labeledre.splice(i,1)
              }
              console.log('111',this.labeledre);
            }
          })
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
      },
      submit(){
          const data = {
            id:this.tableData[this.docid].id,
            list:{
              user:2,
              role:2
            }
          }
          this.$store.dispatch('user/labelconfirm', data)
            .then((response) => {
              this.$message({ message: '已提交！', type: 'success' });
            })
          //   const data1 = {
          //   id:this.tableData[this.docid].id,
          //   list:{
          //     user:3,
          //     role:2
          //   }
          // }
          // this.$store.dispatch('user/labelconfirm', data1)
          //   .then((response) => {
          //     // this.$message({ message: '已提交！', type: 'success' });
          //   })
      }
    },
    data() {
      return {
        showreselect:'',
        docid:0,
        epochid:0, 
        state:'',
        template:0,
        template_type:'',
        projectid:0,
        selecttext:"",
        selectstart:'',
        selectend:'',
        selectpara:'',
        labelshow:1,
        selectvalue:"",
        labeledclass:'',
        labeledevent:'',
        revalue1:'',
        startentitys:[],
        endentitys:[],
        selectstartentity:{},
        selectendentity:{},
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
        reoptions:{

        },
        labeledre:[],
        eventoptions:[],
        entityinput:[], 
        entityinput1:[],
        tableData: [
            {
                content: '金陵尚府小区门口,报警人家人（杨某某，32岁，智商有点问题，六合人）昨天晚上在上述地址被民警带走，需要联系。（接警台电话：28020）', id: 3, key:0
            },
            {
                content: '像是有人拿着刀，找准了我们最弱最不设防的部分温柔地刺进去，然后拉出来，血 肉模糊，然后再刺进去，一直到最后痛苦变得麻木，现在变得模糊，未来变得没有人可以知道结局。', id: 5, key:1
            },
            {
                content: '一直到最后痛苦变得麻木，现在变得模糊，未来变得没有人可以知道结局', id: 6, key:2
            },
        ],
        showdata_pre:'<div class="labelcontent">',
        showdata_back:'</div>',
        showdata: '金陵尚府小区门口,报警人家人（杨某某，32岁，智商有点问题，六合人）昨天晚上在上述地址被民警带走，需要联系。（接警台电话：28020）',
        
        activeName: '4',
        activeName1: '4',
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
  padding:3px;
}
.deletelabel{
  margin-left: 2px;
  margin-right:2px;
  cursor: pointer;
}
.deleteclass{
  margin-left: 2px;
  margin-right:2px;
  cursor: pointer;
}
div.block .el-input{
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
  width: 100%;
}
</style>