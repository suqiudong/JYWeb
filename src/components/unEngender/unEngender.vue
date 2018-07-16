<template>
    <div class="unEngender">
        <div class="unEngender_header">
            <p><span>{{msg}}</span></p>
            <p>
                <ul>
                    <li>
                        <span>设备编号：</span>
                    </li>
                    <li>
                        <el-input placeholder="请输入设备编号" v-model="deviceInput" v-bind:disabled="deviceNum"></el-input>
                    </li>
                    <li style="margin-left:10px">
                        <el-button @click="editDevice">编辑</el-button>
                    </li>
                </ul>
            </p>
        </div>
        <div class="unEngender_main">
            <!-- <div class="unEngender_top">
                <el-button type="warning" @click="getUserMsg" v-loading.fullscreen.lock="loading">获取人脸照片</el-button>
            </div> -->
            <!-- 信息 -->
            <div class="unEngender_msg">
                <el-card class="box-card" style="width: 100%">
                    <div slot="header" class="clearfix">
                        <span>用户信息</span><el-button style="float:right" type="warning" @click="getUserMsg">获取人脸</el-button>
                        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
                    </div>
                    <div class="text item">
                        <div class="usermsg_left" v-show="true">
                            <ul>
                                <!-- <li>
                                    <img :src="idCardImg" alt="">
                                </li> -->
                                <li style="margin-top:20px">
                                    <img :src="faceImg" alt="">
                                </li>
                            </ul>
                        </div>
                        <div class="usermsg_right">
                            <ul class="clear">
                                <li>
                                    <label for="" style="width:70px">姓名：</label>
                                    <el-input placeholder="姓名" style="width:70%" v-model="name"></el-input>
                                </li>
                                <li>
                                    <label for="" style="width:70px">性别：</label>
                                    <!-- <el-input placeholder="性别" style="width:70%" v-model="sex"></el-input> -->
                                    <el-select v-model="sex" style="width:70%" filterable placeholder="性别" :filterMethod="sexFilter">
                                        <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <select name="" id="" style="width:65px;height:100%;" v-model="cardType" v-on:change="selectCardType">
                                        <option value="" v-for="(item,index) in cardTypeArr"  v-bind:value="item" :key="index">{{item}}</option>
                                    </select>
                                    <el-input :placeholder="idCardPlaceholder" style="width:70%" v-model="idCard"></el-input>
                                </li>
                                <li v-show="militaryShow">
                                    <label for="" style="width:70px">军区：</label>
                                    <el-autocomplete class="inline-input" v-model="military" :fetch-suggestions="militarySearch"
                                    placeholder="请输入军区"
                                    @select="militarySelect"
                                    ></el-autocomplete>
                                </li>
                                <li>
                                    <label for="" style="width:70px">国籍：</label>
                                    <!-- <el-input placeholder="国籍" style="width:70%" v-model="country"></el-input> -->
                                    <el-select v-model="country"  clearable style="width:70%" filterable placeholder="国籍" :filterMethod="countryFilter">
                                        <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                            <span>{{item.value}}</span>
                                            <span style="float:right">{{item.name}}</span>
                                        </el-option>
                                    </el-select>
                                    <!-- <el-autocomplete
                                    class="inline-input" v-model="countryList" 
                                    :fetch-suggestions="countrySearch" style="width:70%"
                                    placeholder="请输入国家" v-show="countrySelectShow"  @select="countrySelect" >
                                    </el-autocomplete> -->

                                </li>
                                <li>
                                    <label for="" style="width:70px">婚姻：</label>
                                    <!-- <select name="" style="width:70%;height:100%; border-radius:4px" v-model="selectedMarry" v-on:change="selectMarry">
                                        <option value="" v-for="(item,index) in marryArr"  v-bind:value="item" :key="index">{{item}}</option>
                                    </select> -->
                                    <!-- <el-autocomplete
                                    class="inline-input"
                                    v-model="selectedMarry" style="width:70%"
                                    :fetch-suggestions="marrySearch"
                                    placeholder="请输入内容"
                                    @select="marrySelect"
                                    ></el-autocomplete> -->
                                    <el-select v-model="selectedMarry"  clearable style="width:70%" filterable placeholder="婚姻" :filterMethod="marryFilter">
                                        <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                            <span>{{item.value}}</span>
                                            <span style="float:right">{{item.name}}</span>
                                        </el-option>
                                    </el-select>
                                </li>
                                <!-- <li>
                                    <label for="" style="width:70px">年龄：</label>
                                    <el-input placeholder="年龄" style="width:70%" v-model="age"></el-input>
                                </li> -->
                                <li>
                                    <label for="" style="width:70px">生日：</label>
                                    <el-input placeholder="生日(如:2018-06-01)" style="width:70%" v-model="birthday"></el-input>
                                </li>
                                <li>
                                    <label for="" style="width:70px">民族：</label>
                                    <!-- <el-input placeholder="民族" style="width:70%" v-model="nation"></el-input> -->
                                    <el-select v-model="nation"  clearable style="width:70%" filterable placeholder="民族" :filterMethod="nationFilter">
                                        <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <label for="" style="width:70px">地址：</label>
                                    <el-input placeholder="地址" style="width:70%" v-model="address"></el-input>
                                </li>
                                <li>
                                    <label for="" style="width:70px">居住地：</label>
                                    <!-- <select name="" id="" style="width:70%;height:100%; border-radius:4px"  v-model="area" v-on:change="selectArea">
                                        <option value="">==请选择==</option>
                                        <option value="" v-for="(item,index) in areaArr" v-bind:value="item" :key="index">{{item}}</option>
                                    </select> -->
                                    <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="area"
                                :fetch-suggestions="areaSearch"
                                placeholder="请输入内容"
                                @select="areaHandleSelect"
                                ></el-autocomplete> -->
                                <el-select v-model="area"  clearable style="width:70%" filterable placeholder="居住地" :filterMethod="areaFilter">
                                        <el-option v-for="item in areaArr"  :key="item.value"  :label="item.value" :value="item.value">
                                            <span>{{item.value}}</span>
                                            <span style="float:right">{{item.name}}</span>
                                        </el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <label for="" style="width:70px">职业：</label>
                                    <!-- <select name="" id="" style="width:70%;height:100%; border-radius:4px" v-model="job" v-on:change="selectJob">
                                        <option value="">==请选择==</option>
                                        <option value="" v-for="(item,index) in jobArr" v-bind:value="item" :key="index">{{item}}</option>
                                    </select> -->
                                    <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="job"
                                :fetch-suggestions="jobSearch"
                                placeholder="请输入内容"
                                @select="jobHandleSelect"
                                ></el-autocomplete> -->
                                    <el-select v-model="job"  clearable style="width:70%" filterable placeholder="职业" :filterMethod="jobFilter">
                                        <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                            <span>{{item.value}}</span>
                                            <span style="float:right">{{item.name}}</span>
                                        </el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <label for="" style="width:70px">手机号：</label>
                                    <el-input placeholder="手机号" style="width:70%" v-model="phone"></el-input>
                                </li>
                                
                                <li>
                                    <label for="" style="width:70px">发卡人：</label>
                                    <el-input placeholder="发卡人" style="width:70%" disabled v-model="fkPerson"></el-input>
                                </li>
                                <!-- <li>
                                    <label for="" style="width:70px">发卡机构：</label>
                                    <select name="" id="hospital_list" style="width:70%;height:100%; border-radius:4px"  v-on:change="selectHospital" v-model="hospital">
                                        <option value="">==请选择==</option>
                                        <option v-for="(item,index) in hospitalArr" v-bind:value="item.hospitalNo"  :key="index">
                                            {{item.hospitalName}}
                                        </option>
                                    </select>
                                </li> -->
                                <li>
                                    <label for="" style="width:70px">客服：</label>
                                    <!-- <el-input placeholder="客服" style="width:70%" v-model="service"></el-input> -->
                                    <el-select v-model="service"  clearable style="width:70%" filterable placeholder="客服" :filterMethod="serviceFilter">
                                        <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                            <span>{{item.doc_name}}</span>
                                            <span style="float:right">{{item.pinyin}}</span>
                                        </el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <label for="" style="width:70px">就诊卡号：</label>
                                    <el-input placeholder="就诊卡号" style="width:70%" v-bind:disabled="true" v-model="icCard"></el-input>
                                </li>
                                <li>
                                    <label for="" style="width:70px">预约号：</label>
                                    <el-input placeholder="预约号" style="width:70%" v-model="orderNum"></el-input>
                                </li>
                                
                                <li>
                                    <label for="" style="width:70px">创建时间：</label>
                                    <el-input placeholder="创建时间" style="width:70%" disabled v-model="createTime"></el-input>
                                </li>
                                
                                <!-- <li>
                                    <label for="" style="width:70px">来源：</label>
                                    <el-input placeholder="来源" style="width:70%" v-model="origin"></el-input>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="unEngender_footer">
                <el-button type="warning" style="float:left" @click="back">返回上一页</el-button>
            <ul>
                <!-- <li>
                    
                </li> -->
                <li>
                    <el-button type="warning" @click="confirm">确认修改</el-button>
                </li>
            </ul>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
            <span>请确认以上信息无误</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmBtn" v-loading.fullscreen.lock="loading">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import baseUrl from '../base/baseUrl.js'
    import axios from 'axios';
    import countryArr from '../country.js';
    import militaryArr from '../military.js';
    import nation from '../nation.js';
    import area from '../area.js';
    export default {
        data(){
            return{
                msg: '修改信息',
                deviceInput: '',
                deviceNum: true,//设备输入框disabled
                tipMsg: '',//弹窗提示语
                loading: false,//loading加载
                dialogVisible: false,

                // 数组
                cardTypeArr: ["身份证",],//身份类型"军官证","护照"
                militaryArr: militaryArr,//军区
                // marryArr: ["已婚","未婚","再婚","丧偶","其他"],//婚姻
                marryArr: [
                    {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
                ],
                marryArr_new: [
                    {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
                ],
                // areaArr: ["乌鲁木齐","疆内","疆外","国外","吐鲁番","库尔勒","伊宁","安徽","澳门","北京","重庆",
                //         "福建","甘肃","广东","广西","贵州","海南","河北","河南","黑龙江","湖北","湖南","吉林",
                //         "江苏","江西","辽宁","内蒙古 ","宁夏","青海","山东","山西","陕西","上海","四川","台湾",
                //         "天津","西藏","香港","新疆","云南", "浙江"  ],//居住地
                jobArr: [{name:"GJGWY",value:"国家公务员"},{name:"ZYJSRY",value:"专业技术人员"},{name:"ZY",value:"职员"},
                    {name:"QYGLRY",value:"企业管理人员"},{name:"GR",value:"工人"},{name:"NM",value:"农民"},
                    {name:"XS",value:"学生"},{name:"XYJR",value:"现役军人"},{name:"ZYZYZ",value:"自由职业者"},
                    {name:"GTJYZ",value:"个体经营者"},{name:"WYRY",value:"无业人员"},{name:"TXRY",value:"退（离）休人员"},
                    {name:"QT",value:"其他"},],
                jobArr_new: [{name:"GJGWY",value:"国家公务员"},{name:"ZYJSRY",value:"专业技术人员"},{name:"ZY",value:"职员"},
                    {name:"QYGLRY",value:"企业管理人员"},{name:"GR",value:"工人"},{name:"NM",value:"农民"},
                    {name:"XS",value:"学生"},{name:"XYJR",value:"现役军人"},{name:"ZYZYZ",value:"自由职业者"},
                    {name:"GTJYZ",value:"个体经营者"},{name:"WYRY",value:"无业人员"},{name:"TXRY",value:"退（离）休人员"},
                    {name:"QT",value:"其他"},],
                hospitalArr: [],//医院列表
                hospitalArr_new: [],//医院列表

                sexArr: [{name:"N",value:"男"},{name:"N",value:"女"}],
                sexArr_new: [{name:"N",value:"男"},{name:"N",value:"女"}],
                nationArr: nation,//民族
                nationArr_new: nation,
                areaArr: area,
                areaArr_new: area,

                countryArr: countryArr,
                countryArr_new: countryArr,
                // placeholder
                idCardPlaceholder: '身份证号',//

                // 信息
                name: '',
                sex: '',
                idCard: '',
                cardType: '身份证',
                military: '',
                country: '',
                selectedMarry: '已婚',
                countryList: '',
                age: '',
                birthday: '',
                nation: '',
                address: '',
                area: '乌鲁木齐',
                job: '个体经营者',
                phone: '',
                icCard: '',
                service: '',
                fkPerson: '',
                orderNum: '',
                origin: '',
                hospital: '',
                opName: '',
                opNo: '',
                createTime: '',


                // 显示和隐藏部分
                militaryShow: false,
                countryShow: true,
                countrySelectShow: false,
                idCardImg:  require('../../assets/background_idcard.png'),
                faceImg: require("../../assets/background_faceid.png"),

                userFaceImg: '',
                userSceneImg: '',


                fkPersonNum: '',
                hospitalNum: '',
                serviceArr: [],
                serviceArr_new: []
            }
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            editDevice(){
                this.deviceNum = false;
            },

            //弹窗提示语
            popTips() {
                this.$alert(this.tipMsg, '提示', {
                confirmButtonText: '关闭',
                callback: action => {   
                    this.$message({
                    type: 'warning',
                    message: `action: ${ action }`
                    });
                }
                });
            },
            //设备获取信息
            getUserMsg(){
                if(this.deviceInput == ''){
                    this.tipMsg = "请先输入设备编号";
                    this.popTips();
                }else {
                    this.loading = true;
                    axios.get(baseUrl + 'api/sensetime/data/' + this.deviceInput)
                    .then(res=>{
                        this.loading = false;
                        console.log(res);
                        if(res.data.status ==  200040){
                            localStorage.setItem("deviceInput",res.data.msg.device_id);
                            this.idCardImg = "data:image/png;base64," + res.data.msg.id_image;
                            this.faceImg = "data:image/png;base64," + res.data.msg.face_image;
                            this.userFaceImg = res.data.msg.id_image;
                            this.userSceneImg = res.data.msg.face_image;
                        }else{
                            this.tipMsg = "获取设备信息失败" + res.data.status;
                            this.popTips(); 
                        }
                    }).catch(err=>{
                        this.tipMsg = "服务器错误" + err;
                        this.popTips(); 
                        console.log(err);
                    })
                }
            },

            // 选择身份类型
            selectCardType(){
                console.log(this.cardType)
                if(this.cardType == "军官证"){
                    this.militaryShow = true;
                    this.countryShow = false;
                    this.countrySelectShow = true;
                    this.idCardPlaceholder = "军官证号"
                }else if(this.cardType == "护照"){
                    this.countryShow = false;
                    this.countrySelectShow = true;
                    this.militaryShow = false;
                    this.idCardPlaceholder = "护照编号"
                }else if(this.cardType == "身份证"){
                    this.countryShow = true;
                    this.countrySelectShow = false;
                    this.militaryShow = false;
                    this.idCardPlaceholder = "身份证号"
                }
            },

            // 选择军区
            militarySelect(item) {
                console.log(item);
            },
            militarySearch(militaryItem, cb) {
                var militaryArr = this.militaryArr;
                var results = militaryItem ? militaryArr.filter(this.militaryFilter(militaryItem)) : militaryArr;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            militaryFilter(militaryMsg) {
                return (militaryArr) => {
                    return (militaryArr.value.toLowerCase().indexOf(militaryMsg.toLowerCase()) === 0);
                };
            },

            // 选择国家
            // countrySelect(item) {
            //     console.log(item);
            // },
            // countrySearch(countryItem, cb) {
            //     var countryArr = this.countryArr;
            //     var results = countryItem ? countryArr.filter(this.countryFilter(countryItem)) : countryArr;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // countryFilter(countryMsg) {
            //     return (countryArr) => {
            //         return (countryArr.value.toLowerCase().indexOf(countryMsg.toLowerCase()) === 0);
            //     };
            // },


            sexFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.sexArr_new.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.sexArr = tempArr;
                } else {
                    this.sexArr = this.sexArr_new;
                }
            },

            enter(e){
                e.target.click();
            },

            // 婚姻
            // marrySearch(queryString, cb) {
            //     var restaurants = this.marryArr;
            //     var results = queryString ? restaurants.filter(this.marryFilter(queryString)) : restaurants;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // marryFilter(queryString) {
            //     return (restaurant) => {
            //     return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            //     };
            // },
            // marrySelect(item) {
            //     console.log(item);
            //     this.selectedMarry = item.value;
            // },


            // 民族
            nationFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.nationArr_new.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.nationArr = tempArr;
                } else {
                    this.nationArr = this.nationArr_new;
                }
            },

            areaFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.areaArr_new.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.areaArr = tempArr;
                } else {
                    this.areaArr = this.areaArr_new;
                }
            },

            jobFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.jobArr_new.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.jobArr = tempArr;
                } else {
                    this.jobArr = this.jobArr_new;
                }
            },


            // 
            countryFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.countryArr_new.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.countryArr = tempArr;
                } else {
                    this.countryArr = this.countryArr_new;
                }
            },


            marryFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.marryArr_new.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.marryArr = tempArr;
                } else {
                    this.marryArr = this.marryArr_new;
                }
            },


             serviceFilter(val) {
                if (val) {
                    var tempArr = [];
                    this.serviceArr_new.forEach(function(opt, index){
                    if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['doc_name'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.serviceArr = tempArr;
                } else {
                    this.serviceArr = this.serviceArr_new;
                }
            },


            // areaSearch(msg, cb) {
            //     console.log(msg)
            //     var areaArr = this.areaArr;
            //     var results = msg ? areaArr.filter(this.areaFilter(msg)) : areaArr;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // areaFilter(mess) {
            //     return (areaMsg) => {
            //     return (areaMsg.name.toLowerCase().indexOf(mess.toLowerCase()) === 0);
            //     };
            // },
            // areaHandleSelect(item) {
            //     console.log(item);
            //     this.area = item.value;
            // },



            // jobSearch(msg, cb) {
            //     console.log(msg)
            //     var jobArr = this.jobArr;
            //     var results = msg ? jobArr.filter(this.jobFilter(msg)) : jobArr;
            //     // 调用 callback 返回建议列表的数据
            //     cb(results);
            // },
            // jobFilter(mess) {
            //     return (jobMsg) => {
            //     return (jobMsg.name.toLowerCase().indexOf(mess.toLowerCase()) === 0);
            //     };
            // },
            // jobHandleSelect(item) {
            //     console.log(item);
            //     this.job = item.value;
            // },


            // 选择婚姻
            selectMarry(){
                console.log(this.selectedMarry)
            },

            // 选择居住地
            selectArea(){
                console.log(this.area)
            },

            // 选择职业
            selectJob(){
                console.log(this.job)
            },

            // 选择医院
            selectHospital(){

            },

            getBase64Image(img){
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
                        var dataURL = canvas.toDataURL("image/"+ext);
                return dataURL;
            },


            
            confirm(){  
                var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                if(!phoneReg.test(this.phone)){
                    this.tipMsg = "请输入正确的手机号";
                    this.popTips(); 
                }else{
                    this.dialogVisible = true;
                } 
                // var that = this;
                // var img = this.faceImg;//imgurl 就是你的图片路径  
                // var image = new Image();
                // image.src = img;
                // image.onload = function(){
                //     var base64 = that.getBase64Image(image);
                //     console.log(base64);
                // }
            },
            confirmBtn(){
                // "id_face_image": this.userFaceImg,
                    // "scene_face_image": this.userSceneImg,
                
                this.loading = true;
                this.dialogVisible = false;
                axios.post(baseUrl + 'api/mq/modify_patient', JSON.stringify({
                    "medical_card_id": this.icCard,
                    "name": this.name,
                    "sex": this.sex,
                    "birthday": this.birthday,
                    "identif": this.idCard,
                    "identif_addr": this.address,
                    "phone": this.phone,
                    "nation": this.nation,
                    "nationality": this.country,
                    "marriage": this.selectedMarry,
                    "occupation": this.job,
                    "area": this.area,
                    "per_cus_service": this.service,
                    "per_service": this.orderNum,
                    "op_issuer": this.fkPerson,
                    "op_no": this.opNo,
                    "op_name": this.opName,
                    "op_issuer_no": this.fkPersonNum,
                    
                })).then(res=>{
                    this.loading = false;
                    console.log(res);
                    if(res.data.status == 200320){
                        this.successEdit();
                    }else{
                        this.tipMsg = "修改失败" + res.data.status;
                        this.popTips(); 
                    }
                }).catch(err=>{
                    this.loading = false;
                    console.log(err);
                    this.tipMsg = "服务器错误" + err;
                    this.popTips(); 
                })
            },
            successEdit() {
                this.$message({
                message: '修改成功',
                type: 'success'
                });
            },
            falisEdit() {
                this.$message.error('修改失败');
            },


            // 请求图片
            getUserImg(){
                axios.post(baseUrl+ "/api/accounts/user/img" ,JSON.stringify({
                    "id_number": this.$route.query.idCard
                })).then(res=>{
                    console.log(res);
                    if(res.data.status == 200004){
                        if(res.data.msg.face_image != ''){
                            this.faceImg = res.data.msg.face_image;
                            this.idCardImg = res.data.msg.id_image;
                        }else{
                            this.idCardImg = require('../../assets/background_idcard.png');
                            this.faceImg = require("../../assets/background_faceid.png");
                        }
                        
                    }
                }).catch(err=>{

                })
            },
            getService(){
                axios.get(baseUrl + "api/sys/get_wait_doctor?hos_id=" + this.hospitalNum)
                .then(res=>{
                    console.log(res);
                    if(res.data.status == 200026){
                        this.serviceArr = res.data.msg;
                        this.serviceArr_new = res.data.msg;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            getHospitalList(){
                axios.get(baseUrl + "api/his/hospital_list")
                .then(res=>{
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
                        
                        if(tempHospitalNum == 76){
                            this.hospitalNum = "111";
                            this.getService();
                        }else if(tempHospitalNum == 73){
                            this.hospitalNum = "114";
                            this.getService();
                        }else if(tempHospitalNum == 74){
                            this.hospitalNum = "113";
                            this.getService();
                        }else if(tempHospitalNum == 75){
                            this.hospitalNum = "112";
                            this.getService();
                        }else if(tempHospitalNum == 77){
                            this.hospitalNum = "109";
                            this.getService();
                        }else if(tempHospitalNum == 78){
                            this.hospitalNum = "110";
                            this.getService();
                        }else if(tempHospitalNum == 79){
                            this.hospitalNum = "108";
                            this.getService();
                        }

                    }else{
                        this.tipMsg = "获取医院列表失败" + res.data.status + res.data.msg;
                    };


                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted(){  
            this.getHospitalList();
            console.log(this.$route.query)
            this.deviceInput = localStorage.getItem("deviceInput");
            this.name = this.$route.query.name;
            this.age = this.$route.query.age;
            this.idCard = this.$route.query.idCard;
            this.phone = this.$route.query.phone;
            this.icCard = this.$route.query.icCard;
            this.sex = this.$route.query.sex;
            this.country = this.$route.query.country;
            this.nation = this.$route.query.nation;
            this.birthday = this.$route.query.birthday.slice(0,10);
            this.service = this.$route.query.service;
            this.fkPerson = this.$route.query.fkPerson;
            this.orderNum = this.$route.query.orderNum;
            this.selectedMarry = this.$route.query.marry;
            this.address = this.$route.query.address;
            this.job = this.$route.query.job;
            this.area = this.$route.query.area;
            this.createTime = this.$route.query.createTime.replace("T"," ");
            this.fkPersonNum = this.$route.query.fkPersonNum;

            // 请求用户图片
            this.getUserImg();


            // console.log(this.orderNum)
            // ifream
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


            // axios.get(baseUrl + "api/sys/get_wait_doctor?hos_id=" + this.hospitalNum)
            // .then(res=>{
            //     console.log(res);
            //     if(res.data.status == 200026){
            //         this.serviceArr = res.data.msg;
            //         this.serviceArr_new = res.data.msg;
            //     }
            // }).catch(err=>{
            //     console.log(err);
            // })
        }
    }
</script>
<style lang="scss" scoped>
    @import './umEngender.scss'
</style>