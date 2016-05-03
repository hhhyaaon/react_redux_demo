/**
* 获得一个任意长度的随机字符串
* @param {number = 8} count 随机字符串长度，默认长度8
*/
export function getRandom(count = 8) {
    let str = "";
    for (var i = 0; i < count; i++) {
        str += (Math.random() * 10).toString(36).charAt(parseInt(((Math.random() * 5) + 2).toString()));
    }
    return str;
};
