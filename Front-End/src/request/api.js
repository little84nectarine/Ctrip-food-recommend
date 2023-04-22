//导入我们封装好的axios 
import service from './index'
import axios from 'axios';

//------ GET ------
//获取所有餐厅列表
export const restaruantApi = (page) => service.get(`api/restaurantList?page=${page}`);
//获取所有banner列表
export const bannerApi = () => service.get('api/bannerList');
//获取热门榜单列表
export const hotApi = ()=> service.get('api/hotlist');
//query搜索餐厅
export const searchApi = (search) => service.get(`api/searchrest?search=${search}`);

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