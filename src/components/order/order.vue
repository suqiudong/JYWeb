<template>
    <div class="order">
        <div class="order_header">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="order_main">
                <ul class="clear">
                    <li>
                        <label for="">就诊卡号：</label>
                        <el-input  placeholder="就诊卡号"  @keyup.enter.native="icCardBulr" v-model="treatId"></el-input>
                    </li>
                    <li>
                        <label for="">姓名：</label>
                        <el-input style="color:#000" placeholder="姓名" v-model="name" v-bind:disabled="true"></el-input>
                    </li>
                    <li>
                        <label for="">性别：</label>
                        <el-input  placeholder="性别" v-model="sex" v-bind:disabled="true"></el-input>
                    </li>
                    <li>
                        <label for="">身份证号：</label>
                        <el-input  placeholder="身份证号" v-model="idCard" v-bind:disabled="true"></el-input>
                    </li>
                    
                    
                    <li>
                        <label for="">手机号：</label>
                        <el-input  placeholder="手机号" v-model="phone" v-bind:disabled="true"></el-input>
                    </li>
                    
                    <!-- <li v-show="engenderShow">
                        <label for="">挂号科室：</label>
                        <select style="width:60%" v-on:change="getDate_list" v-model="roomItem" v-bind:disabled="roomDisabled">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in roomArr" v-bind:value="item.itemNo"  :key="index">
                                {{item.ItemName}}
                            </option>
                        </select>
                    </li> 
                    <li></li> -->
                    <!-- <li v-show="engenderShow">
                        <label for="">挂号日期：</label>
                        <el-date-picker
                            v-model="startTime"
                            type="date"
                            placeholder="开始日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd" v-on:change="selectDate_s" :picker-options="pickerOptions0"  v-bind:disabled="startTime_abled">
                        </el-date-picker>
                    </li> -->
                    <!-- <li v-show="engenderShow"></li> -->
                    <!-- <li v-show="engenderShow">
                        <label for="">挂号医生：</label>
                        <select style="width:60%" v-on:change="getDoctor" v-model="docId" v-bind:disabled="docDisabled">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in doctorArr" v-bind:value="item.doctorNo" :key="index">
                                {{item.doctorName}}
                            </option>
                        </select>
                    </li> -->
                    <!-- <li v-show="engenderShow"></li> -->
                    <!-- <li v-show="engenderShow">
                        <label for="">挂号时间：</label>
                        <select style="width:60%" v-on:change="getTime" v-model="timeId" v-bind:disabled="timeDisabled">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in timeArr" v-bind:value="[item.timeNo,item.schedulingNo,item.timeName]"  :key="index">
                                {{item.timeName}}
                            </option>
                        </select>
                    </li> -->
                    
                </ul>
                <ul class="clear" style="border-top: 1px dashed #ccc;margin-top:5%;padding-top:5%">
                    <li>
                        <label for="">挂号机构：</label>
                        <!-- <select name="" id="hospital_list" v-on:change="getSubject" v-model="indexId">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in hospitalArr" v-bind:value="item.hospitalNo"  :key="index">
                                {{item.hospitalName}}
                            </option>
                        </select> -->
                        <el-select v-model="indexId" @click="enter" clearable  v-on:change="getSubject" style="width:60%" filterable placeholder="==请选择==" :filterMethod="hosFilter">
                            <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                                <span>{{item.hospitalName}}</span>
                                <span style="float:right">{{item.pinyin}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">挂号科室：</label>
                        <!-- <select v-on:change="getRoom" v-model="roomId" :disabled="roomDis">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in roomArr" :value="[item.code,item.name]" :key="index">
                                {{item.name}}
                            </option>
                        </select> -->
                        <el-select v-model="roomId" clearable v-on:input="getRoom_input(roomId)"  v-on:change="getRoom" :disabled="roomDis" style="width:60%" filterable placeholder="==请选择==" :filterMethod="roomFilter">
                            <el-option v-for="(item,index) in roomArr"  :key="index"  :label="item.name" :value="item.code">
                                <span>{{item.name}}</span>
                                <span style="float:right">{{item.pinyin}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="" @click="changeInput">挂号类别：</label>
                        <!-- <select v-on:change="orderSelect" v-model="orderTypeNum" :disabled="registType">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in roomsArr" v-bind:value="[item.class_type,item.name]" :key="index">
                                {{item.name}}
                            </option>   
                        </select> -->
                        <el-select v-model="orderTypeNum" clearable v-on:input="orderSelect_input(orderTypeNum)"  v-on:change="orderSelect" :disabled="registType" style="width:60%" filterable placeholder="==请选择==" :filterMethod="roomsFilter">
                            <el-option v-for="(item,index) in roomsArr"  :key="index"  :label="item.name" :value="item.class_type">
                                <span>{{item.name}}</span>
                                <span style="float:right">{{item.pinyin}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <!-- <li></li> -->
                    <li v-show="unEngenderShow">
                        <label for="">挂号医生：</label>
                        <!-- <select name="" id="hospital_list" v-model="orderDocId" v-on:change="orderDocSelect" v-bind:disabled="unEngenderDocDisabled">
                            <option value="">==请选择==</option>
                            <option v-for="(item,index) in orderDoctor" v-bind:value="[item.STAFF_INDEX_NO,item.STAFF_NAME,item.STAFF_CODE]" :key="index">
                                {{item.STAFF_NAME}}
                            </option>
                        </select> -->
                        <el-select v-model="orderDocId" clearable  v-on:change="orderDocSelect" :disabled="unEngenderDocDisabled" style="width:60%" filterable placeholder="==请选择==" :filterMethod="docFilter">
                            <el-option v-for="(item,index) in orderDoctor"  :key="index"  :label="item.STAFF_NAME" :value="item.STAFF_INDEX_NO">
                                <span>{{item.STAFF_NAME}}</span>
                                <span style="float:right">{{item.PINYIN_CODE}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li v-show="unEngenderShow" style="position:relative">
                        <label for="">来源：</label>
                        <!-- <select v-on:change="selectSource" v-model="source">
                            <option value="">==请选择==</option>
                            <option value="" v-for="(item,index) in sourceArr" v-bind:value="item" :key="index">
                                {{item}}
                            </option>
                        </select> -->
                        <el-autocomplete class="inline-input" clearable style="width:60%" v-model="source" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" >
                            
                        </el-autocomplete>

                        <!-- <el-select v-model="source" clearable style="width:60%" filterable placeholder="==请选择==" :filterMethod="sourceFilter">
                            <el-option v-for="item in sourceArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <span style="float:right">{{item.name}}</span>
                            </el-option>
                        </el-select> -->
                        <!-- <el-input  placeholder="来源" v-show="true" v-model="source"></el-input> -->
                    </li>
                    <!-- <li v-show="unEngenderShow"></li> -->
                    <li v-show="unEngenderShow">    
                        <label for="">操作员：</label>
                        <el-input  placeholder="操作员" :disabled="true" v-model="opName"></el-input>
                    </li>
                    <!-- <li v-show="unEngenderShow"></li> -->
                    <li v-show="unEngenderShow">
                        <el-checkbox v-model="checked">购买病历</el-checkbox>
                    </li>
                    <!-- <li style="margin-top:5%">
                        <label for="">收取费用：</label>
                        <el-input  placeholder="收取费用" v-model="price"></el-input>
                    </li> -->
                </ul>
        </div>
        <div class="order_footer">
             <el-button type="warning" @click="back">返回上一页</el-button>
              <el-button type="warning" style="float:right;" @click="order" v-loading.fullscreen.lock="fullscreenLoading" v-bind:disabled="orderBtn">立即挂号</el-button>
        </div>

        <el-dialog title="提示"  :visible.sync="centerDialogVisible" width="30%"  center>
            <span>{{remark}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="backIndex">返回主页</el-button>
                <el-button type="warning" @click="inquireOrder" v-loading.fullscreen.lock="fullscreenLoading">查询挂号</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="popshow"
            width="30%"
            :before-close="handleClose">
            <span>{{this.tipsMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="popshow = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import baseUrl from '../base/baseUrl.js';
import axios from 'axios';
export default {
    data(){
        return {
            msg: '患者挂号',
            treatId: '',//就诊卡号
            name: '',//姓名
            idCard: '',//身份证
            phone: '',//手机号
            sex: '',
            optioner: '',
            hospitalArr: [],//医院机构
            hospitalArr_new: [],
            doctorArr: [],//挂号医生
            // opName: '',//客服
            roomArr: [],//挂号科室
            roomArr_new: [],//挂号科室
            dateArr: [],//挂号日期
            timeArr: [],//挂号时间
            optionArr: [],//操作员
            roomItemsArr: [],
            roomItemsArr_new: [],
            // sourceArr: [{name:"123",value:"朋友介绍"},{name:"爱人在院",value:"爱人在院"},"医生介绍",
            //             "外院介绍","口碑","附近","员工介绍","网络","客户介绍",
            
            //             "电视","电话","报纸","广播","路过","其他","自定义"],//挂号来源
            sourceArr: [{name:"PYJS",value:"朋友介绍"},{name:"ARZY",value:"爱人在院"},{name:"YSJS",value:"医生介绍"},
                        {name:"WYJS",value:"外院介绍"},{name:"KB",value:"口碑"},{name:"FJ",value:"附近"},
                        {name:"YGJS",value:"员工介绍"},{name:"WL",value:"网络"},{name:"KHJS",value:"客户介绍"},
                        {name:"DS",value:"电视"},{name:"DH",value:"电话"},{name:"BZ",value:"报纸"},
                        {name:"GB",value:"广播"},{name:"LG",value:"路过"},{name:"QT",value:"其他"},
            ],
            sourceArr_new: [{name:"PYJS",value:"朋友介绍"},{name:"ARZY",value:"爱人在院"},{name:"YSJS",value:"医生介绍"},
                        {name:"WYJS",value:"外院介绍"},{name:"KB",value:"口碑"},{name:"FJ",value:"附近"},
                        {name:"YGJS",value:"员工介绍"},{name:"WL",value:"网络"},{name:"KHJS",value:"客户介绍"},
                        {name:"DS",value:"电视"},{name:"DH",value:"电话"},{name:"BZ",value:"报纸"},
                        {name:"GB",value:"广播"},{name:"LG",value:"路过"},{name:"QT",value:"其他"},
            ],
            orderNumber: '',//预约号
            origin: '',//来源
            indexId: '',
            roomItem: '',
            startTime: '',//时间开始日期
            endTime: '',//时间结束日期
            startTime_abled: true,
            endTime_abled: true,
            docId: '',
            itemNo: '',
            timeId: '',
            orderBtn: true,
            schedulingNo: '',
            remark: '', 
            centerDialogVisible: false,//查询弹窗
            roomDisabled: true,
            docDisabled: true,
            timeDisabled: true,
            popshow: false,
            tipsMsg:'',

            roomId: '',
            // 时间范围控制
            pickerOptions0: {
                disabledDate(time) {
                    let _now = Date.now(),
                    seven = 8 * 24 * 60 * 60 * 1000,
                    sevenDays = _now + seven;
                return time.getTime() < _now -(1*24*60*60*1000) || time.getTime() > sevenDays;
　　　　　　　　　　　　　　//小于当前的禁止，大于7天前的禁止
                }
            },
            radio: '0',//默认单选框选中第一个
            engenderShow: false, //生殖用户显示控制
            unEngenderShow: true,
            unEngenderDocDisabled: true,
            registType: true,//挂号类别
            radioDisabled: true,
            fullscreenLoading: false,//loading
            orderTypeArr: [],//挂号类别
            orderType: '',
            orderId: '',
            orderDoctor: [],//挂号医生(非生殖)
            orderDoctor_new: [],//挂号医生(非生殖)
            orderDocId: '',
            CLASS_TYPE: '',
            opName: '',//操作员
            opNo: '',
            source: '',//来源
            checked: false,
            orderTips: '获取列表失败~~~',
            orderSelectShow: true,
            orderSelectHide: false,
            state2: '',


            roomDis: true,

            roomsArr: [],
            roomsArr_new: [],
            orderTypeNum: '',


            price: '',//收取费用

            docName: '',
            hospitalNum: '',

        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },


        // 通过输入就诊卡自动查找用户信息
        icCardBulr(){
            if(this.treatId == ''){
                return
            }else{
                axios.get(baseUrl + "api/mq/search_patient?keyword=" + this.treatId)
                .then(res=>{
                    console.log(res);
                    if(res.data.msg.length == 0){
                        this.$message('未找到该就诊卡号');
                    }else{
                        this.name = res.data.msg[0].PAT_NAME;
                        this.sex = res.data.msg[0].PHYSI_SEX_NAME;
                        this.idCard = res.data.msg[0].ID_NUMBER;
                        this.phone = res.data.msg[0].PHONE_NO;
                    }
                }).catch(err=>{
                    console.log(err);
                    this.orderTips = err;
                    this.fails();
                })
            }
        },

        // 单选框事件
        engenderBtn(){
            // console.log(this.radio)
            if(this.radio == 1 && this.indexId != ''){
                this.engender = false;
                this.unEngender = true;
                axios.get(baseUrl + 'api/his/book_subject_list?hospital_no=' + this.indexId)
                .then(res=>{
                    // console.log(res);
                    // console.log(this.radio);
                    this.roomArr = res.data.msg;
                    this.roomDisabled = false;
                    this.roomArr = res.data.msg;
                    this.roomDisabled = false;
                })
                .catch(errr=>{
                    console.log(error);
                });
            }else if(this.radio == 2){
                this.engender = true;
                this.unEngender = false;

                // 选择非生殖用户时请求接口
                axios.get(baseUrl + 'api/mq/register_type?hospital=' + this.indexId)
                .then(res=>{
                    console.log(res);
                    this.orderType = res.data.msg;
                    this.registType = false;
                }).catch(error=>{

                })
            }
        },
        // 点击选择医院机构
        getSubject(){
            this.roomDis = false;
            // console.log(this.orderId);
            axios.get(baseUrl + 'api/mq/register_type_new?hospital=' + this.hospitalNum)
            .then(res=>{
                console.log(res);
                if(res.data.status == 200302){
                    this.roomArr = res.data.msg.depts;
                    this.roomArr_new = res.data.msg.depts;
                    this.roomItemsArr = res.data.msg.items;
                    this.roomItemsArr_new = res.data.msg.items;
                    // console.log(this.roomItemsArr)
                }else{
                    this.fails();
                }
            })
            .catch(error=>{
                console.log(error);
                this.orderTips = "服务器出错"+error;
                this.fails();
            });
        },
        
        // 点击挂号科室
        getRoom(){
            console.log(this.roomId)    
            // if(this.orderTypeNum != ''){
            //     this.orderDoctor = [];
            //     this.orderDocId = "";
            //     this.unEngenderDocDisabled = true;
            //     this.orderTypeNum = '';
            // }else{
                this.orderDocId = "";
                this.unEngenderDocDisabled = true;

                this.orderTypeNum = "";
                    
                if(this.roomId != ''){
                    this.roomDis = false;
                    this.roomsArr = this.roomItemsArr[this.roomId].items;
                    this.roomsArr_new = this.roomItemsArr[this.roomId].items;
                    this.registType = false;
                }
                // this.roomDis = false;
                // this.roomsArr = this.roomItemsArr[this.roomId].items;
                // this.roomsArr_new = this.roomItemsArr[this.roomId].items;
                // this.registType = false;
                console.log(this.roomsArr)
            // }
        },

        // 监听挂号科室输入框得值

        getRoom_input(){
            console.log(this.roomId);
            if(this.roomId == ''){
                this.registType = true;
            }
        },



        // 监听挂号类别输入框得值
        orderSelect_input(){
            if(this.orderTypeNum == ''){
                this.unEngenderDocDisabled = true;
                this.orderDocId = "";
            }
        },




        fails() {
            this.$message.error(this.orderTips);
        },
        selectDate_s(){
                if(this.roomItem != ''){
                    axios.get(baseUrl + "api/his/book_doctor_list?item_no=" + this.roomItem + '&registered_start_date=' + this.startTime + '&registered_end_date=' + this.startTime, )
                    .then(res=>{
                    console.log(res);
                    if(res.data.status == 200208){
                        this.doctorArr = res.data.msg;
                        this.docDisabled = false;
                    }else{
                        this.fails();
                    }
                    }).catch(error=>{
                        console.log(error);
                        this.orderTips = "服务器出错"+error;
                        this.fails();
                    })
                }
                

                // this.docDisabled = true;
        },
        getDoctor(){
            // console.log(this.docId);
            axios.get(baseUrl + "api/his/book_doctor_schedule_list?item_no=" + this.roomItem + '&registered_start_date=' + this.startTime + '&registered_end_date=' + this.startTime + '&doctor_no=' + this.docId)
            .then(res=>{
                console.log(res);
                this.timeArr = res.data.msg;
                this.timeDisabled = false;
                // this.schedulingNo = res.data.msg.schedulingNo;
            })
            .catch(error=>{
                console.log(error)
                this.orderTips = "服务器出错"+error;
                this.fails();
            })
        },
        getTime(){
            // console.log(this.timeId);
            this.orderBtn = false;
        },
        order(){
            var date = new Date();
            var hours = date.getHours();
            var day = date.getDate();
            console.log(this.roomId,this.orderTypeNum,this.orderDocId);
                // console.log(this.orderTypeNum);
                if(this.treatId == '' || this.name == '' || this.idCard == '' || this.phone == ''){
                    this.tipsMsg = "请输入用户就诊卡、姓名、身份证、手机号";
                    this.popshow = true;
                }else if(this.roomId =='' || this.orderTypeNum == '' || this.orderDocId == ''){
                    console.log(this.roomId,this.orderTypeNum);
                    this.tipsMsg = "请先选择挂号信息";
                    this.popshow = true;
                }else{
                    this.fullscreenLoading = true;
                    // console.log(this.orderTypeNum);
                    
                    axios.post(baseUrl + 'api/mq/register', JSON.stringify({
                        "medical_card_id": this.treatId,
                        "doctor_id": this.orderDocId,
                        "doctor_name": this.docName,
                        "scheme_type": this.orderTypeNum,
                        "op_name": this.opName,
                        "op_no": this.opNo,
                        "source": this.source,
                        "is_mrc": this.checked,
                    })).then(res=>{
                        console.log(res);
                        this.fullscreenLoading = false;
                        if(res.data.status == 200303){
                            this.remark = "挂号成功!"
                            this.centerDialogVisible = true;
                        }else{
                            this.orderTips = "挂号失败" + res.data.msg.error + res.data.status;
                            this.fails();
                        }
                    }).catch(error=>{
                        console.log(error);
                        this.orderTips = "服务器出错"+ error;
                        this.fails();
                    })
                }
            // }
        },
        inquireOrder(){
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
                this.$router.push({
                    path: 'record',
                    query: {
                        icCard: this.treatId
                    }
                })
            }, 1500);
        },
        backIndex(){
            this.$router.push({
                path: '/'
            })
        },
        handleClose(){
            
        },
        changeInput(){
            this.orderSelectShow = !this.orderSelectShow;
            this.orderSelectHide = !this.orderSelectHide;
        },  


        // 来源
        querySearch(queryString, cb) {
            console.log(queryString)
            var restaurants = this.sourceArr;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {    
                return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect(item) {
            // console.log(item);
            this.source = item.value ;
            console.log(this.source)
        },


        // 机构筛选
        hosFilter(val) {
            if (val) {
                var tempArr = [];
                this.hospitalArr_new.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['hospitalName'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.hospitalArr = tempArr;
            } else {
                this.hospitalArr = this.hospitalArr_new;
            }
        },


        // 科室
        roomFilter(val) {
            if (val) {
                var tempArr = [];
                this.roomArr_new.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.roomArr = tempArr;
            } else {
                this.roomArr = this.roomArr_new;
            }
        },
        roomsFilter(val) {
            if (val) {
                var tempArr = [];
                this.roomsArr_new.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.roomsArr = tempArr;
            } else {
                this.roomsArr = this.roomsArr_new;
            }
        },
        docFilter(val) {
            if (val) {
                var tempArr = [];
                this.orderDoctor_new.forEach(function(opt, index){
                if (opt['PINYIN_CODE'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['STAFF_NAME'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.orderDoctor = tempArr;
            } else {
                this.orderDoctor = this.orderDoctor_new;
            }
        },
        sourceFilter(val) {
            if (val) {
                var tempArr = [];
                this.sourceArr_new.forEach(function(opt, index){
                if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.sourceArr = tempArr;
            } else {
                this.sourceArr = this.sourceArr_new;
            }
        },


        enter(e){
            e.target.click() ? !e.target.click():e.target.click();
        },




        // 挂号类别选择事件
        orderSelect(){  
            // console.log(this.roomId);
            console.log(this.orderTypeNum);
            if(this.orderTypeNum == ''){
                this.unEngenderDocDisabled = true;
            }else{
                axios.get(baseUrl + 'api/mq/depart_doctor?depart_code=' + this.roomId)
                .then(res=>{
                    console.log(res);
                    this.unEngenderDocDisabled = false;
                    if(res.data.status == 200302){
                        this.orderDoctor = res.data.msg;
                        this.orderDoctor_new = res.data.msg;
                    }else{
                        this.fails();
                    }   
                }).catch(err=>{
                    console.log(err);
                    this.orderTips = "服务器出错"+err;
                    this.fails();
                }) 
            }
            

            // if(this.orderType[3] == true){
            //     this.engenderShow = true;
            //     this.unEngenderShow = false;
            //     axios.get(baseUrl + 'api/his/book_subject_list?hospital_no=' + this.indexId)
            //     .then(res=>{
            //         console.log(res);
            //         if(res.data.status == 200206){
            //             this.roomArr = res.data.msg;
            //             this.roomDisabled = false;
            //         }else{
            //             this.fails();
            //         }
                    
            //     }).catch(err=>{
            //         console.log(err);
            //         this.orderTips = "服务器出错";
            //         this.fails();
            //     })
            // }else if(this.orderType[3] == false){
            //     this.unEngenderShow = true;
            //     this.engenderShow = false;
            //     axios.get(baseUrl + 'api/mq/depart_doctor?depart_code=' + this.orderType[0])
            //     .then(res=>{
            //         console.log(res);
            //         this.unEngenderDocDisabled = false;
            //         if(res.data.status == 200302){
            //             this.orderDoctor = res.data.msg;
            //         }else{
            //             this.fails();
            //         }   
            //     }).catch(err=>{
            //         console.log(err);
            //         this.orderTips = "服务器出错";
            //         this.fails();
            //     })
            // }
            // axios.get(baseUrl + 'api/mq/depart_doctor?depart_code=' + this.orderType[0])
            // .then(res=>{
            //     console.log(res);
            //     this.orderDoctor = res.data.msg;
            //     this.engenderDocDisabled = false;
            // }).catch(error=>{

            // })
        },

        // 挂号医生(非生殖)
        orderDocSelect(){
            // console.log(this.orderDocId);
            // console.log(this.orderDoctor);
            this.orderBtn = false;
            for( var i=0;i<this.orderDoctor.length; i++){
                // console.log(this.orderDoctor[i].STAFF_INDEX_NO);
                if(this.orderDoctor[i].STAFF_INDEX_NO == this.orderDocId) {
                    this.docName = this.orderDoctor[i].STAFF_NAME;
                }
            }
            
            // console.log(this.orderTypeNum);
            // console.log(this.orderDocId);
        },


        getHospital(){
            axios.get(baseUrl + 'api/his/hospital_list')
            .then(res=>{
                console.log(res);
                if(res.data.status == 200201){
                    this.hospitalArr = res.data.msg;
                    this.hospitalArr_new = res.data.msg;

                    function UrlSearch(path, param) {
                        var name;
                        var str = decodeURI(path); //取得整个地址栏
                        var num = str.indexOf("?")
                        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
                        var arr = str.split("&"); //各个参数放到数组里
                        for(var i=0;i < arr.length;i++){
                            num=arr[i].indexOf("=");
                            if(num>0){
                                name = arr[i].substring(0,num);
                                if (name === param) {
                                    return arr[i].substr(num+1);
                                }
                                continue;
                            }
                        }
                    };
                    var url = window.location.href;
                    var tempHospitalNum = UrlSearch(url, 'hospitalId');

                    // tempHospitalNum  ifream参数，通过参数查找编号

                        for(var i=0;i<this.hospitalArr.length;i++){
                            if(this.hospitalArr[i].hospitalNoZ == tempHospitalNum){
                                this.indexId = this.hospitalArr[i].hospitalName;
                                this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                this.hospitalNum = this.hospitalArr[i].hospitalNo;
                                this.getSubject();
                            }
                        };



                    // if(tempHospitalNum == 76){
                    //     this.hospitalNum = "111";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 73){
                    //     this.hospitalNum = "114";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 74){
                    //     this.hospitalNum = "113";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 75){
                    //     this.hospitalNum = "112";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 77){
                    //     this.hospitalNum = "109";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 78){
                    //     this.hospitalNum = "110";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 79){
                    //     this.hospitalNum = "108";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 111){
                    //     this.hospitalNum = "115";
                    //     // this.getService();
                    //     this.getSubject();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }

                }
            }).catch(err=>{
                console.log(err);
            })
        },
        
    },
    mounted(){
        if(Object.keys(this.$route.query).length != 0){
            console.log(this.$route)
            this.treatId = this.$route.query.treatCard;
            this.name = this.$route.query.name;
            this.idCard = this.$route.query.idCard;
            this.phone = this.$route.query.phone;
            // this.opName = this.$route.query.opName;
            this.orderNumber = this.$route.query.orderNumber;
            this.optioner = this.$route.query.optioner;
            this.sex = this.$route.query.sex;
            this.icCardBulr();
        }else{
            var ws = new WebSocket("ws://127.0.0.1:8804");
            ws.onopen = function() { 
                console.log("连接websocket成功");
            };
            ws.onmessage = evt=> {
                var data = JSON.parse(evt.data);
                console.log(data);
                this.icCardBulr();
                this.treatId = data.msg.medical_card_number;
                this.name = data.msg.first_name;
                this.idCard = data.msg.id_number;
                this.phone = data.msg.phone_number;
                this.sex = data.msg.sex;
            };
            ws.onclose = function(evt) {
                console.log("Connection closed.");
            };
        }
        

        // axios.get(baseUrl + 'api/his/hospital_list')
        // .then(res=>{
        //     // console.log(res);
        //     this.hospitalArr = res.data.msg;
        //     this.hospitalArr_new = res.data.msg;
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        this.getHospital();
        



        // 获取ifream内容
        function UrlSearch(path, param) {
            var name;
            var str = decodeURI(path); //取得整个地址栏
            var num = str.indexOf("?")
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
            var arr = str.split("&"); //各个参数放到数组里
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    name = arr[i].substring(0,num);
                    if (name === param) {
                        return arr[i].substr(num+1);
                    }
                    continue;
                }
            }
        };
        var url = window.location.href;
        this.opName = UrlSearch(url, 'opName');
        this.opNo = UrlSearch(url, 'opNo');
        console.log(this.opName)
    

        

        // socket
        // console.log(this.name)
        
    },
    computed: {
        // searchData: function() {
        //     var search = this.source;
        //     if (search) {
        //         return this.sourceArr.filter(function(product) {
        //             return Object.keys(product).some(function(key) {
        //                 return String(product[key]).toLowerCase().indexOf(search) > -1
        //             })
        //         })
        //     }
        //     return this.sourceArr;
        // }
    }
}
</script>
<style lang="scss" scoped>
    @import './order.scss'
</style>
<style>
    .el-input>.el-input__inner{
        color: #666 !important;
    }
    input::-webkit-input-placeholder{
        color: #666 !important;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background-color: #ddd;
    }
    .el-autocomplete-suggestion li.highlighted, .el-autocomplete-suggestion li:hover{
        background-color: #ddd;
    }
</style>

