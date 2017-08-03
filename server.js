'use strict';
var NODE_ENV = process.env.NODE_ENV || "product";//默认开发目录
console.log("node_env:" + NODE_ENV);
/**
 * Created by xufeng.yang on 2016/4/22.
 */
var config = require("./lib/config/Config")[NODE_ENV];//开发环境app启动config
/**
 * 静态服务器模块
 *
 * @type {serve}
 */
var staticServer = require('koa-static');
/**
 * KOA 主模块
 *
 * @type {Application}
 */
var koa = require('koa');

/**
 * 已经执行的KOA的模块入口
 */
var app = koa();

var session = require('koa-generic-session');
var redisStore = require('koa-redis');


//路由
var router = require('koa-router')();

//ejs模板引擎
var render = require('koa-ejs');


var compress = require('koa-compress');//

var conditional = require('koa-conditional-get');
var etag = require('koa-etag');

//nodejs 内置模块
var path = require('path');

var Util = require("./lib/utils/Util");
//日志模块初始化
var Log = require("./lib/utils/Log");
var logger = new Log();

console.log(config);

render(app, {
    root: path.join(__dirname, config.tmplsPath),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true
});


//“/”路由
var AppControllerClass = require('./lib/controller/AppController');
new AppControllerClass(logger, router, config.apiUrl);//页面跳转


let loginFilter = function (req, res, next) {
    return function *(next) {
        let url = this.req.url;//访问的url
        let isFetch = this.request.ctx.headers.fetch;
        let token = "";//默认token为空
        if (isFetch == 1) {//如果是ajax请求则忽略
            token = this.req.headers.token;
            //this.req.headers.token = "test_token";//--todo test_token模式测试
            if (undefined === token || null === token || "" === token) {
                this.body = {
                    "success": false,
                    "data": "error100000",
                    "description": "无效的token"
                }
            } else {
                yield  next;
            }
        } else if (url.indexOf("/css") > -1 || url.indexOf("/js") > -1 || url.indexOf("/images") > -1) {
            yield next
        } else {
            token = this.request.ctx.cookies.get("token");
            let flag = true;//已经登录了
            if (undefined === token || null === token || "" === token) {//还未登录
                flag = false;
            }
            if (!flag) {
                this.response.redirect(config.loginUrl);//跳转到passport 登录界面
            } else {
                yield next
            }
        }

    }
};

//界面路由过滤
let jsRoutes = [
    "/ledger/accountReconciliation",
    "/ledger/accountReconcileDetails",
    "/cost/goodsSold",
    "/cost/rawStock",
    "/cost/commodityStocks",
    "/cost/processingProducts",
    "/receive/receivable",
    "/receive/receiveInAdvance",
    "/pay/payable",
    "/pay/payInAdvance",
    "/list/download"
];

let redirectFilter = function (req, res, next) {
    return function*(next) {
        let url = this.req.url;
        if (url.indexOf("/css") > -1 || url.indexOf("/js") > -1 || url.indexOf("/images") > -1) {
            yield next;
            return;
        }
        let status = this.res.statusCode;//返回状态码
        let isFetch = this.request.ctx.headers.fetch;
        if (404 == status) {
            if (jsRoutes.indexOf(url) > -1) {
                this.response.redirect("/");
            } else {
                yield this.render("404");
            }
        } else if (500 == status && isFetch != 1) {
            //重定向到500页面
            yield this.render("500");
        } else {
            yield next;
        }
    }
};

var rStore = new redisStore({
    host: config.redisUrl,
    port: config.redisPort,
    pass: config.redisPass
});

/**
 * 中间件排队
 */
app.use(loginFilter()).use(session({
    store: rStore
})).use(compress({
    threshold: 2048
})).use(conditional()).use(etag()).use(staticServer(path.join(__dirname, config.staticPath))).use(router.allowedMethods())
    .use(logger.logFilter()).use(router.routes()).use(redirectFilter());


app.on('error', function (err, ctx) {
    console.log(err);
});


/**
 * 开启应用
 */
var server = app.listen(config.serverPort);
console.log("服务已开启,端口：" + config.serverPort);
logger.info("服务已开启,端口：" + config.serverPort);
