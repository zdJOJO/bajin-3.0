/**
 * Created by Administrator on 2017/01/09 0009.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import { getActDetail ,actShowMore ,actBackTop} from '../../actions/activityAction';
import { getCommentList } from  '../../actions/commentAction';
import {disPatchFetchOrder ,showPayPopup} from '../../actions/publicAction'
import { timestampFormat } from '../../public';

import CourseItem from '../course/item';
import CommentIn from '../../components/comment/commentIn';
import BackTopBtn from '../../components/backTopBtn/index';

//import Using ES6 syntax
import {
    PanelHeader,
    Button,
    ActionSheet
} from 'react-weui';

import kefu from '../../img/detail/kefu.png';
import '../../components/detail.css';
import './index.css';

//假数据导入
import {selectList} from '../../public/falseData'

class ActivityInfo extends Component{
    constructor(props){
        super(props)
        const { showPayPopup} = this.props;
        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
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

    componentWillMount() {
        const { getActDetail ,getCommentList } = this.props;
        getActDetail(this.props.location.query.itemId);
        getCommentList({
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId,
            page: 0,
            isListNull: false,
            isInDetail: true
        })
    }

    handleSubmitOrderInfo(){
        const {activityInfo ,disPatchFetchOrder} = this.props;
        disPatchFetchOrder({
            type: 1,
            activityId: activityInfo.activityId,
            applyName: "棒棒哒",
            applyGender: "0",
            applyPhone: "15757115779",
            applyNumber: "100",
            applyPrice: "10000",
            applyRemark: "构造函数测试能否使用",
            inviteCode: "297988405",
            icbcManger: '{userId}'   //在创建活动是需要带上这个字段，老版本可不带。主要用于客户经理邀约的情况
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
            isShowBackTop ,times ,actShowMore ,isShowMoreDetail,
            showPayPopup ,isShowPayPopup ,ciphertext
        } = this.props;
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
                                            timestampFormat(activityInfo.startTime,true)+
                                            ' - ' +timestampFormat(activityInfo.endTime,true)
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

                        <div className="relate">
                            <PanelHeader>相关推荐</PanelHeader>
                            <div id="select" className="subContentPanel in">
                                {
                                    selectList.map((course,index)=>{
                                        return(
                                            <CourseItem
                                                key={index}
                                                course={course}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                }

                <div id="footBuy" className="do">
                    <img src={kefu} role="presentation" />
                    <Button id="flow" type="default" plain>关注</Button>
                    <Button id="buy"
                            onClick={()=>{showPayPopup(true)}}
                    >购买</Button>
                </div>

                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={isShowPayPopup}
                    type="ios"
                    onRequestClose={()=>{showPayPopup(false)}}
                />

                <form
                    method="post"
                    action="http://web.zj.icbc.com.cn/mobile/Pay.do?scene=pay"
                    ref="pay"
                >
                    <input type="hidden" id="merSignMsg" name="merSignMsg" value={ciphertext}/>
                    <input type="hidden" id="companyCis" name="companyCis" value="bjzx" />
                </form>

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
        ciphertext: state.publicReducer.ciphertext,
    }
}

export default connect(
    mapStateToProps,
    {
        getActDetail ,getCommentList,
        actShowMore ,actBackTop,
        showPayPopup ,disPatchFetchOrder
    }
)(ActivityInfo)


