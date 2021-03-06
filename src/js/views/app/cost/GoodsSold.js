/**
 * Created by peng.xue on 2017/4/28.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table,Input, Pagination,Select,Button ,DatePicker} from "antd";
import {bindActionCreators} from 'redux';
import {getGoodsSold,
        getGoodsSoldExcel,
        getCompanyNameByCode,
        clearCompanyName,
        changeGoodsSoldSearchParams} from "../../../actions/app/Cost";
import moment from "moment";
import classnames from "classnames";
import {getThousands,getNo,getNowMonth} from "../../../utils/Util";

const { MonthPicker, RangePicker } = DatePicker;
class GoodsSoldComp extends Component {
    constructor(props) {
        super(props);
        this.searchKeys = {
            co:"",
            mcu:"",
            businessDate:""
        }
    }

    getColumns() {
        var that = this;
        return [{
            title:"属性",
            children:[
                {
                    title: "#",
                    dataIndex: 'id',
                    key: 'id',
                    render: function (text, record, index) {
                        let ind = index + 1;
                        let NO = getNo(ind, that.props.pageNumber, that.props.pageSize);
                        if (NO <= that.props.total){
                            return NO
                        }
                    },
                    width: 80
                }, {
                    title: "公司",
                    dataIndex: 'co',
                    key: 'co',
                    width:70,
                    render: function (text, record, index) {
                        return (<div className="small-text">{text}</div>)
                    }
                }, {
                    title: "经营单位",
                    dataIndex: 'mcu',
                    key: 'mcu',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text">{text}</div>)
                    }
                }, {
                    title: "物料号",
                    dataIndex: 'litm',
                    key: 'litm',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text">{text}</div>)
                    }
                }, {
                    title: "物料名称",
                    dataIndex: 'dsc1',
                    key: 'dsc1',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text">{text}</div>)
                    }
                },{
                    title: "制造商部件号",
                    dataIndex: 'dsc2',
                    key: 'dsc2',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text">{text}</div>)
                    }
                }, {
                    title: "单位",
                    dataIndex: 'uom1',
                    key: 'uom1',
                    width:70,
                    render: function (text, record, index) {
                        return (<div className="small-text center-text">{text}</div>)
                    }
                }, {
                    title: "单据类型",
                    dataIndex: 'orderType',
                    key: 'orderType',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text center-text">{text}</div>)
                    }
                }, {
                    title: "销售单类型",
                    dataIndex: 'saleOrderType',
                    key: 'saleOrderType',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text center-text">{text}</div>)
                    }
                }, {
                    title: "销售单号",
                    dataIndex: 'saleOrderNum',
                    key: 'saleOrderNum',
                    width:100,
                    render: function (text, record, index) {
                        return (<div className="middle-text">{text}</div>)
                    }
                }, {
                    title: "销售单行号",
                    dataIndex: 'saleLineNum',
                    key: 'saleLineNum',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text center-text">{text}</div>)
                    }
                },{
                    title: "所属期",
                    dataIndex: 'businessDate',
                    key: 'businessDate',
                    width:70,
                    render: function (text, record, index) {
                        return (<div className="small-text">{text}</div>)
                    }
                }, {
                    title: "总账级",
                    dataIndex: 'glpt',
                    key: 'glpt',
                    width:70,
                    render: function (text, record, index) {
                        return (<div className={classnames("small-text",{"red-text":record.color})}>{text}</div>)
                    }
                }
            ]
        },{
            title:"期初",
            children:[
                {
                    title: "期初数量",
                    dataIndex: 'initialQuantity',
                    key: 'initialQuantity',
                    width:120,
                    render: function (text, record, index) {
                        let newText = getThousands(text);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                },{
                    title: "期初金额",
                    dataIndex: 'initialAmount',
                    key: 'initialAmount',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:"本期入库",
            children:[
                {
                    title: "销售发运数量",
                    dataIndex: 'shipmentQuantity',
                    key: 'shipmentQuantity',
                    width:120,
                    render: function (text, record, index) {
                        let newText = getThousands(text);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                },{
                    title: "销售发运金额",
                    dataIndex: 'shipmentAmount',
                    key: 'shipmentAmount',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }
            ]
        },{
            title:"本期出库",
            children:[
                {
                    title: "销售开票数量",
                    dataIndex: 'billQuantity',
                    key: 'billQuantity',
                    width:120,
                    render: function (text, record, index) {
                        let newText = getThousands(text);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                },{
                    title: "销售开票金额",
                    dataIndex: 'billAmount',
                    key: 'billAmount',
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
                        <p className="table-last-th-up">期末</p>
                    </div>),
            children:[
                {
                    title: "期末数量",
                    dataIndex: 'finalQuantity',
                    key: 'finalQuantity',
                    width:120,
                    render: function (text, record, index) {
                        let newText = getThousands(text);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                },{
                    title: (<div className="table-last-th-down">期末金额</div>),
                    dataIndex: 'finalAmount',
                    key: 'finalAmount',
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
        let mcu = this.props.mcu;
        mcu = mcu.toUpperCase();
        this.props.actions.getGoodsSold(1,this.props.pageSize,this.props.co,mcu,this.props.businessDate);
    }

    //导出当前table显示内容的excel
    getExcel(){
        let mcu = this.props.priorSearchParams.mcu;
        mcu = mcu.toUpperCase();
        this.props.actions.getGoodsSoldExcel(this.props.priorSearchParams.co,mcu,this.props.priorSearchParams.businessDate)
    }
    //搜索条件添加
    onSearchInputChange(e,type){
        let val = e.target.value;
        if(type.indexOf("co")>-1 && String(val).length>5){
            return
        }
        this.searchKeys[type] = val;
        this.props.actions.changeGoodsSoldSearchParams(this.searchKeys);
    }

    //日期更改
    onDateChange(time,type){
        let t = "";
        if(null === time || undefined === time || "" === time){
        }else {
            t = moment(time).format("YYYY-MM");
        }
        this.searchKeys[type] = t;
        this.props.actions.changeGoodsSoldSearchParams(this.searchKeys);
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
            countItem.rn = "hj" + i
            data.push(countItem)
        }
        let countAllData = {
            billAmount:0,
            billQuantity:0,
            finalAmount:0,
            finalQuantity:0,
            glpt:"小计",
            initialAmount:0,
            initialQuantity:0,
            shipmentAmount:0,
            shipmentQuantity:0,
            rn:"hjAll",
            color:1
        };
        for (let i in countAllData) {
            if(i.indexOf("glpt")== -1 && i.indexOf("rn")== -1 && i.indexOf("color")== -1 ){
                for (let j in countData) {
                    countAllData[i] = countAllData[i] + countData[j][i];
                }
            }
        }
        if (data.length>0){
            data.push(countAllData);
        }
        return data
    }

    //分页搜索
    onPageChange(page,pageSize){
        let mcu = this.props.priorSearchParams.mcu;
        mcu = mcu.toUpperCase();
        this.props.actions.getGoodsSold(page,this.props.pageSize,this.props.priorSearchParams.co,mcu,this.props.priorSearchParams.businessDate);
    }

    componentDidMount(){
        // this.props.actions.getGoodsSold(this.props.pageNumber,this.props.pageSize,this.props.co,this.props.mcu,this.props.businessDate);
    }

    componentWillUnmount() {
        let initSearchParams = {
            co:"",
            mcu:"",
            businessDate:""
        };
        this.props.actions.changeGoodsSoldSearchParams(initSearchParams);
        this.props.actions.clearCompanyName();
    }

    render() {
        let tableScrollYFlag = false;
        let columns = this.getColumns();
        // console.log(this.props.loading);
        let scrollY = this.props.mciH - 40 - 39 - 103 - 24 - 100 - 43 - 12;
        let data = this.getData();
        if(scrollY >= data.length * 43){
            tableScrollYFlag = true;
        }
        return (
            <div className="GoodsSold-content">
                <header>发出商品进销存
                    <Button className="excel-button" onClick={()=>this.getExcel()}>
                        <img src="../images/Fill 1.png" alt=""/>
                        导出
                    </Button>
                </header>
                <div  className="Account-inner-content">
                    <div className="financial-search-keys">
                        <div className="financial-category-search-key">
                            <p>
                                <span className="financial-search-key-name">公司</span>
                                <Input type="text" onChange={(e)=>this.onSearchInputChange(e,"co")}
                                       onBlur={(e)=>this.getCoNameByCoCode(e)}
                                       onKeyDown={(e)=>this.loadDataBySearch(e)}
                                       value={this.props.co}/>
                            </p>
                            <span>{this.props.company || " "}</span>
                            <p>
                                <span className="financial-search-key-name">经营单位</span>
                                <Input type="text" onChange={(e)=>this.onSearchInputChange(e,"mcu")}
                                       onKeyDown={(e)=>this.loadDataBySearch(e)}
                                       value={this.props.mcu}/>
                            </p>
                        </div>
                        <div className="financial-category-search-key">
                            <p>
                            <span className="financial-search-key-name">所属期
                                <span className="must-param">*</span>
                            </span>
                                <MonthPicker format="YYYY-MM"
                                             onChange={time => this.onDateChange(time,'businessDate')}/>
                            </p>
                        </div>
                        <Button className="search-financial-button" onClick={()=>this.loadDataBySearch()}>查询</Button>
                    </div>
                    <Table className={tableScrollYFlag?"hc-scc-table-scroll-y hc-scc-table receive-table":"hc-scc-table receive-table"}
                           bordered
                           dataSource={data}
                           columns={columns}
                           rowKey="rn"
                           scroll={{x:2260,y: scrollY}}
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
    let goodsSold = state.get("goodsSold");
    return {
        pageNumber:goodsSold.pageNumber,
        pageSize:goodsSold.pageSize,
        total:goodsSold.total,
        count:goodsSold.count,
        detail:goodsSold.detail,
        loading:goodsSold.loading,
        company:goodsSold.company,
        preCompanyCode:goodsSold.preCompanyCode,
        co:goodsSold.searchParams.co,
        mcu:goodsSold.searchParams.mcu,
        businessDate:goodsSold.searchParams.businessDate,
        mciH:state.get("common").mciHeight,
        priorSearchParams:goodsSold.priorSearchParams
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({
            getGoodsSold:getGoodsSold,
            changeGoodsSoldSearchParams:changeGoodsSoldSearchParams,
            getGoodsSoldExcel:getGoodsSoldExcel,
            getCompanyNameByCode:getCompanyNameByCode,
            clearCompanyName:clearCompanyName
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    GoodsSoldComp
);
