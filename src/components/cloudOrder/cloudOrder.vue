<template>
    <div class="cloudOrder">
        <div class="cloudOrder_header">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="cloudOrder_main">
            <ul class="clear">
                <li>
                    <label for="">就诊卡号：</label>
                    <el-input  placeholder="就诊卡号"   @keyup.enter.native="inquire" v-model="icCard"></el-input>
                </li>
                <li>
                    <label for="">姓名：</label>
                    <el-input  placeholder="姓名" v-model="name" v-bind:disabled="true"></el-input>
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
            </ul>

            <ul class="clear" style="border-top: 1px dashed #ccc;margin-top:5%;padding-top:5%">
                 <li>
                    <label for="">挂号机构：</label>
                    <!-- <select name="" v-model="hospitalId" v-on:change="hospitalSelect">
                        <option value="">==请选择==</option>
                        <option  v-for="(item,index) in hospitalArr" v-bind:value="item.hospitalNo"  :key="index">
                            {{item.hospitalName}}   
                        </option>
                    </select> -->
                    <el-select v-model="hospitalId" clearable v-on:change="hospitalSelect" style="width:60%" filterable placeholder="==请选择==" :filterMethod="hosFilter">
                        <el-option v-for="item in hospitalArr"  :key="item.hospitalName"  :label="item.hospitalName" :value="item.hospitalNo">
                            <span>{{item.hospitalName}}</span>
                            <span style="float:right">{{item.pinyin}}</span>
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <label for="">挂号科室：</label>
                    <!-- <select :disabled="roomDisabled" v-on:change="roomSelect" v-model="roomId">
                        <option value="">==请选择==</option>
                         <option  v-for="(item,index) in roomArr" v-bind:value="item.itemNo"  :key="index">
                            {{item.ItemName}}
                        </option>
                    </select> -->
                    <el-select v-model="roomId" v-on:input="room_input(roomId)" :disabled="roomDisabled" clearable v-on:change="roomSelect" style="width:60%" filterable placeholder="==请选择==" :filterMethod="roomFilter">
                        <el-option v-for="(item,index) in roomArr"  :key="index"  :label="item.ItemName" :value="item.itemNo">
                            <span>{{item.ItemName}}</span>
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <label for="">挂号日期：</label>
                    <el-date-picker
                        v-model="date"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd" v-on:input="date_input(date)" v-on:change="dateSelect" :picker-options="pickerOptions0"  v-bind:disabled="dateDisabled">
                    </el-date-picker>
                </li>
                <li>
                    <label for="">挂号医生：</label>
                    <!-- <select :disabled="doctorDisabled"  v-on:change="timeSelect" v-model="time">
                        <option value="">==请选择==</option>
                        <option v-for="(item,index) in doctorArr" v-bind:value="[item.doctorNo,item.timeNo]" :key="index">
                            {{item.doctorName}}
                        </option>
                    </select> -->
                    <el-select v-model="time" v-on:input="doctor_input(time)" :disabled="doctorDisabled" clearable v-on:change="timeSelect" style="width:60%" filterable placeholder="==请选择==">
                        <el-option v-for="(item,index) in doctorArr"  :key="index"  :label="item.doctorName" :value="item.doctorNo">
                            <span>{{item.doctorName}}</span>
                        </el-option>
                    </el-select>
                </li>

                <li>
                    <label for="">挂号时间：</label>
                    <!-- <select style="width:60%" v-on:change="getTime" v-model="timeId" v-bind:disabled="timeDisabled">
                        <option value="">==请选择==</option>
                        <option v-for="(item,index) in timeArr" v-bind:value="[item.timeName,item.timeNo,item.schedulingNo]" :key="index">
                            {{item.timeName}}
                        </option>
                    </select> -->
                    <el-select v-model="timeId" :disabled="timeDisabled" clearable v-on:change="getTime" style="width:60%" filterable placeholder="==请选择==">
                        <el-option v-for="(item,index) in timeArr"  :key="index"  :label="item.timeName" :value="item.schedulingNo">
                            <span>{{item.timeName}}</span>
                        </el-option>
                    </el-select>
                </li>

                <li>
                    <label for="">来源：</label>
                    <el-autocomplete class="inline-input" style="width:60%" v-model="source" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" >
                            
                    </el-autocomplete>
                </li>
                <!-- <li v-show="unEngenderShow"></li> -->
                <li>    
                    <label for="">操作员：</label>
                    <el-input  placeholder="操作员" v-model="opName" :disabled="true"></el-input>
                </li>
                <!-- <li v-show="unEngenderShow"></li> -->
                <!-- <li>
                    <el-checkbox>购买病历</el-checkbox>
                </li> -->
            </ul>
        </div>
        <div class="cloudOrder_footer">
            <el-button type="warning" @click="back">返回上一页</el-button>
            <el-button type="warning" style="float:right;" @click="order" v-loading.fullscreen.lock="fullscreenLoading" v-bind:disabled="orderBtn">立即预约</el-button>
        </div>

        <el-dialog
            title="提示" :visible.sync="popshow" width="30%" >
            <span>{{this.tipsMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="popshow = false">关 闭</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示"  :visible.sync="centerDialogVisible" width="30%"  center>
            <span>{{remark}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="backIndex"  v-loading.fullscreen.lock="fullscreenLoading">返回主页</el-button>
                <el-button type="warning" @click="inquireOrder" v-loading.fullscreen.lock="fullscreenLoading">查询预约</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import axios from "axios";
import baseUrl from "../base/baseUrl.js";
export default {
  data() {
    return {
      msg: "云门诊预约",
      icCard: "", //就诊卡号
      name: "", //姓名
      sex: "", //性别
      idCard: "", //身份证
      phone: "", //手机号
      opName: "", //操作员名字
      opNo: "", //操作员编号
      date: "", //日期
      time: "", //时间
      source: "", //来源

      hospitalId: "", //医院编号
      roomId: "", //科室编号值
      timeId: "",

      hospitalArr: [],
      hospitalArr_new: [],
      roomArr: [], //挂号科室
      roomArr_new: [], //挂号科室
      doctorArr: [], //挂号医生
      doctorArr_new: [], //挂号医生
      timeArr: [], //时间
      sourceArr: [
        { name: "PYJS", value: "朋友介绍" },
        { name: "ARZY", value: "爱人在院" },
        { name: "YSJS", value: "医生介绍" },
        { name: "WYJS", value: "外院介绍" },
        { name: "KB", value: "口碑" },
        { name: "FJ", value: "附近" },
        { name: "YGJS", value: "员工介绍" },
        { name: "WL", value: "网络" },
        { name: "KHJS", value: "客户介绍" },
        { name: "DS", value: "电视" },
        { name: "DH", value: "电话" },
        { name: "BZ", value: "报纸" },
        { name: "GB", value: "广播" },
        { name: "LG", value: "路过" },
        { name: "QT", value: "其他" }
      ], //来源

      fullscreenLoading: false, //loading
      orderBtn: true, //控制挂号按钮

      roomDisabled: true,
      dateDisabled: true,
      doctorDisabled: true,
      timeDisabled: true,

      // 时间范围控制
      pickerOptions0: {
        disabledDate(time) {
          let _now = Date.now(),
            // seven = 1 * 24 * 60 * 60 * 1000,
            seven = 8 * 24 * 60 * 60 * 1000,
            sevenDays = _now + seven;
          // sevenDays = _now;
          return (
            time.getTime() < _now - 1 * 24 * 60 * 60 * 1000 ||
            time.getTime() > sevenDays
          ); //小于当前的禁止，大于7天前的禁止
        }
      },

      tipsMsg: "", //提示消息
      popshow: false,
      orderTips: "获取列表失败~~~",
      remark: "",
      centerDialogVisible: false,

      hospitalNum: "",
      hospitalIndex: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    // socket
    socket() {
      var ws = new WebSocket("ws://127.0.0.1:8804");
      ws.onopen = function() {
        console.log("连接websocket成功");
      };
      ws.onmessage = evt => {
        var data = JSON.parse(evt.data);
        console.log(data);
        this.icCard = data.msg.medical_card_number;
        this.name = data.msg.first_name;
        this.idCard = data.msg.id_number;
        this.phone = data.msg.phone_number;
        this.sex = data.msg.sex;
        this.inquire();
      };
      ws.onclose = function(evt) {
        console.log("Connection closed.");
      };
    },

    // 通过就诊卡回车查询用户信息
    inquire() {
      if (this.treatId == "") {
        return;
      } else {
        axios
          .get(baseUrl + "api/mq/search_patient?keyword=" + this.icCard)
          .then(res => {
            console.log(res);
            if (res.data.msg.length == 0) {
              this.$message("未找到该就诊卡号相关信息");
            } else {
              this.name = res.data.msg[0].PAT_NAME;
              this.sex = res.data.msg[0].PHYSI_SEX_NAME;
              this.idCard = res.data.msg[0].ID_NUMBER;
              this.phone = res.data.msg[0].PHONE_NO;
            }
          })
          .catch(err => {
            console.log(err);
            this.orderTips = "服务器出错" + err;
            this.fails();
          });
      }
    },

    hospitalSelect() {
      if (this.hospitalNum != "") {
        axios
          .get(
            baseUrl +
              "api/his/book_subject_list?hospital_no=" +
              this.hospitalNum
          )
          .then(res => {
            console.log(res);
            if (res.data.status == 200206) {
              this.roomDisabled = false;
              this.roomArr = res.data.msg;
              this.roomArr_new = res.data.msg;
              console.log(this.roomArr);
            }
          })
          .catch(err => {
            console.log(err);
            this.orderTips = "服务器出错" + err;
            this.fails();
          });
      }
    },

    roomSelect() {
      console.log(this.roomId);
      if (this.roomId != "") {
        axios
          .get(baseUrl + "api/his/book_date_list?item_no=" + this.roomId)
          .then(res => {
            console.log(res);
            if (res.data.status == 200207) {
              this.dateDisabled = false;
              this.date = res.data.msg[0].requestDate;
              this.dateSelect();
            } else {
              this.fails();
            }
          })
          .catch(error => {
            console.log(error);
            this.orderTips = "服务器出错";
            this.fails();
          });
      }
    },
    dateSelect() {
      console.log(this.date);
      if (this.date != "" && this.date != null) {
        axios
          .get(
            baseUrl +
              "api/his/book_doctor_list?item_no=" +
              this.roomId +
              "&registered_start_date=" +
              this.date +
              "&registered_end_date=" +
              this.date
          )
          .then(res => {
            console.log(res);
            if (res.data.status == 200208) {
              this.doctorArr = res.data.msg;
              this.doctorDisabled = false;
            } else {
              this.fails();
            }
          })
          .catch(error => {
            console.log(error);
            this.orderTips = "服务器出错";
            this.fails();
          });
      }
    },

    timeSelect() {
      if (this.time != "") {
        axios
          .get(
            baseUrl +
              "api/his/book_doctor_schedule_list?item_no=" +
              this.roomId +
              "&registered_start_date=" +
              this.date +
              "&registered_end_date=" +
              this.date +
              "&doctor_no=" +
              this.time
          )
          .then(res => {
            console.log(res);
            if (res.data.status == 200209) {
              this.timeArr = res.data.msg;
              this.timeDisabled = false;
              this.timeId = "";
            } else {
              this.orderTips = res.data.desc + res.data.status;
              this.fails();
            }
          })
          .catch(error => {
            console.log(error);
            this.orderTips = "服务器出错";
            this.fails();
          });
      }
    },

    getTime() {
      console.log(this.timeId);
      for (var i = 0; i < this.timeArr.length; i++) {
        if (this.timeId == this.timeArr[i].schedulingNo) {
          this.tempTime = this.timeArr[i].timeNo;
          console.log(this.tempTime);
        }
      }
      if (this.timeId != "") {
        this.orderBtn = false;
        this.timeId = this.timeId;
      }
    },

    // 监听输入康的值
    room_input() {
      if (this.roomId == "") {
        this.dateDisabled = true;
        this.doctorDisabled = true;
        this.timeDisabled = true;

        this.date = "";
        this.time = "";
        this.timeId = "";
      }
    },

    date_input() {
      if (this.date == "" || this.date == null) {
        this.doctorDisabled = true;
        this.timeDisabled = true;

        this.time = "";
        this.timeId = "";
      }
    },

    doctor_input() {
      console.log(this.timeId);
      if (this.time == "") {
        this.timeDisabled = true;
        this.timeId = "";
      }
    },

    // 立即挂号
    order() {
      if (this.icCard == "" || this.name == "") {
        this.tipsMsg = "请先输入用户信息";
        this.popshow = true;
      } else {
        console.log(this.timeId);
        this.fullscreenLoading = true;
        axios
          .post(
            baseUrl + "api/his/add_book_queue",
            JSON.stringify({
              item_no: this.roomId,
              identify_no: this.idCard,
              visit_card: this.icCard,
              registered_date: this.date,
              doctor_no: this.time,
              time_no: this.tempTime,
              scheduling_no: this.timeId
            })
          )
          .then(res => {
            console.log(res);
            this.fullscreenLoading = false;
            if (res.data.status == 2002010) {
              this.centerDialogVisible = true;
              this.remark = res.data.msg.remark;
            } else if (res.data.status == 400210) {
              this.tipsMsg =
                "挂号失败:" +
                res.data.desc +
                res.data.status +
                res.data.msg.error;
              this.popshow = true;
            } else {
              // TODO //后期判定不允许多次点击或者直接情空表单数据
              this.tipsMsg = "挂号失败" + res.data.desc + res.data.status;
              this.popshow = true;
            }
          })
          .catch(err => {
            this.fullscreenLoading = false;
            console.log(err);
            tthis.orderTips = "服务器出错" + err;
            this.fails();
          });
      }
    },

    // 错误提示
    fails() {
      this.$message.error(this.orderTips);
    },

    backIndex() {
      this.$router.push({
        path: "index"
      });
    },
    inquireOrder() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
        this.$router.push({
          path: "inquireOrder",
          query: {
            treatCard: this.icCard
          }
        });
      }, 1000);
    },

    // 来源下拉

    querySearch(queryString, cb) {
      console.log(queryString);
      var restaurants = this.sourceArr;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
      this.source = item.value + " " + this.name;
      console.log(this.source);
    },

    // 机构筛选
    hosFilter(val) {
      if (val) {
        var tempArr = [];
        this.hospitalArr_new.forEach(function(opt, index) {
          if (
            opt["pinyin"].toUpperCase().indexOf(val.toUpperCase()) == 0 ||
            opt["hospitalName"].indexOf(val) == 0
          ) {
            tempArr.push(opt);
          }
        });
        this.hospitalArr = tempArr;
      } else {
        this.hospitalArr = this.hospitalArr_new;
      }
    },

    roomFilter(val) {
      if (val) {
        var tempArr = [];
        this.roomArr_new.forEach(function(opt, index) {
          if (
            opt["pinyin"].toUpperCase().indexOf(val.toUpperCase()) == 0 ||
            opt["hospitalName"].indexOf(val) == 0
          ) {
            tempArr.push(opt);
          }
        });
        this.this.roomArr = tempArr;
      } else {
        this.this.roomArr = this.roomArr_new;
      }
    },

    enter(e) {
      e.target.click();
    },

    // 获取医院列表
    getHospital() {
      axios
        .get(baseUrl + "api/his/hospital_list")
        .then(res => {
          console.log(res);
          if (res.data.status == 200201) {
            this.hospitalArr = res.data.msg;
            this.hospitalArr_new = res.data.msg;

            function UrlSearch(path, param) {
              var name;
              var str = decodeURI(path); //取得整个地址栏
              var num = str.indexOf("?");
              str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
              var arr = str.split("&"); //各个参数放到数组里
              for (var i = 0; i < arr.length; i++) {
                num = arr[i].indexOf("=");
                if (num > 0) {
                  name = arr[i].substring(0, num);
                  if (name === param) {
                    return arr[i].substr(num + 1);
                  }
                  continue;
                }
              }
            }
            var url = window.location.href;
            var tempHospitalNum = UrlSearch(url, "hospitalId");

            // tempHospitalNum  ifream参数，通过参数查找编号

            for (var i = 0; i < this.hospitalArr.length; i++) {
              if (this.hospitalArr[i].hospitalNoZ == tempHospitalNum) {
                this.hospitalId = this.hospitalArr[i].hospitalName;
                this.hospitalIndex = this.hospitalArr[i].hospitalNo;
                this.hospitalNum = this.hospitalArr[i].hospitalNo;
                this.hospitalSelect();
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    // var date = new Date();
    // var year = date.getFullYear();

    // var month = date.getMonth()+1;
    // if(month<10){
    //     month = "0"+month;
    // }
    // var day = date.getDate();

    // 获取医院列表
    this.getHospital();
    // socket
    this.socket();

    // ifream
    function UrlSearch(path, param) {
      var name;
      var str = decodeURI(path); //取得整个地址栏
      var num = str.indexOf("?");
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      var arr = str.split("&"); //各个参数放到数组里
      for (var i = 0; i < arr.length; i++) {
        num = arr[i].indexOf("=");
        if (num > 0) {
          name = arr[i].substring(0, num);
          if (name === param) {
            return arr[i].substr(num + 1);
          }
          continue;
        }
      }
    }
    var url = window.location.href;
    this.opName = UrlSearch(url, "opName");
    this.opNo = UrlSearch(url, "opNo");
    console.log(this.opName);
  }
};
</script>
<style lang="scss" scoped>
@import "./cloudOrder.scss";
</style>
<style>
.el-input > .el-input__inner {
  color: #666 !important;
}
input::-webkit-input-placeholder {
  color: #666 !important;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #ddd;
}
.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
  background-color: #ddd;
}
</style>
