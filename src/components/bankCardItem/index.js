/**
 * Created by Administrator on 2017/03/03 0003.
 */
import React ,{Component} from 'react';

import './index.css'
import bjLogo from '../../img/bankList/bj-Card.png'
import ctLogo from '../../img/bankList/ct-Card.png'
import puLogo from '../../img/bankList/pu-Card.png'

export default class BankCardItem extends Component{
    render(){
        return(
            <div
                onClick={this.props.onClick}
                onTouchStart={this.props.onTouchStart}
                onTouchEnd={this.props.onTouchEnd}
                className={ this.props.classStr}
            >
                <div className="left">
                    {  this.props.cardInfo.bjke===1 &&
                    <img role="presentation" src={bjLogo} />
                    }
                    { this.props.cardInfo.ctkh===1 &&
                    <img role="presentation" src={ctLogo} />
                    }
                    { ( this.props.cardInfo.ctkh!==1 ||  this.props.cardInfo.bjke!==1) &&
                    <img role="presentation" src={puLogo} />
                    }
                </div>
                <div className="bg"></div>
                <div className="right">
                    <h2>中国工商银行</h2>
                    { this.props.cardInfo.bjke===1 &&
                    <p className="type">白金卡</p>
                    }
                    { this.props.cardInfo.ctkh===1 &&
                    <p className="type">信用卡</p>
                    }
                    { ( this.props.cardInfo.ctkh!==1 ||  this.props.cardInfo.bjke!==1) &&
                    <p className="type">信用卡</p>
                    }
                    <p className="number">
                        <span>**** **** **** </span>
                        {this.props.cardInfo.cardNumber}
                    </p>
                </div>
            </div>
        )
    }
}