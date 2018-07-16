<template>
    <div class="inquireOrder">
        <div class="inquireOrder_header">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="inquireOrder_main">
            <div class="inquireOrder_top">
                <el-input v-model="inputMsg" placeholder="请输入就诊卡号" style="width:60%" @keyup.enter.native="inquireOrderBtn"></el-input>
                <el-button type="warning" @click="inquireOrderBtn">查询</el-button>
            </div>
            <el-table height="550" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                <el-table-column
                    prop="patientName"
                    label="姓名"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="orderSn"
                    label="订单号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="reservationTime"
                    label="预约时间"
                    width="180"
                    >
                </el-table-column>
                <el-table-column
                    prop="itemName"
                    label="预约门诊"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="doctorName"
                    label="预约医生"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="clinicFlagName"
                    label="预约类型"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="reservationStatus"
                    label="预约状态"
                    width="130" :formatter="dateFormat">
                </el-table-column>
                <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="warning" :disabled="scope.row.reservationStatus == 9" size="small">取消预约</el-button>
                        </template>
                </el-table-column>
            </el-table>

           

        </div>
        <div class="inquireOrder_footer">
             <!-- <div class="block" style="margin-top:3%"> -->
                <el-pagination @size-change="handleSizeChange" style="margin:0 auto;margin-top:3%;width:35%;position:absolute;left:50%;top:0;transform: translate(-50%,0)" @current-change="handleCurrentChange" :current-page="currentPage3" 
                :page-sizes="[10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" 
                :total='Number(listNum)'>
                </el-pagination>
            <!-- </div> -->
             <el-button type="warning" @click="back">返回上一页</el-button>
              <!-- <el-button type="warning" style="float:right;">确认修改</el-button> -->
        </div>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>您确定要取消预约吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="warning" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="提示" :visible.sync="errPop" width="30%" >
            <span>{{errMsg}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="errPop = false">关闭</el-button>
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
            msg: '云门诊预约查询',
            inputMsg: '',
            tableData: [],
            total:0,//默认数据总数
            pagesize:10,//每页的数据条数
            listNum:'',
            dialogVisible: false,
            orderNum: '',
            currentPage3: 1,
            currentPage: 1,//默认开始页面


            errPop: false,
            errMsg: '',

        }
    },
    methods: {
        back(){
            this.$router.push({
                path: '/'
            });
        },
        handleClose(done) {
            
        },
        inquireOrderBtn(){
            console.log(this.inputMsg);
            if(this.inputMsg == ''){
                return 
            }else{
                localStorage.setItem("inquireOrderInput", this.inputMsg)
                axios.post(baseUrl + "api/his/book_queue_list", JSON.stringify({
                    visit_card: this.inputMsg,
                }))
                .then(res=>{
                    console.log(res);
                    if(res.data.status == 200212){
                        this.tableData = res.data.msg;
                        this.listNum = this.tableData.length;
                        localStorage.setItem("inquireOrderData", JSON.stringify(res.data.msg))
                    }else{
                        this.errMsg = "查询错误"+res.data.status;
                        this.errPop = true;
                    }
                })
                .catch(error=>{
                    console.log(error);
                    this.errMsg = error;
                    this.errPop = true;
                })
            }
        },

        //过滤状态
        dateFormat:function(row, column) {  
           var data = '' ;
           if(row.reservationStatus==9){
               data = "已取消"
           }else if(row.reservationStatus == 0){
               data = "已预约"
           }else if(row.reservationStatus == 1){
               data = "未支付"
           }else if(row.reservationStatus == -1){
               data = "预约过期"
           }else {
               data = "未知状态"
           }
           return data   
        }, 

        handleClick(row) {
            this.dialogVisible = true;
            this.orderNum = row.orderSn;
        },
        confirm(){
            axios.get(baseUrl + "api/his/cancel_book_queue?order_sn=" + this.orderNum)
            .then(res=>{
                console.log(res);
                if(res.data.status == 200211){
                    this.dialogVisible = false;
                    this.open2();
                    // this.$router.go(0);
                    this.inquireOrderBtn();
                }else{
                    this.fails();
                }
                
            })
            .catch(error=>{
                this.errMsg = error;
                this.errPop = true;
            })
        },
        open2() {
            this.$message({
                message: '取消预约成功',
                showClose: true,
                type: 'success'
            });
        },
        fails() {
            this.$message.error('错了哦，退号失败');
        },
        created:function(){
            //向后台获取数据
            var that = this;
            that.listNum = that.tableData.length;
        },
        current_change:function(currentPage){
            this.currentPage = currentPage;
        },


        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val
        },
    },
    mounted(){
        var ws = new WebSocket("ws://127.0.0.1:8804");
        ws.onopen = function() { 
            console.log("连接websocket成功");
            this.inputMsg = '';
        };
        ws.onmessage = evt=> {
            var data = JSON.parse(evt.data);
            console.log(data);
            this.inputMsg = data.msg.medical_card_number;
            this.inquireOrderBtn();
        };
        ws.onclose = function(evt) {
            console.log("Connection closed.");
        };

        if(localStorage.getItem("inquireOrderInput") != ""){
            // this.tableData = JSON.parse(localStorage.getItem("inquireOrderData"));
            this.inputMsg = JSON.parse(localStorage.getItem("inquireOrderInput"));
            this.inquireOrderBtn();
        };

        // 
        if(this.$route.query.treatCard != undefined && this.$route.query.treatCard != ''){
            this.inputMsg = this.$route.query.treatCard;
            this.inquireOrderBtn();
        }
    }
    
}
</script>
<style lang="scss" scoped>
    @import './inquireOrder.scss'
</style>
<style>
    .el-table td, .el-table th{
        padding: 5px 0 !important;
    }
</style>

