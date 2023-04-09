//导入我们封装好的axios 
import service from './index'

export const restaruantApi = () => service.get('api/restaurantList');