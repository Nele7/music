export function covertUnit(val) {
    if(!val) return 0
    if(val > 10000) {
        return (val/10000).toFixed() + '万'
    }
    return val.toFixed()
}
export function pad(num) {
    // return num < 10 ? '0' + num : num
    return `00${num}`.slice(-2)
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