<template>
    <div class="index">
        <div class="index_header clear">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
        <div class="index_main clear">
            <ul class="clear">
                <router-link to="newRegister">
                    <li @click="register">
                        <el-button type="warning">初诊登记</el-button>
                    </li>
                </router-link>
                <router-link to="inquire">
                    <li @click="inquire">
                        <el-button type="warning">用户查询</el-button>
                    </li>
                </router-link>
                <router-link to="order">
                    <li>
                        <el-button type="warning">患者挂号</el-button>
                    </li>
                </router-link>
                <router-link to="cloudOrder">
                    <li>
                        <el-button type="warning" style="line-height:40px">云门诊<br />预约</el-button>
                    </li>
                </router-link>
                <!-- <router-link to="inquireOrder"> -->
                    <li @click="inquireOrder">
                        <el-button type="warning" style="line-height:40px">云门诊<br />预约查询</el-button>
                    </li>
                <!-- </router-link> -->
                <router-link to="record">
                    <li>
                        <el-button type="warning" style="line-height:40px">全院<br />挂号查询</el-button>
                    </li>
                </router-link>
                <!-- <router-link to="newRegister">
                    <li>
                        <el-button type="warning" style="line-height:40px">新版登记</el-button>
                    </li>
                </router-link> -->
            </ul>
        </div>
        <!-- <el-dialog title="登记" :visible.sync="centerDialogVisible" width="30%" center>
            <span style="text-align:center">请选择初诊登记类型</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="engender">生殖用户</el-button>
                <el-button type="warning" @click="enEngender">非生殖用户</el-button>
            </span>
        </el-dialog> -->
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg: '初诊登记',
            centerDialogVisible: false
        }
    },
    methods: {
        inquire(){
            if(localStorage.getItem("tableData") != null && localStorage.getItem("inquireInput") != null){
                localStorage.removeItem("tableData");
                localStorage.removeItem("inquireInput");
            };
            this.$router.push({
                path: 'inquire'
            })
        },

        inquireOrder(){
            console.log(localStorage.getItem("inquireOrderInput"))
            localStorage.removeItem("inquireOrderData");
            this.$router.push({
                path: 'inquireOrder'
            })
        },


        //初诊登记选择类型弹窗
        register(){
            // this.centerDialogVisible = true;
        },
        // engender(){
        //     this.$router.push({
        //         path: 'register'
        //     })
        // },
        enEngender(){
            // this.$router.push({
            //     path: 'unEngender'
            // })
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './index.scss'
</style>
