/**
 * Created by Administrator on 2016/12/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import './index.css';

import {Dialog} from 'react-weui';
import HeaderBar from '../../components/headerNav/headBar';
import CommentItem from '../../components/comment/commentItem';
import {Button ,LoadMore ,PanelHeader} from 'react-weui';

import {getCommentList ,dispatchAction} from '../../actions/commentAction';
import {showDialog} from '../../actions/publicAction'

import pic from '../../img/pic.png'

// let page = 0;
class CommentList extends Component{
    constructor(props){
        super(props)
        const {showDialog} = this.props;
        this.state = {
            style1: {
                buttons: [
                    {
                        label: '知道了',
                        onClick: ()=>{showDialog(false)}
                    }
                ]
            }
        }
    }

    componentDidMount() {
        const { getCommentList ,dispatchAction ,currentPage ,isListNull } = this.props;
        getCommentList({
            itemType: this.props.location.query.itemType,
            itemId:  this.props.location.query.itemId,
            page: currentPage,
            isListNull: isListNull,
            isInDetail: false
        });
        dispatchAction(
            3,{
                str: '',
                isFather: 0,
                fatherId: 0
            }
        )
    }

    handleClick(obj){
        const {dispatchAction} = this.props;
        dispatchAction(
            1,{
                str: '回复'+ obj.name+":",
                isFather: obj.isFather,
                fatherId: obj.fatherId
            }
        )
    }

    handleChange(e){
        const { dispatchAction ,isFather ,fatherId} = this.props;
        dispatchAction(
            3,{
                str: e.target.value,
                isFather: isFather ,
                fatherId: fatherId
            }
        )
    }


    publishComment(){
        const {  dispatchAction, isFather ,fatherId ,showDialog ,
            commentContent ,headerStrLength ,headerStr
        } = this.props;
        if(!commentContent){
            showDialog(true)
            return
        }
        dispatchAction(
            2,{
                getCmtObj:{
                    itemType: this.props.location.query.itemType,
                    itemId:  this.props.location.query.itemId,
                    page: 1,
                    isListNull: false,
                    isInDetail: false
                },
                publishCmtObj:{
                    itemType: this.props.location.query.itemType,
                    itemId:  this.props.location.query.itemId,

                    commentContent: commentContent ,
                    headerStrLength: headerStrLength,
                    headerStr: headerStr,

                    isFather: isFather, //0表示父级，1表示子集，
                    fatherId: fatherId,  //如果是子集在上送的时候请添加该字段

                    imgList: [
                        {
                            pic: "http://h.hiphotos.baidu.com/zhidao/pic/item/3ac79f3df8dcd100ad7f666b738b4710b8122f9c.jpg"
                        },
                        {
                            pic: "http://h.hiphotos.baidu.com/zhidao/pic/item/3ac79f3df8dcd100ad7f666b738b4710b8122f9c.jpg"
                        }
                    ]
                }
            }
        )
    }

    render(){
        const {
            commentList, getCommentList, currentPage, isLoading, isListNull ,
            commentContent,
            isDialogShow
        } = this.props;
        return(
            <div>
                <HeaderBar  content='评论' type="2"/>
                <section id="comments" className="comments">
                    <Dialog type="ios"
                            title='提示'
                            buttons={this.state.style1.buttons}
                            show={isDialogShow}
                    >
                        讲点什么吧
                    </Dialog>
                    <div className="commentList">
                        {
                            commentList.map((comment,index)=>{
                                return(
                                    <div
                                        onClick={this.handleClick.bind(this,{
                                        name: comment.userModel.userName,
                                        isFather: 1,
                                        fatherId: comment.id
                                   })}
                                        key={index}
                                    >
                                        <CommentItem
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
                </section>
                <div id="publishCmt">
                    <div className="img"><img role="presentation" src={pic}/></div>
                    <input type="text"
                           placeholder='请填写评论'
                           value={commentContent}
                           onChange={this.handleChange.bind(this)}
                    />
                    <Button type="default" size="small"
                            onClick={this.publishComment.bind(this)}
                    >发表</Button>
                </div>
            </div>
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

        headerStr: state.commentReducer.headerStr,
        headerStrLength: state.commentReducer.headerStrLength,
        commentContent: state.commentReducer.commentContent,

        isFather: state.commentReducer.isFather,
        fatherId: state.commentReducer.fatherId,

        isDialogShow: state.publicReducer.isDialogShow
    }
}

export default connect(
    mapStateToProps,{getCommentList ,dispatchAction ,showDialog}
)(CommentList)