/**
 *
 *                ..................................
 *                      佛祖保佑       永无BUG
 *
 * Created by peng.xue on 2017/8/15.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TableDragLine extends Component {
    constructor(props) {
        super(props);
    }

    handleMouseDown(e){
        this.props.handleDragLine(e);
    }

    render(){
        return(
            <div className="th-resize"
                 onMouseDown={(e)=>this.handleMouseDown(e)}>
                <span></span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    TableDragLine
);