<template>
    <div class="card">
        <div class="card_header clear">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="card_main_top">
            <h1  style="float:left;height:40px;width:30%;margin-left:4%;position:relative;margin-bottom:5px">
                <span style="width:40px;height:40px;border: 1px solid #666;display:inline-block;border-radius: 50%;
                font-size:14px;text-align:center;position:absolute;left:0;top:0;line-height:40px;background-color:#e6a23c;">1</span>
                <span style="color:#ccc;height:40px;line-height:40px;position:absolute;left:40px;top:0;">———</span>
                <span style="width:40px;height:40px;border: 1px solid #666;display:inline-block;border-radius: 50%;
                font-size:14px;text-align:center;position:absolute;left:144px;top:0;line-height:40px;background-color:#e6a23c;">2</span>
                <span style="font-size:16px; color:#999;position:absolute;left:194px;top:50%;transform: translate(0%,-50%)">执行用户挂号</span>
            </h1>
                <!-- <h1 style="float:left;height:50px;width:30%;padding-left:4%">
                    <span style="width:40px;height:40px;border-radius:50%;
                    background-color:#e6a23c;display:inline-block;
                    font-size:14px;text-align:center;line-height:40px;border:1px solid #666">1</span>
                    <span style="color:#ccc;height:50px;line-height:50px;">———</span>
                    <span style="width:40px;height:40px;border-radius:50%;
                    background-color:#e6a23c;display:inline-block;
                    font-size:14px;text-align:center;line-height:40px;border:1px solid #666">2</span>
                    <span style="font-size:16px; color:#999;">执行用户挂号</span>
                </h1> -->
        </div>
        <div class="card_main">
            
            
            <ul class="clear">
                <li v-show="womenShow">
                    <span style="position:absolute;left:0;top:0;">女方信息</span>
                    
                    <div class="card_msg">
                        <!-- <h1>{{hospitalName_w}}</h1> -->
                        <h1>新疆佳音医院</h1>
                        <h2><span>姓名：</span><span>{{name_w}}</span></h2>
                        <h2><span>性别：</span><span>{{sex_w}}</span></h2>
                        <h2><span>民族：</span><span>{{nation_w}}</span></h2>
                        <h2><span>就诊卡号：</span><span>{{treat_w}}</span></h2>
                        <el-button style="position:absolute;left:-35%;bottom:2%;" type="warning" @click="code_women" v-loading.fullscreen.lock="fullscreenLoading">生成二维码</el-button>
                    </div>
                    <!-- <div class="card_footer_btn">
                        <el-button type="warning" @click="code_women">生成二维码</el-button>
                        <el-button type="warning" @click="reg_w">立即挂号</el-button>
                    </div> -->
                    <div class="order">
                        <h5>
                            <label for="" style="width:70px">挂号机构：</label>
                            <el-select v-model="hospitalIndex_w" v-on:change="getSubject_w" clearable style="width:80%" filterable placeholder="==请选择==" :filterMethod="hospitalFilter_w">
                                <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                                    <span>{{item.hospitalName}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号科室：</label>
                            <el-select v-model="roomId_w" clearable v-on:input="getRoom_input_w(roomId_w)"  v-on:change="getRoom_w" :disabled="roomDis_w" style="width:80%" filterable placeholder="==请选择==" :filterMethod="roomFilter_w">
                                <el-option v-for="item in roomArr_w"  :key="item.name"  :label="item.name" :value="item.code">
                                    <span>{{item.name}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号类别：</label>
                            <el-select v-model="orderTypeNum_w" clearable  v-on:input="orderSelect_input_w(orderTypeNum_w)"   v-on:change="orderSelect_w" :disabled="registType_w" style="width:80%" filterable placeholder="==请选择==" :filterMethod="roomsFilter_w">
                                <el-option v-for="(item,index) in roomsArr_w"  :key="index"  :label="item.name" :value="item.class_type">
                                    <span>{{item.name}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号医生：</label>
                            <el-select v-model="orderDocId_w" clearable  v-on:change="orderDocSelect_w" :disabled="unEngenderDocDisabled_w" style="width:80%" filterable placeholder="==请选择==" :filterMethod="docFilter_w">
                                <el-option v-for="item in orderDoctor_w"  :key="item.STAFF_NAME"  :label="item.STAFF_NAME" :value="item.STAFF_INDEX_NO">
                                    <span>{{item.STAFF_NAME}}</span>
                                    <span style="float:right">{{item.PINYIN_CODE}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号来源：</label>
                            <el-autocomplete class="inline-input" clearable style="width:80%" v-model="source_w" :fetch-suggestions="querySearch_w" placeholder="请输入内容" @select="handleSelect_w" >
                                <template slot-scope="{ item }">
                                    <span>{{ item.value }}</span>
                                    <span style="float:right">{{ item.name }}</span>
                                </template>
                            </el-autocomplete>
                        </h5>
                        <h5>
                            <el-checkbox v-model="checked_w">购买病历</el-checkbox>
                        </h5>
                        <el-button style="position:absolute;right:0%;bottom:-15%;" v-loading.fullscreen.lock="loading"  v-bind:disabled="orderBtn_w" type="warning" @click="reg_w">立即挂号</el-button>
                    </div>
                </li>
                <li v-show="manShow">
                    <span style="position:absolute;left:0;top:0;">男方信息</span>
                    <div class="card_msg">
                        <!-- <h1>{{hospitalName_m}}</h1> -->
                        <h1>新疆佳音医院</h1>
                        <h2><span>姓名：</span><span>{{name_m}}</span></h2>
                        <h2><span>性别：</span><span>{{sex_m}}</span></h2>
                        <h2><span>民族：</span><span>{{nation_m}}</span></h2>
                        <h2><span>就诊卡号：</span><span>{{treat_m}}</span></h2>
                        <el-button style="position:absolute;left:-35%;bottom:2%;" type="warning" @click="code_man" v-loading.fullscreen.lock="fullscreenLoading">生成二维码</el-button>
                        
                    </div>
                    <!-- <div class="card_footer_btn">
                        
                        <el-button type="warning" @click="reg_m">立即挂号</el-button>
                    </div> -->
                    <div class="order">
                        <h5>
                            <label for="" style="width:70px">挂号机构：</label>
                            <el-select v-model="hospitalIndex_m" v-on:change="getSubject_m" clearable style="width:80%" filterable placeholder="==请选择==" :filterMethod="hospitalFilter_m">
                                <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                                    <span>{{item.hospitalName}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号科室：</label>
                            <el-select v-model="roomId_m" clearable v-on:input="getRoom_input_m(roomId_m)"  v-on:change="getRoom_m" :disabled="roomDis_m" style="width:80%" filterable placeholder="==请选择==" :filterMethod="roomFilter_m">
                                <el-option v-for="item in roomArr_m"  :key="item.name"  :label="item.name" :value="item.code">
                                    <span>{{item.name}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号类别：</label>
                            <el-select v-model="orderTypeNum_m" clearable v-on:input="orderSelect_input_m(orderTypeNum_m)"  v-on:change="orderSelect_m" :disabled="registType_m" style="width:80%" filterable placeholder="==请选择==" :filterMethod="roomsFilter_m">
                                <el-option v-for="(item,index) in roomsArr_m"  :key="index"  :label="item.name" :value="item.class_type">
                                    <span>{{item.name}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号医生：</label>
                            <el-select v-model="orderDocId_m" clearable  v-on:change="orderDocSelect_m" :disabled="unEngenderDocDisabled_m" style="width:80%" filterable placeholder="==请选择==" :filterMethod="docFilter_m">
                                <el-option v-for="item in orderDoctor_m"  :key="item.STAFF_NAME"  :label="item.STAFF_NAME" :value="item.STAFF_INDEX_NO">
                                    <span>{{item.STAFF_NAME}}</span>
                                    <span style="float:right">{{item.PINYIN_CODE}}</span>
                                </el-option>
                            </el-select>
                        </h5>
                        <h5>
                            <label for="" style="width:70px">挂号来源：</label>
                            <el-autocomplete class="inline-input" clearable style="width:80%" v-model="source_m" :fetch-suggestions="querySearch_m" placeholder="请输入内容" @select="handleSelect_m" >
                                <template slot-scope="{ item }">
                                    <span>{{ item.value }}</span>
                                    <span style="float:right">{{ item.name }}</span>
                                </template>
                            </el-autocomplete>
                        </h5>
                        <h5>
                            <el-checkbox v-model="checked_m">购买病历</el-checkbox>
                        </h5>
                        <el-button style="position:absolute;right:0%;bottom:-15%;" v-loading.fullscreen.lock="loading"  v-bind:disabled="orderBtn_m" type="warning" @click="reg_m">立即挂号</el-button>
                    </div>
                </li>
            </ul>
        </div>
        <el-dialog title="二维码" :visible.sync="centerDialogVisible" width="30%" center>
            <div class="code clear">
                <h2>
                    <img :src="codeImg_long" alt="" class="codeimg" >
                    <img :src="codeImg_temp" alt="" class="codeimg" style="margin-left:3%">
                </h2>
            </div>
            <div class="code_msg">
                <h1 class="clear"><p>就诊卡二维码</p><p>临时二维码(24小时有效)</p></h1>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="codePopHide">取 消</el-button>
                <!-- <el-button type="primary" @click="print">打 印</el-button> -->
            </span>
        </el-dialog>
        <div class="card_footer">
            <el-button type="warning" style="float:left;margin-right:3%;" @click="back">返回上一页</el-button>
            <el-button type="warning" style="float:right;margin-right:3%;" @click="reg_together">查询挂号</el-button>
        </div>

        <el-dialog title="提示" :visible.sync="popshow" width="30%" >
            <span>{{this.tipsMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="popshow = false">关 闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示"  :visible.sync="popshow" width="30%"  center>
            <span>{{remark}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="backIndex">返回主页</el-button>
                <el-button type="warning" @click="inquireOrder" v-loading.fullscreen.lock="fullscreenLoading">查询挂号</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
import baseUrl from '../base/baseUrl';
    
export default {
    data(){
        return{
            msg: '初诊登记',
            hospital: '',
            name_m: '',
            nation_m:'',
            sex_m: '',
            treat_m: '',
            phone_m: '',
            idCard_m: '',
            name_w: '',
            nation_w:'',
            sex_w: '',
            treat_w: '',
            phone_w: '',
            idCard_w:'',
            manShow: true,
            womenShow: true,
            codeImg_long: '',
            fullscreenLoading: false,
            centerDialogVisible : false,
            code_img: '',
            tipMsg: '',
            hospitalName_m: '',
            hospitalName_w: '',
            togetherDisabled: true,
            codeImg_temp: '',



            popshow: false,//挂号成功提示
            tipsMsg: '',
            remark: '',




            hospitalArr: [],
            hospitalArr_new: [],
            hospitalNum_m: '',
            hospitalNum_w: '',
            hospitalIndex_m: '',
            hospitalIndex_w: '',
            indexId_m: '',
            indexId_w: '',

            roomArr_m: [],
            roomArr_w: [],
            roomArr_new_m: [],
            roomArr_new_w: [],
            roomItemsArr_m: [],
            roomItemsArr_w: [],
            roomItemsArr_new_m: [],
            roomItemsArr_new_w: [],
            roomId_m: '',
            roomId_w: '',
            roomDis_m: true,
            roomDis_w: true,
            registType_m: true,
            registType_w: true,

            orderTypeNum_m: '',
            orderTypeNum_w: '',

            orderDocId_m: '',
            orderDocId_w: '',
            orderDoctor_w: [],
            orderDoctor_m: [],
            unEngenderDocDisabled_m: true,
            unEngenderDocDisabled_w: true,
            roomsArr_m: [],
            roomsArr_w: [],
            orderDoctor_new_m: [],
            orderDoctor_new_w: [],
            orderDoctor_m: [],
            orderDoctor_w: [],


            source_m: '',
            source_w: '',
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

            orderBtn_w: true,
            orderBtn_m: true,

            opName: '',
            opNo: '',
            loading: false,
            checked_m: false,
            checked_w: false,


            hospitalNum: '',

        }
    },
    methods: {
        back(){
            this.$router.go(-1)
        },
        code_man(){
            
            // this.fullscreenLoading = true;
            axios.post(baseUrl + 'api/accounts/tem_qrcode', JSON.stringify({
                "name": this.name_m,
                "id_number": this.idCard_m,
                "phone": this.phone_m
            })).then(res=>{
                console.log(res);
                if(res.data.status == 400000){
                    this.tipMsg = "用户不存在(身份证与手机号不符合)";
                    this.open();
                }else{
                    this.centerDialogVisible = true;
                    this.codeImg_long = res.data.msg.medical_image_url;
                    this.codeImg_temp = res.data.msg.image_url;
                }
                this.fullscreenLoading = false;
                
            }).catch(function(error){
                
            })
        },
        code_women(){
            
            // this.fullscreenLoading = true;
            axios.post(baseUrl + 'api/accounts/tem_qrcode', JSON.stringify({
                "name": this.name_w,
                "id_number": this.idCard_w,
                "phone": this.phone_w
            })).then(res=>{
                console.log(res);
                if(res.data.status == 400000){
                    this.tipMsg = "用户不存在(身份证与手机号不符合)";
                    this.open();
                }else{
                    this.centerDialogVisible = true;
                    this.codeImg_long = res.data.msg.medical_image_url;
                    this.codeImg_temp = res.data.msg.image_url;
                }
                // this.fullscreenLoading = false;
            }).catch(err=>{
                this.$message.error(err);
            })
        },
        
        backIndex(){
            this.$router.push({
                path: '/'
            })
        },



        inquireOrder(){
            this.$router.push({
                path: 'record'
            })
        },

        // 挂号
        reg_m(){
            this.loading = true;
            axios.post(baseUrl + 'api/mq/register', JSON.stringify({
                "medical_card_id": this.treat_m,
                "doctor_id": this.orderDocId_m,
                "doctor_name": this.docName_m,
                "scheme_type": this.orderTypeNum_m,
                "op_name": this.opName,
                "op_no": this.opNo,
                "source": this.source_m,
                "is_mrc": this.checked_m,
            })).then(res=>{
                console.log(res);
                this.loading = false;
                this.fullscreenLoading = false;
                if(res.data.status == 200303){
                    this.$message({
                        message: '挂号成功',
                        type: 'success'
                    });
                    this.remark = "挂号成功!";
                    this.popshow = true;
                    this.orderBtn_m = true;
                }else{
                    this.$message.error('挂号失败' + res.data.msg.error + res.data.status);
                }
            }).catch(error=>{
                this.loading = false;
                console.log(error);
                this.$message.error(error);
            })
        },

        reg_w(){
            this.loading = true;
            axios.post(baseUrl + 'api/mq/register', JSON.stringify({
                "medical_card_id": this.treat_w,
                "doctor_id": this.orderDocId_w,
                "doctor_name": this.docName_w,
                "scheme_type": this.orderTypeNum_w,
                "op_name": this.opName,
                "op_no": this.opNo,
                "source": this.source_w,
                "is_mrc": this.checked_w,
            })).then(res=>{
                console.log(res);
                this.loading = false;
                this.fullscreenLoading = false;
                if(res.data.status == 200303){
                    this.$message({
                        message: '挂号成功',
                        type: 'success'
                    });
                    this.remark = "挂号成功!"
                    this.popshow = true;
                    this.orderBtn_w = true;
                }else{
                    this.$message.error('挂号失败' + res.data.msg.error + res.data.status);
                }
            }).catch(error=>{
                this.loading = false;
                console.log(error);
                this.$message.error(error);
            })
        },
        reg_together(){
            this.$router.push({
                path: 'record'
            })
        },

        // 打印二维码
        codePopHide() {
            this.centerDialogVisible = false;
        },
        open() {
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


        // 过滤
        hospitalFilter_m(val) {
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
        roomFilter_m(val) {
            if (val) {
                var tempArr = [];
                this.roomArr_new_m.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.roomArr_m = tempArr;
            } else {
                this.roomArr_m = this.roomArr_new_m;
            }
        },
        roomsFilter_m(val) {
            if (val) {
                var tempArr = [];
                this.roomsArr_new_m.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.roomsArr_m = tempArr;
            } else {
                this.roomsArr_m = this.roomsArr_new_m;
            }
        },
        docFilter_m(val) {
            if (val) {
                var tempArr = [];
                this.orderDoctor_new_m.forEach(function(opt, index){
                if (opt['PINYIN_CODE'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['STAFF_NAME'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.orderDoctor_m = tempArr;
            } else {
                this.orderDoctor_m = this.orderDoctor_new_m;
            }
        },
        // 来源
        querySearch_m(queryString, cb) {
            console.log(queryString)
            var restaurants = this.sourceArr;
            var results = queryString ? restaurants.filter(this.createFilter_m(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter_m(queryString) {
            return (restaurant) => {    
                return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect_m(item) {
            this.source_m = item.value ;
            console.log(this.source_m)
        },




        // 女方

        hospitalFilter_w(val) {
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
        roomFilter_w(val) {
            if (val) {
                var tempArr = [];
                this.roomArr_new_w.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.roomArr_w = tempArr;
            } else {
                this.roomArr_w = this.roomArr_new_w;
            }
        },
        roomsFilter_w(val) {
            if (val) {
                var tempArr = [];
                this.roomsArr_new_w.forEach(function(opt, index){
                if (opt['pinyin'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['name'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.roomsArr_w = tempArr;
            } else {
                this.roomsArr_w = this.roomsArr_new_w;
            }
        },
        docFilter_w(val) {
            if (val) {
                var tempArr = [];
                this.orderDoctor_new_w.forEach(function(opt, index){
                if (opt['PINYIN_CODE'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['STAFF_NAME'].indexOf(val) == 0) {
                    tempArr.push(opt);
                }
                });
                this.orderDoctor_w = tempArr;
            } else {
                this.orderDoctor_w = this.orderDoctor_new_w;
            }
        },
        // 来源
        querySearch_w(queryString, cb) {
            console.log(queryString)
            var restaurants = this.sourceArr;
            var results = queryString ? restaurants.filter(this.createFilter_w(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter_w(queryString) {
            return (restaurant) => {    
                return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect_w(item) {
            this.source_w = item.value ;
            console.log(this.source_m)
        },





        // change事件
        getSubject_m(){
            // console.log(this.orderId);
            this.roomDis_m = false;
            console.log(this.hospitalIndex_m);
            this.roomId_m = "";
            this.registType_m = true;
            this.unEngenderDocDisabled_m = true;
            this.orderDocId_m = "";
            this.orderTypeNum_m = "";
            axios.get(baseUrl + 'api/mq/register_type_new?hospital=' + this.hospitalIndex_m)
            .then(res=>{
                console.log(res);
                if(res.data.status == 200302){
                    this.roomArr_m = res.data.msg.depts;
                    this.roomArr_new_m = res.data.msg.depts;
                    this.roomItemsArr_m = res.data.msg.items;
                    this.roomItemsArr_new_m = res.data.msg.items;
                }else{
                    this.$message.error('获取列表失败');  
                }
            })
            .catch(error=>{
                console.log(error);
                this.$message.error(error);
            });
        },

        getRoom_m(){
            console.log(this.orderTypeNum_m)
            if(this.orderDocId_m !='' && this.orderTypeNum_m != '' && this.roomId_m != '' && this.hospitalIndex_m != ''){
                this.orderBtn_m = false;
            }else{
                this.orderBtn_m = true;
            };
            // if(this.orderTypeNum_m == ''){
            //     this.registType_m = false;
            //     console.log();
            //     // console.log(this.roomId_m);
            //     this.roomsArr_m = this.roomItemsArr_m[this.roomId_m].items;
            //     console.log(this.roomsArr_m)
            //     // this.roomsArr_m = this.roomItemsArr_m[this.roomId_m].items;
            //     // this.roomsArr_new_m = this.roomItemsArr_m[this.roomId_m].items;
            //     // this.registType_m = false;
            // }
            // if(this.orderTypeNum_m != ''){
                this.orderDoctor_m = [];
                this.orderDocId_m = "";
                this.unEngenderDocDisabled_m = true;
                
                this.orderTypeNum_m = '';
                
            // }else{
                if(this.roomId_m != ''){
                    this.roomDis_m = false;
                    this.roomsArr_m = this.roomItemsArr_m[this.roomId_m].items;
                    this.roomsArr_new_m = this.roomItemsArr_m[this.roomId_m].items;
                    this.registType_m = false;
                }
                
            // }
        },

        orderSelect_m(){
            console.log(this.orderTypeNum_m);
            if(this.orderDocId_m !='' && this.orderTypeNum_m != '' && this.roomId_m != '' && this.hospitalIndex_m != ''){
                this.orderBtn_m = false;
            }else{
                this.orderBtn_m = true;
            };

            if(this.orderTypeNum_m == ''){
                this.unEngenderDocDisabled_m = true;
            }else{
                axios.get(baseUrl + 'api/mq/depart_doctor?depart_code=' + this.roomId_m)
                .then(res=>{
                    console.log(res);
                    this.unEngenderDocDisabled_m = false;
                    if(res.data.status == 200302){
                        this.orderDoctor_m = res.data.msg;
                        this.orderDoctor_new_m = res.data.msg;
                    }else{
                        this.$message.error('获取列表失败');
                    }   
                }).catch(err=>{
                    console.log(err);
                    this.$message.error(err);
                })
            }
             
        },

        orderDocSelect_m(){
            if(this.orderDocId_m !='' && this.orderTypeNum_m != '' && this.roomId_m != '' && this.hospitalIndex_m != ''){
                this.orderBtn_m = false;
            }else{
                this.orderBtn_m = true;
            };
            
            for( var i=0;i<this.orderDoctor_m.length; i++){
                // console.log(this.orderDoctor[i].STAFF_INDEX_NO);
                if(this.orderDoctor_m[i].STAFF_INDEX_NO == this.orderDocId_m) {
                    this.docName_m = this.orderDoctor_m[i].STAFF_NAME;
                }
            }
        },



        // 监听挂号科室输入框得值
        getRoom_input_m(){
            if(this.roomId_m == ''){
                this.registType_m = true;
            }
        },

        getRoom_input_w(){
            if(this.roomId_w == ''){
                this.registType_w = true;
            }
        },


        orderSelect_input_m(){
            if(this.orderTypeNum_m == ''){
                this.unEngenderDocDisabled_m = true;
                this.orderDocId_m = "";
            }
        },
        orderSelect_input_w(){
            if(this.orderTypeNum_w == ''){
                this.unEngenderDocDisabled_w = true;
                this.orderDocId_w = "";
            }
        },












        // 女方
        getSubject_w(){
            // console.log(this.orderId);
            if(this.orderDocId_w !='' && this.orderTypeNum_w != '' && this.roomId_w != '' && this.hospitalIndex_w != ''){
                this.orderBtn_w = false;
            }else{
                this.orderBtn_w = true;
            };
            this.roomDis_w = false;

            this.roomId_w = "";
            this.registType_w = true;
            this.unEngenderDocDisabled_w = true;
            this.orderDocId_w = "";
            this.orderTypeNum_w = "";

            axios.get(baseUrl + 'api/mq/register_type_new?hospital=' + this.hospitalIndex_w)
            .then(res=>{
                console.log(res);
                if(res.data.status == 200302){
                    this.roomArr_w = res.data.msg.depts;
                    this.roomArr_new_w = res.data.msg.depts;
                    this.roomItemsArr_w = res.data.msg.items;
                    this.roomItemsArr_new_w = res.data.msg.items;
                    // console.log(this.roomItemsArr)
                }else{
                    this.$message.error('获取列表失败');
                }
            })
            .catch(error=>{
                console.log(error);
                this.$message.error(error);
            });
        },

        getRoom_w(){
            // console.log(this.orderDocId_w)
            if(this.orderDocId_w !='' && this.orderTypeNum_w != '' && this.roomId_w != '' && this.hospitalIndex_w != ''){
                this.orderBtn_w = false;
            }else{
                this.orderBtn_w = true;
            };
            // if(this.orderTypeNum_w != ''){
                this.orderDoctor_w = [];
                this.orderDocId_w = "";
                this.unEngenderDocDisabled_w = true;
                
                this.orderTypeNum_w = '';
            // }else{
                if(this.roomId_w != ''){
                    this.roomDis_w = false;
                    this.roomsArr_w = this.roomItemsArr_w[this.roomId_w].items;
                    this.roomsArr_new_w = this.roomItemsArr_w[this.roomId_w].items;
                    this.registType_w = false;
                }
                
            // }
        },

        orderSelect_w(){
            console.log(this.orderTypeNum_w);
            if(this.orderDocId_w !='' && this.orderTypeNum_w != '' && this.roomId_w != '' && this.hospitalIndex_w != ''){
                this.orderBtn_w = false;
            }else{
                this.orderBtn_w = true;
            };

            if(this.orderTypeNum_w == ''){
                this.unEngenderDocDisabled_w = true;
            }else{
                axios.get(baseUrl + 'api/mq/depart_doctor?depart_code=' + this.roomId_w)
                .then(res=>{
                    console.log(res);
                    this.unEngenderDocDisabled_w = false;
                    if(res.data.status == 200302){
                        this.orderDoctor_w = res.data.msg;
                        this.orderDoctor_new_w = res.data.msg;
                    }else{
                        this.$message.error('获取列表失败');
                    }   
                }).catch(err=>{
                    console.log(err);
                    this.$message.error(err);
                }) 
            }
        },

        orderDocSelect_w(){
            
            if(this.orderDocId_w !='' && this.orderTypeNum_w != '' && this.roomId_w != '' && this.hospitalIndex_w != ''){
                this.orderBtn_w = false;
            }else{
                this.orderBtn_w = true;
            };
            for( var i=0;i<this.orderDoctor_w.length; i++){
                // console.log(this.orderDoctor[i].STAFF_INDEX_NO);
                if(this.orderDoctor_w[i].STAFF_INDEX_NO == this.orderDocId_w) {
                    this.docName_w = this.orderDoctor_w[i].STAFF_NAME;
                }
            }
        },
        




        // 获取机构列表
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
                                this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                                this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                                this.hospitalNum = this.hospitalArr[i].hospitalNo;
                                this.getSubject_m();
                                this.getSubject_w();
                            }
                        };



                    // if(tempHospitalNum == 76){
                    //     this.hospitalNum = "111";
                    //     this.hospitalIndex_m = "111";
                    //     this.hospitalIndex_w = "111";
                    //     // this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                        
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 73){
                    //     this.hospitalNum = "114";
                    //     this.hospitalIndex_m = "114";
                    //     this.hospitalIndex_w = "114";
                    //     // this.getService();
                        
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 74){
                    //     this.hospitalNum = "113";
                    //     this.hospitalIndex_m = "113";
                    //     this.hospitalIndex_w = "113";
                    //     // this.getService();
                        
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 75){
                    //     this.hospitalNum = "112";
                    //     this.hospitalIndex_m = "112";
                    //     this.hospitalIndex_w = "112";
                    //     // this.getService();
                        
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 77){
                    //     this.hospitalNum = "109";
                    //     this.hospitalIndex_m = "109";
                    //     this.hospitalIndex_w = "109";
                    //     // this.getService();
                        
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 78){
                    //     this.hospitalNum = "110";
                    //     this.hospitalIndex_m = "110";
                    //     this.hospitalIndex_w = "110";
                    //     // this.getService();
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 79){
                    //     this.hospitalNum = "108";
                    //     this.hospitalIndex_m = "108";
                    //     this.hospitalIndex_w = "108";
                    //     // this.getService();
                        
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }else if(tempHospitalNum == 111){
                    //     this.hospitalNum = "115";
                    //     this.hospitalIndex_m = "115";
                    //     this.hospitalIndex_w = "115";
                    //     // this.getService();
                        
                    //     for(var i=0;i<this.hospitalArr.length;i++){
                    //         if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                    //             this.indexId = this.hospitalArr[i].hospitalName;
                    //             this.hospitalIndex_w = this.hospitalArr[i].hospitalNo;
                    //             this.hospitalIndex_m = this.hospitalArr[i].hospitalNo;
                    //         }
                    //     };
                    //     this.getSubject_m();
                    //     this.getSubject_w();
                    // }
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        // getService(){
        //         // console.log(this.hospitalNum)
        //     axios.get(baseUrl + "api/sys/get_wait_doctor?hos_id=" + this.hospitalNum)
        //     .then(res=>{
        //         console.log(res);
        //         if(res.data.status == 200026){
        //             this.serviceArr = res.data.msg;
        //             this.serviceArr_new = res.data.msg;
        //         }else{
        //             // this.tips = res.data.status + res.data.desc;
        //             // this.tipsPop = true;
        //         }
        //     }).catch(err=>{
        //         console.log(err);
        //         // this.tips = err;
        //         // this.tipsPop = true;
        //     })
        // },

    },
    mounted(){

        this.getHospital();


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



        if(this.$route.query.name_m == ''){
            this.manShow = false;
        }else if(this.$route.query.name_w == ''){
            this.womenShow = false;
        }else{
            this.womenShow = true;
            this.manShow = true;
        };

        if(this.$route.query.hospital == 108){
            this.hospitalName_m = "新疆佳音医院妇产分院";
            this.hospitalName_w = "新疆佳音医院妇产分院";
        }else if(this.$route.query.hospital == 109){
            this.hospitalName_m = "新疆佳音医院龙泉街门诊";
            this.hospitalName_w = "新疆佳音医院龙泉街门诊";
        }else if(this.$route.query.hospital == 110){
            this.hospitalName_m = "新疆佳音医院城北分院";
            this.hospitalName_w = "新疆佳音医院城北分院";
        }else if(this.$route.query.hospital == 111){
            this.hospitalName_m = "新疆佳音医院男科分院";
            this.hospitalName_w = "新疆佳音医院男科分院";
        }else if(this.$route.query.hospital == 112){
            this.hospitalName_m = "新疆佳音医院吐鲁番医院";
            this.hospitalName_w = "新疆佳音医院吐鲁番医院";
        }else if(this.$route.query.hospital == 113){
            this.hospitalName_m = "新疆佳音医院巴州分院";
            this.hospitalName_w = "新疆佳音医院巴州分院";
        }else if(this.$route.query.hospital == 114){
            this.hospitalName_m = "新疆佳音医院伊宁市分院";
            this.hospitalName_w = "新疆佳音医院伊宁市分院";
        }else if(this.$route.query.hospital == 115){
            this.hospitalName_m = "新疆佳音医院喀什分院";
            this.hospitalName_w = "新疆佳音医院喀什分院";
        };
        console.log(this.$route.query)
        this.name_m = this.$route.query.name_m;
        this.nation_m = this.$route.query.nation_m;
        this.sex_m = this.$route.query.sex_m;
        this.treat_m = this.$route.query.treat_m;
        this.phone_m = this.$route.query.phone_m;
        this.idCard_m = this.$route.query.idCard_m;
        this.name_w = this.$route.query.name_w;
        this.nation_w = this.$route.query.nation_w;
        this.sex_w = this.$route.query.sex_w;
        this.treat_w = this.$route.query.treat_w;
        this.phone_w = this.$route.query.phone_w;
        this.idCard_w = this.$route.query.idCard_w;
    },
}
</script>
<style lang="scss" scoped>
    @import './card.scss';
    
</style>
