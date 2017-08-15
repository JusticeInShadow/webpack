/**
 * Created by peng.xue on 2017/8/7.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {Table,Input, Pagination,Select,Button ,DatePicker,message} from "antd";
import {bindActionCreators} from 'redux';
import {getExcelList,
    deleteExcel
} from "../../../actions/app/List";
import {columnChange,

} from "../../../actions/app/Test";
import moment from "moment";
import classnames from "classnames";
import {getThousands,getNo,getNowMonth,trim} from "../../../utils/Util";
import "./Test.css"

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
        this.dragDrop = false;
        this.thResize = false;          //是否更改表格列宽
        this.lastTableHeaderTh = "";    //标记表格头部最后一个th，不渲染resize组件
    }

    getColumns() {
        var that = this;
        let column = this.props.column;
        this.lastTableHeaderTh = column[column.length-1].name;
        let initColumn = [{
            title: (<div>
                <p className="hc-t-head-operate order-number">&nbsp;</p>
                <p className="hc-t-head-text order-number"
                   ref="id"
                   onMouseDown={(e)=>this._mouseDown(e)}
                   onMouseMove={(e)=>this._mouseMove(e)}
                   onMouseUp={(e)=>this._mouseUp(e)}>#</p>
                {this.lastTableHeaderTh == "id"?"":
                    <div className="th-resize" onMouseDown={(e)=>this.handleMouseDown(e,"id")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text table-sorter" ref="file_url">输出报告</p>
                {this.lastTableHeaderTh == "file_url"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"file_url")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text table-sorter" ref="report_title">报告名称</p>
                {this.lastTableHeaderTh == "report_title"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"report_title")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text table-sorter" ref="file_name">版本明细</p>
                {this.lastTableHeaderTh == "file_name"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"file_name")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text table-sorter" ref="start_time">下载开始日期</p>
                {this.lastTableHeaderTh == "start_time"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"start_time")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text table-sorter" ref="end_time">下载结束日期</p>
                {this.lastTableHeaderTh == "end_time"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"end_time")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text" ref="status">状态</p>
                {this.lastTableHeaderTh == "status"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"status")}>
                    <span></span>
                </div>}
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
                <p className="hc-t-head-text" ref="operate">操作</p>
                {this.lastTableHeaderTh == "operate"?"":
                <div className="th-resize"
                     onMouseDown={(e)=>this.handleMouseDown(e,"operate")}>
                    <span></span>
                </div>}
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
        let newColumn = [];
        for(let i in column){
            for(let j in initColumn){
                if(column[i].name == initColumn[j].dataIndex){
                    let columnItem = Object.assign({},initColumn[j]);
                    columnItem.width = column[i].width;
                    newColumn.push(columnItem);
                    continue
                }
            }
        }
        console.log(newColumn);
        return newColumn
    }
    //
    _mouseDown(e){
        this.refs.refOrder
        this.dragDrop = true;
        this.x = e.pageX;
        this.y = e.pageY;
    }
    _mouseMove(e){

    }
    _mouseUp(e){
        this.dragDrop = false;
    }
    //表格th拖拽实现表格列宽改变
    handleMouseDown(e,type){
        e.stopPropagation();
        let that = this;
        this.thResize = true;

        let target = e.target;
        while(target && target.className !== "th-resize"){
            target = target.parentNode;
        }
        if(null === target || undefined === target || "" === target){
            console.log("鼠标目标错误")
            return
        }
        this.x = e.pageX;
        console.log("当前resize控件距离表格位置："+this.x);
        let column = Object.assign([],this.props.column);
        const handleMouseUp = (e) => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            if(!this.thResize){
                message.error("表格列宽更改失败！")
                return
            }
            let diffX = e.pageX - this.x;
            console.log("鼠标抬起拖拽最终位置："+diffX);
            for(let i in column){
                if(column[i].name == type){
                    column[i].width = column[i].width + diffX
                    column[i-0+1].width = column[i-0+1].width - diffX
                }
            }
            that.props.actions.columnChange(column);
            this.thResize = false;
            console.log("鼠标抬起，关闭拖拽");
        };
        const handleMouseMove = (e)=> {
            e.preventDefault();
            let currentDomWidth = 0;
            let nextDomWidth = 0;
            for(let i in column){
                if(column[i].name == type){
                    currentDomWidth = column[i].width
                    nextDomWidth = column[i-0+1].width
                }
            }
            let diffX = e.pageX - this.x;
            if(diffX > nextDomWidth || -diffX > currentDomWidth){
                console.log("边缘控制取消拖拽");
                this.thResize = false;
                return
            }
        };
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
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

    bigger(type){
        let column = Object.assign([],this.props.column);
        for(let i in column){
            if(column[i].name == type){
                column[i].width = column[i].width + 5
                column[i-0+1].width = column[i-0+1].width - 5
            }
        }
        console.log(column)
        this.props.actions.columnChange(column);
    }
    componentDidMount(){
        // this.props.actions.getExcelList(1,this.props.pageSize,this.searchKeys,"build");
        let column = Object.assign([],this.props.column);
        for(let i in column) {
            let ref= column[i].name;
            let refDom = ReactDOM.findDOMNode(this.refs[ref]);
            column[i].width = refDom.clientWidth;
        }
        this.props.actions.columnChange(column);
        let isIe = ("ActiveXObject" in window);
        console.log("这是ie浏览器么？"+isIe+"。");
        const handlePaste = function(e) {
            debugger;
            if(e.clipboardData.types.indexOf('text/html') > -1 && e.target.tagName === "INPUT"){
                let plain = e.clipboardData.getData('text/plain');
                plain = plain.split("\n");
                let finnalObjArr = [];
                for(let i in plain){
                    let item = plain[i];
                    let itemArr= item.split("\t");
                    if(itemArr.length == 1 && "" === itemArr[0]){
                        continue;
                    }
                    let itemObj = {
                        a:itemArr[0],
                        b:itemArr[1],
                        c:itemArr[2],
                        d:itemArr[3],
                        e:itemArr[4],
                        f:itemArr[5],
                        g:itemArr[6],
                        h:itemArr[7],
                        i:itemArr[8],
                        j:itemArr[9],
                    }
                    finnalObjArr.push(itemObj);
                }
                console.log(finnalObjArr);
                e.preventDefault(); // We are already handling the data from the clipboard, we do not want it inserted into the document
            }
        }
        document.addEventListener('paste', handlePaste);
    }

    componentWillUnmount() {
        this.searchKeys = {};
    }

    render() {
        let tableScrollYFlag = false;
        let columns = this.getColumns();
        console.log("V层，"+this.props.column[0].width);
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
        return (
            <div className="GoodsSold-content">
                <header>下载报告一览
                    <Button className="excel-button" onClick={()=>this.bigger("id")}>
                        <img src="../images/refresh.png" alt=""/>
                        刷新
                    </Button>
                </header>
                <div style={{position:"relative"}}>
                    <Table className={tableScrollYFlag?"download-table-scroll-y hc-scc-table download-table":"hc-scc-table download-table"}
                           bordered
                           key={this.props.tableKey}
                           dataSource={data}
                           columns={columns}
                           rowKey="uuid"
                           scroll={{y: scrollY}}
                           pagination={false}
                           loading={this.props.loading}
                           ref="dragTable"
                    />
                    <div style={this.props.style}></div>
                </div>

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
    let test = state.get('testList');
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
        mciH:state.get("common").mciHeight,
        column:test.column,
        style:test.style
    }
};

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({
            getExcelList:getExcelList,
            deleteExcel:deleteExcel,
            columnChange:columnChange
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(
    GoodsSoldComp
);