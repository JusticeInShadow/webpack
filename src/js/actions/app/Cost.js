/**
 * Created by peng.xue on 2017/5/3.
 */
import {
    GOODS_SOLD_DATA_CHANGE,
    GOODS_SOLD_SEARCH_PARAMS_CHANGE,
    RAW_STOCK_DATA_CHANGE,
    RAW_STOCK_SEARCH_PARAMS_CHANGE,
    COMMODITY_STOCKS_DATA_CHANGE,
    COMMODITY_STOCKS_SEARCH_PARAMS_CHANGE,
    PROCESSING_PRODUCTS_DATA_CHANGE,
    PROCESSING_PRODUCTS_SEARCH_PARAMS_CHANGE,
    LOADING_CHANGE,
    COMPANY_NAME_CHANGE
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";

//goodsSold模块
export const getGoodsSold = function (pageNumber,pageSize,co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getGoodsSold";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: pageNumber,
            pageSize: pageSize,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                data.priorSearchParams ={
                    businessDate:businessDate,
                    co: co,
                    mcu: mcu,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    type: 0
                };
                dispatch(loadingChange(false));
                dispatch({
                    type:GOODS_SOLD_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(GOODS_SOLD_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(GOODS_SOLD_DATA_CHANGE));
        })
    }
};

export const getGoodsSoldExcel = function (co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getGoodsSoldExcel";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: 1,
            pageSize: 10,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
/*                location.href = msg.data.data;*/
                dispatch(loadingChange(false));
                message.success(msg.description)
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
        })
    }
};

export const changeGoodsSoldSearchParams = function (data) {
    return {
        type:GOODS_SOLD_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

//rawStock模块
export const getRawStock = function (pageNumber,pageSize,co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getRawStock";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: pageNumber,
            pageSize: pageSize,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                data.priorSearchParams ={
                    businessDate:businessDate,
                    co: co,
                    mcu: mcu,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    type: 0
                };
                dispatch(loadingChange(false));
                dispatch({
                    type:RAW_STOCK_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(RAW_STOCK_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(RAW_STOCK_DATA_CHANGE));
        })
    }
};

export const getRawStockExcel = function (co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getRawStockExcel";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: 1,
            pageSize: 10,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
            /*    location.href = msg.data.data;*/
                dispatch(loadingChange(false));
                message.success(msg.description)
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
        })
    }
};

export const changeRawStockSearchParams = function (data) {
    return {
        type:RAW_STOCK_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

//库存商品模块
export const getCommodityStocks = function (pageNumber,pageSize,co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getCommodityStocks";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: pageNumber,
            pageSize: pageSize,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                data.priorSearchParams ={
                    businessDate:businessDate,
                    co: co,
                    mcu: mcu,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    type: 0
                };
                dispatch(loadingChange(false));
                dispatch({
                    type:COMMODITY_STOCKS_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(COMMODITY_STOCKS_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(COMMODITY_STOCKS_DATA_CHANGE));
        })
    }
};

export const getCommodityStocksExcel = function (co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getCommodityStocksExcel";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: 1,
            pageSize: 10,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
           /*     location.href = msg.data.data;*/
                dispatch(loadingChange(false));
                message.success(msg.description)
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
        })
    }
};

export const changeCommodityStocksSearchParams = function (data) {
    return {
        type:COMMODITY_STOCKS_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

//在制品模块
export const getProcessingProducts = function (pageNumber,pageSize,co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getProcessingProducts";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: pageNumber,
            pageSize: pageSize,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                data.priorSearchParams ={
                    businessDate:businessDate,
                    co: co,
                    mcu: mcu,
                    pageNumber: pageNumber,
                    pageSize: pageSize,
                    type: 0
                };
                dispatch(loadingChange(false));
                dispatch({
                    type:PROCESSING_PRODUCTS_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(PROCESSING_PRODUCTS_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(PROCESSING_PRODUCTS_DATA_CHANGE));
        })
    }
};

export const getProcessingProductsExcel = function (co,mcu,businessDate) {
    return (dispatch) => {
        let url = "/getProcessingProductsExcel";
        if (undefined === businessDate || null === businessDate || "" === businessDate){
            message.error("所属期不能为空，请确认后输入!");
            return;
        }
        let params = {
            businessDate:businessDate,
            co: co,
            mcu: mcu,
            pageNumber: 1,
            pageSize: 10,
            type: 0
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
            /*    location.href = msg.data.data;*/
                dispatch(loadingChange(false));
                message.success(msg.description)
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
        })
    }
};

export const changeProcessingProductsSearchParams = function (data) {
    return {
        type:PROCESSING_PRODUCTS_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

//通用
export const loadingChange = function (flag) {
    return {
        type:LOADING_CHANGE,
        data:flag
    }
};

export const initDataRecover = function (con) {
    let data = {
        pageNumber: 1,
        pageSize:10,
        total:0,
        count:[],
        detail:[],
        loading:false
    };
    return {
        type:con,
        data:data
    }
};

export const getCompanyNameByCode = function (code) {
    return (dispatch) => {
        let url = "/getCompanyName?code="+code;
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                if (undefined === data || null === data || "" === data){
                    message.error("无效的公司编码！");
                    dispatch({
                        type:COMPANY_NAME_CHANGE,
                        data:{company:"",preCompanyCode:code}
                    })
                }else {
                    // message.success("公司名称获取成功！");
                    dispatch({
                        type:COMPANY_NAME_CHANGE,
                        data:{company:data,preCompanyCode:code}
                    })
                }
            }else {
                dispatch({
                    type:COMPANY_NAME_CHANGE,
                    data:{company:"",preCompanyCode:code}
                });
                message.error(msg.description);
            }
        },function (msg) {
            dispatch({
                type:COMPANY_NAME_CHANGE,
                data:{company:"",preCompanyCode:code}
            });
            message.error(msg.description);
        })
    }
};
export const clearCompanyName = function () {
    return {
        type:COMPANY_NAME_CHANGE,
        data:{company:"",preCompanyCode:"",count:[],detail:[],total:0,pageNumber: 1,}
    }
};
