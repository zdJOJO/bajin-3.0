/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie'
import {hashHistory} from 'react-router'

import Menu from '../../router/menu';
import HeaderBar from '../../components/headerNav/headBar'
import Set from './set';
import { Popup, Popupm, Button, Dialog, TextArea, Uploader } from 'react-weui'

import {dispatchFetchData, setFeedBackShow, changePostImgList} from '../../actions/userAction';
import { showFullPopup} from '../../actions/publicAction'

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
            ],
            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '取消',
                        onClick: this.hideDialog.bind(this)
                    },
                    {
                        type: 'primary',
                        label: '退出登录',
                        onClick: ()=>{
                            cookie.remove('token');
                            location.hash = '/#login'
                        }
                    }
                ]
            },
            diaLogShow:  false,
            feedbackDetail: '',
            demoFiles: [],
            personalSetShow: false   //个人设置
        }
    }

    componentWillMount(){
        const {dispatchFetchData, showFullPopup} = this.props;

        showFullPopup(false);
        
        if(cookie.load('token')){
            dispatchFetchData({
                type: 1
            });
        }else {
            hashHistory.push({
                pathname: '/login'
            })
        }
    }

    handleClick(path){
        location.hash = path;
    }

    hideDialog(){
        this.setState({
            diaLogShow: false
        })
    }

    render(){
        const {
            userInfo, showFullPopup, isFullPopupShow, dispatchFetchData, postImgList,
            feedBackShow, setFeedBackShow, changePostImgList
        } = this.props;
        return(
            <div id="user" className="panel panel-default">

                {/**** 系统设置 ***/}
                <Popup
                    show={isFullPopupShow}
                    onRequestClose={()=>{showFullPopup(false)}}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <div style={{textAlign:'center'}}>
                            <HeaderBar content="设置" type="3" onClick={()=>{showFullPopup(false)}}/>
                            <ul>
                                <MyLi title="修改密码" onClick={()=>{
                                   cookie.remove('token');
                                   hashHistory.push({
                                        pathname: '/login',
                                        query: {
                                            isNeedBack: 1,
                                            isChangePassWord: 1
                                        }
                                   })
                                }}/>
                                <li><a href="http://www.winthen.com/test/agreement.html">用户协议<i/></a></li>
                                <MyLi title="退出登录" onClick={()=>{this.setState({diaLogShow: true})}}/>
                            </ul>
                        </div>
                    </div>
                </Popup>

                {/**** 个人设置 ***/}
                <Popup
                    show={this.state.personalSetShow}
                    onRequestClose={()=>{this.setState({personalSetShow: false})}}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <HeaderBar  content="个人信息" type="3" onClick={()=>{this.setState({personalSetShow: false})}} />
                        <Set />
                    </div>
                </Popup>

                {/**** 意见反馈 ***/}
                <Popup
                    show={feedBackShow}
                    onRequestClose={()=>{setFeedBackShow(false)}}
                >
                    <div style={{height: '100vh', overflow: 'scroll'}}>
                        <div style={{textAlign:'center'}}>
                            <HeaderBar content="意见反馈" type="3" onClick={()=>{setFeedBackShow(false)}}/>
                            <div className="feedInfo">
                                <h3>问题与意见</h3>
                                <TextArea placeholder="请输入您的意见和建议" rows="5" maxlength="200"
                                          onChange={(e)=>{this.setState({feedbackDetail: e.target.value})}}
                                />
                                <div>
                                    <Uploader
                                        title="图片 （选填，提供问题截图)"
                                        maxCount={8}
                                        files={this.state.demoFiles}
                                        onError={msg => alert(msg)}
                                        onChange={(file,e) => {
                                            let newFiles = [...this.state.demoFiles, {url:file.data}];
                                            this.setState({
                                                demoFiles: newFiles
                                            });
                                            dispatchFetchData({
                                                type: 5,
                                                imgBase: file.data,
                                                postImgList: postImgList
                                            });
                                         }}
                                        onFileClick={
                                            (e, file, i) => {
                                                console.log('file click', file, i)
                                            }
                                        }
                                        lang={{
                                            maxError: ()=>{return false}
                                        }}
                                    />
                                </div>
                                <Button
                                    onClick={()=>{
                                        dispatchFetchData({
                                            type: 4,
                                            feedbackDetail: this.state.feedbackDetail,
                                            postImgList: postImgList
                                        })
                                    }}
                                >提交</Button>
                            </div>
                        </div>
                    </div>
                </Popup>

                
                <Dialog title={this.state.style2.title} buttons={this.state.style2.buttons} show={this.state.diaLogShow}>确定要出登录吗?</Dialog>

                <div className="headBox">
                    <div>
                        <img role="presentation" src={userInfo.headPic || head}
                             // onClick={this.handleClick.bind(this, '#/set')}
                             onClick={()=>{this.setState({personalSetShow: true})}}
                        />
                        <span className="userName">{userInfo.userName}</span>
                        <span className="certified">已认证</span>
                    </div>
                    <span className="setBtn" onClick={()=>{showFullPopup(true)}} />
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
                    <MyLi title="我的礼包" onClick={this.handleClick.bind(this, "#/myGift")}/>
                    <MyLi title="我的收藏"/>
                    <MyLi title="银行卡管理" onClick={this.handleClick.bind(this, "#/myBankCard")}/>
                    <MyLi title="意见反馈"  content="告诉我们您的宝贵意见"
                          onClick={()=>{
                                setFeedBackShow(true);
                                changePostImgList([]);
                                this.setState({
                                     feedbackDetail: '',
                                     demoFiles: []
                                })
                          }} />
                </ul>
                <Menu />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        userInfo:　state.userReducer.userInfo,
        postImgList: state.userReducer.postImgList,
        feedBackShow: state.userReducer.feedBackShow,

        isFullPopupShow: state.publicReducer.isFullPopupShow
    }
}

export default connect(
    mapStateToProps, {dispatchFetchData, showFullPopup, setFeedBackShow, changePostImgList}
)(MyInfo);