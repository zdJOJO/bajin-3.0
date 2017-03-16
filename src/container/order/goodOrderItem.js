/**
 * Created by Administrator on 2017/03/15 0015.
 */
import React,{Component} from 'react';

import { Button } from 'react-weui'

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
            <div className="goodOrderItem" onClick={()=>{this.props.onClick()}}>
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
                    { this.props.order.orderModel.orderState === 1 &&
                        <Button size="small" className="payNow"
                                onClick={(e)=>{
                                e.stopPropagation();
                                this.props.buy();
                            }}
                        >立即支付</Button>
                    }
                    { this.props.order.orderModel.orderState === 1 &&
                        <Button type="default" size="small" className="cancel"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    this.props.delelte();
                                }}
                        >取消订单</Button>
                    }
                </div>
            </div>
        )
    }
}

export default GoodOrderItem;