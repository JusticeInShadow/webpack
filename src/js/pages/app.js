/**
 * Created by Luvia.Wu on 2016/12/23.
 */
'use strict';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from "redux";
import {reducer} from "../reducers/app/App";
import Main from "../views/app/Main";
import Index from "../views/app/Index";
import Ledger from "../views/app/ledger/Ledger";
import AccountReconciliation from "../views/app/ledger/AccountReconciliation";
import AccountReconcileDetails from "../views/app/ledger/AccountReconcileDetails";
import Cost from "../views/app/cost/Cost"
import GoodsSold from "../views/app/cost/GoodsSold";
import RawStock from "../views/app/cost/RawStock";
import CommodityStocks from "../views/app/cost/CommodityStocks";
import ProcessingProducts from "../views/app/cost/ProcessingProducts";
import Receive from "../views/app/receive/Receive";
import Receivable from "../views/app/receive/Receivable";
import ReceiveInAdvance from "../views/app/receive/ReceiveInAdvance";
import Pay from "../views/app/pay/Pay";
import Payable from "../views/app/pay/Payable";
import PayInAdvance from "../views/app/pay/PayInAdvance";
import List from "../views/app/list/List";
import Download from "../views/app/list/Download";
import Immutable from "immutable";

const initialState = Immutable.Map();

let store = createStore(reducer, initialState, applyMiddleware(thunk));
console.log(store.getState());
render((
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Index}/>
                    <Route path="ledger" component={Ledger}>
                        <Route path="accountReconciliation" component={AccountReconciliation}/>
                        <Route path="accountReconcileDetails" component={AccountReconcileDetails}/>
                    </Route>
                    <Route path="cost" component={Cost}>
                        <Route path="goodsSold" component={GoodsSold}/>
                        <Route path="rawStock" component={RawStock}/>
                        <Route path="commodityStocks" component={CommodityStocks}/>
                        <Route path="processingProducts" component={ProcessingProducts}/>
                    </Route>
                    <Route path="receive" component={Receive}>
                        <Route path="receivable" component={Receivable}/>
                        <Route path="receiveInAdvance" component={ReceiveInAdvance}/>
                    </Route>
                    <Route path="pay" component={Pay}>
                        <Route path="payable" component={Payable}/>
                        <Route path="payInAdvance" component={PayInAdvance}/>
                    </Route>
                    <Route path="list" component={List}>
                        <Route path="download" component={Download}/>
                    </Route>
                </Route>
            </Router>
        </Provider>
    ), document.getElementById("wrap")
);

