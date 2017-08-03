/**
 * Created by peng.xue on 2017/5/9.
 */
import {
    PAYABLE_DATA_CHANGE,
    PAYABLE_SEARCH_PARAMS_CHANGE,
    PAY_IN_ADVANCE_DATA_CHANGE,
    PAY_IN_ADVANCE_SEARCH_PARAMS_CHANGE,
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";
import {loadingChange,initDataRecover} from "./Cost";

//应付模块
export const getPayableList = function (pageNumber,pageSize,bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getPayableList";
        if (undefined === gs || null === gs || "" === gs){
            message.error("公司不能为空，请确认后输入!");
            return;
        }
        if (undefined === bz || null === bz || "" === bz){
            message.error("币种不能为空，请确认后输入!");
            return;
        }
        if (undefined === kmz || null === kmz || "" === kmz){
            message.error("科目账不能为空，请确认后输入!");
            return;
        }
        if (undefined === date || null === date || "" === date){
            message.error("截止日期不能为空，请确认后输入!");
            return;
        }
        let params = {
            bz:bz,
            gs:gs,
            khbm:khbm,
            kmz:kmz,
            mxz:mxz,
            date:date,
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                data.priorSearchParams ={
                    bz:bz,
                    gs:gs,
                    khbm:khbm,
                    kmz:kmz,
                    mxz:mxz,
                    date:date,
                    pageNumber: pageNumber,
                    pageSize: pageSize
                };
                dispatch(loadingChange(false));
                dispatch({
                    type:PAYABLE_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(PAYABLE_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(PAYABLE_DATA_CHANGE));
        })
    }
};

export const getPayableExcel = function (bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getPayableExcel";
        if (undefined === gs || null === gs || "" === gs){
            message.error("表格内容为空，请查询后再导出！");
            return;
        }
        if (undefined === bz || null === bz || "" === bz){
            message.error("表格内容为空，请查询后再导出！");
            return;
        }
        if (undefined === kmz || null === kmz || "" === kmz){
            message.error("表格内容为空，请查询后再导出！");
            return;
        }
        if (undefined === date || null === date || "" === date){
            message.error("表格内容为空，请查询后再导出！");
            return;
        }
        let params = {
            bz:bz,
            gs:gs,
            khbm:khbm,
            kmz:kmz,
            mxz:mxz,
            date:date
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
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

export const changePayableSearchParams = function (data) {
    return {
        type:PAYABLE_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

//预付模块
export const getPayInAdvanceList = function (pageNumber,pageSize,bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getPayInAdvanceList";
        if (undefined === gs || null === gs || "" === gs){
            message.error("公司不能为空，请确认后输入!");
            return;
        }
        if (undefined === bz || null === bz || "" === bz){
            message.error("币种不能为空，请确认后输入!");
            return;
        }
        if (undefined === kmz || null === kmz || "" === kmz){
            message.error("科目账不能为空，请确认后输入!");
            return;
        }
        if (undefined === date || null === date || "" === date){
            message.error("截止日期不能为空，请确认后输入!");
            return;
        }
        let params = {
            bz:bz,
            gs:gs,
            khbm:khbm,
            kmz:kmz,
            mxz:mxz,
            date:date,
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                data.priorSearchParams ={
                    bz:bz,
                    gs:gs,
                    khbm:khbm,
                    kmz:kmz,
                    mxz:mxz,
                    date:date,
                    pageNumber: pageNumber,
                    pageSize: pageSize
                };
                dispatch(loadingChange(false));
                dispatch({
                    type:PAY_IN_ADVANCE_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(PAY_IN_ADVANCE_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(PAY_IN_ADVANCE_DATA_CHANGE));
        })
    }
};

export const getPayInAdvanceExcel = function (bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getPayInAdvanceExcel";
        if (undefined === gs || null === gs || "" === gs){
            message.error("公司不能为空，请确认后输入!");
            return;
        }
        if (undefined === bz || null === bz || "" === bz){
            message.error("币种不能为空，请确认后输入!");
            return;
        }
        if (undefined === kmz || null === kmz || "" === kmz){
            message.error("科目账不能为空，请确认后输入!");
            return;
        }
        if (undefined === date || null === date || "" === date){
            message.error("总账日期不能为空，请确认后输入!");
            return;
        }
        let params = {
            bz:bz,
            gs:gs,
            khbm:khbm,
            kmz:kmz,
            mxz:mxz,
            date:date
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
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

export const changePayInAdvanceSearchParams = function (data) {
    return {
        type:PAY_IN_ADVANCE_SEARCH_PARAMS_CHANGE,
        data:data
    }
};