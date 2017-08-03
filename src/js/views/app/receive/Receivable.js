/**
 * Created by peng.xue on 2017/5/9.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table,Input, Pagination,Select,Button ,DatePicker} from "antd";
import {bindActionCreators} from 'redux';
import {getCompanyNameByCode} from "../../../actions/app/Cost";
import {getReceivableList,
    getReceivableExcel,
    clearCustomerName,
    changeReceivableSearchParams,
    getAllAdress,
    changeAddressList,
    changeAddressModel,
    getModalResult} from "../../../actions/app/Receive";
import moment from "moment";
import classnames from "classnames";
import {getThousands,getNo,getNowMonth} from "../../../utils/Util";

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
class ReceivableComp extends Component {
    constructor(props) {
        super(props);
        this.searchKeys = {
            bz:"",
            gs:"",
            khbm:"",
            kmz:1122,
            mxz:"",
            date:""
        }
        this.addressList = [];
    }

    getColumns() {
        var that = this;
        return [{
            title:"属性",
            children:[
                {
                    title:"#",
                    dataIndex:"index",
                    key:"index",
                    render: function (text, record, index) {
                        let ind = index + 1;
                        let NO = getNo(ind, that.props.pageNumber, that.props.pageSize);
                        if (NO <= that.props.total){
                            return NO
                        }
                    },
                    width: 80
                }, {
                    title:"客户编码",
                    dataIndex:"khbm",
                    key:"khbm",
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text">{text}</div>)
                    }
                },{
                    title:"客户名称",
                    dataIndex:"khmc",
                    key:"khmc",
                    width:150,
                    render: function (text, record, index) {
                        return (<div className="huge-text">{text}</div>)
                    }
                },{
                    title:"科目",
                    dataIndex:"km",
                    key:"km",
                    width:70,
                    render: function (text, record, index) {
                        let km = text + record.mxz;
                        if(undefined === record.mxz || null === record.mxz || "" === record.mxz){
                            km = text;
                        }
                        return (<div className={classnames("small-text",{"red-text":record.color})}>{km}</div>)
                    }
                }
            ]
        },{
            title:"期初",
            children:[
                {
                    title: "原币",
                    dataIndex: 'qcyb',
                    key: 'qcyb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        let bz = that.props.priorSearchParams.bz;
                        if (bz.indexOf("CNY")>-1){
                            newText = "-";
                        }
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }, {
                    title: "本位币",
                    dataIndex: 'qcbwb',
                    key: 'qcbwb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:"本期借方",
            children:[
                {
                    title: "原币",
                    dataIndex: 'jfyb',
                    key: 'jfyb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        let bz = that.props.priorSearchParams.bz;
                        if (bz.indexOf("CNY")>-1){
                            newText = "-";
                        }
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }, {
                    title: "本位币",
                    dataIndex: 'jfbwb',
                    key: 'jfbwb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:"本期贷方",
            children:[
                {
                    title: "原币",
                    dataIndex: 'dfyb',
                    key: 'dfyb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        let bz = that.props.priorSearchParams.bz;
                        if (bz.indexOf("CNY")>-1){
                            newText = "-";
                        }
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }, {
                    title: "本位币",
                    dataIndex: 'dfbwb',
                    key: 'dfbwb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:"本年累计借方",
            children:[
                {
                    title: "原币",
                    dataIndex: 'ljjfyb',
                    key: 'ljjfyb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        let bz = that.props.priorSearchParams.bz;
                        if (bz.indexOf("CNY")>-1){
                            newText = "-";
                        }
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }, {
                    title: "本位币",
                    dataIndex: 'ljjfbwb',
                    key: 'ljjfbwb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:"本年累计贷方",
            children:[
                {
                    title: "原币",
                    dataIndex: 'ljdfyb',
                    key: 'ljdfyb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        let bz = that.props.priorSearchParams.bz;
                        if (bz.indexOf("CNY")>-1){
                            newText = "-";
                        }
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }, {
                    title: "本位币",
                    dataIndex: 'ljdfbwb',
                    key: 'ljdfbwb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:(<div>
                <p className="table-last-th-up">余额</p>
            </div>),
            children:[
                {
                    title: "原币",
                    dataIndex: 'yeyb',
                    key: 'yeyb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        let bz = that.props.priorSearchParams.bz;
                        if (bz.indexOf("CNY")>-1){
                            newText = "-";
                        }
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                },{
                    title: (<div className="table-last-th-down">本位币</div>),
                    dataIndex: 'yebwb',
                    key: 'yebwb',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        }];
    }

    //通过搜索条件加载数据
    loadDataBySearch(e){
        if(undefined !== e && null !== e && "" !== e){
            let keyCode = e.keyCode;
            if (13 != keyCode) {
                return
            }
        }
        let bz = this.props.bz;
        bz = bz.toUpperCase();
        let gs = this.props.gs;
        let khbm = this.props.selectValue;
        if(undefined !== khbm && null !== khbm && "" !== khbm){
            khbm = khbm.split(" ")[0]
        }
        let kmz = this.props.kmz;
        let mxz = this.props.mxz;
        let date = this.props.date;
        this.props.actions.getReceivableList(1,this.props.pageSize,bz,gs,khbm,kmz,mxz,date);
    }

    //导出当前table显示内容的excel
    getExcel(){
        let bz = this.props.priorSearchParams.bz;
        let gs = this.props.priorSearchParams.gs;
        let khbm = this.props.priorSearchParams.khbm;
        let kmz = this.props.priorSearchParams.kmz;
        let mxz = this.props.priorSearchParams.mxz;
        let date = this.props.priorSearchParams.date;
        this.props.actions.getReceivableExcel(bz,gs,khbm,kmz,mxz,date)
    }
    //搜索条件添加
    onSearchInputChange(e,type){
        let val = e.target.value;
        if((type.indexOf("gs")>-1 && String(val).length>5) || (type.indexOf("khbm")>-1 && String(val).length>6)){
            return
        }
        if(type.indexOf("bz")>-1){
            val = val.toUpperCase();
        }
        this.searchKeys[type] = val;
        this.props.actions.changeReceivableSearchParams(this.searchKeys);
    }

    //日期更改
    onDateChange(time,type){
        let t = "";
        if(null === time || undefined === time || "" === time){
        }else {
            t = moment(time).format("YYYY-MM");
        }
        this.searchKeys[type] = t;
        this.props.actions.changeReceivableSearchParams(this.searchKeys);
    }

    //获取公司名称
    getCoNameByCoCode(e){
        let val = String(e.target.value);
        if(val == this.props.preCompanyCode){
            return
        }
        // if(val.length === 5){
        this.props.actions.getCompanyNameByCode(val);
        // }
    }

    //获取下拉框option
    getOptions(){
        // debugger;
        let listChanged = this.props.addressList;
        let listOrg = this.props.orginAddressList;
        let value = this.props.selectValue;
        let list = [];
        if("" === value || undefined === value || null === value){
            list = listOrg
        }else if (listChanged.length == 0 && value.split(" ").length > 1){
            list = listOrg
        }else {
            list = listChanged
        }
        if (list.length == 0){
            return []
        }
        let newList = [];
        for(let i in list){
            let address = list[i].an8 +"  "+ list[i].alph;
            let option = <Option key={address}>{address}</Option>;
            newList.push(option);
        }
        return newList
    }

    //处理下拉框搜索事件
    handleSelectChange(val){
        if (undefined === val || null === val || "" === val){
            val = ""
        }
        let list = this.props.orginAddressList;
        let newList = [];
        for (let i in list){
            let listItem = JSON.stringify(list[i].an8);
            let listItemAlph = JSON.stringify(list[i].alph);
            if(listItem.indexOf(val) == 0 || listItemAlph.indexOf(val)>-1){
                newList.push(list[i]);
            }
        }
        this.props.actions.changeAddressList(newList,val);
    }

    //select框的focus事件
    /*handleSelectInitChange(){
        let list = this.props.orginAddressList;
        let val = this.props.selectValue;
        this.props.actions.changeAddressList(list,val);
    }*/

    //获取表格数据
    getData(){
        let total = this.props.total;
        let size = this.props.pageSize;
        let num = this.props.pageNumber;
        let maxNum = Math.ceil(total/size);
        let data = Object.assign([],this.props.detail);
        let countData = Object.assign([],this.props.count);
        if(data.length == 0){
            return data;
        }
        if(maxNum > num){
            return data
        }
        for (let i in countData) {
            let countItem = countData[i];
            countItem.color = 1;
            countItem.rn = "hj" + i;
            countItem.km = "合计";
            data.push(countItem)
        }
        return data
    }

    //分页搜索
    onPageChange(page,pageSize){
        let bz = this.props.priorSearchParams.bz;
        bz = bz.toUpperCase();
        let gs = this.props.priorSearchParams.gs;
        let khbm = this.props.priorSearchParams.khbm;
        let kmz = this.props.priorSearchParams.kmz;
        let mxz = this.props.priorSearchParams.mxz;
        let date = this.props.priorSearchParams.date;
        this.props.actions.getReceivableList(page,this.props.pageSize,bz,gs,khbm,kmz,mxz,date);
    }

    componentDidMount(){
        // this.props.actions.getAllAdress(1,10000);
        // this.props.actions.getGoodsSold(this.props.pageNumber,this.props.pageSize,this.props.co,this.props.mcu,this.props.businessDate);
    }

    componentWillUnmount() {
        let initSearchParams = {
            bz:"",
            gs:"",
            khbm:"",
            kmz:1122,
            mxz:"",
            date:""
        };
        this.props.actions.changeReceivableSearchParams(initSearchParams);
        this.props.actions.clearCustomerName();
        this.props.actions.changeAddressList([],"");
    }

    render() {
        let tableScrollYFlag = false;
        let columns = this.getColumns();
        console.log(this.props.company);
        let scrollY = this.props.mciH - 40 - 42 - 176 - 24 - 100 - 43 - 12;
        let data = this.getData();
        let options = this.getOptions();
        let selectValue = this.props.selectValue;
        if(scrollY >= data.length * 43){
            tableScrollYFlag = true;
        }
        return (
            <div className="GoodsSold-content">
                <header>应收账款余额表
                    <Button className="excel-button" onClick={()=>this.getExcel()}>
                        <img src="../images/Fill 1.png" alt=""/>
                        导出
                    </Button>
                </header>
                <div  className="Account-inner-content">
                    <div className="financial-search-keys">
                        <div className="financial-category-search-key">
                            <p>
                            <span className="financial-search-key-name">公司
                                <span className="must-param">*</span>
                            </span>
                                <Input type="text" onChange={(e)=>this.onSearchInputChange(e,"gs")}
                                       onBlur={(e)=>this.getCoNameByCoCode(e)}
                                       onKeyDown={(e)=>this.loadDataBySearch(e)}
                                       value={this.props.gs}/>
                            </p>
                            <span>{this.props.company || " "}</span>
                            <p>
                            <span className="financial-search-key-name">币种
                                <span className="must-param">*</span>
                            </span>
                                <Input type="text" onChange={(e)=>this.onSearchInputChange(e,"bz")}
                                       onKeyDown={(e)=>this.loadDataBySearch(e)}
                                       value={this.props.bz}/>
                            </p>
                        </div>
                        <div className="financial-category-search-key">
                            <i className="financial-search-key-name">客户编码</i>
                            <Select
                                combobox={true}
                                style={{width:320}}
                                value={selectValue}
                                filterOption={false}
                                allowClear={true}
                                disabled={this.props.orginAddressList.length == 0}
                                onChange={(value)=>this.handleSelectChange(value)}>
                                {options}
                            </Select>
                        </div>
                        <div className="financial-category-search-key">
                            <p>
                            <span className="financial-search-key-name">科目账
                                <span className="must-param">*</span>
                            </span>
                                <Input type="text" onChange={(e)=>this.onSearchInputChange(e,"kmz")}
                                       onKeyDown={(e)=>this.loadDataBySearch(e)}
                                       value={this.props.kmz}/>
                            </p>
                            <span>{" "}</span>
                            <p>
                                <span className="financial-search-key-name">明细账</span>
                                <Input type="text" onChange={(e)=>this.onSearchInputChange(e,"mxz")}
                                       onKeyDown={(e)=>this.loadDataBySearch(e)}
                                       value={this.props.mxz}/>
                            </p>
                        </div>
                        <div className="financial-category-search-key">
                            <p>
                            <span className="financial-search-key-name">截止日期
                                <span className="must-param">*</span>
                            </span>
                                <MonthPicker format="YYYY-MM"
                                             onChange={time => this.onDateChange(time,'date')}/>
                            </p>
                        </div>
                        <Button className="search-financial-button" onClick={()=>this.loadDataBySearch()}>查询</Button>
                    </div>
                    <Table className={tableScrollYFlag?"hc-scc-table-scroll-y hc-scc-table receive-table":"hc-scc-table receive-table"}
                           bordered
                           dataSource={data}
                           columns={columns}
                           rowKey="rn"
                           scroll={{x:1860,y: scrollY}}
                           pagination={false}
                           loading={this.props.loading}
                    />
                    <div className={this.props.total > 10 ?"hc-scc-page-content":"hide"}>
                        <Pagination current={this.props.pageNumber} total={this.props.total}
                                    onChange={(page, pageSize) => this.onPageChange(page, pageSize)}/>
                    </div>
                </div>
            </div>

        )
    }
}


