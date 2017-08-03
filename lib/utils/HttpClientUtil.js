/**
 * Created by Xufeng.Yang on 2016/9/30.
 */
'use strict';
let co = require("co");
let request = require("co-request");
let Util = require("./Util");
let Log = require("./Log");
let logger = new Log();

class HttpClientUtil {


    /**
     *post form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static * postBodyJSON(url, params, token, locale) {
        let that = this;
        return co(function *() {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var res = yield request({
                uri: url,
                method: "POST",
                headers: headers,
                body: JSON.stringify(params)
            });
            return that.parseServerAjaxData(res);
        });
    }


    /**
     *post form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static * postFormJSON(url, params, token, locale) {
        let that = this;
        return co(function *() {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var res = yield request({
                uri: url,
                method: "POST",
                headers: headers,
                form: params
            });
            return that.parseServerAjaxData(res);
        });
    }

    /**
     *put form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static * putFormJSON(url, params, token, locale) {
        let that = this;
        return co(function *() {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var res = yield request({
                uri: url,
                method: "PUT",
                headers: headers,
                form: params
            });
            return that.parseServerAjaxData(res);
        });
    }


    /**
     *delete form请求
     * @param url
     * @param params
     * @returns {*}
     */
    static * deleteFormJSON(url, params, token, locale) {
        let that = this;
        return co(function *() {
            let headers = {
                'terminal': 'web',
                'locale': locale || 'zh_CN',
                'content-type': "application/json"
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var res = yield request({
                uri: url,
                method: "DELETE",
                headers: headers,
                form: params
            });
            return that.parseServerAjaxData(res);
        });
    }

    /**
     *get form请求
     * @param url
     * @param params
     * @param token
     * @returns {*}
     */
    static * getFormJSON(url, token, locale) {
        let that = this;
        return co(function *() {
            let headers = {
                'terminal': 'web',
                'content-type': "application/json",
                'locale': locale || 'zh_CN'
            };
            if (Util.isNotBlank(token)) {
                headers["token"] = token;
            }
            var res = yield request({
                uri: url,
                method: "GET",
                headers: headers
            });
            return that.parseServerAjaxData(res);
        });
    }

    /**
     *返回统一解析
     * @param data
     * @returns {*}
     */
    static parseServerAjaxData(res) {
        logger.info(res);
        console.log(res);
        if (res.statusCode === 200 || res.statusCode === 500 || res.statusCode === 401 || res.statusCode === 400) {
            let data = JSON.parse(res.body);
            if (data.success == '1') {//成功
                return data.data;
            } else {
                if (data.errorCode == '100000') {//如果是token失效 --特定的description
                    throw "error" + data.errorCode;
                } else {
                    throw data.errorMessage;
                }
            }
        } else {
            throw res.statusCode;
        }
    }

    /**
     * 获取get请求
     * @param param
     * @returns {string}
     */
    static getGetUrl(url, param) {
        if (url.indexOf("?") > -1) {
            return url + "&" + param;
        } else {
            return url + "?" + param;
        }
    }

}
module.exports = HttpClientUtil;