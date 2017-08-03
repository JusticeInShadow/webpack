/**
 * Created by peng.xue on 2017/5/3.
 */
import {COMMON_INFO_DATA_CHANGE} from '../../constants/ActionConstant';
export const mainContentHeightChange = function (height) {
    console.log(height)
    return {
        type: COMMON_INFO_DATA_CHANGE,
        data: {mciHeight: height}
    }
};