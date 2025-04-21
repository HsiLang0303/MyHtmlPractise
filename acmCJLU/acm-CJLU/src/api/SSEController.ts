import axios from 'axios'

// 服务器发送事件（Server-Sent Events）相关的API接口

// SSE响应接口
export interface SseEmitter {
  timeout: number
}

// 订阅提交评测状态更新
export const subscribeSubmissionStatus = async (submissionId: number): Promise<SseEmitter> => {
  const response = await axios.get<SseEmitter>(`/subscribe/${submissionId}`, {
    headers: {
      'Accept': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    },
    responseType: 'stream'
  })
  return response.data
}