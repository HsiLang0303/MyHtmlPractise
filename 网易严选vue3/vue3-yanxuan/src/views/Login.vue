<template>
    <div class="login">
        <div class="container">
            <div class="input">
                <span>
                    <i>名称：</i>
                    <input type="text" placeholder="请输入名称" v-model="fromDate.name">
                </span>
                <span>
                    <i>账号：</i>
                    <input type="text" placeholder="请输入账号" v-model="fromDate.username">
                </span>
                <span>
                    <i>密码：</i>
                    <input type="password" placeholder="请输入密码" v-model="fromDate.password">
                </span>
            </div>
            <div class="error-message" v-if="errorMessage">
                {{ errorMessage }}
            </div>
            <div class="button">
                <button @click="handleLogin">登录</button>
                <button @click="handleRegister">注册</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const errorMessage = ref('');

const fromDate = ref({
    name: '',
    username: '',
    password: ''
});



function handleLogin(){
    if(!fromDate.value.username){
        errorMessage.value = '请输入账号';
        return;
    }else if(!fromDate.value.password){
        errorMessage.value = '请输入密码';
    }
    const userinfo = store.state.user.userinfo;
    if(fromDate.value.username === userinfo.username && fromDate.value.password === userinfo.password){
        router.push('/')
    }else{
        errorMessage.value='账号或密码错误'
    }
}

const handleRegister = ()=>{
    if(!fromDate.value.name || !fromDate.value.password || !fromDate.value.username ){
        errorMessage.value='请输入名称，账号，密码';
        return
    }
    store.commit('user/updateUserInfo',{
        name:fromDate.value.name,
        username: fromDate.value.username,
        password:fromDate.value.password
    });
    errorMessage.value='注册成功'
}


</script>

<style lang="less">
// 登录框样式
.login {
    height: 100vh;
    background-color: #adcfcc;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
        width: 500px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        display: flex; // 添加flex布局
        flex-direction: column; // 纵向排列
        align-items: center; // 水平居中
        padding-top: 50px; // 顶部留白

        .input {
            width: 100%;
            text-align: center; // 文本居中

            span {
                display: block; // 改为块级元素
                margin: 20px 0; // 增加上下间距

                i {
                    display: inline-block;
                    width: 60px;
                    text-align: right;
                    margin-right: 10px;
                }

                input {
                    width: 200px;
                    height: 30px;
                    padding: 0 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            }
        }
        .button {
            width: 100%;
            text-align: center; // 文本居中
            button {
            width: 100px;
            height: 30px;
            margin: 40px 10px 0;
            border: none;
            border-radius: 4px;
            background-color: #9fe1bd;
            cursor: pointer;
            &:hover {
                background-color: #61665f;
            }
        }
    }
        }
        .error-message {
            color: red;
            text-align: center;
            margin-top: 10px;
        }
    }
</style>
