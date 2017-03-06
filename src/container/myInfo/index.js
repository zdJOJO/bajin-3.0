/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import Menu from '../../router/menu';

import {dispatchFetchData} from '../../actions/userAction';

import head from '../../img/login/headPic_default.png'
import './index.css'

class MyLi extends Component{
    render(){
        return(
            <li className={this.props.content ? '' : 'title'}  onClick={this.props.onClick}>
                {this.props.title}
                { this.props.content &&
                    <span>
                        {this.props.content}
                        <i />
                    </span>
                }
                { ! this.props.content &&
                    <i />
                }
            </li>
        )
    }
}


class MyInfo extends Component{

    constructor(props){
        super(props)
        this.state = {
            orderList: [
                {
                    status: '',
                    statuStr: '待付款'
                },
                {
                    status: '',
                    statuStr: '已付款'
                },
                {
                    status: '',
                    statuStr: '已发货'
                },
                {
                    status: '',
                    statuStr: '待评价'
                }
            ]
        }
    }

    componentWillMount(){
        const {dispatchFetchData} = this.props;
        dispatchFetchData({
            type: 1
        })
    }

    handleClick(path){
        location.hash = path;
    }

    render(){
        const { userInfo } = this.props;
        return(
            <div id="user" className="panel panel-default">
                <div className="headBox">
                    <div>
                        <img role="presentation" src={userInfo.headPic || head} onClick={this.handleClick.bind(this, '#/set')}/>
                        <span className="userName">{userInfo.userName}</span>
                        <span className="certified">已认证</span>
                    </div>
                    <span className="setBtn" onClick={this.handleClick.bind(this, '')}/>
                </div>
                <ul>
                    <MyLi title="我的订单" content="查看全部订单"/>
                    <li className="menu">
                        {
                            this.state.orderList.map((order,index)=>{
                                return(
                                    <p className={'oreder'+index} key={index}>
                                        <span>{order.statuStr}</span>
                                    </p>
                                )
                            })
                        }
                    </li>
                    <MyLi title="我的课程" onClick={this.handleClick.bind(this, "#/myCourse")}/>
                    <MyLi title="我的礼包"/>
                    <MyLi title="我的收藏"/>
                    <MyLi title="银行卡管理" onClick={this.handleClick.bind(this, "#/myBankCard")}/>
                    <MyLi title="意见反馈" content="告诉我们您的宝贵意见"/>
                </ul>
                <Menu />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        userInfo:　state.userReducer.userInfo
    }
}

export default connect(
    mapStateToProps, {dispatchFetchData}
)(MyInfo);