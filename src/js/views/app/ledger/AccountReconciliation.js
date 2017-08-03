/**
 * Created by peng.xue on 2017/5/10.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table,Input, Pagination,Select,Button ,DatePicker,message} from "antd";
import {bindActionCreators} from 'redux';
import moment from "moment";
import classnames from "classnames";
import {getAccountAllAdress,
        getAccountReconciliation,
        setAccountDetailsParams,
        getAccountExcel,
        changeDate,
        clearAccountTable,
        changeAddressList} from "../../../actions/app/Ledger";
import {getThousands} from "../../../utils/Util";

const Option = Select.Option;
class AccountReconciliationComp extends Component {
    constructor(props) {
        super(props);
    }

    //获取表格框架模式
    getColumns(){
        let that = this;
        let dzfNameOrg = this.props.activeCompany.selectValue;
        let dzfName = "";
        if(undefined !== dzfNameOrg && null !== dzfNameOrg && "" !== dzfNameOrg){
            let dzfNameOrgTemp = dzfNameOrg.split(" ");
            for(let i =1 ;i<dzfNameOrgTemp.length;i++){
                dzfName = dzfName + dzfNameOrgTemp[i] + " "
            }
        }
        let bdzfNameOrg = this.props.reactiveCompany.selectValue;
        let bdzfName = "";
        if(undefined !== bdzfNameOrg && null !== bdzfNameOrg && "" !== bdzfNameOrg){
            let bdzfNameOrgTemp = bdzfNameOrg.split(" ");
            for(let i =1 ;i<bdzfNameOrgTemp.length;i++){
                bdzfName = bdzfName + bdzfNameOrgTemp[i] + " "
            }
        }
        return [
            {
                title:(<div>&nbsp;{dzfName}</div>),
                children:[
                    {
                        title:"账户名称",
                        dataIndex:"dzfNameDetails",
                        key:"dzfNameDetails",
                        width:200,
                        render:function (text,record) {
                            let rn = record.rn;
                            let count = record.dzfNameNum;
                            if (rn == "zqzwhj"){
                                return (<div className="">{text}</div>)
                            }else {
                                return (<div className="href-btn" onClick={()=>that.leftGToDetails(rn,count)}>{text}</div>)
                            }
                        }
                    },{
                        title:"余额",
                        dataIndex:"dzfNameNum",
                        key:"dzfNameNum",
                        width:300,
                        render:function (text,record) {
                            let rn = record.rn;
                            let newText = text.toFixed(2);
                            newText = getThousands(newText);
                            if (rn == "zqzwhj"){
                                return (<div className="red-right">{newText}</div>)
                            }else {
                                return (<div className="href-btn red-right" onClick={()=>that.leftGToDetails(rn,text)}>{newText}</div>)
                            }
                        }
                    }
                ]
            },{
                title:(<div>
                    <p className="table-last-th-up">&nbsp;{bdzfName}</p>
                    </div>),
                children:[
                    {
                        title:"账户名称",
                        dataIndex:"bdzfNameDetails",
                        key:"bdzfNameDetails",
                        width:200,
                        render:function (text,record) {
                            let rn = record.rn;
                            let count = record.bdzfNameNum;
                            if (rn == "zqzwhj"){
                                return (<div className="">{text}</div>)
                            }else {
                                return (<div className="href-btn" onClick={()=>that.rightGoToDetails(rn,count)}>{text}</div>)
                            }
                        }
                    },{
                        title:"余额",
                        dataIndex:"bdzfNameNum",
                        key:"bdzfNameNum",
                        width:300,
                        render:function (text,record) {
                            let rn = record.rn;
                            let newText = text.toFixed(2);
                            newText = getThousands(newText);
                            if (rn == "zqzwhj"){
                                return (<div className="red-right">{newText}</div>)
                            }else {
                                return (<div className="href-btn red-right" onClick={()=>that.rightGoToDetails(rn,text)}>{newText}</div>)
                            }
                        }
                    }
                ]
            }

        ]
    }

    //跳转到下个页面
    leftGToDetails(rn,count){
        let dzf = this.props.priorSearchParams.dzf;
        let bdzf = this.props.priorSearchParams.bdzf;
        let date = this.props.priorSearchParams.date;
        let typeObj = {
            yiszk:"1",
            yufzk:"2",
            qtyisk:"3",
            yfzk:"4",
            yszk:"5",
            qtyfk:"6",
        };
        let type = typeObj[rn];
        this.props.actions.setAccountDetailsParams(dzf,bdzf,date,type,count);
    }

    rightGoToDetails(rn,count){
        let dzf = this.props.priorSearchParams.dzf;
        let bdzf = this.props.priorSearchParams.bdzf;
        let date = this.props.priorSearchParams.date;
        let typeObj = {
            yiszk:"1",
            yufzk:"2",
            qtyisk:"3",
            yfzk:"4",
            yszk:"5",
            qtyfk:"6",
        };
        let type = typeObj[rn]-0+6;
        this.props.actions.setAccountDetailsParams(dzf,bdzf,date,type,count);
    }

    //拼接，把后台数据对象完成为数据格式
    getData(){
        let data = this.props.accountTable.data;
        let newData = [];
        let rowList ={
            yiszk:"应收账款",
            yufzk:"预付账款",
            qtyisk:"其他应收款",
            yfzk:"应付账款",
            yszk:"预收账款",
            qtyfk:"其他应付款",
            zqzwhj:"债权债务合计"
        };
        for (let i in rowList){
            let rowObj = {
                dzfNameDetails: rowList[i],
                dzfNameNum: data["dzf_"+i],
                bdzfNameDetails: rowList[i],
                bdzfNameNum: data["bdzf_"+i],
                rn:i
            };
            newData.push(rowObj);
        }
        return newData
    }

    //获取正确的时间
    getDate(){
        let data = this.props.accountTable.data;
        let preDate = this.props.priorSearchParams.date;
        let flag = false;
        for(let i in data){
            if(data[i] != 0){
                flag =true;
                break
            }
        }
        if(flag){
            return moment(preDate)
        }else {
            return ""
        }
    }

    //获取下拉框option
    getOptions(type){
        let list = [];
        let activeList = this.props.activeCompany.addressList;
        let activeValue = this.props.activeCompany.selectValue;
        let reactiveList = this.props.reactiveCompany.addressList;
        let reactiveValue = this.props.reactiveCompany.selectValue;
        let orginList = this.props.orginAddressList;
        if(type === 1){
            if("" === activeValue || undefined === activeValue || null === activeValue){
                list = orginList
            }else if(activeList.length == 0 && activeValue.split(" ").length > 1){
                list = orginList
            }else {
                list = activeList
            }
        }else if (type === 2){
            if("" === reactiveValue || undefined === reactiveValue || null === reactiveValue){
                list = orginList
            }else if(reactiveList.length == 0 && reactiveValue.split(" ").length > 1){
                list = orginList
            }else {
                list = reactiveList
            }
        }
        if (list.length == 0){
            return []
        }
        let newList = [];
        for(let i in list){
            let address = list[i].an8 +"  "+ list[i].alph;
            let option = <Option key={address}>{address}</Option>
            newList.push(option);
        }
        return newList
    }

    //处理下拉框搜索事件
    handleSelectChange(val,type){
        // debugger;
        let list = this.props.orginAddressList;
        if(list.length == 0){
            return
        }
        let newList = [];
        for (let i in list){
            let listItem = JSON.stringify(list[i].an8);
            let listItemOther = JSON.stringify(list[i].alph);
            if(listItem.indexOf(val) == 0 || listItemOther.indexOf(val)>-1){
                newList.push(list[i]);
            }
        }
        this.props.actions.changeAddressList(newList,val,type);
    }

    //select框的focus事件
    /*handleSelectInitChange(type){
        let list = this.props.orginAddressList;
        let val = "";
        if(type == 1){
            val = this.props.activeCompany.selectValue;
        }else if(type == 2){
            val = this.props.reactiveCompany.selectValue;
        }
        this.props.actions.changeAddressList(list,val,type);
    }*/

    onDateChange(time){
        let t = "";
        if(null === time || undefined === time || "" === time){
        }else {
            t = moment(time).format("YYYY-MM-DD");
        }
        this.props.actions.changeDate(t);
    }

    //导出Excel
    getExcel(){
        let dzf = this.props.priorSearchParams.dzf;
        let bdzf = this.props.priorSearchParams.bdzf;
        let date = this.props.priorSearchParams.date;
        this.props.actions.getAccountExcel(dzf,bdzf,date);
    }

    loadDataBySearch(){
        let dzf = this.props.activeCompany.selectValue;
        if (undefined === dzf || null === dzf || "" === dzf){
            dzf = "";
        }else{
            dzf = dzf.split(" ")[0];
        }
        let bdzf = this.props.reactiveCompany.selectValue;
        if(undefined === bdzf || null === bdzf || "" === bdzf){
            bdzf = "";
        }else {
            bdzf = bdzf.split(" ")[0];
        }
        this.props.actions.getAccountReconciliation(dzf,bdzf,this.props.date);
    }
    componentDidMount(){
        let date = this.getDate();
        this.props.actions.changeDate(date);
    }

    componentWillUnmount(){
        let hash = location.hash;
        console.log(hash);
        if(hash.indexOf("accountReconcileDetails")>-1){
            return
        }
        this.props.actions.clearAccountTable()
    }

    render() {
        console.log(this.props);
        let activeSelect = this.props.activeCompany.selectValue;
        let reactiveSelect = this.props.reactiveCompany.selectValue;
        let tableScrollYFlag = true;
        let scrollY = this.props.mciH - 40 - 42 - 40 - 88 - 24 - 100 - 12;
        let columns = this.getColumns();
        let data = this.getData();
        let date = "" == this.props.date?null:moment(this.props.date);
        if(scrollY >= data.length * 43){
            tableScrollYFlag = false;
        }
        return(
            <div className="GoodsSold-content Account-content">
                <header>往来对账单
                    <Button className="excel-button" onClick={()=>this.getExcel()}>
                        <img src="../images/Fill 1.png" alt=""/>
                        导出
                    </Button>
                </header>
                <div  className="Account-inner-content">
                    <div className="financial-search-keys">
                        <div className="financial-category-search-key">
                            <i className="financial-search-key-name long-label">对账单位名称<span className="must-param">*</span></i>
                            <Select
                                combobox={true}
                                style={{width:320}}
                                value={activeSelect}
                                filterOption={false}
                                allowClear={true}
                                disabled={this.props.orginAddressList.length == 0}
                                onChange={(value)=>this.handleSelectChange(value,1)}
                                >
                                {this.getOptions(1)}
                            </Select>
                            <i className="financial-search-key-name long-label unique-i">被对账单位名称<span className="must-param">*</span></i>
                            <Select
                                combobox={true}
                                style={{width:320}}
                                value={reactiveSelect}
                                filterOption={false}
                                allowClear={true}
                                disabled={this.props.orginAddressList.length == 0}
                                onChange={(value)=>this.handleSelectChange(value,2)}>
                                {this.getOptions(2)}
                            </Select>
                        </div>
                        <div className="financial-category-search-key">
                            <p className="long-text">
                            <span className="financial-search-key-name long-label">对账单截止日期
                                <span className="must-param">*</span>
                            </span>
                                <DatePicker format="YYYY-MM-DD"
                                            value={date}
                                            onChange={time => this.onDateChange(time)}/>
                            </p>
                            <p>
                                <span className="financial-search-key-name must-param long-label">币种：CNY</span>
                            </p>
                        </div>
                        <Button className="search-financial-button" onClick={()=>this.loadDataBySearch()}>查询</Button>
                    </div>
                    <Table className={tableScrollYFlag?"hc-scc-table-scroll-y hc-scc-table receive-table account-table":"hc-scc-table receive-table account-table"}
                           bordered
                           dataSource={data}
                           columns={columns}
                           rowKey="rn"
                           scroll={{y: scrollY}}
                           pagination={false}
                           loading={this.props.accountTable.loading}
                    />
                </div>
            </div>
        )

    }
}
const mapStateToProps = (state) => {
    let account = state.get("account");
    return {
        orginAddressList:account.orginAddressList,
        activeCompany:account.activeCompany,
        reactiveCompany:account.reactiveCompany,
        date:account.date,
        accountTable:account.accountTable,
        priorSearchParams:account.priorSearchParams,
        mciH:state.get("common").mciHeight,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            getAccountAllAdress:getAccountAllAdress,
            changeAddressList:changeAddressList,
            changeDate:changeDate,
            getAccountReconciliation:getAccountReconciliation,
            getAccountExcel:getAccountExcel,
            setAccountDetailsParams:setAccountDetailsParams,
            clearAccountTable:clearAccountTable
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    AccountReconciliationComp
);