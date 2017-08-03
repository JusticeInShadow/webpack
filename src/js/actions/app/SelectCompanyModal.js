/**
 * Created by peng.xue on 2017/5/11.
 */
import {
    SELECT_COMPANY_CHANGE,
    SELECT_COMPANY_LIST_CHANGE
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";

export const changeSelectModal = function (data) {
    return {
        type:SELECT_COMPANY_CHANGE,
        data:data
    }
};

export const changeSelectList = function (data) {
    return {
        type:SELECT_COMPANY_LIST_CHANGE,
        data:data
    }
};