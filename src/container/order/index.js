/**
 * Created by Administrator on 2017/03/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'

import HeaderBar from '../../components/headerNav/headBar'
import ActOrderItem from './actOrderItem'
import GoodOrderItem from './goodOrderItem'
import GoodOrderDetail from './goodOrderDetail'
import { Popup, Button, Dialog, PanelHeader,LoadMore, Toast, ActionSheet } from 'react-weui'

import {fetchOrderList} from '../../actions/orderAciton'
import { getWxParam } from '../../actions/publicAction'

import './index.css'

const tab = ['活动','臻品'];
const status = ['全部','待付款','已付款','已发货'];   //已付款 = 待发货
class MyOrder extends Component{

    constructor(props){
        super(props);
        const { getWxParam } = this.props;
        this.state = {
            page: 1,
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
                        onClick: this.handleDelete.bind(this)
                    }
                ]
            },
            isShowDelete: false,
            orderDetailShow:　false,
            orderId: 0,
            orderDetail: {},

            payShow: false,  //支付
            menus: [{
                label: '银行卡支付',
                onClick: ()=> {
                    console.log('银行卡支付');
                    hashHistory.push({
                        pathname: `/myBankCard`,
                        query: {
                            type: 3,
                            orderId: this.state.orderId
                        }
                    });
                }
            }, {
                label: '微信支付',
                onClick: ()=> {
                    console.log('微信支付');
                    getWxParam({
                        orderId: this.state.orderId,
                        ip: window.returnCitySN.cip,
                        type: 0
                    })
                }
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{ this.setState({payShow: false}) }
                }
            ]

        }
    }

    componentDidMount(){
        const {  fetchOrderList, orderTab, orderStatus } = this.props;

        if(!this.props.location.query){
            fetchOrderList({
                type: 3,
                orderTab: orderTab,
                status: orderStatus,
                page: this.state.page
            });
        }else {
            // 0-全部 1-待付款  2-已付款 3-已发货 4-待评价
            fetchOrderList({
                type: 3,
                orderTab: 1,
                status: parseInt(this.props.location.query.state),
                page: 1
            });
        }
    }
    
    handleDelete(id){
        const {  fetchOrderList, orderTab, orderStatus } = this.props;
        if(id && typeof (id)==='number'){
            this.setState({
                isShowDelete: true,
                orderId: id
            });
        }else{
            fetchOrderList({
                type: 4,
                orderTab: orderTab,
                status: orderStatus,
                page: 1,
                orderId: this.state.orderId
            });
            this.setState({isShowDelete: false})
        }
    }
    
    handleBuy(order){
        this.setState({
            orderDetail: order,
            orderDetailShow: true
        })
    }

    render(){
        const {
            fetchOrderList, orderTab, orderStatus,
            orderList, isLoading, isHideMore, isShowDeleteSuccess,
            receiveAddress
        } = this.props;
        return(
            <div id="order" className="panel panel-default">
                <div className="head">
                    <HeaderBar content="我的订单" type="2"/>
                    <div className="tab">
                       <div style={{width: '60%', margin: 'auto', display: 'flex'}}>
                           {
                               tab.map((tab, index)=>{
                                   return(
                                       <a className={orderTab===index ? 'active' : ''} key={index}
                                          onClick={()=>{
                                              this.setState({page: 1});
                                              fetchOrderList({
                                                   type: 1,
                                                   orderTab: index,
                                                   status: 0,
                                                   page: 1
                                              })}}
                                       >{tab}</a>
                                   )
                               })
                           }
                       </div>
                    </div>
                    { orderTab !== 0 &&
                        <div className="status">
                            {
                                status.map((status, index)=>{
                                    return(
                                        <a className={orderStatus===index ? 'active' : ''} key={index}
                                           onClick={()=>{
                                               this.setState({page: 1});
                                               fetchOrderList({
                                                    type: 2,
                                                    orderTab: orderTab,
                                                    status: index,
                                                    page: 1
                                               })}}
                                        >{status}</a>
                                    )
                                })
                            }
                        </div>
                    }
                </div>

                {/*订单详情*/}
                <Popup
                    show={this.state.orderDetailShow}
                    onRequestClose={()=>{this.setState({orderDetailShow: false})}}
                >
                    <div>
                        <div style={{height: '100vh', overflowY: 'scroll'}}>
                            <HeaderBar content="订单详情" type="3" onClick={()=>{this.setState({orderDetailShow: false})}}/>
                            {/*活动订单详情*/}
                            { orderTab===0 && this.state.orderDetail.activityId &&
                            <div className="actOrderDetail">
                                <ActOrderItem order={this.state.orderDetail}/>
                                <ul>
                                    <li>
                                        <span>报名登记:</span>
                                        <span>{this.state.orderDetail.applyName}</span>
                                    </li>
                                    <li>
                                        <span>联系电话:</span>
                                        <span>{this.state.orderDetail.applyPhone}</span>
                                    </li>
                                    <li>
                                        <span>邮箱地址:</span>
                                        <span>{this.state.orderDetail.applyEmail}</span>
                                    </li>
                                    <li>
                                        <span>报名人数:</span>
                                        <span>{this.state.orderDetail.applyNumber} 人</span>
                                    </li>
                                    <li>
                                        <span>活动费用:</span>
                                        <span>{this.state.orderDetail.applyPrice===0?'免费':this.state.orderDetail.applyPrice}</span>
                                    </li>
                                    <li>
                                        <span>备注要求:</span>
                                        <span>{this.state.orderDetail.applyRemark}</span>
                                    </li>
                                </ul>
                            </div>
                            }
                            {/*臻品订单详情*/}
                            { orderTab===1 && this.state.orderDetail.orderModel &&
                                <GoodOrderDetail
                                    receiveAddress={receiveAddress}
                                    goodOrder={this.state.orderDetail}
                                    hideDetail={ ()=>{this.setState({orderDetailShow: false})} }
                                />
                            }
                        </div>

                        { orderStatus === 1 &&
                            <Button
                                onClick={()=>{this.setState({payShow: true})}}
                            >去付款</Button>
                        }
                        { orderStatus === 1 &&
                            <ActionSheet
                                menus={this.state.menus}
                                actions={this.state.actions}
                                show={this.state.payShow}
                                type="ios"
                                onRequestClose={e=>this.setState({payShow: false})}
                            />
                        }
                    </div>
                </Popup>

                {/*删除订单提示*/}
                <Dialog type="ios"
                        title={this.state.style2.title}
                        buttons={this.state.style2.buttons}
                        show={this.state.isShowDelete}
                >
                    确定要删除该订单吗？
                </Dialog>
                <Toast icon="success-no-circle" show={isShowDeleteSuccess}>删除成功</Toast>

                <div className={ orderTab !== 0 ? 'orderList' : 'orderList two'}>
                    { orderList.length === 0 &&
                        <div className="none">
                            <i />
                            <h3>您还没有订单</h3>
                            <a href={orderTab===0 ? '#/activity' : (orderTab===1? '':'#/course')}
                               className="turnPage">再去看看吧&gt;&gt;</a>
                        </div>
                    }
                    { orderList.length > 0 &&
                        <div style={{marginBottom: '1.2rem'}}>
                            {
                                orderList.map((order, index)=>{
                                    return(
                                        <div key={index} >
                                            { orderTab===0 &&
                                                <ActOrderItem order={order}
                                                              onClick={ ()=>{ this.setState({
                                                                  orderDetail: order,
                                                                  orderDetailShow: true
                                                              }) }}
                                                />
                                            }
                                            { orderTab===1 &&
                                                <GoodOrderItem
                                                    order={order}
                                                       delelte={this.handleDelete.bind(this, order.orderModel.orderId)}
                                                       buy={this.handleBuy.bind(this, order)}
                                                       onClick={ ()=>{
                                                           this.setState({
                                                              orderDetail: order,
                                                              orderDetailShow: true
                                                           });

                                                           fetchOrderList({
                                                                type: 5,
                                                                receiveId: order.orderModel.receiveId
                                                           })
                                                       }}
                                                />
                                            }
                                        </div>
                                    )
                                })
                            }

                            { isHideMore &&
                                <PanelHeader>
                                    { !isLoading &&
                                    <Button
                                        type="default" size="small"
                                        onClick={()=>{
                                            this.setState({page: this.state.page+1});
                                            fetchOrderList({
                                                    type: 3,
                                                    orderTab: orderTab,
                                                    status: orderStatus,
                                                    page: this.state.page + 1
                                            })
                                        }}
                                    >点击加载更多订单</Button>
                                    }
                                    { isLoading &&
                                    <LoadMore loading>Loading</LoadMore>
                                    }
                                </PanelHeader>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        orderTab: state.orderReducer.orderTab,
        orderStatus: state.orderReducer.orderStatus,
        orderList: state.orderReducer.orderList,
        isLoading: state.orderReducer.isLoading,
        isHideMore: state.orderReducer.isHideMore,
        isShowDeleteSuccess: state.orderReducer.isShowDeleteSuccess,

        receiveAddress: state.orderReducer.receiveAddress
    }
}

export default connect(
    mapStateToProps, {
       fetchOrderList, getWxParam
    }
)(MyOrder)