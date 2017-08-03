/**
 * Created by peng.xue on 2017/5/15.
 */
import {
    GET_ACCOUNT_ALL_CUSTOMER_NAME,
    ACTIVE_ACCOUNT_MODULE,
    REACTIVE_ACCOUNT_MODULE,
    GET_ACCOUNT_TABLE_DATA,
    ACCOUNT_DETAILS_LIST_CHANGE,
    ACCOUNT_DETAILS_LIST_PARAMS_CHANGE,
    PRIOR_SEARCH_PARAMS_CHANGE,
    ACCOUNT_TABLE_DATE_CHANGE,
    ACCOUNT_TABLE_DATA_CHANGE
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";
import {loadingChange} from "./Cost";

export const getAccountAllAdress = function (pageNumber,pageSize) {
    return (dispatch) => {
        let url = "/getAllAdress?pageNumber="+pageNumber+"&pageSize="+pageSize;
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                dispatch({
                    type:GET_ACCOUNT_ALL_CUSTOMER_NAME,
                    data:data
                })
            }else {
                dispatch({
                    type:GET_ACCOUNT_ALL_CUSTOMER_NAME,
                    data:[]
                });
                message.error(msg.description);
            }
        },function (msg) {
            dispatch({
                type:GET_ACCOUNT_ALL_CUSTOMER_NAME,
                data:[]
            });
            message.error(msg.description);
        })
    }
};

//处理下拉框内容随我输入动态变化的效果
export const changeAddressList = function (data,val,type) {
    let typeName = "";
    if(type === 1){  //type值1是对账单，2是被对账单
        typeName = ACTIVE_ACCOUNT_MODULE;
    }else if (type === 2){
        typeName = REACTIVE_ACCOUNT_MODULE;
    }
    if (undefined === val || null === val || "" === val) {
        val = "";
    }
    return {
        type:typeName,
        data:{addressList:data,selectValue:val}
    }
};

//处理下拉框内容随我输入动态变化的效果
export const changeDate = function (date) {
    return {
        type:ACCOUNT_TABLE_DATE_CHANGE,
        data:date
    }
};

//请求数据
export const getAccountReconciliation = function (dzf,bdzf,date) {
    return(dispatch)=>{
        let url = "/getAccountReconciliation?dzf="+dzf+"&bdzf="+bdzf+"&date="+date;
        if (undefined === dzf || null === dzf || "" === dzf){
            message.error("对账单位不能为空，请确认后输入!");
            return;
        }
        if (undefined === bdzf || null === bdzf || "" === bdzf){
            message.error("被对账单位不能为空，请确认后输入!");
            return;
        }
        if (undefined === date || null === date || "" === date){
            message.error("对账单截止日期不能为空，请确认后输入!");
            return;
        }
        dispatch({
            type:GET_ACCOUNT_TABLE_DATA,
            data:{loading:true}
        });
        let initData = {
            dzf_yiszk: 0,
            dzf_yufzk: 0,
            dzf_qtyisk: 0,
            dzf_yfzk: 0,
            dzf_yszk: 0,
            dzf_qtyfk: 0,
            dzf_zqzwhj: 0,
            bdzf_yiszk: 0,
            bdzf_yufzk: 0,
            bdzf_qtyisk: 0,
            bdzf_yfzk: 0,
            bdzf_yszk: 0,
            bdzf_qtyfk: 0,
            bdzf_zqzwhj: 0
        };
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                let priorSearchParams = {
                    dzf:dzf,
                    bdzf:bdzf,
                    date:date
                };
                dispatch({
                    type:PRIOR_SEARCH_PARAMS_CHANGE,
                    data:priorSearchParams
                });
                dispatch({
                    type:GET_ACCOUNT_TABLE_DATA,
                    data:{data:data,loading:false}
                })
            }else {
                dispatch({
                    type:GET_ACCOUNT_TABLE_DATA,
                    data:{data:initData,loading:false}
                });
                message.error(msg.description);
            }
        },function (msg) {
            dispatch({
                type:GET_ACCOUNT_TABLE_DATA,
                data:{data:initData,loading:false}
            });
            message.error(msg.description);
        })
    }
};

