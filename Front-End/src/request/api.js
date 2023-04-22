//导入我们封装好的axios 
import service from './index'
import axios from 'axios';

//------ GET ------
//获取所有餐厅列表
export const restaruantApi = (page) => service.get(`api/restaurantList?page=${page}`);
export const bannerApi = () => service.get('api/bannerList');

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
//请求瀑布流列表
export const waterfallApi = function (body = {}) {
    return axios({
        method: 'post',
        url: '/api/waterfall',
        data: body
    })
}