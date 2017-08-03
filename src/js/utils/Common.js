/**
 * Created by Xufeng.Yang on 2017/1/6.
 */
import {getJson} from './AjaxUtil';
import {message} from 'antd';
import {removeCookie} from './Util';
import {removeToken, removeUser, removeRootDepartment} from './StorageUtil';
/**
 *登出
 */
export const logOut = function () {
    getJson("/logOut", function (msg) {
        if (msg.success) {//登出成功
            //1.清除cookie token
            removeCookie("token");
            //2.清楚sessionStorage token
            removeToken();
            //3.清楚用户信息
            removeUser();
            //4.清楚根部门信息
            removeRootDepartment();
            //5.跳转到登录界面
            location.href = "/login";
        } else {
            var description = msg.description;
            message.error(description);//统一处理
        }
    })
};