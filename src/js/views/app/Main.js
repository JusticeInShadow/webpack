/**
 * portal main页面
 * Created by Xufeng.Yang on 2016/12/21.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Layout} from "antd";
import {bindActionCreators} from 'redux';
import {showMenuAction,getAllAccountAdress} from '../../actions/app/MainNav';
import {mainContentHeightChange} from '../../actions/app/MainLayout';
import MainHeader from "./MainHeader";
import MainSider from './MainSider';
import classnames from "classnames";
import {removeAccount,getAccount} from "../../utils/StorageUtil";
import "../../../css/antd/antd.min.css";
import "../../../css/common.css";
import "../../../css/app/AddressPicker.css";
import "../../../css/app/app.css";
import "../../../css/app/Cost.css";
import "../../../css/app/Ledger.css";
import "../../../css/app/MainHeader.css";
import "../../../css/app/MainNav.css";
import "../../../css/app/MainSider.css";
import "../../../css/app/Pay&Receive.css";
import "../../../css/app/fontstyle.css";

const {Header, Content, Sider} = Layout;
class Main extends Component {
    constructor(props) {
        super(props);
    }

    //右上角小菜单
    showMenu(){
        this.props.actions.showMenuAction(false);
    }

    componentDidMount() {
        let account = getAccount();
        if (undefined === account || null === account || "" === account){
            this.props.actions.getAllAccountAdress(1,2000);
        }
        let that = this;
        var mciDom = document.getElementById('mci');
        var mciH = mciDom.clientHeight;
        this.props.actions.mainContentHeightChange(mciH);
        let t = null;
        window.onresize = function () {
            clearTimeout(t);
            t = setTimeout(function () {
                mciH = mciDom.clientHeight;
                that.props.actions.mainContentHeightChange(mciH);
                t = null;
            },500);
        }
    }

    componentWillUnmount(){
        removeAccount();
    }

    render() {
        console.log(process.env);
        return (
            <Layout className="main-layout" onClick={()=>this.showMenu()}>
                <Header className="layout-header">
                    <MainHeader/>
                </Header>
                <Content className="main-content">
                    <Layout className="main-content-layout">
                        <Sider width={this.props.flag ? 56 : 222}
                               className={classnames("main-layout-aside", {"overflow-hidden": this.props.flag}, {"border-right": !this.props.flag})}>
                            <MainSider />
                        </Sider>
                        <Content className="main-content-info" id="mci">
                            {this.props.children}
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        flag:state.get("showLeftMenu").flag
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            showMenuAction:showMenuAction,
            mainContentHeightChange:mainContentHeightChange,
            getAllAccountAdress:getAllAccountAdress
        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    Main
);