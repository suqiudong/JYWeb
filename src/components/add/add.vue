<template>
    <div class="add">
        <div class="add_header">
            <p>
                <span>{{msg}}</span>
            </p>
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
        <div class="add_main">
            <div class="add_top">
                <el-card class="box-card" style="width:100%">
                    <div class="clear">
                        <h1>
                            <span>{{sexMsg}}</span><span>{{sexIcCard}}</span>
                        </h1>
                        <h2>
                            <span>请获取另一方信息</span>
                            <el-button type="warning"  v-loading.fullscreen.lock="loading" @click="getMsg">获取信息</el-button>
                        </h2>
                    </div>
                </el-card>
            </div>
            <div class="add_msg">
                <el-card class="box-card" style="width:100%">
                    <div class="clear">
                        <span>用户信息</span><span v-show="gztShow" :style="{color:bgcolor, fontSize: fontSize + 'px' }">{{gztMsg}}</span>
                    </div>
                    <div class="add_left">
                        <img :src="idCardImg" alt="" style="width:120px;height:140px;">
                        <img :src="faceImg" alt="" style="width:120px;height:140px;">
                    </div>
                    <div class="add_message clear">
                        <ul class="clear">
                            <li>
                                <label for="" style="width:70px">姓名：</label>
                                <el-input placeholder="姓名" v-model="name" v-on:input="name_input(name)" style="width:70%" ></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">性别：</label>
                                <!-- <el-input placeholder="性别" v-model="sex" style="width:70%" ></el-input> -->
                                <el-select v-model="sex" clearable style="width:70%" filterable placeholder="性别" :filterMethod="sexFilter">
                                    <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">身份证：</label>
                                <el-input placeholder="身份证" v-on:blur="computedAge" v-model="idCard" style="width:70%" ></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">年龄：</label>
                                <el-input placeholder="年龄" v-model="age" style="width:70%" ></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">国籍：</label>
                                <!-- <el-input placeholder="国籍" v-model="country" style="width:70%" ></el-input> -->
                                <el-select v-model="country" clearable  style="width:70%" filterable placeholder="国籍" :filterMethod="countryFilter">
                                    <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">婚姻：</label>
                                <!-- <select v-model="selectMarry" v-on:change="selectMarryBtn">
                                    <option v-for="(item ,index) in marryArr" :key="index">
                                        {{item}}
                                    </option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input"
                                v-model="selectMarry" style="width:70%"
                                :fetch-suggestions="marrySearch"
                                placeholder="请输入内容"
                                @select="marrySelect"
                                ></el-autocomplete> -->
                                <el-select v-model="selectMarry" clearable style="width:70%" filterable placeholder="婚姻" :filterMethod="marryFilter">
                                    <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">生日：</label>
                                <el-input placeholder="生日" v-model="birthday" style="width:70%" ></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">民族：</label>
                                <!-- <el-input placeholder="民族" v-model="nation" style="width:70%" ></el-input> -->
                                <el-select v-model="nation" clearable style="width:70%" filterable placeholder="民族" :filterMethod="nationFilter">
                                    <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>

                            <li>
                                <label for="" style="width:70px">地址：</label>
                                <el-input placeholder="地址" v-model="address" style="width:70%" ></el-input>
                                
                            </li>
                            <li>
                                <label for="" style="width:70px">居住地：</label>
                                <!-- <select v-model="selectArea" v-on:change="selectAreaBtn">
                                    <option v-for="(item,index) in areaArr" :key="index">
                                        {{item}}
                                    </option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="selectArea"
                                :fetch-suggestions="areaSearch"
                                placeholder="请输入内容"
                                @select="areaHandleSelect"
                                ></el-autocomplete> -->
                                <el-select v-model="selectArea" clearable  style="width:70%" filterable placeholder="居住地" :filterMethod="areaFilter">
                                    <el-option v-for="item in areaArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>    
                                <label for="" style="width:70px">职业：</label>
                                <!-- <select v-model="selectJob" v-on:change="selectJobBtn">
                                    <option v-for="(item,index) in jobArr" :key="index">
                                        {{item}}
                                    </option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="selectJob"
                                :fetch-suggestions="jobSearch"
                                placeholder="请输入内容"
                                @select="jobHandleSelect"
                                ></el-autocomplete> -->
                                <el-select v-model="selectJob" clearable  style="width:70%" filterable placeholder="职业" :filterMethod="jobFilter">
                                    <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">手机号：</label>
                                <el-input placeholder="手机号" v-model="phone" style="width:70%" ></el-input>
                            </li>
                        </ul>
                    </div>  
                </el-card>
                
                <el-card class="box-card" style="width:100%;margin-top:3%">
                    <div class="add_left">
                    </div>
                    <div class="add_message clear">
                        <ul>
                            <li>
                                <label for="" style="width:70px">发卡机构：</label>
                                <!-- <select v-model="selectHospitalIndex" v-on:change="selectHospitalBtn">
                                    <option value="">==请选择==</option>
                                    <option v-for="(item,index) in hospitalArr" v-bind:value="[item.hospitalNo,item.hospitalName]" :key="index">
                                        {{item.hospitalName}}
                                    </option>
                                </select> -->
                                <el-select v-model="selectHospitalIndex"   style="width:70%" filterable placeholder="请选择" :filterMethod="hosFilter">
                                    <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                                        <span>{{item.hospitalName}}</span>
                                        <span style="float: right">{{item.pinyin}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">客服：</label>
                                <!-- <select v-model="selectService" v-on:change="selectServiceBtn">
                                    <option value="">==请选择==</option>
                                    <option v-for="(item,index) in serviceArr" :value="item" :key="index">
                                        {{item}}
                                    </option>
                                </select> -->
                                <el-select v-model="selectService" clearable  style="width:70%" filterable placeholder="请选择" :filterMethod="serviceFilter">
                                    <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                        <span>{{item.doc_name}}</span>
                                        <span style="float: right">{{item.pinyin}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">发卡人：</label>
                                <el-input placeholder="发卡人" v-model="fkPerson" :disabled="true" style="width:70%" ></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">预约号：</label>
                                <el-input placeholder="预约号" v-model="order" style="width:70%" ></el-input>
                            </li>
                            <!-- <li>
                                <label for="" style="width:70px">来源：</label>
                                <el-input placeholder="来源" v-model="origin" style="width:70%;" ></el-input>
                            </li> -->
                        </ul>
                    </div>  
                </el-card>

                <el-card class="box-card" style="width:100%;margin-top:3%;padding-bottom:3%">
                     <div>就诊卡号</div>
                     <div class="clear" style="height:40px;float:left;margin-top:3%">
                        <p style="float:left;line-height:40px" v-show="hasCardShow">暂无卡号~~~请先获取身份证信息</p>
                        <div class="clear" style="margin-top: 3%;float:left;" v-show="!hasCardShow">
                            <label for="" style="width:70px">就诊卡号：</label>
                            <el-input placeholder="就诊卡号：" style="width:70%" v-model="icCard"></el-input>
                        </div>
                    </div>
                    <el-button type="warning" style="float:right;margin-top:3%" v-bind:disabled="fileDisabled" v-loading.fullscreen.lock="fullscreenLoading" @click="fileCardBtn">补录信息至HIS</el-button>
                    
                </el-card>
            </div>
        </div>
        <div class="add_footer">
            <el-button type="warning" @click="back">返回上一页</el-button>
              <el-button type="warning" @click="subBtn" style="float:right;" :disabled="addBtnDisabled">生成健康卡</el-button>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" center>
            <span>{{tipMsg}}</span>
            <span slot="footer" class="dialog-footer">  
                <el-button type="warning" @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>



        <!-- 已有就诊卡 -->
        <el-dialog title="提示" :visible.sync="hasIcCard" width="30%" >
                <span>该身份证已有就诊卡号：{{icCard}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="backMenu">返回菜单</el-button>
                    <el-button type="warning" @click="orderBtn">立即挂号</el-button>
                </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="confirmPop" width="30%" center>
        <span>请确认以上信息无误!</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="confirmPop = false">取 消</el-button>
            <el-button type="warning" @click="confirmPopBtn" v-loading.fullscreen.lock="loading" >确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>
<script>
    import axios from 'axios';
    import baseUrl from '../base/baseUrl.js';
    import nation from '../nation.js';
    import area from '../area.js';
    import country from '../country.js';
    export default {
        data(){
            return{

                gztMsg: "",
                bgcolor: "",
                fontSize: "14",
                gztShow: true,

                fullscreenLoading: false,



                msg: '补录信息',
                addBtnDisabled: true,//补录按钮
                deviceId: '',//设备信息
                deviceNum: true,    
                deviceInput: localStorage.getItem("deviceInput"),
                tipMsg: '',//弹窗提示语
                dialogVisible: false,
                loading: false,
                idCardImg: require('../../assets/background_idcard.png'),
                faceImg: require('../../assets/background_faceid.png'),
                sexMsg: '',
                sexIcCard: '',

                marryArr: [
                    {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
                ],
                marryArr_new: [
                    {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
                ],
                jobArr: [{name:"GJGWY",value:"国家公务员"},{name:"ZYJSRY",value:"专业技术人员"},{name:"ZY",value:"职员"},
                    {name:"QYGLRY",value:"企业管理人员"},{name:"GR",value:"工人"},{name:"NM",value:"农民"},
                    {name:"XS",value:"学生"},{name:"XYJR",value:"现役军人"},{name:"ZYZYZ",value:"自由职业者"},
                    {name:"GTJYZ",value:"个体经营者"},{name:"WYRY",value:"无业人员"},{name:"TXRY",value:"退（离）休人员"},
                    {name:"QT",value:"其他"},
                ],
                jobArr_new: [{name:"GJGWY",value:"国家公务员"},{name:"ZYJSRY",value:"专业技术人员"},{name:"ZY",value:"职员"},
                    {name:"QYGLRY",value:"企业管理人员"},{name:"GR",value:"工人"},{name:"NM",value:"农民"},
                    {name:"XS",value:"学生"},{name:"XYJR",value:"现役军人"},{name:"ZYZYZ",value:"自由职业者"},
                    {name:"GTJYZ",value:"个体经营者"},{name:"WYRY",value:"无业人员"},{name:"TXRY",value:"退（离）休人员"},
                    {name:"QT",value:"其他"},
                ],
                areaArr: area,
                areaArr_new: area,
                nationArr: nation,//民下拉
                nationArr_new: nation,//民下拉
                hospitalArr: [],
                hospitalArr_new: [],
                countryArr: country,
                countryArr_new: country,
                serviceArr: [],
                serviceArr_new: [],
                sexArr: [{name:"N",value:"男"},{name:"N",value:"女"}],
                sexArr_new: [{name:"N",value:"男"},{name:"N",value:"女"}],

                name: '',
                sex: '',
                idCard: '',
                country: '中国',
                birthday: '',
                nation: '',
                address: '',
                phone: '',
                fkPerson: '',//发卡人
                order: '',//预约号
                origin: '',//来源
                icCard: '',//就诊卡号
                age: '',//年龄
                hospitalNo: '',
                opNo: '',
                opName: '',




                selectMarry: '已婚',
                selectArea: '乌鲁木齐',
                selectJob: '个体经营者',
                selectHospitalIndex: '',
                selectService: '',


                hasIcCard: false,
                hasCardShow: true,
                fileDisabled: true,

                confirmPop: false,

                successMsg: '',
                addBindMsg: '',


                hospitalNum: '',//机构编号
                hospitalIndex: '',

            }
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            // 编辑设备编号
            editDevice(){
                this.deviceNum = false;
            },
            backMenu(){
                this.$router.push({
                    path: '/'
                })
            },




            // 获取设备身份证信息
            getMsg(){
                console.log(this.deviceInput)
                if(this.deviceInput == null){
                    this.tipMsg = "请先输入设备编号"
                    this.dialogVisible = true;
                }else{
                    this.loading = true;
                    axios.get(baseUrl + 'api/sensetime/data/' + this.deviceInput)
                    .then(res=>{
                        console.log(res);
                        this.loading = false;
                        var sex = '';
                        if(res.data.status == 400040){
                            this.tipMsg = "请先放入身份证进行检测";
                            this.dialogVisible = true;
                        }else if(res.data.status == 200040){
                            localStorage.setItem("deviceInput",res.data.msg.device_id);
                            var date = new Date();
                            var year = date.getFullYear();
                            if(res.data.msg.sex == 0){
                                sex = "男"
                            }else{
                                sex = "女"
                            };
                            this.name = res.data.msg.name;
                            this.sex = sex;
                            this.idCard = res.data.msg.id_number;
                            this.birthday = res.data.msg.birthday;
                            this.nation = res.data.msg.nation;
                            this.address = res.data.msg.address;
                            this.idCardImg = "data:image/png;base64," + res.data.msg.id_image;
                            this.faceImg = "data:image/png;base64," + res.data.msg.face_image;
                            this.age = year - res.data.msg.birthday.slice(0,4);
                            this.phone = res.data.msg.phone;

                            if(res.data.msg.medical_card_number != ''){
                                this.hasIcCard = true;
                                this.icCard = res.data.msg.medical_card_number;
                                this.hasCardShow = false;
                                this.fileDisabled = true;//填入就诊卡按钮
                                this.addBtnDisabled = false;
                            }else{
                                this.icCard = res.data.msg.medical_card_number;
                                this.fileDisabled = false;
                            };

                            if(res.data.msg.is_gzt == 1){
                                this.gztMsg = "(身份校验成功)";
                                this.gztShow = true;
                                this.bgcolor = "blue";
                            }else{
                                this.gztMsg = "(身份校验失败)";
                                this.gztShow = true;
                                this.bgcolor = "red";
                            }


                        }else{
                            this.tipMsg = "获取失败" + res.data.status + res.data.msg;
                            this.dialogVisible = true;
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            },


            // 填入就诊卡时间
            fileCardBtn(){
                var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                if(this.name == '' || this.sex == '' || this.idCard == '' || this.nation == '' || this.address == ''){
                    this.tipMsg = "请先完整用户信息";
                    this.dialogVisible = true;
                }else if(!phoneReg.test(this.phone)){
                    this.tipMsg = "请输入正确的手机号";
                    this.dialogVisible = true;
                }else if(this.selectHospitalIndex == ''){
                    this.tipMsg = "请选择发卡机构";
                    this.dialogVisible = true;
                }else{
                    // var data = JSON.stringify({
                    //         "hospitalNo": this.hospitalNo[0],
                    //         "OP_NO": this.opNo,
                    //         "OP_Name": this.opName,
                    //         "OP_IssuerNo": this.opNo,
                    //         "OP_Issuer": this.opName,
                    //         "channel": "kefu",

                    //         "name_m": this.name,
                    //         "age_m": this.age,
                    //         "birthday_m": this.birthday,
                    //         "marriagestatus_m": this.selectMarry,
                    //         "identif_m": this.idCard,
                    //         "idcardtype_m": "身份证",
                    //         "country_m": this.country,
                    //         "nationality_m": this.nation,
                    //         "hometown_m": this.selectArea,
                    //         "education_m": '',
                    //         "profession_m": this.selectJob,
                    //         "identityaddress_m": this.address,
                    //         "phone_m": this.phone,
                    //         "address": "",
                    //         "education_m": '',
                    //         "visit_card_m": this.icCard,


                    //         "name_w": this.addBindMsg.PAT_NAME,
                    //         "age_w": this.addBindMsg.AGE,
                    //         "birthday_w": (this.addBindMsg.DATE_BIRTH).slice(0,10),
                    //         "marriagestatus_w": this.addBindMsg.MARITAL_STATUS_NAME,
                    //         "idcardtype_w": "身份证",
                    //         "identif_w": this.addBindMsg.ID_NUMBER,
                    //         "country_w": this.addBindMsg.NATION_NAME,
                    //         "nationality_w": this.addBindMsg.ETHNIC_NAME,
                    //         "hometown_w": this.addBindMsg.CURR_ADDR,
                    //         "education_w": '',
                    //         "profession_w": this.addBindMsg.OCCUPATION_CATEG_NAME,
                    //         "identityaddress_w": this.addBindMsg.CURR_ADDR,
                    //         "phone_w": this.addBindMsg.PHONE_NO,
                    //         "img_url_w": '',
                    //         "perCusService_w": this.addBindMsg.OPPERATER,
                    //         "visit_card_w": this.addBindMsg.CARD_ID_NUMBER
                    // })
                    // console.log(data);
                    // console.log(this.$route.query)
                    this.fullscreenLoading = true;
                    if(this.addBindMsg.PHYSI_SEX_NAME == "男"){
                        axios.post(baseUrl +'api/his/bind_patient', JSON.stringify({
                            "hospitalNo": this.hospitalIndex,
                            "OP_NO": this.opNo,
                            "OP_Name": this.opName,
                            "OP_IssuerNo": this.opNo,
                            "OP_Issuer": this.opName,
                            "channel": "kefu",

                            "name_m": this.addBindMsg.PAT_NAME,
                            "age_m": this.addBindMsg.AGE,
                            "birthday_m": (this.addBindMsg.DATE_BIRTH).slice(0,10),
                            "marriagestatus_m": this.addBindMsg.MARITAL_STATUS_NAME,
                            "identif_m": this.addBindMsg.ID_NUMBER,
                            "idcardtype_m": "身份证",
                            "country_m": this.addBindMsg.NATION_NAME,
                            "nationality_m": this.addBindMsg.ETHNIC_NAME,
                            "hometown_m": this.addBindMsg.ADDR,
                            "education_m": '',
                            "profession_m": this.addBindMsg.OCCUPATION_CATEG_NAME,
                            "identityaddress_m": this.addBindMsg.CURR_ADDR,
                            "phone_m": this.addBindMsg.PHONE_NO,
                            
                            "perCusService_m": this.addBindMsg.OPPERATER,
                            "education_m": '',
                            "visit_card_m": this.addBindMsg.CARD_ID_NUMBER,


                            "name_w": this.name,    
                            "age_w": this.age,
                            "birthday_w": this.birthday,
                            "marriagestatus_w": this.selectMarry,
                            "idcardtype_w": "身份证",
                            "identif_w": this.idCard,
                            "country_w": this.country,
                            "nationality_w": this.nation,
                            "hometown_w": this.selectArea,
                            "education_w": '',
                            "profession_w": this.selectJob,
                            "identityaddress_w": this.address,
                            "phone_w": this.phone,
                            "img_url_w": '',
                            "address": this.selectArea,
                            "visit_card_w": this.icCard,
                            "perCusService_w": this.selectService,

                        }))
                        .then(res=>{
                            this.fullscreenLoading = false;
                            console.log(res);
                               if(res.data.status == 200200){
                                this.successMsg = "补录成功"
                                this.$message({
                                    message: this.successMsg,
                                    type: 'success'
                                });
                                this.icCard = res.data.msg.visit_card_w;
                                this.addBtnDisabled = false;
                                this.fileDisabled = true;
                                this.hasCardShow = false;
                            }else if(res.data.status == 400201){
                                this.tipMsg = res.data.status + " " +res.data.desc;
                                this.dialogVisible = true;
                            }else if(res.data.status == 400400){
                                this.tipMsg = res.data.status + " " + res.data.desc;
                                this.dialogVisible = true;
                            }else if(res.data.status == 400003){
                                this.tipMsg = "参数错误" + res.data.status + " " + res.data.desc;
                                this.dialogVisible = true;
                            }else{
                                this.tipMsg = "服务器错误" + res.data.status + " " +res.data.desc;
                                this.dialogVisible = true;
                            }
                        }).catch(err=>{
                            this.fullscreenLoading = false;
                            console.log(err);
                            this.tipMsg = "服务器出错" + err;
                            this.dialogVisible = true;
                        })
                    }else if(this.addBindMsg.PHYSI_SEX_NAME == "女"){
                        axios.post(baseUrl +'api/his/bind_patient', JSON.stringify({
                            "hospitalNo": this.hospitalIndex,
                            "OP_NO": this.opNo,
                            "OP_Name": this.opName,
                            "OP_IssuerNo": this.opNo,
                            "OP_Issuer": this.opName,
                            "channel": "kefu",

                            "name_m": this.name,
                            "age_m": this.age,
                            "birthday_m": this.birthday,
                            "marriagestatus_m": this.selectMarry,
                            "identif_m": this.idCard,
                            "idcardtype_m": "身份证",
                            "country_m": this.country,
                            "nationality_m": this.nation,
                            "hometown_m": this.address,
                            "education_m": '',
                            "profession_m": this.selectJob,
                            "identityaddress_m": this.address,
                            "phone_m": this.phone,
                            "address": this.selectArea,
                            "education_m": '',
                            "visit_card_m": this.icCard,
                            "perCusService_m": this.selectService,


                            "name_w": this.addBindMsg.PAT_NAME,
                            "age_w": this.addBindMsg.AGE,
                            "birthday_w": (this.addBindMsg.DATE_BIRTH).slice(0,10),
                            "marriagestatus_w": this.addBindMsg.MARITAL_STATUS_NAME,
                            "idcardtype_w": "身份证",
                            "identif_w": this.addBindMsg.ID_NUMBER,
                            "country_w": this.addBindMsg.NATION_NAME,
                            "nationality_w": this.addBindMsg.ETHNIC_NAME,
                            "hometown_w": this.addBindMsg.CURR_ADDR,
                            "education_w": '',
                            "profession_w": this.addBindMsg.OCCUPATION_CATEG_NAME,
                            "identityaddress_w": this.addBindMsg.CURR_ADDR,
                            "phone_w": this.addBindMsg.PHONE_NO,
                            "img_url_w": '',
                            "perCusService_w": this.addBindMsg.OPPERATER,
                            "visit_card_w": this.addBindMsg.CARD_ID_NUMBER
                        }))
                        .then(res=>{
                            this.fullscreenLoading = false;
                            console.log(res);
                            if(res.data.status == 200200){
                                this.successMsg = "补录成功"
                                this.$message({
                                    message: this.successMsg,
                                    type: 'success'
                                });
                                this.icCard = res.data.msg.visit_card_m;
                                this.addBtnDisabled = false;
                                this.fileDisabled = true;
                                this.hasCardShow = false;
                            }else if(res.data.status == 400201){
                                this.tipMsg = res.data.desc + res.data.status;
                                this.dialogVisible = true;
                            }else if(res.data.status == 400003){
                                this.tipMsg = "参数错误" + res.data.status;
                                this.dialogVisible = true;
                            }else{
                                this.tipMsg = "服务器错误" + res.data.status;
                                this.dialogVisible = true;
                            }
                        }).catch(err=>{
                            this.fullscreenLoading = false;
                            console.log(err);
                            this.tipMsg = "服务器出错" + err;
                            this.dialogVisible = true;
                        })
                    }
                }
            },



            // 下拉选项
            selectMarryBtn(){
                console.log(this.selectMarry);
            },
            selectAreaBtn(){
                console.log(this.selectArea);
            },
            selectJobBtn(){
                console.log(this.selectJob);
            },
            selectHospitalBtn(){
                console.log(this.selectHospitalIndex);
            },
            selectServiceBtn(){
                console.log(this.selectService)
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
            //     this.selectMarry = item.value;
            // },




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



            // 失去加点计算年龄

            computedAge(){
                var date = new Date();
                var year = date.getFullYear();
                this.age = year - (this.idCard.slice(6,10));
                console.log(this.idCard.slice(6,10))
                this.birthday =  this.idCard.slice(6,10) + '年' + this.idCard.slice(10, 12) + '月' + this.idCard.slice(12, 14) + '日';
            },


            // 补录事件

            subBtn(){
                var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                if(this.name == '' || this.sex == '' || this.idCard == '' || this.birthday == '' || this.nation == '' || this.address == ''){
                    this.tipMsg = "请先填入用户信息";
                    this.dialogVisible = true;
                }else if(!phoneReg.test(this.phone)){
                    this.tipMsg = "请输入正确的手机号";
                    this.dialogVisible = true;
                }else if(this.selectHospitalIndex == ''){
                    this.tipMsg = "请选择发卡机构";
                    this.dialogVisible = true;
                }else{
                    this.confirmPop = true;
                }
            },
            
            confirmPopBtn(){
                    this.loading = true;
                    if(this.addBindMsg.PHYSI_SEX_NAME == "男"){
                        axios.post(baseUrl + "api/hospital/admin/user/auth",JSON.stringify({
                            "OP_NO": this.opNo,
                            "OP_Name": this.opName,
                            "OP_IssuerNo": this.opNo,
                            "OP_Issuer": this.opName,
                            "channel": "kefu",
                            "hospitalNo": this.hospitalIndex,
                            "PER_Service": this.order,

                            "medical_card_number_m": this.addBindMsg.CARD_ID_NUMBER,
                            "name_m": this.addBindMsg.PAT_NAME,
                            "identif_m": this.addBindMsg.ID_NUMBER,
                            "marriagestatus_m": this.addBindMsg.MARITAL_STATUS_NAME,
                            "age_m": this.addBindMsg.AGE,
                            "birthday_m": (this.addBindMsg.DATE_BIRTH).slice(0,10),
                            "nationality_m": this.addBindMsg.ETHNIC_NAME,
                            "country_m": this.addBindMsg.NATION_NAME,
                            "identityaddress_m": this.addBindMsg.CURR_ADDR,
                            "profession_m": this.addBindMsg.OCCUPATION_CATEG_NAME,
                            "phone_m": this.addBindMsg.PHONE_NO,
                            "is_auth_m": "",
                            "hometown_m": this.addBindMsg.ADDR,
                            "idcardtype_m": "身份证",
                            "id_face_image_m": "",
                            "scene_face_image_m": "",
                            "department_m": "",
                            "perCusService_m": this.addBindMsg.OPPERATER,
                            
                            "medical_card_number_w": this.icCard,
                            "name_w": this.name,
                            "identif_w": this.idCard,
                            "marriagestatus_w": this.selectMarry,
                            "age_w": this.age,
                            "birthday_w": this.birthday,
                            "nationality_w": this.nation,
                            "country_w": this.country,
                            "identityaddress_w": this.address,
                            "profession_w": this.selectJob,
                            "phone_w": this.phone,
                            "is_auth_w": "",
                            "id_face_image_w": "",
                            "scene_face_image_w": "",
                            "hometown_w": this.selectedArea,
                            "idcardtype_w": "身份证",
                            "department_w": "",
                            "perCusService_w": this.selectService,
                        })).then(res=>{
                            console.log(res);
                            this.loading = false;
                            this.$router.push({
                            path: '/card', 
                            query: {name_w: this.name, hospital: this.selectHospitalIndex, sex_w: this.sex,
                                        nation_w: this.nation, treat_w: this.icCard,
                                        phone_w: this.phone, idCard_w: this.idCard,
                                        name_m: this.addBindMsg.PAT_NAME, sex_m: this.addBindMsg.PHYSI_SEX_NAME,
                                        nation_m: this.addBindMsg.ETHNIC_NAME, treat_m: this.$route.query.icCard,
                                        phone_m: this.addBindMsg.PHONE_NO, idCard_m: this.addBindMsg.ID_NUMBER,
                                    }
                        });
                        }).catch(err=>{
                            console.log(err);
                            this.loading = false;
                        })
                    }else if(this.addBindMsg.PHYSI_SEX_NAME == "女"){
                        axios.post(baseUrl + "api/hospital/admin/user/auth",JSON.stringify({
                            "OP_NO": this.opNo,
                            "OP_Name": this.opName,
                            "OP_IssuerNo": this.opNo,
                            "OP_Issuer": this.opName,
                            "channel": "kefu",
                            "hospitalNo": this.hospitalIndex,
                            "PER_Service": this.order,

                            "medical_card_number_w": this.addBindMsg.CARD_ID_NUMBER,
                            "name_w": this.addBindMsg.PAT_NAME,
                            "identif_w": this.addBindMsg.ID_NUMBER,
                            "marriagestatus_w": this.addBindMsg.MARITAL_STATUS_NAME,
                            "age_w": this.addBindMsg.AGE,
                            "birthday_w": (this.addBindMsg.DATE_BIRTH).slice(0,10),
                            "nationality_w": this.addBindMsg.ETHNIC_NAME,
                            "country_w": this.addBindMsg.NATION_NAME,
                            "identityaddress_w": this.addBindMsg.CURR_ADDR,
                            "profession_w": this.addBindMsg.OCCUPATION_CATEG_NAME,
                            "phone_w": this.addBindMsg.PHONE_NO,
                            "is_auth_w": "",
                            "hometown_w": this.addBindMsg.ADDR,
                            "idcardtype_w": "身份证",
                            "id_face_image_w": "",
                            "scene_face_image_w": "",
                            "department_w": "",
                            "perCusService_w": this.addBindMsg.OPPERATER,

                            "medical_card_number_m": this.icCard,
                            "name_m": this.name,
                            "identif_m": this.idCard,
                            "marriagestatus_m": this.selectMarry,
                            "age_m": this.age,
                            "birthday_m": this.birthday,
                            "nationality_m": this.nation,
                            "country_m": this.country,
                            "identityaddress_m": this.address,
                            "profession_m": this.selectJob,
                            "phone_m": this.phone,
                            "is_auth_m": "",
                            "id_face_image_m": "",
                            "scene_face_image_m": "",
                            "hometown_m": this.selectedArea,
                            "idcardtype_m": "身份证",
                            "department_m": "",
                            "perCusService_m": this.selectService,
                        })).then(res=>{
                            console.log(res);
                            this.loading = false;
                            this.$router.push({
                            path: '/card', 
                            query: {name_m: this.name, hospital: this.selectHospitalIndex, sex_m: this.sex,
                                        nation_m: this.nation, treat_m: this.icCard,
                                        phone_m: this.phone, idCard_m: this.idCard,
                                        name_w: this.addBindMsg.PAT_NAME, sex_w: this.addBindMsg.PHYSI_SEX_NAME,
                                        nation_w: this.addBindMsg.ETHNIC_NAME, treat_w: this.$route.query.icCard,
                                        phone_w: this.addBindMsg.PHONE_NO, idCard_w: this.addBindMsg.ID_NUMBER,
                                    }
                        });
                        }).catch(err=>{
                            console.log(err);
                            this.loading = false;
                        })
                    }
            },



            // 提示性
            success() {
                this.$message({
                message: '填入成功!',
                type: 'success'
                });
            },


            // 立即挂号

            orderBtn(){
                this.$router.push({
                    path: 'order',
                    query: {

                    }
                })
            },


            // 监听输入框是否有值
            name_input(){
                console.log(this.name);
                if(this.name != ''){
                    this.fileDisabled = false;
                    this.hasCardShow = false;
                }else{
                    this.fileDisabled = true;
                    this.hasCardShow = true;
                }
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
                        var that = this;
                        if(tempHospitalNum == 76){
                            this.hospitalNum = "111";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }else if(tempHospitalNum == 73){
                            this.hospitalNum = "114";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }else if(tempHospitalNum == 74){
                            this.hospitalNum = "113";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }else if(tempHospitalNum == 75){
                            this.hospitalNum = "112";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }else if(tempHospitalNum == 77){
                            this.hospitalNum = "109";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }else if(tempHospitalNum == 78){
                            this.hospitalNum = "110";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }else if(tempHospitalNum == 79){
                            this.hospitalNum = "108";
                            this.getService();
                            for(var i=0;i<this.hospitalArr.length;i++){
                                if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                                    this.selectHospitalIndex = this.hospitalArr[i].hospitalName;
                                    this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                                }
                            };
                        }

                    }else{
                        this.tipMsg = "获取医院列表失败" + res.data.status + res.data.msg;
                    };


                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        created(){
            
        },
        beforeMount(){
            this.getHospitalList();
        },
        mounted(){
            if(this.$route.query != ''){
                this.sexIcCard = this.$route.query.icCard;
                if(this.$route.query.sex == "男"){
                    this.sexMsg = "男方就诊卡号："
                }else if(this.$route.query.sex == "女"){
                    this.sexMsg = "女方就诊卡号："
                };
            };


            this.addBindMsg = JSON.parse(localStorage.getItem("addBind"));
            
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
            this.opNo = UrlSearch(url, 'opNo');
            // console.log(1)
            this.opName = UrlSearch(url, 'opName');
            
            // console.log(2)
            this.fkPerson = UrlSearch(url, 'opName');
            this.hospitalNum = UrlSearch(url, 'hospitalId');
            // console.log(tempHospitalNum)
            // console.log(this.hospitalArr,456);
            
            // for(var i=0;i<this.hospitalArr.length;i++){
            //     console.log(123)
            //     if(tempHospitalNum == 73){
            //         this.hospitalNum = "114";
                    
            //     }else if(tempHospitalNum == 74){
            //         this.hospitalNum = "113";
            //         this.selectHospitalIndex = "113"
            //     }else if(tempHospitalNum == 75){
            //         this.hospitalNum = "112";
            //         this.selectHospitalIndex = "112"
            //     }else if(tempHospitalNum == 76){
            //         this.hospitalNum = "111";
            //         this.selectHospitalIndex = "111"
            //     }else if(tempHospitalNum == 77){
            //         this.hospitalNum = "109";
            //         this.selectHospitalIndex = "109";
            //     }else if(tempHospitalNum == 78){
            //         this.hospitalNum = "110";
            //         this.selectHospitalIndex = "110";
            //     }else if(tempHospitalNum == 79){
            //         this.hospitalNum = "108";
            //         this.selectHospitalIndex = "108"
            //     }
            // }
            


           

           

            





            
            // console.log(3)
            // var kf = UrlSearch(url, 'kf');
            // console.log(4)
            // var _url = decodeURIComponent(url);
            // console.log(5)
            // var _kf = unescape(kf.replace(/\\u/g, '%u'));
            
            // try
            //     {
            //     var kfArr = _kf.slice(0,_kf.lastIndexOf("]")+1);
            //     this.serviceArr = eval ("(" + kfArr+ ")"); 
            //     }
            // catch(err)
            // {
            //     console.log(err);
            //     this.serviceArr = eval ("(" + _kf+ ")");   
            // }


            // console.log(6);
            // console.log(_kf);
            // // var kfArr = _kf.slice(0,-10);
            // console.log(7)
            // // console.log(kfArr)
            // this.serviceArr = eval ("(" + _kf+ ")"); 
            // console.log(this.serviceArr)
            // console.log(8)

        }
    }
</script>
<style lang="scss" scoped>
    @import './add.scss';
     .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
<style>
    .el-input>.el-input__inner{
        color: #000 !important;
    }
    input::-webkit-input-placeholder{
        color: #000 !important;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
        background-color: #ddd;
    }
    .el-autocomplete-suggestion li.highlighted, .el-autocomplete-suggestion li:hover{
        background-color: #ddd;
    }
</style>