//获取Excel
export const getAccountExcel = function (dzf,bdzf,date) {
    return (dispatch) => {
        let url = "/getAccountExcel";
        if (undefined === dzf || null === dzf || "" === dzf){
            message.error("对账单位不能为空，请确认后输入!");
            return;
        }
        if (undefined === bdzf || null === bdzf || "" === bdzf){
            message.error("被对账单位不能为空，请确认后输入!");
            return;
        }
        if (undefined === date || null === date || "" === date){
            message.error("对账单截止日期不能为空，请确认后输入!");
            return;
        }
        let params = {
            dzf:dzf,
            bdzf:bdzf,
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

//有参数获取往来对账单的明细表
export const getAccountDetails = function (dzf,bdzf,date,pageNumber,pageSize,type) {
    return(dispatch)=>{
        let url = "/getAccountDetails?dzf="+dzf+"&bdzf="+bdzf+"&date="+date+"&pageNumber="+pageNumber+"&pageSize="+pageSize+"&type="+type;
        dispatch(loadingChange(true));
        let initData = {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
        };
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                dispatch(loadingChange(false));
                dispatch({
                    type:ACCOUNT_DETAILS_LIST_CHANGE,
                    data:data
                })
            }else {
                dispatch(loadingChange(false));
                dispatch({
                    type:ACCOUNT_DETAILS_LIST_CHANGE,
                    data:initData
                });
                message.error(msg.description);
            }
        },function (msg) {
            dispatch(loadingChange(false));
            dispatch({
                type:ACCOUNT_DETAILS_LIST_CHANGE,
                data:initData
            });
            message.error(msg.description);
        })
    }
};

export const setAccountDetailsParams = function (dzf,bdzf,date,type,count) {
    return (dispatch)=>{
        let data = {
            dzf: dzf,
            bdzf:bdzf,
            date:date,
            type:type,
            count:count
        };
        if(undefined === dzf || null === dzf || "" === dzf ||
            undefined === bdzf || null === bdzf || "" === bdzf ||
            undefined === date || null === date || "" === date ||
            undefined === type || null === type || "" === type ){
            message.error("往来对账单项目内容为空，请请求数据后重试");
            return
        }
        dispatch({
            type:ACCOUNT_DETAILS_LIST_PARAMS_CHANGE,
            data:data
        });
        location.hash = "/ledger/accountReconcileDetails";
    }
};

export const clearAccountDetailsTable = function () {
    let data = {
        pageNumber: 1,
        pageSize:10,
        total:0,
        count:null,
        detail:[],
        loading:false
    };
    return {
        type:ACCOUNT_DETAILS_LIST_CHANGE,
        data:data
    }
};

export const clearAccountTable = function () {
    let data = {
        activeCompany:{
            selectValue:"",
            isModalShow:false,
            addressList:[],
            selectedCompany:[]
        },
        reactiveCompany:{
            selectValue:"",
            isModalShow:false,
            addressList:[],
            selectedCompany:[]
        },
        priorSearchParams:{
            dzf:"",
            bdzf:"",
            date:""
        },
        date:"",
        accountTable:{
            loading:false,
            data:{
                dzf_yiszk: 0,
                dzf_yufzk: 0,
                dzf_qtyisk: 0,
                dzf_yfzk: 0,
                dzf_yszk: 0,
                dzf_qtyfk: 0,
                dzf_zqzwhj: 0,
                bdzf_yiszk: 0,
                bdzf_yufzk: 0,
                bdzf_qtyisk: 0,
                bdzf_yfzk: 0,
                bdzf_yszk: 0,
                bdzf_qtyfk: 0,
                bdzf_zqzwhj: 0
            }
        }
    };
    return {
        type:ACCOUNT_TABLE_DATA_CHANGE,
        data:data
    }
};