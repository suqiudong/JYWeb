<template>
    <div class="regSelect">
        <div class="regSelect_header clear">
            <p>
                <span>{{msg}}</span>
            </p>
        </div>
    </div>
</template>
<script>
import baseUrl from '../base/baseUrl.js';
import axios from 'axios';
export default {
    data(){
        return {
            msg: '挂号查询'
        }
    }
}
</script>
<style lang="scss" scoped>
    @import './regSelect.scss'
</style>
