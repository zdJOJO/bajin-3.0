/**
 * Created by Administrator on 2017/02/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CommentIn from '../../components/comment/commentIn'
import BackTopBtn from '../../components/backTopBtn/index'
import RelateList from '../../components/relateList/index'
import '../../components/detail.css';
//import Using ES6 syntax
import {
    PanelHeader,
    Button,
    ActionSheet,Toast
} from 'react-weui';

import {fetchInfo ,showMoreCourseDetail} from '../../actions/courseAction'
import {disPatchFetchOrder ,showPayPopup ,disPatchFetchList, fetchCollect} from '../../actions/publicAction'
import {getCommentList} from '../../actions/commentAction'

import more from '../../img/more.svg';
import vedio from '../../img/detail/vedio.png';
import down from '../../img/detail/down.png';


class SelectDetail extends Component{

    constructor(props){
        super(props);
        const { showPayPopup} = this.props;
        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
            }, {
                label: '微信支付',
                onClick: this.handleSubmitOrderInfo.bind(this, 'wxPay')
            }],
            actions: [
                {
                    label: '取消',
                    onClick: ()=>{showPayPopup(false)}
                }
            ]
        }
    }

    componentDidMount (){
        const { fetchInfo ,getCommentList ,disPatchFetchList, fetchCollect } = this.props;
        fetchInfo(-1 ,-1 ,this.props.location.query.itemId);
        fetchInfo(-2,-1);
        getCommentList({
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId,
            page: 0,
            isListNull: false,
            isInDetail: true
        });
        disPatchFetchList(this.props.location.query.itemId);
        fetchCollect({
            type: 1,
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId
        })
    }

    handleCollect(isCollection, collectId){
        const { fetchCollect  } = this.props;
        if(isCollection){
            fetchCollect({
                type: 3,
                collectId: collectId,
                itemType: this.props.location.query.itemType,
                itemId:  this.props.location.query.itemId
            });
        }else {
            fetchCollect({
                type: 2,
                itemType: this.props.location.query.itemType,
                itemId: this.props.location.query.itemId
            });
        }
    }

    handleSubmitOrderInfo(_wxPay){
        // isFontPrice:  0表示不是定金
        const {disPatchFetchOrder ,courseDetail} = this.props;
        let scmvOrderMapModels =  [{
            scmvId: courseDetail.id,
            title: courseDetail.title,
            price: courseDetail.price,
            isFontPrice: 0
        }];
        if(_wxPay==='wxPay'){
            disPatchFetchOrder({
                type: 'scmvOrder',
                sum: 1,
                price: courseDetail.price,
                scmvOrderMapModels: scmvOrderMapModels,
                wxPay: true
            })
        }else {
            disPatchFetchOrder({
                type: 'scmvOrder',
                sum: 1,
                price: courseDetail.price,
                scmvOrderMapModels: scmvOrderMapModels,
                dom: this.refs.pay
            })
        }
    }

    handleClick(clickType){
    // clickType: 1-查看更多视频
        if(clickType===1){
            console.log('查看更多视频')
        }else {
            //todo
        }
    }

    handleScroll(e){
        const { fetchInfo} = this.props;
        let scrollTop  = this.refs.bodyBox.scrollTop;  //滚动条滚动高
        if(scrollTop/window.innerHeight >=0.85){
            fetchInfo(-3,-1,0)
        }else {
            fetchInfo(-3,-1,1)
        }
        console.log(this.refs.bodyBox.scrollHeight)
        console.log(scrollTop)
    }

    render(){
        const {
            courseDetail, isShowMoreDetail, showMoreCourseDetail, isShowBackTop, times,
            showPayPopup, isShowPayPopup, recommendedList, isCollection, collectId,
            ciphertext, isShowToastSuccess, toastStr,
            listInDetail, rowCount
        } = this.props;
        return(
            <div style={{width:'100%',height:'100%'}} >
                <BackTopBtn
                    className={ (isShowBackTop===1&&times>0) ? "down" : (isShowBackTop===0 ? 'up' : '') }
                    dom={this.refs.bodyBox}
                />

                <Toast icon="success-no-circle" show={isShowToastSuccess}>{toastStr}</Toast>

                <div id="selectDetail" onScroll={this.handleScroll.bind(this)} ref="bodyBox">
                    <div className="head">
                        <img src={courseDetail.maxPic} role="presentation"/>
                        <h3>{courseDetail.title}</h3>
                        <div>
                            <PanelHeader>0人关注 / 0人订阅</PanelHeader>
                            <PanelHeader>￥{courseDetail.price}</PanelHeader>
                        </div>
                    </div>
                    <div className="body">
                        <PanelHeader>
                            <span className="vedio"><img role="presentation" src={vedio}/><i>相关视频</i></span>
                            <span className="more" onClick={this.handleClick.bind(this,1)}>
                                <i>共0条视频</i>
                                <img role="presentation" src={more}/>
                            </span>
                        </PanelHeader>
                        <h3>课程亮点</h3>
                        <div className={!isShowMoreDetail ? 'detailInfo' : 'detailInfo long'}>
                            <div
                                className="content"
                                dangerouslySetInnerHTML={{__html: courseDetail.detail}}
                            ></div>
                            { !isShowMoreDetail&&
                                <div className="show" onClick={()=>{showMoreCourseDetail(true)}}>
                                    <h4>展开课程亮点↓</h4>
                                </div>
                            }
                        </div>
                    </div>

                    <CommentIn commentObj={
                            {
                                itemType: this.props.location.query.itemType,
                                itemId: this.props.location.query.itemId,
                                rowCount: rowCount,
                                commentList: listInDetail
                            }
                        } />

                    <RelateList recommendedList={recommendedList} />
                </div>

                <div id="footBuy" className="do">
                    <i/>
                    <Button id="flow" type="default"
                            onClick={this.handleCollect.bind(this, isCollection, collectId)}
                            plain
                    >{ isCollection ? '取消关注' : '关注' }</Button>
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




function mapStateToProps(state) {
    return{
        courseDetail: state.courseReducer.courseDetail,
        isShowMoreDetail: state.courseReducer.isShowMoreDetail,
        isShowBackTop: state.courseReducer.isShowBackTop,
        times: state.courseReducer.times,

        isShowToastSuccess: state.publicReducer.isShowToastSuccess,
        toastStr: state.publicReducer.toastStr,

        isShowPayPopup: state.publicReducer.isShowPayPopup,
        recommendedList: state.publicReducer.recommendedList,
        isCollection: state.publicReducer.isCollection,
        collectId:  state.publicReducer.collectId,

        listInDetail: state.commentReducer.listInDetail,
        rowCount: state.commentReducer.rowCount,
    }
}

export default connect(
    mapStateToProps,
    {
        fetchInfo ,showMoreCourseDetail,
        disPatchFetchOrder,
        showPayPopup,
        getCommentList,
        disPatchFetchList, fetchCollect
    }
)(SelectDetail);