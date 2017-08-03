/**
 * Created by peng.xue on 2017/5/9.
 */
import {
    RECEIVEABLE_DATA_CHANGE,
    RECEIVEABLE_SEARCH_PARAMS_CHANGE,
    RECEIVE_IN_ADVANCE_DATA_CHANGE,
    RECEIVE_IN_ADVANCE_SEARCH_PARAMS_CHANGE,
    CUSTOMER_NAME_CHANGE,
    GET_ALL_CUSTOMER_NAME,
    IS_ADDRESS_MODEL_SHOW,
    GET_SELECT_RESULT,
    SELECT_VALUE_CHANGE
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";
import {loadingChange,initDataRecover} from "./Cost";

//应收模块
export const getReceivableList = function (pageNumber,pageSize,bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getReceivableList";
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
                    type:RECEIVEABLE_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(RECEIVEABLE_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(RECEIVEABLE_DATA_CHANGE));
        })
    }
};

export const getReceivableExcel = function (bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getReceivableExcel";
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
            date:date,
            pageNumber: 1,
            pageSize: 10
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

export const changeReceivableSearchParams = function (data) {
    return {
        type:RECEIVEABLE_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

//预收模块
export const getReceiveInAdvanceList = function (pageNumber,pageSize,bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getReceiveInAdvanceList";
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
                    type:RECEIVE_IN_ADVANCE_DATA_CHANGE,
                    data:data
                });
            }else {
                message.error(msg.description);
                dispatch(loadingChange(false));
                dispatch(initDataRecover(RECEIVE_IN_ADVANCE_DATA_CHANGE));
            }
        },function (msg) {
            message.error(msg.description);
            dispatch(loadingChange(false));
            dispatch(initDataRecover(RECEIVE_IN_ADVANCE_DATA_CHANGE));
        })
    }
};

export const getReceiveInAdvanceExcel = function (bz,gs,khbm,kmz,mxz,date) {
    return (dispatch) => {
        let url = "/getReceiveInAdvanceExcel";
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
            date:date,
            pageNumber: 1,
            pageSize: 10
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

export const changeReceiveInAdvanceSearchParams = function (data) {
    return {
        type:RECEIVE_IN_ADVANCE_SEARCH_PARAMS_CHANGE,
        data:data
    }
};

export const getCustomerNameByCode = function (code) {
    return (dispatch) => {
        let url = "/getCustomerName?code="+code;
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                if (undefined === data || null === data || "" === data){
                    message.error("无效的客户编码！");
                    dispatch({
                        type:CUSTOMER_NAME_CHANGE,
                        data:{customer:"",preCustomerCode:code}
                    })
                }else {
                    // message.success("公司名称获取成功！");
                    dispatch({
                        type:CUSTOMER_NAME_CHANGE,
                        data:{customer:data,preCustomerCode:code}
                    })
                }
            }else {
                dispatch({
                    type:CUSTOMER_NAME_CHANGE,
                    data:{customer:"",preCustomerCode:code}
                });
                message.error(msg.description);
            }
        },function (msg) {
            dispatch({
                type:CUSTOMER_NAME_CHANGE,
                data:{customer:"",preCustomerCode:code}
            });
            message.error(msg.description);
        })
    }
};
export const clearCustomerName = function () {
    return {
        type:CUSTOMER_NAME_CHANGE,
        data:{customer:"",preCustomerCode:"",company:"",preCompanyCode:"",count:[],detail:[],total:0,pageNumber: 1}
    }
};

export const getAllAdress = function (pageNumber,pageSize) {
    return (dispatch) => {
        let url = "/getAllAdress?pageNumber="+pageNumber+"&pageSize="+pageSize;
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                dispatch({
                    type:GET_ALL_CUSTOMER_NAME,
                    data:{addressList:data,orginAddressList:data}
                })
            }else {
                dispatch({
                    type:GET_ALL_CUSTOMER_NAME,
                    data:{addressList:[],orginAddressList:[]}
                });
                message.error(msg.description);
            }
        },function (msg) {
            dispatch({
                type:GET_ALL_CUSTOMER_NAME,
                data:{addressList:[],orginAddressList:[]}
            });
            message.error(msg.description);
        })
    }
};

export const changeAddressList = function (data,val) {
    return {
        type:SELECT_VALUE_CHANGE,
        data:{addressList:data,selectValue:val}
    }
};

export const changeAddressModel = function (data) {
    return {
        type:IS_ADDRESS_MODEL_SHOW,
        data:data
    }
};

export const getModalResult = function (data) {
    let selectValue;
    if (data.length>0){
        selectValue = data[0].an8 + "  " + data[0].alph;
    }
    return {
        type:GET_SELECT_RESULT,
        data:{selectValue:selectValue,isModalShow:false}
    }
};