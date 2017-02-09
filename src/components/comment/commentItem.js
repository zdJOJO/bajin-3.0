/**
 * Created by Administrator on 2016/12/23 0023.
 */
import React,{Component} from 'react';

import './commentItem.css';
import headPic from '../../img/login/headPic_default.png'

export default class CommentItem extends Component{
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
        console.log(this.props.headPic)
        return(
            <div className="singleCmt">
                <div className="imgBox">
                    <img role="presentation" src={this.props.headPic===null ? headPic : this.props.headPic}/>
                </div>
                <div className="cmtContent">
                    <li className="userName">{this.props.userName}</li>
                    <li className="commentContent">{this.props.content}</li>
                    <li className="creatTime">{this.transFomTimeStamp(parseInt(this.props.time,10)/1000)}</li>
                </div>
            </div>
        )
    }
}