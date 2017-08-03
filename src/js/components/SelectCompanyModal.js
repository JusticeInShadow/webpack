/**
 * Created by peng.xue on 2017/5/10.
 */
import React, {findDOMNode, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal,Input,message} from 'antd';
import {trim} from '../utils/Util';
import classnames from 'classnames';
import {
    changeSelectModal,
    changeSelectList
} from '../actions/app/SelectCompanyModal';

const Search = Input.Search;
class SelectCompanyModal extends Component {
    constructor(props) {
        super(props);
        this.pageNumber = 1;
        this.pageSize = 10000;
        this.selectMemberIndex = {};
        this.searchKey = {
            companyCode:"",
            companyName:""
        }
    }

    //关闭
    handleModalClose(flag){
        this.props.handleModalClose(flag);
    }

    //点击确定按钮
    handleAddressModelOK(Co){
        this.props.handleModalOK(Co);
    }

    //从公司代码获取公司对象
    searchCompanyByCode(e,type){
        let val = e.target.value;
        this.searchKey[type] = val;
        let list = this.props.addressList;
        let newList = [];
        for (let i in list){
            let listItemAlph = JSON.stringify(list[i].alph);
            let listItemAn8 = JSON.stringify(list[i].an8);
            let alph = this.searchKey.companyName;
            if(listItemAn8.indexOf(val) == 0 && listItemAlph.indexOf(alph) > -1){
                newList.push(list[i]);
            }
        }
        //打假造假，假作真时真亦假
        let length = newList.length;
        if(length<10){
            for(let j = length;j<10;j++){
                let obj = {
                    an8:"",
                    alph:""
                };
                newList.push(obj);
            }
        }
        this.props.actions.changeSelectList(newList);
    }

    //从公司名称获取公司对象
    searchCompanyByName(e,type){
        let val;
        if(e.length || e.length == 0){
            val = e;
        }else {
            val = e.target.value;
        }
        this.searchKey[type] = val;
        let list = this.props.addressList;
        let newList = [];
        for (let i in list){
            let listItemAlph = JSON.stringify(list[i].alph);
            let listItemAn8 = JSON.stringify(list[i].an8);
            let an8 = this.searchKey.companyCode;
            if(listItemAlph.indexOf(val) > -1 && listItemAn8.indexOf(an8) == 0){
                newList.push(list[i]);
            }
        }
        //打假造假，假作真时真亦假
        let length = newList.length;
        if(length<10){
            for(let j = length;j<10;j++){
                let obj = {
                    an8:"",
                    alph:""
                };
                newList.push(obj);
            }
        }
        this.props.actions.changeSelectList(newList);
    }

    //获取公司代号列表
    getCompanyCodeList(){
        let that = this;
        this.selectMemberIndex = {};
        let list = this.props.selectList.length > 0 ?this.props.selectList:this.props.addressList;
        if(!list.length){
            message.error("数据丢失，请联系管理员");
            list = [{},{},{},{},{},{},{},{},{},{}]
        }
        let selectedCompany = this.props.selectCompany;
        for(let i in selectedCompany){
            let selectedCompanyItem = selectedCompany[i];
            this.selectMemberIndex[selectedCompanyItem.an8] = selectedCompanyItem;
        }
        let newList = [];
        for (let i in list){
            let listItem = list[i];
            let li = <li key={i} className="company-item">
                <div className="company-item-left">{listItem.an8}</div>
                <div className="company-item-right">{listItem.alph}</div>
                {listItem.an8?<span className={this.selectMemberIndex[listItem.an8]?"icon-Artboard_k":"icon-Artboard_l"} onClick={()=>that.getSelectMember(listItem)}></span>:""}
            </li>;
            newList.push(li)
        }
        return newList
    }

    //获取选中公司
    getSelectMember(Co){
        let selectedCompany =[];
        selectedCompany.push(Co);
        this.props.actions.changeSelectModal(selectedCompany);
    }

    componentDidMount(){
        let list = this.props.addressList;
        this.props.actions.changeSelectList(list);
    }

    componentWillUnmount() {
        this.props.actions.changeSelectModal([]);
        this.searchKey = {
            companyCode:"",
            companyName:""
        }
    }

    render() {
        console.log(this.props);
       return(
           <Modal title={this.props.title}
                  className="address-modal"
                  visible={true}
                  closable={false}
                  maskClosable={false}
                  width={600}
                  onOk={()=>this.handleAddressModelOK(this.props.selectCompany)}
                  onCancel={()=>this.handleModalClose(false)}>
               <div className="address-modal-content">
                   <div className="address-modal-content-left">
                       <p className="address-modal-title">公司编码</p>
                       <div className="address-modal-listBox">
                           <div className="address-modal-search-input">
                                <Search
                                    placeholder="搜索..."
                                    onChange={(e) => this.searchCompanyByCode(e,"companyCode")}
                                />
                           </div>
                       </div>
                   </div>
                   <div className="address-modal-content-right">
                       <p className="address-modal-title">公司名称</p>
                       <div className="address-modal-listBox">
                           <div className="address-modal-search-input">
                               <Search
                                   placeholder="搜索..."
                                   onSearch={(val) => this.searchCompanyByName(val,"companyName")}
                                   onBlur={(e) => this.searchCompanyByName(e,"companyName")}
                               />
                           </div>
                       </div>
                   </div>

               </div>
               <ul className="address-modal-list">
                   {this.getCompanyCodeList()}
               </ul>
           </Modal>
       )
    }
}




const mapStateToProps = (state) => {
    let selectModal = state.get("selectModal");
    return {
        selectCompany:selectModal.selectCompany,
        selectList:selectModal.selectList
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            changeSelectModal:changeSelectModal,
            changeSelectList:changeSelectList
        }, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(
    SelectCompanyModal
);