<template>
  <router-link to="/" class="login-nav">
    返回
  </router-link>
  <div class="login-contant">
    <div class="login-box">
      <div class="from" :style="{ opacity: isShow ? '0' : '1' }">
        <h2>登录账号</h2>
        <input type="text" placeholder="用户名/邮箱/手机号" v-model="logonFromDate.accountName">
        <input type="password" placeholder="密码" v-model="logonFromDate.credential">
        <el-select v-model="logonFromDate.selectedLoginType" placeholder="请选择" style="margin-top: 5px;width: 100%;">
          <el-option v-for="item in loginTypeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span style="margin-top: 10px; color: red;">{{ prompt }}</span>
        <a href="#" @click.prevent="showForgetPassword">忘记密码？</a>
        <button @click="signin">SIGN IN</button>

        <!-- 忘记密码模态框 -->
        <div v-if="isShowForgetPassword" class="forget-password-modal" @click.self="closeForgetPassword">
          <div class="forget-password-content">
            <h2>重置密码</h2>
            <input type="text" placeholder="邮箱/手机号" v-model="forgetPasswordForm.accountName">
            <div class="verification-code">
              <input type="text" placeholder="验证码" v-model="forgetPasswordForm.verificationCode">
              <button class="get-code-btn" @click="getForgetPasswordCode">获取验证码</button>
            </div>
            <input type="password" placeholder="新密码" v-model="forgetPasswordForm.password">
            <input type="password" placeholder="确认密码" v-model="forgetPasswordForm.confirmPassword">
            <span style="margin-top: 10px; color: red;">{{ forgetPasswordPrompt }}</span>
            <button @click="submitForgetPassword">修改密码</button>
          </div>
        </div>
      </div>
      <div class="from" :style="{ opacity: isShow ? '1' : '0' }">
        <h2>注册账号</h2>
        <input type="text" placeholder="用户名称" v-model="registerFromDate.username">
        <input type="password" placeholder="密码" v-model="registerFromDate.password">
        <input type="password" placeholder="确认密码" v-model="registerFromDate.confirmPassword">
        <input type="text" placeholder="邮箱或手机号码" v-model="registerFromDate.accountName">
        <div class="verification-code">
          <input type="text" placeholder="验证码" v-model="registerFromDate.verificationCode">
          <button class="get-code-btn" @click="Verification">获取验证码</button>
        </div>
        <span style="margin-top: 10px; color: red;">{{ prompt }}</span>
        <button @click="Register">SIGN UP</button>
      </div>


      <div class="conceal" :style="{ left: isShow ? '0px' : '350px' }">
        <div class="conceal-container" v-if="isShow">
          <h2>Welcome Back</h2>
          <span>已经有账号了？</span>
          <span>快去登录看看吧！！</span>
          <button @click="signInSw">SIGN IN</button>
        </div>
        <div class="conceal-container" v-else>
          <h2>Hellow Friend</h2>
          <span>还没有账号？</span>
          <span>赶紧注册一个，开启奇幻之旅！</span>
          <button @click="signUpSW">SIGN UP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user'
import { type UserRegisterRequest, type UserLoginRequest, type ForgetPasswordRequest } from '../api/UserAPIs'
import { register, login, forgetPassword } from '../api/UserAPIs'
import { sendEmailVerificationCode } from '../api/CaptchaAPIs'
const router = useRouter();
const userstore = useUserStore();
// 登录表单
const logonFromDate = ref<UserLoginRequest>({
  accountName: '',
  credential: '',
  loginType: 0, // 默认选择用户名-密码登录
  rememberMe: true,
});
const loginTypeOptions = ref([{
  value: '0',
  label: '用户名-密码'
}, {
  value: '1',
  label: '手机-验证码'
}, {
  value: '2',
  label: '邮箱验证码登录'
}, {
  value: '3',
  label: 'GitHub等 第三方登录'
},],)
// 注册表单
const registerFromDate = ref<UserRegisterRequest>({
  username: '',
  password: '',
  confirmPassword: '',
  accountName: '',
  verificationCode: '',
})
const prompt = ref('');
const forgetPasswordPrompt = ref('');

// 忘记密码表单
const forgetPasswordForm = ref<ForgetPasswordRequest>({
  accountName: '',
  verificationCode: '',
  password: '',
  confirmPassword: ''
});
const isShowForgetPassword = ref(false);

