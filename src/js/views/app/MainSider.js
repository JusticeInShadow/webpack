/**
 * Created by peng.xue on 2017/2/10.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Menu} from 'antd';
import classnames from "classnames";
import {getIsAdmin, handleMenuChange,showLeftMenuAction} from '../../actions/app/MainAsider';
import {setMainSider,getMainSider} from "../../utils/StorageUtil"

const {SubMenu} = Menu;

class MainNavComp extends Component {
    constructor(props) {
        super(props);
    }

    //打开关闭
    onOpenChange(keys) {
        this.props.actions.handleMenuChange({openKeys: keys});
    }

    //导航
    handleMenuClick(e) {
        var item = e.item;
        let key = e.key;
        this.props.actions.handleMenuChange({selectedKey: [key]});
        location.hash = item.props.url;
    }

    componentDidMount() {
        var hash = location.hash;
        var openKeys = [];
        var selectedKey = [];
        if (hash.indexOf("ledger") > -1) {//总账模块
            openKeys.push("sub1");
            selectedKey.push("1-1");
        } else if (hash.indexOf("cost") > -1) {//成本模块
            openKeys.push("sub2");
            if (hash.indexOf("goodsSold") > -1) {
                selectedKey.push("2-1");
            }
            if (hash.indexOf("rawStock") > -1) {
                selectedKey.push("2-2");
            }
            if (hash.indexOf("commodityStocks") > -1) {
                selectedKey.push("2-3");
            }
            if (hash.indexOf("processingProducts") > -1) {
                selectedKey.push("2-4");
            }
        } else if (hash.indexOf("receive") > -1) {//应收模块
            openKeys.push("sub3");
            if (hash.indexOf("receivable") > -1) {
                selectedKey.push("3-1");
            }
            if (hash.indexOf("receiveInAdvance") > -1) {
                selectedKey.push("3-2");
            }
        } else if (hash.indexOf("pay") > -1) {//应付模块
            openKeys.push("sub4");
            if (hash.indexOf("payable") > -1) {
                selectedKey.push("4-1");
            }
            if (hash.indexOf("payInAdvance") > -1) {
                selectedKey.push("4-2");
            }
        }  else if (hash.indexOf("list") > -1) {//应付模块
            openKeys.push("sub5");
            if (hash.indexOf("download") > -1) {
                selectedKey.push("5-1");
            }
        }
        this.props.actions.handleMenuChange({selectedKey: selectedKey, openKeys: openKeys});
    }

    showLeftMenu(e, flag) {
        e.stopPropagation();
        let triggerFlag = !flag;
        this.props.actions.showLeftMenuAction(triggerFlag);
    }

    render() {
        // let submenus = this.renderSubmenu();
        return (
            <div className="main-content-sider">
                <div className={classnames("sider-back")}
                     onClick={(e) => this.showLeftMenu(e, this.props.flag)}>
                    {this.props.flag?<span className="icon-Artboard_g"></span>:<span className="icon-Artboard_a"></span>}
                </div>
                <header>财务工作台</header>
                <Menu
                    className="main-menu"
                    mode="inline"
                    style={{height: '100%'}}
                    selectedKeys={this.props.selectedKey}
                    openKeys={this.props.openKeys}
                    onClick={(e) => this.handleMenuClick(e)}
                    onOpenChange={(keys) => this.onOpenChange(keys)}
                >
                    <SubMenu key="sub1" title={<div><span className="icon-Artboard_b"></span><span>总账模块</span></div>}>
                        <Menu.Item key="1-1" url="/ledger/accountReconciliation" text="往来对账单" p_text="总账模块">往来对账单</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<div><span className="icon-Artboard_c"></span><span>成本模块</span></div>}>
                        <Menu.Item key="2-1" url="/cost/goodsSold" text="发出商品进销存" p_text="成本模块">发出商品进销存</Menu.Item>
                        <Menu.Item key="2-2" url="/cost/rawStock" text="原材料进销存" p_text="成本模块">原材料进销存</Menu.Item>
                        <Menu.Item key="2-3" url="/cost/commodityStocks" text="库存商品进销存" p_text="成本模块">库存商品进销存</Menu.Item>
                        <Menu.Item key="2-4" url="/cost/processingProducts" text="在制品进销存" p_text="成本模块">在制品进销存</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<div><span className="icon-Artboard_d"></span><span>应收模块</span></div>}>
                        <Menu.Item key="3-1" url="/receive/receivable" text="应收账款余额表" p_text="应收模块">应收账款余额表</Menu.Item>
                        <Menu.Item key="3-2" url="/receive/receiveInAdvance" text="预收账款余额表" p_text="应收模块">预收账款余额表</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<div><span className="icon-Artboard_e"></span><span>应付模块</span></div>}>
                        <Menu.Item key="4-1" url="/pay/payable" text="应付账款余额表" p_text="应付模块">应付账款余额表</Menu.Item>
                        <Menu.Item key="4-2" url="/pay/payInAdvance" text="预付账款余额表" p_text="应付模块">预付账款余额表</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<div><span className="icon-Artboard_h"></span><span>下载报告一览</span></div>}>
                        <Menu.Item key="5-1" url="/list/download" text="下载报告一览" p_text="下载报告一览">下载报告一览</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let mainSider = state.get("mainSider");
    return {
        selectedKey:mainSider.selectedKey,
        openKeys:mainSider.openKeys,
        flag:state.get("showLeftMenu").flag
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            handleMenuChange:handleMenuChange,
            showLeftMenuAction:showLeftMenuAction
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    MainNavComp
);