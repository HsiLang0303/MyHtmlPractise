<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/liang_logo.png" alt="">
    </div>
    <div class="nav">
      <ul>
        <router-link to="/" exact>首页</router-link>
        <router-link to="/problem" exact>题目</router-link>
        <router-link to="/status" exact>状态</router-link>
        <router-link to="/ranking" exact>排名</router-link>
        <router-link to="/competition" exact>比赛</router-link>
        <a href="#" @click.prevent :class="['help-contant', { 'help-active': isHelpRoute }]">帮助
          <div class="help-list">
            <router-link to="/helpusual">常规</router-link>
            <router-link to="helpissue">议题</router-link>
          </div>
        </a>
      </ul>
    </div>
    <div class="language">
      <span class="lang-text">语言</span>
      <div class="chose-lang">
        <button>中文</button>
        <button>English</button>
      </div>
    </div>
    <div class="user">
      <div v-if="userFrom.username" class="user-contant">
        <span class="username">{{ userFrom.username }}</span>
        <div class="avatar">
          <img src="../assets/toux.jpeg" alt="用户头像">
        </div>
        <div class="userfunction">
          <router-link to="user">个人主页</router-link>
          <a href="#" @click="handleLogout">退出登录</a>
        </div>
      </div>
      <router-link to="login" v-else>登录</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { logout } from '../api/UserAPIs'

const route = useRoute()
const router = useRouter()
const store = useUserStore()
const userFrom = store.userFrom

const isHelpRoute = computed(() => {
  return route.path.includes('help')
})

function handleLogout(){
  router.push('/login')
  store.clearUserFrom()
  logout().then(Response =>{
      console.log(Response.data)
      if(Response.data.code == 20000){
        console.log("退出成功")
        
      }
  })
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.user-contant {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;

  .username {
    font-size: 16px;
    color: #333;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #e8e8e8;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .userfunction {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    background-color: rgb(255, 255, 255);
    right: 0;
    top: 35px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(88, 92, 95, 0.2);
    min-width: 120px;
    transition: all 0.3s ease;
    transform: translateY(10px);
    
    a {
      display: block;
      padding: 8px 16px;
      color: #333;
      text-decoration: none;
      transition: all 0.2s;
      
      &:hover {
        color: #1890ff;
        background-color: rgba(24, 144, 255, 0.1);
      }
    }
  }

  &:hover {
    .userfunction {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }

}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  height: 70px;
  padding-top: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);

  .logo {
    width: 50px;
    margin-left: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    margin-left: 100px;
    width: 800px;
    height: 100%;

    ul {
      width: 100%;
      height: 100%;
      list-style: none;
      display: flex;

      >a {
        width: 134px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        text-decoration: none;
        color: #333;
        transition: all 0.2s;

        &:hover {
          color: #1890ff;
          border-bottom: #1890ff 2px solid;
        }

        &.router-link-exact-active {
          color: #1890ff;
          border-bottom: #1890ff 2px solid;
        }
      }

      .help-contant {
        position: relative;
        overflow: hidden;

        .help-list {
          display: none;
          position: absolute;
          top: 100%;
          transition: all 0.2s ease-in-out;

          a {
            text-decoration: none;
            color: #333;
            font-size: 18px;
            transition: all 0.2s;
            padding: 12px;
          }
        }

        &:hover {
          color: transparent;

          .help-list {
            display: block;
            top: 23px;

            a {
              &:hover {
                color: #1890ff;
              }
            }
          }
        }

        &.help-active {
          color: #1890ff;
          border-bottom: #1890ff 2px solid;

          &:hover {
            color: transparent;
          }
        }
      }
    }
  }

  .language {
    width: 100px;
    margin-left: auto;
    margin-right: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .chose-lang {
      position: absolute;
      display: none;

      button {
        margin: 10px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;

        &:hover {
          color: #1890ff;
        }
      }
    }

    &:hover {
      color: transparent;

      .chose-lang {
        display: block;
      }
    }
  }

  .user {
    width: auto;
    margin-right: 150px;

    a {
      text-decoration: none;
      color: #333;
    }
  }
}
</style>
