/**
 * Created by peng.xue on 2017/5/19.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleMenuChange} from "../../actions/app/MainAsider";

class IndexComp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.handleMenuChange({
            selectedKey: []
        });
    }

    render() {
        return (
            <div className="app-index-content">
                <img src="/images/index.png?t=1.0" className="index-bg"/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            handleMenuChange: handleMenuChange
        }, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(
    IndexComp
);