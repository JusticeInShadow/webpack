/**
 * Created by Xufeng.Yang on 2016/12/22.
 */
import {
    TOKEN,
    CURRENT_USER,
    ACCOUNT_ADRESS
} from "../constants/StorageConstant";
export const setToken = function (token) {
    localStorage.setItem(TOKEN, token);
};

export const getToken = function () {
    return localStorage.getItem(TOKEN);
};

export const removeToken = function () {
    localStorage.removeItem(TOKEN);
};

//设置用户信息

export const setUser = function (user) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
};

export const removeUser = function () {
    localStorage.removeItem(CURRENT_USER);
};

export const getUser = function () {
    var userInfo = localStorage.getItem(CURRENT_USER);
    return (undefined != userInfo && null != userInfo && "" != userInfo) ? JSON.parse(userInfo) : null;
};

//设置供应商
export const setAccount = function (account) {
    localStorage.setItem(ACCOUNT_ADRESS, JSON.stringify(account));
};

export const removeAccount = function () {
    localStorage.removeItem(ACCOUNT_ADRESS);
};

export const getAccount = function () {
    var account = localStorage.getItem(ACCOUNT_ADRESS);
    return (undefined != account && null != account && "" != account) ? JSON.parse(account) : null;
};


