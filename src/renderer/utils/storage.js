// export const local = {
//     getItem(name) {
//         let value = localStorage.getItem(name)
//         if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
//         return value
//     },
//     setItem(name, value) {
//         if (typeof value === typeof {}) value = JSON.stringify(value)
//         return localStorage.setItem(name, value)
//     },
//     removeItem(name) {
//         return localStorage.removeItem(name)
//     }
// }
class Local{
    constructor(){

    }
    getItem(name) {
        let value = localStorage.getItem(name)
        if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
        return value
    }
    setItem(name, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value)
        return localStorage.setItem(name, value)
    }
    removeItem(name) {
        return localStorage.removeItem(name)
    }
}

const local = new Local()

export default local