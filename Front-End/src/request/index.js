import axios from 'axios';

export const basicUrl = ""

//设置axios基础路径
const service = axios.create({
    baseURL: basicUrl
})

// 请求拦截器
service.interceptors.request.use(config => {
    config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
    return config
}, error => {
    return error;
})

// 响应拦截器
service.interceptors.response.use(response => {
    if (response.code) {
        
    } else {
        return response;
    }
})

export default service