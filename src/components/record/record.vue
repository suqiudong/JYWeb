<template>
    <div class="record clear">
        <div class="record_header">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        
        <div class="record_main clear">
            <!-- <div class="record_top">
                <el-input v-model="inputMsg" placeholder="请输入就诊卡号" style="width:40%" @keyup.enter="recordBtn"></el-input>
                <el-date-picker v-model="value6" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-button type="warning" @click="recordMoreBtn">更多筛选</el-button>
                <el-button type="warning" v-loading.fullscreen.lock="fullscreenLoading" @click="recordBtn">查询</el-button>
            </div> -->
            <div class="record_left clear">
                <div class="clear">
                    <h1>筛选条件</h1>
                    <el-button type="warning" style="margin-left:2%" @click="del">清空</el-button>
                    <el-button type="warning" style="margin-left:2%" v-loading.fullscreen.lock="fullscreenLoading" @click="recordBtn">查询</el-button>
                </div>
                <ul class="clear">
                    <li>
                        <label for="" style="width:70px">基本信息：</label>
                        <input type="text" @keyup.enter="recordBtn"  v-model="icCard" style="width:60%" placeholder="卡号，姓名，身份证，手机号">
                    </li>
                    <!-- <li>
                        <label for="" style="width:70px">姓名：</label>
                        <input type="text" @keyup.enter="recordBtn"   v-model="name" placeholder="姓名">
                    </li>
                    <li>
                        <label for="" style="width:70px">手机号：</label>
                        <input type="text" @keyup.enter="recordBtn"   v-model="phone" placeholder="手机号">
                    </li>
                    <li>
                        <label for="" style="width:70px">身份证号：</label>
                        <input type="text" @keyup.enter="recordBtn"  v-model="idCard" placeholder="身份证号">
                    </li> -->
                    <li>
                        <label for="" style="width:70px">挂号状态：</label>
                        <!-- <select v-on:change="selectStatus" v-model="status" @keyup.enter="recordBtn"  >
                            <option value="" v-for="(item,index) in statusArr" v-bind:value="item.num" :key="index">
                                {{item.name}}
                            </option>
                        </select> -->
                        <el-select v-model="status" v-on:change="selectStatus" clearable style="width:60%" filterable placeholder="请选择" :filterMethod="statusFilter">
                            <el-option v-for="item in statusArr"  :key="item.name"  :label="item.name" :value="item.num">
                            </el-option>
                        </el-select>
                    </li>
                     <!-- <li>
                        <label for="" style="width:70px">挂号医院：</label>
                        <select v-model="hospitalId" v-on:change="selectHospital" @keyup.enter="recordBtn"  >
                            <option value="">==请选择==</option>
                            <option value="" v-for="(item,index) in hospitalArr" v-bind:value="item.hospitalNo" :key="index">
                                {{item.hospitalName}}
                            </option>
                        </select>
                    </li> -->
                    <!-- <li>
                        <label for="" style="width:70px">挂号科室：</label>
                        <select v-on:change="selectRoom" v-model="roomId" @keyup.enter="recordBtn"  >
                            <option value="">==请选择==</option>
                            <option value="" v-for="(item,index) in roomArr" v-bind:value="item.code" :key="index">
                                {{item.name}}
                            </option>
                        </select>
                    </li> -->
                    <!-- <li>
                        <label for="" style="width:70px">挂号医生：</label>
                        <select v-on:change="selectDoc" v-model="docId" @keyup.enter="recordBtn"  >
                            <option value="">==请选择==</option>
                            <option value="" v-for="(item,index) in docArr" :value="item.STAFF_INDEX_NO" :key="index">
                                {{item.STAFF_NAME}}
                            </option>
                        </select>
                    </li> -->
                    <li>
                        <label for="" style="width:70px">挂号员：</label>
                        <!-- <select v-model="option" v-on:change="selectOption">
                            <option value="">==请选择==</option>
                            <option value="" v-for="(item,index) in optionArr" :value="item.OPERATOR_CODE" :key="index">
                                {{item.STAFF_NAME}}
                            </option>
                        </select> -->
                        <!-- <el-autocomplete
                        class="inline-input"
                        v-model="option"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect" style="width:60%"
                        ></el-autocomplete> -->
                        <el-select v-model="option" clearable selected="true" style="width:60%" filterable placeholder="请选择" :filterMethod="opFilter">
                            <el-option v-for="item in optionArr"  :key="item.STAFF_NAME"  :label="item.STAFF_NAME" :value="item.OPERATOR_CODE">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <label for="" style="width:70px">开始日期：</label>
                        <!-- <el-date-picker type="date" value-format="yyyy-MM-dd"  v-on:change="selectStartTime" v-model="startTime" style="width:60%;" placeholder="选择日期">
                        </el-date-picker> -->
                        <el-date-picker @keyup.enter="recordBtn"  :picker-options="pickerOptions0"  v-on:change="selectStartTime" value-format="yyyy-MM-dd HH:mm:ss" v-model="startTime" style="width:60%;" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </li>
                    <li>
                        <label for="" style="width:70px">结束日期：</label>
                        <!-- <el-date-picker type="date" value-format="yyyy-MM-dd"  v-on:change="selectEndTime" v-model="endTime" style="width:60%;" placeholder="选择日期">
                        </el-date-picker> -->
                        <!-- <el-date-picker v-on:change="selectEndTime" value-format="yyyy-MM-DD HH:mm:ss" v-model="endTime" style="width:60%;" type="datetime" placeholder="选择日期时间">
                        </el-date-picker> -->
                        <el-date-picker @keyup.enter="recordBtn"  :picker-options="pickerOptions1" v-on:change="selectEndTime" value-format="yyyy-MM-dd HH:mm:ss" v-model="endTime" type="datetime" style="width:60%;" placeholder="选择日期时间">
                        </el-date-picker>
                    </li>
                </ul>
            </div>
            <div class="userList">
                <el-table height="550" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%">
                    <el-table-column prop="PAT_NAME" label="姓名" width="150">
                    </el-table-column>
                    <!-- <el-table-column prop="PHYSI_SEX_NAME" label="性别" width="80">
                    </el-table-column> -->
                    <el-table-column prop="REGIST_FEE" :formatter="priceFormat" label="价格（元）" width="100">
                    </el-table-column>
                    <el-table-column prop="VISIT_CARD_NO"  label="就诊卡号" width="120">
                    </el-table-column>
                    <el-table-column prop="REGIST_DEPT_NAME" label="科室" width="180">
                    </el-table-column>
                    <el-table-column prop="REGIST_DR_NAME" label="医生" width="120">
                    </el-table-column>
                    <el-table-column prop="OUTHOSP_INDEX_NO" label="订单号" width="100">
                    </el-table-column>
                    <el-table-column prop="REGIST_DATE" label="挂号时间" :formatter="dateFormat"  width="120">
                    </el-table-column>
                    <el-table-column prop="RECORD_STATE" label="挂号状态" width="100" >
                    </el-table-column>
                    <el-table-column prop="EXECUTE_STATE" label="执行状态" width="100" >
                    </el-table-column>
                    <!-- <el-table-column prop="VISIT_STATE" label="状态" width="120">
                    </el-table-column> -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="warning"  :disabled="scope.row.EXECUTE_STATE != '等待接诊' || scope.row.RECORD_STATE != '等待中'" size="small">退号</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
                <span>你确定要退号吗？</span>
                <span slot="footer"  class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="warning" @click="confirmBtn">确 定</el-button>
                </span>
            </el-dialog>

        </div>
        <div class="record_footer">
            <!-- <div class="block" > -->
                <el-pagination  style="margin:0 auto;line-height:33px;height:33px;width:35%;position:absolute;left:50%;top:50%;transform: translate(-50%,-50%)" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" 
                :page-sizes="[10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" 
                :total='Number(listNum)'>
                </el-pagination>
            <!-- </div> -->
             <el-button type="warning" @click="back">返回上一页</el-button>
        </div>

        <el-dialog title="提示" :visible.sync="errPop" width="30%" >
            <span>{{errMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="errPop = false">关闭</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
import baseUrl from "../base/baseUrl.js";
import axios from "axios";
export default {
  data() {
    return {
      msg: "全院挂号查询",
      inputMsg: "",
      currentPage3: 1,
      listNum: "",
      tableData: [],
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      dialogVisible: false,
      opNo: "",
      opName: "",
      register_no: "",

      value6: "",
      fullscreenLoading: false,
      orderTips: "",

      errMsg: "",
      errPop: false,
      errTips: "",
      moreShow: false,

      statusArr: [
        { name: "挂号", num: "1" },
        { name: "退号", num: "2" },
        { name: "挂号及退号", num: "3" }
      ],
      statusArr_new: [
        { name: "挂号", num: "1" },
        { name: "退号", num: "2" },
        { name: "挂号及退号", num: "3" }
      ],
      roomArr: [],
      docArr: [],
      hospitalArr: [],
      optionArr: [], //挂号员
      optionArr_new: [],
      icCard: "",
      status: "1",
      name: "",
      phone: "",
      idCard: "",

      hospitalId: "", //医院ID
      roomId: "", //科室ID
      docId: "",
      startTime: "",
      endTime: "",

      option: "", //挂号员

      pickerOptions0: {
        disabledDate: time => {
          if (this.endTime != "") {
            return time.getTime() > Date.now() || time.getTime() > this.endTime;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < this.startTime || time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    // 清空
    del() {
      this.icCard = "";
      this.name = "";
      this.phone = "";
      this.idCard = "";
      this.status = "1";
      this.hospitalId = "";
      this.roomId = "";
      this.docId = "";
      this.startTime = "";
      this.endTime = "";
    },

    recordBtn() {
      // if(this.icCard == ''){
      //     return
      // }else{
      this.fullscreenLoading = true;
      //      "name": this.name,
      //     "card_number": this.icCard,
      //     "phone": this.phone,
      //     "id_number": this.idCard,register_list
      // axios.get(baseUrl + "api/mq/register_record?keyword=" + this.inputMsg + "&start_date=" + this.value6 + "&end_date=" + this.value6)
      console.log(this.option,"请求前操作员")
      if (this.status == "3") {
        axios
          .post(
            baseUrl + "api/mq/register_list",
            JSON.stringify({
              keyword: this.icCard,
              status: "",
              dept_code: this.roomId,
              doc_code: this.docId,
              op_code: this.option,
              start_time: this.startTime,
              end_time: this.endTime
            })
          )
          .then(res => {
            console.log(res);
            this.fullscreenLoading = false;
            if (res.data.status == 200302) {
              this.tableData = res.data.msg;
              if (res.data.msg.length == 0) {
                this.$message({
                  message: "未找到任何记录!",
                  type: "warning"
                });
              }
              this.listNum = this.tableData.length;
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].RECORD_STATE == 1) {
                  this.tableData[i].RECORD_STATE = "等待中"; //改变列表渲染的
                  if (this.tableData[i].EXECUTE_STATE != 0) {
                    this.tableData[i].RECORD_STATE = "已接诊";
                  }
                } else if (this.tableData[i].RECORD_STATE == 2) {
                  this.tableData[i].RECORD_STATE = "已退号";
                } else if (this.tableData[i].RECORD_STATE == 3) {
                  this.tableData[i].RECORD_STATE = "被退号";
                } else {
                  this.tableData[i].RECORD_STATE = "其他";
                }
              }
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].EXECUTE_STATE == 0) {
                  this.tableData[i].EXECUTE_STATE = "等待接诊"; //改变列表渲染的
                } else if (this.tableData[i].EXECUTE_STATE == 1) {
                  this.tableData[i].EXECUTE_STATE = "完成就诊";
                } else if (this.tableData[i].EXECUTE_STATE == 2) {
                  this.tableData[i].EXECUTE_STATE = "正在就诊";
                } else {
                  this.tableData[i].EXECUTE_STATE = "不就诊";
                }
              }
            } else {
            }
          })
          .catch(error => {
            this.fullscreenLoading = false;
            console.log(error);
            this.errMsg = error;
            this.errPop = true;
          });
      } else {
        console.log(this.option,"请求时操作员")
        axios
          .post(
            baseUrl + "api/mq/register_list",
            JSON.stringify({
              keyword: this.icCard,
              status: this.status,
              dept_code: this.roomId,
              doc_code: this.docId,
              op_code: this.option,
              start_time: this.startTime,
              end_time: this.endTime
            })
          )
          .then(res => {
            console.log(res);
            this.fullscreenLoading = false;
            if (res.data.status == 200302) {
              this.tableData = res.data.msg;
              if (res.data.msg.length == 0) {
                this.$message({
                  message: "未找到任何记录!",
                  type: "warning"
                });
              }
              this.listNum = this.tableData.length;
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].RECORD_STATE == 1) {
                  this.tableData[i].RECORD_STATE = "等待中"; //改变列表渲染的
                } else if (this.tableData[i].RECORD_STATE == 2) {
                  this.tableData[i].RECORD_STATE = "已退号";
                } else if (this.tableData[i].RECORD_STATE == 3) {
                  this.tableData[i].RECORD_STATE = "被退号";
                } else {
                  this.tableData[i].RECORD_STATE = "其他";
                }
              }
              for (var i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].EXECUTE_STATE == 0) {
                  this.tableData[i].EXECUTE_STATE = "等待接诊"; //改变列表渲染的
                } else if (this.tableData[i].EXECUTE_STATE == 1) {
                  this.tableData[i].EXECUTE_STATE = "完成就诊";
                } else if (this.tableData[i].EXECUTE_STATE == 2) {
                  this.tableData[i].EXECUTE_STATE = "正在就诊";
                } else {
                  this.tableData[i].EXECUTE_STATE = "取消就诊";
                }
              }
            } else {
            }
          })
          .catch(error => {
            this.fullscreenLoading = false;
            console.log(error);
            this.errMsg = error;
            this.errPop = true;
          });
      }

      // }
    },
    // 更多筛选弹窗
    recordMoreBtn() {
      this.moreShow = true;
    },

    selectOption() {
      console.log(this.option);
    },

    selectStatus() {
      console.log(this.status);
    },

    selectHospital() {
      console.log(this.hospitalId);
      axios
        .get(baseUrl + "api/mq/register_type_new?hospital=" + this.hospitalId)
        .then(res => {
          console.log(res);
          if (res.data.status == 200302) {
            this.roomArr = res.data.msg.depts;
            // console.log(this.roomItemsArr)
          } else {
            this.orderTips = "获取列表失败" + res.data.status;
            this.fails();
          }
        })
        .catch(error => {
          console.log(error);
          this.orderTips = "服务器出错" + error;
          this.fails();
        });
    },
    selectRoom() {
      console.log(this.roomId);
      axios
        .get(baseUrl + "api/mq/depart_doctor?depart_code=" + this.roomId)
        .then(res => {
          console.log(res);
          if (res.data.status == 200302) {
            this.docArr = res.data.msg;
          } else {
            this.orderTips = "获取列表失败" + res.data.status;
            this.fails();
          }
        })
        .catch(err => {
          console.log(err);
          this.orderTips = "服务器出错" + err;
          this.fails();
        });
    },

    selectDoc() {
      console.log(this.docId);
    },

    selectStartTime() {
      console.log(this.startTime);
    },
    selectEndTime() {
      console.log(this.endTime);
    },

    fails() {
      this.$message.error(this.orderTips);
    },

    dateFormat: function(row, column) {
      var newDate = row.REGIST_DATE.slice(0, 10);
      return newDate;
    },
    priceFormat: function(row, column) {
      var price = new Number(row.REGIST_FEE).toString();
      // console.log(price)
      return price;
    },

    created: function() {
      //向后台获取数据
      var that = this;
      that.listNum = that.tableData.length;
      console.log(that.listNum);
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },

    handleClick(row) {
      console.log(row);
      this.dialogVisible = true;
      this.register_no = row.REGIST_NO;
    },
    cancelSuccess() {
      this.$message({
        message: "取消成功",
        type: "success"
      });
    },
    falis() {
      this.$message.error(this.errTips);
    },
    confirmBtn() {
      axios
        .post(
          baseUrl + "api/mq/register_cancel",
          JSON.stringify({
            register_no: this.register_no,
            op_no: this.opNo,
            op_name: this.opName
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200303) {
            this.dialogVisible = false;
            this.cancelSuccess();
            this.recordBtn();
          } else {
            this.errTips = "操作失败";
            this.falis();
          }
        })
        .catch(error => {
          console.log(error);
          this.errMsg = error;
          this.errPop = true;
        });
    },

    selectDate() {
      console.log(this.value6);
    },

    getHospital() {
      axios
        .get(baseUrl + "api/his/hospital_list")
        .then(res => {
          console.log(res);
          this.hospitalArr = res.data.msg;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 获取挂号员列表
    getOption() {
      axios
        .get(baseUrl + "api/mq/depart_doctor?depart_code")
        .then(res => {
          console.log(res);
          if (res.data.status == 200302) {
            this.optionArr = res.data.msg;
            this.optionArr_new = res.data.msg;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    opFilter(val) {
      if (val) {
        var tempArr = [];
        this.optionArr_new.forEach(function(opt, index) {
          if (
            opt["PINYIN_CODE"].toUpperCase().indexOf(val.toUpperCase()) == 0 ||
            opt["STAFF_NAME"].indexOf(val) == 0
          ) {
            tempArr.push(opt);
          }
        });
        this.optionArr = tempArr;
      } else {
        this.optionArr = this.optionArr_new;
      }
    },
    statusFilter(val) {
      if (val) {
        var tempArr = [];
        this.statusArr_new.forEach(function(opt, index) {
          if (
            opt["num"].toUpperCase().indexOf(val.toUpperCase()) == 0 ||
            opt["name"].indexOf(val) == 0
          ) {
            tempArr.push(opt);
          }
        });
        this.statusArr = tempArr;
      } else {
        this.statusArr = this.statusArr_new;
      }
    },

    enter(e) {
      e.target.click();
    }
  },
  created() {
    this.inputMsg = this.$route.query.treatCard;
  },
  mounted() {
    this.getOption();
    console.log(this.$route.query);

    var date = new Date();
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    this.startTime = year + "-" + month + "-" + day + " " + "00:00:00";
    this.endTime = year + "-" + month + "-" + day + " " + "23:59:59";
    // console.log(this.startTime);
    

    // 获取医院列表
    this.getHospital();

    this.listNum = this.tableData.length;

    var ws = new WebSocket("ws://127.0.0.1:8804");
    ws.onopen = function() {
      console.log("连接websocket成功");
    };
    ws.onmessage = evt => {
      var data = JSON.parse(evt.data);
      console.log(data);
      this.icCard = data.msg.medical_card_number;
      this.recordBtn();
    };
    ws.onclose = function(evt) {
      console.log("Connection closed.");
    };
    // ifream
    // 获取ifream内容
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
    this.option = UrlSearch(url, "opNo");
    if (this.$route.query.icCard != "undefined") {
      this.icCard = this.$route.query.icCard;
      this.recordBtn();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./record.scss";
// text-align: center !important;
</style>
<style>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #ddd;
}
.el-autocomplete-suggestion li.highlighted,
.el-autocomplete-suggestion li:hover {
  background-color: #ddd;
}
.el-table td,
.el-table th {
  padding: 5px 0 !important;
}
</style>
