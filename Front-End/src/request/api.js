//导入我们封装好的axios 
import service from './index'
import axios from 'axios';

//------ GET ------
//获取所有餐厅列表
export const restaruantApi = () => service.get('api/restaurantList');
export const bannerApi = () => service.get('api/bannerList');
export const singlefilter = (urlkey) => service.get(`api/${urlkey}`)

//------ POST ------
//获取餐厅详情
export const restaurantdetailApi = function (body = {}) {
    return axios({
        method: 'post',
        url: '/api/restaurantdetail',
        data: body
    })
}
//多项筛选
export const multifilterApi = function (body = {}) {
    return axios({
        method: 'post',
        url: '/api/multifilter',
        data: body
    })
}