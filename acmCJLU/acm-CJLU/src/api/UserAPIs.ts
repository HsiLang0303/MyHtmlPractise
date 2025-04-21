import axios from 'axios'

// 用户相关接口的响应类型
export interface BaseResponseLong {
  code: number
  data: number
  message: string
}

// 通用响应类型
export interface BaseResponseObject<T = any> {
  code: number
  data: T
  message: string
}

// 角色信息VO
export interface RoleVO {
  roleId: number
  roleName: string
  roleValue: string
}

// 用户角色信息VO
export interface UserRoleVO {
  userId: number
  avatarPath: string
  username: string
  nickname: string
  createTime: string
  updateTime: string
  roleVOList: RoleVO[]
}

// 登录用户信息VO
export interface LoginUserVO {
  userId: number
  avatarPath: string
  username: string
  nickname: string
  phoneNumber: string
  email: string
  createTime: string
  updateTime: string
  token: string
  roleValueList: string
}

// 邮箱绑定请求
export interface EmailBindRequest {
  userId: number
  oldEmail: string
  newEmail: string
  verificationCode: string
}

// 忘记密码请求
export interface ForgetPasswordRequest {
  accountName: string
  verificationCode: string
  password: string
  confirmPassword: string
}

// 用户信息更新请求
export interface UserUpdateRequest {
  userId: number
  avatarPath: string
  nickname: string
}

// 用户登录请求
export interface UserLoginRequest {
  accountName: string
  credential: string
  loginType: number
  rememberMe: boolean
}

// 用户注册请求
export interface UserRegisterRequest {
  username: string
  password: string
  confirmPassword: string
  accountName: string
  verificationCode: string
}

// 用户角色绑定/解绑请求
export interface UserRoleBindRequest {
  userId: number
  roleIdList: number[]
}

// 分页响应类型
export interface PageUserRoleVO {
  records: UserRoleVO[]
  total: number
  size: number
  current: number
  pages: number
}

/**
 * 绑定/换绑邮箱
 * @param data 邮箱绑定请求参数
 */
export function bindEmail(data: EmailBindRequest) {
  return axios.post<BaseResponseObject<void>>('/api/user/email/bind', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 忘记密码
 * @param data 忘记密码请求参数
 */
export function forgetPassword(data: ForgetPasswordRequest) {
  return axios.put<BaseResponseObject<void>>('/api/user/forget-password', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 查看指定用户基本信息
 * @param userId 用户ID
 */
export function getUserInfo(userId: number) {
  return axios.get<BaseResponseObject<UserRoleVO>>(`/user/info/${userId}`)
}

/**
 * 编辑用户基本信息
 * @param data 用户信息更新请求参数
 */
export function updateUserInfo(data: UserUpdateRequest) {
  return axios.put<BaseResponseObject<void>>('/api/user/info/edit', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 分页查询用户信息
 * @param params 查询参数
 */
export function getUserList(params: {
  userId?: string
  username?: string
  nickname?: string
  roleIdList?: string
  current?: number
  pageSize?: number
  sortField?: string
  sortOrder?: string
}) {
  return axios.get<BaseResponseObject<PageUserRoleVO>>('/api/user/list/page', { params })
}

/**
 * 用户登录
 * @param data 登录请求参数
 */
export function login(data: UserLoginRequest) {
  return axios.post<BaseResponseObject<LoginUserVO>>('/api/user/login', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 获取当前登录状态信息
 */
export function getLoginState() {
  return axios.get<BaseResponseObject<LoginUserVO>>('/api/user/login-state')
}

/**
 * 用户登出
 */
export function logout() {
  return axios.put<BaseResponseObject<void>>('/api/user/logout', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 用户注册
 * @param data 注册请求参数
 */
export function register(data: UserRegisterRequest) {
  return axios.post<BaseResponseObject<LoginUserVO>>('/api/user/register', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 为用户绑定角色
 * @param data 角色绑定请求参数
 */
export function bindUserRole(data: UserRoleBindRequest) {
  return axios.post<BaseResponseObject>('/api/user/role/bind', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 为用户解绑角色
 * @param data 角色解绑请求参数
 */
export function unbindUserRole(data: UserRoleBindRequest) {
  return axios.delete<BaseResponseObject>('/api/user/role/unbind', {
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 获取自身角色列表
 */
export function getUserRoleList() {
  return axios.get<BaseResponseObject<RoleVO[]>>('/api/user/role/vo')
}