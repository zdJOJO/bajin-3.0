/**
 * Created by Administrator on 2017/03/03 0003.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {ActionSheet} from 'react-weui';

import {showPayPopup} from '../../actions/publicAction'

class MyActionSheet extends Component{
    constructor(props){
        super(props);
        const {showPayPopup} = this.props;
        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: ()=>{ this.props.bandCarPay.bind(this) }
            }, {
                label: '微信支付',
                onClick: ()=> { console.log('微信支付')  }
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{showPayPopup(false)}
                }
            ]
        }
    }

    render(){
        const {showPayPopup} = this.props;
        return(
            <ActionSheet
                menus={this.state.menus}
                actions={this.state.actions}
                show={this.props.show}
                type="ios"
                onRequestClose={()=>{showPayPopup(false)}}
            />
        )
    }
}

function mapStateToProps(state) {
    return{}
}

export default connect(
    mapStateToProps, {showPayPopup}
)(MyActionSheet)