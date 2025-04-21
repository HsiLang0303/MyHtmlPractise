import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // 用户状态
  const userFrom = ref({
    userId: "",
    avatarPath: "",
    username: "",
    nickname: "",
    phoneNumber: "",
    email: "",
    createTime: "",
    updateTime: "",
    token: "",
    roleValueList: []
  })

  // 从localStorage加载用户数据
  function loadUserFromStorage() {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      userFrom.value = JSON.parse(storedUser)
    }
  }

  // 初始化时加载数据
  loadUserFromStorage()

  function updateUserFrom(newUser: any) {
    userFrom.value = {
      ...userFrom.value,
      ...newUser
    }
    // 保存到localStorage
    localStorage.setItem('userInfo', JSON.stringify(userFrom.value))
  }

  function clearUserFrom() {
    userFrom.value = {
      userId: "",
      avatarPath: "",
      username: "",
      nickname: "",
      phoneNumber: "",
      email: "",
      createTime: "",
      updateTime: "",
      token: "",
      roleValueList: []
    }
    // 清除localStorage中的用户数据
    localStorage.removeItem('userInfo')
  }

  return {
    userFrom,
    updateUserFrom,
    clearUserFrom
  }
})