import { ref } from 'vue'
const isShow = ref(false)
// 登录的注册的切换
function signInSw() {
  isShow.value = false
  prompt.value = ''
}
function signUpSW() {
  isShow.value = true
  prompt.value = ''
}

// 忘记密码相关函数
function showForgetPassword() {
  isShowForgetPassword.value = true;
  forgetPasswordPrompt.value = '';
}

function closeForgetPassword() {
  isShowForgetPassword.value = false;
  forgetPasswordForm.value = {
    accountName: '',
    verificationCode: '',
    password: '',
    confirmPassword: ''
  };
  forgetPasswordPrompt.value = '';
}

function getForgetPasswordCode() {
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(forgetPasswordForm.value.accountName)) {
    forgetPasswordPrompt.value = '请输入有效的邮箱地址';
    return;
  }

  // 发送验证码
  sendEmailVerificationCode(forgetPasswordForm.value.accountName)
    .then(response => {
      if (response.code === 200) {
        forgetPasswordPrompt.value = '验证码已发送到您的邮箱';
      } else {
        forgetPasswordPrompt.value = response.message || '验证码发送失败';
      }
    })
    .catch(error => {
      forgetPasswordPrompt.value = '验证码发送失败，请稍后重试';
      console.error('发送验证码出错:', error);
    });
}

function submitForgetPassword() {
  // 重置提示信息
  forgetPasswordPrompt.value = '';

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(forgetPasswordForm.value.accountName)) {
    forgetPasswordPrompt.value = '请输入有效的邮箱地址';
    return;
  }

  // 验证验证码
  if (!forgetPasswordForm.value.verificationCode) {
    forgetPasswordPrompt.value = '请输入验证码';
    return;
  }

  // 验证密码
  if (!forgetPasswordForm.value.password) {
    forgetPasswordPrompt.value = '请输入新密码';
    return;
  }

  // 验证确认密码
  if (!forgetPasswordForm.value.confirmPassword) {
    forgetPasswordPrompt.value = '请确认新密码';
    return;
  }

  // 验证密码一致性
  if (forgetPasswordForm.value.password !== forgetPasswordForm.value.confirmPassword) {
    forgetPasswordPrompt.value = '两次输入的密码不一致';
    return;
  }

  // 调用重置密码API
  forgetPassword(forgetPasswordForm.value)
    .then(response => {
      if (response.data.code === 200) {
        forgetPasswordPrompt.value = '密码重置成功！';
        // 清空表单并关闭模态框
        setTimeout(() => {
          closeForgetPassword();
        }, 1500);
      } else {
        forgetPasswordPrompt.value = response.data.message || '密码重置失败，请稍后重试';
      }
    })
    .catch(error => {
      forgetPasswordPrompt.value = '密码重置失败，请稍后重试';
      console.error('重置密码出错:', error);
    });
}
// 用于登录
function signin() {
  prompt.value = '';

  // 验证用户名
  if (!logonFromDate.value.accountName) {
    prompt.value = '请输入用户名';
    return;
  }

  // 验证密码
  if (!logonFromDate.value.credential) {
    prompt.value = '请输入密码';
    return;
  }
  login(logonFromDate.value)
    .then(respone => {
      if (respone.data.code === 20000) {
        prompt.value = '登录成功';
        // 更新store中的用户信息
        userstore.updateUserFrom(respone.data.data);
        logonFromDate.value ={
          accountName: '',
          credential: '',
          loginType: 0,
          rememberMe: true,
        };
          router.push('/');
      }else{
        prompt.value = respone.data.message
      }
    })
    .catch(error =>{
      prompt.value = '登录失败';
      console.log('登录出错',error)
    })
}
// 用于注册
function Register() {
  // 重置提示信息
  prompt.value = '';

  // 验证用户名
  if (!registerFromDate.value.username) {
    prompt.value = '请输入用户名';
    return;
  }

  // 验证密码
  if (!registerFromDate.value.password) {
    prompt.value = '请输入密码';
    return;
  }

  // 验证确认密码
  if (!registerFromDate.value.confirmPassword) {
    prompt.value = '请确认密码';
    return;
  }

  // 验证密码一致性
  if (registerFromDate.value.password !== registerFromDate.value.confirmPassword) {
    prompt.value = '两次输入的密码不一致';
    return;
  }

  // 验证邮箱
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerFromDate.value.accountName)) {
    prompt.value = '请输入有效的邮箱地址';
    return;
  }

  // 验证验证码
  if (!registerFromDate.value.verificationCode) {
    prompt.value = '请输入验证码';
    return;
  }

  // 调用注册API
  register(registerFromDate.value)
    .then(response => {
      if (response.data.code === 200) {
        prompt.value = '注册成功！';
        // 清空表单
        registerFromDate.value = {
          username: '',
          password: '',
          confirmPassword: '',
          accountName: '',
          verificationCode: ''
        };
        // 切换到登录界面
        setTimeout(() => {
          signInSw();
        }, 1500);
      } else {
        prompt.value = response.data.message || '注册失败，请稍后重试';
      }
    })
    .catch(error => {
      prompt.value = '注册失败，请稍后重试';
      console.error('注册出错:', error);
    });
}
function Verification() {
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(registerFromDate.value.accountName)) {
    prompt.value = '请输入有效的邮箱地址';
    return;
  }

  // 发送验证码
  sendEmailVerificationCode(registerFromDate.value.accountName)
    .then(response => {
      if (response.code === 200) {
        prompt.value = '验证码已发送到您的邮箱';
      } else {
        prompt.value = response.message || '验证码发送失败';
      }
    })
    .catch(error => {
      prompt.value = '验证码发送失败，请稍后重试';
      console.error('发送验证码出错:', error);
    });
}
</script>
<style lang="less" scoped>
.login-nav {
  display: block;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  text-decoration: none;
  color: #333;
  left: 50px;
  margin-top: 20px;
}

