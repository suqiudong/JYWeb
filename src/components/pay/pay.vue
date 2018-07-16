<template>
    <div class="pay">
        <div class="pay_header">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="pay_main">
            <div class="pay_top">
                <el-input v-model="inputMsg" placeholder="请输入姓名、就诊卡号、身份证" style="width:60%" @keyup.enter.native="payBtn"></el-input>
                <el-button type="warning" @click="payBtn">查询</el-button>
                <el-checkbox v-model="checked" style="margin-left:3%;">只查询异常</el-checkbox>
            </div>
            <div class="payList">
                <el-table height="390" :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="medical_card_number" label="就诊卡号" width="150">
                    </el-table-column>
                    <el-table-column prop="seq_id" label="交易流水号" width="150">
                    </el-table-column>
                    <el-table-column prop="total_amount" label="交易费用" width="120">
                    </el-table-column>
                    <el-table-column prop="pay_time" label="支付时间" width="180">
                    </el-table-column>
                    <el-table-column prop="pay_type" label="支付方式" :formatter="dateFormat" width="150">
                    </el-table-column>
                    <el-table-column prop="pay_status" label="支付状态" :formatter="dateFormatStatus" width="150">
                    </el-table-column>
                    <el-table-column prop="sync_status" label="同步状态" width="150">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="warning" :disabled="scope.row.pay_status != 'TRADE_SUCCESS' || scope.row.sync_status != 'no'" size="small">同步</el-button>
                        </template>
                </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="pay_footer">
            <div class="block" style="margin-top:3%">
                <el-pagination @size-change="handleSizeChange" style="margin:0 auto;margin-top:3%;width:35%;margin-bottom:1.5%;" @current-change="handleCurrentChange" :current-page="currentPage3" 
                :page-sizes="[5, 10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" 
                :total='total'>
                </el-pagination>
            </div>
             <el-button type="warning" @click="back">返回上一页</el-button>
        </div>
    </div>
</template>
<script>
import baseUrl from '../base/baseUrl.js';
import axios from 'axios';
export default {
    data(){
        return{
            msg: '微信公众号充值记录查询',
            inputMsg: '',
            checked: '',
            tableData: [],
            currentPage3: 1,
            currentPage: 1,//默认开始页面
            total:0,//默认数据总数
            pagesize:5,//每页的数据条数
            listNum:'',
            page: 1
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        payBtn(){
            if(this.inputMsg == ''){
                return
            }else if(this.checked == false){
                axios.get(baseUrl + 'api/pay/my_record?keyword=' + this.inputMsg + '&page=' + this.page + '&page_size=' + this.pagesize)
                .then(res=>{
                    console.log(res);
                    if(res.data.msg.length == 0){
                        this.open3()
                    }else {
                        this.tableData = res.data.msg;
                        this.total = res.data.total;
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }else if(this.checked == true){
                axios.get(baseUrl + 'api/pay/my_record?keyword=' + this.inputMsg + '&is_execpt=false')
                .then(res=>{
                    console.log(res);
                    if(res.data.msg.length == 0){
                        this.open3()
                    }else {
                        this.tableData = res.data.msg;  
                    }
                }).catch(error=>{
                    console.log(error);
                })
            }
            
        },
        //过滤状态
        dateFormat:function(row, column) {  
           var data = '' ;
           if(row.pay_type=="WXPay"){
               data = "微信"
           };
           return data   
        }, 
        dateFormatStatus:function(row, column) {  
           var status = '' ;
           if(row.pay_status=="TRADE_SUCCESS"){
               status = "已支付"
           }else if(row.pay_status=="NEW_ORDER"){
               status = "未支付"
           }
           return status   
        }, 
        open3() {
            this.$message({
                message: '未找到任何记录~~~',
                type: 'warning'
            });
        },
        open2() {
            this.$message({
            message: '同步成功！！！',
            type: 'success'
            });
        },
        open4() {
            this.$message.error('错了哦，同步失败');
        },
        // 分页
        created:function(data){
            //向后台获取数据
            this.payBtn(data);
            console.log(data)

        },
        current_change:function(currentPage){
            this.currentPage = currentPage;
        },


        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.page = val;    
            this.payBtn();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.pagesize = val;
            this.payBtn();
        },

        handleClick(row){
            console.log(row);
            axios.get(baseUrl + 'api/pay/sync_pay?id=' + row.id + '&mer_order_id='+ row.mer_order_id)
            .then(res=>{
                console.log(res);
                if(res.data.status == 200021){
                    this.open2();
                    this.payBtn();
                }else if(res.data.status == 400053){
                    this.open4();
                }
            }).catch(error=>{
                console.log(error);
                this.open4();
            })
        },

        socket(){
            var ws = new WebSocket("ws://127.0.0.1:8804");
            ws.onopen = function() { 
                console.log("连接websocket成功");
            };
            ws.onmessage = evt=> {
                var data = JSON.parse(evt.data);
                console.log(data);
                this.inputMsg = data.msg.medical_card_number;
                this.payBtn();
            };
            ws.onclose = function(evt) {
                console.log("Connection closed.");
            };
             // 组件销毁时调用，中断websocket链接
            this.over = () => {
                ws.close()
            }
        }
    },
    mounted(){  
        this.socket();
    },
    beforeDestroy () {
        this.over()
    }
}
</script>
<style lang="scss" scoped>
    @import './pay.scss'
</style>
