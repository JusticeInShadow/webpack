/**
 * Created by Xufeng.Yang on 2017/1/22.
 */
import {getJson} from '../../utils/AjaxUtil';
import {setUser} from '../../utils/StorageUtil';
import {message} from 'antd';
import {MY_USER_INFO_CHANGE} from '../../constants/ActionConstant';
export const getCurrentUserByToken = function () {
    return (dispatch) => {
        getJson("/getCurrentUserByToken", function (msg) {
            if (msg.success) {
                var userInfo = msg.data;
                setUser(userInfo);
                dispatch({
                    type: MY_USER_INFO_CHANGE,
                    data: userInfo
                });
            } else {
                message(msg.description);
            }
        });
    }
};