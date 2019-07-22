let arr = [1,2,3,4,5,6,7,8,9]

// var length = arr.length,randomIndex,temp;
// while (length) {
//     // 取个随机数
//     randomIndex = getRandom(length)
//     length--
//     // 交换位置
//     temp = arr[randomIndex]
//     arr[randomIndex] = arr[length]
//     arr[length] = temp
// }
var temp;
for (let j = 0; j < arr.length; j++) {
    const r = getRandom(j)
    temp = arr[r]
    arr[r] = arr[j]
    arr[j] = temp
}
function getRandom(i) {
    return Math.floor(Math.random() * i)
}
console.log(arr)