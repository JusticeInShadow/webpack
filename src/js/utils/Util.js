/**
 * Created by Xufeng.Yang on 2016/9/28.
 */
'use strict';
import moment from "moment";
/**
 * 是否是数组
 * @param arr
 * @returns {boolean}
 */
export const isArray = function (arr) {
    return arr instanceof Array;
};

/**
 * 是否是有效的浮点数
 * @param obj
 * @returns {boolean}
 */
export const isNumeric = function (obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
};

/**
 * 是否为空 [] undefined {} null "" 都返回true
 * @param param
 * @returns {*}
 */
export const isEmpty = function (obj) {
    if (obj == null) return true;
    if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
    return true;
};

/**
 *是否不为空
 * @param param
 * @returns {boolean}
 */
export const isNotEmpty = function (param) {
    return !this.isEmpty(param);
};

/**
 * 是否是字符串
 * @param obj
 * @returns {boolean}
 */
export const isString = function (obj) {
    //return toString.call(obj) == '[object String]';
    return (typeof obj == 'string') && obj.constructor == String;
};

/**
 * 是否是数字
 * @param obj
 * @returns {boolean}
 */
export const isNumber = function (obj) {
    //return toString.call(obj) == '[object Number]';
    return (typeof obj == 'number') && obj.constructor == Number;
};

/**
 *是否是手机号码
 * @param phone
 * @returns {*|boolean}
 */
export const isMobile = function (phone) {
    var reg = /^(((13[0-9]{1})|(15[0-9]{1})|17[0-9]{1}|(18[0-9]{1}))+\d{8})$/;
    return reg.test(phone);

};

/**
 *是否是有效的密码
 * @param userName
 * @returns {*|boolean}
 */
export const isPassword = function (password) {
    var reg = /[^\w]/;//不是数字字母下划线
    var reg2 = /\w*\d\w*/;//必须包含数组
    var reg3 = /\w*[a-z]\w*/;//必须包含小写字母
    var reg4 = /\w*[A-Z]\w*/;//必须包含小写字母

    if (!reg.test(password) && reg2.test(password) && reg3.test(password) && reg4.test(password)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取token
 * @param c_name
 * @returns {*}
 */
export const getCookie = function (c_name) {
    var c_start = -1, c_end = -1;
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
};
/**
 *设置token
 * @param c_name
 * @param value
 * @param expiredays
 */
export const setCookie = function (c_name, value, expiredays) {
    expiredays = expiredays || 1;
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiredays * 24 * 3600 * 1000);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + "; path:/" + commonConfig.domain);//--todo 设置domain时需要设置一级域名
};

/**
 *清除cookie
 * @param name
 */
export const removeCookie = function (name) {
    setCookie(name, 'removecookie', -1);
};

/**
 *去前后空格
 * @param val
 * @returns {*}
 */
export const trim = function (val) {
    return val.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 *获取字符串的字节长度 1个中文占2个字符
 * @param str
 */
export const getBytesLength = function (str) {
    return str.replace(/[^\x00-\xff]/g, 'xx').length;
};

/**
 * 生成序号
 * @param email
 * @returns {*|boolean}
 */
export const getNo = function (index, pageNumber, pageSize) {
    var order = (pageNumber - 1) * pageSize + index;
    return order;
};

/**
 * 获取当年月份
 * @param email
 * @returns {*|boolean}
 */
export const getNowMonth = function () {
    let time = moment().format("YYYY-MM");
    return time;
};

/**
 * 生成千分位数字
 * @param email
 * @returns {*|boolean}
 */
export const getThousands = function (num) {
    let oriNum = String(num);
    let re=/(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
    let newNum = oriNum.replace(re,"$1,");
    return newNum;
};