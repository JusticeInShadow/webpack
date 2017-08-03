/**
 * portal Header
 * Created by Xufeng.Yang on 2016/12/22.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentUserByToken} from '../../actions/app/MainHeader';
import {showMenuAction} from '../../actions/app/MainNav';
class HeaderComp extends Component {
    constructor(props) {
        super(props);
    }

    handleMenuClick(e) {
        e.stopPropagation();
        location.href = commonConfig.passportUrl;
    }

    componentDidMount() {
        this.props.actions.getCurrentUserByToken();
    }

    showMenu(e, flag) {
        e.stopPropagation();
        let triggerFlag = !flag;
        this.props.actions.showMenuAction(triggerFlag);
    }

    render() {
        let picture_url = '';
        if (null !== this.props.user && null !== this.props.user.picture_url) {
            picture_url = this.props.user.picture_url;
        } else {
            picture_url = "/images/default-portrait.png";
        }
        return (
            <header className="main-header">
                <a className="logo" href="/"><img src="../images/F_logo.png"/></a>
                <span className="logo-text">瀚川集团内部财务平台</span>
                <div className="btn-menu-app">
                    <div className="menu-item">
                        <img src={picture_url}/>
                        <i className="icon-Artboard_f" onClick={(e) => this.showMenu(e, this.props.flag)}></i>
                    </div>
                </div>
            </header>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        flag: state.get("showMenu").flag,
        user: state.get('common').user,//用户信息
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getCurrentUserByToken: getCurrentUserByToken,
            showMenuAction: showMenuAction,
        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    HeaderComp
);