<template>
  <el-container class="labelcontainer" style="height: auto">
    <el-container style="min-width:300px">
      <el-aside
        style="position: relative;top: 5px;background-color: white;font-size:15px;min-width:340px;min-height: 300px;max-height:400px"
      >
        <div class="aside-container">
          <div class="aside-title">
            标注数据列表
          </div>
          <el-card
            v-for="(data,index) in tableData"
            :key="data.id"
            class="box-card asidelist"
            :body-style="docid===data.key?'background-color:#eeeeee':'background-color:#ffffff'"
            @click.native="aside_click(data.key)"
          >
            {{ index+1 }} : {{ data.content }}
          </el-card>
        </div>
      </el-aside>
      <br>
      <el-card class="standardcard">
        <div slot="header" class="clearfix" style="">
          <span>已标注的标准</span>
        </div>
        <div v-for="st in labeledstandardfilter" :key="st.content" class="standardcontainer">
          '{{ st.content }}' - {{ st.standard_name }}
        </div>
      </el-card>
    </el-container>
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
            v-model="tabactiveName"
            type="border-card"
            style="min-height:250px"
            @tab-click="tabclick(tabactiveName)"
          >
            <el-tab-pane
              v-if="template_type=='NER'||template_type=='RE'||template_type=='EVENT'"
              label="实体统计"
              name="实体统计"
            >
              <div
                v-for="(item) in options"
                :key="item.id"
              >
                {{ item.label }}:
                <div
                  :title="item.label"
                  :name="item.label"
                >
                  <div
                    v-for="entity in item.children"
                    :key="entity.id"
                    style="display:inline-block;padding-top:10px"
                  >
                    <el-badge :value="badgefilter(entity.id)" class="item">
                      <div
                        class="labelstyle labelstyle1"
                        :style="{background:entity.color,color:isLight(entity.color),'font-size':'12px',display:'inline-block',margin:'5px','padding-left':'10px','padding-right':'10px','margin-left':'15px',}"
                      >
                        {{ entity.name }}
                      </div>
                    </el-badge>
                    <!-- <el-color-picker v-model="entity.color" disabled /> -->
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='RE'"
              label="关系标注"
              name="关系标注"
            >
              <el-collapse
                v-for="(item) in reoptions"
                :key="item.name"
                v-model="activeName1"
                accordion
                @change="recolchange"
              >
                <el-collapse-item
                  :title="item.name"
                  :name="item.name"
                >
                  <el-select
                    v-model="revalue1"
                    style="width:25%"
                    placeholder="请选择关系对"
                    value-key="id"
                    @change="reselectchange"
                  >
                    <el-option
                      v-for="re in item.children"
                      :key="re.id"
                      :label="re.start_name+'-'+re.end_name"
                      :value="re"
                    />
                  </el-select>
                  <el-select
                    v-model="selectstartentity"
                    style="width:25%"
                    placeholder="请选择前实体"
                    value-key="label"
                  >
                    <el-option
                      v-for="entity1 in startentitys"
                      :key="entity1.label"
                      :label="entity1.label"
                      :value="entity1"
                    />
                  </el-select>
                  <el-select
                    v-model="selectendentity"
                    style="width:25%"
                    value-key="label"
                    placeholder="请选择后实体"
                  >
                    <el-option
                      v-for="entity2 in endentitys"
                      :key="entity2.label"
                      :label="entity2.label"
                      :value="entity2"
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
              name="文本分类"
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
                  class="labelstyle labelstyle1"
                  :style="{background:cls.color,'font-size':'20px',display:'inline-block',margin:'10px'}"
                >
                  {{ cls.name }}
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='NER'||template_type=='RE'||template_type=='EVENT'"
              label="标记标准"
              name="标记标准"
            >
              <el-collapse
                v-for="item in options"
                :key="item.id"
                v-model="activeName"
                accordion
                @change="showlabeledstandard(item.label)"
              >
                <el-collapse-item
                  :title="item.label"
                  :name="item.label"
                >
                  <el-select
                    v-model="standardentity"
                    value-key="id"
                    style="width:30%"
                    placeholder="请选择已标注实体"
                    @change="standardchange(standardentity,item.children)"
                  >
                    <el-option
                      v-for="entity in filterentitys"

                      :key="entity.id"
                      :label="entity.content"
                      :value="{id:entity.id,entityid:entity.entity_template}"
                    />
                  </el-select>
                  <el-select
                    v-model="standardid"
                    style="width:30%"
                    placeholder="请选择标记的标准"
                  >
                    <el-option
                      v-for="standard in standards"
                      :key="standard.id"
                      :label="standard.standard_name"
                      :value="standard.id"
                    />
                  </el-select>
                  <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    circle
                    @click="addstandard()"
                  />
                  <el-button @click="addstandardoption(item.children)">管理标准名称</el-button>
                  <!-- <div>
                    已标记的标准：
                  </div>
                  <div v-for="st in labeledstandardfilter" :key="st.content">
                    {{ st.content }} - {{ st.standard_name }}
                  </div> -->
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='NER'||template_type=='RE'||template_type=='EVENT'"
              label="字典匹配"
              name="字典匹配"
            >
              选择字典：
              <el-select
                v-model="selecteddicid"
                style="width:50%"
                placeholder="选择实体字典"
                @change="dicchange(selecteddicid)"
              >
                <el-option
                  v-for="dic in dicoptionfilter"
                  :key="dic.id"
                  :label="dic.group_name+'-'+dic.name"
                  :value="dic.id"
                />
              </el-select>
              <el-button @click="showadddic=true">字典管理</el-button>
              <el-button @click="confirmdicuse=true">应用此字典</el-button>
            </el-tab-pane>
            <el-tab-pane
              v-if="template_type=='NER'||template_type=='RE'||template_type=='EVENT'"
              label="正则匹配"
              name="正则匹配"
            >
              选择正则表达式：
              <el-select
                v-model="selectedregularid"
                style="width:50%"
                placeholder="选择正则表达式"
                @change="regularchange(selectedregularid)"
              >
                <el-option
                  v-for="regular in regularoptionfilter"
                  :key="regular.re.id"
                  :label="regular.re.content"
                  :value="regular.re.id"
                />
              </el-select>
              <el-button @click="showaddregular=true">管理正则表达式</el-button>
              <el-button @click="confirmregularuse=true">应用此正则匹配</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-dialog
          title="管理标准名称"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <template>
            <el-radio v-model="standardguanli" label="1">添加</el-radio>
            <el-radio v-model="standardguanli" label="2">删除</el-radio>
          </template>
          <div v-if="standardguanli=='2'">
            <el-select
              v-model="deletestandardid"
              placeholder="请选择删除的标准"
            >
              <el-option
                v-for="standard in deletestlist"
                :key="standard.id"
                :label="standard.label+'-'+standard.standard_name"
                :value="standard.id"
              />
            </el-select>
          </div>
          <div v-if="standardguanli=='1'">
            <el-select
              v-model="dialogentity"
              placeholder="请选择添加标准的实体"
            >
              <el-option
                v-for="entity in dialogoption"
                :key="entity.id"
                :label="entity.label"
                :value="entity.id"
              />
            </el-select>
            <el-input
              v-model="dialoginput"
              placeholder="请输入标准"
              clearable
            />
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button v-if="standardguanli=='1'" type="primary" @click="dialogadd">确 定</el-button>
            <el-button v-if="standardguanli=='2'" type="primary" @click="dialogdelete">删 除</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="字典管理"
          :visible.sync="showadddic"
          width="30%"
          :before-close="handleClose"
        >
          <template>
            <el-radio v-model="dicguanli" label="1">添加</el-radio>
            <el-radio v-model="dicguanli" label="2">删除</el-radio>
          </template>
          <div v-if="dicguanli=='2'">
            <el-select
              v-model="deletedicid"
              placeholder="选择实体字典"
            >
              <el-option
                v-for="dic in dicoptionfilter"
                :key="dic.id"
                :label="dic.group_name+'-'+dic.name"
                :value="dic.id"
              />
            </el-select>
          </div>
          <div v-if="dicguanli=='1'">
            <el-input
              v-model="dicinputname"
              placeholder="请输入字典名称"
              clearable
            />
            <el-select
              v-model="dicinputentity"
              placeholder="请选择实体模板"
            >
              <el-option
                v-for="entity in dicinputfilter"
                :key="entity.id"
                :label="entity.groupname+'-'+entity.label"
                :value="entity.id"
              />
            </el-select>
            <el-select
              v-model="dicinputstname"
              placeholder="请选择标准名称(可选)"
              clearable
            >
              <el-option
                v-for="standard in dicinputstnamefilter"
                :key="standard.id"
                :label="standard.standard_name"
                :value="standard.id"
              />
            </el-select>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="showadddic = false">取 消</el-button>
            <el-button v-if="dicguanli=='1'" type="primav-ifry" @click="dicadd">确 定</el-button>
            <el-button v-if="dicguanli=='2'" type="primav-ifry" @click="dicdelete">删 除</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="是否确认删除此事件"
          width="30%"
          :visible.sync="deleteevent1"
        >
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteevent1 = false">取 消</el-button>
            <el-button type="primary" @click="deleteevent">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="是否确认应用"
          :visible.sync="confirmdicuse"
          width="30%"
          :before-close="handleClose"
        >
          <div>
            以下为匹配中重复标注的内容，提交时不会提交重复标注内容，是否确认提交：
          </div>
          <div v-for="(label,index) in chongfudic" :key="index">
            {{ label.content }} 位置：{{ label.start_offset }}-{{ label.end_offset }}
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="confirmdicuse = false">取 消</el-button>
            <el-button type="primary" @click="dicuse">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="是否确认应用"
          :visible.sync="confirmregularuse"
          width="30%"
          :before-close="handleClose"
        >
          <div>
            以下为匹配中重复标注的内容，提交时不会提交重复标注内容，是否确认提交：
          </div>
          <div v-for="(label,index) in chongfuregular" :key="index">
            {{ label.content }} 位置：{{ label.start_offset }}-{{ label.end_offset }}
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="confirmregularuse = false">取 消</el-button>
            <el-button type="primary" @click="regularuse">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="管理正则表达式"
          :visible.sync="showaddregular"
          width="30%"
          :before-close="handleClose"
        >
          <template>
            <el-radio v-model="regularguanli" label="1">添加</el-radio>
            <el-radio v-model="regularguanli" label="2">删除</el-radio>
          </template>
          <div v-if="regularguanli=='2'">
            <el-select
              v-model="deleteregularid"
              placeholder="选择正则表达式"
            >
              <el-option
                v-for="regular in regularoptionfilter"
                :key="regular.re.id"
                :label="regular.re.content"
                :value="regular.re.id"
              />
            </el-select>
          </div>
          <div v-if="regularguanli=='1'">
            <el-input
              v-model="regularinputname"
              placeholder="请输入正则表达式"
              style="margin-bottom:10px"
              clearable
            />

            <el-form
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                v-for="(regular,index) in regulartem"
                :key="index"
                label="选择对应实体"
                prop="regulartem"
              >
                <div>
                  <el-select v-model="regular.id">
                    <el-option
                      v-for="(item,index1) in dicinputfilter"
                      :key="index1"
                      :label="item.groupname+'-'+item.name"
                      :value="item.id"
                    />
                  </el-select>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    circle
                    @click.prevent="removeregulartem(index)"
                  />
                </div>
              </el-form-item>
              <el-button
                circle
                size="mini"
                type="primary"
                @click="newregulartem()"
              >
                <i class="el-icon-plus" />
              </el-button>
            </el-form>
          </div>

          <!-- <el-select
            v-model="regularinputentity"
            placeholder="请选择正则对应的实体"
          >
            <el-option
              v-for="entity in regularinputfilter"
              :key="entity.id"
              :label="entity.label"
              :value="entity.name"
            />
          </el-select> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="showaddregular = false">取 消</el-button>
            <el-button v-if="regularguanli=='1'" type="primary" @click="regularmatch">直接匹配</el-button>
            <el-button v-if="regularguanli=='1'" type="primary" @click="regularadd">保存</el-button>
            <el-button v-if="regularguanli=='2'" type="primary" @click="regulardelete">删除</el-button>
          </span>
        </el-dialog>
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
                class="labelstyle labelstyle1"
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
            选择事件组：
            <el-select
              v-model="labeledevent"
              placeholder="选择事件组"
              value-key="name"
              @change="eventchange"
            >
              <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.name"
                :value="{name:item.name,id:item.id}"
              />
            </el-select>
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              circle
              @click="addlabeledevent()"
            />
            <div style="margin:10px">
              已创建的事件组：
              <el-select
                v-model="labeledevent1"
                placeholder="选择已创建的事件组"
                value-key="name"
                @change="labeledeventchange"
              >
                <el-option
                  v-for="item in labeledeventoptions"
                  :key="item.name"
                  :label="item.name"
                  :value="{name:item.name,id:item.id}"
                />
              </el-select>
              <el-button type="danger" icon="el-icon-delete" circle @click="(labeledevent1 != '{}'&&labeledevent1.name!='')?deleteevent1=true:deleteevent1=false" />
            </div>
            <!-- <div v-if="labeledevent!=''">
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
            </div> -->
          </div>
          <div
            class="labelcontent1"
            v-html="showdata_pre + changebr(showdata)+showdata_back"
          />
          <div
            v-if="template_type=='NER'||template_type=='RE'"
            class="block"
          >
            <el-cascader
              v-model="selectvalue"
              expand-trigger="hover"
              :options="options"
              size="medium"
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
          <el-tooltip v-model="tipsshow" manual="true" class="hovertips" effect="dark" placement="top-start">
            <div slot="content">{{ showtipscontent1() }}<br>{{ showtipscontent2() }}</div>
            <el-button class="hoveritem">隐藏</el-button>
          </el-tooltip>
        </el-card>
        <!-- <el-dialog
              title="新增标准"
              :visible.sync="addstandardshow"
              width="40%"
              append-to-body
              :before-close="handleClose"
            >
              <el-form
                ref="form"
                :model="form=form2.entityGroups[editIndex].entitys[editEntityIndex]"
                label-width="150px"
              > -->
        <!-- 每次点击打开编辑实体对话框需要更新参数editEntityIndex -->
        <!-- <el-select
                    v-model="standardentity"
                    style="width:30%"
                    placeholder="选择实体"
                    @change="standardchange(standardentity,item.children)"
                  >
                    <el-option
                      v-for="entity in entityinput"
                      :key="entity.id"
                      :label="entity.content"
                      :value="{id:entity.id,entityid:entity.entity_template}"
                    />
                  </el-select> -->
        <!-- <el-form-item label="实体英文名">
                  <el-input v-model="form.entityMatchName" />
                </el-form-item> -->
        <!-- <el-form-item label="实体颜色">
                  <el-color-picker v-model="form.color" />
                </el-form-item> -->
        <!-- <el-input placeholder="请输入新增标准"></el-input>
              </el-form>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button @click="closeEdit()">关闭</el-button>
              </span>
            </el-dialog> -->
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
    computed:{
      labeledstandardfilter(){
        var filterArr =[]
        // setTimeout(() => {    
          console.log('stf',this.entityinput,this.options,this.itemlabel,this.template_type);
          
          if(this.template_type==='EVENT'){
            for (let i = 0; i < this.options.length; i++) {
              if (this.options[i].label===this.itemlabel) {
                for (let j = 0; j < this.entityinput.length; j++) {
                  if(this.entityinput[j].standard != null){
                    for (let k = 0; k < this.options[i].children.length; k++) {
                      if((this.options[i].children[k].id===this.entityinput[j].entity_template)&&this.options[i].children[k].standard){
                        for (let l = 0; l < this.options[i].children[k].standard.length; l++) {
                          if (this.options[i].children[k].standard[l].id===this.entityinput[j].standard) {
                            filterArr.push({
                              standard_name:this.options[i].children[k].standard[l].standard_name,
                              content:this.entityinput[j].content
                            })
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }else{
            for (let i = 0; i < this.options.length; i++) {
              // if (this.options[i].label===this.itemlabel) {
                for (let j = 0; j < this.entityinput.length; j++) {
                  if(this.entityinput[j].standard != null&&this.options[i].children){
                    for (let k = 0; k < this.options[i].children.length; k++) {
                      if((this.options[i].children[k].id===this.entityinput[j].entity_template)&&this.options[i].children[k].standard){
                        for (let l = 0; l < this.options[i].children[k].standard.length; l++) {
                          if (this.options[i].children[k].standard[l].id===this.entityinput[j].standard) {
                            filterArr.push({
                              standard_name:this.options[i].children[k].standard[l].standard_name,
                              content:this.entityinput[j].content
                            })
                          }
                        }
                      }
                    }
                  }
                }
              // }
            }
          }
          console.log('lastshow',filterArr);
          
          return filterArr
        // }, 500);
        
        
      },
			filterentitys(){
        var filterArr =[]
        if(this.template_type!='EVENT'){
          for (let i = 0; i < this.entityinput.length; i++) {
            if (this.itemlabel!='') {
              if(this.entityinput[i].entity_group_template_name===this.itemlabel){
                filterArr.push(this.entityinput[i])
              }
            }
          }
        }
        else{
           for (let i = 0; i < this.entityinput.length; i++) {
            if (this.itemlabel!='') {
              if(this.entityinput[i].event_group_tempalte_name===this.itemlabel){
                filterArr.push(this.entityinput[i])
              }
            }
          }
        }
        console.log('filter',this.itemlabel,filterArr,this.entityinput);
        
				return filterArr;
      },
      dicinputfilter(){
        var filterArr =[]
          if(this.template_type!='EVENT'){
            for (let i = 0; i < this.options.length; i++) {
                  for (let j = 0; j < this.options[i].children.length; j++) {
                    this.options[i].children[j].groupname = this.options[i].label
                      filterArr.push(this.options[i].children[j])
                  }
              }
          }
          else{
            console.log('awdawd',this.labeledevent1);
            if (JSON.stringify(this.labeledevent1) != "{}"&&this.labeledevent1.name!="") {
              var eventname = this.labeledevent1.name.split(this.labeledevent1.id)
              for (let i = 0; i < this.options.length; i++) {
                  for (let j = 0; j < this.options[i].children.length; j++) {
                    this.options[i].children[j].groupname = this.options[i].label
                    if (this.options[i].label===eventname[0]) {
                      filterArr.push(this.options[i].children[j])
                    }
                  }
              }
            }
          }
          console.log('addregular',filterArr);
        return filterArr
      },
      dicoptionfilter(){
        var filterArr = []
        if(this.template_type!='EVENT'){
          filterArr = this.dicoption
        }else{
          console.log('dicoptionfilter',this.labeledevent1);

          if (JSON.stringify(this.labeledevent1) != "{}") {
            console.log('dicoptionfilter',this.labeledevent1);
            
            var eventname = this.labeledevent1.name.split(this.labeledevent1.id)
            for (let i = 0; i < this.dicoption.length; i++) {
              if(this.dicoption[i].group_name===eventname[0]){
                filterArr.push(this.dicoption[i])
              }
            }
          }
        }
        return filterArr
      },
      regularoptionfilter(){
         var filterArr = []
        if(this.template_type!='EVENT'){
          filterArr = this.regularoption
        }else{
          if (JSON.stringify(this.labeledevent1) != "{}") {
            var eventname = this.labeledevent1.name.split(this.labeledevent1.id)
            console.log('adadad',this.regularoption);
            // filterArr = this.regularoption
            for (let i = 0; i < this.regularoption.length; i++) {
              for (let j = 0; j < this.regularoption[i].entity_template_list.length; j++) {
                if(this.regularoption[i].entity_template_list[j].group_name===eventname[0]){
                  filterArr.push(this.regularoption[i])
                  break
                }
              }
            }
          }
        }
        return filterArr
      },
      dicinputstnamefilter(){
        var filterArr = []
        console.log('字典选择标准',this.options,this.dicinputentity);
        if (this.options.length>0) {
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].children) {          
              for (let j = 0; j < this.options[i].children.length; j++) {
                if(this.options[i].children[j].id===this.dicinputentity){
                  filterArr = this.options[i].children[j].standard
                }
              }
            }
          }
        }
        return filterArr
      },
		},
    created(){
      
    },
    mounted() { //标注实现
      this.template = this.$route.query.template
      this.state = this.$route.query.state
      this.epochid = this.$route.query.epochid
      this.template_type = this.$route.query.template_type
      this.projectid = this.$route.query.projectid
      this.userid = this.$store.getters.userid
      console.log('projectid',this.projectid);
      
      // console.log('getters', this.$store.state);
      // console.log(JSON.stringify(this.$store.state.tagsView));
      
      // let obj = new Object();
      
      
      
      console.log('template', this.template_type);
      
      this.getDoc()
      if (this.template_type == 'CLASSIFICATION') {
         setTimeout(() => {
            this.getclass()
          }, 200);
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
      var mouseX1=0;
      var mouseY1=0;
      
      this.$nextTick(function () { //检测鼠标事件
        
        // console.log('text',$('div.labelstyle').text());
         
        $('div.labelcontent1').mousemove(function(e) { //鼠标位置
            e = e || window.event;
            mouseX = e.pageX || e.clientX + document.body.scroolLeft;
            mouseY = e.pageY || e.clientY + document.body.scrollTop;
            if ($("div.labelcontent1").offset().left) {
              mouseX1 = e.pageX - $("div.labelcontent1").offset().left;
              mouseY1 = e.pageY - $("div.labelcontent1").offset().top;
            }
            $(".hoveritem").css({
            position:"absolute",
            top:mouseY-80,
            left:mouseX1,
          })
        });

        $('div.labelcontent1').on("mouseenter",".labelstyle",function(e){ 
          if (that.tabactiveName!='字典匹配'&&that.tabactiveName!='正则匹配') {
            setTimeout(() => {
              console.log('hover',mouseY-80,mouseX1);
              console.log($(this)[0]);
              
              console.log($(this)[0].attributes.name.value);
              
              // var content = $(this)[0].innerText;
              // content = content.split('\nx');
              that.tipscontent = $(this)[0].attributes.name.value
              that.tipsshow = true
            }, 200);
          }
          // console.log($(".hoveritem"));
          
          // $(".hoveritem").trigger('mouseover');
        })
        $('div.labelcontent1').on("mouseleave",".labelstyle",function(e){ 
          // $('.hoveritem').trigger('mouseout');
          setTimeout(() => {
            that.tipsshow = false
            $(".hoveritem").css({
              position:"absolute",
              top:mouseY-80,
              left:mouseX1,
            })
          }, 222);
        })
        $("div.labelcontent1").on('mouseup','.labelcontent',function () {
          console.log(mouseX,mouseY); 
          console.log('labelmouse',mouseX1,mouseY1);
          $("div.block").css({
            position:"absolute",
            top:mouseY-120,
            left:mouseX1,
          })
          console.log('topleft',mouseY-120,mouseX-560);
                    
         if(that.tabactiveName!='字典匹配'&&that.tabactiveName!='正则匹配'&&window.getSelection().toString()!=""&&!window.getSelection().toString().match(/^\s+$/)){
          // var para = that.tableData[that.docid].content.split(window.getSelection().anchorNode.wholeText)
          // const start_offset = para[0].length+window.getSelection().anchorOffset
          // const end_offset = start_offset + window.getSelection().toString().length
          // console.log(111,para,window.getSelection().toString(),start_offset,end_offset);
            console.log(window.getSelection().toString().match(/^\s+$/));
            console.log('papa',window.getSelection())
            
            // if(window.getSelection().anchorNode.data===window.getSelection().focusNode.data){
            var judgestart = 0
            // if(!(window.getSelection().anchorNode.nextSibling&&window.getSelection().anchorNode.nextSibling.className==='deletelabel'||window.getSelection().focusNode.nextSibling&&window.getSelection().focusNode.nextSibling.className==='deletelabel')){   
            if(window.getSelection().anchorNode.nodeName===window.getSelection().focusNode.nodeName){
              that.selecttext = window.getSelection().toString();
              console.log(window.getSelection().anchorOffset,window.getSelection().focusOffset,window.getSelection());
              if(window.getSelection().anchorNode.data===window.getSelection().focusNode.data){
                that.selectstart = window.getSelection().anchorOffset
                that.selectend = window.getSelection().focusOffset
                if(that.selectstart>that.selectend){
                  var temp = that.selectend
                  that.selectend = that.selectstart
                  that.selectstart = temp
                }
              }
              else{
                var anchor =  window.getSelection().anchorNode
                var pretext = ''
                var nexttext = ''
                if (anchor.nextSibling) {
                  anchor = anchor.nextSibling
                  while(anchor){
                    if (anchor.nodeName==='#text') {
                      nexttext = anchor.data
                      break
                    }
                    else{
                      anchor=anchor.nextSibling
                    }
                  }
                  if(nexttext===window.getSelection().focusNode.data){
                    judgestart = 1  //起始在前
                  }
                }
                anchor =  window.getSelection().anchorNode
                if (anchor.previousSibling) {
                  anchor = anchor.previousSibling
                  while(anchor){
                    if (anchor.nodeName==='#text') {
                      pretext = anchor.data
                      break
                    }
                    else{
                      anchor=anchor.previousSibling
                    }
                  }
                  if(pretext===window.getSelection().focusNode.data){
                    judgestart = 2   //起始在后
                  }
                }
                if(judgestart===1){
                  that.selectstart = window.getSelection().anchorOffset
                }
                else if(judgestart===2){
                  that.selectstart = window.getSelection().focusOffset
                }
                console.log('judgestart',that.selectstart,judgestart);
              }
              
              
              // that.selectpara = window.getSelection().anchorNode.wholeText
              that.selectpara = ''
              console.log('jssss',judgestart);
              
              if (judgestart===0||judgestart===1&&window.getSelection().anchorNode.previousSibling||judgestart===2&&window.getSelection().focusNode.previousSibling) {
                var windowselect = ''
                
                if (judgestart === 1) {
                  windowselect = window.getSelection().anchorNode.previousSibling
                } else if(judgestart === 2){
                  windowselect = window.getSelection().focusNode.previousSibling
                } else{
                  windowselect = window.getSelection().anchorNode.previousSibling
                }
                if (judgestart===0&&window.getSelection().anchorNode.nextSibling) {
                  if (window.getSelection().anchorNode.nextSibling.className==='deletelabel') {
                    windowselect = window.getSelection().anchorNode.parentNode.previousSibling
                  }
                }
                console.log('12212',windowselect);
                
                while(windowselect){
                  if(windowselect.nodeName==='DIV'){
                    that.selectpara+=windowselect.firstChild.data
                    var windowselect1 = windowselect.firstChild.nextSibling
                    while(windowselect1.className!='deletelabel'){
                      if(windowselect1.nodeName==='BR'){
                        that.selectpara+='\n'
                      }else if(windowselect1.nodeName==='#text'){
                        that.selectpara+=windowselect1.data
                      }
                      if (windowselect1.nextSibling) {
                        windowselect1 = windowselect1.nextSibling
                      }
                      else{
                        break
                      }
                    }
                  }else if(windowselect.nodeName==='#text'){
                    that.selectpara+=windowselect.data
                  }else if(windowselect.nodeName==='BR'){
                    that.selectpara+='\n'
                  }
                  if (windowselect.previousSibling) {
                    windowselect = windowselect.previousSibling
                  }
                  else{
                    break
                  }
                }
              }
              var para = that.selectpara
              // console.log('test1',that.tableData[that.docid].content);
              
              console.log('addaaa',that.selectpara);
              console.log(that.tableData[that.docid].content);
              
              // console.log('adad',para);
              // if (!para[0]) {
              //   para[0] = para[para.length-1]
              // }
              const start_offset = that.selectpara.length+that.selectstart
              const end_offset = start_offset + window.getSelection().toString().length
              console.log('aaa',start_offset,end_offset);
              
              if(that.ischongfulabel(start_offset,end_offset)){
                setTimeout(() => {
                  if(that.template_type === 'RE'||that.template_type === 'NER'||(that.template_type==='EVENT' && that.labeledevent1.name!='')){
                    $("div.block .el-input").trigger("click")
                  }
                }, 200);
              }
            }
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
        // $(document).click(function (e) {   
        //   console.log('target',$(e.target));
        // })
        $("div.labelcontent1").on('mouseup','.deletelabel',function () {
          // console.log('12331',$(this).parent());
          // console.log($(this).parent()[0].outerHTML);
          if(that.tabactiveName==='字典匹配')
          {
            console.log($(this).parent());
            
            var deletestr =that.escape2Html($(this).parent()[0].outerHTML);
            var content = $(this).parent()[0].innerText;
            content = content.split('\nx');
            console.log('content',content[0]);
            that.deletedicmatch($(this).parent()[0].attributes.name.value)
          }else if(that.tabactiveName==='正则匹配')
          {
            console.log($(this).parent());
            
            var deletestr =that.escape2Html($(this).parent()[0].outerHTML);
            var content = $(this).parent()[0].innerText;
            content = content.split('\nx');
            console.log('content',content[0]);
            that.deleteregmatch($(this).parent()[0].attributes.name.value)
          }
          else
          {
            that.tipsshow = false
            var deletestr =that.escape2Html($(this).parent()[0].outerHTML);
            var content = $(this).parent()[0].innerText;
            content = content.split('\nx');
            console.log('content',$(this).parent()[0].attributes.name.value);
            that.deleteentity($(this).parent()[0].attributes.name.value)
            console.log('afterdeleteinput',that.entityinput);
          }
        })
      })
    },
    methods: {
    // judgeoptions(){
    //   for (let i = 0; i < this.options.length; i++) {
    //     if (!this.options[i].children) {
    //       return false
    //     }
    //     for (let j = 0; j < this.options[i].children.length; j++) {
    //       if (!this.options[i].children[j].standard) {
    //         return false
    //       }
    //     }
    //   }
    //   return true
    // },
      showtipscontent1(){
        var standard = ''
        var id = ''
        var name = ''
        var stname = ''
        console.log(this.tipscontent,this.entityinput);
        
        for (let i = 0; i < this.entityinput.length; i++) {
          if(Number(this.tipscontent)===this.entityinput[i].start_offset){
            id = this.entityinput[i].entity_template
            standard = this.entityinput[i].standard
          }
        }
        // return '实体名称：'+id+'  标准名称：'+standard
        console.log(this.options);
        
        for (let i = 0; i < this.options.length; i++) {
          for (let j = 0; j < this.options[i].children.length; j++) {
            if (this.options[i].children[j].id===id) {
              name = this.options[i].children[j].name
              // console.log(id);
              
              if (standard) {
                for (let k = 0; k < this.options[i].children[j].standard.length; k++) {
                  if(this.options[i].children[j].standard[k].id===standard){
                    stname = this.options[i].children[j].standard[k].standard_name
                  }
                }
              }
              return name
            }
          }
        }
      },
      showtipscontent2(){
        var standard = ''
        var id = ''
        var name = ''
        var stname = ''
        console.log(this.tipscontent,this.entityinput);
        
        for (let i = 0; i < this.entityinput.length; i++) {
          if(Number(this.tipscontent)===this.entityinput[i].start_offset){
            id = this.entityinput[i].entity_template
            standard = this.entityinput[i].standard
          }
        }
        // return '实体名称：'+id+'  标准名称：'+standard
        console.log(this.options);
        
        for (let i = 0; i < this.options.length; i++) {
          for (let j = 0; j < this.options[i].children.length; j++) {
            if (this.options[i].children[j].id===id) {
              name = this.options[i].children[j].name
              // console.log(id);
              
              if (standard) {
                for (let k = 0; k < this.options[i].children[j].standard.length; k++) {
                  if(this.options[i].children[j].standard[k].id===standard){
                    stname = this.options[i].children[j].standard[k].standard_name
                  }
                }
              }
              return stname
            }
          }
        }
      },
      changebr(showdata){
          return showdata.replace(/\n/g,"<br/>");
      },
      ischongfulabel(start,end){       
        // console.log('aaaddddd',this.tableData[this.docid].content.length,start); 
        if (start>=this.tableData[this.docid].content.length) {
          return false
        }
        for (let i = 0; i < this.entityinput.length; i++) {
          if((start>=this.entityinput[i].start_offset&&start<=this.entityinput[i].end_offset)&&(end>=this.entityinput[i].start_offset&&end<=this.entityinput[i].end_offset)){
            return true
          }
          if(!(end<=this.entityinput[i].start_offset||start>=this.entityinput[i].end_offset))
          {
            return false
          }
        }
        return true
      },
      recolchange(){
        this.selectendentity=''
        this.selectstartentity=''
        this.revalue1 = ''
      },
      badgefilter(id){
        var num = 0
        for (let i = 0; i < this.entityinput.length; i++) {
          if(this.entityinput[i].entity_template===id){
            num++
          }
        }
        return num
      },
      escape2Html(str) {
        var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
      },
      test(){
        log(1);
      },
      getDoc(){
        this.$store.commit('user/SET_EPOCHID', this.epochid)
        this.$store.dispatch('user/getDoc',this.epochid).then((response) =>{
          console.log(response);
          const list = response
          for (let i = 0; i < list.length; i++) {
            list[i].key = i
          }
          // this.projectid = list[0].project
          this.getdic()
          this.getregular()
          // console.log(this.projectid)
          // this.$store.commit('project/SET_PROJECTID', this.projectid)
          this.tableData = list
          // for (let i = 0; i < this.tableData.length; i++) {
          //   this.tableData[i].content = this.tableData[i].content.replace(/\n/g,"<br/>");
          // }
          this.showdata = this.tableData[0].content
          console.log('n',this.tableData);
          
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
                  const getstandardid = {
                    projectid:this.projectid,
                    entityid:list[i].children[j].id
                  }
                  this.$store.dispatch('project/getstandard',getstandardid)
                  .then((response1) => {
                    // console.log('response1',response1);
                    
                    list[i].children[j].standard = response1
                    // list[i].children[j].standard = []
                    // for (let m = 0; m < response1.length; m++) {
                    //   if(response1[m].project === this.projectid){
                    //     list[i].children[j].standard.push(response1[m])
                    //     // console.log(12221);
                    //   }
                    // }
                    })
                  .catch(() => {
                    console.log('error')
                  })
                }
                if (i === list.length-1){
                  this.options = list
                  this.activeName2 = this.options[0].label
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
                  const getstandardid = {
                    projectid:this.projectid,
                    entityid:list[i].children[j].id
                  }
                   this.$store.dispatch('project/getstandard',getstandardid)
                  .then((response1) => {
                    // console.log('response1',response1);
                    
                    list[i].children[j].standard = response1
                    // list[i].children[j].standard = []
                    // for (let k = 0; k < response1.length; k++) {
                    //   if(response1[k].project === this.projectid){
                    //     list[i].children[j].standard.push(response1[k])
                    //   }
                    // }
                    })
                  .catch(() => {
                    console.log('error')
                  })
                }
                if (i === list.length-1){
                  this.options = list
                  this.activeName2 = this.options[0].label
                  console.log('last', list);
                  this.updatedoc()
                  
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
              user:this.userid,
              role:2,
              classification_template:this.labeledclass.id
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
          eventid:this.labeledevent1.id
        }
        console.log(data);
        if (JSON.stringify(this.labeledevent1) != "{}") {
          this.$store.dispatch('user/deleteevent',data).then((response) =>{
            // console.log('deleteevent',response)
            this.deleteevent1 = false
            for (let i = 0; i < this.labeledeventoptions.length; i++) {
              if(this.labeledeventoptions[i].id===this.labeledevent1.id){
                this.labeledeventoptions.splice(i,1)
                this.showdata=this.tableData[this.docid].content
              }
            }
            this.labeledevent1 = {
              name:'',
              id:''
            }
            
          })
        }
      },
      eventchange() {
        console.log('eventchange');
        console.log(this.labeledevent);
        
        //  this.eventoptions=[]
        // const data = {
        //   id:this.tableData[this.docid].id,
        //   list:{
        //     doc:this.tableData[this.docid].id,
        //     user:this.userid,
        //     role:2,
        //     event_group_template:this.labeledevent.id
        //   }
        // }
        // this.$store.dispatch('user/labelevent',data).then((response) =>{
        //   console.log('labelevent',response)
        //   this.labeledevent.eventid = response.id
        //   for (let i = 0; i < this.options.length; i++) {
        //     if (response.event_group_template === this.options[i].id){
        //       this.eventoptions.push(this.options[i])
        //     }
        //   }
        // })
      },
      addlabeledevent(){
        this.eventoptions=[]
        const data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            user:this.userid,
            role:2,
            event_group_template:this.labeledevent.id
          }
        }
        this.$store.dispatch('user/labelevent',data).then((response) =>{
          console.log('labelevent',response)
          this.labeledevent.eventid = response.id
          const result = response
          for (let i = 0; i < this.options.length; i++) {
            if (response.event_group_template === this.options[i].id){
              this.eventoptions.push(this.options[i])
              result.name = this.options[i].name + result.id
              result.entities=[]
              this.labeledeventoptions.push(result)
              this.labeledevent1 = {
                name:result.name,
                id:result.id
              }
              this.labeledeventchange()
              console.log(this.labeledevent1);
              
            }
          }

        })
      },
      labeledeventchange(){
        console.log(this.labeledevent1);
        var eventname = this.labeledevent1.name.split(this.labeledevent1.id)
        console.log('eventname',eventname);
        this.itemlabel = eventname[0]
        this.eventoptions=[]
        for (let i = 0; i < this.options.length; i++) {
          if (eventname[0]===this.options[i].name && this.eventoptions.length===0) {
            this.eventoptions.push(this.options[i])
          }
        }
        console.log('xxxda',this.eventoptions,'daad',this.labeledeventoptions);
        this.showdata=this.tableData[this.docid].content
        // this.updatedoc()

        for (let m = 0; m < this.labeledeventoptions.length; m++) {
          if(this.labeledeventoptions[m].id===this.labeledevent1.id){
            this.entityinput = this.labeledeventoptions[m].entities
            if(this.activeName!=''){
              console.log(123142143);
              this.showlabeledstandard(this.itemlabel) 
            }
            var addcontent = []
            var addlist = []
            for (let i = 0; i < this.labeledeventoptions[m].entities.length; i++) {
              var content = this.labeledeventoptions[m].entities[i].content 
              var end_offset = this.labeledeventoptions[m].entities[i].end_offset
              //console.log(that.showdata);
              let index = 1
              // for (let j = 0; j < i; j++) {
              // if(content==this.labeledeventoptions[m].entities[j].content)
              //   index=0
              // }
              var color =''
              if(index==1){
                addlist.push(this.labeledeventoptions[m].entities[i])
                for (let k = 0; k < this.options.length; k++) {
                  for (let l = 0; l < this.options[k].children.length; l++) {
                    if(this.options[k].children[l].id===this.labeledeventoptions[m].entities[i].entity_template){
                      color = this.options[k].children[l].color
                    }
                  }
                }
                // var str = this.showdata.split(content);
                // var str_new = "";
                // for (let index = 0; index < str.length-1; index++) {
                //   str_new += str[index]+'<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>';
                // }
                addcontent.push('<div class="labelstyle" name="' + this.labeledeventoptions[m].entities[i].start_offset + '" style="background:' +color+';color:' +this.isLight(color)+'">'+content+'<div class="deletelabel">x</div></div>') 

                // str_new += str[str.length-1]
                // this.showdata = str_new;   
              }         
            }
            var str_new = "";
            for (let i = 0; i < addcontent.length; i++) {
              var start = 0
              if (i>0) {
                start = addlist[i].start_offset
              }   
              if (i<addcontent.length-1){
                str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset,addlist[i+1].start_offset)
              } else {
                str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset)
                console.log('tabact',this.tabactiveName);
                
                if (this.tabactiveName!='字典匹配'&&this.tabactiveName!='正则匹配') {
                  this.showdata = str_new
                }
              }
            }
          }
        }
      },
      deleteentity(content) {
        var loop = this.entityinput.length
        this.selectstartentity = ''
        this.selectendentity = ''
       
        
        for (let i = 0; i < loop; i++) { //删去input内相应的项
         console.log('dddw',content,this.entityinput[i].content);
            if (Number(content) === this.entityinput[i].start_offset) {
              const data = {
                docid:this.tableData[this.docid].id,
                entityid:this.entityinput[i].id
              }
              this.entityinput.splice(i,1)
              i--
              loop--
              this.$store.dispatch('user/deleteentity', data)
                .then((response) => {
                  //  var str =  this.showdata.split(deletestr);
                  //   console.log('DELETE',deletestr,content,str);
                  //   var new_str = ""
                  //   for (let j = 0; j < str.length-1; j++) { // 将删除的词的样式去除后连接起来
                  //     new_str+=str[j]+content
                  //   }
                  //   new_str +=str[str.length-1];
                  //  console.log(deletestr,str,new_str)
                    // this.showdata = new_str;
                    this.showlabeledstandard(this.itemlabel)
                  // this.updatedoc()
                })
            }
          }
          if (this.template_type==='RE') {
            this.reselectchange()
          }
          this.showlabeledevent()
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
          this.labeledevent1={
            name:'',
            id:''
          }
          this.selectedregularid = ''
          this.selecteddicid=''
          this.selectendentity=''
          this.selectstartentity=''
          this.revalue1 = ''
          this.activeName=''
          this.docid++ 
          this.tabactiveName = '实体统计'
          this.updatedoc()
          this.showdata = this.tableData[this.docid].content
        }
        // this.showdata = this.tableData[this.docid].content
      },
      last_doc(){

        if(this.docid-1>=0)
        {
          this.labeledevent1={
            name:'',
            id:''
          }
          this.selectedregularid = ''
          this.selecteddicid=''
          this.selectendentity=''
          this.selectstartentity=''
          this.revalue1 = ''
          this.activeName=''
          this.docid-- 
          this.tabactiveName = '实体统计'
          this.updatedoc()
          this.showdata = this.tableData[this.docid].content
        }
        // this.showdata = this.tableData[this.docid].content
      },
      aside_click(id){
        console.log(id)
        this.labeledevent1={
            name:'',
            id:''
          }
        this.selectedregularid=''
        this.selecteddicid=''
        this.selectendentity=''
        this.selectstartentity=''
        this.revalue1 = ''
        this.docid = id
        this.showdata = this.tableData[id].content
        this.activeName = ''
        this.tabactiveName = '实体统计'
        this.updatedoc()
      },
      getlabeledeventoptions(){
        const data = {
            docid:this.tableData[this.docid].id,
            userid:this.userid
          }
          this.$store.dispatch('user/getuserlabel', data)
            .then((response) => {
              // console.log('getlabelevent', response,this.options)
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
                  for (let j = 0; j < response.length; j++) {
                    if (response[j].event_group_template === this.options[i].id){
                      response[j].name = this.options[i].name+response[j].id
                    }
                  }
                }
                this.labeledeventoptions = response
                console.log('labelaaaaa',this.labeledeventoptions,this.labeledevent1);
                if (this.labeledeventoptions.length!=0&&this.labeledevent1.name==="") {
                  this.labeledevent1 = {
                    id:this.labeledeventoptions[0].id,
                    name:this.labeledeventoptions[0].name
                  }
                }
                 for (let m = 0; m < this.labeledeventoptions.length; m++) {
                  if(this.labeledeventoptions[m].id===this.labeledevent1.id){
                    this.entityinput = this.labeledeventoptions[m].entities
                    // console.log('huodeinput',this.entityinput);
                    
                    // this.labeledeventchange()
                    this.showlabeledevent()
                  }
                }
                
                var eventname = this.labeledevent1.name.split(this.labeledevent1.id)
                if(this.itemlabel===''){
                  console.log('fafafa',this.itemlabel);
                  this.itemlabel = eventname[0]
                }
                for (let i = 0; i < this.options.length; i++) {
                  if (eventname[0]===this.options[i].name && this.eventoptions.length===0) {
                    this.eventoptions.push(this.options[i])
                  }
                }
                this.showlabeledstandard(eventname[0])
                // this.entityinput = this.labeledeventoptions.entities
                console.log('xxxxxxa',this.labeledeventoptions);
              }
            })
      },
      showlabeledevent(){
        this.showdata=this.tableData[this.docid].content
        // this.updatedoc()
        // for (let m = 0; m < this.labeledeventoptions.length; m++) {
          // if(this.labeledeventoptions[m].id===this.labeledevent1.id){
          //   this.entityinput = this.labeledeventoptions[m].entities
          //   if(this.activeName!=''){
          //     console.log(123142143);
          //     this.showlabeledstandard(this.itemlabel)
          //   }
            var addcontent = []
            var addlist = []
            for (let i = 0; i < this.entityinput.length; i++) {
              var content = this.entityinput[i].content 
              var end_offset = this.entityinput[i].end_offset
              //console.log(that.showdata);
              let index = 1
              // for (let j = 0; j < i; j++) {
              // if(content==this.labeledeventoptions[m].entities[j].content)
              //   index=0
              // }
              var color =''
              if(index==1){
                addlist.push(this.entityinput[i])
                for (let k = 0; k < this.options.length; k++) {
                  for (let l = 0; l < this.options[k].children.length; l++) {
                    if(this.options[k].children[l].id===this.entityinput[i].entity_template){
                      color = this.options[k].children[l].color
                    }
                  }
                }
                // var str = this.showdata.split(content);
                // var str_new = "";
                // for (let index = 0; index < str.length-1; index++) {
                //   str_new += str[index]+'<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>';
                // }
                addcontent.push('<div class="labelstyle" name="' + this.entityinput[i].start_offset + '" style="background:' +color+';color:' +this.isLight(color) + '">'+content+'<div class="deletelabel">x</div></div>') 

                // str_new += str[str.length-1]
                // this.showdata = str_new;   
              }         
            }
            var str_new = "";
            for (let i = 0; i < addcontent.length; i++) {
              var start = 0
              if (i>0) {
                start = addlist[i].start_offset
              }   
              if (i<addcontent.length-1){
                str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset,addlist[i+1].start_offset)
              } else {
                str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset)
                if (this.tabactiveName!='正则匹配'&&this.tabactiveName!='字典匹配') {
                  this.showdata = str_new
                }
              }
            }
            // }
        // }
      },
      colorchange(color){
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        if (reg.test(color)) {
          // 如果只有三位的值，需变成六位，如：#fff => #ffffff
          if (color.length === 4) {
            var colorNew = "#";
            for (var i = 1; i < 4; i += 1) {
              colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
          }
          // 处理六位的颜色值，转为RGB
          var colorChange = [];
          for (var i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
          }
          return "RGB(" + colorChange.join(",") + ")";
        } else {
          return color;
        }
      },
      isLight(color){
        var color1 = this.colorchange(color)
        var RgbValue = color1.replace("RGB(", "").replace(")", "");
        var rgb = RgbValue.split(",");
        if (0.213 * rgb[0] +0.715 * rgb[1] +0.072 * rgb[2] >255 / 2){
          return '#303133'
        }else{
          return '#ffffff'
        }
      },
      updatedoc(){
        if (this.template_type == 'NER') {
          this.showdata = this.showdata = this.tableData[this.docid].content
          this.entityinput =[]
          this.labeledstandard = []
          // this.activeName=''
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
            userid:this.userid
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
                var end_offset = list[i].end_offset
                //console.log(that.showdata);
                let index = 1
                // for (let j = 0; j < i; j++) {
                // if(content==list[j].content)
                //   index=0
                // }
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
                  addcontent.push('<div class="labelstyle" name="' + list[i].start_offset + '"  style="background:' +color+';color:' +this.isLight(color) +'">'+content+'<div class="deletelabel">x</div></div>') 
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
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset,addlist[i+1].start_offset)
                } else {
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset)
                  this.showdata = str_new
                }
              }
            })
        } else if(this.template_type == 'CLASSIFICATION'){
          const data = {
            docid:this.tableData[this.docid].id,
            userid:this.userid
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
                console.log('1121',this.labeledclass)
                
              }
            })
        } else if(this.template_type == 'EVENT'){
          this.showdata = this.showdata = this.tableData[this.docid].content
          this.eventoptions = []
          this.entityinput = []
          this.labeledeventoptions = []
          // this.labeledevent1 = {}
          // this.activeName = ''
          this.getlabeledeventoptions()
          
                // this.entityinput = response[0].entities
                // var addcontent = []
                // var addlist = []
                // for (let i = 0; i < response[0].entities.length; i++) {
                //   var content = response[0].entities[i].content 
                //   //console.log(that.showdata);
                //   let index = 1
                //   for (let j = 0; j < i; j++) {
                //   if(content==response[0].entities[j].content)
                //     index=0
                //   }
                //   var color =''
                //   if(index==1){
                //     addlist.push(response[0].entities[i])
                //     for (let k = 0; k < this.options.length; k++) {
                //       for (let l = 0; l < this.options[k].children.length; l++) {
                //         if(this.options[k].children[l].id===response[0].entities[i].entity_template){
                //           color = this.options[k].children[l].color
                //         }
                //       }
                //     }
                //     // var str = this.showdata.split(content);
                //     // var str_new = "";
                //     // for (let index = 0; index < str.length-1; index++) {
                //     //   str_new += str[index]+'<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>';
                //     // }
                //     addcontent.push('<div class="labelstyle" style="background:' +color+'">'+content+'<div class="deletelabel">x</div></div>') 

                //     // str_new += str[str.length-1]
                //     // this.showdata = str_new;   
                //   }         
                // }
                // var str_new = "";
                // for (let i = 0; i < addcontent.length; i++) {
                //   var start = 0
                //   if (i>0) {
                //     start = list[i].start_offset
                //   }   
                //   if (i<addcontent.length-1){
                //     str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1,addlist[i+1].start_offset-1)
                //   } else {
                //     str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset+1)
                //     this.showdata = str_new
                //   }
                // }       
                
                
            
        } else if(this.template_type == 'RE'){
          this.showdata = this.showdata = this.tableData[this.docid].content
          this.labeledstandard = []
          this.entityinput =[]
          this.labeledre = []
          const data = {
            docid:this.tableData[this.docid].id,
            userid:this.userid
          }
          // if(this.itemlabel!=''){
          //   console.log('123asdqqqq');
            
          //   this.showlabeledstandard()
          // }
          // this.activeName=''
          this.$store.dispatch('user/getuserlabel', data)
            .then((response) => {
              console.log('updatedoc',response)
              const list = response.entities
              this.entityinput = list
              var addcontent = []
              var addlist = []
              for (let i = 0; i < list.length; i++) {
                var content = list[i].content 
                var end_offset = list[i].end_offset
                console.log('enterlist',list[i]);
                let index = 1
                // for (let j = 0; j < i; j++) {
                // if(content==list[j].content)
                //   index=0
                // }
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
                  addcontent.push('<div class="labelstyle" name="' + list[i].start_offset + '" style="background:' +color+';color:' +this.isLight(color)+'">'+content+'<div class="deletelabel">x</div></div>') 
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
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset,addlist[i+1].start_offset)
                } else {
                  str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset)
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

        // var para = this.tableData[this.docid].content.split(this.selectpara)
        // if(!para[0]){
        //   para[0] = para[para.length-1]
        // }
        
        const start_offset = this.selectpara.length+this.selectstart
        const end_offset = start_offset + content.length
        var addpara = this.selectpara.slice(0,this.selectstart)+' <el-tooltip content="提示文字" placement="top-start"><div class="labelstyle" style="background:' +this.selectvalue[1].color+';color:' +this.isLight(this.selectvalue[1].color)+'">'+content+'<div class="deletelabel">x</div></div>'+this.selectpara.slice(this.selectend)
        // console.log('addpara',addpara);
        console.log('addpara',addpara);
        console.log('aaaaaa',this.showdata,'s',this.selectpara);
        
        var str = this.showdata.split(this.selectpara);
        console.log('str',str);
        
        var str_new = "";
        str_new = str[0] + addpara + str[1]
        // this.showdata = str_new;

        // console.log('show',this.showdata);
        // console.log('doc',this.tableData[this.docid]);
        var docdata = this.tableData[this.docid].content
        // console.log('position',docdata.indexOf(content));
        // console.log('position1',content.length);
        // console.log('sl',para[0].length+this.selectstart);
        
        
        
        const data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            start_offset:start_offset,
            end_offset:end_offset,
            content:content,
            entity_template:this.selectvalue[1].id,
            user:this.userid,
            role:2
          }
        }
        this.$store.dispatch('user/labelentity', data)
          .then((response) => {
            // this.showdata = str_new;
             if(this.template_type==='RE'){
              const data = {
                docid:this.tableData[this.docid].id,
                userid:this.userid
              }
              this.$store.dispatch('user/getuserlabel', data)
                .then((response) => {
                  console.log('updatedoc1',response)
                  const list = response.entities
                  this.entityinput = list
                  this.reselectchange()
                  this.showlabeledevent()
                })
              }else{
                const data = {
                  docid:this.tableData[this.docid].id,
                  userid:this.userid
                }
                this.$store.dispatch('user/getuserlabel', data)
                  .then((response) => {
                    console.log('updatedoc1',response)
                    const list = response
                    this.entityinput = list
                    this.showlabeledevent()
                })
            }
          })
        // console.log('input',this.entityinput);

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
        console.log(123);
        console.log('option', this.options)
        console.log('select', this.selectvalue)
        var content = this.selecttext
        console.log('content', content);
        //console.log(that.showdata);
        // for (let i = this.selectstart; i < this.selectend; i++) {
        console.log('showdata',this.showdata.split(this.selectpara));
        // var para = this.tableData[this.docid].content.split(this.selectpara)
        // if(!para[0]){
        //   para[0] = para[para.length-1]
        // }
        const start_offset = this.selectpara.length+this.selectstart
        const end_offset = start_offset + content.length
        var addpara = this.selectpara.slice(0,this.selectstart)+'<div class="labelstyle" style="background:' +this.selectvalue[1].color+';color:' +this.isLight(this.selectvalue[1].color)+'">'+content+'<div class="deletelabel">x</div></div>'+this.selectpara.slice(this.selectend)
        console.log('addpara',addpara);
        // }
        var str = this.showdata.split(this.selectpara);
        var str_new = "";
        // for (let index = 0; index < str.length-1; index++) {
        //   str_new += str[index]+'<div class="labelstyle" style="background:' +this.selectvalue[1].color+'">'+content+'<div class="deletelabel">x</div></div>';
        // }
        str_new = str[0] + addpara + str[1]
        // this.showdata = str_new;
        // console.log('show',this.showdata);
        console.log('doc',this.tableData[this.docid]);
        var docdata = this.tableData[this.docid].content
        // console.log('position',docdata.indexOf(content));
        // console.log('position1',content.length);
        // console.log('sl',para[0].length+this.selectstart);
        console.log('beforechange',this.showdata);
        
        // const start_offset = para[0].length+this.selectstart
        // const end_offset = start_offset + content.length
        
        const data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            start_offset:start_offset,
            end_offset:end_offset,
            content:content,
            entity_template:this.selectvalue[1].id,
            event_group_annotation:this.labeledevent1.id,
            user:this.userid,
            role:2
          }
        }
        this.$store.dispatch('user/labelentity', data)
          .then((response) => {
            // this.showdata = str_new;
            // console.log('afterchange',this.showdata);

            // console.log(response);
            // data.list.id = response.id
            // // this.entityinput.push(data.list)
            // console.log('ddd',this.labeledeventoptions);
            // for (let i = 0; i < this.labeledeventoptions.length; i++) {
            //   if(this.labeledeventoptions[i].id===response.event_group_annotation)
            //   {
            //     this.labeledeventoptions[i].entities.push(response)
            //   }
            // }
            this.getlabeledeventoptions()
          })
        // console.log('input',this.entityinput);
      },
      reselectchange(){
        this.selectstartentity=''
        this.selectendentity=''
        var startentitys = []
        var endentitys = []
        for (let i = 0; i < this.entityinput.length; i++) {
          console.log('mmm',this.revalue1,this.entityinput);
          if (this.revalue1.start_entity === this.entityinput[i].entity_template){
            var data = {
              label:this.entityinput[i].content,
              value:{
                startid:this.entityinput[i].id,
                relation:this.revalue1.id,
              }
            }
            startentitys.push(data)
          }
          if (this.revalue1.end_entity === this.entityinput[i].entity_template){
            var data = {
              label:this.entityinput[i].content,
              value:{
                endid:this.entityinput[i].id,
                relation:this.revalue1.id,
              }
            }
            endentitys.push(data)
          }
        }
        this.startentitys = startentitys
        this.endentitys = endentitys
        this.selectstartentity = this.startentitys[0]
        this.selectendentity = this.endentitys[0]
        console.log('reselectchange',this.endentitys,this.startentitys);
      },
      addre(){
        if (this.selectstartentity&&this.selectendentity) {
        console.log(this.selectstartentity,this.selectendentity);
        let data = {
          id:this.tableData[this.docid].id,
          list:{
            doc:this.tableData[this.docid].id,
            user:this.userid,
            role:2,
            relation_entity_template:this.selectstartentity.value.relation,
            start_entity:this.selectstartentity.value.startid,
            end_entity:this.selectendentity.value.endid
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
        }
        else{
          this.$message({
          type: 'error',
          message: '前后实体未选择'
        })
        }
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
        this.dialogVisible=false
        this.showadddic = false
        this.showaddregular = false
        this.confirmdicuse = false
        this.confirmregularuse = false
      },
      submit(){
          const data = {
            id:this.tableData[this.docid].id,
            list:{
              user:this.userid,
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
      },
      standardchange(id,children){
        console.log(id,children);
        console.log("x",this.entityinput);
        for (let i = 0; i < children.length; i++) {
          if (children[i].id === id.entityid){
            this.standards = children[i].standard
            this.standardid = ''
            break;
          }
          if(i===children.length-1){
            this.standards = []
          }
        }
      },
      addstandard(){
        console.log('add1',this.standardid,this.standardentity);
        if (this.standardid&&this.standardentity) {
          
        
        const data = {
          id:this.standardentity.id,
          list:{
            standard_name_id:this.standardid
          }
        }
        // console.log(data);
        this.$store.dispatch('user/labelstantard', data)
            .then((response) => {
              // this.labeledstandard.push({
              //   standard_name:this.options[i].children[k].standard[l].standard_name,
              //   content:this.entityinput[j].content
              // })if
              console.log('123adasd');
              if(this.template_type==='EVENT'){
                
                 const data = {
                  docid:this.tableData[this.docid].id,
                  userid:this.userid
                }
                this.$store.dispatch('user/getuserlabel', data)
                  .then((response) => {
                    console.log('getlabelevent', response,this.options)
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
                        for (let j = 0; j < response.length; j++) {
                          if (response[j].event_group_template === this.options[i].id){
                            response[j].name = this.options[i].name+response[j].id
                          }
                        }
                      }
                      this.labeledeventoptions = response
                      // console.log('xxxxxxa',this.labeledeventoptions);
                      
                    }
                  })
                  setTimeout(() => {
                      this.labeledeventchange()},1000)

              }else{
              this.showlabeledstandard(this.itemlabel)
              }
              this.$message({ message: '标注成功！', type: 'success' });
              this.standardid = ''
        })
        }else{
          this.$message({
          type: 'error',
          message: '未选择实体或标准'
        })
        }
      },
      addstandardoption(item){
        this.dialogVisible=true
        this.deletestlist = []
        console.log(item);
        for (let i = 0; i < item.length; i++) {
          for (let j = 0; j < item[i].standard.length; j++) {
            item[i].standard[j].label = item[i].label
            this.deletestlist.push(item[i].standard[j])
          }
        }
        console.log('deletest',this.deletestlist);
        
        for (let i = 0; i < this.options.length; i++) {
          if(this.activeName===this.options[i].label)
          {
            this.dialogoption = this.options[i].children
          }
        }
      },
      dialogadd(){
        console.log('add2',this.dialogentity,this.dialoginput);
        if (this.dialogentity&&this.dialoginput) {
        const data = {
          id:this.projectid,
          list:{
            type:"manual",
            data:{
            }
          }
        }
        this.$set(data.list.data,this.dialogentity,[this.dialoginput])
        console.log(data);
        this.$store.dispatch('project/manualaddstandard', data)
            .then((response) => {  
              this.$message({ message: '添加成功！', type: 'success' });
              if(this.template_type == 'EVENT') {
                  this.geteventEntitys()
                  setTimeout(() => {
                    this.showlabeledstandard(this.itemlabel)  
                  }, 500);
                  
                }else{
                  this.getEntitys()
                   setTimeout(() => {
                    this.showlabeledstandard(this.itemlabel)  
                  }, 500);
                }
              
              this.dialogVisible = false
        })
        }else{
          this.$message({
          type: 'error',
          message: '信息未填完整'
        })
        }
      },
      dialogdelete(){
        if (this.deletestandardid) {
           this.$store.dispatch('project/deletest', this.deletestandardid)
            .then((response) => {
              this.dialogVisible = false
              this.deletestandardid = ''
              this.deletestlist = []
               if(this.template_type == 'EVENT') {
                  this.geteventEntitys()
                  this.showlabeledstandard(this.itemlabel)
                }else{
                  this.getEntitys()
                  this.showlabeledstandard(this.itemlabel)
                }
               this.$message({
                type: 'success',
                message: '删除成功'
              })
            })
         }else{
          this.$message({
          type: 'error',
          message: '信息未填完整'
        })
        }
      },
      showlabeledstandard(label){
        this.standards=[]
        this.standardentity=[]
        // this.itemlabel = label
        // console.log(label,this.options);
        console.log('q',this.entityinput);
        if(this.template_type!='EVENT'){
          this.itemlabel = label
          if(this.template_type==='RE'){
            const data = {
              docid:this.tableData[this.docid].id,
              userid:this.userid
            }
            this.$store.dispatch('user/getuserlabel', data)
              .then((response) => {
                console.log('updatedoc1',response)
                const list = response.entities
                this.entityinput = list
              })
          }else if(this.template_type==='NER'){
             const data = {
              docid:this.tableData[this.docid].id,
              userid:this.userid
            }
            this.$store.dispatch('user/getuserlabel', data)
              .then((response) => {
                console.log('updatedoc3',response)
                const list = response
                this.entityinput = list
              })
          }
        }else{
          // this.getlabeledeventoptions()
        }
        // setTimeout(() => {
          
        // console.log('h',this.entityinput,this.options);
        // this.labeledstandard.splice(0,this.labeledstandard.length)
        // this.labeledstandard.push({
        //   standard_name:'',
        //   content:''
        // })
        // this.labeledstandard = []
        // // this.$set(this.labeledstandard,[])
        // // var temp = []
        // for (let i = 0; i < this.options.length; i++) {
        //   if (this.options[i].label===label) {
        //     for (let j = 0; j < this.entityinput.length; j++) {
        //       if(this.entityinput[j].standard != null){
        //         for (let k = 0; k < this.options[i].children.length; k++) {
        //           if(this.options[i].children[k].id===this.entityinput[j].entity_template){
        //             for (let l = 0; l < this.options[i].children[k].standard.length; l++) {
        //               if (this.options[i].children[k].standard[l].id===this.entityinput[j].standard) {
        //                 this.labeledstandard.push({
        //                   standard_name:this.options[i].children[k].standard[l].standard_name,
        //                   content:this.entityinput[j].content
        //                 })
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
        // // this.labeledstandard = temp
        // console.log('labeledstandard',this.labeledstandard);
        // }, 500);
        
      },
      getdic(){
        this.$store.dispatch('project/getdic', this.projectid)
          .then((response) => {
            console.log('getdic',response);
            this.dicoption = response
          })
      },
      getregular(){
        this.$store.dispatch('project/getregular', this.projectid)
          .then((response) => {
            console.log('getregular',response);
            this.regularoption = response
          })
      },
      dicchange(){
        this.showdata = this.tableData[this.docid].content
        const formData = new window.FormData()
        formData.append('doc_id',this.tableData[this.docid].id,)
        formData.append('entity_template_id',this.selecteddicid)
        const data = {
          formdata: formData,
          id: this.projectid
        }
        this.$store.dispatch('project/dicmatch', data)
          .then((response) => {
            console.log('dicmatch',response);
            this.submitdicentity = response
             this.showdicentity = []
             this.chongfudic = []
             for (let i = 0; i < this.submitdicentity.length; i++) {
               this.showdicentity.push(this.submitdicentity[i])
             }
             var loop = this.submitdicentity.length
             console.log('length',this.submitdicentity.length,this.entityinput.length);
             
            for (let i = 0; i < loop; i++) {
              for (let j = 0; j < this.entityinput.length; j++) {
                if (!(this.submitdicentity[i].end_offset<=this.entityinput[j].start_offset||this.submitdicentity[i].start_offset>=this.entityinput[j].end_offset)) {
                  this.chongfudic.push(this.submitdicentity[i])
                  this.submitdicentity.splice(i,1)
                  i=i-1
                  loop = loop -1
                  break
                }
              }
            }
            console.log('1111s',this.showdicentity);
            
            this.dicupdatedoc(this.showdicentity)
        })
      },
      deletedicmatch(name){
        console.log('???//',name);
        
        for (let i = 0; i < this.showdicentity.length; i++) {
          if (this.showdicentity[i].start_offset===Number(name)) {
            this.showdicentity.splice(i,1)
            break
          }
        }
        for (let i = 0; i < this.chongfudic.length; i++) {
           if (this.chongfudic[i].start_offset===Number(name)) {
            this.chongfudic.splice(i,1)
            break
          }
        }
         for (let i = 0; i < this.submitdicentity.length; i++) {
           if (this.submitdicentity[i].start_offset===Number(name)) {
            this.submitdicentity.splice(i,1)
            break
          }
        }
        this.dicupdatedoc(this.showdicentity)
      },
      regularchange(){
        this.showdata = this.tableData[this.docid].content
        const formData = new window.FormData()
        formData.append('type','id')
        formData.append('doc_id',this.tableData[this.docid].id)
        formData.append('re_id',this.selectedregularid)
        const data = {
          formdata: formData,
          id: this.projectid
        }
        this.$store.dispatch('project/regularmatch', data)
          .then((response) => {
            console.log('regularmatch',response,this.entityinput);
             this.submitregularentity = response
             this.showregularentity = []
             this.chongfuregular = []
             for (let i = 0; i < this.submitregularentity.length; i++) {
               this.showregularentity.push(this.submitregularentity[i])
             }
             var loop = this.submitregularentity.length;
            for (let i = 0; i < loop; i++) {
              for (let j = 0; j < this.entityinput.length; j++) {
                if (!(this.submitregularentity[i].end_offset<=this.entityinput[j].start_offset||this.submitregularentity[i].start_offset>=this.entityinput[j].end_offset)) {
                  this.chongfuregular.push(this.submitregularentity[i])
                  this.submitregularentity.splice(i,1)
                  i=i-1
                  loop = loop-1
                  break
                }
              }
            } 
            // var list = this.quickSort(response)
            console.log('133',this.showregularentity);
            this.regularupdatedoc(this.showregularentity)
        })
      },
      deleteregmatch(name){
         for (let i = 0; i < this.showregularentity.length; i++) {
          if (this.showregularentity[i].start_offset===Number(name)) {
            this.showregularentity.splice(i,1)
            break
          }
        }
        for (let i = 0; i < this.chongfuregular.length; i++) {
           if (this.chongfuregular[i].start_offset===Number(name)) {
            this.chongfuregular.splice(i,1)
            break
          }
        }
         for (let i = 0; i < this.submitregularentity.length; i++) {
           if (this.submitregularentity[i].start_offset===Number(name)) {
            this.submitregularentity.splice(i,1)
            break
          }
        }
        this.regularupdatedoc(this.showregularentity)
      },
      dicupdatedoc(response){
        this.showdata=this.tableData[this.docid].content
        // console.log(this.tableData[this.docid].content);
        
        // this.tableData[this.docid].content = this.tableData[this.docid].content.replace(/<br\s*\/>/gi, "\n");  
        // console.log(this.tableData[this.docid].content);
        
        const list = response
        console.log('dddd',list);
        
        this.dicentity = response
        // this.entityinput = list
        var addcontent = []
        var addlist = []
        for (let i = 0; i < list.length; i++) {
          var content = list[i].content 
          //console.log(that.showdata);
          let index = 1
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
            addcontent.push('<div class="labelstyle" name="' + list[i].start_offset + '" style="background:' +color+';color:' +this.isLight(color)+'">'+content+'<div class="deletelabel">x</div></div>') 
            // str_new += str[str.length-1]
            // this.showdata = str_new;   
          }         
        }
        console.log('addlist',addlist);
        
        var str_new = "";
        for (let i = 0; i < addcontent.length; i++) {
          console.log('addcontent',addcontent,str_new);
          var start = 0
          if (i>0) {
            start = list[i].start_offset
          }
          if (i<addcontent.length-1){
            str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset,addlist[i+1].start_offset)
          } else {
            str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset)
            this.showdata = str_new
            this.showdata = this.showdata.replace(/\n/g,"<br/>");          
          }
        }
      },
      regularupdatedoc(response){
        this.showdata=this.tableData[this.docid].content
        const list = response
        this.regularentity = response
        // this.entityinput = list
        var addcontent = []
        var addlist = []
        for (let i = 0; i < list.length; i++) {
          var content = list[i].content 
          //console.log(that.showdata);
          let index = 1
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
            addcontent.push('<div class="labelstyle" name="' + list[i].start_offset + '" style="background:' +color+';color:' +this.isLight(color)+'">'+content+'<div class="deletelabel">x</div></div>') 
          }         
        }
        var str_new = "";
        for (let i = 0; i < addcontent.length; i++) {
          var start = 0
          if (i>0) {
            start = list[i].start_offset
          }
          if (i<addcontent.length-1){
            str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset,addlist[i+1].start_offset)
          } else {
            str_new += this.tableData[this.docid].content.slice(start,addlist[i].start_offset) + addcontent[i] + this.tableData[this.docid].content.slice(addlist[i].end_offset)
            this.showdata = str_new
          }
        }
      },
      tabclick(name){
        console.log(name);
        this.activeName=''
        if(name==='字典匹配'){
          this.selecteddicid=''
          this.dicinputstname = ''
          this.submitdicentity = []
             this.showdicentity = []
             this.chongfudic = []
          this.showdata = this.showdata = this.tableData[this.docid].content
          this.getdic()
        }else if(name==='正则匹配'){
          this.selectedregularid=''
          this.submitregularentity = []
             this.showregularentity = []
             this.chongfuregular = []
          this.showdata = this.showdata = this.tableData[this.docid].content
        }
        else{
          this.updatedoc()
        }
      },
      dicuse(){
        console.log('去除重复后',this.submitdicentity);
        
        if(this.submitdicentity.length!=0){
          // console.log(this.dicentity);
          for (let i = 0; i < this.submitdicentity.length; i++) {
            this.submitdicentity[i].user = this.userid
            this.submitdicentity[i].role = 2
             if(this.template_type=='EVENT'){
              this.submitdicentity[i].event_group_annotation=this.labeledevent1.id
            }
          }
          const data = {
          id:this.tableData[this.docid].id,
          list:this.submitdicentity
        }
        this.$store.dispatch('user/labelentity', data)
          .then((response) => {
            this.$message({ message: '标注成功！', type: 'success' });
            this.tabactiveName = '实体统计'
            this.confirmdicuse = false
            this.updatedoc()
          })
        }else{
           this.tabactiveName = '实体统计'
            this.confirmdicuse = false
            this.updatedoc()
        }
      },
      regularuse(){
        // console.log(this.submitregularentity);

        if(this.submitregularentity.length!=0){
          console.log(this.submitregularentity);
          for (let i = 0; i < this.submitregularentity.length; i++) {
            this.submitregularentity[i].user = this.userid
            this.submitregularentity[i].role = 2
            if(this.template_type=='EVENT'){
              this.submitregularentity[i].event_group_annotation=this.labeledevent1.id
            }
          }
          const data = {
          id:this.tableData[this.docid].id,
          list:this.submitregularentity
        }
        this.$store.dispatch('user/labelentity', data)
          .then((response) => {
            this.$message({ message: '标注成功！', type: 'success' });
            this.tabactiveName = '实体统计'
            this.confirmregularuse = false
            this.updatedoc()
          })
        }else{
           this.tabactiveName = '实体统计'
            this.confirmregularuse = false
            this.updatedoc()
        }
      },
      dicadd(){
        if (this.dicinputname&&this.dicinputentity) {
        const formData = new window.FormData()
        const input = [this.dicinputname,this.dicinputentity,this.dicinputstname]
        console.log(input);
        formData.append('type','manual')
        formData.append('data',input)
         const data = {
          formdata: formData,
          id: this.projectid
        }
        this.$store.dispatch('project/uploaddic', data)
          .then((response) => {
            this.showadddic = false
            this.getdic()
        })
        }
        else{
          this.$message({
          type: 'error',
          message: '信息未填完整'
        })
        }
      },
      dicdelete(){
         if (this.deletedicid) {
           const data = {
             projectid:this.projectid,
             entityid:this.deletedicid
           }
           this.$store.dispatch('project/deletedic', data)
            .then((response) => {
              this.showadddic = false
              this.deletedicid = ''
              this.selecteddicid = ''
              this.showdicentity = ''
              this.submitdicentity = ''
              this.chongfudic = ''
              this.showdata = this.tableData[this.docid].content
              this.getdic()
               this.$message({
                type: 'success',
                message: '删除成功'
              })
            })
         }else{
          this.$message({
          type: 'error',
          message: '信息未填完整'
        })
        }
      },
      regularadd(){
        var isempty = 1
        for (let k = 0; k < this.regulartem.length; k++) {
          if (!this.regulartem[k].id) {
            isempty = 0
            break
          }
        }
        if (isempty&&this.regularinputname) {
          
        
        const formData = new window.FormData()
        var tem = ''
          for (let i = 0; i < this.regulartem.length; i++) {
            tem += this.regulartem[i].id
            if (i < this.regulartem.length - 1) {
              tem += ','
            }
          }
        formData.append('type','manual')
        formData.append('content',this.regularinputname)
        formData.append('entity_template_id_list',tem)
         const data = {
          formdata: formData,
          id: this.projectid
        }
        this.$store.dispatch('project/uploadregular', data)
          .then((response) => {
            this.showaddregular = false
            this.getregular()
        })
        }else{
          this.$message({
          type: 'error',
          message: '未输入表达式或对应实体'
        })
        }
      },
      regulardelete(){
        if (this.deleteregularid) {
           this.$store.dispatch('project/deleteregular', this.deleteregularid)
            .then((response) => {
              this.showaddregular = false
              this.deleteregularid = ''
              this.selectedregularid = ''
              this.submitregularentity = ''
              this.chongfuregular = ''
              this.showregularentity = ''
              this.showdata = this.tableData[this.docid].content
              this.getregular()
               this.$message({
                type: 'success',
                message: '删除成功'
              })
            })
         }else{
          this.$message({
          type: 'error',
          message: '信息未填完整'
        })
        }
      },
      regularmatch(){
         var isempty = 1
        for (let k = 0; k < this.regulartem.length; k++) {
          if (!this.regulartem[k].id) {
            isempty = 0
            break
          }
        }
        if (isempty&&this.regularinputname) {
         this.showdata = this.tableData[this.docid].content
        const formData = new window.FormData()
        formData.append('type','content')
        formData.append('doc_id',this.tableData[this.docid].id)
         var tem = ''
          for (let i = 0; i < this.regulartem.length; i++) {
            tem += this.regulartem[i].id
            if (i < this.regulartem.length - 1) {
              tem += ','
            }
          }
        formData.append('content',this.regularinputname)
        formData.append('entity_template_id_list',tem)
        const data = {
          formdata: formData,
          id: this.projectid
        }
        this.$store.dispatch('project/regularmatch', data)
          .then((response) => {
            console.log('regularmatch',response,this.entityinput);
            this.showaddregular = false
             this.submitregularentity = response
             this.showregularentity = []
             this.chongfuregular = []
             for (let i = 0; i < this.submitregularentity.length; i++) {
               this.showregularentity.push(this.submitregularentity[i])
             }
             var loop = this.submitregularentity.length
            for (let i = 0; i < loop; i++) {
              for (let j = 0; j < this.entityinput.length; j++) {
                if (!(this.submitregularentity[i].end_offset<=this.entityinput[j].start_offset||this.submitregularentity[i].start_offset>=this.entityinput[j].end_offset)) {
                  this.chongfuregular.push(this.submitregularentity[i])
                  this.submitregularentity.splice(i,1)
                  i=i-1
                  loop = loop -1
                  break
                }
              }
            } 
            // var list = this.quickSort(response)
            // console.log('133',this.showregularentity);
            this.regularupdatedoc(this.showregularentity)
        })
        }else{
          this.$message({
            type: 'error',
            message: '未输入表达式或对应实体'
          })
        }
      },
      quickSort(arr) {
        var len = arr.length,
            index,
            pivot,
            left=[],
            right=[];
        if (len <= 1) return arr;
        index = Math.floor(len / 2);
        pivot = arr.splice(index, 1).start_offset;
        len -= 1;
        for (var i = 0; i < len; i++) {
            if (pivot > arr[i].start_offset) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat(pivot, quickSort(right));
      },
      newregulartem() {
        this.regulartem.push({
          name: '',
          id: '',
          key: Date.now()
        })
      },
      removeregulartem(index) {
      this.regulartem.splice(index, 1)
      },
    },
    data() {
      return {
        deleteevent1:false,
        tipscontent:'',
        tipsshow:false,
        deletestlist:[],
        deletestandardid:'',
        standardguanli:'',
        deleteregularid:'',
        regularguanli:'',
        deletedicid:'',
        dicguanli:'',
        deleteArr:[],
        showregularentity:[],
        showdicentity:[],
        submitregularentity:[],
        submitdicentity:[],
        chongfuregular:[],
        chongfudic:[],
        confirmdicuse:false,
        confirmregularuse:false,
        regulartem:[
          {
            name: '',
            id: ''
          }
        ],
        regularinputname:'',
        regularinputentity:'',
        showaddregular:false,
        regularentity:[],
        selectedregularid:'',
        regularoption:[],
        dicinputname:'',
        dicinputentity:'',
        dicinputstname:'',
        showadddic:false,
        dicentity:[],
        tabactiveName:'实体统计',
        selecteddicid:'',
        dicoption:[],
        itemlabel:'',
        userid:'',
        dialoginput:'',
        dialogentity:'',
        dialogoption:'',
        dialogVisible:false,
        labeledstandard:[],
        standards:[],
        standardid:'',
        standardentity:'',
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
        labeledevent1:{
          name:'',
          id:''
        },
        labeledeventoptions:[],
        revalue1:'',
        startentitys:[],
        endentitys:[],
        selectstartentity:'',
        selectendentity:'',
        options:[
          ],
        reoptions:{
          
        },
        standard:[],
        labeledre:[],
        eventoptions:[],
        entityinput:[], 
        entityinput1:[],
        tableData: [
           
        ],
        showdata_pre:'<div class="labelcontent">',
        showdata_back:'</div>',
        showdata: '',
        
        activeName: '4',
        activeName1: '4',
        activeName2: '4',
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
    word-break: break-all;
    overflow: hidden;
    padding-bottom: 10px;
    white-space: pre-wrap;
}
.labelstyle{
  background: #F38181;
  border-radius: 4px;
  display: inline-flex;
  box-shadow: 1px 1px 5px #888888;
  margin-left:3px;
  margin-right:3px;
  padding:3px;
  white-space: pre-wrap;
}
.labelstyle1{
  white-space: normal;
}
.deletelabel{
  margin-left: 5px;
  margin-right:2px;
  cursor: pointer;
  position: relative;
  bottom: 10px;
  color: aliceblue;
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
.el-cascader-menu{
  height:auto
}
.aside-container{
  min-height: 90%;
  // min-width: 300px;
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
.divright{
  position:absolute;
  color:red;
  z-index: 99;
  font-size: 1.2em;
  background-color: black;
  width: 1em;
  height: 1em;
  left : 80%;
  top : -12px;
  text-align: center;
  -webkit-border-radius: 2.75em;
  border-radius: 2.75em;
}
.hoveritem{
  visibility: hidden;
  position:absolute;
  // display: none;
}
.asidecontent{
  box-shadow: 5px;
}
.standardcard{
  position: absolute;
  top:420px;
  margin-left:10px;
  min-width: 320px;
  min-height: 300px;
  max-width: 320px;
}
.standardcontainer{
  display: inline-block;
  box-shadow: 0px 0px 3px #888888;
    margin: 5px;
    padding: 8px;
    border-radius: 5px;
}
</style>