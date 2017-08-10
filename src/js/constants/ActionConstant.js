/**
 * action 类型常量
 * Created by Xufeng.Yang on 2016/11/25.
 */
export const MY_USER_INFO_CHANGE = 'my_user_info_change';//我的用户信息变化
export const COMMON_INFO_DATA_CHANGE = 'common_info_data_change';//我的用户信息变化

export const IS_MENU_VISIBLE = 'id_menu_visible';   //右上角小菜单
export const MAIN_ASIDE_MENU_CHANGE = 'main_aside_menu_change';   //侧边栏选中变化
export const IS_MENU_LEFT_VISIBLE = 'is_menu_left_visible';   //左侧伸缩栏
export const LOADING_CHANGE = 'loading_change';   //左侧伸缩栏

export const SELECT_VALUE_CHANGE = 'select_value_change';   //下拉框值改变
export const IS_ADDRESS_MODEL_SHOW = 'is_address_model_show';   //每个模块的页面中模态框显示问题
export const GET_SELECT_RESULT = 'get_select_result';   //每个模块的页面中模态框显示问题
export const COMPANY_NAME_CHANGE = 'company_name_change';   //每个模块的页面中公司名称更改
export const GET_ALL_CUSTOMER_NAME = 'get_all_customer_name';   //每个模块的页面中获取所有客户名称、供应商
export const CUSTOMER_NAME_CHANGE = 'customer_name_change';   //每个模块的页面中客户名称、供应商更改
//选择公司的组件
export const SELECT_COMPANY_CHANGE = 'select_company_change';   //选择公司
export const SELECT_COMPANY_LIST_CHANGE = 'select_company_list_change';   //更改公司列表
//发出商品
export const GOODS_SOLD_DATA_CHANGE = 'goods_sold_data_change';
export const GOODS_SOLD_SEARCH_PARAMS_CHANGE = 'goods_sold_search_params_change';
//原材料
export const RAW_STOCK_DATA_CHANGE = 'raw_stock_data_change';
export const RAW_STOCK_SEARCH_PARAMS_CHANGE = 'raw_stock_search_params_change';
//库存商品
export const COMMODITY_STOCKS_DATA_CHANGE = 'commodity_stocks_data_change';
export const COMMODITY_STOCKS_SEARCH_PARAMS_CHANGE = 'commodity_stocks_search_params_change';
//在制品
export const PROCESSING_PRODUCTS_DATA_CHANGE = 'processing_products_data_change';
export const PROCESSING_PRODUCTS_SEARCH_PARAMS_CHANGE = 'processing_products_search_params_change';
//应收余额表
export const RECEIVEABLE_DATA_CHANGE = 'receivable_data_change';
export const RECEIVEABLE_SEARCH_PARAMS_CHANGE = 'receivable_search_params_change';
//预收余额表
export const RECEIVE_IN_ADVANCE_DATA_CHANGE = 'receive_in_advance_data_change';
export const RECEIVE_IN_ADVANCE_SEARCH_PARAMS_CHANGE = 'receive_in_advance_search_params_change';
//应付余额表
export const PAYABLE_DATA_CHANGE = 'payable_data_change';
export const PAYABLE_SEARCH_PARAMS_CHANGE = 'payable_search_params_change';
//预付余额表
export const PAY_IN_ADVANCE_DATA_CHANGE = 'pay_in_advance_data_change';
export const PAY_IN_ADVANCE_SEARCH_PARAMS_CHANGE = 'pay_in_advance_search_params_change';
//往来对账单
export const ACTIVE_ACCOUNT_MODULE = 'active_account_module';    //往来对账单对账方
export const REACTIVE_ACCOUNT_MODULE = 'reactive_account_module';    //往来对账单被对账方
export const GET_ACCOUNT_ALL_CUSTOMER_NAME = 'get_account_all_customer_name';   //往来对账单的页面中获取所有客户名称、供应商
export const GET_ACCOUNT_TABLE_DATA = 'get_account_table_data';    //往来对账单表格对象属性更改
export const PRIOR_SEARCH_PARAMS_CHANGE = "prior_search_params_change"; //保存请求的参数
export const ACCOUNT_TABLE_DATE_CHANGE = "account_table_date_change";     //表格日期更改
export const ACCOUNT_TABLE_DATA_CHANGE = "account_table_data_change";     //修改表格内容
//往来对账单明细
export const ACCOUNT_DETAILS_LIST_CHANGE = 'account_details_list_change';
export const ACCOUNT_DETAILS_LIST_PARAMS_CHANGE = 'account_details_list_params_change';
//下载报告一览
export const DOWNLOAD_LIST_CHANGE = 'download_list_change';
//新功能开发测试
export const COLUMN_CHANGE = 'column_change';