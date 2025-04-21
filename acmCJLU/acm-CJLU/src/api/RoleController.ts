import axios from 'axios'

// 通用响应接口
export interface BaseResponseObject {
  code: number
  data: any
  message: string
}

// 角色VO对象接口
export interface RoleVO {
  roleId: number
  roleName: string
  roleValue: string
}

// 角色添加请求接口
export interface RoleAddRequest {
  roleName: string
  roleValue: string
}

// 角色权限绑定请求接口
export interface RolePermissionBindingRequest {
  roleId: number
  permIdList: number[]
}

// 角色权限解绑请求接口
export interface RolePermissionUnbindingRequest {
  roleId: number
  permIdList: number[]
}

// 角色VO响应接口
export interface BaseResponseRoleVO {
  code: number
  data: RoleVO
  message: string
}

// 角色VO列表响应接口
export interface BaseResponseListRoleVO {
  code: number
  data: RoleVO[]
  message: string
}

// 添加角色
export const addRole = async (params: RoleAddRequest): Promise<BaseResponseRoleVO> => {
  const response = await axios.post<BaseResponseRoleVO>('/api/role/add', params)
  return response.data
}

// 删除角色
export const deleteRole = async (roleId: number): Promise<BaseResponseObject> => {
  const response = await axios.delete<BaseResponseObject>(`/role/delete/${roleId}`)
  return response.data
}

// 获取角色列表
export const getRoleList = async (): Promise<BaseResponseListRoleVO> => {
  const response = await axios.get<BaseResponseListRoleVO>('/api/role/list')
  return response.data
}

// 绑定权限
export const bindPermission = async (params: RolePermissionBindingRequest): Promise<BaseResponseObject> => {
  const response = await axios.post<BaseResponseObject>('/api/role/permission/bind', params)
  return response.data
}

// 解绑权限
export const unbindPermission = async (params: RolePermissionUnbindingRequest): Promise<BaseResponseObject> => {
  const response = await axios.delete<BaseResponseObject>('/api/role/permission/unbind', { data: params })
  return response.data
}