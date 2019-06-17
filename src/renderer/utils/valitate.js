export function isEmail(str) {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    return reg.test(str)
}
export function isPhone(str) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    return reg.test(str)
}