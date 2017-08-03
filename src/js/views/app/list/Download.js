/**
 * Created by peng.xue on 2017/5/5.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table,Input, Pagination,Select,Button ,DatePicker} from "antd";
import {bindActionCreators} from 'redux';
import {getExcelList,
        deleteExcel
    } from "../../../actions/app/List";
import moment from "moment";
import classnames from "classnames";
import {getThousands,getNo,getNowMonth,trim} from "../../../utils/Util";

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
class GoodsSoldComp extends Component {
    constructor(props) {
        super(props);
        this.searchKeys = {
            title:"",
            start_time:"",
            end_time:"",
            status:null
        }
    }

    getColumns() {
        var that = this;
        return [{
            title: (<div>
                <p className="hc-t-head-operate order-number">&nbsp;</p>
                <p className="hc-t-head-text order-number">#</p>
            </div>),
            dataIndex: 'id',
            key: 'id',
            render: function (text, record, index) {
                let ind = index + 1;
                return getNo(ind,that.props.pageNumber,that.props.pageSize);
            },
            width: 60
        }, {
            title: (<div>
                <p className="hc-t-head-operate">&nbsp;</p>
                <p className="hc-t-head-text table-sorter">输出报告</p>
            </div>),
            dataIndex: 'file_url',
            key: 'file_url',
            width:100,
            render:function (text,record) {
                return (<div className="td-text">
                        <a href={text}>
                            {record.status == 1?<img src="../images/Fill 1.png" alt=""/>:<img src="../images/fill2.png" alt=""/>}
                        </a>
                </div>)
            }
        }, {
            title: (<div>
                <p className="hc-t-head-operate">
                    <Input
                           onChange={e => this.onSearchInputChange('title', e)}
                           key={this.props.type+"enquiryNumber"}
                           defaultValue = {""}
                           onKeyDown={e => this.onSearch('title', e)}/>
                </p>
                <p className="hc-t-head-text table-sorter">报告名称</p>
            </div>),
            dataIndex: 'report_title',
            key: 'report_title',
            width:160,
            render: function (text, record, index) {
                return (<div className="td-text">{text}</div>)
            }
        }, {
            title: (<div>
                <p className="hc-t-head-operate">&nbsp;</p>
                <p className="hc-t-head-text table-sorter">版本明细</p>
            </div>),
            dataIndex: 'file_name',
            key: 'file_name',
            width:245,
            render: function (text, record, index) {
                return (<div className="td-text">{text}</div>)
            }
        }, {
            title: (<div>
                <p className="hc-t-head-operate">
                    <DatePicker
                        key={this.props.type+"demandDate"}
                        defaultValue={null}
                        format="YYYY-MM-DD"
                        onChange={time =>this.onDateChange(time,"start_time")}
                    />
                </p>
                <p className="hc-t-head-text table-sorter">下载开始日期</p>
            </div>),
            dataIndex: 'start_time',
            key: 'start_time',
            width:160,
            render: function (text, record, index) {
                return (<div className="td-text">{text}</div>)
            }
        },{
            title: (<div>
                <p className="hc-t-head-operate">
                    <DatePicker
                        key={this.props.type+"demandDate"}
                        defaultValue={null}
                        format="YYYY-MM-DD"
                        onChange={time =>this.onDateChange(time,"end_time")}
                    />
                </p>
                <p className="hc-t-head-text table-sorter">下载结束日期</p>
            </div>),
            dataIndex: 'end_time',
            key: 'end_time',
            width:160,
            render: function (text, record, index) {
                return (<div className="td-text">{text}</div>)
            }
        },{
            title: (<div>
                <div className="hc-t-head-operate unique-th">
                    <Select onChange={(val)=>this.onSearchSelect("status",val)} defaultValue="全部" key={this.props.type+"supplierType"}>
                        <Option value={null}>全部</Option>
                        <Option value="0">进行中</Option>
                        <Option value="1">完成</Option>
                    </Select>
                </div>
                <p className="hc-t-head-text">状态</p>
            </div>),
            dataIndex: 'status',
            key: 'status',
            width:80,
            render:function (text) {
                let wordObj = {
                    0:"进行中",
                    1:"完成",
                    2:"失败"
                };
                return (<div className="td-text"><span>{wordObj[text]}</span></div>)
            }
        }, {
            title: (<div>
                <p className="hc-t-head-operate hc-operate-last">&nbsp;</p>
                <p className="hc-t-head-text">操作</p>
            </div>),
            dataIndex: 'operate',
            key: 'operate',
            render: function (text, record, index) {
                return (<div className="td-text">
                    <a onClick={()=>that.deleteDownloadFile(record,that.props.pageNumber,that.props.pageSize,that.searchKeys)}>删除</a>
                </div>)
            },
            width:65
        }];
    }

    //下拉框搜索
    onSearchSelect(key,val){
        if(null === val){
            this.searchKeys[key] = val;
        }else {
            this.searchKeys[key] = trim(val);
        }
        this.props.actions.getExcelList(1, this.props.pageSize,this.searchKeys,"");
    }
    //时间选择器的更改
    onDateChange(time,type){
        let t = "";
        if(null === time || undefined === time || "" === time){
        }else {
            t = moment(time).format("YYYY-MM-DD");
        }
        this.searchKeys[type] = t;
        this.props.actions.getExcelList(1, this.props.pageSize,this.searchKeys,"");
    }
    //删除当条数据
    deleteDownloadFile(rec,pageNumber,pageSize,searchParams){
        let uuid = rec.uuid;
        this.props.actions.deleteExcel(uuid,pageNumber,pageSize,searchParams);
    }
    //输入框变化搜索
    onSearchInputChange(type,e){
        let val = e.target.value;
        if(type.indexOf("co")>-1 && String(val).length>5){
            return
        }
        this.searchKeys[type] = val;
    }

    //enter执行搜索
    onSearch(type,e){
        let keyCode = e.keyCode;
        if (13 == keyCode) {
            this.props.actions.getExcelList(1,this.props.pageSize,this.searchKeys,"");
        }
    }
    //分页搜索
    onPageChange(page,pageSize){
        this.props.actions.getExcelList(page,this.props.pageSize,this.searchKeys,"");
    }
    //刷新
    refresh(){
        let searchParams = {
            title:"",
            start_time:"",
            end_time:"",
            status:null
        }
        this.props.actions.getExcelList(1,this.props.pageSize,searchParams,"build");
    }
    componentDidMount(){
        this.props.actions.getExcelList(1,this.props.pageSize,this.searchKeys,"build");
    }

    componentWillUnmount() {
        this.searchKeys = {};
    }

    render() {
        let tableScrollYFlag = false;
        let columns = this.getColumns();
        console.log(this.props);
        let scrollY = 0;
        if (this.props.total<=10){
            scrollY = this.props.mciH - 45 - 52 - 96 ;
        }else {
            scrollY = this.props.mciH - 45 - 52 - 96 - 43 - 12;
        }
        let data = this.props.detail;
        if (data.length > 0 && scrollY < data.length * 46 ){
            tableScrollYFlag = true;
        }
        console.log(tableScrollYFlag);
        return (
            <div className="GoodsSold-content">
                <header>下载报告一览
                    <Button className="excel-button" onClick={()=>this.refresh()}>
                        <img src="../images/refresh.png" alt=""/>
                        刷新
                    </Button>
                </header>
                <Table className={tableScrollYFlag?"download-table-scroll-y hc-scc-table download-table":"hc-scc-table download-table"}
                       bordered
                       key={this.props.tableKey}
                       dataSource={data}
                       columns={columns}
                       rowKey="uuid"
                       scroll={{y: scrollY}}
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
    let downloadList = state.get("downloadList");
    return {
        pageNumber:downloadList.pageNumber,
        pageSize:downloadList.pageSize,
        total:downloadList.total,
        detail:downloadList.detail,
        count:downloadList.count,
        loading:downloadList.loading,
        tableKey:downloadList.tableKey,
        title:downloadList.searchParams.title,
        start_time:downloadList.searchParams.start_time,
        end_time:downloadList.searchParams.end_time,
        status:downloadList.searchParams.status,
        mciH:state.get("common").mciHeight
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({
            getExcelList:getExcelList,
            deleteExcel:deleteExcel
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    GoodsSoldComp
);