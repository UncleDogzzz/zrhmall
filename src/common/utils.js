export function debounce(fn, delay) {
    var timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(this, args);
        }, delay)
    }
}
export function formatDate(date, fmt) {

   //获取年份
    if (/(y+)/.test(fmt)) {

        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                         //传入的yyyy        //2019.substr(4-4)=2019      
    }


   //获取月日时分秒
    let o = {

        'M+': date.getMonth() + 1,

        'd+': date.getDate(),

        'h+': date.getHours(),

        'm+': date.getMinutes(),

        's+': date.getSeconds()

    };

    for (let k in o) {

        if (new RegExp(`(${k})`).test(fmt)) {

            let str = o[k] + '';

            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));

        }

    }

    return fmt;

}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
