/**
 * Created by peng.xue on 2017/5/10.
 */
import React, {findDOMNode, Component} from 'react';


class LedgerComp extends Component {
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

module.exports = LedgerComp;