import axios from 'axios'

// 验证码相关接口的响应类型
export interface BaseResponseObject {
  code: number
  data: any
  message: string
}

/**
 * 发送邮箱验证码
 * @param email 待发送验证码的邮箱地址
 * @returns Promise<BaseResponseObject>
 */
export function sendEmailVerificationCode(email: string) {
  return axios.post<BaseResponseObject>('/api/verification-code/email', null, {
    params: { email },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.data)
}

/**
 * 发送短信验证码
 * @param phoneNumber 待发送验证码的手机号码
 * @returns Promise<BaseResponseObject>
 */
export function sendPhoneVerificationCode(phoneNumber: string) {
  return axios.post<BaseResponseObject>('/api/verification-code/phone', null, {
    params: { phoneNumber },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.data)
}