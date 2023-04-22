var Mock = require('mockjs')
let fs = require('fs')
let userdata = require('../mock/user.json')
let restdata = require('../mock/restruant.json')

userdata = userdata.data
restdata = restdata.data

let temp = []
userImgs = {
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
}

for (let item in userdata) {
    let id = Number(item)
    // console.log(restdata[id]);

    temp.push({
        id: id,
        img: userImgs[ id % 15 + 1 ],
        title: restdata[id].name
    })
}

// console.log(JSON.stringify(temp, null, 4));
// console.log(temp);
let result = {
    data: temp
}
result = JSON.stringify(result, null, 2)


fs.writeFile('./waterfall.json', result, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});