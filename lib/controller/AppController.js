/**
 * Created by xufeng.yang on 2016/4/22.
 */
'use strict';
var BaseController = require("./BaseController");
var koaBody = require('koa-body')();//KOA解析起
var AppService = require("../service/AppService");
var Util = require("../utils/Util");

class AppController extends BaseController {
    constructor(logger, router, uriPrefix) {
        super(logger);
        this.router = router;
        this.appService = new AppService(logger, uriPrefix);
        this.routerPrefix = "/";
        this.initRouter();
        this.logger = logger;
    }

    initRouter() {
        var that = this;


        //跳转到用户管理界面
        this.router.get("/", function *(context, next) {
            let This = this;
            yield  this.render("index");
        });

        //获取发出商品列表
        this.router.post(this.routerPrefix + "getGoodsSold",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取发出商品列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getGoodsSold(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取发出商品Excel
        this.router.post(this.routerPrefix + "getGoodsSoldExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取发出商品Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getGoodsSoldExcel(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取原材料列表
        this.router.post(this.routerPrefix + "getRawStock",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取原材料列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getRawStock(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取原材料Excel
        this.router.post(this.routerPrefix + "getRawStockExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取原材料Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getRawStockExcel(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取库存商品列表
        this.router.post(this.routerPrefix + "getCommodityStocks",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取库存商品列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getCommodityStocks(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取库存商品Excel
        this.router.post(this.routerPrefix + "getCommodityStocksExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取库存商品Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getCommodityStocksExcel(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取在制品列表
        this.router.post(this.routerPrefix + "getProcessingProducts",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取在制品列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getProcessingProducts(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取在制品Excel
        this.router.post(this.routerPrefix + "getProcessingProductsExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取在制品Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var businessDate = body.businessDate;
                var co = body.co;
                var mcu = body.mcu;
                resBody.data = yield that.appService.getProcessingProductsExcel(businessDate,co,mcu,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取应收余额表
        this.router.post(this.routerPrefix + "getReceivableList",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取应付余额表列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getReceivableList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取应收余额表Excel
        this.router.post(this.routerPrefix + "getReceivableExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取应收余额表Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getReceivableExcel(bz,gs,khbm,kmz, mxz,date, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取预收余额表
        this.router.post(this.routerPrefix + "getReceiveInAdvanceList",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取预收余额表列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getReceiveInAdvanceList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取预收余额表Excel
        this.router.post(this.routerPrefix + "getReceiveInAdvanceExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取预收余额表Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getReceiveInAdvanceExcel(bz,gs,khbm,kmz, mxz,date, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });


        //获取应付余额表
        this.router.post(this.routerPrefix + "getPayableList",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取应付余额的列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                that.logger.info(date)
                resBody.data = yield that.appService.getPayableList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取应付余额表Excel
        this.router.post(this.routerPrefix + "getPayableExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取应付余额表的Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getPayableExcel(bz,gs,khbm,kmz, mxz,date, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取预付余额表
        this.router.post(this.routerPrefix + "getPayInAdvanceList",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取预付余额的列表成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getPayInAdvanceList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取预付余额表Excel
        this.router.post(this.routerPrefix + "getPayInAdvanceExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取预付余额表Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var bz = body.bz;
                var gs = body.gs;
                var khbm = body.khbm;
                var kmz = body.kmz;
                var mxz = body.mxz;
                var date = body.date;
                resBody.data = yield that.appService.getPayInAdvanceExcel(bz,gs,khbm,kmz, mxz,date, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //根据公司code获取公司名称
        this.router.get(this.routerPrefix + "getCompanyName", function *(context, next) {
            let resBody = {"success": true, "description": "获取公司名称成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let urlParams = Util.parseGetParam(this.request.querystring);
                var code = urlParams.code;
                resBody.data = yield that.appService.getCompanyName(code, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //根据用户code获取用户名称
        this.router.get(this.routerPrefix + "getAllAdress", function *(context, next) {
            let resBody = {"success": true, "description": "获取客户名称成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let urlParams = Util.parseGetParam(this.request.querystring);
                var pageNumber = urlParams.pageNumber;
                var pageSize = urlParams.pageSize;
                resBody.data = yield that.appService.getAllAdress(pageNumber,pageSize, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //根据token获取当前用户信息
        this.router.get(this.routerPrefix + "getCurrentUserByToken", function *(context, next) {
            let resBody = {"success": true, "description": "获取用户成功！"};
            try {
                var token = this.req.headers.token;//获取ajax token
                var userInfo = yield this.sessionStore.client.get(token);
                resBody.data = userInfo;
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //根据对账方和被对账方的编号获取对账表单数据
        this.router.get(this.routerPrefix + "getAccountReconciliation", function *(context, next) {
            let resBody = {"success": true, "description": "获取往来对账单成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let urlParams = Util.parseGetParam(this.request.querystring);
                var dzf = urlParams.dzf;
                var bdzf = urlParams.bdzf;
                var date = urlParams.date;
                resBody.data = yield that.appService.getAccountReconciliation(dzf,bdzf,date,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取往来对账单Excel
        this.router.post(this.routerPrefix + "getAccountExcel",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "获取往来对账单Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var dzf = body.dzf;
                var bdzf = body.bdzf;
                var date = body.date;
                resBody.data = yield that.appService.getAccountExcel(dzf,bdzf,date, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取对账单明细表
        this.router.get(this.routerPrefix + "getAccountDetails", function *(context, next) {
            let resBody = {"success": true, "description": "获取往来对账单明细成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let urlParams = Util.parseGetParam(this.request.querystring);
                var dzf = urlParams.dzf;
                var bdzf = urlParams.bdzf;
                var date = urlParams.date;
                var pageNumber = urlParams.pageNumber;
                var pageSize = urlParams.pageSize;
                var type = urlParams.type;
                resBody.data = yield that.appService.getAccountDetails(dzf,bdzf,date,pageNumber,pageSize,type,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //获取Excel列表
        this.router.post(this.routerPrefix + "getDownloadList",koaBody,function *(context,next) {
            let resBody = {"success": true, "description": "Excel列表正在上传，请耐心等候"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let body = this.request.body;
                var pageSize = body.pageSize;
                var pageNumber = body.pageNumber;
                var title = body.title;
                var start_time = body.start_time;
                var end_time = body.end_time;
                var status = body.status;
                resBody.data = yield that.appService.getDownloadList(title,start_time,end_time,status,pageSize, pageNumber, token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });

        //删除Excel列表----每次向后台请求数据的同时，给后台返回token
        this.router.delete(this.routerPrefix + "deleteDownlistList",koaBody, function *(context, next) {
            let resBody = {"success": true, "description": "删除Excel成功"};
            try {
                var token = this.req.headers.token;//获取ajax token
                let urlParams = Util.parseGetParam(this.request.querystring);
                var uuid = urlParams.uuid;
                resBody.data = yield that.appService.deleteExcel(uuid,token);
            } catch (e) {
                resBody.success = false;
                resBody.description = (typeof e == "string") ? e : e.message;
            }
            this.body = resBody;
        });
    }
}


module.exports = AppController;