<template>
    <div class="inquire">
        <div class="inquire_header clear">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="inquire_main">
            <!-- <div class="inquire_top">
                <el-input v-model="inputMsg" placeholder="请输入姓名、诊卡号、身份证、电话号码" style="width:60%" @keyup.enter="inquireBtn"></el-input>
                <el-button type="warning" @click="inquireBtn">查询</el-button>
            </div> -->
            
            <div class="userList clear">
                <div class="userList_left clear" style="float:left">
                    <div>
                        <h1>筛选条件</h1>
                        <el-button type="warning" @click="del" style="margin-left:2%">清空</el-button>
                        <el-button type="warning" @click="inquireBtn" style="margin-left:2%" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
                    </div>
                    <ul>
                        <li>
                            <label for="" style="width:70px">基本信息：</label>
                            <input type="text" @keyup.enter="inquireBtn" v-model="usericCard" style="width:60%" placeholder="就诊卡，姓名，身份证，手机">
                        </li>
                        <!-- <li>
                            <label for="" style="width:70px">姓名：</label>
                            <input type="text" @keyup.enter="inquireBtn"  v-model="username" placeholder="姓名">
                        </li> -->
                        <li>
                            <label for="" style="width:70px">性别：</label>
                            <!-- <select v-on:change="selectSex" v-model="usersex">
                                <option value="">==请选择==</option>
                                <option value="" v-for="(item,index) in sexArr" :value="item" :key="index">
                                    {{item.value}}
                                </option>
                            </select> -->
                            <el-select v-model="usersex" @focus="enter" clearable style="width:60%" filterable placeholder="请选择" :filterMethod="sexFilter">
                                <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                    <!-- <span style="float:right">{{item.name}}</span> -->
                                </el-option>
                            </el-select>
                            <!-- <el-autocomplete
                            class="inline-input"
                            v-model="state1"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入内容"
                            @select="handleSelect"
                            ></el-autocomplete> -->
                            <!-- <el-select v-model="selectSex" clearable style="width:60%" filterable placeholder="性别" :filterMethod="sexFilter">
                                <el-option v-for="item in sexArr"  :key="item.value"  :label="item.value" :value="item.value">
                                </el-option>
                            </el-select> -->
                        </li>
                        <!-- <li>
                            <label for="" style="width:70px">身份证：</label>
                            <input type="text" @keyup.enter="inquireBtn"  v-model="useridCard" placeholder="身份证">
                        </li> -->
                        <!-- <li>
                            <label for="" style="width:70px">手机号：</label>
                            <input type="text" @keyup.enter="inquireBtn"  v-model="userphone" placeholder="手机号">
                        </li> -->
                        <li>
                            <label for="" style="width:70px">操作员：</label>
                            <!-- <select v-on:change="selectOption" v-model="option">
                                <option value="">==请选择==</option>
                                <option value="" v-for="(item,index) in optionArr" :value="item.OPERATOR_CODE" :key="index">
                                    {{item.STAFF_NAME}}
                                </option>
                            </select> -->   
                            <el-select v-model="option" @focus="enter" clearable style="width:60%" filterable placeholder="请选择" :filterMethod="opFilter">
                                <el-option v-for="item in optionArr"  :key="item.STAFF_NAME"  :label="item.STAFF_NAME" :value="item.OPERATOR_CODE">
                                    <span>{{item.STAFF_NAME}}</span>
                                    <span style="float:right">{{item.PINYIN_CODE}}</span>
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <label for="" style="width:70px">起始时间：</label>
                            <el-date-picker @keyup.enter="inquireBtn"  :picker-options="pickerOptions0" v-on:change="selectStartTime" value-format="yyyy-MM-dd HH:mm:ss" v-model="startTime" style="width:60%;" type="datetime" placeholder="登记起始时间">
                            </el-date-picker>
                        </li>
                        <li>
                            <label for="" style="width:70px">结束时间：</label>
                            <el-date-picker @keyup.enter="inquireBtn"  :picker-options="pickerOptions1" v-on:change="selectEndTime" value-format="yyyy-MM-dd HH:mm:ss" v-model="endTime" type="datetime" style="width:60%;" placeholder="登记结束时间">
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
                <div class="clear" style="padding-left:18%">
                    <el-table height="550" stripe :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                       
                            
                    <el-table-column prop="PAT_NAME" label="姓名" width="150">
                    </el-table-column>
                    <el-table-column prop="AGE" label="年龄" width="60">
                    </el-table-column>
                    <el-table-column prop="REGIST_DATE"  :formatter="dateFormat" label="创建时间" width="160">
                    </el-table-column>
                    <el-table-column prop="WORK_UNITS" label="预约号" width="120">
                    </el-table-column>
                    <el-table-column prop="CARD_ID_NUMBER" label="就诊卡号" width="120">
                    </el-table-column>
                    <!-- <el-table-column prop="" label="" width="20">
                    </el-table-column> -->
                    <el-table-column prop="PHONE_NO_HOME" label="手机号" width="120">
                    </el-table-column>
                    <el-table-column prop="OPPERATER" label="发卡人" width="120">
                    </el-table-column>
                    <el-table-column prop="BANK" label="接待客服" width="120">
                    </el-table-column>
                    <!-- <el-table-column prop="FVD_NAME" label="初诊医生" width="120">
                    </el-table-column> -->
                    <el-table-column prop="health_card_number" label="健康卡号" width="150" v-if="show=false" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-dropdown size="medium" split-button type="warning">
                                <span style="width:100%;height:100%;" @click="handleEdit(scope.$index, scope.row)">操作</span>
                                           
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item >
                                        <el-button size="small" style="border: 0 none;width:100%" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                    </el-dropdown-item>
                                    <el-dropdown-item >
                                        <el-button size="small" style="border: 0 none;width:100%" @click="order(scope.$index, scope.row)">挂号</el-button>
                                    </el-dropdown-item>
                                    <!-- <el-dropdown-item >
                                        <el-button size="small" style="border: 0 none" @click="backNum(scope.$index, scope.row)">退号</el-button>
                                    </el-dropdown-item> -->
                                    <!-- <el-dropdown-item >
                                        <el-button size="small" style="border: 0 none;width:100%" @click="add(scope.$index, scope.row)" :disabled="scope.row.health_card_number !=undefined">电子卡</el-button>
                                    </el-dropdown-item> -->
                                    <el-dropdown-item >
                                        <el-button size="small" style="border: 0 none;width:100%" @click="codeShow(scope.$index, scope.row)">二维码</el-button>
                                    </el-dropdown-item>
                                     <el-dropdown-item >
                                        <el-button size="small" style="border: 0 none;width:100%" @click="addBind(scope.$index, scope.row)">补录配偶</el-button>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                     
                    
                </el-table>
                </div>
                
            </div>
            
        </div>
        <div class="inquire_footer">
            <!-- <div class="block"> -->
                <el-pagination style="margin:0 auto;width:35%;position:absolute;left:50%;top:50%;transform: translate(-50%,-50%)" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" 
                :page-sizes="[10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" 
                :total='Number(listNum)'>
                </el-pagination>
            <!-- </div> -->
            <el-button type="warning" @click="back">返回上一页</el-button>
        </div>


        <!-- 二维码弹窗 -->

        <el-dialog title="二维码" :visible.sync="centerDialogVisible" width="30%" center>
            <div class="code clear" style="text-align:center">
                <h2 class="clear" style="display:inline-block">
                    <img :src="codeImg_long" alt="" class="codeimg" style="width:150px;height150px" >
                    <p>就诊卡二维码</p>
                </h2>
                <h2 class="clear" style="display:inline-block" v-show="codeImg_temp_show">
                    <img :src="codeImg_temp" alt="" class="codeimg" style="width:150px;height:150px;">
                    <p>临时二维码</p>
                </h2>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="centerDialogVisible = false">关 闭</el-button>
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
import baseUrl from "../base/baseUrl.js";
import axios from "axios";
export default {
  data() {
    return {
      msg: "用户查询",
      inputMsg: "",
      currentPage3: 1,
      listNum: "",
      tableData: [],
      optionArr: [], //操作员
      optionArr_new: [],
      option: "",
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      centerDialogVisible: false, //二维码弹窗控制
      codeImg_long: "",
      codeImg_temp: "",
      codeImg_temp_show: true,
      addShow: false,
      name: "",
      sex: "",
      health_card: "",
      // sexArr: ["男","女"],
      sexArr: [{ name: "N", value: "男" }, { name: "N", value: "女" }], //性别下拉
      sexArr_new: [{ name: "N", value: "男" }, { name: "N", value: "女" }],
      // ARR: [{OPERATOR_CODE: "Q",value: "12a3"},{OPERATOR_CODE: "W",value: "456"}],

      fullscreenLoading: false,

      usericCard: "",
      username: "",
      usersex: "",
      useridCard: "",
      userphone: "",

      startTime: "",
      endTime: "",

      errTips: "",

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

    // 清空按钮
    del() {
      console.log(this.username);
      this.usericCard = "";
      this.username = "";
      this.usersex = "";
      this.useridCard = "";
      this.userphone = "";
      this.startTime = "";
      this.endTime = "";
      this.option = "";
    },

    // 操作员
    selectOption() {
      console.log(this.option);
    },

    // 查询按钮
    inquireBtn() {
      // "name": this.username,
      // "phone": this.userphone,
      // "id_number": this.useridCard,
      this.fullscreenLoading = true;
      axios
        .post(
          baseUrl + "api/mq/find_patient",
          JSON.stringify({
            keyword: this.usericCard,
            sex: this.usersex,
            start_time: this.startTime,
            end_time: this.endTime,
            op_code: this.option
          })
        )
        .then(res => {
          console.log(res);
          this.fullscreenLoading = false;
          if (res.data.status == 200301) {
            this.tableData = res.data.msg;
            this.listNum = this.tableData.length;
            localStorage.setItem("tableData", JSON.stringify(res.data.msg));
          } else {
            this.orderTips = "获取列表失败" + res.data.status;
            this.fails();
          }
        })
        .catch(error => {
          this.fullscreenLoading = false;
          this.orderTips = "服务器出错" + error;
          this.fails();
        });
    },

    selectSex() {
      console.log(this.usersex);
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

    enter(e) {
      // if (e.relatedTarget) {
      //     e.target.click();
      // }
      // console.log(e.relatedTarget);
      // console.log(!e.target.getAttribute('readonly'))
      // e.relatedTarget = "select";
      // console.log("===");
    },

    created: function() {
      //向后台获取数据
      var that = this;
      that.listNum = that.tableData.length;
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

    // 修改
    handleEdit($event, row) {
      console.log(row);
      var data = JSON.stringify(row);
      this.$router.push({
        path: "modifier",
        query: {
          data: data
        }
      });
    },

    // 预约挂号事件
    order(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "order",
        query: {
          treatCard: row.CARD_ID_NUMBER,
          name: row.PAT_NAME,
          idCard: row.ID_NUMBER,
          phone: row.PHONE_NO,
          service: row.BANK,
          orderNumber: row.WORK_UNITS,
          optioner: row.OPPERATER,
          sex: row.PHYSI_SEX_NAME
        }
      });
    },

    // 退号
    backNum(index, row) {
      this.$router.push({
        path: "inquireOrder"
      });
    },

    // 补录
    add(index, row) {
      axios
        .post(
          baseUrl + "api/accounts/user/health_card/rebuild",
          JSON.stringify({
            medical_card_number: row.CARD_ID_NUMBER,
            name: row.PAT_NAME,
            id_number: row.ID_NUMBER,
            phone: row.PHONE_NO
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.status == 200025) {
            this.addShow = true;
            this.name = res.data.msg.name;
            this.sex = res.data.msg.sex;
            this.health_card = res.data.msg.health_card_number;
            this.inquireBtn();
          } else if (res.data.status == 400046) {
            this.open6();
          }
        })
        .catch(error => {});
    },

    // 互创补录
    addBind(index, row) {
      console.log(row);
      if (row.PHYSI_SEX_NAME == "" && row.ID_NUMBER == "") {
        this.orderTips = "当前用户信息（性别或身份证）不完善，请先完善用户信息";
        this.fails();
      }else {
        localStorage.setItem("addBind", JSON.stringify(row));
        var data = JSON.stringify(row);
        this.$router.push({
          path: "bind",
          query: {
            data: data
          }
        });
      }
    },

    open6() {
      this.$notify.error({
        title: "错误",
        message: "当前手机号或身份证已有健康卡号"
      });
    },
    // 二维码事件
    codeShow(index, row) {
      console.log(index, row);
      this.centerDialogVisible = true;
      console.log(row.health_card_number);
      if (row.health_card_number != undefined) {
        axios
          .post(
            baseUrl + "api/accounts/tem_qrcode",
            JSON.stringify({
              name: row.PAT_NAME,
              id_number: row.ID_NUMBER,
              phone: row.PHONE_NO
            })
          )
          .then(res => {
            console.log(res);
            this.codeImg_long = res.data.msg.medical_image_url;
            this.codeImg_temp = res.data.msg.image_url;
            this.codeImg_temp_show = true;
          })
          .catch(error => {});
      } else if (row.health_card_number == undefined) {
        axios
          .post(
            baseUrl + "api/accounts/medical_qrcode",
            JSON.stringify({
              code: row.CARD_ID_NUMBER
            })
          )
          .then(res => {
            console.log(res);
            this.codeImg_long = res.data.msg.medical_image_url;
            this.codeImg_temp_show = false;
          })
          .catch(error => {});
      }
    },

    // 获取操作员列表
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

    // 操作员简码
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

    sexFilter(val) {
      if (val) {
        var tempArr = [];
        this.sexArr_new.forEach(function(opt, index) {
          if (
            opt["name"].toUpperCase().indexOf(val.toUpperCase()) == 0 ||
            opt["value"].indexOf(val) == 0
          ) {
            tempArr.push(opt);
          }
        });
        this.sexArr = tempArr;
      } else {
        this.sexArr = this.sexArr_new;
      }
    },

    dateFormat: function(row, column) {
      var data = "";
      data = row.REGIST_DATE.replace("T", " ");
      return data;
    }
  },
  mounted() {
    this.getOption();
    if (localStorage.getItem("tableData") != null) {
      this.tableData = JSON.parse(localStorage.getItem("tableData"));
      this.listNum = this.tableData.length;
    }

    // 时间选择默认时间
    var date = new Date();
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    var day = date.getDate();
    this.startTime = year + "-" + month + "-" + day + " " + "00:00:00";
    this.endTime = year + "-" + month + "-" + day + " " + "23:59:59";

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
    this.option = UrlSearch(url, "opNo");

    this.listNum = this.tableData.length;
    var ws = new WebSocket("ws://127.0.0.1:8804");
    ws.onopen = function() {
      console.log("连接websocket成功");
      this.inputMsg = "";
    };
    ws.onmessage = evt => {
      var data = JSON.parse(evt.data);
      console.log(data);
      this.usericCard = data.msg.medical_card_number;
      this.inquireBtn();
    };
    ws.onclose = function(evt) {
      console.log("Connection closed.");
    };
    if (this.$route.query.icCard != undefined) {
      this.startTime = "";
      this.endTime = "";
      this.usericCard = this.$route.query.icCard;
      this.inquireBtn();
    }
    this.inquireBtn();
  }
};
</script>
<style lang="scss" scoped>
@import "./inquire.scss";
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
.el-table th {
  padding: 5px 0 !important;
}
.el-table td,
.el-table th {
  padding: 5px 0 !important;
}
</style>
