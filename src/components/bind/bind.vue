<template>
    <div class="newRegister">
        <div class="header">
            <p><span>{{msg}}</span></p>
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
        <div class="main">
            <div class="main_top clear">
                <h1 style="float:left;height:70px;width:30%;padding-left:4%">
                    <span style="width:40px;height:40px;border-radius:50%;
                    background-color:#e6a23c;display:inline-block;
                    font-size:14px;text-align:center;line-height:40px;border:1px solid #666">1</span>
                    <span style="color:#ccc;height:70px;line-height:70px;">———</span>
                    <span style="width:40px;height:40px;border-radius:50%;
                    background-color:#ccc;display:inline-block;
                    font-size:14px;text-align:center;line-height:40px;border:1px solid #666">2</span>
                    <span style="font-size:16px; color:#999;">补录配偶信息</span>
                </h1>
                <ul>
                    <li>
                        <label for="" style="width:70px">选择医院：</label>
                        <el-select @focus="enter" v-model="hospitalIndex" clearable style="width:55%" filterable placeholder="==请选择==" :filterMethod="hospitalFilter">
                            <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                                <span>{{item.hospitalName}}</span>
                                <span style="float:right">{{item.pinyin}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li style="width:30%;">
                        <el-select @focus="enter" v-model="deviceSelect" v-loading.fullscreen.lock="loading" v-on:change="selectUser" clearable style="width:90%" filterable placeholder="==请选择==" :filterMethod="deviceFilter">
                            <el-option v-for="item in deviceMsgArr"  :key="item.name"  :label="item.name" :value="item.id">
                                <span>{{item.name}}</span>
                                <span style="margin-left:5px;">{{item.sex}}</span>
                                <span style="float:right">{{item.is_gzt}}</span>
                            </el-option>
                        </el-select>
                    </li>
                    <li style="width:18%;float:right">
                        <el-button type="warning" @click="getPrevUserMsg" v-loading.fullscreen.lock="loading">最近一条</el-button>
                    </li>
                </ul>
            </div>
            <div class="main_msg clear">
                <div class="main_msg_w">
                    <h1><span>女方信息</span><span v-show="gztShow_w" :style="{color: bgcolor_w,float:right,fontSize: fontSize + 'px' }">{{gztMsg_w}}</span></h1>
                    <div class="msg_left_w">
                        <img :src="idImg_w" style="width:110px;height:130px;" alt="">
                        <img :src="faceImg_w" style="width:110px;height:130px;" alt="">
                    </div>
                    <ul class="clear">
                        <li>
                            <label for="">姓名：</label>
                             <el-input placeholder="姓名" :disabled="nameDisabled_w" v-on:input="nameValue(name_w)" v-model="name_w"></el-input>
                        </li>
                        <li>
                            <label for="">性别：</label>
                             <!-- <el-input placeholder="性别" v-model="sex_w"></el-input> -->
                             <el-select v-model="sex_w" :disabled="sexDisabled_w" @focus="enter" clearable  style="width:64%" filterable placeholder="性别" :filterMethod="sexFilter_w">
                                <el-option v-for="item in sexArr_w"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <!-- <span style="float:right">{{item.name}}</span> -->
                                </el-option>
                            </el-select>
                        </li>
                        <li style="width:100%">
                            <label for="">身份证：</label>
                             <el-input placeholder="身份证" :disabled="idCardDisabled_w" v-on:blur="computedAge_w" v-model="idCard_w" style="width:81%"></el-input>
                        </li>
                        <li>
                            <label for="">国籍：</label>
                             <!-- <el-input placeholder="国籍" v-model="country_w"></el-input> -->
                             <el-select @focus="enter" :disabled="countryDisabled_w" v-model="country_w" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="countryFilter_w">
                                <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">生日：</label>
                             <el-input placeholder="生日" :disabled="birthdayDisabled_w" v-model="birthday_w"></el-input>
                        </li>
                        <li>
                            <label for="">民族：</label>
                             <!-- <el-input placeholder="民族" v-model="nation_w"></el-input> -->
                             <el-select @focus="enter" :disabled="nationDisabled_w" v-model="nation_w" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="nationFilter_w">
                                <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">年龄：</label>
                             <el-input placeholder="年龄" :disabled="ageDisabled_w" v-model="age_w"></el-input>
                        </li>
                        <li style="width:100%;border-bottom:1px dashed #ccc;padding-bottom:3%;height:60px">
                            <label for="">户口地址：</label>
                            <el-input placeholder="户口地址" :disabled="homeTownDisabled_w" v-model="homeTown_w" style="width:81%"></el-input>
                        </li>
                        <li style="width:100%">
                            <label for="">现住址：</label>
                             <el-input placeholder="现住址" :disabled="addressDisabled_w" v-model="address_w" style="width:81%"></el-input>
                        </li>
                        <li>
                            <label for="">居住地：</label>
                             <!-- <el-input placeholder="居住地" v-model="place_w"></el-input> -->
                             <el-select @focus="enter" :disabled="placeDisabled_w" v-model="place_w" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="placeFilter_w">
                                <el-option v-for="item in placeArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">婚姻：</label>
                             <!-- <el-input placeholder="婚姻" v-model="marry_w"></el-input> -->
                             <el-select @focus="enter" :disabled="marryDisabled_w" v-model="marry_w" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="marryFilter_w">
                                <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">职业：</label>
                             <!-- <el-input placeholder="职业" v-model="job_w"></el-input> -->
                            <el-select @focus="enter" :disabled="jobDisabled_w" v-model="job_w" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="jobFilter_w">
                                <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">手机号：</label>
                             <el-input placeholder="手机号" :disabled="phoneDisabled_w" v-model="phone_w"></el-input>
                        </li>
                        <li>
                            <label for="">接待客服：</label>
                             <!-- <el-input placeholder="接待客服" v-model="service_w"></el-input> -->
                             <el-select @focus="enter" :disabled="serviceDisabled_w" v-model="service_w" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="serviceFilter_w">
                                <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                    <span>{{item.doc_name}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">就诊卡：</label>
                             <el-input placeholder="就诊卡" :disabled="icCardDisabled_w" v-model="icCard_w"></el-input>
                        </li>
                    </ul>
                </div>
                <div class="main_msg_m">
                    <h1><span>男方信息</span><span v-show="gztShow_m" :style="{color: bgcolor_m,float:right,fontSize: fontSize + 'px' }">{{gztMsg_m}}</span></h1>
                    <div class="msg_left_w">
                        <img :src="idImg_m" style="width:110px;height:130px;" alt="">
                        <img :src="faceImg_m" style="width:110px;height:130px;" alt="">
                    </div>
                    <ul class="clear">
                        <li>
                            <label for="">姓名：</label>
                             <el-input placeholder="姓名" :disabled="nameDisabled_m" v-on:input="nameValue(name_m)" v-model="name_m"></el-input>
                        </li>
                        <li>
                            <label for="">性别：</label>
                             <!-- <el-input placeholder="性别" v-model="sex_m"></el-input> -->
                             <el-select v-model="sex_m" :disabled="sexDisabled_m" @focus="enter" clearable  style="width:64%" filterable placeholder="性别" :filterMethod="sexFilter_m">
                                <el-option v-for="item in sexArr_m"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <!-- <span style="float:right">{{item.name}}</span> -->
                                </el-option>
                            </el-select>
                        </li>
                        <li style="width:100%">
                            <label for="">身份证：</label>
                             <el-input placeholder="身份证" :disabled="idCardDisabled_m" v-on:blur="computedAge_m" v-model="idCard_m" style="width:81%"></el-input>
                        </li>
                        <li>
                            <label for="">国籍：</label>
                             <!-- <el-input placeholder="国籍" v-model="country_m"></el-input> -->
                             <el-select @focus="enter" :disabled="countryDisabled_m" v-model="country_m" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="countryFilter_m">
                                <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">生日：</label>
                             <el-input placeholder="生日" :disabled="birthdayDisabled_m" v-model="birthday_m"></el-input>
                        </li>
                        <li>
                            <label for="">民族：</label>
                             <!-- <el-input placeholder="民族" v-model="nation_m"></el-input> -->
                             <el-select @focus="enter" :disabled="nationDisabled_m" v-model="nation_m" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="nationFilter_m">
                                <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">年龄：</label>
                             <el-input placeholder="年龄" :disabled="ageDisabled_m" v-model="age_m"></el-input>
                        </li>
                        <li style="width:100%;border-bottom:1px dashed #ccc;padding-bottom:3%;height:60px">
                            <label for="">户口地址：</label>
                             <el-input placeholder="户口地址" :disabled="homeTownDisabled_m" v-model="homeTown_m" style="width:81%"></el-input>
                        </li>
                        <li style="width:100%">
                            <label for="">现住址：</label>
                             <el-input placeholder="现住址" :disabled="addressDisabled_m" v-model="address_m" style="width:81%"></el-input>
                        </li>
                        <li>
                            <label for="">居住地：</label>
                             <!-- <el-input placeholder="居住地" v-model="place_m"></el-input> -->
                             <el-select @focus="enter" :disabled="placeDisabled_m" v-model="place_m" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="placeFilter_m">
                                <el-option v-for="item in placeArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">婚姻：</label>
                             <!-- <el-input placeholder="婚姻" v-model="marry_m"></el-input> -->
                             <el-select @focus="enter" :disabled="marryDisabled_m" v-model="marry_m" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="marryFilter_m">
                                <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">职业：</label>
                             <!-- <el-input placeholder="职业" v-model="job_m"></el-input> -->
                             <el-select @focus="enter" :disabled="jobDisabled_m" v-model="job_m" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="jobFilter_m">
                                <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <span style="float:right">{{item.name}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">手机号：</label>
                             <el-input placeholder="手机号" :disabled="phoneDisabled_m" v-model="phone_m"></el-input>
                        </li>
                        <li>
                            <label for="">接待客服：</label>
                             <!-- <el-input placeholder="接待客服" v-model="service_m"></el-input> -->
                             <el-select @focus="enter" :disabled="serviceDisabled_m" v-model="service_m" clearable style="width:64%" filterable placeholder="==请选择==" :filterMethod="serviceFilter_m">
                                <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                    <span>{{item.doc_name}}</span>
                                    <span style="float:right">{{item.pinyin}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="">就诊卡：</label>
                             <el-input placeholder="就诊卡" :disabled="icCardDisabled_m" v-model="icCard_m"></el-input>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer clear">
            <el-button type="warning" style="float:left;" @click="back">返回主菜单</el-button>
            <ul class="clear">
                <li>
                    <label for="" style="width:70px">发卡人：</label>
                    <el-input v-model="fkPerson" placeholder="发卡人" disabled></el-input>
                </li>
                <li>
                    <label for="" style="width:70px">预约号：</label>
                    <el-input v-model="orderNum" placeholder="预约号"></el-input>
                </li>
                <li style="width:16%">
                    <el-button type="warning"  v-loading.fullscreen.lock="loading" :disabled="subMsgHis" @click="subHisBtn">补录信息至HIS</el-button>
                </li>
                <li style="width:13%;margin-left:2%">
                    <el-button type="warning" :disabled="healthCard" @click="healthCardBtn">生成健康卡</el-button>
                </li>
            </ul>
        </div>


        <!-- 弹窗提示问题 -->

        <el-dialog title="提示" :visible.sync="tipsPop" width="30%" >
            <span>{{tips}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="tipsPop = false">关 闭</el-button>
            </span>
        </el-dialog>


        <!-- 有就诊卡号 -->

        <el-dialog title="提示" :visible.sync="hasIcCard"
            width="30%" >
            <span>该身份证已有就诊卡号：{{icCard}}</span>
            <p>国政通校验结果:<span style="color:#f60;margin-left:15px">{{gztMsg}}</span></p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delMsg">清空数据</el-button>
                <el-button type="warning" @click="inquire">用户查询</el-button>
                <el-button type="warning" @click="order">立即挂号</el-button>
            </span>
        </el-dialog>


        <!-- 国政通结果 -->
        <el-dialog title="提示" :visible.sync="gztPop" width="30%" >
            <p>国政通校验结果：<span style="color:#f60">{{gztMsg}}</span></p>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="gztPop = false">关 闭</el-button>
                <!-- <el-button type="warning" @click="getUserMsg" v-show="gztNumShow">重新校验</el-button> -->
            </span>
        </el-dialog>


    </div>
</template>
<script>
    import axios from 'axios';
    import baseUrl from '../base/baseUrl.js';
    import country from '../country.js';
    import area from '../area.js';
    import nation from '../nation.js';
    export default {
        data(){
            return{
                msg: '补录配偶',
                deviceInput: localStorage.getItem("deviceId"),//设备值
                deviceNum: true,//设备按钮点击disabled
                tipsPop: false,//弹窗显示隐藏
                tips: '',//弹窗提示语
                loading: false,//loading 



                hasIcCard: false,//有就诊卡号
                icCard: '',



                // 国政通
                gztMsg: '',
                gztPop: false,



                // 按钮的disabled
                subMsgHis: true,
                healthCard: true,


                // model
                name_w: '',
                sex_w: '',
                idCard_w: '',
                country_w: '中国',
                birthday_w: '',
                nation_w: '',
                age_w: '',
                homeTown_w: '',//户口地址
                address_w: '',
                place_w: '',
                marry_w: '已婚',
                job_w: '个体经营者',
                phone_w: '',
                service_w: '',
                icCard_w: '',
                faceImg_w: require('../../assets/background_faceid.png'),
                idImg_w: require('../../assets/background_idcard.png'),
                gztMsg_w: '',//国政通结果
                gztShow_w: '',//国政通显示隐藏
                bgcolor_w: '',//国政通字体颜色
                idCard_img_w: '',
                scene_face_image_w: '',
                verify_result_w: '',


                name_m: '',
                sex_m: '',
                idCard_m: '',
                country_m: '中国',
                birthday_m: '',
                nation_m: '',
                age_m: '',
                homeTown_m: '',//户口地址
                address_m: '',
                place_m: '',
                marry_m: '已婚',
                job_m: '个体经营者',
                phone_m: '',
                service_m: '',
                icCard_m: '',
                faceImg_m: require('../../assets/background_faceid.png'),
                idImg_m: require('../../assets/background_idcard.png'),
                gztMsg_m: '',//国政通结果
                gztShow_m: '',//国政通显示隐藏
                bgcolor_m: '',//国政通字体颜色
                right: "right",
                fontSize: "14",
                idCard_img_m: '',
                scene_face_image_m: '',
                verify_result_m: '',





                fkPerson: '',//发卡人
                orderNum: '',//预约号


                hospitalArr: [],//机构列表
                hospitalArr_new: [],//机构列表
                hospitalIndex: '',//机构编码
                hospitalNum: '',//再次赋值的机构编码
                sexArr_m: [{name: "N",value: "男"}],//性别
                sexArr_new_m: [],//性别
                sexArr_w: [{name: "N",value: "女"}],//性别
                sexArr_new_w: [],//性别
                countryArr: country,//国籍
                countryArr_new: country,//国籍
                nationArr: nation,//民族
                nationArr_new: nation,//民族
                placeArr: area,//居住地
                placeArr_new: area,//居住地
                marryArr: [
                        {name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
                ],//婚姻
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
                serviceArr: [],
                serviceArr_new: [],


                deviceMsgArr: [],//设备信息20条
                deviceMsgArr_new: [],
                deviceSelect: '',//选择某个人



                // ifream
                opNo: '',
                opName: '',



                // disabled

                nameDisabled_m: false,
                sexDisabled_m: false,
                idCardDisabled_m: false,
                countryDisabled_m: false,
                birthdayDisabled_m: false,
                nationDisabled_m: false,
                ageDisabled_m: false,
                homeTownDisabled_m: false,
                addressDisabled_m: false,
                placeDisabled_m: false,
                marryDisabled_m: false,
                jobDisabled_m: false,
                phoneDisabled_m: false,
                serviceDisabled_m: false,
                icCardDisabled_m: false,
                
                nameDisabled_w: false,
                sexDisabled_w: false,
                idCardDisabled_w: false,
                countryDisabled_w: false,
                birthdayDisabled_w: false,
                nationDisabled_w: false,
                ageDisabled_w: false,
                homeTownDisabled_w: false,
                addressDisabled_w: false,
                placeDisabled_w: false,
                marryDisabled_w: false,
                jobDisabled_w: false,
                phoneDisabled_w: false,
                serviceDisabled_w: false,
                icCardDisabled_w: false,

            }
        },
        methods: {
            back(){
                this.$router.push({
                    path: '/'
                })
            },
            editDevice(){
                this.deviceNum = false;
            },
            bulrDevice(){
                this.deviceNum = true;
                var data = JSON.parse(this.$route.query.data);
                if(data.PHYSI_SEX_NAME == "女"){
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
                }else if(data.PHYSI_SEX_NAME == "男"){
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
                // axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput + "/list")
                // .then(res=>{
                //     console.log(res);
                //     if(res.data.status == 200040){
                //         this.deviceMsgArr = res.data.msg;
                //         this.deviceMsgArr_new = res.data.msg;
                //         for (var i=0;i<this.deviceMsgArr.length;i++){
                //             if(this.deviceMsgArr[i].sex == 0){
                //                 this.deviceMsgArr[i].sex="男"; //改变列表渲染的
                //             }else if(this.deviceMsgArr[i].sex == 1){
                //                 this.deviceMsgArr[i].sex="女";
                //             };

                //             if(this.deviceMsgArr[i].is_gzt == -2){
                //                 this.deviceMsgArr[i].is_gzt="失败"; //改变列表渲染的
                //             }else if(this.deviceMsgArr[i].is_gzt == 1){
                //                 this.deviceMsgArr[i].is_gzt="成功";
                //             };
                //         }
                //     }
                    
                // }).catch(err=>{
                //     console.log(err);
                // })
            },
            enter(){

            },

// 计算年龄生日
            computedAge_m(){
                if(this.idCard_m != ''){
                    var date = new Date();
                    var year = date.getFullYear();
                    this.age_m = year - (this.idCard_m.slice(6,10));
                    this.birthday_m =  this.idCard_m.slice(6,10) + '年' + this.idCard_m.slice(10, 12) + '月' + this.idCard_m.slice(12, 14) + '日';
                }
            },
            computedAge_w(){
                if(this.idCard_w != ''){
                     var date = new Date();
                    var year = date.getFullYear();
                    this.age_w = year - (this.idCard_w.slice(6,10));
                    this.birthday_w =  this.idCard_w.slice(6,10) + '年' + this.idCard_w.slice(10, 12) + '月' + this.idCard_w.slice(12, 14) + '日';
                }
            },


            // 过滤
            hospitalFilter(val) {
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
            sexFilter_m(val) {
                if (val) {
                    var tempArr = [];
                    this.sexArr_new_m.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.sexArr = tempArr;
                } else {
                    this.sexArr = this.sexArr_new_m;
                }
            },
            sexFilter_w(val) {
                if (val) {
                    var tempArr = [];
                    this.sexArr_new_w.forEach(function(opt, index){
                    if (opt['name'].toUpperCase().indexOf(val.toUpperCase()) == 0 || opt['value'].indexOf(val) == 0) {
                        tempArr.push(opt);
                    }
                    });
                    this.sexArr_w = tempArr;
                } else {
                    this.sexArr_w = this.sexArr_new_w;
                }
            },
            countryFilter_m(val){
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
            countryFilter_w(val){
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
            nationFilter_m(val){
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
            nationFilter_w(val){
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
            placeFilter_m(val){
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
            placeFilter_w(val){
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
            marryFilter_m(val){
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
            marryFilter_w(val){
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
            jobFilter_m(val){
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
            jobFilter_w(val){
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
            serviceFilter_m(val){
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
            serviceFilter_w(val){
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
            

            // 监听输入框的值

            nameValue(){
                // console.log(this.name_m,this.name_w);
                if(this.name_w != '' || this.name_m != ''){
                    this.subMsgHis = false;
                }else{
                    this.subMsgHis = true;
                }
            },




            // 选择某个人的详细信息
            selectUser(){
                // console.log(this.deviceSelect);
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
                        localStorage.setItem("deviceId",res.data.msg.device_id);
                        if(res.data.msg.sex == 0){
                            var sex = "";
                            sex = "男";
                            var date = new Date();
                            var year = date.getFullYear();

                            this.name_m = res.data.msg.name;
                            this.sex_m = sex;
                            this.idCard_m = res.data.msg.id_number;
                            this.birthday_m = res.data.msg.birthday;
                            this.nation_m = res.data.msg.nation;
                            this.age_m = year - res.data.msg.birthday.slice(0,4);
                            this.homeTown_m = res.data.msg.address;
                            this.phone_m = res.data.msg.phone;
                            this.faceImg_m = "data:image/png;base64," + res.data.msg.face_image;
                            this.idImg_m = "data:image/png;base64," + res.data.msg.id_image;
                            this.idCard_img_m = res.data.msg.id_image;
                            this.scene_face_image_m = res.data.msg.face_image;
                            this.verify_result_m = res.data.msg.is_gzt;
                            this.icCard = res.data.msg.medical_card_number;
                            this.icCard_m= res.data.msg.medical_card_number;

                            if(res.data.msg.is_gzt == 1){
                                this.gztMsg_m = "国政通校验成功";
                                this.gztShow_m = true;
                                this.bgcolor_m = "blue"
                            }else{
                                this.gztMsg_m = "国政通校验失败";
                                this.gztShow_m = true;
                                this.bgcolor_m = "red";
                            };
                        }else if(res.data.msg.sex == 1){
                            var sex = "";
                            sex = "女";
                            var date = new Date();
                            var year = date.getFullYear();

                            this.name_w = res.data.msg.name;
                            this.sex_w = sex;
                            this.idCard_w = res.data.msg.id_number;
                            this.birthday_w = res.data.msg.birthday;
                            this.nation_w = res.data.msg.nation;
                            this.age_w = year - res.data.msg.birthday.slice(0,4);
                            this.homeTown_w = res.data.msg.address;
                            this.phone_w = res.data.msg.phone;
                            this.faceImg_w = "data:image/png;base64," + res.data.msg.face_image;
                            this.idImg_w = "data:image/png;base64," + res.data.msg.id_image;
                            this.idCard_img_w = res.data.msg.id_image;
                            this.scene_face_image_w = res.data.msg.face_image;
                            this.verify_result_w = res.data.msg.is_gzt;
                            this.icCard = res.data.msg.medical_card_number;
                            this.icCard_w = res.data.msg.medical_card_number;

                            if(res.data.msg.is_gzt == 1){
                                this.gztMsg_w = "国政通校验成功";
                                this.gztShow_w = true;
                                this.bgcolor_w = "blue";
                            }else{
                                this.gztMsg_w = "国政通校验失败";
                                this.gztShow_w = true;
                                this.bgcolor_w = "red";
                            };
                        };
                        if(res.data.msg.medical_card_number == ''){
                            this.subMsgHis = false;
                            this.healthCard = true;
                            this.icCard = res.data.msg.medical_card_number;
                            this.hasIcCard = false;
                            this.gztPop = true;
                        }else {
                            this.subMsgHis = true;
                            this.healthCard = false;
                            this.hasIcCard = true;
                            this.gztPop = false;
                        };

                        // 国政通结果
                        if(res.data.msg.is_gzt == 1 && res.data.msg.score > 100){
                            this.gztMsg = "该用户已实名"
                        }else if(res.data.msg.is_gzt == -1){
                            this.gztMsg = "未检测到有效人脸，请重新拍照"
                        }else if(res.data.msg.is_gzt == 0){
                            this.gztMsg = "国政通连接失败，请重新试一次"
                        }else if(res.data.msg.is_gzt == -2){
                            this.gztMsg = "国政通验证失败，人脸匹配度太低" + res.data.msg.score;
                            this.gztNumShow = true;
                        }else if(res.data.msg.is_gzt == 1){
                            this.gztMsg = "国政通实名成功" + res.data.msg.score;
                        };
                    }else {
                        this.tips = "获取信息失败" + res.data.status;
                        this.tipsPop = true;
                    }
                }).catch(err=>{
                    console.log(err);
                    loading.close();
                })
            },

            // 获取最近的一条信息
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
                    axios.get(baseUrl + "api/sensetime/data/" + this.deviceInput + "/" + this.deviceMsgArr[0].id)
                    .then(res=>{
                        console.log(res);
                        loading.close();
                        if(res.data.status == 200040){
                            localStorage.setItem("deviceId",res.data.msg.device_id);
                            if(res.data.msg.sex == 0){
                                var sex = "";
                                sex = "男";
                                var date = new Date();
                                var year = date.getFullYear();

                                this.name_m = res.data.msg.name;
                                this.sex_m = sex;
                                this.idCard_m = res.data.msg.id_number;
                                this.birthday_m = res.data.msg.birthday;
                                this.nation_m = res.data.msg.nation;
                                this.age_m = year - res.data.msg.birthday.slice(0,4);
                                this.homeTown_m = res.data.msg.address;
                                this.faceImg_m = "data:image/png;base64," + res.data.msg.face_image;
                                this.idImg_m = "data:image/png;base64," + res.data.msg.id_image;
                                this.idCard_img_m = res.data.msg.id_image;
                                this.scene_face_image_m = res.data.msg.face_image;
                                this.verify_result_m = res.data.msg.is_gzt;
                                this.icCard = res.data.msg.medical_card_number;
                                this.icCard_m= res.data.msg.medical_card_number;

                                if(res.data.msg.is_gzt == 1){
                                    this.gztMsg_m = "国政通校验成功";
                                    this.gztShow_m = true;
                                    this.bgcolor_m = "blue";
                                }else{
                                    this.gztMsg_m = "国政通校验失败";
                                    this.gztShow_m = true;
                                    this.bgcolor_m = "red";
                                };
                                
                            }else if(res.data.msg.sex == 1){
                                var sex = "";
                                sex = "女";
                                var date = new Date();
                                var year = date.getFullYear();

                                this.name_w = res.data.msg.name;
                                this.sex_w = sex;
                                this.idCard_w = res.data.msg.id_number;
                                this.birthday_w = res.data.msg.birthday;
                                this.nation_w = res.data.msg.nation;
                                this.age_w = year - res.data.msg.birthday.slice(0,4);
                                this.homeTown_w = res.data.msg.address;
                                this.faceImg_w = "data:image/png;base64," + res.data.msg.face_image;
                                this.idImg_w = "data:image/png;base64," + res.data.msg.id_image;
                                this.idCard_img_w = res.data.msg.id_image;
                                this.scene_face_image_w = res.data.msg.face_image;
                                this.verify_result_w = res.data.msg.is_gzt;
                                this.icCard = res.data.msg.medical_card_number;
                                this.icCard_w= res.data.msg.medical_card_number;

                                if(res.data.msg.is_gzt == 1){
                                    this.gztMsg_w = "国政通校验成功";
                                    this.gztShow_w = true;
                                    this.bgcolor_w = "blue"
                                }else{
                                    this.gztMsg_w = "国政通校验失败";
                                    this.gztShow_w = true;
                                    this.bgcolor_w = "red";
                                };
                                if(res.data.msg.medical_card_number == ''){
                                    this.subMsgHis = false;
                                }else {
                                    this.subMsgHis = true;
                                }
                            };
                            if(res.data.msg.medical_card_number == ''){
                                this.subMsgHis = false;
                                this.healthCard = true;
                                this.icCard = res.data.msg.medical_card_number;
                                this.hasIcCard = false;
                                this.gztPop = true;
                            }else {
                                this.subMsgHis = true;
                                this.healthCard = false;
                                this.hasIcCard = true;
                                this.gztPop = false;
                            };


                            // 国政通结果
                            if(res.data.msg.is_gzt == 1 && res.data.msg.score > 100){
                                this.gztMsg = "该用户已实名"
                            }else if(res.data.msg.is_gzt == -1){
                                this.gztMsg = "未检测到有效人脸，请重新拍照"
                            }else if(res.data.msg.is_gzt == 0){
                                this.gztMsg = "国政通连接失败，请重新试一次"
                            }else if(res.data.msg.is_gzt == -2){
                                this.gztMsg = "国政通验证失败，人脸匹配度太低" + res.data.msg.score;
                                this.gztNumShow = true;
                            }else if(res.data.msg.is_gzt == 1){
                                this.gztMsg = "国政通实名成功" + res.data.msg.score;
                            };

                        }else if(res.data.status == 400040){
                            this.tips = "请先放入身份证进行检测";
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



            // 获取设备信息
            getDeviceMsg(){
                // console.log(this.deviceInput)
                if(this.deviceInput == '' || this.deviceInput == null){
                    this.tips = "请先输入设备编号"
                    this.tipsPop = true;
                }else{
                    var data = JSON.parse(this.$route.query.data);
                    if(data.PHYSI_SEX_NAME == "女"){
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
                    }else{
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



            // 补录信息至HIS按钮
            
            subHisBtn(){
                var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                var idCardreg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
                console.log(this.phone_w);
                if(this.name_m != '' && (this.sex_m == '' || this.idCard_m == '' || this.nation_m == '')){
                    this.tips = "请先完善男方信息";
                    this.tipsPop = true;
                }else if(this.name_w != '' && (this.sex_w == '' || this.idCard_w == '' || this.nation_w == '')){
                    this.tips = "请先完善女方信息";
                    this.tipsPop = true;
                }else if(this.name_m != '' && !phoneReg.test(this.phone_m)){
                    this.tips = "请输入男方正确的手机号";
                    this.tipsPop = true;
                }else if(this.name_w != '' && !phoneReg.test(this.phone_w)){
                    this.tips = "请输入女方正确的手机号";
                    this.tipsPop = true;
                }else {
                    console.log(this.hospitalNum);
                    var data = JSON.stringify({
                        "OP_NO": this.opNo,
                        "OP_Name": this.opName,
                        "OP_IssuerNo": this.opNo,
                        "OP_Issuer": this.opName,
                        "channel": "kefu",
                        "hospitalNo": this.hospitalNum,
                        "PER_Service": this.orderNum,

                        "name_m": this.name_m,
                        "sex_m": this.sex_m,
                        "identif_m": this.idCard_m,
                        "marriagestatus_m": this.marry_w,
                        "age_m": this.age_m,
                        "birthday_m": this.birthday_m,
                        "nationality_m": this.nation_m,
                        "country_m": this.country_m,
                        "identityaddress_m": this.address_m,
                        "profession_m": this.job_m,
                        "phone_m": this.phone_m,
                        "hometown_m": this.place_m,
                        "perCusService_m": this.service_m,
                        "visit_card_m": this.icCard_m,
                        "registered_addr_m": this.homeTown_m,

                        
                        "name_w": this.name_w,
                        "sex_w": this.sex_w,
                        "identif_w": this.idCard_w,
                        "marriagestatus_w": this.marry_w,
                        "age_w": this.age_w,
                        "birthday_w": this.birthday_w,
                        "nationality_w": this.nation_w,
                        "country_w": this.country_w,
                        "identityaddress_w": this.address_w,
                        "profession_w": this.job_w,
                        "phone_w": this.phone_w,
                        "hometown_w": this.place_w,
                        "perCusService_w": this.service_w,
                        "visit_card_w": this.icCard_w,
                        "registered_addr_w": this.homeTown_w,
                    });
                    this.loading = true;
                    // console.log(data)
                    axios.post(baseUrl +'api/his/create_patient', data)
                    .then(res=>{
                        console.log(res);
                        this.loading = false;
                        if(res.data.status == 200202){
                            this.subMsgHis = true;
                            this.healthCard = false;
                            this.icCard_m = res.data.msg.visit_card_m;
                            this.icCard_w = res.data.msg.visit_card_w;
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });

                        }else if(res.data.status == 400201){
                            this.tips = res.data.status + " " + res.data.desc;
                            this.tipsPop = true;
                        }else if(res.data.status == 400400){
                            this.tips = res.data.status + " " + res.data.desc;
                            this.tipsPop = true;
                        }else if(res.data.status == 400003){
                            this.tips = "参数错误" + res.data.status + " " + res.data.desc;
                            this.tipsPop = true;
                        }else{
                            this.tips = "服务器错误" + res.data.status + " " + res.data.desc;
                            this.tipsPop = true;
                        }
                    }).catch(err=>{
                        this.loading = false;
                        console.log(err);
                        this.tips = err;
                        this.tipsPop = true;
                    })
                    
                }
            },

            
            // 生成健康卡

            healthCardBtn(){
                var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
                var idCardreg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
                let face_result_m = "";
                let face_result_w = "";
                if(this.verify_result_m ==1){
                    face_result_m = true
                }else{
                    face_result_m = false
                };
                if(this.verify_result_w == 1){
                    face_result_w = true;
                }else{
                    face_result_w = false;
                };
                if(this.name_w != '' && !phoneReg.test(this.phone_w)){
                    this.tips = "请输入女方正确的手机号";
                    this.tipsPop = true;
                }else if(this.name_m != '' && !phoneReg.test(this.phone_m)){
                    this.tips = "请输入男方正确的手机号";
                    this.tipsPop = true;
                }else {
                    this.loading = true;
                    var data = JSON.stringify({
                        "OP_NO": this.opNo,
                        "OP_Name": this.opName,
                        "OP_IssuerNo": this.opNo,
                        "OP_Issuer": this.opName,
                        "channel": "kefu",
                        "hospitalNo": this.hospitalNum,
                        "PER_Service": this.orderNum,

                        "medical_card_number_m": this.icCard_m,
                        "name_m": this.name_m,
                        "identif_m": this.idCard_m,
                        "marriagestatus_m": this.marry_w,
                        "age_m": this.age_m,
                        "birthday_m": this.birthday_m,
                        "nationality_m": this.nation_m,
                        "country_m": this.country_m,
                        "identityaddress_m": this.address_m,
                        "profession_m": this.job_m,
                        "phone_m": this.phone_m,
                        "hometown_m": this.place_m,
                        "sex_m": this.sex_m,
                        "perCusService_m": this.service_m,
                        "id_face_image_m": this.idCard_img_m,
                        "scene_face_image_m": this.face_img_m,
                        "is_auth_m": face_result_m,
                        "registered_addr_m": this.homeTown_m,
                        "idcardtype_m": '身份证',

                        "medical_card_number_w": this.icCard_w,
                        "name_w": this.name_w,
                        "identif_w": this.idCard_w,
                        "marriagestatus_w": this.marry_w,
                        "age_w": this.age_w,
                        "birthday_w": this.birthday_w,
                        "nationality_w": this.nation_w,
                        "country_w": this.country_w,
                        "identityaddress_w": this.address_w,
                        "profession_w": this.job_w,
                        "phone_w": this.phone_w,
                        "hometown_w": this.place_w,
                        "sex_w": this.sex_w,
                        "perCusService_w": this.service_w,
                        "id_face_image_w": this.idCard_img_w,
                        "scene_face_image_w": this.face_img_w,
                        "is_auth_w": face_result_w,
                        "registered_addr_w": this.homeTown_w,
                        "idcardtype_w": '身份证',
                    });

                     axios.post( baseUrl + 'api/hospital/admin/user/auth',data)
                     .then(res=>{
                         console.log(res);
                         this.loading = false;
                         if(res.data.status == 200002){
                            this.$router.push({
                                path: '/card', 
                                query: {name_m: this.name_m, hospital: this.hospitalIndex, sex_m: this.sex_m,
                                    nation_m: this.nation_m, treat_m: this.icCard_m,
                                    phone_m: this.phone_m, idCard_m: this.idCard_m,
                                    name_w: this.name_w, sex_w: this.sex_w,
                                    nation_w: this.nation_w, treat_w: this.icCard_w,
                                    phone_w: this.phone_w, idCard_w: this.idCard_w,
                                }
                            });
                         }
                     }).catch(err=>{
                         this.loading = false;
                         console.log(err);
                         this.tips = err;
                         this.tipsPop = true;
                     })
                }
            },





            // 清空输入框

            delMsg(){
                var data = JSON.parse(this.$route.query.data);
                if(data.PHYSI_SEX_NAME == '男'){
                    this.hasIcCard = false;
                    this.name_w = "";
                    this.sex_w = "";
                    this.idCard_w = "";
                    this.age_w = "";
                    this.birthday_w = "";
                    this.nation_w = "";
                    this.homeTown_w = "";
                    // this.place_w = "";
                    this.icCard_w = "";
                    this.phone_w = "";
                    this.faceImg_w = require('../../assets/background_faceid.png');
                    this.idImg_w = require('../../assets/background_idcard.png');
                }else if(data.PHYSI_SEX_NAME == '女'){
                    this.hasIcCard = false;
                    this.name_m = "";
                    this.sex_m = "";
                    this.idCard_m = "";
                    this.age_m = "";
                    this.birthday_m = "";
                    this.nation_m = "";
                    this.homeTown_m = "";
                    // this.place_m = "";
                    this.icCard_m = "";
                    this.phone_m = "";
                    this.faceImg_m = require('../../assets/background_faceid.png');
                    this.idImg_m = require('../../assets/background_idcard.png');
                }
            },
            
            // 查询
            inquire(){
                this.$router.push({
                    path: 'inquire',
                    query: {
                        icCard: this.icCard,
                    }
                })
            },

            // 挂号
            order(){
                var data = JSON.parse(this.$route.query.data);
                if(data.PHYSI_SEX_NAME == '男'){
                    this.$router.push({
                        path: 'order',
                        query: {
                            treatCard: this.icCard_w
                        }
                    })
                }else if(data.PHYSI_SEX_NAME == '女'){
                    this.$router.push({
                        path: 'order',
                        query: {
                            treatCard: this.icCard_m
                        }
                    })
                }
            },


            // 身份证失去焦点计算年龄
            computedAge_m(){
                if(this.idCard_m != ''){
                    var date = new Date();
                    var year = date.getFullYear();
                    this.age_m = year - (this.idCard_m.slice(6,10));
                    this.birthday_m =  this.idCard_m.slice(6,10) + '年' + this.idCard_m.slice(10, 12) + '月' + this.idCard_m.slice(12, 14) + '日';
                    

                // 调用查询用户接口
                    axios.post(baseUrl + 'api/mq/find_patient', JSON.stringify({
                        "keyword": this.idCard_m,
                        "sex": '',
                        "start_time": '',
                        "end_time": '',
                        "op_code": ''
                    })).then(res=>{
                        console.log(res);
                        if(res.data.status == 200301){
                            if(res.data.msg[0].CARD_ID_NUMBER != ''){
                                this.icCard = res.data.msg[0].CARD_ID_NUMBER;
                                this.hasIcCard = true;
                            }else if(res.data.msg.length>1){
                                this.icCard = "改身份证有多条数据，请查询核实";
                                this.hasIcCard = true;
                            }else {
                                this.hasIcCard = false;
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                };

            },
            computedAge_w(){
                if(this.idCard_w != ''){
                     var date = new Date();
                    var year = date.getFullYear();
                    this.age_w = year - (this.idCard_w.slice(6,10));
                    this.birthday_w =  this.idCard_w.slice(6,10) + '年' + this.idCard_w.slice(10, 12) + '月' + this.idCard_w.slice(12, 14) + '日';


                    // 调用查询用户接口
                    axios.post(baseUrl + 'api/mq/find_patient', JSON.stringify({
                        "keyword": this.idCard_w,
                        "sex": '',
                        "start_time": '',
                        "end_time": '',
                        "op_code": ''
                    })).then(res=>{
                        console.log(res);
                        if(res.data.status == 200301){
                            if(res.data.msg[0].CARD_ID_NUMBER != ''){
                                this.icCard = res.data.msg[0].CARD_ID_NUMBER;
                                this.hasIcCard = true;
                            }else if(res.data.msg.length>1){
                                this.icCard = "改身份证有多条数据，请查询核实";
                                this.hasIcCard = true;
                            }else {
                                this.hasIcCard = false;
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                };
                
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
                        // }else if(tempHospitalNum == 111){
                        //     this.hospitalNum = "115";
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



            // 获取查询传参写入页面
            getQuery(){
                var data = JSON.parse(this.$route.query.data)
                console.log(data);
                var date = new Date();
                var year = date.getFullYear();
                if(data.PHYSI_SEX_NAME == "男"){
                    this.name_m = data.PAT_NAME;
                    this.sex_m = data.PHYSI_SEX_NAME;
                    this.idCard_m = data.ID_NUMBER;
                    this.country_m = data.NATION_NAME;
                    this.birthday_m = (data.DATE_BIRTH).slice(0,10);
                    this.nation_m = data.ETHNIC_NAME;
                    this.age_m = year - (data.DATE_BIRTH).slice(0,4);
                    this.homeTown_m = data.HUKOU_ADDR;
                    this.place_m = data.ADDR;
                    this.marry_m = data.MARITAL_STATUS_NAME;
                    this.job_m = data.OCCUPATION_CATEG_NAME;
                    this.phone_m = data.PHONE_NO;
                    this.service_m = data.BANK;
                    this.icCard_m = data.CARD_ID_NUMBER;
                    this.address_m = data.CURR_ADDR;


                    // disabled
                    this.nameDisabled_m = true;
                    this.sexDisabled_m = true;
                    this.idCardDisabled_m = true;
                    this.countryDisabled_m = true;
                    this.birthdayDisabled_m = true;
                    this.nationDisabled_m = true;
                    this.ageDisabled_m = true;
                    this.homeTownDisabled_m = true;
                    this.addressDisabled_m = true;
                    this.placeDisabled_m = true;
                    this.marryDisabled_m = true;
                    this.jobDisabled_m = true;
                    this.phoneDisabled_m = true;
                    this.serviceDisabled_m = true;
                    this.icCardDisabled_m = true;
                    

                    this.sexArr_w = [{name: "N",value: "女"}];

                    // 通过就诊卡号查找用户头像
                    axios.post(baseUrl+ "api/accounts/user/img" ,JSON.stringify({
                        "medical_card_number": data.CARD_ID_NUMBER
                    })).then(res=>{
                        console.log(res);
                        if(res.data.status == 200004){
                            if(res.data.msg.id_image != '' && res.data.msg.face_image != ''){
                                this.faceImg_m = res.data.msg.face_image;
                                this.idImg_m = res.data.msg.id_image;
                            }else if(res.data.msg.face_image == '' && res.data.msg.id_image != ''){
                                this.idImg_m = res.data.msg.id_image;
                                this.faceImg_m = require("../../assets/background_faceid.png");
                            }else{
                                this.idImg_m = require('../../assets/background_idcard.png');
                                this.faceImg_m = require("../../assets/background_faceid.png");
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                        this.tips = err;
                        this.tipsPop = true;
                    })

                }else if(data.PHYSI_SEX_NAME == "女"){
                    this.name_w = data.PAT_NAME;
                    this.sex_w = data.PHYSI_SEX_NAME;
                    this.idCard_w = data.ID_NUMBER;
                    this.country_w = data.ETHNIC_NAME;
                    this.birthday_w = (data.DATE_BIRTH).slice(0,10);
                    this.nation_w = data.NATION_NAME;
                    this.age_w = year - (data.DATE_BIRTH).slice(0,4);
                    this.homeTown_w = data.HUKOU_ADDR;
                    this.place_w = data.ADDR;
                    this.marry_w = data.MARITAL_STATUS_NAME;
                    this.job_w = data.OCCUPATION_CATEG_NAME;
                    this.phone_w = data.PHONE_NO;
                    this.service_w = data.BANK;
                    this.icCard_w = data.CARD_ID_NUMBER;
                    this.address_w = data.CURR_ADDR;


                    // disabled
                    this.nameDisabled_w = true;
                    this.sexDisabled_w = true;
                    this.idCardDisabled_w = true;
                    this.countryDisabled_w = true;
                    this.birthdayDisabled_w = true;
                    this.nationDisabled_w = true;
                    this.ageDisabled_w = true;
                    this.homeTownDisabled_w = true;
                    this.addressDisabled_w = true;
                    this.placeDisabled_w = true;
                    this.marryDisabled_w = true;
                    this.jobDisabled_w = true;
                    this.phoneDisabled_w = true;
                    this.serviceDisabled_w = true;
                    this.icCardDisabled_w = true;

                    this.sexArr_m = [{name: "N",value: "男"}];


                    axios.post(baseUrl+ "api/accounts/user/img" ,JSON.stringify({
                        "medical_card_number": data.CARD_ID_NUMBER
                    })).then(res=>{
                        console.log(res);
                        if(res.data.status == 200004){
                            if(res.data.msg.id_image != '' && res.data.msg.face_image != ''){
                                this.faceImg_w = res.data.msg.face_image;
                                this.idImg_w = res.data.msg.id_image;
                            }else if(res.data.msg.face_image == '' && res.data.msg.id_image != ''){
                                this.idImg_w = res.data.msg.id_image;
                                this.faceImg_w = require("../../assets/background_faceid.png");
                            }else{
                                this.idImg_w = require('../../assets/background_idcard.png');
                                this.faceImg_w = require("../../assets/background_faceid.png");
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                        this.tips = err;
                        this.tipsPop = true;
                    })
                }
            }
        },
        mounted(){
            this.getHospital();
            this.getDeviceMsg();
            // this.getService();

            
            this.getQuery();
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
            this.opName = UrlSearch(url, 'opName');
            this.fkPerson = UrlSearch(url, 'opName');
        }
    }
</script>
<style lang="scss" scoped>
    @import './bind.scss'
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
