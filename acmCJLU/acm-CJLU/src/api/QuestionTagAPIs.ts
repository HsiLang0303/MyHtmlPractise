import axios from 'axios'

// 题目标签相关接口类型定义
export interface TagAddOrUpdateRequest {
  tagId?: number
  name: string
  description: string
}

export interface TagVO {
  tagId: number
  name: string
  description: string
}

// 添加或更新标签信息
export function addOrUpdateTag(data: TagAddOrUpdateRequest) {
  return axios({
    url: '/tag/add',
    method: 'post',
    data
  })
}

// 删除标签
export function deleteTag(tagId: number) {
  return axios({
    url: `/tag/delete/${tagId}`,
    method: 'post'
  })
}

// 获取标签列表
export function getTagList(name?: string) {
  return axios({
    url: '/tag/list/vo',
    method: 'get',
    params: { name }
  })
}