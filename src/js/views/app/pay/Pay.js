/**
 * Created by peng.xue on 2017/5/9.
 */
import React, {findDOMNode, Component} from 'react';


class Pay extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="cost-content">
                {this.props.children}
            </div>
        )
    }
}

module.exports = Pay;