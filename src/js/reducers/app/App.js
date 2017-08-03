/**
 * portal reducer
 * Created by Xufeng.Yang on 2016/12/21.
 */
import {combineReducers} from 'redux-immutable';
import {
    IS_MENU_LEFT_VISIBLE,
    MY_USER_INFO_CHANGE,
    IS_MENU_VISIBLE,
    GOODS_SOLD_DATA_CHANGE,
    MAIN_ASIDE_MENU_CHANGE,
    GOODS_SOLD_SEARCH_PARAMS_CHANGE,
    COMMON_INFO_DATA_CHANGE,
    LOADING_CHANGE,
    RAW_STOCK_DATA_CHANGE,
    RAW_STOCK_SEARCH_PARAMS_CHANGE,
    COMMODITY_STOCKS_DATA_CHANGE,
    COMMODITY_STOCKS_SEARCH_PARAMS_CHANGE,
    PROCESSING_PRODUCTS_DATA_CHANGE,
    PROCESSING_PRODUCTS_SEARCH_PARAMS_CHANGE,
    COMPANY_NAME_CHANGE,
    CUSTOMER_NAME_CHANGE,
    IS_ADDRESS_MODEL_SHOW,
    GET_SELECT_RESULT,
    GET_ALL_CUSTOMER_NAME,
    SELECT_COMPANY_CHANGE,
    SELECT_VALUE_CHANGE,
    DOWNLOAD_LIST_CHANGE,
    RECEIVEABLE_DATA_CHANGE,
    RECEIVEABLE_SEARCH_PARAMS_CHANGE,
    RECEIVE_IN_ADVANCE_DATA_CHANGE,
    RECEIVE_IN_ADVANCE_SEARCH_PARAMS_CHANGE,
    PAYABLE_DATA_CHANGE,
    PAYABLE_SEARCH_PARAMS_CHANGE,
    PAY_IN_ADVANCE_DATA_CHANGE,
    PAY_IN_ADVANCE_SEARCH_PARAMS_CHANGE,
    SELECT_COMPANY_LIST_CHANGE,
    GET_ACCOUNT_ALL_CUSTOMER_NAME,
    ACTIVE_ACCOUNT_MODULE,
    REACTIVE_ACCOUNT_MODULE,
    GET_ACCOUNT_TABLE_DATA,
    PRIOR_SEARCH_PARAMS_CHANGE,
    ACCOUNT_TABLE_DATE_CHANGE,
    ACCOUNT_TABLE_DATA_CHANGE,
    ACCOUNT_DETAILS_LIST_CHANGE,
    ACCOUNT_DETAILS_LIST_PARAMS_CHANGE
} from '../../constants/ActionConstant'
import {getUser,getMainSider,getAccount} from '../../utils/StorageUtil';
import {getNowMonth} from "../../utils/Util"

