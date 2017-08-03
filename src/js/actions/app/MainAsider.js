/**
 * Created by peng.xue on 2017/5/2.
 */
import {MAIN_ASIDE_MENU_CHANGE,IS_MENU_LEFT_VISIBLE} from '../../constants/ActionConstant';
import {getJson} from '../../utils/AjaxUtil';

//菜单变化
export const handleMenuChange = function (data) {
    return {
        type: MAIN_ASIDE_MENU_CHANGE,
        data: data
    }
};
//折叠左侧菜单栏
export const showLeftMenuAction = function (isLeftVisible) {
    return (dispatch) => {
        dispatch({
            type: IS_MENU_LEFT_VISIBLE,
            data: isLeftVisible
        });
    }
};