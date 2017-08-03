/**
 * Created by Jingjing.Mu on 2017/1/24.
 */
import {
    IS_MENU_VISIBLE
} from '../../constants/ActionConstant';
//右上角小菜单
export const showMenuAction = function (isVisible){
    return (dispatch)=> {
        dispatch({
            type: IS_MENU_VISIBLE,
            data: isVisible
        });
    }
}