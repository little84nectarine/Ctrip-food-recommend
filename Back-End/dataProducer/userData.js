var Mock = require('mockjs')
let fs = require('fs')


var data = Mock.mock({
    'data|102': [{
        'id|+1': 1,
        'comments|0-12': [{
            'userId|+1': 0,
            'userPhoto|1': [
                'https://dimg04.c-ctrip.com/images/Z80o180000013ulo9C34A_C_180_180.jpg',
                'https://dimg04.c-ctrip.com/images/zc0a170000011f8t5F2C8_C_180_180.jpg',
                'https://dimg04.c-ctrip.com/images/Z80o180000013ulur1D76_C_180_180.jpg',
                'https://dimg04.c-ctrip.com/images/0AS1k120009l60yh36D69_C_180_180.jpg'
            ],
            'userName|1': ['@cfirst@clast', '@first @last'],
            'userImgs|0-10': {
                '1': 'https://dimg02.c-ctrip.com/images/0104a1200085phbz2301C_D_180_180.jpg?proc=autoorient',
                '2': 'https://dimg01.c-ctrip.com/images/0104m1200085phhh03A13_D_180_180.jpg?proc=autoorient',
                '3': 'https://dimg07.c-ctrip.com/images/010291200085phrtc0CAB_D_180_180.jpg?proc=autoorient',
                '4': 'https://dimg01.c-ctrip.com/images/0102z1200085pf5df4286_D_180_180.jpg?proc=autoorient',
                '5': 'https://dimg08.c-ctrip.com/images/010331200085piar50EE3_D_180_180.jpg?proc=autoorient',
                '6': 'https://dimg08.c-ctrip.com/images/010331200085piar50EE3_D_180_180.jpg?proc=autoorient',
                '7': 'https://dimg06.c-ctrip.com/images/0101c1200085phfbzD9D8_D_180_180.jpg?proc=autoorient',
                '8': 'https://dimg08.c-ctrip.com/images/0106s1200085pg1rg48FF_D_180_180.jpg?proc=autoorient',
                '9': 'https://dimg05.c-ctrip.com/images/0104v1200085phs7jC915_D_180_180.jpg?proc=autoorient',
                '10': "https://dimg01.c-ctrip.com/images/0103j1200085phm77DA93_D_180_180.jpg?proc=autoorient",
                '11': 'https://dimg07.c-ctrip.com/images/0100z1200085pg6wpE4C7_D_180_180.jpg?proc=autoorient',
                '12': 'https://dimg04.c-ctrip.com/images/0100f1200085pg5yeD571_D_180_180.jpg?proc=autoorient',
                '13': 'https://dimg08.c-ctrip.com/images/100v0800000038vkk75DE_D_180_180.jpg?proc=autoorient',
                '14': 'https://dimg06.c-ctrip.com/images/10070800000038vn5573F_D_180_180.jpg?proc=autoorient',
                '15': 'https://dimg06.c-ctrip.com/images/10070800000038vn66720_D_180_180.jpg?proc=autoorient',

            },
            'userScore|3-4.0-1': 1,
            'comment|1-6': {
                '1': '酱汁调得浓郁，洋葱又增加了香味,',
                '2': '醉蟹做得那是相当的地道，黄橙橙鼓囊囊的蟹黄很是诱人,',
                '3': '口味真的不用多说了，非常好吃，相当的正宗，真的yyds,',
                '4': '快馋死我了，是个聚餐的好去处第一次来，带着探店的想法来，',
                '5': '蛮惊喜的，值得好评不具体展开了，总之是一次不错的用餐体验,',
                '6': '地理位置好，出行都很方便。',
                '7': '而且团购的券也很划算，推荐大家来体验！',
                '8': '福州路上 靠近人广 旁边就是南京路 地理位置佳。',
                '9': '王宝和老字号，却是白菜的价格 历史悠久 1977年至今 整个酒店都保留了老式风格 硕大的水晶吊灯。',
                '10': "蟹粉小笼包：小笼包的皮稍微有点厚美中不足。",
                '11': '美极菌皇牛柳粒：牛柳粒很嫩 入口即化。',
                '12': '蟹炒豆苗：也很新鲜 而且每道菜的分量都非常足!!!毕竟是国营老店啊 货真价实的良心酒家。',
                '13': '酸汤美蛙鱼：牛蛙要上去太有嚼劲了 酸酸辣辣的 根本停不下来。',
                '14': '上海市有名的以吃蟹出名的大酒店，每年大闸蟹上市都人满为患，今年不知道会怎么样。',
                '15': '餐厅环境很安静，菜品也是一如即往的精致，分量也很足，好评！',
            }
        }]
    }]
})

// console.log(data.data[0]);
data.data.forEach(rest => {
    console.log('====================================');
    console.log(rest.id, rest.comments.length);
    if (rest.comments.length > 0) {
        // 遍历每条评论  合并评论文字、晒图变成列表
        rest.comments.forEach(comm => {
            // 合并文字
            let result = ''
            for(let item in comm.comment){
                result += comm.comment[item]
            }
            comm.comment = result

            // 生成图片列表
            let imgList = []
            for(let item in comm.userImgs){
                imgList.push(comm.userImgs[item])
            }
            comm.userImgs = imgList
        })
    }
    console.log('====================================');
})

// 将数组转换成以id为键的对象
let temp = {}

data.data.forEach(rest=>{
    temp[rest.id] = rest
})
data.data = temp

data = JSON.stringify(data, null, 2)
// console.log(data);
// 输出结果


fs.writeFile('./user.json', data, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});