function common(state, action) {
    state = state || {
            user: getUser(), //用户信息
            mciHeight:-1          //默认-1，不计算
        };
    if (MY_USER_INFO_CHANGE == action.type) {
        return Object.assign({}, state, {user: action.data});
    } else if (COMMON_INFO_DATA_CHANGE == action.type) {
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//右上角小菜单
function showMenu(state, action) {
    state = state || {
            flag: false
        };
    if (IS_MENU_VISIBLE == action.type) {
        return Object.assign({}, state, {flag: action.data});
    } else {
        return state;
    }
}

//公共头部导航
function mainSider(state, action) {
    state = state || {
            selectedKey: [],//undefined === getMainSider() || null === getMainSider() || "" === getMainSider()? [] : getMainSider().selectedKey ,
            openKeys: []//undefined === getMainSider() || null === getMainSider() || "" === getMainSider()? [] : getMainSider().openKeys ,
        };
    if (MAIN_ASIDE_MENU_CHANGE == action.type) {
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
    return state;
}

//折叠左侧菜单栏
function showLeftMenu(state, action) {
    state = state || {
            flag: false
        };
    if (IS_MENU_LEFT_VISIBLE == action.type) {
        return Object.assign({}, state, {flag: action.data});
    } else {
        return state;
    }
}

//发出商品
function goodsSold(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                co:"",
                mcu:"",
                businessDate: ""
            },
            priorSearchParams:{
                co:"",
                mcu:"",
                businessDate:"",
                pageNumber: "",
                pageSize: "",
                type: 0
            },
            company:"",
            preCompanyCode:""
        };
    if (action.type == GOODS_SOLD_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == GOODS_SOLD_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//原材料
function rawStock(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                co:"",
                mcu:"",
                businessDate:""
            },
            priorSearchParams:{
                co:"",
                mcu:"",
                businessDate:"",
                pageNumber: "",
                pageSize: "",
                type: 0
            },
            company:"",
            preCompanyCode:""
        };
    if (action.type == RAW_STOCK_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == RAW_STOCK_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//库存商品
function commodityStocks(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                co:"",
                mcu:"",
                businessDate:""
            },
            priorSearchParams:{
                co:"",
                mcu:"",
                businessDate:"",
                pageNumber: "",
                pageSize: "",
                type: 0
            },
            company:"",
            preCompanyCode:""
        };
    if (action.type == COMMODITY_STOCKS_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == COMMODITY_STOCKS_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//在制品
function processingProducts(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                co:"",
                mcu:"",
                businessDate:""
            },
            priorSearchParams:{
                co:"",
                mcu:"",
                businessDate:"",
                pageNumber: "",
                pageSize: "",
                type: 0
            },
            company:"",
            preCompanyCode:""
        };
    if (action.type == PROCESSING_PRODUCTS_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == PROCESSING_PRODUCTS_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//应收余额表
function receivable(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:1122,
                mxz:"",
                date:""
            },
            priorSearchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:1122,
                mxz:"",
                date:"",
                pageNumber: 1,
                pageSize: 10
            },
            company:"",
            preCompanyCode:"",
            customer:"",
            preCustomerCode:"",
            addressList:[],
            orginAddressList:getAccount() || [],
            isModalShow:false,
            selectedCompany:[],
            selectValue:""
        };
    if (action.type == RECEIVEABLE_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == RECEIVEABLE_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == CUSTOMER_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == GET_ACCOUNT_ALL_CUSTOMER_NAME){
        return Object.assign({}, state, {orginAddressList:action.data});
    } else if(action.type == IS_ADDRESS_MODEL_SHOW){
        return Object.assign({}, state, {isModalShow:action.data});
    } else if(action.type == GET_SELECT_RESULT){
        return Object.assign({}, state, action.data);
    } else if(action.type == SELECT_VALUE_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//预收余额表
function receiveInAdvance(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:2203,
                mxz:"",
                date:""
            },
            priorSearchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:2203,
                mxz:"",
                date:"",
                pageNumber: 1,
                pageSize: 10
            },
            company:"",
            preCompanyCode:"",
            customer:"",
            preCustomerCode:"",
            addressList:[],
            orginAddressList:getAccount() || [],
            isModalShow:false,
            selectedCompany:[],
            selectValue:""
        };
    if (action.type == RECEIVE_IN_ADVANCE_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == RECEIVE_IN_ADVANCE_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == CUSTOMER_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == GET_ACCOUNT_ALL_CUSTOMER_NAME){
        return Object.assign({}, state, {orginAddressList:action.data});
    } else if(action.type == IS_ADDRESS_MODEL_SHOW){
        return Object.assign({}, state, {isModalShow:action.data});
    } else if(action.type == GET_SELECT_RESULT){
        return Object.assign({}, state, action.data);
    } else if(action.type == SELECT_VALUE_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//应付余额表
function payable(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:2202,
                mxz:"",
                date:""
            },
            priorSearchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:2202,
                mxz:"",
                date:"",
                pageNumber: 1,
                pageSize: 10
            },
            company:"",
            preCompanyCode:"",
            customer:"",
            preCustomerCode:"",
            addressList:[],
            orginAddressList:getAccount() || [],
            isModalShow:false,
            selectedCompany:[],
            selectValue:""
        };
    if (action.type == PAYABLE_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == PAYABLE_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == GET_ALL_CUSTOMER_NAME){
        return Object.assign({}, state, action.data);
    } else if(action.type == CUSTOMER_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == GET_ACCOUNT_ALL_CUSTOMER_NAME){
        return Object.assign({}, state, {orginAddressList:action.data});
    } else if(action.type == IS_ADDRESS_MODEL_SHOW){
        return Object.assign({}, state, {isModalShow:action.data});
    } else if(action.type == GET_SELECT_RESULT){
        return Object.assign({}, state, action.data);
    } else if(action.type == SELECT_VALUE_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//预付余额表
function payInAdvance(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:1123,
                mxz:"",
                date:""
            },
            priorSearchParams:{
                bz:"",
                gs:"",
                khbm:"",
                kmz:1123,
                mxz:"",
                date:"",
                pageNumber: 1,
                pageSize: 10
            },
            company:"",
            preCompanyCode:"",
            customer:"",
            preCustomerCode:"",
            addressList:[],
            orginAddressList:getAccount() || [],
            isModalShow:false,
            selectedCompany:[],
            selectValue:""
        };
    if (action.type == PAY_IN_ADVANCE_DATA_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == PAY_IN_ADVANCE_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == COMPANY_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == CUSTOMER_NAME_CHANGE){
        return Object.assign({}, state, action.data);
    } else if(action.type == GET_ACCOUNT_ALL_CUSTOMER_NAME){
        return Object.assign({}, state, {orginAddressList:action.data});
    } else if(action.type == IS_ADDRESS_MODEL_SHOW){
        return Object.assign({}, state, {isModalShow:action.data});
    } else if(action.type == GET_SELECT_RESULT){
        return Object.assign({}, state, action.data);
    } else if(action.type == SELECT_VALUE_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//选公司组件
function selectModal(state, action) {
    state = state || {
            selectCompany:[],
            selectList:[]
        };
    if(action.type == SELECT_COMPANY_LIST_CHANGE){
        return Object.assign({}, state, {selectList:action.data});
    }  else if(action.type == SELECT_COMPANY_CHANGE){
        return Object.assign({}, state, {selectCompany:action.data});
    } else {
        return state;
    }
}

//往来对账单
function account(state, action) {
    state = state || {
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
            orginAddressList:getAccount() || [],
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
    if(action.type == ACTIVE_ACCOUNT_MODULE){
        let activeCompany = Object.assign({},state.activeCompany,action.data);
        return Object.assign({}, state, {activeCompany:activeCompany});
    } else if(action.type == REACTIVE_ACCOUNT_MODULE){
        let reactiveCompany = Object.assign({},state.reactiveCompany,action.data);
        return Object.assign({}, state, {reactiveCompany:reactiveCompany});
    } else if(action.type == GET_ACCOUNT_ALL_CUSTOMER_NAME){
        return Object.assign({}, state, {orginAddressList:action.data});
    } else if(action.type == GET_ACCOUNT_TABLE_DATA){
        let accountTable = Object.assign({},state.accountTable,action.data);
        return Object.assign({}, state, {accountTable:accountTable});
    } else if(action.type == PRIOR_SEARCH_PARAMS_CHANGE){
        return Object.assign({}, state, {priorSearchParams:action.data});
    } else if(action.type == ACCOUNT_TABLE_DATE_CHANGE){
        return Object.assign({}, state, {date:action.data});
    } else if(action.type == ACCOUNT_TABLE_DATA_CHANGE){
        return Object.assign({}, state, action.data);
    } else {
        return state;
    }
}

//往来对账单明细
function accountDetails(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            searchParams:{
                dzf:"",
                bdzf:"",
                date:"",
                type:0,
                count:0
            }
        };
    if (action.type == ACCOUNT_DETAILS_LIST_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else if(action.type == ACCOUNT_DETAILS_LIST_PARAMS_CHANGE){
        return Object.assign({}, state, {searchParams:action.data});
    } else {
        return state;
    }
}

//下载报告一览
function downloadList(state, action) {
    state = state || {
            pageNumber: 1,
            pageSize:10,
            total:0,
            count:[],
            detail:[],
            loading:false,
            tableKey:"",
            searchParams:{
                title:"",
                start_time:"",
                end_time:"",
                status:null
            }
        };
    if (action.type == DOWNLOAD_LIST_CHANGE) {
        return Object.assign({}, state, action.data);
    } else if(action.type == LOADING_CHANGE){
        return Object.assign({}, state, {loading:action.data});
    } else {
        return state;
    }
}

export let reducer = combineReducers({
    common: common,//公共信息
    showMenu: showMenu,
    mainSider:mainSider,
    showLeftMenu:showLeftMenu,
    goodsSold:goodsSold, //发出商品
    rawStock:rawStock,    //原材料
    commodityStocks:commodityStocks,  //库存商品
    processingProducts:processingProducts,  //在制品
    receivable:receivable,   //应收余额表
    receiveInAdvance:receiveInAdvance,   //预收余额表
    payable:payable,   //应付余额表
    payInAdvance:payInAdvance,   //预付余额表
    downloadList:downloadList,   //下载列表
    selectModal:selectModal,    //选公司组件
    account:account ,      //往来对账单
    accountDetails:accountDetails,     //往来对账单明细
});

