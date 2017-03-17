/**
 * Created by Administrator on 2017/03/03 0003.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeadBar from '../../components/headerNav/headBar'
import BankCardItem from '../../components/bankCardItem/index'
import {dispatchFetchData} from '../../actions/userAction'
import { getOrderCiphertext } from '../../actions/publicAction'
import none from '../../img/bankList/none.png'
import './index.css'


class BankCard extends Component{

    componentDidMount (){
        const {dispatchFetchData} = this.props;
        dispatchFetchData({
            type: 2
        })
    }

    handleClick(cardNumber) {
        console.log('cardId is: ', cardNumber);
        const { getOrderCiphertext } = this.props;
        if(this.props.location.query.type==='1'){
            //活动
            console.log('活动订单id: ', this.props.location.query.orderId);
            getOrderCiphertext({
                type: 1,
                cardno: cardNumber,
                applyId:  this.props.location.query.orderId,
                dom: this.refs.pay
            });
        }else if(this.props.location.query.type==='3'){
            //臻品
            getOrderCiphertext({
                type: 3,
                cardno: cardNumber,
                orderId:  this.props.location.query.orderId,
                dom: this.refs.pay
            });
        }
    }


    render(){
        const {bankCardList, ciphertext} = this.props;
        return(
            <div id="bankList">
                <HeadBar content="我的银行卡" type="2"/>
                { bankCardList.length === 0 &&
                    <div className="noList">
                        <img role="presentation" src={none}/>
                        <h3>您还未绑定银行卡</h3>
                        <a className="addCard">立即绑定&gt;&gt;</a>
                    </div>
                }
                { bankCardList.length > 0 &&
                   <div className="list">
                       {
                           bankCardList.map( itemCard =>{
                               return(
                                   <BankCardItem
                                       key={itemCard.cardId}
                                       onClick={this.handleClick.bind(this, itemCard.cardNumber)}
                                       cardNumber={itemCard.cardNumber}
                                       cardInfo={itemCard}
                                       classStr={itemCard.bjke===1?'cardItem bj'
                                           :(itemCard.ctkh===1?'cardItem ct':'cardItem pu')}
                                   />
                               )
                           })
                       }
                   </div>
                }

                <form
                    method="post"
                    action="http://web.zj.icbc.com.cn/mobile/Pay.do?scene=pay"
                    ref="pay"
                >
                    <input type="hidden" id="merSignMsg" name="merSignMsg" value={ciphertext}/>
                    <input type="hidden" id="companyCis" name="companyCis" value="bjzx" />
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        bankCardList: state.userReducer.bankCardList,
        ciphertext: state.publicReducer.ciphertext
    }
}

export default connect(
    mapStateToProps, {dispatchFetchData, getOrderCiphertext}
)(BankCard) ;