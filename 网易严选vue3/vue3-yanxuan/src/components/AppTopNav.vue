<template>
  <div class="app-top-nav">
    <div class="w">
        <ul>
            <template v-if="userinfo.token">
                <li>
                    <router-link to="/user">
                        {{ userinfo.name }}
                    </router-link>
                </li>
                <li>
                    <router-link to="/login">退出登录</router-link>
                </li>
            </template>
            <li v-else>
                <a href="#">登录/注册</a>
            </li>
            <li><a href="#">我的订单</a></li>
            <li><a href="#">会员</a></li>
            <li><a href="#">甄选家</a></li>
            <li><a href="#">客服服务</a></li>
            <li><a href="#">APP</a><i class="iconfont icon-shouji2"></i></li>
        </ul>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import {computed} from "vue";
const store = useStore();
const userinfo = computed(()=>store.state.user.userinfo);

</script>

<style lang="less">
.app-top-nav{
    background-color: #333;
    ul{
        display: flex;
        height: 40px;
        line-height: 40px;
        justify-content: flex-end;
        li{
            a{
                padding: 0 10px;
                color: #ccc;
                border-left: 1px solid #ccc;
                &:hover{
                    color: #fff;
                }
            }
        }
        li:nth-child(1){
            a{
                border-left: 0;
            }
        }
    }
}
</style>

