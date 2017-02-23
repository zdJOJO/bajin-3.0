/**
 * Created by Administrator on 2016/12/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import './index.css';

import HeaderBar from '../../components/headerNav/headBar';
import CommentItem from '../../components/comment/commentItem';
import {Button ,LoadMore ,PanelHeader} from 'react-weui';

import {getCommentList ,dispatchAction} from '../../actions/commentAction';

import pic from '../../img/pic.png'

// let page = 0;
class CommentList extends Component{
    componentDidMount() {
        const { getCommentList ,dispatchAction ,currentPage ,isListNull } = this.props;
        getCommentList({
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId,
            page: currentPage,
            isListNull: isListNull,
            isInDetail: false
        });
        dispatchAction(1,{str: '请填写评论'})
    }

    handleClick(str){
        const {dispatchAction} = this.props;
        dispatchAction(1,{str: '回复'+str})
    }

    render(){
        const { commentList, getCommentList, currentPage, isLoading, isListNull ,placeholder} = this.props;
        return(
            <section id="comments" className="comments">
                <HeaderBar  content='评论' type="2"/>
                <div className="commentList">
                    {
                        commentList.map((comment,index)=>{
                           return(
                               <div
                                   onClick={this.handleClick.bind(this,comment.user.userName)}
                                   key={index}
                               >
                                   <CommentItem
                                       headPic={comment.user.headPic}
                                       userName={comment.user.userName}
                                       content={comment.commentContent}
                                       time={comment.createTime}
                                       comment={comment}
                                   />
                               </div>
                           )
                        })
                    }
                </div>
                <PanelHeader>
                    { !isLoading &&
                        <Button type="default" size="small"
                            onClick={()=>getCommentList({
                                itemType: this.props.location.query.itemType,
                                itemId:  this.props.location.query.itemId,
                                page: currentPage,
                                isListNull: isListNull,
                                isInDetail: false
                            })}
                            >点击加载更多评论</Button>
                    }
                    { isLoading &&
                        <LoadMore loading>Loading</LoadMore>
                    }
                </PanelHeader>

                <div className="publishCmt">
                    <div className="img"><img role="presentation" src={pic}/></div>
                    <input type="text" placeholder={placeholder}/>
                    <Button type="default" size="small">发表</Button>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        commentList: state.commentReducer.list,
        rowCount: state.commentReducer.rowCount,
        isLoading: state.commentReducer.isLoading,
        currentPage: state.commentReducer.currentPage,
        isListNull: state.commentReducer.isListNull,
        placeholder: state.commentReducer.placeholder
    }
}

export default connect(
    mapStateToProps,{getCommentList ,dispatchAction}
)(CommentList)