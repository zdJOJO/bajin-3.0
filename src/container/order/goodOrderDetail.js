/**
 * Created by Administrator on 2017/03/16 0016.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import { Button, Dialog, ActionSheet } from 'react-weui'

import {fetchOrderList} from '../../actions/orderAciton'


// 1-待付款 2-已付款（待发货） 3-已发货
const transFormState = (orderState) =>{
    if(orderState===1){
        return '待付款'
    }else if(orderState===2){
        return '已付款'
    }else {
        return '已发货'
    }
};

class GoodOrderDetail extends Component{
    constructor(props){
        super(props);
        const {
            fetchOrderList, orderTab, orderStatus
        } = this.props;
        this.state = {
            isShowDelete: false,

            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: ()=>{this.setState({isShowDelete: false})}
                    },
                    {
                        type: 'primary',
                        label: '确定',
                        onClick: ()=>{
                            fetchOrderList({
                                type: 4,
                                orderTab: orderTab,
                                status: orderStatus,
                                page: 1,
                                orderId: this.props.goodOrder.orderModel.orderId
                            });
                            this.setState({isShowDelete: false});
                            this.props.hideDetail()
                        }
                    }
                ]
            }
        }
    }

    render(){
        return(
            <div className="goodOrderDetail">

                {/*删除订单提示*/}
                <Dialog type="ios"
                        title={this.state.style2.title}
                        buttons={this.state.style2.buttons}
                        show={this.state.isShowDelete}
                >
                    确定要删除该订单吗？
                </Dialog>
                

                <div className="orderInfo">
                    <h3>订单信息</h3>
                    <ul>
                        <li>
                            <span>订单编号:</span>
                            <span className="two">{this.props.goodOrder.orderModel.orderId}</span>
                        </li>
                        <li>
                            <span>下单时间:</span>
                            <span className="two">{this.props.goodOrder.orderModel.createTime}</span>
                        </li>
                        <li className="last">
                            <span>订单状态:</span>
                            <span className="two">{transFormState(this.props.goodOrder.orderModel.orderState)}</span>
                            { this.props.goodOrder.orderModel.orderState === 1 &&
                                <Button size="small" type="default"
                                        onClick={ ()=>{
                                            this.setState({isShowDelete: true});
                                        } }
                                >取消订单</Button>
                            }
                        </li>
                    </ul>
                </div>

                <div className="addressInfo">
                    <h3>配送信息</h3>
                    <ul>
                        <li>
                            <span>收货人:</span>
                            <span className="two">{this.props.receiveAddress.receiverName}</span>
                        </li>
                        <li>
                            <span>联系电话:</span>
                            <span className="two">{this.props.receiveAddress.receiverPhone}</span>
                        </li>
                        <li className="last">
                            <span>收货地址:</span>
                            <span className="two">
                                {this.props.receiveAddress.province}-{this.props.receiveAddress.city}-{this.props.receiveAddress.district}
                                -{this.props.receiveAddress.detilAddress}
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="goodInfo">
                    <h3>商品详情</h3>
                    <div className="itemGood">
                        <img role="presentation" src={this.props.goodOrder.detailOrderModels[0].hotPic}/>
                        <div>
                            <p>{this.props.goodOrder.detailOrderModels[0].goodsTitle}</p>
                            <p>{this.props.goodOrder.detailOrderModels[0].skuGague}</p>
                            <p>
                                ￥{this.props.goodOrder.detailOrderModels[0].skuPrice}
                                <span className="num">×{this.props.goodOrder.detailOrderModels[0].count}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="other">
                    <p className="remarkCnt">
                        备注: {this.props.goodOrder.orderModel.orderRemark || '暂无备注'}
                    </p>
                    <h3>
                        <span>臻品总额:</span>
                        <span className="totalPay">￥{this.props.goodOrder.orderModel.orderCount}</span>
                    </h3>
                    <p>实付款: ￥{this.props.goodOrder.orderModel.orderCount}</p>
                </div>

            </div>
        )
    }
}


function mapStateToProps(state) {
    return{
        orderTab: state.orderReducer.orderTab,
        orderStatus:  state.orderReducer.orderStatus
    }
}

export default connect(
    mapStateToProps, {
        fetchOrderList
    }
)(GoodOrderDetail);