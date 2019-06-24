export function covertUnit(val) {
    if(!val) return 0
    if(val > 10000) {
        return (val/10000).toFixed() + '万'
    }
    return val.toFixed()
}