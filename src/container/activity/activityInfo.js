/**
 * Created by Administrator on 2017/01/09 0009.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import { getActDetail } from '../../actions/activityAction';
import { getCommentList } from  '../../actions/commentAction';
import { timestampFormat } from '../../public';

import CommentIn from '../../components/comment/commentIn';
import Foot from '../../components/activity/foot';

import './index.css';


class ActivityInfo extends Component{
    componentWillMount() {
        const { getActDetail ,getCommentList } = this.props;
        getActDetail(this.props.location.query.itemId);
        getCommentList(
            this.props.location.query.itemType,
            this.props.location.query.itemId,
            0,
            false
        )
    }

    render(){
        const { activityInfo ,actStateStr ,commentList ,rowCount} = this.props;
        return(
            <div className="panel panel-default">
                { activityInfo &&
                    <div id="mainBox">
                        <div className="swiper-container">
                            <img role="presentation" src={activityInfo.activityPic} />
                        </div>
                        <div className="main">
                            <div className="msgBox">
                                <h1 className="msg-tit">{activityInfo.activityTitle}</h1>
                                <ul>
                                    <li className="msg-time">
                                        <span>时间:</span>
                                    <span>
                                        {
                                            timestampFormat(activityInfo.startTime,true)+
                                            ' - ' +timestampFormat(activityInfo.endTime,true)
                                        }
                                    </span>
                                    </li>
                                    <li className="msg-address">
                                        <span>地点:</span>
                                        <span>{activityInfo.activityAddress}</span>
                                    </li>
                                    <li className="msg-price">
                                        <span>价格:</span>
                                    <span>
                                        {
                                            activityInfo.activityPrice===0 ? '会员专享' : activityInfo.activityPrice
                                        }
                                    </span>
                                    </li>
                                    <li className="msg-num">
                                        <span>人数:</span>
                                    <span>
                                        {
                                            activityInfo.peopleNumber===999999 ? '不限人数' : activityInfo.peopleNumber + '人'
                                        }
                                    </span>
                                    </li>
                                    <li className="msg-num">
                                        <span>已报名:</span>
                                        <span>{activityInfo.applyNumber}人</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="content">
                                <h3>活动亮点</h3>
                                <div className="content-text" dangerouslySetInnerHTML={{__html: activityInfo.activityDetail}}></div>
                            </div>
                        </div>
                        <CommentIn
                            commentObj={{
                             itemType: this.props.location.query.itemType,
                             itemId: this.props.location.query.itemId,
                             rowCount: rowCount,
                             commentList: commentList.slice(0,2)
                            }}
                        />
                    </div>
                }
                { activityInfo &&
                    <Foot
                        time={ timestampFormat(activityInfo.applyEndTime,true)}
                        actStateStr={actStateStr || '报名'}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        activityInfo: state.detailReducer.activityInfo,
        actStateStr: state.detailReducer.actStateStr,

        commentList: state.commentReducer.list,
        rowCount: state.commentReducer.rowCount
    }
}

export default connect(
    mapStateToProps,{getActDetail ,getCommentList}
)(ActivityInfo)


