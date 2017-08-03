/**
 * Created by Jingjing.Mu on 2017/1/17.
 */
import {
    MAIN_HEADER_NAV_CHANGE,
    COMMON_INFO_DATA_CHANGE,
    IS_MENU_VISIBLE,
    GET_ACCOUNT_ALL_CUSTOMER_NAME
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";
import {setAccount,getAccount} from "../../utils/StorageUtil";

//导航菜单点击切换
export const handleNavClick = function (type) {
    return {
        type: MAIN_HEADER_NAV_CHANGE,
        data: type
    }

};

//获取是否是管理员
export const getIsAdmin = function () {
    return (dispatch) => {
        postJson("/checkUser", {}, function (msg) {
            if (msg.success) {
                dispatch({
                    type: COMMON_INFO_DATA_CHANGE,
                    data: {isAdmin: msg.data}
                });
            }
        });
    }
};


//右上角小菜单
export const showMenuAction = function (isVisible){
    return (dispatch)=> {
        dispatch({
            type: IS_MENU_VISIBLE,
            data: isVisible
        });
    }
};

export const getAllAccountAdress = function (pageNumber,pageSize) {
    return (dispatch) => {
        let url = "/getAllAdress?pageNumber="+pageNumber+"&pageSize="+pageSize;
        getJson(url,function (msg) {
            if(msg.success){
                let data =msg.data;
                setAccount(data);
                dispatch({
                    type:GET_ACCOUNT_ALL_CUSTOMER_NAME,
                    data:data
                })
            }else {
                message.error(msg.description);
                dispatch({
                    type:GET_ACCOUNT_ALL_CUSTOMER_NAME,
                    data:[]
                })
            }
        },function (msg) {
            message.error(msg.description);
            dispatch({
                type:GET_ACCOUNT_ALL_CUSTOMER_NAME,
                data:[]
            })
        })
    }
};