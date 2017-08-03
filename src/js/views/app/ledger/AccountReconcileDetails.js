/**
 * Created by peng.xue on 2017/5/16.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table,Input, Pagination,Select,Button ,DatePicker} from "antd";
import {bindActionCreators} from 'redux';
import {getAccountDetails,
        clearAccountDetailsTable
} from "../../../actions/app/Ledger";
import moment from "moment";
import classnames from "classnames";
import {getNo,trim,getThousands} from "../../../utils/Util";

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
class GoodsSoldComp extends Component {
    constructor(props) {
        super(props);
    }

    getColumns() {
        var that = this;
        return [{
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
                    title:"单据公司",
                    dataIndex:"glkco",
                    key:"glkco",
                    width:120,
                    render: function (text, record, index) {
                        return (<div className="big-text">{text}</div>)
                    }
                },{
                    title:"账号",
                    dataIndex:"glani",
                    key:"glani",
                    width:150,
                    render: function (text, record, index) {
                        return (<div className="huge-text">{text}</div>)
                    }
                },{
                    title:"经营单位",
                    dataIndex:"glmcu",
                    key:"glmcu",
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                } ,{
                    title: "地址号",
                    dataIndex: 'glan8',
                    key: 'glan8',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                }, {
                    title: "子帐类型",
                    dataIndex: 'glsblt',
                    key: 'glsblt',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                } ,{
                    title: "子帐",
                    dataIndex: 'glsbl',
                    key: 'glsbl',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                }, {
                    title: "业务单据类型",
                    dataIndex: 'gldcto',
                    key: 'gldcto',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                } , {
                    title: "业务单据号1",
                    dataIndex: 'glpo',
                    key: 'glpo',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                }, {
                    title: "业务单据号2",
                    dataIndex: 'glr2',
                    key: 'glr2',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                } ,{
                    title: "总账日期",
                    dataIndex: 'gldgj',
                    key: 'gldgj',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: "单据类型",
                    dataIndex: 'gldct',
                    key: 'gldct',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                }, {
                    title: "单据号",
                    dataIndex: 'gldoc',
                    key: 'gldoc',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                } ,{
                    title: "金额",
                    dataIndex: 'glaa',
                    key: 'glaa',
                    width:120,
                    render: function (text, record, index) {
                        let newText = text.toFixed(2);
                        newText = getThousands(newText);
                        return (<div className={classnames("big-text","right-text",{"red-text":record.color})}>{newText}</div>)
                    }
                }, {
                    title: "说明",
                    dataIndex: 'glexa',
                    key: 'glexa',
                    width:150,
                    render: function (text, record, index) {
                        return (<div className={classnames("huge-text",{"red-text":record.color})}>{text}</div>)
                    }
                } ,{
                    title: "备注",
                    dataIndex: 'glexr',
                    key: 'glexr',
                    width:150,
                    render: function (text, record, index) {
                        return (<div className={classnames("huge-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: "公司",
                    dataIndex: 'glco',
                    key: 'glco',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: "批号",
                    dataIndex: 'glicu',
                    key: 'glicu',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: "批类型",
                    dataIndex: 'glicut',
                    key: 'glicut',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: "分类账类型",
                    dataIndex: 'gllt',
                    key: 'gllt',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: "日记账分录行号",
                    dataIndex: 'gljeln',
                    key: 'gljeln',
                    width:150,
                    render: function (text, record, index) {
                        return (<div className={classnames("huge-text",{"red-text":record.color})}>{text}</div>)
                    }
                },{
                    title: (<div className="table-last-th-up">行扩展码</div>),
                    dataIndex: 'glextl',
                    key: 'glextl',
                    width:120,
                    render: function (text, record, index) {
                        return (<div className={classnames("big-text",{"red-text":record.color})}>{text}</div>)
                    }
                }
            ];
    }

    //返回上级菜单
    backToAccount(){
        location.hash = "/ledger/accountReconciliation";
    }

    //获取表格数据
    getData(){
        let total = this.props.total;
        let size = this.props.pageSize;
        let num = this.props.pageNumber;
        let maxNum = Math.ceil(total/size);
        let data = Object.assign([],this.props.detail);
        let countData = {
            color:1,
            glaa:this.props.allCount,
            gldoc:"合计",
            rn:"count"
        };
        if(data.length == 0){
            return data;
        }
        if(maxNum > num){
            return data
        }
        data.push(countData);
        return data
    }

    //分页搜索
    onPageChange(page,pageSize){
        this.props.actions.getAccountDetails(this.props.dzf,this.props.bdzf,this.props.date,page,this.props.pageSize,this.props.type);
    }

    componentDidMount(){
        if("" === this.props.dzf || undefined === this.props.dzf || null === this.props.dzf ||
            "" === this.props.bdzf || undefined === this.props.bdzf || null === this.props.bdzf ||
            "" === this.props.date || undefined === this.props.date || null === this.props.date ||
            "" === this.props.type || undefined === this.props.type || null === this.props.type ) {
            return
        }
        this.props.actions.getAccountDetails(this.props.dzf,this.props.bdzf,this.props.date,1,this.props.pageSize,this.props.type);
    }

    componentWillUnmount(){
        this.props.actions.clearAccountDetailsTable();
    }

    render() {
        let tableScrollYFlag = false;
        let nameObj = ["","对账方.应收账款","对账方.预付账款","对账方.其他应收款","对账方.应付账款","对账方.预收账款","对账方.其他应付款",
            "被对账方.应收账款","被对账方.预付账款","被对账方.其他应收款","被对账方.应付账款","被对账方.预收账款","被对账方.其他应付款"];
        let type = this.props.type;
        let name = nameObj[type];
        let columns = this.getColumns();
        console.log(this.props);
        let scrollY = 0;
        if (this.props.total<=10){
            scrollY = this.props.mciH - 40 - 42 - 24 - 12 - 50 ;
        }else {
            scrollY = this.props.mciH - 40 - 42 - 24 - 12 - 50 - 43;
        }
        let data = this.getData();//this.props.detail;
        if (data.length > 0 && scrollY < data.length * 46 ){
            tableScrollYFlag = true;
        }
        return (
            <div className="GoodsSold-content">
                <header>
                    <a onClick={()=>this.backToAccount()} className="back-btn">
                        <span className="icon-Artboard_m"></span>
                        返回
                    </a>
                    {name}
                </header>
                <Table className={tableScrollYFlag?"hc-scc-table account-details-table":"hc-scc-table-scroll-y hc-scc-table account-details-table"}
                       bordered
                       key={this.props.tableKey}
                       dataSource={data}
                       columns={columns}
                       rowKey="rn"
                       scroll={{x:2720,y: scrollY}}
                       pagination={false}
                       loading={this.props.loading}
                />
                <div className={this.props.total > 10 ?"hc-scc-page-content":"hide"}>
                    <Pagination current={this.props.pageNumber} total={this.props.total}
                                onChange={(page, pageSize) => this.onPageChange(page, pageSize)}/>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state)=> {
    let accountDetails = state.get("accountDetails");
    return {
        pageNumber:accountDetails.pageNumber,
        pageSize:accountDetails.pageSize,
        total:accountDetails.total,
        detail:accountDetails.detail,
        count:accountDetails.count,
        loading:accountDetails.loading,
        dzf:accountDetails.searchParams.dzf,
        bdzf:accountDetails.searchParams.bdzf,
        date:accountDetails.searchParams.date,
        type:accountDetails.searchParams.type,
        allCount:accountDetails.searchParams.count,
        mciH:state.get("common").mciHeight
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({
            getAccountDetails:getAccountDetails,
            clearAccountDetailsTable:clearAccountDetailsTable,
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    GoodsSoldComp
);