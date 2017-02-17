/**
 * Created by Administrator on 2017/01/10 0010.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';

//import Using ES6 syntax
import {
    PanelHeader
} from 'react-weui';

import './commentItem.css'
import headPic from '../../img/login/headPic_default.png'

export default class CommentIn extends Component{
    transFomTimeStamp(preTime){
        if(preTime<60){
            return parseInt(preTime,10)+"秒前";
        }else if((preTime/60)<60){
            return parseInt(preTime/60,10)+"分钟前";
        }else if((preTime/3600)<24){
            return parseInt(preTime/3600,10)+"小时前";
        }else if((preTime/3600/24)<30){
            return parseInt(preTime/3600/24,10)+"天前";
        }else if((preTime/3600/24/30)<12){
            return parseInt(preTime/3600/24/30,10)+"月前";
        }else{
            return parseInt(preTime/3600/24/365,10)+"年前";
        }
    }

    handleClick(){
        console.log('查看更多的评论')
    }

    render(){
        return(
            <div id="comment">
                <div className="list">
                    {
                        this.props.commentObj.commentList.map( (comment ,index) =>{
                            return(
                                <div className="singleCmt" key={index}>
                                    <div className="imgBox">
                                        <img role="presentation" src={comment.user.headPic || headPic}/>
                                    </div>
                                    <div className="cmtContent">
                                        <p className="userName">
                                            <span>{comment.user.userName}</span>
                                            <span>
                                                {
                                                    this.transFomTimeStamp(
                                                        parseInt(
                                                        new Date().getTime() -comment.createTime*1000 ,10
                                                        )/1000
                                                    )
                                                }
                                            </span>
                                        </p>
                                        <p className="commentContent">
                                            {comment.commentContent}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Link to={{
                    pathname: '/comment',
                    query: {
                        itemType:  this.props.commentObj.itemType ,
                        itemId:  this.props.commentObj.itemId
                    }
                 }}
                >
                    <PanelHeader onClick={this.handleClick.bind(this)}>
                        查看全部{this.props.commentObj.rowCount}条评论
                    </PanelHeader>
                </Link>
            </div>
        )
    }
}


/*
*  <div id="comment">
 <h3 className="cmtNUm">评论{this.props.rowCount}条</h3>
 { this.props.commentInfo &&
 <div className="list-one">
 <img role="presentation" src={this.props.commentInfo.user.headPic===null?headPic:this.props.commentInfo.user.headPic} />
 <div className="customerCmt">
 <span>{this.props.commentInfo ? this.props.commentInfo.user.userName:''}</span>
 <p>{this.props.commentInfo ? this.props.commentInfo.commentContent:''}</p>
 </div>
 </div>
 }
 <Link
 id="moreComts"
 to={{
 pathname: '/comment',
 query: { itemType: this.props.itemType ,itemId: this.props.itemId }
 }}
 >查看更多 >></Link>
 </div>
*
* */