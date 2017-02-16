/**
 * Created by Administrator on 2017/02/15 0015.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import CourseItem from './item';
import CommentItem from '../../components/comment/commentItem';
//import Using ES6 syntax
import {
    PanelHeader,
    Button,
} from 'react-weui';

import {fetchInfo ,showMoreCourseDetail } from '../../actions/courseAction'


import more from '../../img/more.svg';
import backTop from '../../img/detail/backTop.png';
import kefu from '../../img/detail/kefu.png';
import vedio from '../../img/detail/vedio.png';
import down from '../../img/detail/down.png';


class SelectDetail extends Component{
    componentWillMount(){
        const { fetchInfo} = this.props;
        fetchInfo(-1 ,-1 ,this.props.location.query.itemId);
        fetchInfo(-2,-1)
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
    }

    backTop(){
        this.refs.bodyBox.scrollTop=0
    }

    render(){
        const { courseDetail ,isShowMoreDetail ,showMoreCourseDetail ,isShowBackTop ,times} = this.props;
        return(
            <div style={{width:'100%',height:'100%'}} >
                <img role="presentation"
                     id="backTop"
                     className={ (isShowBackTop===1&&times>0) ? "down" : (isShowBackTop===0 ? 'up' : '') }
                     src={backTop}
                     onClick={this.backTop.bind(this)}
                />
                <div id="selectDetail" onScroll={this.handleScroll.bind(this)} ref="bodyBox">
                    <div className="head">
                        <img src={courseDetail.maxPic} role="presentation"/>
                        <h3>{courseDetail.title}</h3>
                        <div>
                            <PanelHeader>0人关注/0人订阅</PanelHeader>
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
                        <div className={!isShowMoreDetail ? 'detailInfo' : 'detailInfo active'}>
                            { !isShowMoreDetail&&
                                <div className="show" onClick={()=>{showMoreCourseDetail(true)}}>
                                    <h4>展开课程亮点↓</h4>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="comment">
                        <div className="list">
                            <div className="singleCmt">
                                <div className="imgBox">
                                    <img role="presentation" src={kefu}/>
                                </div>
                                <div className="cmtContent">
                                    <li className="userName">
                                        <span>地方是</span>
                                        <span>1天前</span>
                                    </li>
                                    <li className="commentContent">
                                        啊沙发安抚安抚安抚安抚啊发生啊沙发安抚安抚安抚安抚啊发生
                                        啊沙发安抚安抚安抚安抚啊发生
                                        啊沙发安抚安抚安抚安抚啊发生啊沙发安抚安抚安抚安抚啊发生
                                        啊沙发安抚安抚安抚安抚啊发生
                                    </li>
                                </div>
                            </div>
                            <div className="singleCmt">
                                <div className="imgBox">
                                    <img role="presentation" src={kefu}/>
                                </div>
                                <div className="cmtContent">
                                    <li className="userName">
                                        <span>地方是</span>
                                        <span>12天前</span>
                                    </li>
                                    <li className="commentContent">啊沙发安抚安抚安抚安抚啊发生</li>
                                </div>
                            </div>
                        </div>
                        <PanelHeader>查看全部128条评论</PanelHeader>
                    </div>
                    <div className="relate">
                        <PanelHeader>
                            相关推荐
                        </PanelHeader>
                        {/*<CourseItem />*/}
                    </div>
                </div>
                <div className="do">
                    <img src={kefu} role="presentation" />
                    <Button id="flow" type="default" plain>关注</Button>
                    <Button id="buy">购买</Button>
                </div>
            </div>
        )
    }
}




function mapStateToProps(state) {
    return{
        courseDetail: state.courseReducer.courseDetail,
        isShowMoreDetail: state.courseReducer.isShowMoreDetail,
        isShowBackTop: state.courseReducer.isShowBackTop,
        times: state.courseReducer.times
    }
}

export default connect(
    mapStateToProps,{ fetchInfo ,showMoreCourseDetail }
)(SelectDetail);