const mapStateToProps = (state)=> {
    let receivable = state.get("receivable");
    return {
        pageNumber:receivable.pageNumber,
        pageSize:receivable.pageSize,
        total:receivable.total,
        count:receivable.count,
        detail:receivable.detail,
        loading:receivable.loading,
        company:receivable.company,
        preCompanyCode:receivable.preCompanyCode,
        customer:receivable.customer,
        preCustomerCode:receivable.preCustomerCode,
        bz:receivable.searchParams.bz,
        gs:receivable.searchParams.gs,
        khbm:receivable.searchParams.khbm,
        kmz:receivable.searchParams.kmz,
        mxz:receivable.searchParams.mxz,
        date:receivable.searchParams.date,
        mciH:state.get("common").mciHeight,
        priorSearchParams:receivable.priorSearchParams,
        addressList:receivable.addressList,
        orginAddressList:receivable.orginAddressList,
        isModalShow:receivable.isModalShow,
        selectValue:receivable.selectValue,
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({
            getReceivableList:getReceivableList,
            changeReceivableSearchParams:changeReceivableSearchParams,
            getReceivableExcel:getReceivableExcel,
            getCompanyNameByCode:getCompanyNameByCode,
            clearCustomerName:clearCustomerName,
            getAllAdress:getAllAdress,
            changeAddressList:changeAddressList,
            changeAddressModel:changeAddressModel,
            getModalResult:getModalResult
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ReceivableComp
);