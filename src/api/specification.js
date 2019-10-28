import request from '@/utils/request'
export function getSpecificationById(data) {
  return request({
    url: '/specification/getSpecificationById', // 等待添加后端接口
    method: 'get',
    params: data
  })
}
