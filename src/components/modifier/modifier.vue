<template>
    <div class="modifier">
        <div class="modifier_header">
            <p>
                <span>{{msg}}</span>
            </p>
            <p>
                <ul>
                    <li>
                        <span>设备编号：</span>
                    </li>
                    <li>
                        <el-input placeholder="请输入设备编号" v-on:blur="bulrDevice" v-model="deviceInput" v-bind:disabled="deviceNum"></el-input>
                    </li>
                    <li style="margin-left:10px">
                        <el-button @click="editDevice">编辑</el-button>
                    </li>
                </ul>
            </p>
        </div>
        <div class="modifier_main clear">
            <div class="main_top clear">
                <ul>
                    <li style="width:30%;">
                        <el-button type="warning" style="float:right" @click="getPrevUserMsg" v-loading.fullscreen.lock="loading">最近一条</el-button>
                    </li>
                    <li style="width:50%;">
                        <el-select @focus="enter" v-model="deviceSelect" v-loading.fullscreen.lock="loading" v-on:change="selectUser" clearable style="width:90%" filterable placeholder="==请选择==" :filterMethod="deviceFilter">
                            <el-option v-for="item in deviceMsgArr"  :key="item.name"  :label="item.name" :value="item.id">
                                <span>{{item.name}}</span>
                                <span style="margin-left:5px;">{{item.sex}}</span>
                                <span style="float:right">{{item.is_gzt}}</span>
                            </el-option>
                        </el-select>
                    </li>
                </ul>
            </div>
            <div class="mian_msg clear">
                <h1><span>用户信息</span><span v-show="gztShow_m" :style="{color: bgcolor_m,float:right,fontSize: fontSize + 'px' }">{{gztMsg}}</span></h1>
                <div class="main_msg_left">
                    <img :src="idImg" style="width:110px;height:130px;" alt="">
                    <img :src="faceImg" style="width:110px;height:130px;" alt="">
                    <el-button @click="healthCard" style="margin-top:20px" type="warning" v-model="healthCard">同步电子卡</el-button>
                </div>
                <ul>
                    <li>
                        <label for="">姓名：</label>
                        <el-input placeholder="姓名" v-on:input="nameValue(name)" v-model="name"></el-input>
                    </li>
                    <li>
                        <label for="">性别：</label>
                        <!-- <el-input placeholder="性别" v-model="sex"></el-input> -->
                        <el-select v-model="sex" @focus="enter" clearable  style="width:64%" filterable placeholder="性别" :filterMethod="sexFilter">
                            <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <!-- <span style="float:right">{{item.name}}</span> -->
                            </el-option>
                        </el-select>
                    </li>
                    <li style="width:100%">
                        <label for="">身份证：</label>
                        <el-input placeholder="身份证" v-model="idCard" style="width:81%"></el-input>
                    </li>
                    <li>
                        <label for="">国籍：</label>
                        <!-- <el-input placeholder="国籍" v-model="country"></el-input> -->
                        <el-select @focus="enter" v-model="country" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="countryFilter">
                            <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <span style="float:right">{{item.name}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">生日：</label>
                        <el-input placeholder="生日" v-model="birthday"></el-input>
                    </li>
                    <li>
                        <label for="">民族：</label>
                        <!-- <el-input placeholder="民族" v-model="nation"></el-input> -->
                        <el-select @focus="enter" v-model="nation" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="nationFilter">
                            <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <span style="float:right">{{item.name}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">年龄：</label>
                        <el-input placeholder="年龄" v-model="age"></el-input>
                    </li>
                    <li style="width:100%;border-bottom:1px dashed #ccc;padding-bottom:3%;height:60px">
                        <label for="">户口地址：</label>
                        <el-input placeholder="户口地址" v-model="homeTown" style="width:81%"></el-input>
                    </li>
                    <li style="width:100%">
                        <label for="">现住址：</label>
                        <el-input placeholder="现住址" v-model="address" style="width:81%"></el-input>
                    </li>
                    <li>
                        <label for="">居住地：</label>
                        <!-- <el-input placeholder="居住地" v-model="place"></el-input> -->
                        <el-select @focus="enter" v-model="place" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="placeFilter">
                            <el-option v-for="item in placeArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <span style="float:right">{{item.name}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">婚姻：</label>
                        <!-- <el-input placeholder="婚姻" v-model="marry"></el-input> -->
                        <el-select @focus="enter" v-model="marry" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="marryFilter">
                            <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <span style="float:right">{{item.name}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">职业：</label>
                        <!-- <el-input placeholder="职业" v-model="job"></el-input> -->
                        <el-select @focus="enter" v-model="job" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="jobFilter">
                            <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                <span>{{item.value}}</span>
                                <span style="float:right">{{item.name}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">发卡人：</label>
                        <el-input placeholder="发卡人" disabled v-model="fkPerson"></el-input>
                    </li>
                    <li>
                        <label for="">接待客服：</label>
                        <!-- <el-input placeholder="接待客服" v-model="service"></el-input> -->
                        <el-select @focus="enter" v-model="service" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="serviceFilter">
                            <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                <span>{{item.doc_name}}</span>
                                <span style="float:right">{{item.pinyin}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="">建档时间：</label>
                        <el-input placeholder="建档时间" disabled v-model="createTime"></el-input>
                    </li>
                    <li>
                        <label for="">预约号：</label>
                        <el-input placeholder="预约号" v-model="orderNum"></el-input>
                    </li>

                </ul>
            </div>
            <div class="main_right clear">
                <h1>手机验证</h1>
                <ul class="clear">
                    <li>
                        <label for="">原手机号：</label>
                        <el-input placeholder="原手机号" disabled v-model="oldPhone"></el-input>
                    </li>
                    <li>
                        <label for="">新手机号：</label>
                        <el-input placeholder="新手机号" v-model="newPhone"></el-input>
                    </li>
                    <li>
                        <el-input placeholder="请输入验证码" v-model="code" style="width:66%" ></el-input>
                        <el-button type="warning" style="float:right" @click="getCode" :disabled="getcodeDisabled" v-loading.fullscreen.lock="loading">获取验证码</el-button>
                    </li>
                    <li style="border-bottom:1px dashed #ccc; margin-top:20px;padding-bottom:3%;height:60px">
                        <!-- <el-input placeholder="请输入验证码" v-model="code" style="width:66%" ></el-input> -->
                        <el-button type="warning" style="float:right" :disabled="changePhoneDisabled" @click="changePhone" v-loading.fullscreen.lock="loading">更换手机</el-button>
                    </li>
                    <h1 style="margin-top:15%;"><span>就诊卡号</span></h1>
                    <li style="margin-top:20px;">
                        <label for="">就诊卡号：</label>
                        <el-input placeholder="就诊卡号" disabled v-model="icCard"></el-input>
                    </li>
                </ul>
            </div>
            <!-- <ul class="clear">
                <li>
                    <label for="">就诊卡号：</label>
                    <el-input  placeholder="就诊卡号：" style="float:left;width:70%" v-model="treatCard" disabled></el-input>
                </li>
                <li>
                    <label for="">姓名：</label>
                    <el-input  placeholder="姓名：" style="float:left;width:70%" v-model="name"></el-input>
                </li>
                <li>
                    <label for="">性别：</label>
                    <el-input  placeholder="性别：" style="float:left;width:70%"></el-input>
                </li>
                <li>
                    <label for="">身份证：</label>
                    <el-input  placeholder="身份证：" style="float:left;width:70%" v-model="idCard"></el-input>
                </li>
                <li>
                    <label for="">手机号：</label>
                    <el-input  placeholder="手机号：" style="float:left;width:70%" v-model="phone"></el-input>
                </li>
                <li>
                    <label for="">婚姻：</label>
                    <el-input  placeholder="婚姻：" style="float:left;width:70%"></el-input>
                </li>
                <li>
                    <label for="">年龄：</label>
                    <el-input  placeholder="年龄：" style="float:left;width:70%" v-model="age"></el-input>
                </li>
                <li>
                    <label for="">生日：</label>
                    <el-input  placeholder="生日：" style="float:left;width:70%"></el-input>
                </li>
                <li>
                    <label for="">民族：</label>
                    <el-input  placeholder="民族：" style="float:left;width:70%"></el-input>
                </li>
                <li>
                    <label for="">地址：</label>
                    <el-input  placeholder="地址：" style="float:left;width:70%"></el-input>
                </li>
                <li>
                    <label for="">居住地：</label>
                    <el-input  placeholder="居住地：" style="float:left;width:70%"></el-input>
                </li>
            </ul> -->
        </div>
        <div class="modifier_footer">
             <el-button type="warning" @click="back">返回上一页</el-button>
              <el-button type="warning" style="float:right" v-bind:disabled="disabled" @click="modifierBtn">确认修改</el-button>
        </div>



        
        <!-- 弹窗提示问题 -->

        <el-dialog title="提示" :visible.sync="tipsPop" width="30%" >
            <span>{{tips}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="tipsPop = false">关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" :close-on-press-escape="true" >
            <span>请确认以上信息无误</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmBtn" v-loading.fullscreen.lock="loading">确 定</el-button>
            </span>
        </el-dialog>




        <!-- 国政通弹窗 -->
        <el-dialog title="提示" :visible.sync="gztPop" width="30%" >
            <span>{{gztTips}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="gztPop = false">关 闭</el-button>
            </span>
        </el-dialog>


        <el-dialog
            title="提示"
            :visible.sync="addShow"
            width="30%"
            center>
            <div class="card_msg">
                <h1></h1>
                <h2><span>姓名：</span><span>{{name}}</span></h2>
                <h2><span>性别：</span><span>{{sex}}</span></h2>
                <h2><span>健康卡号：</span><span>{{health_card}}</span></h2>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addShow = false" type="warning">关 闭</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import baseUrl from '../base/baseUrl.js';
import axios from 'axios';
import country from '../country.js';
import nation from '../nation.js';
import area from '../area.js';
export default {
    data(){
        return {
            msg: '修改信息',
            disabled: false,
            treatCard: '',
            name: '',
            age: '',
            oldPhone: '',
            newPhone: '',
            idCard: '',
            country: '中国',
            birthday: '',
            sex: '',
            homeTown: '',
            address: '',
            place: '乌鲁木齐',
            marry: '已婚',
            job: '个体经营者',
            nation: '',
            createTime: '',
            fkPerson: '',
            service: '',
            idImg: require('../../assets/background_idcard.png'),
            faceImg: require('../../assets/background_faceid.png'),
            code: '',
            icCard: '',
            hospitalNum: '',
            orderNum: '',
            opName: '',
            opNo: '',



            // 弹窗
            tips: '',
            tipsPop: false,


            // loading
            loading: false,
            dialogVisible: false,


            // disabled
            deviceNum: true,
            deviceInput: localStorage.getItem("deviceId"),//设备值,//设备输入框的值
            deviceMsgArr: [],
            deviceSelect: '',
            changePhoneDisabled: true,
            getcodeDisabled: false,


            sexArr: [{name: "N",value: "男"},{name: "N",value: "女"}],//性别
            sexArr_new: [],//性别
            countryArr: country,
            countryArr_new: country,
            nationArr: nation,
            nationArr_new: nation,
            placeArr: area,
            placeArr_new: area,
            marryArr: [
                        {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
            ],
            marryArr_new: [
                        {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
            ],
            jobArr: [
                {name:"GJGWY",value:"国家公务员"},{name:"ZYJSRY",value:"专业技术人员"},{name:"ZY",value:"职员"},
                    {name:"QYGLRY",value:"企业管理人员"},{name:"GR",value:"工人"},{name:"NM",value:"农民"},
                    {name:"XS",value:"学生"},{name:"XYJR",value:"现役军人"},{name:"ZYZYZ",value:"自由职业者"},
                    {name:"GTJYZ",value:"个体经营者"},{name:"WYRY",value:"无业人员"},{name:"TXRY",value:"退（离）休人员"},
                    {name:"QT",value:"其他"},
            ],
            jobArr_new: [
                {name:"GJGWY",value:"国家公务员"},{name:"ZYJSRY",value:"专业技术人员"},{name:"ZY",value:"职员"},
                    {name:"QYGLRY",value:"企业管理人员"},{name:"GR",value:"工人"},{name:"NM",value:"农民"},
                    {name:"XS",value:"学生"},{name:"XYJR",value:"现役军人"},{name:"ZYZYZ",value:"自由职业者"},
                    {name:"GTJYZ",value:"个体经营者"},{name:"WYRY",value:"无业人员"},{name:"TXRY",value:"退（离）休人员"},
                    {name:"QT",value:"其他"},
            ],
            hospitalArr: [],
            hospitalArr_new: [],
            serviceArr_new: [],
            serviceArr: [],


            newIdImg: '',
            newFaceImg: '',

            gztMsg: '',
            gztResult: '',
            gztShow_m: '',//国政通显示隐藏
            bgcolor_m: '',//国政通字体颜色
            right: "right",
            fontSize: "14",


            newGzt: '',
            newGzt_source: '',

            gztTips: '',
            gztPop: false,



            addShow: false,
            health_card: '',

        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },

        enter(){

        },

        // 设备输入框失去焦点
        bulrDevice(){
            this.deviceNum = true;
            axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput + "/list")
            .then(res=>{
                console.log(res);
                if(res.data.status == 200040){
                    this.deviceMsgArr = res.data.msg;
                    this.deviceMsgArr_new = res.data.msg;
                    for (var i=0;i<this.deviceMsgArr.length;i++){
                        if(this.deviceMsgArr[i].sex == 0){
                            this.deviceMsgArr[i].sex="男"; //改变列表渲染的
                        }else if(this.deviceMsgArr[i].sex == 1){
                            this.deviceMsgArr[i].sex="女";
                        };

                        if(this.deviceMsgArr[i].is_gzt == -2){
                            this.deviceMsgArr[i].is_gzt="失败"; //改变列表渲染的
                        }else if(this.deviceMsgArr[i].is_gzt == 1){
                            this.deviceMsgArr[i].is_gzt="成功";
                        };
                    }
                }
                
            }).catch(err=>{
                console.log(err);
            })
        },  

        // 编辑设备输入框
        editDevice(){
            this.deviceNum = false;
        },

//      监听输入框是否有值
        nameValue(){

        },



        // 选择用户
        selectUser(){
            const loading = this.$loading({
                lock: true,
                text: '国政通验证身份中..请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 1)',
                customClass: 'loadingFontSize'
            });

            axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput + "/" + this.deviceSelect)
            .then(res=>{
                console.log(res);
                loading.close();
                if(res.data.status == 200040){
                    if(this.idCard == res.data.msg.id_number){
                        this.faceImg = "data:image/png;base64," + res.data.msg.face_image;
                        this.idImg = "data:image/png;base64," + res.data.msg.id_image;
                        this.newIdImg = res.data.msg.id_image;
                        this.newFaceImg = res.data.msg.face_image;

                        this.newGzt = res.data.msg.is_gzt;
                        this.newGzt_source = res.data.msg.score;
                        
                        // 国政通结果
                        if(res.data.msg.is_gzt != 1){
                            this.gztMsg = "国政通校验失败";
                            this.gztShow_m = true;
                            this.bgcolor_m = "red";
                        }else if(res.data.msg.is_gzt == 1){
                            this.gztMsg = "国政通校验成功";
                            this.gztShow_m = true;
                            this.bgcolor_m = "blue";
                            this.gztResult = true;
                        }
                    }else if(this.idCard != res.data.msg.id_number){
                        this.gztTips = "身份证与用户信息不匹配";
                        this.gztPop = true;
                    }   

                }else{
                    this.faceImg = require('../../assets/background_idcard.png');
                    this.idImg = require("../../assets/background_faceid.png");
                    this.tips = res.data.status + res.data.desc;
                    this.tipsPop = true;
                }
                
            }).catch(err=>{
                console.log(err);
                loading.close();
                this.tips = err;
                this.tipsPop = true;
            })
        },

        // 获取最近一条用户信息
        getPrevUserMsg(){
            if(this.deviceMsgArr.length == 0){
                    this.tips = "暂无设备信息";
                    this.tipsPop = true;
                }else{
                    const loading = this.$loading({
                        lock: true,
                        text: '国政通验证身份中..请稍后',
                        spinner: 'el-icon-loading',
                        background: 'rgba(255, 255, 255, 1)',
                        customClass: 'loadingFontSize'
                    });
                    axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput)
                    .then(res=>{
                        console.log(res);
                        loading.close();
                        if(res.data.status == 200040){
                            
                            if(this.idCard == res.data.msg.id_number){
                                this.faceImg = "data:image/png;base64," + res.data.msg.face_image;
                                this.idImg = "data:image/png;base64," + res.data.msg.id_image;
                                this.newIdImg = res.data.msg.id_image;
                                this.newFaceImg = res.data.msg.face_image;
                                this.newGzt = res.data.msg.is_gzt;
                                this.newGzt_source = res.data.msg.score;
                                // 国政通结果
                                if(res.data.msg.is_gzt != 1){
                                    this.gztMsg = "国政通校验失败";
                                    this.gztShow_m = true;
                                    this.bgcolor_m = "red";
                                }else if(res.data.msg.is_gzt == 1){
                                    this.gztMsg = "国政通校验成功";
                                    this.gztShow_m = true;
                                    this.bgcolor_m = "blue";
                                    this.gztResult = true;
                                }
                            }else if(this.idCard != res.data.msg.id_number){
                                this.gztTips = "身份证与用户信息不匹配";
                                this.gztPop = true;
                            }

                        }else{
                            this.faceImg = require('../../assets/background_idcard.png');
                            this.idImg = require("../../assets/background_faceid.png");
                            this.tips = res.data.status + res.data.desc;
                            this.tipsPop = true;
                        }
                    }).catch(err=>{
                        console.log(err);
                        loading.close();
                        this.tips = err;
                        this.tipsPop = true;
                    })
                }
        },
        getDeviceMsg(){
            console.log(this.deviceInput)
            if(this.deviceInput == '' || this.deviceInput == null){
                this.tips = "请先输入设备编号"
                this.tipsPop = true;
            }else{
                var data = JSON.parse(this.$route.query.data);
                if(data.PHYSI_SEX_NAME == "男"){
                    axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput + "/listm")
                    .then(res=>{
                        console.log(res);
                        if(res.data.status == 200040){
                            this.deviceMsgArr = res.data.msg;
                            this.deviceMsgArr_new = res.data.msg;
                            for (var i=0;i<this.deviceMsgArr.length;i++){
                                if(this.deviceMsgArr[i].sex == 0){
                                    this.deviceMsgArr[i].sex="男"; //改变列表渲染的
                                }else if(this.deviceMsgArr[i].sex == 1){
                                    this.deviceMsgArr[i].sex="女";
                                };
                                if(this.deviceMsgArr[i].is_gzt == -2){
                                    this.deviceMsgArr[i].is_gzt="失败"; //改变列表渲染的
                                }else if(this.deviceMsgArr[i].is_gzt == 1){
                                    this.deviceMsgArr[i].is_gzt="成功";
                                };
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }else if(data.PHYSI_SEX_NAME == "女"){
                    axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput + "/listw")
                    .then(res=>{
                        console.log(res);
                        if(res.data.status == 200040){
                            this.deviceMsgArr = res.data.msg;
                            this.deviceMsgArr_new = res.data.msg;
                            for (var i=0;i<this.deviceMsgArr.length;i++){
                                if(this.deviceMsgArr[i].sex == 0){
                                    this.deviceMsgArr[i].sex="男"; //改变列表渲染的
                                }else if(this.deviceMsgArr[i].sex == 1){
                                    this.deviceMsgArr[i].sex="女";
                                };
                                if(this.deviceMsgArr[i].is_gzt == -2){
                                    this.deviceMsgArr[i].is_gzt="失败"; //改变列表渲染的
                                }else if(this.deviceMsgArr[i].is_gzt == 1){
                                    this.deviceMsgArr[i].is_gzt="成功";
                                };
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }   
                
            }
        },



        // 过滤
        deviceFilter(val) {
            if (val) {
                var tempArr = [];
                this.deviceMsgArr_new.forEach(function(opt, index){
                if (opt['sex'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.deviceMsgArr = tempArr;
            } else {
                this.deviceMsgArr = this.deviceMsgArr_new;
            }
        },
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
        placeFilter(val) {
            if (val) {
                var tempArr = [];
                this.placeArr_new.forEach(function(opt, index){
                if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.placeArr = tempArr;
            } else {
                this.placeArr = this.placeArr_new;
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






        // 获取验证码按钮
        getCode(){
            var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
            if(!phoneReg.test(this.newPhone)){
                this.tips = "请输入正确的手机号";
                this.tipsPop = true; 
            }else{
                this.loading = true;
                axios.get(baseUrl + "api/auth/verify/check/" + this.newPhone)
                .then(res=>{
                    console.log(res);
                    if(res.data.status == 200001){
                        this.loading = false;
                        this.changePhoneDisabled = false;
                        this.getcodeDisabled = true;
                    }
                }).catch(err=>{
                    console.log(err);
                    this.loading = false;
                    this.tips = err;
                    this.tipsPop  = true;
                })
            }
        },
        changePhone(){
            if(this.code == ''){
                this.tips = "请先输入验证码";
                this.tipsPop = true;
            }else {
                this.loading = true;
                axios.post(baseUrl + "api/auth/sms_code/is_valid", JSON.stringify({
                    "phone": this.newPhone,
                    "sms_code": this.code
                }))
                .then(res=>{
                    console.log(res);
                    this.loading = false;
                    if(res.data.status == 200027){
                        var data = {
                            "medical_card_id": this.icCard,
                            "name": this.name,
                            "sex": this.sex,
                            "birthday": this.birthday,
                            "identif": this.idCard,
                            "identif_addr": this.homeTown,
                            "phone": this.newPhone,
                            "nation": this.nation,
                            "nationality": this.country,
                            "marriage": this.marry,
                            "occupation": this.job,
                            "area": this.place,
                            "per_cus_service": this.service,
                            "per_service": this.orderNum,
                            "op_issuer": this.opName,
                            "op_no": this.opNo,
                            "op_name": this.opName,
                            "op_issuer_no": this.opNo,
                            "live_addr": this.address
                        };
                        this.loading = true;
                        axios.post(baseUrl + "api/mq/modify_patient",data)
                        .then(res=>{
                            console.log(res);
                            this.loading = false;
                            if(res.data.status == 200320){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }else{
                                this.tips = res.data.desc;
                                this.tipsPop = true;
                            }
                        }).catch(err=>{
                            console.log(err);
                            this.loading = false;
                            this.tips = err;
                            this.tipsPop = true;
                        })
                    }else if(res.data.status == 400007){
                        this.tips = "验证码错误" + res.data.status;
                        this.tipsPop = true;
                    }
                }).catch(err=>{
                    this.loading = false;
                    this.tips = err;
                    this.tipsPop = true;
                })
            }
        },





        modifierBtn(){
            var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
            if(!phoneReg.test(this.oldPhone)){
                this.tips = "请输入正确的手机号";
                this.tipsPop = true; 
            }else{
                this.dialogVisible = true;
                // this.$alert('这是一段内容', '标题名称', {
                //     confirmButtonText: '确定',
                //     showCancelButton: true,
                //     callback: action => {
                //         this.$message({
                //         type: 'warning',
                //         message: `action: ${ action }`
                //         });
                //     }
                // });
            };
            // "id_face_image": this.userFaceImg,
                // "scene_face_image": this.userSceneImg,
                // console.log(this.faceImg);
        },
        confirmBtn(){
            this.loading = true;
            this.dialogVisible = false;
            var data = JSON.stringify({
                "medical_card_id": this.icCard,
                "name": this.name,
                "sex": this.sex,
                "birthday": this.birthday,
                "identif": this.idCard,
                "identif_addr": this.homeTown,
                "phone": this.oldPhone,
                "nation": this.nation,
                "nationality": this.country,
                "marriage": this.marry,
                "occupation": this.job,
                "area": this.place,
                "per_cus_service": this.service,
                "per_service": this.orderNum,
                "op_issuer": this.opName,
                "op_no": this.opNo,
                "op_name": this.opName,
                "op_issuer_no": this.opNo,
                "live_addr": this.address,
                "id_face_image": this.newIdImg,
                "scene_face_image": this.newFaceImg
            });
            var newData = JSON.stringify({
                "medical_card_id": this.icCard,
                "name": this.name,
                "sex": this.sex,
                "birthday": this.birthday,
                "identif": this.idCard,
                "identif_addr": this.homeTown,
                "phone": this.newPhone,
                "nation": this.nation,
                "nationality": this.country,
                "marriage": this.marry,
                "occupation": this.job,
                "area": this.place,
                "per_cus_service": this.service,
                "per_service": this.orderNum,
                "op_issuer": this.opName,
                "op_no": this.opNo,
                "op_name": this.opName,
                "op_issuer_no": this.opNo,
                "live_addr": this.address,
                "id_face_image": this.newIdImg,
                "scene_face_image": this.newFaceImg
            });
            if(this.newPhone != ''){
                axios.post(baseUrl + "api/mq/modify_patient", newData)
                .then(res=>{
                    console.log(res);
                    this.loading = false;
                    if(res.data.status == 200320){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }else{
                        this.tips = "修改失败" + res.data.status;
                        this.tipsPop = true; 
                    }
                }).catch(err=>{
                    console.log(err);
                    this.tips = "服务器错误" + err;
                    this.tipsPop = true;
                    this.loading = false;
                })
            }else{
                axios.post(baseUrl + "api/mq/modify_patient", data)
                .then(res=>{
                    console.log(res);
                    this.loading = false;
                    if(res.data.status == 200320){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }else{
                        this.tips = "修改失败" + res.data.status;
                        this.tipsPop = true; 
                    }
                }).catch(err=>{
                    console.log(err);
                    this.loading = false;
                    this.tips = "服务器错误" + err;
                    this.tipsPop = true;
                })
            }
            
        },



        // 电子卡
        healthCard(){
            console.log(this.newGzt);
            console.log(this.gztResult);
            if(this.newGzt== -1){
                this.gztTips = "未检测到有效人脸，请重新拍照";
                this.gztPop = true;
            }else if(this.newGzt== 0){
                this.gztTips = "国政通连接失败，请重新试一次";
                this.gztPop = true;
            }else if(this.newGzt== -2){
                this.gztTips = "国政通验证失败，人脸匹配度太低" + this.newGzt_source;
                this.gztPop = true;
            }else if(this.gztResult == false){
                this.gztTips = "国政通验证失败，数据源为false";
                this.gztPop = true;
            }else if(this.gztResult == true && this.newGzt == 1){
                axios.post(baseUrl + 'api/accounts/user/health_card/rebuild', JSON.stringify({
                    "medical_card_number": this.icCard,
                    "name": this.name,
                    "id_number": this.idCard,
                    "phone": this.oldPhone
                })).then(res=>{
                    console.log(res);
                    if(res.data.status == 200025){
                        this.addShow = true;
                        this.name = res.data.msg.name;
                        this.sex = res.data.msg.sex;
                        this.health_card = res.data.msg.health_card_number;
                    }else if(res.data.status == 400046){
                        this.gztTips = "当前用户已有健康卡号";
                        this.gztPop = true;
                    }
                }).catch(error=>{

                })
            }
        },

        

        // 获取机构与客服列表
        getHospital(){
            axios.get(baseUrl + 'api/his/hospital_list')
            .then(res=>{
                console.log(res,"医院列表");
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
                                this.getService();
                            }
                        };



                    // if(tempHospitalNum == 76){
                    //     this.hospitalNum = "111";
                    //     this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 73){
                    //     this.hospitalNum = "114";
                    //     this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 74){
                    //     this.hospitalNum = "113";
                    //     this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 75){
                    //     this.hospitalNum = "112";
                    //     this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 77){
                    //     this.hospitalNum = "109";
                    //     this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 78){
                    //     this.hospitalNum = "110";
                    //     this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    // }else if(tempHospitalNum == 79){
                    //     this.hospitalNum = "108";
                    //     this.getService();
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
        
        // 获取客服列表
        getService(){
            console.log(this.hospitalNum)
            axios.get(baseUrl + "api/sys/get_wait_doctor?hos_id=" + this.hospitalNum)
            .then(res=>{
                console.log(res);
                if(res.data.status == 200026){
                    this.serviceArr = res.data.msg;
                    this.serviceArr_new = res.data.msg;
                }else{
                    this.tips = res.data.status + res.data.desc;
                    this.tipsPop = true;
                }
            }).catch(err=>{
                console.log(err);
                this.tips = err;
                this.tipsPop = true;
            })
        },

    },
    mounted(){
        this.getDeviceMsg();
        this.getHospital();
        // this.getService();
        if(this.$route.query != ''){
            var data = JSON.parse(this.$route.query.data);
            console.log(data);
            var date = new Date();
            var year = date.getFullYear();

            this.name = data.PAT_NAME;
            this.sex = data.PHYSI_SEX_NAME;
            this.idCard = data.ID_NUMBER;
            this.country = data.NATION_NAME;
            this.nation = data.ETHNIC_NAME;
            this.birthday = (data.DATE_BIRTH).slice(0, 10);
            this.age = year - (data.DATE_BIRTH).slice(0,4);
            this.homeTown = data.HUKOU_ADDR;
            this.place = data.ADDR;
            this.marry = data.MARITAL_STATUS_NAME;
            this.job = data.OCCUPATION_CATEG_NAME;
            this.address = data.CURR_ADDR;
            this.service = data.BANK;
            this.fkPerson = data.OPPERATER;
            this.createTime = (data.REGIST_DATE).replace("T", " ");
            this.oldPhone = data.PHONE_NO_HOME;
            this.icCard = data.CARD_ID_NUMBER;
            this.orderNum = data.WORK_UNITS;
            this.opName = data.OPERATOR_NAME;
            this.opNo = data.OPERATOR_CODE;
            

            this.gztResult = data.is_gzt;
            // 国政通结果
            if(data.is_gzt == true){
                this.gztMsg = "国政通校验成功";
                this.gztShow_m = true;
                this.bgcolor_m = "blue";
                this.newGzt = 1;
            }else if(data.is_gzt == false){
                this.gztMsg = "国政通校验失败";
                this.gztShow_m = true;
                this.bgcolor_m = "red";
                this.newGzt = -1;
            }



            axios.post(baseUrl+ "api/accounts/user/img" ,JSON.stringify({
                "medical_card_number": data.CARD_ID_NUMBER
            })).then(res=>{
                console.log(res);
                if(res.data.status == 200004){
                    if(res.data.msg.id_image != '' && res.data.msg.face_image != ''){
                        this.faceImg = res.data.msg.face_image;
                        this.idImg = res.data.msg.id_image;
                        this.newIdImg = res.data.msg.id_image;
                        this.newFaceImg = res.data.msg.face_image;
                    }else if(res.data.msg.face_image == '' && res.data.msg.id_image != ''){
                        this.idImg = res.data.msg.id_image;
                        this.newIdImg = res.data.msg.id_image;
                        this.faceImg = require("../../assets/background_faceid.png");
                    }else{
                        this.idImg = require('../../assets/background_idcard.png');
                        this.faceImg = require("../../assets/background_faceid.png");
                    }
                }
            }).catch(err=>{
                console.log(err);
                this.tips = err;
                this.tipsPop = true;
            })
        };

        
        
    }
    
}
</script>
<style lang="scss" scoped>
    @import './modifier.scss'
</style>
