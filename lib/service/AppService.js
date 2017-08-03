/**
 * ra service接口调用
 * Created by xufeng.yang on 2016/5/17.
 */
'use strict';
var BaseService = require("./BaseService");
var co = require("co");
var OSS = require('ali-oss');
var Util = require("../utils/Util");
let request = require("co-request");
var HttpClientUtil = require("../utils/HttpClientUtil");
class AppService extends BaseService {
    constructor(logger, uriPrefix) {
        super(logger);
        this.uriPrefix = uriPrefix;
        this.client = new OSS({
            region: 'oss-cn-hangzhou',
            accessKeyId: 'LTAIe16h5f8RZZsB',
            accessKeySecret: 'A75yGUQdRPgUBR4UYF3QMkymYtVJJ5',
            bucket: 'hcsoss01'
        });
        this.logger = logger;
    }

    /**
     *分页获取发出商品列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getRawStock(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/rawMaterial/findMaterials";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取发出商品Excel
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getRawStockExcel(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/rawMaterial/material-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取原材料列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getGoodsSold(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/sendCommodity/findCommodity";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取原材料Excel
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getGoodsSoldExcel(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/sendCommodity/commodity-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取原材料列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getCommodityStocks(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/stock/findStocks";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取原材料Excel
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getCommodityStocksExcel(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/stock/stocks-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取原材料列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getProcessingProducts(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/process/findProcess";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取原材料Excel
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param businessDate
     * @param comp
     * @param mcu
     * @param local
     * @returns {*}
     */
    * getProcessingProductsExcel(businessDate,comp,mcu,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                businessDate:businessDate,
                co:comp,
                mcu:mcu,
                pageNumber:pageNumber,
                pageSize:pageSize,
                type:0
            };
            let url = that.uriPrefix + "/api/process/process-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取应收余额的列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param bz
     * @param gs
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getReceivableList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                date:date,
                pageNumber:pageNumber,
                pageSize:pageSize,
                reportType:1,
                type:1
            };
            let url = that.uriPrefix + "/api/balance/findBalances";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取应收余额的Excel
     * @param bz
     * @param gs
     * @param token
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getReceivableExcel(bz,gs,khbm,kmz, mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                crty:0,
                date:date,
                fy:0,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                pageNumber:1,
                pageSize:10,
                pn:0,
                reportType:1,
                type:1
            };
            let url = that.uriPrefix + "/api/balance/balances-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取预收余额列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param bz
     * @param gs
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getReceiveInAdvanceList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                date:date,
                pageNumber:pageNumber,
                pageSize:pageSize,
                reportType:3,
                type:2
            };
            let url = that.uriPrefix + "/api/balance/findBalances";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取预收余额的Excel
     * @param bz
     * @param gs
     * @param token
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getReceiveInAdvanceExcel(bz,gs,khbm,kmz, mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                crty:0,
                date:date,
                fy:0,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                pageNumber:1,
                pageSize:10,
                pn:0,
                reportType:3,
                type:2
            };
            let url = that.uriPrefix + "/api/balance/balances-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取应付余额的列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param bz
     * @param gs
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getPayableList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                date:date,
                pageNumber:pageNumber,
                pageSize:pageSize,
                reportType:2,
                type:2
            };
            let url = that.uriPrefix + "/api/balance/findBalances";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取应付余额的Excel
     * @param bz
     * @param gs
     * @param token
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getPayableExcel(bz,gs,khbm,kmz, mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                crty:0,
                date:date,
                fy:0,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                pageNumber:1,
                pageSize:10,
                pn:0,
                reportType:2,
                type:2
            };
            let url = that.uriPrefix + "/api/balance/balances-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *分页获取预付余额列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param bz
     * @param gs
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @param locale
     * @returns {*}
     */
    * getPayInAdvanceList(pageSize,pageNumber,bz,gs,khbm,kmz,mxz,date, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                date:date,
                pageNumber:pageNumber,
                pageSize:pageSize,
                reportType:4,
                type:1
            };
            let url = that.uriPrefix + "/api/balance/findBalances";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *获取预付余额的Excel
     * @param token
     * @param bz
     * @param gs
     * @param khbm
     * @param kmz
     * @param mxz
     * @param date
     * @returns {*}
     */
    * getPayInAdvanceExcel(bz,gs,khbm,kmz, mxz,date,token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                bz:bz,
                crty:0,
                date:date,
                fy:0,
                gs:gs,
                khbm:khbm,
                kmz:kmz,
                mxz:mxz,
                pageNumber:1,
                pageSize:10,
                pn:0,
                reportType:4,
                type:1
            };
            let url = that.uriPrefix + "/api/balance/balances-excel";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *根据公司编码获取公司名称
     * @param code
     * @param token
     * @param locale
     * @returns {*}
     */
    * getCompanyName(code, token, locale) {
        let that = this;
        return co(function *() {
            let url = that.uriPrefix + "/api/company/getCompanyName?code="+code;
            let data = yield HttpClientUtil.getFormJSON(url, token, locale);
            let name = data.companyName;
            return name;
        });
    }
    /**
     *根据客户编码获取客户名称
     * @param pageNumber
     * @param pageSize
     * @param token
     * @param locale
     * @returns {*}
     */
    * getAllAdress(pageNumber,pageSize, token, locale) {
        let that = this;
        return co(function *() {
            let url = that.uriPrefix + "/api/company/getAllAdress?pageNumber="+pageNumber+"&pageSize="+pageSize;
            let data = yield HttpClientUtil.getFormJSON(url, token, locale);
            return data;
        });
    }
    /**
     *根据客户编码获取客户名称
     * @param dzf
     * @param bdzf
     * @param date
     * @param token
     * @param locale
     * @returns {*}
     */
    * getAccountReconciliation(dzf,bdzf,date,token, locale) {
        let that = this;
        return co(function *() {
            let url = that.uriPrefix + "/api/statement/findStatement?dzf="+dzf+"&bdzf="+bdzf+"&date="+date;
            let data = yield HttpClientUtil.getFormJSON(url, token, locale);
            return data;
        });
    }
    /**
     *获取往来对账单Excel
     * @param token
     * @param dzf
     * @param bdzf
     * @param date
     * @returns {*}
     */
    * getAccountExcel(dzf,bdzf,date,token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                dzf:dzf,
                bdzf:bdzf,
                date:date,
            };
            let url = that.uriPrefix + "/api/statement/statement-excel";
            let data = yield HttpClientUtil.postFormJSON(url, params, token);
            return data;
        });
    }
    /**
     *根据客户编码获取客户名称
     * @param dzf
     * @param bdzf
     * @param date
     * @param pageSize
     * @param pageNumber
     * @param type
     * @param token
     * @param locale
     * @returns {*}
     */
    * getAccountDetails(dzf,bdzf,date,pageNumber,pageSize,type,token, locale) {
        let that = this;
        return co(function *() {
            let url = that.uriPrefix + "/api/statement/findStatementDetail?dzf="+dzf+"&bdzf="+bdzf+"&date="+date+"&pageNumber="+pageNumber+"&pageSize="+pageSize+"&type="+type;
            let data = yield HttpClientUtil.getFormJSON(url, token, locale);
            return data;
        });
    }
    /**
     *分页获取原材料列表
     * @param pageSize
     * @param pageNumber
     * @param token
     * @param title
     * @param start_time
     * @param end_time
     * @param locale
     * @returns {*}
     */
    * getDownloadList(title,start_time,end_time,status,pageSize, pageNumber, token, locale) {
        let that = this;
        return co(function *() {
            let params = {
                title:title,
                start_time:start_time,
                end_time:end_time,
                pageNumber:pageNumber,
                pageSize:pageSize,
                status:status
            };
            let url = that.uriPrefix + "/api/task/findTasks";
            let data = yield HttpClientUtil.postBodyJSON(url, params, token);
            return data;
        });
    }
    /**
     *删除应用
     * @param title
     * @param describtion
     * @param class_name
     * @param domain_name
     * @param displayOrder
     * @param status
     * @param app_flag
     */
    * deleteExcel(uuid,token){
        let that = this;
        return co(function *() {
            let url = that.uriPrefix + "/api/task/"+uuid;
            let data = yield HttpClientUtil.deleteFormJSON(url,{}, token);
            return data;
        })
    }
}
module.exports = AppService;