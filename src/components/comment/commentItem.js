/**
 * Created by Administrator on 2016/12/23 0023.
 */
import React,{Component} from 'react';

import './commentItem.css';
import headPic from '../../img/login/headPic_default.png'


class ReplyItem extends Component{
    render(){
        return(
            <li>
                <span>{this.props.reply.user.userName}: </span>
                <span>{this.props.reply.commentContent}</span>
            </li>
        )
    }
}

export default class CommentItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            disPlayReplyList: []
        }
    }

    componentWillMount(){
        this.replayRecursive(this.props.comment)
    }

    replayRecursive(comment){
        if(!comment.commentModelList || comment.commentModelList.length===0)
            return
        this.setState({
            disPlayReplyList: this.state.disPlayReplyList.concat(comment)
        })
        for(let item of comment.commentModelList){
            console.log('继续')
            this.replayRecursive(item)
        }
    }

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

    render(){
        return(
            <div className="singleCmt">
                <div className="imgBox">
                    <img role="presentation" src={this.props.headPic===null ? headPic : this.props.headPic}/>
                </div>
                <div className="cmtContent">
                    <li className="userName">
                        <span>{this.props.userName}</span>
                        <i/>
                    </li>
                    <li className="creatTime">{this.transFomTimeStamp(parseInt(this.props.time,10)/1000)}</li>
                    <li className="commentContent">{this.props.content}</li>
                    { this.props.comment.commentModelList.length>0 &&
                        <div className="reply">
                            <i/>
                            {
                                this.state.disPlayReplyList.map( (reply,index) =>{
                                    return(
                                        <ReplyItem
                                            key={index}
                                            reply={reply}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}