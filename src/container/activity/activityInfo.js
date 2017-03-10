/**
 * Created by Administrator on 2017/01/09 0009.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import { getActDetail ,actShowMore ,actBackTop, disPatchActFetch} from '../../actions/activityAction';
import { getCommentList } from  '../../actions/commentAction';
import {disPatchFetchOrder ,showPayPopup, disPatchFetchList, showDialog} from '../../actions/publicAction'
import { timestampFormat } from '../../public';


import CommentIn from '../../components/comment/commentIn'
import BackTopBtn from '../../components/backTopBtn/index'
import RelateList from '../../components/relateList/index'
import HeadBar from '../../components/headerNav/headBar'

//import Using ES6 syntax
import {
    PanelHeader,
    Button,
    ActionSheet, Popup, Dialog
} from 'react-weui';

import kefu from '../../img/detail/kefu.png';
import '../../components/detail.css';
import './index.css';

class ActivityInfo extends Component{
    constructor(props){
        super(props)
        const { showPayPopup, showDialog} = this.props;
        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
            }, {
                label: '微信支付',
                onClick: ()=> { console.log('微信支付') }
            }],
            actions: [{
                    label: '取消',
                    onClick: ()=>{showPayPopup(false)}
            }],
            fullpage_show: false,
            joinInfo:{
                name: JSON.parse(localStorage.userInfo).userName,
                phone: JSON.parse(localStorage.userInfo).phone,
                num: 1,
                inviteCode: '',
                reMark: ''
            },
            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '知道了',
                        onClick: ()=>{showDialog(false)}
                    },
                    {
                        type: 'primary',
                        label: '去绑卡',
                        onClick: ()=>{showDialog(false); location.hash='#/myBankCard'}
                    }
                ]
            }
        }
    }

    componentWillMount() {
        const { getActDetail ,getCommentList ,disPatchFetchList, disPatchActFetch } = this.props;
        getActDetail(this.props.location.query.itemId);
        getCommentList({
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId,
            page: 0,
            isListNull: false,
            isInDetail: true
        })
        disPatchFetchList(this.props.location.query.itemId);
        disPatchActFetch({
            type: 1,
            activityId: this.props.location.query.itemId
        })
    }

    handleSubmitOrderInfo(){
        const {activityInfo ,disPatchFetchOrder, showPayPopup} = this.props;
        showPayPopup(false);
        let data = {
            activityId: activityInfo.activityId,
            applyName: activityInfo.activityTitle,
            applyPhone: this.state.joinInfo.phone,
            applyGender: JSON.parse(window.localStorage.userInfo).gender,
            applyNumber: this.state.joinInfo.num,
            applyPrice : activityInfo.activityPrice *  this.state.joinInfo.num,
            applyRemark: this.state.joinInfo.reMark,
            //  icbcManger: '{userId}'   //在创建活动是需要带上这个字段，老版本可不带。主要用于客户经理邀约的情况
        }
        if(this.state.joinInfo.inviteCode){
            data.inviteCode = this.state.joinInfo.inviteCode;
        }
        disPatchFetchOrder({
            type: 1,
            data: data
        })
    }

    handleScroll(e){
        const {actBackTop} = this.props;
        let scrollTop  = this.refs.bodyBox.scrollTop;  //滚动条滚动高
        if(scrollTop/window.innerHeight >=0.85){
            actBackTop(0)
        }else {
            actBackTop(1)
        }
        console.log(this.refs.bodyBox.scrollHeight)
        console.log(scrollTop)
    }

    render(){
        const {
            activityInfo ,listInDetail ,rowCount,
            isShowBackTop ,times ,actShowMore ,isShowMoreDetail, isDialogShow,errorStr,
            showPayPopup ,isShowPayPopup ,ciphertext, recommendedList,
            userActStatus,
        } = this.props;

        let actStatus;
        if(activityInfo){
            if(activityInfo.startTime*1000 > new Date().getTime()){
                actStatus = (<Button id="buy" className="default">未开始</Button>);
            }else{
                if(activityInfo.applyEndTime*1000 < new Date().getTime()){
                    actStatus = (<Button id="buy" className="default">报名已截止</Button>);
                }
                switch (userActStatus){
                    /*
                     *   1;  //已报名
                     2;  //活动已结束
                     3; //已停止报名
                     4; //报名人数已满
                     5;  //可正常报名
                     * */
                    case 1:
                        actStatus = (<Button id="buy" className="default" >已报名</Button>);
                        break;
                    case 2:
                        actStatus = (<Button id="buy" className="default">活动已结束</Button>);
                        break;
                    case 3:
                        actStatus = (<Button id="buy" className="default">已停止报名</Button>);
                        break;
                    case 4:
                        actStatus = (<Button id="buy" className="default">报名人数已满</Button>);
                        break;
                    case 5:
                        actStatus = (<Button id="buy" onClick={e=>this.setState({fullpage_show: true})} >报名</Button>);
                        break;
                }
            }
        }

        return(
            <div className="panel panel-default">
                <BackTopBtn
                    className={ (isShowBackTop===1&&times>0) ? "down" : (isShowBackTop===0 ? 'up' : '') }
                    dom={this.refs.bodyBox}
                />

                { activityInfo &&
                    <div id="selectDetail" className="actDetail"
                         ref="bodyBox"
                         onScroll={this.handleScroll.bind(this)}
                    >

                        <div className="head">
                            <img src={activityInfo.maxPic} role="presentation"/>
                            <h3>{activityInfo.activityTitle}</h3>
                            <div>
                                <PanelHeader>
                                    <span className="act">当日活动</span>
                                    已经报名{activityInfo.applyNumber}人 / 还有{activityInfo.maxApply-activityInfo.applyNumber}个名额
                                </PanelHeader>
                                <PanelHeader/>
                            </div>
                            <ul>
                                <li>
                                    <i className="one"/>
                                    <span className="text">活动时间</span>
                                    <span className="value">
                                        {
                                            timestampFormat(activityInfo.startTime,1)+
                                            ' - ' +timestampFormat(activityInfo.endTime,1)
                                        }
                                    </span>
                                </li>
                                <li>
                                    <i className="two"/>
                                    <span className="text">查看地点</span>
                                    <span className="value">{activityInfo.activityAddress}</span>
                                    <span className="more" />
                                </li>
                                <li>
                                    <i className="three"/>
                                    <span className="text">费用</span>
                                    <span className="value">
                                        {activityInfo.activityPrice === 0 ? '会员专享' : activityInfo.activityPrice }
                                    </span>
                                </li>
                                <li>
                                    <i className="four"/>
                                    <span className="text">相关视频</span>
                                    <span className="value">共27条视频</span>
                                    <span className="more" />
                                </li>
                            </ul>
                        </div>

                        <div className="body">
                            <h3>课程亮点</h3>
                            <div className={!isShowMoreDetail ? 'detailInfo' : 'detailInfo long'}>
                                <div
                                    className="content"
                                    dangerouslySetInnerHTML={{__html: activityInfo.activityDetail}}
                                ></div>
                                { !isShowMoreDetail&&
                                    <div className="show"
                                         onClick={()=>{actShowMore(true)}}
                                    >
                                        <h4>展开课程亮点↓</h4>
                                    </div>
                                }
                            </div>
                        </div>

                        <CommentIn commentObj={
                            {
                                itemType: 1,
                                itemId: activityInfo.activityId,
                                rowCount: rowCount,
                                commentList: listInDetail
                            }
                        } />

                        <RelateList recommendedList={recommendedList} />
                    </div>
                }

                <div id="footBuy" className="do">
                    <img src={kefu} role="presentation" />
                    <Button id="flow" type="default" plain>关注</Button>
                    {actStatus}
                </div>

                { activityInfo &&
                    <Popup
                            show={this.state.fullpage_show}
                            onRequestClose={e=>this.setState({fullpage_show: false})}
                            >
                            <Dialog title={this.state.style2.title} buttons={this.state.style2.buttons} show={isDialogShow}>
                            {errorStr}
                            </Dialog>

                            <div style={{height: '100vh', overflow: 'scroll'}}>
                            <HeadBar content="填写报名信息" type="3" onClick={e=>this.setState({fullpage_show: false})}/>
                            <div className="info">
                            <div className="actHead">
                            <img role="presentation" src={activityInfo.activityPic}/>
                            <div>
                            <p className="address">{activityInfo.activityTitle}</p>
                            <p className="time"> {
                            timestampFormat(activityInfo.startTime,1)+
                            ' - ' +timestampFormat(activityInfo.endTime,1)
                        }</p>
                            </div>
                            </div>
                            <ul className="infoBox">
                            <li>真实姓名:<input type="text" placeholder="请填写真实姓名 (不能为空)"
                            value={this.state.joinInfo.name}
                            onChange={(e)=>{
                            this.setState({
                                ...this.state,
                                joinInfo:{
                                    ...this.state.joinInfo,
                                    name: e.target.value
                                }
                            })
                        }}
                            /></li>
                            <li>联系电话:<input type="tel" placeholder="请填写电话 (不能为空)"
                            value={this.state.joinInfo.phone}
                            onChange={(e)=>{
                            this.setState({
                                ...this.state,
                                joinInfo:{
                                    ...this.state.joinInfo,
                                    phone: e.target.value
                                }
                            })
                        }}
                            /></li>
                            <li>报名人数: <input type="number" placeholder="请填写参加人数(不能为空)"
                            value={this.state.joinInfo.num}
                            onChange={
                            (e)=>{
                                this.setState({
                                    ...this.state,
                                    joinInfo:{
                                        ...this.state.joinInfo,
                                        num: e.target.value
                                    }
                                })
                            }}
                            />人</li>
                            <li>报名费用: <span>{activityInfo.activityPrice===0 ? '会员专享' : '￥'+activityInfo.activityPrice+'元'}</span></li>
                            </ul>
                            <div className="jobNum">
                            <h3>受邀客户请填写:</h3>
                            <input type="tel" placeholder="邀约您的客户经理的统一认证柜员号（9位数）"
                            onChange={(e)=>{this.setState({...this.state.inviteCode, inviteCode: e.target.value})}}
                            />
                            </div>
                            <h3 className="note">备注:</h3>
                            <textarea className="note_q" type="text" placeholder="如有其他需求请在此备注"
                            onChange={(e)=>{this.setState({
                            ...this.state,
                            joinInfo:{
                                ...this.state.joinInfo,
                                reMark: e.target.value
                            }
                        })}}
                            />
                            </div>
                            <Button  onClick={()=>{
                            showPayPopup(true);
                        }} >确认</Button>
                            </div>
                    </Popup>
                }

                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={isShowPayPopup}
                    type="ios"
                    onRequestClose={()=>{showPayPopup(false)}}
                />
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        activityInfo: state.detailReducer.activityInfo,
        actStateStr: state.detailReducer.actStateStr,
        isShowBackTop: state.detailReducer.isShowBackTop,
        isShowMoreDetail: state.detailReducer.isShowMoreDetail,
        times: state.detailReducer.times,
        
        listInDetail: state.commentReducer.listInDetail,
        rowCount: state.commentReducer.rowCount,

        isShowPayPopup: state.publicReducer.isShowPayPopup,
        isDialogShow: state.publicReducer.isDialogShow,
        errorStr:　state.publicReducer.errorStr,
        ciphertext: state.publicReducer.ciphertext,
        recommendedList: state.publicReducer.recommendedList,

        userActStatus: state.activityReducer.userActStatus
    }
}

export default connect(
    mapStateToProps,
    {
        getActDetail ,getCommentList,
        actShowMore ,actBackTop,
        showPayPopup ,showDialog, disPatchFetchOrder ,disPatchFetchList,
        disPatchActFetch
    }
)(ActivityInfo)


