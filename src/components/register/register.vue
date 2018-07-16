<template>
    <div class="register">
        <div class="register_header">
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
        <div class="register_main">
            <div class="register_top clear">  
                
                <el-button type="warning" @click="getUserMsg">获取信息</el-button>
            </div>
            <div class="women">
                <el-card class="box-card" style="width:100%;">
                    <div slot="header" class="clearfix">
                        <span>女方信息</span><span v-show="gztShow_w" :style="{ color: bgcolor_w, fontSize: fontSize + 'px' }">{{gztMsg_w}}</span>
                        <el-button style="float: right; padding: 3px 0; color:#CE9642" type="text" @click="openlist_w">{{openMsg_w}}</el-button>
                    </div>
                    <div class="register_img" v-show="open_women">
                        <img :src="idCardImg_w" alt="" style="width:120px;height:140px;">
                        <img :src="faceImg_w" alt="" style="width:120px;height:140px;">
                    </div>
                    <div class="text item" v-show="open_women">
                        <ul class="clear">
                            <li>
                                <label for="" style="width:70px">姓名：</label>
                                <el-input placeholder="姓名" style="width:70%" v-model="name_w" v-on:input="name_input(name_w)"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">性别：</label>
                                <!-- <el-input placeholder="性别" style="width:70%" v-model="sex_w"></el-input> -->
                                <el-select v-model="sex_w" @focus="enter" clearable style="width:70%" filterable placeholder="性别" :filterMethod="sexFilter_w">
                                    <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                            
                            <li>
                                <select name="" id="" style="width:65px;height:100%;" v-model="cardType_w" v-on:change="selectCardType_w">
                                    <option value="" v-for="(item,index) in cardArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select>
                                <el-input :placeholder="idCardPlaceholderMsg_w" v-on:blur="computedAge_w" style="width:70%" v-model="idCard_w" v-show="idCardShow_w"></el-input>
                            </li>
                            
                            <li v-show="militaryShow_w">
                                <label for="" style="width:70px">军区：</label>
                                <el-autocomplete
                                 class="inline-input" v-model="militarySelect_w" 
                                 :fetch-suggestions="militarySearch_w" style="width:70%"
                                 placeholder="请输入军区" :trigger-on-focus="false"  @select="select_military_w" >
                                </el-autocomplete>
                            </li>
                            <li>
                                <label for="" style="width:70px">国籍：</label>
                                <!-- <el-input placeholder="国籍" style="width:70%" v-model="country_w" v-show="countryShow_w"></el-input> -->
                                <!-- <el-autocomplete
                                 class="inline-input" v-model="countrySelect_w" 
                                 :fetch-suggestions="querySearch" v-show="countryInputShow_w" style="width:70%"
                                 placeholder="请输入国家" :trigger-on-focus="false"  @select="handleSelect" >
                                </el-autocomplete> -->
                                <el-select v-model="country_w" @focus="enter" clearable style="width:70%" filterable placeholder="国籍" :filterMethod="countryFilter_w">
                                    <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>

                            </li>

                            <li>
                                <label for="" style="width:70px">婚姻：</label>
                                <!-- <select name="" id="" style="width:70%;height:100%; border-radius:4px" v-model="selectedMarry_w" v-on:change="selectMarry_w">
                                    <option value="" v-for="(item,index) in marryArr"  v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input"
                                v-model="selectedMarry_w" style="width:70%"
                                :fetch-suggestions="marrySearch_w"
                                placeholder="请输入内容"
                                @select="marrySelect_w"
                                ></el-autocomplete> -->
                                <el-select v-model="selectedMarry_w" @focus="enter" clearable style="width:70%" filterable placeholder="性别" :filterMethod="marryFilter_w">
                                    <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">年龄：</label>
                                <el-input placeholder="年龄" style="width:70%" v-model="age_w"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">生日：</label>
                                <el-input placeholder="生日" style="width:70%" v-model="birthday_w"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">民族：</label>
                                <!-- <el-input placeholder="民族" style="width:70%" v-model="nation_w"></el-input> -->
                                <el-select v-model="nation_w" @focus="enter" clearable  style="width:70%" filterable placeholder="民族" :filterMethod="nationFilter_w">
                                    <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">地址：</label>    
                                <el-input placeholder="地址" style="width:70%" v-model="address_w"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">居住地：</label>
                                <!-- <select name="" id="" style="width:70%;height:100%; border-radius:4px"  v-model="selectedArea_w" v-on:change="selectMarry_w">
                                    <option value="">==请选择==</option>
                                    <option value="" v-for="(item,index) in areaArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="selectedArea_w"
                                :fetch-suggestions="areaSearch_w"
                                placeholder="请输入内容"
                                @select="areaHandleSelect_w"
                                ></el-autocomplete> -->
                                <el-select v-model="selectedArea_w" @focus="enter" clearable  style="width:70%" filterable placeholder="居住地" :filterMethod="areaFilter_w">
                                    <el-option v-for="item in areaArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">职业：</label>
                                <!-- <select style="width:70%;height:100%; border-radius:4px"  v-model="selectedJob_w" v-on:change="selectMarry_w">
                                    <option value="">==请选择==</option>
                                    <option value="" v-for="(item,index) in jobArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="selectedJob_w"
                                :fetch-suggestions="jobSearch_w"
                                placeholder="请输入内容"
                                @select="jobHandleSelect_w"
                                ></el-autocomplete> -->
                                <el-select v-model="selectedJob_w" @focus="enter" clearable  style="width:70%" filterable placeholder="职业" :filterMethod="jobFilter_w">
                                    <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">手机号：</label>
                                <el-input placeholder="手机号" style="width:70%" v-model="phone_w"></el-input>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="man">
                <el-card class="box-card" style="width:100%;">
                    <div slot="header" class="clearfix">
                        <span>男方信息</span><span v-show="gztShow_m" :style="{ color: bgcolor_m, fontSize: fontSize + 'px' }">{{gztMsg_m}}</span>
                        <el-button style="float: right; padding: 3px 0; color:#CE9642" type="text" @click="openlist_m">{{openMsg_m}}</el-button>
                    </div>
                    <div class="register_img"  v-show="open_man">
                        <img :src="idCardImg_m" alt="" style="width:120px;height:140px;">
                        <img :src="faceImg_m" alt="" style="width:120px;height:140px;">
                    </div>
                    <div class="text item"  v-show="open_man">
                        <ul class="clear">
                            <li>
                                <label for="" style="width:70px">姓名：</label>
                                <el-input placeholder="姓名" style="width:70%;" v-model="name_m" v-on:input="name_input(name_m)"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">性别：</label>
                                <!-- <el-input placeholder="性别" style="width:70%" v-model="sex_m"></el-input> -->
                                <el-select v-model="sex_m" @focus="enter" clearable style="width:70%" filterable placeholder="性别" :filterMethod="sexFilter_m">
                                    <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <select name="" id="" @focus="enter" style="width:65px;height:100%;" v-model="cardType_m" v-on:change="selectCardType_m">
                                    <option value="" v-for="(item,index) in cardArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select>
                                <el-input :placeholder="idCardPlaceholderMsg_m" v-on:blur="computedAge_m" style="width:70%" v-model="idCard_m" v-show="idCardShow_m"></el-input>
                            </li>
                            <li v-show="militaryShow_m">
                                <label for="" style="width:70px">军区：</label>
                                <el-autocomplete
                                 class="inline-input" v-model="militarySelect_m" 
                                 :fetch-suggestions="militarySearch_m" style="width:70%"
                                 placeholder="请输入军区" :trigger-on-focus="false"  @select="select_military_w" >
                                </el-autocomplete>
                            </li>
                            <li>
                                <label for="" style="width:70px">国籍：</label>
                                <!-- <el-input placeholder="国籍" style="width:70%" v-model="country_m" v-show="countryShow_m"></el-input> -->
                                <!-- <el-autocomplete
                                 class="inline-input" v-model="countrySelect_m" 
                                 :fetch-suggestions="querySearch" v-show="countryInputShow_m" style="width:70%"
                                 placeholder="请输入国家"  :trigger-on-focus="false"  @select="handleSelect" >
                                </el-autocomplete> -->

                                
                                <el-select @focus="enter" v-model="country_m" clearable style="width:70%" filterable placeholder="国籍" :filterMethod="countryFilter_m">
                                    <el-option v-for="item in countryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                                <!-- <el-input :placeholder="idCardPlaceholderMsg_m" style="width:70%" v-model="idCard_m" v-show="idCardShow_m"></el-input> -->
                            </li>
                            <li>
                                <label for="" style="width:70px">婚姻：</label>
                                <!-- <select style="width:70%;height:100%; border-radius:4px" v-model="selectedMarry_m" v-on:change="selectMarry_m">
                                    <option value="" v-for="(item,index) in marryArr"  v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input"
                                v-model="selectedMarry_m" style="width:70%"
                                :fetch-suggestions="marrySearch_m"
                                placeholder="请输入内容"
                                @select="marrySelect_m"
                                ></el-autocomplete> -->
                                <el-select v-model="selectedMarry_m" @focus="enter" clearable  style="width:70%" filterable placeholder="民族" :filterMethod="marryFilter_m">
                                    <el-option v-for="item in marryArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">年龄：</label>
                                <el-input placeholder="年龄" style="width:70%" v-model="age_m"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">生日：</label>
                                <el-input placeholder="生日" style="width:70%" v-model="birthday_m"></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">民族：</label>
                                <!-- <el-input placeholder="民族" style="width:70%" v-model="nation_m"></el-input> -->
                                <el-select @focus="enter" v-model="nation_m" clearable  style="width:70%" filterable placeholder="民族" :filterMethod="nationFilter_m">
                                    <el-option v-for="item in nationArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            
                            <li>
                                <label for="" style="width:70px">地址：</label>
                                <el-input placeholder="地址" style="width:70%" v-model="address_m"></el-input>
                            </li>
                            <!-- <li>
                                <label for="" style="width:70px">就诊卡号：</label>
                                <el-input placeholder="就诊卡号：" style="width:70%" v-model="treatCard_m"></el-input>
                            </li> -->
                            <li>
                                <label for="" style="width:70px">居住地：</label>
                                <!-- <select style="width:70%;height:100%; border-radius:4px"  v-model="selectedArea_m" v-on:change="selectMarry_m">
                                    <option value="">==请选择==</option>
                                    <option value="" v-for="(item,index) in areaArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="selectedArea_m"
                                :fetch-suggestions="areaSearch_m"
                                placeholder="请输入内容"
                                @select="areaHandleSelect_m"
                                ></el-autocomplete> -->
                                <el-select @focus="enter" v-model="selectedArea_m" clearable  style="width:70%" filterable placeholder="居住地" :filterMethod="areaFilter_m">
                                    <el-option v-for="item in areaArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">职业：</label>
                                <!-- <select name="" id="" style="width:70%;height:100%; border-radius:4px" v-model="selectedJob_m" v-on:change="selectMarry_m">
                                    <option value="">==请选择==</option>
                                    <option value="" v-for="(item,index) in jobArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <!-- <el-autocomplete
                                class="inline-input" style="width:70%"
                                v-model="selectedJob_m"
                                :fetch-suggestions="jobSearch_m"
                                placeholder="请输入内容"
                                @select="jobHandleSelect_m"
                                >
                                </el-autocomplete> -->
                                <el-select @focus="enter" v-model="selectedJob_m" clearable  style="width:70%" filterable placeholder="职业" :filterMethod="jobFilter_m">
                                    <el-option v-for="item in jobArr"  :key="item.value"  :label="item.value" :value="item.value">
                                        <span>{{item.value}}</span>
                                        <span style="float:right">{{item.name}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">手机号：</label>
                                <el-input placeholder="手机号" style="width:70%" v-model="phone_m"></el-input>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="man">
                <el-card class="box-card" style="width:100%;">
                    <div slot="header" class="clearfix">
                        <span>其他信息</span>
                        <!-- <el-button style="float: right; padding: 3px 0; color:#CE9642" type="text" ></el-button> -->
                    </div>
                    <!-- <div class="register_img" > -->
                        <!-- <img src="../../assets/background_idcard.png" alt="">
                        <img src="../../assets/background_idcard.png" alt=""> -->
                    <!-- </div> -->
                    <div class="text item" >
                        <ul class="clear">
                            <li>
                                <label for="" style="width:70px">发卡机构：</label>
                                <!-- <select v-on:change="selectHospital" v-model="indexId" style="width:70%;height:100%; border-radius:4px">
                                    <option value="">==请选择==</option>
                                    <option v-for="(item,index) in hospitalArr" v-bind:value="[item.hospitalNo,item.hospitalName]"  :key="index">
                                        {{item.hospitalName}}
                                    </option>
                                </select> -->
                                 <el-select @focus="enter" v-model="indexId" clearable  style="width:70%" filterable placeholder="请选择" :filterMethod="hosFilter">
                                    <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                                        <span>{{item.hospitalName}}</span>
                                        <span style="float:right">{{item.pinyin}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                           
                            <li>
                                <label for="" style="width:70px">女方客服：</label>
                                <!-- <select style="width:70%;height:100%; border-radius:4px" v-model="selectServer_w" v-on:change="selectService_w">
                                    <option value="">==请选择==</option>
                                    <option value="" v-for="(item,index) in serviceArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <el-select @focus="enter" v-model="selectServer_w" clearable  style="width:70%" filterable placeholder="请选择" :filterMethod="serviceFilter_w">
                                    <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                        <span>{{item.doc_name}}</span>
                                        <span style="float:right">{{item.pinyin}}</span>
                                    </el-option>
                                </el-select>

                            </li>
                            <li>
                                <label for="" style="width:70px">发卡人：</label>
                                <el-input placeholder="发卡人" style="width:70%" v-model="opName" disabled></el-input>
                            </li>
                            <li>
                                <label for="" style="width:70px">男方客服：</label>
                                <!-- <select  style="width:70%;height:100%; border-radius:4px" v-model="selectServer_m" v-on:change="selectService_m">
                                    <option value="">==请选择==</option>
                                    <option value="" v-for="(item,index) in serviceArr" v-bind:value="item" :key="index">{{item}}</option>
                                </select> -->
                                <el-select @focus="enter" v-model="selectServer_m" clearable  style="width:70%" filterable placeholder="请选择" :filterMethod="serviceFilter_m">
                                    <el-option v-for="item in serviceArr"  :key="item.doc_name"  :label="item.doc_name" :value="item.doc_name">
                                        <span>{{item.doc_name}}</span>
                                        <span style="float:right">{{item.pinyin}}</span>
                                    </el-option>
                                </el-select>
                            </li>
                            <li>
                                <label for="" style="width:70px">预约号：</label>
                                <el-input placeholder="预约号" style="width:70%" v-model="serviceNum"></el-input>
                            </li>
                            <!-- <li>
                                <label for="" style="width:70px">来源：</label>
                                <el-input placeholder="来源：默认微信" style="width:70%" v-model="origin"></el-input>
                            </li> -->
                        </ul>
                    </div>
                </el-card>
            </div>
            <div class="common">
                <el-card class="box-card" style="width:100%;padding-bottom:5%">
                    <div slot="header" class="clearfix">
                        <span>就诊卡号</span>
                    </div>
                    <div class="common_left">
                        <p style="margin-top:6%" v-show="treatHave">暂无卡号~~~请先获取身份证信息</p>
                        <div v-show="treatShow_w">
                            <label for="" style="width:70px">女方就诊卡号：</label>
                            <el-input placeholder="就诊卡号" style="width:70%" v-model="treatCard_w"></el-input>
                        </div>
                        <div style="margin-top: 3%" v-show="treatShow_m">
                            <label for="" style="width:70px">男方就诊卡号：</label>
                            <el-input placeholder="就诊卡号" style="width:70%" v-model="treatCard_m"></el-input>
                        </div>
                    </div>
                        <el-button type="warning" style="float:right;margin-top:3%" v-bind:disabled="fileDisabled" @click="fileCardBtn">信息提交至HIS</el-button>
                    <!-- 填入就诊卡 -->
                </el-card>
                
            </div>
            
        </div>
        <div class="register_footer clear">
            <!-- <el-autocomplete class="inline-input"  v-model="state2" :fetch-suggestions="querySearch"
                placeholder="请输入内容" :trigger-on-focus="false"  @select="handleSelect" >
            </el-autocomplete> -->
            <el-button type="warning" style="float:left" @click="back">返回上一页</el-button>
            <ul>
                <!-- <li>
                        提交信息
                </li> -->
                <li>
                    <el-button type="warning" id="submitMsg" v-bind:disabled="subDisabled"  v-loading.fullscreen.lock="fullscreenLoading"  @click="subMsgBtn">生成健康卡</el-button>
                </li>
            </ul>
        </div>


            <!--  -->
            <el-dialog
                title="提示"
                :visible.sync="hasIcCard"
                width="30%" >
                <span>该身份证已有就诊卡号：{{icCard}}</span>
                <p>国政通校验结果:<span style="color:#f60;margin-left:15px">{{gztMsg}}</span></p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delMsg">清空数据</el-button>
                    <el-button type="warning" @click="inquire">用户查询</el-button>
                    <el-button type="warning" @click="order">立即挂号</el-button>
                </span>
            </el-dialog>


            <!-- 国政通 -->

            <el-dialog title="提示" :visible.sync="gztPop" width="30%" >
                <p>国政通校验结果：<span style="color:#f60">{{gztMsg}}</span></p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="gztPop = false">关 闭</el-button>
                    <el-button type="warning" @click="getUserMsg" v-show="gztNumShow">重新校验</el-button>
                </span>
            </el-dialog>


    </div>
</template>
<script>
    import baseUrl  from '../base/baseUrl.js';
    import axios from 'axios';
    import country from '../country.js';
    import military from '../military.js';
    import nation from '../nation.js';
    import area from '../area.js';
export default {
    data(){
        return{
            icCard: '',

            gztMsg_m: '',
            gztPop: false,
            gztShow_m: true,
            gztMsg_w: '',
            gztShow_w: true,
            bgcolor_m: '',
            bgcolor_w: '',
            fontSize: '14',
            gztNum: '',
            gztNumShow: false,

            countryList: country,//国家列表
            military: military,//军区列表
            countrySelect_w: '',
            countrySelect_m: '',
            militarySelect_w: '',
            militarySelect_m: '',
            msg: '初诊登记',
            indexId: '',//机构选择
            selectedMarry_m:"已婚",//婚姻选择
            selectedMarry_w:"已婚",//婚姻选择
            selectedJob_m: "个体经营者",
            selectedJob_w: "个体经营者",
            selectedArea_m: "乌鲁木齐",
            selectedArea_w: "乌鲁木齐",
            cardType_m: '身份证',
            cardType_w: '身份证',
            selectServer_m: '',
            selectServer_w: '',
            selectHos: '',
            subDisabled: true,//控制提交信息按钮
            fileDisabled: true,
            deviceNum: true,//控制设备输入框
            fullscreenLoading: false,
            deviceInput: localStorage.getItem("deviceid"),//设备输入框值
            open_man: false,
            openMsg_m: "展开",//男方信息展开
            open_women: false,
            openMsg_w: "展开",//女方信息展开
            tipMsg: '',//错误提示语
            // areaArr: ["乌鲁木齐","疆内","疆外","国外","吐鲁番","库尔勒","伊宁","安徽","澳门","北京","重庆",
            //             "福建","甘肃","广东","广西","贵州","海南","河北","河南","黑龙江","湖北","湖南","吉林",
            //             "江苏","江西","辽宁","内蒙古 ","宁夏","青海","山东","山西","陕西","上海","四川","台湾",
            //             "天津","西藏","香港","新疆","云南", "浙江"  
            //         ],
            areaArr: area,
            areaArr_new: area,
            // jobArr: ["国家公务员","专业技术人员","职员","企业管理人员","工人",   
            //             "农民","学生","现役军人","自由职业者","个体经营者","无业人员","退（离）休人员","其他",
            //         ],
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
            cardArr: ["身份证","军官证","护照","其他"],

            sexArr: [{name: "N",value:"男"},{name: "N",value:"女"}],//性别下拉
            sexArr_new: [{name: "N",value:"男"},{name: "N",value:"女"}],//性别下拉
            hospitalArr: [],//发卡机构列表
            hospitalArr_new: [],//发卡机构列表
            serviceArr: [],//客服列表
            serviceArr_new: [],//客服列表
            marryArr: [{name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
            ],
            marryArr_new: [{name:"YH",value:"已婚"},{name:"WH",value:"未婚"},{name:"ZH",value:"再婚"},
                        {name:"SO",value:"丧偶"},{name:"QT",value:"其他"}
            ],

            countryArr: country,
            countryArr_new: country,
            //婚姻列表
            // marryArr: ["已婚","未婚","再婚","丧偶","其他"],
                    // 男方信息输入框绑定
            nationArr: nation,//民下拉
            nationArr_new: nation,
            idCardImg_m: require('../../assets/background_idcard.png'),
            faceImg_m: require("../../assets/background_faceid.png"),
            name_m: '',//男方姓名
            sex_m: '',//男方性别
            idCard_m: '',//男方身份证号
            marry_m: '',//男方婚姻
            age_m: '',//男方年龄
            birthday_m: '',//男方生日
            nation_m: '',//男方民族
            country_m: '中国',//男方国籍
            address_m: '',//男方地址
            treatCard_m: '',//男方就诊卡号
            area_m: '',//男方地区
            job_m: '',//男方职业
            phone_m: '',//男方电话
            

                    // 女方信息输入框绑定
            idCardImg_w: require('../../assets/background_idcard.png'),
            faceImg_w: require('../../assets/background_faceid.png'),
            name_w: '',//女方姓名
            sex_w: '',//女方性别
            idCard_w: '',//女方身份证号
            marry_w: '',//女方婚姻
            age_w: '',//女方年龄
            birthday_w: '',//女方生日
            nation_w: '',//女方民族
            country_w: '中国',//女方国籍
            address_w: '',//女方地址
            treatCard_w: '',//女方就诊卡号
            area_w: '',//女方地区
            job_w: '',//女方职业
            phone_w: '',//女方电话

            verify_result_m: '',//人脸是否真实
            verify_result_w: '',
            serviceNum: '',

            opNo: '',//发卡人编号
            opName: '',//发卡人
            origin: '',//来源

            nameInput: '',
            treatShow_m: false,//就诊卡号控制显示
            treatShow_w: false,
            treatHave: true,

            idCard_img_m: '',
            idCard_img_w: '',
            face_img_m: '',
            face_img_w: '',
            idCardPlaceholderMsg_w: '身份证',
            idCardPlaceholderMsg_m: '身份证',
            idCardShow_w: true,//身份证输入框显示控制
            idCardShow_m: true,
            countryShow_w: true,//国家输入框选择控制
            countryShow_m: true,
            countryInputShow_w: false,//国家输入框显示控制（模糊查询）
            countryInputShow_m: false,//国家输入框显示控制（模糊查询）
            militaryShow_w: false,//军区输入框
            militaryShow_m: false,//军区输入框



            hasIcCard:false,

            addSex: '',
            addArr: [],


            gztMsg: '',
            hospitalNum: '',
            hospitalIndex: '',
        }
    },
     methods: {
        //  模糊查询国家
        querySearch(queryString, cb) {
            var restaurants = this.countryList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        militarySearch_w(msg, cb) {
            // console.log(msg)
            var military = this.military;
            // console.log(military)
            var results = msg ? military.filter(this.mulitaryFilter_w(msg)) : military;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        mulitaryFilter_w(msg) {
            return (list) => {
                return (list.value.toLowerCase().indexOf(msg.toLowerCase()) === 0);
            };
        },
        
        militarySearch_m(mess, cb) {
            // console.log(msg)
            var military = this.military;
            // console.log(military)
            var results = mess ? military.filter(this.mulitaryFilter_m(mess)) : military;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        mulitaryFilter_m(mess) {
            return (lists) => {
                return (lists.value.toLowerCase().indexOf(mess.toLowerCase()) === 0);
            };
        },

        select_military_w(item){
            console.log(item);
        },
        handleSelect(item) {
            console.log(item);
        },


        // 简码集合
        
        
        // 男方居住地
        // areaSearch_m(msg, cb) {
        //     console.log(msg)
        //     var areaArr = this.areaArr;
        //     var results = msg ? areaArr.filter(this.areaFilter_m(msg)) : areaArr;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results);
        // },
        // areaFilter_m(mess) {
        //     return (areaMsg) => {
        //     return (areaMsg.name.toLowerCase().indexOf(mess.toLowerCase()) === 0);
        //     };
        // },
        // areaHandleSelect_m(item) {
        //     console.log(item);
        //     this.selectedArea_m = item.value;
        // },

        // 女方居住地
        // areaSearch_w(msg, cb) {
        //     var areaArr = this.areaArr;
        //     var results = msg ? areaArr.filter(this.areaFilter_w(msg)) : areaArr;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results);
        // },
        // areaFilter_w(mess) {
        //     return (areaMsg) => {
        //     return (areaMsg.name.toLowerCase().indexOf(mess.toLowerCase()) === 0);
        //     };
        // },
        // areaHandleSelect_w(item) {
        //     console.log(item);
        //     this.selectedArea_w = item.value;
        // },
        areaFilter_w(val) {
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
        areaFilter_m(val) {
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




        // 男方职业
        // jobSearch_m(msg, cb) {
        //     console.log(msg)
        //     var jobArr = this.jobArr;
        //     var results = msg ? jobArr.filter(this.jobFilter_m(msg)) : jobArr;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results);
        // },
        // jobFilter_m(mess) {
        //     return (jobMsg) => {
        //     return (jobMsg.name.toLowerCase().indexOf(mess.toLowerCase()) === 0);
        //     };
        // },
        // jobHandleSelect_m(item) {
        //     console.log(item);
        //     this.selectedJob_m = item.value;
        // },
        jobFilter_m(val) {
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

        jobFilter_w(val) {
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

        // 女方职业
        //  jobSearch_w(msg, cb) {
        //     console.log(msg)
        //     var jobArr = this.jobArr;
        //     var results = msg ? jobArr.filter(this.jobFilter_w(msg)) : jobArr;
        //     // 调用 callback 返回建议列表的数据
        //     cb(results);
        // },
        // jobFilter_w(mess) {
        //     return (jobMsg) => {
        //     return (jobMsg.name.toLowerCase().indexOf(mess.toLowerCase()) === 0);
        //     };
        // },
        // jobHandleSelect_w(item) {
        //     console.log(item);
        //     this.selectedJob_w = item.value;
        // },

         marryFilter_m(val) {
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

        marryFilter_w(val) {
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

        
        // 性别筛选
        sexFilter_w(val) {
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
        sexFilter_m(val) {
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
            // console.log(e);
            // if (e.relatedTarget) {
            //     e.target.click();
            // };
            // console.log(e.relatedTarget)
        },


        // 民族

        nationFilter_m(val) {
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
        nationFilter_w(val) {
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

        countryFilter_w(val) {
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
        countryFilter_m(val) {
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


        serviceFilter_m(val) {
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
        serviceFilter_w(val) {
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


        // 身份证失去焦点计算年龄
        computedAge_m(){
            var date = new Date();
            var year = date.getFullYear();
            this.age_m = year - (this.idCard_m.slice(6,10));
            this.birthday_m =  this.idCard_m.slice(6,10) + '年' + this.idCard_m.slice(10, 12) + '月' + this.idCard_m.slice(12, 14) + '日';
        },
        computedAge_w(){
            var date = new Date();
            var year = date.getFullYear();
            this.age_w = year - (this.idCard_w.slice(6,10));
            this.birthday_w =  this.idCard_w.slice(6,10) + '年' + this.idCard_w.slice(10, 12) + '月' + this.idCard_w.slice(12, 14) + '日';
        },






        back() {
             this.$router.go(-1);
        },
        name_input(){
            console.log(this.name_w);
            console.log(this.name_m);
            if(this.name_w !='' || this.name_m !=''){
                this.fileDisabled = false;
            }else{
                this.fileDisabled = true;
            };
            
            if(this.name_w !=''){
                this.treatShow_w = true;
                this.treatHave = false;
            }else{
                this.treatShow_w = false;
            };
            if(this.name_m != ''){
                this.treatShow_m = true;
                this.treatHave = false;
            }else{
                this.treatShow_m = false;
            };
            if(this.name_m == '' && this.name_w ==''){
                this.treatHave = true;
            };

            // else if(this.name_m !=''){
            //     // this.treatShow_w = false;
            //     this.treatShow_m = true;
            //     this.treatHave = false;
            // }else if(this.name_m !='' && this.name_w !=''){
            //     this.treatShow_w = true;
            //     this.treatShow_m = true;
            //     this.treatHave = false;
            // }
            // else{
            //     this.treatShow_w = false;
            //     this.treatShow_m = false;
            //     this.treatHave = true;
            //     this.fileDisabled = true;
            // }
        },
        // 打开折叠面板（男方信息）
        openlist_m(){
            this.open_man = !this.open_man;
            if(this.open_man == true){
                this.openMsg_m = "关闭";
            }else if(this.open_man == false){
                this.openMsg_m = "展开";
            }
        },

         // 打开折叠面板（女方信息）
        openlist_w(){
            this.open_women = !this.open_women;
            if(this.open_women == true){
                this.openMsg_w = "关闭";
            }else if(this.open_women == false){
                this.openMsg_w = "展开";
            }
        },
        // openFullScreen2() {
        //     const loading = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        //     })
        // },
        // 获取人脸识别信息
        getUserMsg() {
            this.gztPop = false;
            if(this.deviceInput == ''){
                this.tipMsg = "请先输入设备编号";
                this.open();
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: '国政通验证身份中..请稍后',
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 1)',
                    customClass: 'loadingFontSize'
                });
                axios.get(baseUrl + 'api/sensetime/data/' + this.deviceInput)
                .then(res=>{
                    loading.close();
                    console.log(res);
                    if(res.data.status == 400040){
                        this.tipMsg = "请先放入身份证进行检测";
                        this.open(); 
                    }else if(res.data.status == 200040){
                        this.icCard = res.data.msg.medical_card_number;
                        localStorage.setItem("deviceid",res.data.msg.device_id);
                        var data = res.data;
                        var sex_m = '';
                        var sex_w = '';
                        var date = new Date();
                        var year = date.getFullYear();
                        this.gztNum = res.data.msg.score;
                        // console.log(year);
                        this.addSex = res.data.msg.sex;//若点击补录传值给补录页面
                        this.addArr = res.data.msg;
                        if(data.msg.sex == 0){
                            this.treatShow_m = true;
                            this.treatHave = false;
                            sex_m = "男";
                            this.open_man = true;
                            this.openMsg_m = "关闭";
                            this.name_m = data.msg.name;
                            this.sex_m = sex_m;
                            this.idCard_m = data.msg.id_number;
                            this.birthday_m = data.msg.birthday;
                            this.nation_m = data.msg.nation;
                            this.address_m = data.msg.address;
                            this.treatCard_m = data.msg.medical_card_number;
                            this.age_m = year - data.msg.birthday.slice(0,4);
                            this.idCardImg_m = "data:image/png;base64," + data.msg.id_image;
                            this.faceImg_m = "data:image/png;base64," + data.msg.face_image;
                            this.idCard_img_m = data.msg.id_image;
                            this.face_img_m = data.msg.face_image;
                            this.verify_result_m = data.msg.verify_result;
                            this.phone_m = data.msg.phone;
                            // if(this.treatCard_m == ''){
                            //     this.treatShow_m = false;
                            // }else{
                            //     this.treatShow_m = true;
                            //     this.treatHave = false;
                            // }
                            if(res.data.msg.is_gzt == 1){
                                this.gztMsg_m = "(身份校验成功)";
                                this.gztShow_m = true;
                                this.bgcolor_m = "blue"
                            }else{
                                this.gztMsg_m = "(身份校验失败)";
                                this.gztShow_m = true;
                                this.bgcolor_m = "red";
                            }
                        }else if(data.msg.sex == 1){
                            this.treatShow_w = true;
                            this.treatHave = false;
                            sex_m = "女";
                            this.open_women = true;
                            this.openMsg_w = "关闭";
                            this.name_w = data.msg.name;
                            this.sex_w = sex_m;
                            this.idCard_w = data.msg.id_number;
                            this.birthday_w = data.msg.birthday;
                            this.nation_w = data.msg.nation;
                            this.address_w = data.msg.address;
                            this.treatCard_w = data.msg.medical_card_number;
                            this.age_w = year - data.msg.birthday.slice(0,4);
                            this.idCardImg_w = "data:image/png;base64," + data.msg.id_image;
                            this.faceImg_w = "data:image/png;base64," + data.msg.face_image;
                            this.idCard_img_w = data.msg.id_image;
                            this.face_img_w = data.msg.face_image;
                            this.verify_result_w = data.msg.verify_result;
                            this.phone_W = data.msg.phone;
                            // if(this.treatCard_w == ''){
                            //     this.treatShow_w = false;
                            // }else{
                            //     this.treatShow_w = true;
                            //     this.treatHave = false;
                            // }
                            if(res.data.msg.is_gzt == 1){
                                this.gztMsg_w = "(身份校验成功)";
                                this.gztShow_w = true;
                                this.bgcolor_w = "blue";
                            }else{
                                this.gztMsg_w = "(身份校验失败)";
                                this.gztShow_w = true;
                                this.bgcolor_w = "red";
                            }
                        };
                        if(data.msg.medical_card_number != ''){
                            this.subDisabled = false;
                            this.fileDisabled = true;//
                        }else if(data.msg.medical_card_number == ''){
                            this.subDisabled = true;
                            this.fileDisabled = false;
                        };
                        if(this.name_w != "" && this.treatCard_w == ""){
                            this.fileDisabled = false;
                        }else if(this.name_m != "" && this.treatCard_m == ""){
                            this.fileDisabled = false;
                        }else {
                            this.fileDisabled = true;//
                        };


                        if(this.treatCard_m != '' || this.treatCard_w != ''){
                            this.hasIcCard = true;
                        }else {
                            this.gztPop = true;
                        };
                        

                        


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

                    }
                }).catch( error=> {
                    loading.close();
                    this.tipMsg = "服务器错误" + error;
                    this.open(); 
                    console.log(error);
                });
            }
        },

        // 提交信息按钮事件
        subMsgBtn(){
            // console.log(this.verify_result_w);
            let face_result_m = "";
            let face_result_w = "";
            if(this.verify_result_m !=0){
                face_result_m = false
            }else{
                face_result_m = true
            };
            if(this.verify_result_w != 0){
                face_result_w = false
            }else{
                face_result_w = true;
            };
            var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
            // console.log(this.cardType_w);
            // else if((this.cardType_w || this.cardType_m) != "身份证"){
            //     this.tipMsg = "证件类型目前仅支持身份证";
            //     this.open();
            // }
            if(this.name_w != '' && !phoneReg.test(this.phone_w)){
                this.tipMsg = "请输入女方正确的手机号";
                this.open();
            }else if(this.name_m != '' && !phoneReg.test(this.phone_m)){
                this.tipMsg = "请输入男方正确的手机号";
                this.open();
            }else if(this.indexId == ''){
                this.tipMsg = "请选择发卡机构";
                this.open();
            }else{
                var origin  = "";
                if(this.origin == ""){
                    origin = "weixin";
                }else if(this.origin != ""){
                    origin = this.origin;
                };
                this.fullscreenLoading = true;
                axios.post( baseUrl + 'api/hospital/admin/user/auth', {
                    "OP_NO": this.opNo,
                    "OP_Name": this.opName,
                    "OP_IssuerNo": this.opNo,
                    "OP_Issuer": this.opName,
                    "channel": "kefu",
                    "hospitalNo": this.hospitalIndex,
                    "PER_Service": this.serviceNum,
                    
                    
                    "medical_card_number_m": this.treatCard_m,
                    "name_m": this.name_m,
                    "identif_m": this.idCard_m,
                    "marriagestatus_m": this.selectedMarry_m,
                    "age_m": this.age_m,
                    "birthday_m": this.birthday_m,
                    "nationality_m": this.nation_m,
                    "country_m": this.country_m,
                    "identityaddress_m": this.address_m,
                    "profession_m": this.selectedJob_m,
                    "phone_m": this.phone_m,
                    "is_auth_m": face_result_m,
                    "hometown_m": this.selectedArea_m,
                    "idcardtype_m": this.cardType_m,
                    "id_face_image_m": this.idCard_img_m,
                    "scene_face_image_m": this.face_img_m,
                    "department_m": this.militarySelect_m,
                    "perCusService_m": this.selectServer_m,
                    "sex_m": this.sex_m,

                    "medical_card_number_w": this.treatCard_w,
                    "name_w": this.name_w,
                    "identif_w": this.idCard_w,
                    "marriagestatus_w": this.selectedMarry_w,
                    "age_w": this.age_w,
                    "birthday_w": this.birthday_w,
                    "nationality_w": this.nation_w,
                    "country_w": this.country_w,
                    "identityaddress_w": this.address_w,
                    "profession_w": this.selectedJob_w,
                    "phone_w": this.phone_w,
                    "is_auth_w": face_result_w,
                    "id_face_image_w": this.idCard_img_w,
                    "scene_face_image_w": this.face_img_w,
                    "hometown_w": this.selectedArea_w,
                    "idcardtype_w": this.cardType_w,
                    "department_w": this.militarySelect_w,
                    "perCusService_w": this.selectServer_w,
                    "sex_w": this.sex_w,
                })
                .then(res=>{
                    console.log(res);
                    this.fullscreenLoading = false;
                    if(res.data.status == 400040){
                        this.open3();
                    }else{
                        
                        this.$router.push({
                            path: '/card', 
                            query: {name_m: this.name_m, hospital: this.indexId, sex_m: this.sex_m,
                                        nation_m: this.nation_m, treat_m: this.treatCard_m,
                                        phone_m: this.phone_m, idCard_m: this.idCard_m,
                                        name_w: this.name_w, sex_w: this.sex_w,
                                        nation_w: this.nation_w, treat_w: this.treatCard_w,
                                        phone_w: this.phone_w, idCard_w: this.idCard_w,
                                    }
                        });
                    }
                })
                .catch(function(error){
                    console.log(error)
                })
            }
        },

        // 确定提交信息
        

        // 点击填入就诊卡事件
        fileCardBtn(){
            console.log(this.name_w)
            var phoneReg = /^[1][0,1,2,3,4,5,6,7,8,9][0-9]{9}$/;
            var idCardreg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
            // if(this.name_w != ''){
            //     if(!phoneReg.test(this.phone_w)){
            //         this.tipMsg = "请输入女方正确的手机号";
            //         this.open();
            //     }else if(this.indexId == ''){
            //         this.tipMsg = "请选择发卡机构";
            //         this.open();
            //     }else{
            //         var origin  = "";
            //         if(this.origin == ""){
            //             origin = "weixin";
            //         }else if(this.origin != ""){
            //             origin = this.origin;
            //         };
            //         axios.post(baseUrl +'api/his/create_patient', JSON.stringify({
            //             "OP_NO": this.opNo,
            //             "OP_Name": this.opName,
            //             "OP_IssuerNo": this.opNo,
            //             "OP_Issuer": this.opName,
            //             "channel": origin,
            //             "hospitalNo": this.indexId,
            //             "perCusService": this.selectServer,
            //             "PER_Service": this.serviceNum,
                    
            //             "name_w": this.name_w,
            //             "identif_w": this.idCard_w,
            //             "marriagestatus_w": this.selectedMarry_w,
            //             "age_w": this.age_w,
            //             "birthday_w": this.birthday_w,
            //             "nationality_w": this.nation_w,
            //             "country_w": this.countryShow_w = true?this.country_w:this.countrySelect_w,
            //             "identityaddress_w": this.address_w,
            //             "profession_w": this.selectedJob_w,
            //             "hometown_w": this.selectedArea_w,
            //             "phone_w": this.phone_w,
            //             "idcardtype_w": this.cardType_w,
            //             "department_w": this.militarySelect_w,

            //         }))
            //         .then(res=>{
            //             console.log(res);
            //             if(res.data.status == 200202){
            //                 this.open2();
            //                 this.subDisabled = false;
            //                 this.fileDisabled = true;
            //                 if(res.data.msg.visit_card_m == ''){
            //                     this.treatShow_m = false
            //                 }else if(res.data.msg.visit_card_m != ''){
            //                     this.treatShow_m == true;
            //                 }else if(res.data.msg.visit_card_w == ''){
            //                     this.treatShow_w = false;
            //                 }else if(res.data.msg.visit_card_w != ''){
            //                     this.treatShow_w = true;
            //                 };
            //                 this.treatCard_m = res.data.msg.visit_card_m;
            //                 this.treatCard_w = res.data.msg.visit_card_w;
            //             }
            //         })
            //         .catch(error=>{

            //         })
            //     }
            // }else if(this.name_m != ''){
            //     if(!phoneReg.test(this.phone_m)){
            //         this.tipMsg = "请输入男方正确的手机号";
            //         this.open();
            //     }else if(this.indexId == ''){
            //         this.tipMsg = "请选择发卡机构";
            //         this.open();
            //     }else{
            //         var origin  = "";
            //         if(this.origin == ""){
            //             origin = "weixin";
            //         }else if(this.origin != ""){
            //             origin = this.origin;
            //         };
            //         axios.post(baseUrl +'api/his/create_patient', JSON.stringify({
            //             "OP_NO": this.opNo,
            //             "OP_Name": this.opName,
            //             "OP_IssuerNo": this.opNo,
            //             "OP_Issuer": this.opName,
            //             "channel": origin,
            //             "hospitalNo": this.indexId,
            //             "perCusService": this.selectServer,
            //             "PER_Service": this.serviceNum,
                    
            //             "name_m": this.name_m,
            //             "identif_m": this.idCard_m,
            //             "marriagestatus_m": this.selectedMarry_m,
            //             "age_m": this.age_m,
            //             "birthday_m": this.birthday_m,
            //             "nationality_m": this.nation_m,
            //             "country_m": this.countryShow_m = true?this.country_m:this.countrySelect_m,
            //             "identityaddress_m": this.address_m,
            //             "profession_m": this.selectedJob_m,
            //             "hometown_m": this.selectedArea_m,
            //             "phone_m": this.phone_m,
            //             "idcardtype_m": this.cardType_m,
            //             "department_m": this.militarySelect_m,

            //         }))
            //         .then(res=>{
            //             console.log(res);
            //             if(res.data.status == 200202){
            //                 this.open2();
            //                 this.subDisabled = false;
            //                 this.fileDisabled = true;
            //                 if(res.data.msg.visit_card_m == ''){
            //                     this.treatShow_m = false
            //                 }else if(res.data.msg.visit_card_m != ''){
            //                     this.treatShow_m == true;
            //                 }else if(res.data.msg.visit_card_w == ''){
            //                     this.treatShow_w = false;
            //                 }else if(res.data.msg.visit_card_w != ''){
            //                     this.treatShow_w = true;
            //                 };
            //                 this.treatCard_m = res.data.msg.visit_card_m;
            //                 this.treatCard_w = res.data.msg.visit_card_w;
            //             }
            //         })
            //         .catch(error=>{

            //         })
            //     }
            // }else if(this.name_w != '' && this.name_m != ''){
                
            // }
            // var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            // else if(this.selectServer == ''){
            //     this.tipMsg = "请选择客服";
            //     this.open();
            // }
            if(this.name_m != '' && (this.sex_m == '' || this.idCard_m == '')){
                this.tipMsg = "请先完善男方信息";
                this.open();
            }else if(this.name_w != '' && (this.sex_w == '' || this.idCard_w == '')){
                this.tipMsg = "请先完善女方信息";
                this.open();
            }else if(this.name_m != '' && !phoneReg.test(this.phone_m)){
                this.tipMsg = "请输入男方正确的手机号";
                this.open();
            }else if(this.name_w != '' && !phoneReg.test(this.phone_w)){
                this.tipMsg = "请输入女方正确的手机号";
                this.open();
            }else if(this.indexId == ''){
                this.tipMsg = "请选择发卡机构";
                this.open();
            }else{
                // var origin  = "";
                // if(this.origin == ""){
                //     origin = "weixin";
                // }else if(this.origin != ""){
                //     origin = this.origin;
                // };
                console.log(this.indexId);
                axios.post(baseUrl +'api/his/create_patient', JSON.stringify({
                    "OP_NO": this.opNo,
                    "OP_Name": this.opName,
                    "OP_IssuerNo": this.opNo,
                    "OP_Issuer": this.opName,
                    "channel": "kefu",
                    "hospitalNo": this.hospitalIndex,
                    "PER_Service": this.serviceNum,
                    
                    "name_m": this.name_m,
                    "identif_m": this.idCard_m,
                    "marriagestatus_m": this.selectedMarry_m,
                    "age_m": this.age_m,
                    "birthday_m": this.birthday_m,
                    "nationality_m": this.nation_m,
                    "country_m": this.country_m,
                    "identityaddress_m": this.address_m,
                    "profession_m": this.selectedJob_m,
                    "phone_m": this.phone_m,
                    "hometown_m": this.selectedArea_m,
                    "idcardtype_m": this.cardType_m,
                    "department_m": this.militarySelect_m,
                    "perCusService_m": this.selectServer_m,
                    "visit_card_m": this.treatCard_m,
                    "sex_m": this.sex_m,
                    
                    "name_w": this.name_w,
                    "identif_w": this.idCard_w,
                    "marriagestatus_w": this.selectedMarry_w,
                    "age_w": this.age_w,
                    "birthday_w": this.birthday_w,
                    "nationality_w": this.nation_w,
                    "country_w": this.country_w,
                    "identityaddress_w": this.address_w,
                    "profession_w": this.selectedJob_w,
                    "hometown_w": this.selectedArea_w,
                    "phone_w": this.phone_w,
                    "idcardtype_w": this.cardType_w,
                    "department_w": this.militarySelect_w,
                    "perCusService_w": this.selectServer_w,
                    "visit_card_w": this.treatCard_w,
                    "sex_w": this.sex_w,
                }))
                .then(res=>{
                    console.log(res);
                    // console.log(res.data.msg.visit_card_w);
                   if(res.data.status == 200202){
                        this.open2();
                        this.subDisabled = false;
                        this.fileDisabled = true;
                        if(res.data.msg.visit_card_m == ''){
                            this.treatShow_m = false
                        }else if(res.data.msg.visit_card_m != ''){
                            this.treatShow_m == true;
                        }else if(res.data.msg.visit_card_w == ''){
                            this.treatShow_w = false;
                        }else if(res.data.msg.visit_card_w != ''){
                            this.treatShow_w = true;
                        };
                        this.treatCard_m = res.data.msg.visit_card_m;
                        this.treatCard_w = res.data.msg.visit_card_w;
                    }else if(res.data.status == 400201){
                        this.tipMsg = res.data.status + " " + res.data.desc;
                        this.open();
                    }else if(res.data.status == 400400){
                        this.tipMsg = res.data.status + " " +res.data.desc,
                        this.open();
                    }else if(res.data.status == 400003){
                        this.tipMsg = "参数错误" + res.data.status + " " +res.data.desc;
                        this.open();
                    }else if(res.data.status == 200402){
                        this.tipMsg = "男方身份证或手机号已注册,请提交生成二维码",
                        this.open();
                        this.subDisabled = false;
                        this.fileDisabled = true;
                    }else{
                        this.tipMsg = "服务器出错"+res.data.status + "error",
                        this.open();
                    }
                })
                .catch( error=> {
                    console.log(error);
                    this.tipMsg = "服务器出错"+error,
                    this.open();
                });
            }
        },
        
        // 编辑设备号
        editDevice(){
            this.deviceNum = false;
        },


        //弹窗提示语
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

        //选择医院下拉框
        selectHospital(){
            // console.log(this.indexId)
        },

        // 选择婚姻
        selectMarry_m(){
            console.log(this.selectedMarry_m);
            // console.log(this.selectedJob);
            // console.log(this.selectedArea);
        },
        selectMarry_w(){
            console.log(this.selectedMarry_w);
            // console.log(this.selectedJob);
            // console.log(this.selectedArea);
        },
        selectService_w(){
            console.log(this.selectServer_w)
        },
        selectService_m(){
            console.log(this.selectServer_m)
        },
        

        // 选择身份卡、军官证、护照类型
        selectCardType_w(){
            console.log(this.cardType_w);
            if(this.cardType_w == "护照"){
                this.countryShow_w = false;
                this.countryInputShow_w = true;
                this.militaryShow_w = false;
                this.idCardPlaceholderMsg_w = "护照编号"
            }else if(this.cardType_w == "军官证"){
                this.countryShow_w = false;
                this.idCardPlaceholderMsg_w = "军官证号"
                this.militaryShow_w = true;
                this.countryInputShow_w = true;
            }else if(this.cardType_w == "身份证"){
                this.idCardPlaceholderMsg_w = "身份证号"
                this.militaryShow_w = false;
                this.countryInputShow_w = false;
                this.countryShow_w = true;
            }else{
                this.countryShow_w = true;
                this.militaryShow_w = false;
                this.countryInputShow_w = false;
            }
        },
        selectCardType_m(){
            console.log(this.cardType_m);
            if(this.cardType_m == "护照"){
                this.countryShow_m = false;
                this.countryInputShow_m = true;
                this.militaryShow_m = false;
                this.idCardPlaceholderMsg_m = "护照编号"
            }else if(this.cardType_m == "军官证"){
                this.countryShow_m = false;
                this.idCardPlaceholderMsg_m = "军官证号"
                this.militaryShow_m = true;
                this.countryInputShow_m = true;
            }else if(this.cardType_m == "身份证"){
                this.idCardPlaceholderMsg_m = "身份证号";
                this.militaryShow_m = false;
                this.countryInputShow_m = false;
                this.countryShow_m = true;
            }else{
                this.countryShow_m = true;
                this.militaryShow_m = false;
                this.countryInputShow_m = false;
            }
        },

        confirmBtn() {
            const h = this.$createElement;
            this.$msgbox({
            title: '确认信息',
            message: h('p', null, [
                h('span', null, '请确认以上信息无误'),
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                this.confirmSub();
                setTimeout(() => {
                    done();
                    setTimeout(() => {
                    instance.confirmButtonLoading = false;
                    }, 300);
                }, 1000);
                } else {
                    done();
                }
            }
            }).then(action => {
            this.$message({
                type: 'info',
                message: 'action: ' + action
            });
            });
        },
        // 
        onSubmit() {
            console.log('submit!');
        },
        open2() {
            this.$message({
            message: '填入成功',
            type: 'success'
            });
        },
        open3() {
            this.$confirm('该身份证或手机号已有就诊卡号, 是否生成电子健康卡?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$router.push({
                path: '/card', 
                query: {name_m: this.name_m, hospital: this.indexId, sex_m: this.sex_m,
                            nation_m: this.nation_m, treat_m: this.treatCard_m,
                            phone_m: this.phone_m, idCard_m: this.idCard_m,
                            name_w: this.name_w, sex_w: this.sex_w,
                            nation_w: this.nation_w, treat_w: this.treatCard_w,
                            phone_w: this.phone_w, idCard_w: this.idCard_w,
                        }
            });
            
            this.$message({
                type: 'success',
                message: '跳转成功!'
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消'
            });          
            });
        },

        // 清空输入框
        delMsg(){
            if(this.name_w != ''){
                this.name_w = "";
                this.sex_w = "";
                this.idCard_w = "";
                this.age_w = "";
                this.birthday_w = "";
                this.nation_w = "";
                this.address_w = "";
                this.phone_w = "";
                this.treatCard_w = "";
                this.idCardImg_w = require('../../assets/background_idcard.png');
                this.faceImg_w = require('../../assets/background_faceid.png');
                this.gztMsg_w = "";
                this.marry_w = "已婚";
                this.area_w = "乌鲁木齐";
                this.job_w = "个体经营者";
                this.selectServer_w = "";
                this.serviceNum = "";
                this.hasIcCard = false;
                this.gztShow_w = false;
            }else if(this.name_m != ''){
                this.name_m = "";
                this.sex_m = "";
                this.idCard_m = "";
                this.age_m = "";
                this.birthday_m = "";
                this.marry_m = "已婚";
                this.area_m = "乌鲁木齐";
                this.job_m = "个体经营者";
                this.selectServer_m = "";
                this.serviceNum = "";
                this.nation_m = "";
                this.address_m = "";
                this.phone_m = "";
                this.treatCard_m = "";
                this.idCardImg_m = require('../../assets/background_idcard.png');
                this.faceImg_m = require('../../assets/background_faceid.png');
                this.gztMsg_m = "";
                this.hasIcCard = false;
                this.gztShow_m = false;
            }
        },

        // 立即挂号
        order(){
            if(this.treatCard_m != ""){
                this.$router.push({
                    path: 'order',
                    query: {
                        treatCard: this.treatCard_m
                    }
                })
            }else if(this.treatCard_w != ""){
                this.$router.push({
                    path: 'order',
                    query: {
                        treatCard: this.treatCard_w
                    }
                })
            }
            
        },

        // 补录配偶
        inquire(){
            this.$router.push({
                path: 'inquire',
                query: {
                    icCard: this.icCard,
                }
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
    },
    mounted(){
        // console.log(this.military);
        // 获取发卡机构列表
        this.subDisabled = true;
        axios.get(baseUrl + 'api/his/hospital_list')
        .then(res=>{
            console.log(res);
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
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }else if(tempHospitalNum == 73){
                this.hospitalNum = "114";
                this.getService();
                for(var i=0;i<this.hospitalArr.length;i++){
                    if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }else if(tempHospitalNum == 74){
                this.hospitalNum = "113";
                this.getService();
                for(var i=0;i<this.hospitalArr.length;i++){
                    if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }else if(tempHospitalNum == 75){
                this.hospitalNum = "112";
                this.getService();
                for(var i=0;i<this.hospitalArr.length;i++){
                    if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }else if(tempHospitalNum == 77){
                this.hospitalNum = "109";
                this.getService();
                for(var i=0;i<this.hospitalArr.length;i++){
                    if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }else if(tempHospitalNum == 78){
                this.hospitalNum = "110";
                this.getService();
                for(var i=0;i<this.hospitalArr.length;i++){
                    if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }else if(tempHospitalNum == 79){
                this.hospitalNum = "108";
                this.getService();
                for(var i=0;i<this.hospitalArr.length;i++){
                    if(this.hospitalArr[i].hospitalNo == this.hospitalNum){
                        this.indexId = this.hospitalArr[i].hospitalName;
                        this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                    }
                };
            }
        })
        .catch(function (error) {
            console.log(error);
        });



        // axios.get(baseUrl + "api/sys/get_wait_doctor?hos_id=108")
        // .then(res=>{
        //     console.log(res);
        //     if(res.data.status == 200026){
        //         this.serviceArr = res.data.msg;
        //         this.serviceArr_new = res.data.msg;
        //     }
        // }).catch(err=>{
        //     console.log(err);
        // })




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
        this.opNo = UrlSearch(url, 'opNo');
        this.opName = UrlSearch(url, 'opName');
        // console.log(this.opNo)
        var kf = UrlSearch(url, 'kf');
        // console.log(kf);
        // var _url = decodeURIComponent(url);
        // var _kf = unescape(kf.replace(/\\u/g, '%u'));
        // console.log(_kf);
        // try
        //     {
        //     var kfArr = _kf.slice(0,_kf.lastIndexOf("]")+1);
        //     // console.log(_kf.lastIndexOf("]"));
        //     this.serviceArr = eval ("(" + kfArr+ ")"); 
        //     }
        // catch(err)
        // {
        //     console.log(err);
        //     this.serviceArr = eval ("(" + _kf+ ")");   
        // }

        // console.log(_kf);
        // var kfArr = _kf.slice(0,-10);
         
    },
    
}
</script>
<style lang="scss" scoped>
    @import './register.scss';
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
