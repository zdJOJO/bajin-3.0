/**
 * Created by Administrator on 2017/01/10 0010.
 */
import React,{Component} from 'react';
import {Link} from 'react-router';

import './commentItem.css'
import headPic from '../../img/login/headPic_default.png'

export default class CommentIn extends Component{
    render(){
        return(
            <div id="comment">
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
        )
    }
}