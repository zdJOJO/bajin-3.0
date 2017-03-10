/**
 * Created by Administrator on 2016/12/23 0023.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import './index.css';

import {Dialog} from 'react-weui';
import HeaderBar from '../../components/headerNav/headBar';
import CommentItem from '../../components/comment/commentItem';
import {Button ,LoadMore ,PanelHeader ,Toast, Popup} from 'react-weui';

import {getCommentList ,dispatchAction, changeImgList} from '../../actions/commentAction';
import {showDialog} from '../../actions/publicAction'

import pic from '../../img/pic.png'

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
            },
            fullpage_show: false,
            imgFiles: []
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
        const {  dispatchAction, isFather ,fatherId ,showDialog,
            commentContent ,headerStrLength ,headerStr, imgList
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
                    imgList: imgList
                }
            }
        )
    }

    handleAddImg(e){
        const { dispatchAction, imgList } = this.props;
        if(this.state.imgFiles.length === 3){
            return
        }
        let thisComponent = this;
        let reader = new FileReader();
        reader.onload = (function (file) {
            return event => {
                thisComponent.setState({
                    imgFiles: thisComponent.state.imgFiles.concat({pic: event.target.result})
                })
                dispatchAction(4,{
                    imgBase: event.target.result,
                    imgList: imgList
                })
            };
        })(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }

    render(){
        const {
            commentList, getCommentList, currentPage, isLoading, isListNull ,
            commentContent, fatherId,
            isDialogShow, isShowToastLoading, isShowToastSuccess, changeImgList
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

                    <Toast icon="loading" show={isShowToastLoading}>正在发送</Toast>
                    <Toast icon="success-no-circle" show={isShowToastSuccess}>发表成功</Toast>

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
                    <div className="img" onClick={()=>{
                        if(!fatherId){
                            this.setState({fullpage_show: true})
                        }else {
                            return false
                        }
                    }}>
                        <img role="presentation" src={pic}/>
                    </div>
                    <input type="text"
                           placeholder='请填写评论'
                           value={commentContent}
                           onChange={this.handleChange.bind(this)}
                    />
                    <Button type="default" size="small"
                            onClick={this.publishComment.bind(this)}
                    >发表</Button>
                </div>
                <Popup show={this.state.fullpage_show}>
                    <HeaderBar content="添加图片" type="3" onClick={
                        ()=>{
                            this.setState({
                                fullpage_show:false,
                                imgFiles:[]
                            })
                            changeImgList([]);
                        }}/>
                    <div style={{height: '93vh', overflow: 'hidden', marginTop:'0.4rem'}}>
                        <input type="file" id="addImg" ref="addImg" multiple onChange={this.handleAddImg.bind(this)}/>
                        <label htmlFor="addImg" />
                        <div className="imgList">
                            {
                                this.state.imgFiles.map((img,index)=>{
                                    return(
                                       <div key={index}><img role="presentation"  src={img.pic}/></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Button onClick={e=>this.setState({fullpage_show: false})}>完成</Button>
                </Popup>
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
        imgList:　state.commentReducer.imgList,

        isDialogShow: state.publicReducer.isDialogShow,
        isShowToastLoading: state.publicReducer.isShowToastLoading,
        isShowToastSuccess: state.publicReducer.isShowToastSuccess
    }
}

export default connect(
    mapStateToProps,{getCommentList ,dispatchAction ,showDialog, changeImgList}
)(CommentList)