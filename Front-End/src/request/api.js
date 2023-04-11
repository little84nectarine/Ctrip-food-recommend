//导入我们封装好的axios 
import service from './index'
import axios from 'axios';

export const restaruantApi = () => service.get('api/restaurantList');
export const restaurantdetailApi = function (body = {}) {
    return axios({
        method: 'post',
        url: '/api/restaurantdetail',
        data: body
    })
}
export const bannerApi = () => service.get('api/bannerList');