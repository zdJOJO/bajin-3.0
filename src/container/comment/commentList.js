/**
 * Created by Administrator on 2016/12/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import './index.css';

import CommentItem from '../../components/comment/commentItem';

import {getCommentList} from '../../actions/commentAction';

// let page = 0;
class CommentList extends Component{

    componentDidMount() {
        const { getCommentList ,currentPage ,isListNull } = this.props;
        getCommentList(
            this.props.location.query.itemType,
            this.props.location.query.itemId,
            currentPage,
            isListNull
        );
    }

    render(){
        const { commentList, rowCount, getCommentList, currentPage, isLoading, isListNull} = this.props;
        return(
            <section className="comments">
                <h3 className="totalNum">共 {rowCount} 条评论</h3>
                <div className="commentList">
                    {
                        commentList.map((comment,index)=>{
                           return(
                               <CommentItem
                                   key={index}
                                   headPic={comment.user.headPic}
                                   userName={comment.user.userName}
                                   content={comment.commentContent}
                                   time={comment.createTime}
                               />
                           )
                        })
                    }
                </div>
                <div className={isLoading ? "spinner loadingShow":"spinner loadingHide"}>
                    <span className="more">加载中</span>
                    <i className="bounce1"/>
                    <i className="bounce2"/>
                    <i className="bounce3"/>
                </div>
                <button
                    onClick={()=>getCommentList(
                        this.props.location.query.itemType,
                        this.props.location.query.itemId,currentPage,isListNull
                    )}
                >加载更多</button>
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
        isListNull: state.commentReducer.isListNull
    }
}

export default connect(
    mapStateToProps,{getCommentList}
)(CommentList)