.login-contant {
  width: 100%;
  min-height: 97vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .forget-password-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .forget-password-content {
      background: rgba(255, 255, 255, 0.9);
      padding: 30px;
      border-radius: 20px;
      width: 400px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

      h2 {
        margin: 0 0 30px 0;
        color: #2c3e50;
        font-size: 28px;
        font-weight: 600;
        text-align: center;
      }

      input {
        width: 100%;
        height: 40px;
        margin-top: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 0 15px;
        font-size: 16px;
        transition: all 0.3s ease;

        &:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
      }

      .verification-code {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 15px;

        input {
          flex: 2;
          margin-top: 0;
        }

        .get-code-btn {
          flex: 1;
          height: 40px;
          margin-top: 0;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
          }
        }
      }

      button {
        width: 100%;
        height: 45px;
        margin-top: 30px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
        }
      }
    }
  }

  .login-box {
    background: rgba(255, 255, 255, 0.9);
    width: 700px;
    height: 500px;
    border-radius: 20px;
    display: flex;
    position: relative;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .from {
      margin: 0;
      width: 350px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: transparent;
      padding: 50px 30px;
      box-sizing: border-box;
      opacity: 0;
      transition: all 0.5s ease;

      h2 {
        margin: 0 0 30px 0;
        color: #2c3e50;
        font-size: 28px;
        font-weight: 600;
      }

      input {
        width: 100%;
        height: 40px;
        margin-top: 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 0 15px;
        font-size: 16px;
        transition: all 0.3s ease;

        &:focus {
          border-color: #3498db;
          outline: none;
          box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
      }

      a {
        margin-top: 20px;
        color: #3498db;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.3s ease;

        &:hover {
          color: #2980b9;
        }
      }

      .verification-code {
        width: 100%;
        display: flex;
        gap: 10px;
        margin-top: 15px;

        input {
          flex: 2;
          margin-top: 0;
        }

        .get-code-btn {
          flex: 1;
          height: 40px;
          margin-top: 0;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
          }
        }
      }

      button {
        width: 100%;
        height: 45px;
        margin-top: 30px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        color: white;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(41, 128, 185, 0.4);
        }
      }
    }

    .conceal {
      left: 350px;
      position: absolute;
      width: 350px;
      height: 100%;
      background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      transition: all 0.5s ease;

      .conceal-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
        padding: 40px;
        text-align: center;

        h2 {
          font-size: 36px;
          margin: 20px 0 20px 0;
          font-weight: 600;
        }

        span {
          margin-top: 18px;
          font-size: 16px;
          opacity: 0.9;
        }

        button {
          width: 200px;
          height: 45px;
          margin-top: 60px;
          border: 2px solid white;
          border-radius: 8px;
          background: transparent;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: white;
            color: #3498db;
          }
        }
      }
    }
  }
}
</style>