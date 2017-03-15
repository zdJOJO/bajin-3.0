/**
 * Created by Administrator on 2017/03/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import ActOrderItem from './actOrderItem'
import GoodOrderItem from './goodOrderItem'
import { Popup, Popupm, Button, Dialog, PanelHeader,LoadMore } from 'react-weui'

import {fetchOrderList} from '../../actions/orderAciton'

import './index.css'

const tab = ['活动','臻品','课程'];
const status = ['全部','待付款','已付款','已发货'];   //已付款 = 待发货
class MyOrder extends Component{

    constructor(props){
        super(props);
        this.state = {
            page: 1,
            orderDetailShow:　false
        }
    }

    componentDidMount(){
        const {  fetchOrderList, orderTab, orderStatus } = this.props;
        fetchOrderList({
            type: 3,
            orderTab: orderTab,
            orderStatus: orderStatus,
            page: this.state.page
        })
    }

    render(){
        const {
            fetchOrderList, orderTab, orderStatus,
            orderList, isLoading, isHideMore
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

                {/**** 订单详情 ***/}
                <Popup
                    show={this.state.orderDetailShow}
                    onRequestClose={()=>{this.setState({orderDetailShow: false})}}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <HeaderBar content="订单详情" type="3" onClick={()=>{this.setState({orderDetailShow: false})}}/>

                    </div>
                </Popup>

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
                                                <ActOrderItem order={order} />
                                            }
                                            { orderTab===1 &&
                                                <GoodOrderItem order={order} />
                                            }
                                            { orderTab===2 &&
                                                <GoodOrderItem order={order} />
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
        isHideMore: state.orderReducer.isHideMore
    }
}

export default connect(
    mapStateToProps, {
       fetchOrderList
    }
)(MyOrder)