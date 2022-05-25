# DoTAT: A Domain-oriented Text Annotation Tool 

### Congratulations on this work being accepted to the ACL 2022 demo track! 

(https://aclanthology.org/2022.acl-demo.1/)

Paper: https://aclanthology.org/2022.acl-demo.1.pdf  (System Demonstration Papers NO.1)

## Cite
Yupian Lin, Tong Ruan, Ming Liang, Tingting Cai, Wen Du, and Yi Wang. 2022. DoTAT: A Domain-oriented Text Annotation Tool. In Proceedings of the 60th Annual Meeting of the Association for Computational Linguistics: System Demonstrations, pages 1–8, Dublin, Ireland. Association for Computational Linguistics.

## From
School of Information Science and Engineering, East China University of Science and Technology, Shanghai 200237, China

[华东理工大学-自然语言处理与大数据挖掘实验室]

# A Short Video Demo （简短的演示视频）
https://ecust-nlp-docker.oss-cn-shanghai.aliyuncs.com/dotat_demo.mp4

# A Live Demo Website (在线使用网站)
http://175.24.69.95/new/

# Notification（标注工作流程说明）

---------管理员帐号---------

An administrator account:

Username：ecust

Password：ecustlab301

---------标注流程---------

【腾讯文档】DoTAT用户手册
https://docs.qq.com/doc/DTnlib2JmZVBXTmxI


A typical annotation process using DoTAT may include the following five steps:

(1) Define  annotation  specifications:   The  administrator  selects  the  annotation  type  andvisually defines event types, entity types, relation types or text categories in annotation specifications.

(2) Create and assign tasks: Administrator creates and assigns tasks. Each task contains anannotation specification and several raw texts. It is recommended that two annotators andone reviewer are assigned to each task.

(3) Annotate: Before the annotators interactively annotate events or entities, they can use automatic batch annotation to accelerate the speed. The event annotation interface of DoTAT contains event list panel (top) and annotation panel (bottom), as shown in the Figure: 
![image](https://github.com/FXLP/MyGallery/blob/main/MLEE_nested_event.PNG)


(4) Merge and Review: The reviewer starts consistency checking and automatic merging ofthe annotated content by multiple annotators. The reviewer can visually analyze the errors according to the merged events list.  When there are too many similar errors, the reviewer can give feedback for administrator to re-definethe annotation specification.   With iterative annotation function, all exsisting annotationscan be reused.

(5) Export results: After the review process, the annotated content can be exported by admin-istrator to a result file and saved in JSON format.

During the trial period, the user's task management rights and annotation specification management rights will be opened. You will need to contact us to apply for the administrator account in the future.

更多最新消息请加QQ群1054082857 (DoTAT) 第一时间了解，加群时需要验证身份，已收藏该项目的GitHub帐号才会通过申请。 

欢迎进行学术交流, 如需合作请发送邮件(e-mail)到yupianlin@aliyun.com。


# Attention
该工具已于2020年获得软件著作权登记证书，登记号：2020SR1006620，如需二次开发使用则要在项目中着重标明来源于[华东理工大学-自然语言处理与大数据挖掘实验室]！

# Code
Back-end 后端代码地址[暂不开放]：https://github.com/sxthunder/ecust_annotation

含审核者的版本（Front-end）：https://github.com/PPzXiao/MarkTool2

如果是本地部署的前端服务，可以将请求访问URL改为目前开放的后端接口(Back-end API)：http://1.15.138.236:53301/


# Development Guide
(1) clone the project: 
git clone https://github.com/FXLP/MarkTool.git

(2) enter the project directory: 
cd MarkTool

(You may need nodejs/npm v8. You can use the nvm to control the version of nodejs/npm.)

(3) install dependency:
npm install

(4) develop:
npm run dev



