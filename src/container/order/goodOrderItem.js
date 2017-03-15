/**
 * Created by Administrator on 2017/03/15 0015.
 */
import React,{Component} from 'react';

import { Button } from 'react-weui'
import {timestampFormat} from '../../public'
class GoodOrderItem extends Component{

    transFormStatus(status){   // 1-待付款 2-已付款（待发货） 3-已发货
        switch (status){
            case 1:
                return '待付款';
            case 2:
                return '已付款';
            case 3:
                return '已发货';
        }
    }

    render(){
        return(
            <div className="goodOrderItem">
                <h4><span>订单编号: {this.props.order.orderModel.orderId}</span><i>{this.transFormStatus(this.props.order.orderModel.orderState)}</i></h4>
                <div>
                    <img role="presentation" src={this.props.order.detailOrderModels[0].hotPic} />
                    <p>{this.props.order.detailOrderModels[0].goodsTitle}</p>
                    <p>{this.props.order.detailOrderModels[0].skuGague}</p>
                    <p>
                        <span>￥{this.props.order.detailOrderModels[0].skuPrice}</span>
                        <span className="num">×{this.props.order.detailOrderModels[0].count}</span>
                    </p>
                </div>
                <div>
                    <span>总价：<i>￥{this.props.order.detailOrderModels[0].skuPrice * this.props.order.detailOrderModels[0].count}</i></span>
                    <Button size="small" className="payNow">立即支付</Button>
                    <Button type="default" size="small" className="cancel">取消订单</Button>
                </div>
            </div>
        )
    }
}

export default GoodOrderItem;