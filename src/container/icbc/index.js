/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HomeTitle from '../../components/homeTitle/index'
import MyDialog from '../../components/showPop/myDialog'

import { fetchData } from '../../actions/homeAction'
import { disPatchFetchOrder, showDialog } from '../../actions/publicAction'

import './index.css'

class Icbc extends Component{

    componentWillMount(){
        const {fetchData} = this.props;
        fetchData({
            type: 2,
            isHome: true
        })
    }

    handleClick(pickId){
        const {disPatchFetchOrder, showDialog, bankCardList } = this.props;
        if(bankCardList.length === 1){
            if(pickId===11 &&  bankCardList[0].bjke===0){
                showDialog(true);
                return
            }
            disPatchFetchOrder({
                type: 19 ,
                pickId: pickId,
                cardNumber: bankCardList[0].cardNumber,
                dom: this.refs.icbcForm
            })
        }else {
            location.hash = '#/myBankCard';
        }
    }
    
    render(){
        const {icbcBtnList, ciphertext, isDialogShow, showDialog} = this.props;
        return(
            <div className="icbcBox">
                <MyDialog
                    type="2"
                    title="提示"
                    content="请先绑定白金卡"
                    btn2Text="去绑卡"
                    show={isDialogShow}
                    showDialog={()=>{showDialog(false) }}
                />
                <HomeTitle 
                    title='工行服务'
                    typeStr='icbc'
                />
                <ul>
                    {
                        icbcBtnList.map( (item)=>{
                            return(
                                <li key={item.pickId}
                                    onClick={this.handleClick.bind(this,item.pickId)}
                                >
                                    <img role="presentation" src={item.buttonPic}/>
                                    <span className="buttonTitle">{item.buttonTitle}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <form
                    ref='icbcForm'
                    name="info"
                    method="post"
                    action="http://web.zj.icbc.com.cn/mobile/Bjzx.do?scene=bjzx"
                >
                    <input type="hidden" name="merSignMsg" value={ciphertext}/>
                    <input type="hidden" name="companyCis" value="bjzx"/>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        icbcBtnList: state.homeReducer.icbcBtnList,
        bankCardList: state.userReducer.bankCardList,

        ciphertext: state.publicReducer.ciphertext,
        isDialogShow: state.publicReducer.isDialogShow,
    }
}

export default connect(
    mapStateToProps,
    { fetchData, disPatchFetchOrder, showDialog }
)(Icbc)