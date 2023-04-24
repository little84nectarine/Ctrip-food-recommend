var Mock = require('mockjs')
let fs = require('fs')


// var data = Mock.mock({
//     'data|102': [{
//         'id|+1': 1,
//         'dishes|4-8': [{
//             'dishId|+1': 0,
//             'dishName|1': [
//                 '红烧狮子头',
//                 '鲍鱼扣肉',
//                 '红烧龙虾',
//                 '清蒸石斑鱼',
//                 '佛跳墙',
//                 '银鱼豆腐汤',
//                 '红烧肉',
//                 '清蒸大闸蟹',
//                 '东坡肉',
//                 '芙蓉蛋',
//                 '红烧鲍鱼',
//                 '红烧海参',
//                 '龙虎斗',
//                 '糖醋鲤鱼',
//                 '红烧燕窝',
//                 '红烧鹿尾儿',
//                 '清蒸桂花鱼',
//                 '红烧翅尖',
//                 '佛手烤鸭',
//                 '麻辣小龙虾',
//             ],
//             'dishImg|1': [
//                 'https://dimg02.c-ctrip.com/images/0104a1200085phbz2301C_D_180_180.jpg?proc=autoorient',
//                 'https://dimg01.c-ctrip.com/images/0104m1200085phhh03A13_D_180_180.jpg?proc=autoorient',
//                 'https://dimg07.c-ctrip.com/images/010291200085phrtc0CAB_D_180_180.jpg?proc=autoorient',
//                 'https://dimg01.c-ctrip.com/images/0102z1200085pf5df4286_D_180_180.jpg?proc=autoorient',
//                 'https://dimg08.c-ctrip.com/images/010331200085piar50EE3_D_180_180.jpg?proc=autoorient',
//                 'https://dimg08.c-ctrip.com/images/010331200085piar50EE3_D_180_180.jpg?proc=autoorient',
//                 'https://dimg06.c-ctrip.com/images/0101c1200085phfbzD9D8_D_180_180.jpg?proc=autoorient',
//                 'https://dimg08.c-ctrip.com/images/0106s1200085pg1rg48FF_D_180_180.jpg?proc=autoorient',
//                 'https://dimg05.c-ctrip.com/images/0104v1200085phs7jC915_D_180_180.jpg?proc=autoorient',
//                 "https://dimg01.c-ctrip.com/images/0103j1200085phm77DA93_D_180_180.jpg?proc=autoorient",
//                 'https://dimg07.c-ctrip.com/images/0100z1200085pg6wpE4C7_D_180_180.jpg?proc=autoorient',
//                 'https://dimg04.c-ctrip.com/images/0100f1200085pg5yeD571_D_180_180.jpg?proc=autoorient',
//                 'https://dimg08.c-ctrip.com/images/100v0800000038vkk75DE_D_180_180.jpg?proc=autoorient',
//                 'https://dimg06.c-ctrip.com/images/10070800000038vn5573F_D_180_180.jpg?proc=autoorient',
//                 'https://dimg06.c-ctrip.com/images/10070800000038vn66720_D_180_180.jpg?proc=autoorient',
//             ],
//             'dishScore|60-100.0-2': 1,
//             'conllectedCount|50-5000': 1
//         }]
//     }]
// })

let data = require('../mock/recomDish.json')


console.log(JSON.stringify(data.data, null, 4));

// fs.writeFile('./recomDish.json', JSON.stringify(data, null, 4), (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });