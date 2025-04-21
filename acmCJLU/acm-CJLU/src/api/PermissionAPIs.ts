import axios from 'axios'

// 权限相关接口类型定义
export interface PermissionAddRequest {
  permKey: string
  permValue: string
}

export interface PermissionVO {
  permId: number
  permKey: string
  permValue: string
}

// 添加权限
export function addPermission(data: PermissionAddRequest) {
  return axios({
    url: '/permission/add',
    method: 'post',
    data
  })
}

// 删除权限
export function deletePermission(permId: number) {
  return axios({
    url: `/permission/delete/${permId}`,
    method: 'delete'
  })
}

// 获取权限列表
export function getPermissionList() {
  return axios({
    url: '/permission/list',
    method: 'get'
  })
}