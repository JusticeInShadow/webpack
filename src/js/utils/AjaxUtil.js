/**
 * Created by Xufeng.Yang on 2016/12/5.
 */
import fetch from 'isomorphic-fetch';
import {message} from "antd";
import {getToken} from "./StorageUtil";
import {getCookie} from "./Util";

export const postJson = function (url, params, successFunc, failFunc) {
    var token = getCookie("token") || getToken();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'fetch': 1,
            'token': token
        },
        credentials: 'include',
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("系统异常请与管理员联系");
        }
        return response.json();
    }).then(function (msg) {
        console.log(msg);
        if (msg.description == 'error100000' || msg.description == '100000:无效token') {//无效token  跳转到登录界面
            location.href = commonConfig.loginUrl;
            return;
        }
        if (undefined !== successFunc && null !== successFunc && typeof successFunc === 'function') {
            successFunc(msg);
        }
    }).catch(function (err) {
        if (undefined !== failFunc && null !== failFunc && typeof failFunc === 'function') {
            failFunc(err);
        } else {
            if (typeof err == 'string') {
                message.error(err);//统一处理
            } else {
                let errorMessage = err.message || "";
                if (undefined === errorMessage || null === errorMessage || "" === errorMessage) {
                    errorMessage = err.description;
                }
                message.error(errorMessage);
            }

        }
    });
};


export const getJson = function (url, successFunc, failFunc) {
    var token = getCookie("token") || getToken();
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'fetch': 1,
            'token': token
        },
        credentials: 'include'
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("系统异常请与管理员联系");
        }
        return response.json();
    }).then(function (msg) {
        if (msg.description == 'error100000'|| msg.description == '100000:无效token') {//无效token  跳转到登录界面
            location.href = commonConfig.loginUrl;
            return;
        }
        if (undefined !== successFunc && null !== successFunc && typeof successFunc === 'function') {
            successFunc(msg);
        }

    }).catch(function (err) {
        if (undefined !== failFunc && null !== failFunc && typeof failFunc === 'function') {
            failFunc(err);
        } else {
            let errorMessage = err.message || "";
            if (undefined === errorMessage || null === errorMessage || "" === errorMessage) {
                errorMessage = err.description;
            }
            message.error(errorMessage);
        }
    });
};

export const deleteJson = function (url, successFunc, failFunc) {
    var token = getCookie("token") || getToken();
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'fetch': 1,
            'token': token
        },
        credentials: 'include'
    }).then(function (response) {
        if (response.status >= 400) {
            throw new Error("系统异常请与管理员联系");
        }
        return response.json();
    }).then(function (msg) {
        console.log(msg);
        if (msg.description == 'error100000'|| msg.description == '100000:无效token') {//无效token  跳转到登录界面
            location.href = commonConfig.loginUrl;
            return;
        }
        if (undefined !== successFunc && null !== successFunc && typeof successFunc === 'function') {
            successFunc(msg);
        }
    }).catch(function (err) {
        if (undefined !== failFunc && null !== failFunc && typeof failFunc === 'function') {
            failFunc(err);
        } else {
            let errorMessage = err.message || "";
            if (undefined === errorMessage || null === errorMessage || "" === errorMessage) {
                errorMessage = err.description;
            }
            message.error(errorMessage);
        }
    });
};