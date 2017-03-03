/**
 * Created by Administrator on 2017/03/03 0003.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeadBar from '../../components/headerNav/headBar'
import BankCardItem from '../../components/bankCardItem/index'
import {dispatchFetchData} from '../../actions/userAction'
import none from '../../img/bankList/none.png'
import './index.css'


class BankCard extends Component{

    componentWillMount(){
        const {dispatchFetchData} = this.props;
        dispatchFetchData({
            type: 2
        })
    }

    handleClick(cardNumber) {
        console.log('cardId is: ', cardNumber);
    }


    render(){
        const {bankCardList} = this.props;
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        bankCardList: state.userReducer.bankCardList
    }
}

export default connect(
    mapStateToProps, {dispatchFetchData}
)(BankCard) ;