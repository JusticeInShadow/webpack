/**
 * Created by peng.xue on 2017/5/5.
 */
import {
    DOWNLOAD_LIST_CHANGE,
} from '../../constants/ActionConstant';
import {postJson,getJson,deleteJson} from '../../utils/AjaxUtil';
import {message} from "antd";
import {loadingChange} from "./Cost";

//download模块
export const getExcelList = function (pageNumber,pageSize,searchParams,type) {
    return (dispatch) => {
        let url = "/getDownloadList";
        let params = {
            title:searchParams.title,
            start_time: searchParams.start_time,
            end_time: searchParams.end_time,
            status: searchParams.status,
            pageNumber: pageNumber,
            pageSize: pageSize
        };
        dispatch(loadingChange(true));
        postJson(url,params,function (msg) {
            if(msg.success){
                let data = Object.assign({},msg.data);
                if(type.indexOf("build")>-1){
                    data.tableKey = Math.random();
                }
                dispatch(loadingChange(false));
                dispatch({
                    type:DOWNLOAD_LIST_CHANGE,
                    data:data
                });
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
//download模块
export const deleteExcel = function (uuid,pageNumber,pageSize,searchParams) {
    return (dispatch) => {
        let url = "/deleteDownlistList?uuid="+uuid;
        dispatch(loadingChange(true));
        deleteJson(url,function (msg) {
            if(msg.success){
                let url = "/getDownloadList";
                let params = {
                    title:searchParams.title,
                    start_time: searchParams.start_time,
                    end_time: searchParams.end_time,
                    status: searchParams.status,
                    pageNumber: pageNumber,
                    pageSize: pageSize
                };
                postJson(url,params,function (res) {
                    if(res.success){
                        let data = Object.assign({},res.data);
                        dispatch(loadingChange(false));
                        dispatch({
                            type:DOWNLOAD_LIST_CHANGE,
                            data:data
                        });
                    }
                })
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