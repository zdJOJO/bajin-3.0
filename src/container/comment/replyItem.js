/**
 * Created by Administrator on 2017/02/24 0024.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';

import {dispatchAction} from '../../actions/commentAction'

class ReplyItem extends Component{

    handleClick(event){
        event.stopPropagation();
        const {dispatchAction} = this.props;
        dispatchAction(
            1, {
                str: '回复'+this.props.reply.from.userName+':',
                isFather: 1,
                fatherId: this.props.reply.commentv2Model.id
            }
        )
    }

    render(){

        return(
            <li onClick={this.handleClick.bind(this)}>
                <span className="name">{this.props.reply.from.userName} </span>
                <span>回复 {this.props.reply.to.userName}</span>
                <span>：{this.props.reply.commentv2Model.commentContent}</span>
            </li>
        )
    }
}

function mapStateToProps(state) {
    return {
        placeholder: state.commentReducer.placeholder
    }
}

export default connect(
    mapStateToProps,{dispatchAction}
)(ReplyItem)