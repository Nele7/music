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