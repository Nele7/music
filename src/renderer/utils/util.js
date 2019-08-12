import moment from 'moment'
moment.locale('zh-cn')
export function covertUnit(val) {
    if (!val) return 0
    if (val > 10000) {
        return (val / 10000).toFixed() + '万'
    }
    return val.toFixed()
}
export function pad(num) {
    return num < 10 ? '0' + num : num
    // return `00${num}`.slice(-2)
}
export function formatTime(time) {
    time = (time / 1000) | 0
    const minute = (time / 60) | 0
    const second = pad(time % 60)
    return `${pad(minute)}:${second}`
}
export function formatDateTime(time) {
    var date = new Date(time)
    var year = date.getFullYear()
    var mouth = date.getMonth() + 1
    var day = date.getDate()
    return `${year}-${pad(mouth)}-${pad(day)}`
}

export function formatterTime(time) {
    return moment(time).startOf('minute').fromNow()
}

export function formatTimeMMSS(time) {
    return moment(time).format('mm:ss')
}

export function formatTimeMMDD(time) {
    return moment(time).format('MM-DD')
}
// export function shuffle(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         let j = getRandom(0,i);
//         [arr[j],arr[i]] = [arr[i],arr[j]]
//     }
//     console.log(arr)
//     // return arr
// }
export function shuffle(arr) {
    let _arr = [...arr]
    let length = _arr.length
    while (length) {
        let j = getRandom(0, length)
        length--
        [_arr[j], _arr[length]] = [_arr[length], _arr[j]]
    }
    return _arr
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}