/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/8/8.
 */
import {
    COLUMN_CHANGE
} from '../../constants/ActionConstant';
import {postJson,getJson} from '../../utils/AjaxUtil';
import {message} from "antd";

export const columnChange = function (data) {
    console.log("C层，"+data[0].width);
    return {
        type:COLUMN_CHANGE,
        data:data
    }
};